"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/optics/button";

const TooltipProviderContext = React.createContext({ hasProvider: false, delay: 400 });

// Context local para cada instancia de Tooltip para manejar estados de interacción
const TooltipInstanceContext = React.createContext({
	shouldKeepOpenRef: { current: false },
	setShouldKeepOpen: () => {},
	isPointerOverTriggerRef: { current: false },
	isPointerOverContentRef: { current: false },
	openTooltip: () => {},
	delay: 400,
});

function TooltipProvider({
	delay = 400,
	delayDuration = undefined,
	skipDelayDuration = 0,
	children,
	...props
} = {}) {
	const resolvedDelayDuration = delayDuration ?? delay;

	// Configuración de delays:
	// - delay/delayDuration: 400ms por defecto para la apertura inicial del tooltip
	// - skipDelayDuration: 0ms para transiciones instantáneas entre tooltips cuando ya hay uno abierto
	// Para que skipDelayDuration funcione entre múltiples tooltips, todos deben compartir el mismo TooltipProvider
	return (
		<TooltipProviderContext.Provider value={{ hasProvider: true, delay: resolvedDelayDuration }}>
			<TooltipPrimitive.Provider
				data-slot="tooltip-provider"
				delay={resolvedDelayDuration}
				delayDuration={resolvedDelayDuration}
				skipDelayDuration={skipDelayDuration}
				{...props}
			>
				{children}
			</TooltipPrimitive.Provider>
		</TooltipProviderContext.Provider>
	);
}

function Tooltip({ open: controlledOpen, onOpenChange, delay: localDelay, ...props } = {}) {
	const { hasProvider, delay: providerDelay } = React.useContext(TooltipProviderContext);
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

	const isControlled = controlledOpen !== undefined;
	const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

	// El delay efectivo viene del prop local, del provider, o del default (400)
	const effectiveDelay = localDelay ?? providerDelay ?? 400;

	// Refs locales para cada instancia de Tooltip
	const shouldKeepOpenRef = React.useRef(false);
	const isPointerOverTriggerRef = React.useRef(false);
	const isPointerOverContentRef = React.useRef(false);

	const setShouldKeepOpen = React.useCallback((value) => {
		shouldKeepOpenRef.current = value;
	}, []);

	const openTooltip = React.useCallback(() => {
		if (isControlled) {
			onOpenChange?.(true);
		} else {
			setUncontrolledOpen(true);
		}
	}, [isControlled, onOpenChange]);

	function handleOpenChange(nextOpen, eventDetails) {
		// Lógica para mantener abierto si el mouse está sobre el trigger o el contenido
		if (!nextOpen) {
			if (
				isPointerOverTriggerRef.current ||
				isPointerOverContentRef.current ||
				shouldKeepOpenRef.current
			) {
				if (isControlled) {
					onOpenChange?.(true);
				} else {
					setUncontrolledOpen(true);
				}
				return;
			}
		}

		if (!isControlled) {
			setUncontrolledOpen(nextOpen);
		}

		if (nextOpen) {
			setShouldKeepOpen(true);
		} else {
			setShouldKeepOpen(false);
		}

		onOpenChange?.(nextOpen, eventDetails);
	}

	const tooltipRoot = (
		<TooltipInstanceContext.Provider
			value={{
				shouldKeepOpenRef,
				setShouldKeepOpen,
				isPointerOverTriggerRef,
				isPointerOverContentRef,
				openTooltip,
				delay: effectiveDelay,
			}}
		>
			<TooltipPrimitive.Root
				data-slot="tooltip"
				open={isOpen}
				onOpenChange={handleOpenChange}
				delay={effectiveDelay}
				{...props}
			/>
		</TooltipInstanceContext.Provider>
	);

	if (hasProvider) {
		return tooltipRoot;
	}

	return <TooltipProvider delay={effectiveDelay}>{tooltipRoot}</TooltipProvider>;
}

