"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/optics/button";

const TooltipProviderContext = React.createContext(false);

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
		<TooltipProviderContext.Provider value={true}>
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

function Tooltip({ onOpenChange, ...props } = {}) {
	const hasProvider = React.useContext(TooltipProviderContext);

	function handleOpenChange(nextOpen, eventDetails) {
		if (!nextOpen && eventDetails?.reason === "trigger-press") {
			// Mantén el tooltip abierto cuando el cierre proviene de un click en el trigger.
			eventDetails.cancel();
			return;
		}

		onOpenChange?.(nextOpen, eventDetails);
	}

	const tooltipRoot = (
		<TooltipPrimitive.Root
			data-slot="tooltip"
			onOpenChange={handleOpenChange}
			{...props}
		/>
	);

	// Si ya hay un TooltipProvider en el contexto, no crear otro
	// Esto permite que múltiples tooltips compartan el mismo Provider y skipDelayDuration funcione
	if (hasProvider) {
		return tooltipRoot;
	}

	// Si no hay Provider, crear uno con los valores por defecto
	return <TooltipProvider>{tooltipRoot}</TooltipProvider>;
}

function TooltipTrigger({ ...props } = {}) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
	className = "",
	side = "top",
	sideOffset = 4,
	align = "center",
	alignOffset = 0,
	variant = "raised",
	children = null,
	...props
}) {
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
