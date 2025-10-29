"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";
import { otherThemes } from "@/registry/agusmayol/button";

// Context personalizado para manejar el estado de tooltips
const TooltipContext = React.createContext({
	hasActiveTooltip: false,
	setHasActiveTooltip: () => {},
	firstTooltipDelay: 400,
	subsequentTooltipDelay: 0,
	isFirstTooltip: true,
	setIsFirstTooltip: () => {},
});

function TooltipProvider({
	delayDuration = 400,
	skipDelayDuration = 0,
	...props
}) {
	const [hasActiveTooltip, setHasActiveTooltip] = React.useState(false);
	const [isFirstTooltip, setIsFirstTooltip] = React.useState(true);
	
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
				setIsFirstTooltip
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

function Tooltip({ ...props }) {
	const { hasActiveTooltip, setHasActiveTooltip, setIsFirstTooltip } = React.useContext(TooltipContext);
	const [isOpen, setIsOpen] = React.useState(false);

	// Manejar el estado de apertura y actualizar el contexto
	const handleOpenChange = React.useCallback((open) => {
		setIsOpen(open);
		if (open) {
			// Si es el primer tooltip (no hay ninguno activo), marcarlo como tal
			if (!hasActiveTooltip) {
				setIsFirstTooltip(true);
			} else {
				setIsFirstTooltip(false);
			}
			setHasActiveTooltip(true);
		} else {
			setHasActiveTooltip(false);
			// Resetear para el próximo tooltip
			setIsFirstTooltip(true);
		}
	}, [hasActiveTooltip, setHasActiveTooltip, setIsFirstTooltip]);

	return (
		<TooltipPrimitive.Root 
			data-slot="tooltip" 
			open={isOpen}
			onOpenChange={handleOpenChange}
			{...props} 
		/>
	);
}

function TooltipTrigger({ ...props }) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({ className, sideOffset = 0, children, ...props }) {
	const { isFirstTooltip } = React.useContext(TooltipContext);
	
	// Clases de animación condicionales
	const animationClasses = isFirstTooltip 
		? "animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2" // Con animación para el primer tooltip
		: ""; // Sin animación para tooltips subsecuentes

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
					"bg-sidebar",
				)}
				{...props}
			>
				{children}
				<TooltipPrimitive.Arrow
					className={cn(
						"bg-sidebar fill-sidebar z-20 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
					)}
				/>
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