function TooltipTrigger({
	onClick,
	onPointerDown,
	onPointerLeave,
	onPointerEnter,
	onTouchStart,
	onTouchEnd,
	onTouchCancel,
	...props
} = {}) {
	const {
		setShouldKeepOpen,
		isPointerOverTriggerRef,
		isPointerOverContentRef,
		openTooltip,
		delay,
	} = React.useContext(TooltipInstanceContext);

	const longPressTimeoutRef = React.useRef(null);
	const isTouchActiveRef = React.useRef(false);

	React.useEffect(() => {
		return () => {
			if (longPressTimeoutRef.current) {
				clearTimeout(longPressTimeoutRef.current);
			}
		};
	}, []);

	const handleClick = React.useCallback(
		(event) => {
			event.stopPropagation();
			onClick?.(event);
		},
		[onClick],
	);

	const handlePointerDown = React.useCallback(
		(event) => {
			setShouldKeepOpen(true);
			isPointerOverTriggerRef.current = true;
			event.stopPropagation();
			onPointerDown?.(event);
		},
		[onPointerDown, setShouldKeepOpen],
	);

	const handlePointerEnter = React.useCallback(
		(event) => {
			setShouldKeepOpen(true);
			isPointerOverTriggerRef.current = true;
			onPointerEnter?.(event);
		},
		[onPointerEnter, setShouldKeepOpen],
	);

	const handlePointerLeave = React.useCallback(
		(event) => {
			isPointerOverTriggerRef.current = false;
			if (!isPointerOverContentRef.current) {
				setShouldKeepOpen(false);
			}
			onPointerLeave?.(event);
		},
		[onPointerLeave, setShouldKeepOpen, isPointerOverContentRef],
	);

	const handleTouchStart = React.useCallback(
		(event) => {
			isTouchActiveRef.current = true;
			if (longPressTimeoutRef.current) {
				clearTimeout(longPressTimeoutRef.current);
			}

			longPressTimeoutRef.current = setTimeout(() => {
				if (isTouchActiveRef.current) {
					setShouldKeepOpen(true);
					isPointerOverTriggerRef.current = true;
					openTooltip();
					// En mobile, el preventDefault evita el menú contextual al hacer long press
					if (event.cancelable) event.preventDefault();
				}
			}, delay); // Usamos el delay del componente

			onTouchStart?.(event);
		},
		[onTouchStart, setShouldKeepOpen, openTooltip, delay],
	);

	const handleTouchEnd = React.useCallback(
		(event) => {
			isTouchActiveRef.current = false;
			if (longPressTimeoutRef.current) {
				clearTimeout(longPressTimeoutRef.current);
				longPressTimeoutRef.current = null;
			}
			onTouchEnd?.(event);
		},
		[onTouchEnd],
	);

	const handleTouchCancel = React.useCallback(
		(event) => {
			isTouchActiveRef.current = false;
			if (longPressTimeoutRef.current) {
				clearTimeout(longPressTimeoutRef.current);
				longPressTimeoutRef.current = null;
			}
			onTouchCancel?.(event);
		},
		[onTouchCancel],
	);

	return (
		<TooltipPrimitive.Trigger
			data-slot="tooltip-trigger"
			onClick={handleClick}
			onPointerDown={handlePointerDown}
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onTouchCancel={handleTouchCancel}
			{...props}
		/>
	);
}

function TooltipContent({
	className = "",
	side = "top",
	sideOffset = 4,
	align = "center",
	alignOffset = 0,
	variant = "raised",
	children = null,
	onPointerEnter,
	onPointerLeave,
	...props
}) {
	const {
		setShouldKeepOpen,
		isPointerOverTriggerRef,
		isPointerOverContentRef,
	} = React.useContext(TooltipInstanceContext);

	const handlePointerEnter = React.useCallback(
		(event) => {
			setShouldKeepOpen(true);
			isPointerOverContentRef.current = true;
			onPointerEnter?.(event);
		},
		[onPointerEnter, setShouldKeepOpen],
	);

	const handlePointerLeave = React.useCallback(
		(event) => {
			isPointerOverContentRef.current = false;
			if (!isPointerOverTriggerRef.current) {
				setShouldKeepOpen(false);
			}
			onPointerLeave?.(event);
		},
		[onPointerLeave, setShouldKeepOpen, isPointerOverTriggerRef],
	);

	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50"
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn(
						"data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-1.5 text-xs **:data-[slot=kbd]:rounded-md bg-background text-foreground dark:bg-sidebar z-50 w-fit max-w-xs origin-(--transform-origin)",
						buttonVariants({ variant, size: "default", animation: "none" }),
						className,
					)}
					onPointerEnter={handlePointerEnter}
					onPointerLeave={handlePointerLeave}
					{...props}
				>
					<div className="flex flex-col gap-2 z-50">{children}</div>

					<TooltipPrimitive.Arrow className="size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-background fill-background dark:bg-sidebar dark:fill-sidebar z-40 data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
