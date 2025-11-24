"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";
import { otherThemes } from "@/registry/agusmayol/button";

// Context personalizado para manejar el estado de tooltips (global)
const TooltipContext = React.createContext({
	hasActiveTooltip: false,
	setHasActiveTooltip: () => {},
	firstTooltipDelay: 400,
	subsequentTooltipDelay: 0,
	isFirstTooltip: true,
	setIsFirstTooltip: () => {},
	hasAsChild: false,
	setHasAsChild: () => {},
});

// Context local para cada instancia de Tooltip
const TooltipInstanceContext = React.createContext({
	shouldKeepOpenRef: { current: false },
	setShouldKeepOpen: () => {},
	isPointerOverTriggerRef: { current: false },
	isPointerOverContentRef: { current: false },
});

function TooltipProvider({
	delayDuration = 400,
	skipDelayDuration = 0,
	...props
}) {
	const [hasActiveTooltip, setHasActiveTooltip] = React.useState(false);
	const [isFirstTooltip, setIsFirstTooltip] = React.useState(true);
	const [hasAsChild, setHasAsChild] = React.useState(false);

	// Usar el delay apropiado basado en si hay un tooltip activo
	const currentDelay = hasActiveTooltip ? skipDelayDuration : delayDuration;

	return (
		<TooltipContext.Provider
			value={{
				hasActiveTooltip,
				setHasActiveTooltip,
				firstTooltipDelay: delayDuration,
				subsequentTooltipDelay: skipDelayDuration,
				isFirstTooltip,
				setIsFirstTooltip,
				hasAsChild,
				setHasAsChild,
			}}
		>
			<TooltipPrimitive.Provider
				data-slot="tooltip-provider"
				delayDuration={currentDelay}
				{...props}
			/>
		</TooltipContext.Provider>
	);
}

function Tooltip({ open: controlledOpen, onOpenChange: controlledOnOpenChange, ...props }) {
	const {
		hasActiveTooltip,
		setHasActiveTooltip,
		setIsFirstTooltip,
	} = React.useContext(TooltipContext);
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

	// Crear refs locales para cada instancia de Tooltip
	const shouldKeepOpenRef = React.useRef(false);
	const isPointerOverTriggerRef = React.useRef(false);
	const isPointerOverContentRef = React.useRef(false);

	const setShouldKeepOpen = React.useCallback((value) => {
		shouldKeepOpenRef.current = value;
	}, []);

	// Determinar si el componente está controlado o no
	const isControlled = controlledOpen !== undefined;
	const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

	// Manejar el estado de apertura y actualizar el contexto
	const handleOpenChange = React.useCallback(
		(open) => {
			// Si se intenta cerrar, verificar si el mouse está sobre el trigger o el content
			if (!open) {
				// Si el mouse está sobre el trigger o el content, mantener abierto
				if (
					isPointerOverTriggerRef.current ||
					isPointerOverContentRef.current ||
					shouldKeepOpenRef.current
				) {
					// No cerrar, el click no debe cerrar el tooltip
					// Si está controlado, llamar al onOpenChange con true para mantener abierto
					// Si no está controlado, mantener el estado interno
					if (isControlled) {
						controlledOnOpenChange?.(true);
					} else {
						setUncontrolledOpen(true);
					}
					return;
				}
			}

			// Actualizar el estado según si está controlado o no
			if (isControlled) {
				controlledOnOpenChange?.(open);
			} else {
				setUncontrolledOpen(open);
			}

			if (open) {
				// Si es el primer tooltip (no hay ninguno activo), marcarlo como tal
				if (!hasActiveTooltip) {
					setIsFirstTooltip(true);
				} else {
					setIsFirstTooltip(false);
				}
				setHasActiveTooltip(true);
				// Cuando se abre, marcar que debe mantenerse abierto por defecto
				setShouldKeepOpen(true);
			} else {
				setHasActiveTooltip(false);
				// Resetear para el próximo tooltip
				setIsFirstTooltip(true);
				setShouldKeepOpen(false);
			}
		},
		[
			hasActiveTooltip,
			setHasActiveTooltip,
			setIsFirstTooltip,
			setShouldKeepOpen,
			isControlled,
			controlledOnOpenChange,
		],
	);

	return (
		<TooltipInstanceContext.Provider
			value={{
				shouldKeepOpenRef,
				setShouldKeepOpen,
				isPointerOverTriggerRef,
				isPointerOverContentRef,
			}}
		>
			<TooltipPrimitive.Root
				data-slot="tooltip"
				open={isOpen}
				onOpenChange={handleOpenChange}
				{...props}
			/>
		</TooltipInstanceContext.Provider>
	);
}

