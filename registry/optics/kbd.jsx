"use client";

import { cn } from "@/registry/optics/lib/utils";
import { cva } from "class-variance-authority";
import { useHotkeys } from "react-hotkeys-hook";
import {
	useCallback,
	useRef,
	useState,
	useMemo,
	isValidElement,
	useEffect,
} from "react";

/**
 * Extrae texto de children de React
 */
function extractTextFromChildren(children) {
	if (!children) return "";
	if (typeof children === "string") return children;
	if (typeof children === "number") return String(children);
	if (Array.isArray(children)) {
		return children
			.map((child) => extractTextFromChildren(child))
			.filter(Boolean)
			.join("");
	}
	if (isValidElement(children)) {
		return extractTextFromChildren(children.props.children);
	}
	if (typeof children === "object" && children?.props?.children) {
		return extractTextFromChildren(children.props.children);
	}
	return "";
}

/**
 * Normaliza un string de hotkey al formato que react-hotkeys-hook espera
 */
function normalizeHotkeyString(str) {
	if (!str) return null;
	let normalized = str.trim().toLowerCase();
	normalized = normalized
		.replace(/⌘|cmd|command|meta/gi, "mod")
		.replace(/ctrl|control/gi, "ctrl")
		.replace(/alt|option/gi, "alt")
		.replace(/shift/gi, "shift")
		.replace(/[\s,\-]+/g, "+")
		.replace(/\++/g, "+")
		.replace(/^\+|\+$/g, "");
	return normalized || null;
}

/**
 * Lista de modificadores conocidos
 */
const MODIFIER_KEYS = new Set([
	"mod",
	"ctrl",
	"alt",
	"shift",
	"meta",
	"cmd",
	"command",
]);

/**
 * Verifica si una tecla es un modificador
 */
function isModifierKey(key) {
	return MODIFIER_KEYS.has(key.toLowerCase());
}