function TooltipTrigger({ asChild, onClick, onPointerDown, onPointerLeave, onPointerEnter, ...props }) {
	const { setHasAsChild } = React.useContext(TooltipContext);
	const {
		setShouldKeepOpen,
		isPointerOverTriggerRef,
		isPointerOverContentRef,
	} = React.useContext(TooltipInstanceContext);

	// Actualizar el contexto cuando asChild cambia
	React.useEffect(() => {
		setHasAsChild(!!asChild);
	}, [asChild, setHasAsChild]);

	// Prevenir que el click cierre el tooltip (activado por defecto)
	const handleClick = React.useCallback(
		(event) => {
			// Prevenir que el click cierre el tooltip
			event.stopPropagation();
			onClick?.(event);
		},
		[onClick],
	);

	const handlePointerDown = React.useCallback(
		(event) => {
			// Establecer shouldKeepOpen ANTES de que Radix UI intente cerrar
			// Esto se ejecuta antes del click, así que podemos prevenir el cierre
			setShouldKeepOpen(true);
			isPointerOverTriggerRef.current = true;
			event.stopPropagation();
			onPointerDown?.(event);
		},
		[onPointerDown, setShouldKeepOpen, isPointerOverTriggerRef],
	);

	// Manejar pointerEnter para mantener el tooltip abierto cuando el usuario entra
	const handlePointerEnter = React.useCallback(
		(event) => {
			setShouldKeepOpen(true);
			isPointerOverTriggerRef.current = true;
			onPointerEnter?.(event);
		},
		[onPointerEnter, setShouldKeepOpen, isPointerOverTriggerRef],
	);

	// Manejar pointerLeave para permitir que se cierre cuando el usuario salga
	const handlePointerLeave = React.useCallback(
		(event) => {
			// Cuando el usuario sale del trigger, marcar que ya no está sobre él
			isPointerOverTriggerRef.current = false;
			// Solo permitir cerrar si tampoco está sobre el content
			if (!isPointerOverContentRef.current) {
				setShouldKeepOpen(false);
			}
			onPointerLeave?.(event);
		},
		[onPointerLeave, setShouldKeepOpen, isPointerOverTriggerRef, isPointerOverContentRef],
	);

	return (
		<TooltipPrimitive.Trigger
			data-slot="tooltip-trigger"
			asChild={asChild}
			onClick={handleClick}
			onPointerDown={handlePointerDown}
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
			{...props}
		/>
	);
}

function TooltipContent({ className, sideOffset = 0, children, onPointerLeave, onPointerEnter, ...props }) {
	const { isFirstTooltip } = React.useContext(TooltipContext);
	const {
		setShouldKeepOpen,
		isPointerOverTriggerRef,
		isPointerOverContentRef,
	} = React.useContext(TooltipInstanceContext);

	// Clases de animación condicionales
	const animationClasses = isFirstTooltip
		? "animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2" // Con animación para el primer tooltip
		: ""; // Sin animación para tooltips subsecuentes

	// Manejar pointerEnter para mantener el tooltip abierto cuando el usuario entra al contenido
	const handlePointerEnter = React.useCallback(
		(event) => {
			setShouldKeepOpen(true);
			isPointerOverContentRef.current = true;
			onPointerEnter?.(event);
		},
		[onPointerEnter, setShouldKeepOpen, isPointerOverContentRef],
	);

	// Manejar pointerLeave en el contenido para permitir que se cierre cuando el usuario salga
	const handlePointerLeave = React.useCallback(
		(event) => {
			// Cuando el usuario sale del contenido, marcar que ya no está sobre él
			isPointerOverContentRef.current = false;
			// Solo permitir cerrar si tampoco está sobre el trigger
			if (!isPointerOverTriggerRef.current && !isPointerOverContentRef.current) {
				setShouldKeepOpen(false);
			}
			onPointerLeave?.(event);
		},
		[onPointerLeave, setShouldKeepOpen, isPointerOverTriggerRef, isPointerOverContentRef],
	);

	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				data-slot="tooltip-content"
				sideOffset={sideOffset}
				className={cn(
					"bg-foreground text-background data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
					animationClasses,
					className,
					otherThemes({ variant: "raised" }),
					"bg-background dark:bg-sidebar",
				)}
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
				{...props}
			>
				{children}
				<TooltipPrimitive.Arrow
					className={cn(
						"bg-background dark:bg-sidebar fill-background dark:fill-sidebar z-20 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
					)}
				/>
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