const kbdVariants = cva(
	"select-none outline-hidden transition-all duration-150",
	{
		variants: {
			variant: {
				default:
					"transform-gpu cursor-pointer rounded-lg border border-neutral-500/50 bg-neutral-300 shadow-[-10px_0px_15px_rgba(255,255,255,1),3px_10px_12.5px_rgba(0,0,0,0.1)] active:shadow-none dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[-10px_0px_15px_rgba(0,0,0,0.3),3px_10px_12.5px_rgba(255,255,255,0.05)]",
				legacy:
					"bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium [&_svg:not([class*='size-'])]:size-3 [[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const kbdInnerVariants = cva(
	"flex items-center justify-center size-full transform-gpu rounded-[calc(var(--radius)-1px)] transition-all duration-150",
	{
		variants: {
			variant: {
				default:
					"-translate-y-1 z-10 bg-neutral-100 px-3 py-1 text-neutral-500 shadow-[inset_0px_2px_4px_rgba(255,255,255,0.8)] active:translate-y-0 active:shadow-transparent dark:bg-neutral-800 dark:text-neutral-300 dark:shadow-[inset_0px_2px_4px_rgba(255,255,255,0.05)]",
				legacy: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

/**
 * Verifica si las teclas del evento coinciden con el hotkey
 */
function matchesHotkey(hotkey, event) {
	if (!hotkey || !event) return false;

	const parts = hotkey.split("+");
	const lastPart = parts[parts.length - 1].toLowerCase();
	const isOnlyModifier = parts.length === 1 && isModifierKey(lastPart);

	if (isOnlyModifier) {
		// Si es solo un modificador, verificar solo ese modificador
		if (lastPart === "mod") {
			return event.metaKey || event.ctrlKey;
		}
		if (lastPart === "ctrl") {
			return event.ctrlKey;
		}
		if (lastPart === "alt") {
			return event.altKey;
		}
		if (lastPart === "shift") {
			return event.shiftKey;
		}
		return false;
	}

	// Hotkey con modificadores + tecla principal
	const modifiers = parts.slice(0, -1);
	const key = lastPart;

	// Verificar modificadores requeridos
	const requiresMod = modifiers.includes("mod");
	const requiresCtrl = modifiers.includes("ctrl");
	const requiresAlt = modifiers.includes("alt");
	const requiresShift = modifiers.includes("shift");

	// Verificar que los modificadores requeridos estén presionados
	const hasMod = requiresMod ? event.metaKey || event.ctrlKey : true;
	const hasCtrl = requiresCtrl ? event.ctrlKey : true;
	const hasAlt = requiresAlt ? event.altKey : true;
	const hasShift = requiresShift ? event.shiftKey : true;

	// Verificar que no haya modificadores extra no requeridos
	const noExtraMods =
		(!requiresMod && !requiresCtrl ? !event.ctrlKey && !event.metaKey : true) &&
		(!requiresAlt ? !event.altKey : true) &&
		(!requiresShift ? !event.shiftKey : true);

	// Verificar la tecla principal
	const eventKey = event.key?.toLowerCase() || "";
	const eventCode = event.code?.toLowerCase().replace("key", "") || "";
	const keyMatch = eventKey === key || eventCode === key;

	// Para combinaciones, todos los modificadores y la tecla principal deben coincidir
	return hasMod && hasCtrl && hasAlt && hasShift && noExtraMods && keyMatch;
}

function Kbd({
	className = "",
	variant = "default",
	useHotkey = false,
	animate = true,
	onHotkeyPress = undefined,
	hotkey: hotkeyProp = undefined,
	...props
}) {
	const [isPressed, setIsPressed] = useState(false);
	const kbdRef = useRef(null);

	// Parsear hotkey
	const hotkey = useMemo(() => {
		if (!useHotkey) return null;
		if (hotkeyProp) return normalizeHotkeyString(hotkeyProp);
		const text = extractTextFromChildren(props.children);
		return text ? normalizeHotkeyString(text) : null;
	}, [useHotkey, hotkeyProp, props.children]);

	// Detectar si es compuesto
	const isCompound = useMemo(() => {
		if (hotkey?.includes("+")) return true;
		if (
			hotkeyProp &&
			typeof hotkeyProp === "string" &&
			hotkeyProp.includes("+")
		)
			return true;
		const text = extractTextFromChildren(props.children);
		return (
			text?.includes("+") ||
			(Array.isArray(props.children) && props.children.length > 1)
		);
	}, [hotkey, hotkeyProp, props.children]);

	// Callback para el hotkey
	const handleHotkeyPress = useCallback(
		(event) => {
			event?.preventDefault?.();
			onHotkeyPress?.(event);
		},
		[onHotkeyPress],
	);

	// Registrar hotkey con react-hotkeys-hook
	useHotkeys(
		hotkey || "",
		handleHotkeyPress,
		{
			enabled: useHotkey && !!hotkey,
			preventDefault: false,
		},
		[useHotkey, hotkey, handleHotkeyPress],
	);

	// Manejar animación con keydown/keyup
	useEffect(() => {
		if (!useHotkey || !hotkey || !animate) return;

		const parts = hotkey.split("+");
		const lastPart = parts[parts.length - 1].toLowerCase();
		const isOnlyModifier = parts.length === 1 && isModifierKey(lastPart);
		const mainKey = isOnlyModifier ? null : lastPart;
		const modifierKeys = isOnlyModifier ? parts : parts.slice(0, -1);

		const handleKeyDown = (event) => {
			// Verificar si la combinación completa está activa en este momento
			// El evento tiene el estado actual de todas las teclas presionadas
			// Esto funciona incluso si se presiona primero el modificador y luego la tecla principal
			if (matchesHotkey(hotkey, event)) {
				setIsPressed(true);
			}
		};

		const handleKeyUp = (event) => {
			const eventKey = event.key?.toLowerCase() || "";
			const eventCode = event.code?.toLowerCase() || "";

			if (isOnlyModifier) {
				// Si es solo un modificador, verificar si se soltó ese modificador
				let isModifierUp = false;
				if (lastPart === "mod") {
					isModifierUp =
						eventKey === "meta" ||
						eventKey === "control" ||
						eventCode.includes("meta") ||
						eventCode.includes("control") ||
						(!event.metaKey && !event.ctrlKey);
				} else if (lastPart === "ctrl") {
					isModifierUp =
						eventKey === "control" ||
						eventCode.includes("control") ||
						!event.ctrlKey;
				} else if (lastPart === "alt") {
					isModifierUp =
						eventKey === "alt" || eventCode.includes("alt") || !event.altKey;
				} else if (lastPart === "shift") {
					isModifierUp =
						eventKey === "shift" ||
						eventCode.includes("shift") ||
						!event.shiftKey;
				}

				if (isModifierUp) {
					setIsPressed(false);
				}
			} else {
				// Hotkey con tecla principal
				const eventCodeMain = eventCode.replace("key", "");

				// Verificar si se soltó la tecla principal
				const isMainKey = eventKey === mainKey || eventCodeMain === mainKey;

				// Verificar si se soltó un modificador requerido
				let isModifierUp = false;
				if (modifierKeys.includes("mod")) {
					isModifierUp =
						eventKey === "meta" ||
						eventKey === "control" ||
						eventCode.includes("meta") ||
						eventCode.includes("control") ||
						(!event.metaKey && !event.ctrlKey);
				}
				if (modifierKeys.includes("ctrl") && !isModifierUp) {
					isModifierUp =
						eventKey === "control" ||
						eventCode.includes("control") ||
						!event.ctrlKey;
				}
				if (modifierKeys.includes("alt") && !isModifierUp) {
					isModifierUp =
						eventKey === "alt" || eventCode.includes("alt") || !event.altKey;
				}
				if (modifierKeys.includes("shift") && !isModifierUp) {
					isModifierUp =
						eventKey === "shift" ||
						eventCode.includes("shift") ||
						!event.shiftKey;
				}

				// Si se soltó la tecla principal O cualquier modificador, desactivar
				if (isMainKey || isModifierUp) {
					setIsPressed(false);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown, true);
		window.addEventListener("keyup", handleKeyUp, true);

		return () => {
			window.removeEventListener("keydown", handleKeyDown, true);
			window.removeEventListener("keyup", handleKeyUp, true);
			setIsPressed(false);
		};
	}, [useHotkey, hotkey, animate]);

	if (variant === "legacy") {
		return (
			<kbd
				ref={kbdRef}
				data-slot="kbd"
				className={cn(kbdVariants({ variant }), className)}
				{...props}
			>
				{props.children}
			</kbd>
		);
	}

	return (
		<kbd
			ref={kbdRef}
			data-slot="kbd"
			className={cn(
				!isCompound && "aspect-square",
				kbdVariants({ variant }),
				isPressed && "shadow-none",
				className,
			)}
			{...props}
		>
			<span
				className={cn(
					kbdInnerVariants({ variant }),
					isPressed && "translate-y-0 shadow-transparent",
				)}
			>
				<span className="block text-center align-center text-xs">
					{props.children}
				</span>
			</span>
		</kbd>
	);
}

function KbdGroup({ className, ...props }) {
	return (
		<kbd
			data-slot="kbd-group"
			className={cn("inline-flex items-center gap-1", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };
