"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/optics/button";

type TooltipProviderContextValue = {
	hasProvider: boolean;
	delay: number;
};

const TooltipProviderContext = React.createContext<TooltipProviderContextValue>({
	hasProvider: false,
	delay: 400,
});

type TooltipInstanceContextValue = {
	shouldKeepOpenRef: React.RefObject<boolean>;
	setShouldKeepOpen: (value: boolean) => void;
	isPointerOverTriggerRef: React.RefObject<boolean>;
	isPointerOverContentRef: React.RefObject<boolean>;
	openTooltip: () => void;
	delay: number;
};

const TooltipInstanceContext = React.createContext<TooltipInstanceContextValue>({
	shouldKeepOpenRef: { current: false },
	setShouldKeepOpen: () => {},
	isPointerOverTriggerRef: { current: false },
	isPointerOverContentRef: { current: false },
	openTooltip: () => {},
	delay: 400,
});

export type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider> & {
	delayDuration?: number;
	skipDelayDuration?: number;
};

function TooltipProvider({
	delay = 400,
	delayDuration = undefined,
	skipDelayDuration: _skipDelayDuration = 0,
	children,
	...props
}: TooltipProviderProps) {
	const resolvedDelayDuration = delayDuration ?? delay;

	return (
		<TooltipProviderContext.Provider value={{ hasProvider: true, delay: resolvedDelayDuration }}>
			<TooltipPrimitive.Provider delay={resolvedDelayDuration} {...props}>
				{children}
			</TooltipPrimitive.Provider>
		</TooltipProviderContext.Provider>
	);
}

export type TooltipProps = Omit<
	React.ComponentProps<typeof TooltipPrimitive.Root>,
	"onOpenChange"
> & {
	delay?: number;
	onOpenChange?: (open: boolean, eventDetails?: TooltipPrimitive.Root.ChangeEventDetails) => void;
};

function Tooltip({
	open: controlledOpen,
	onOpenChange,
	delay: localDelay,
	...props
}: TooltipProps) {
	const { hasProvider, delay: providerDelay } = React.useContext(TooltipProviderContext);
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

	const isControlled = controlledOpen !== undefined;
	const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

	const effectiveDelay = localDelay ?? providerDelay ?? 400;

	const shouldKeepOpenRef = React.useRef(false);
	const isPointerOverTriggerRef = React.useRef(false);
	const isPointerOverContentRef = React.useRef(false);

	const setShouldKeepOpen = React.useCallback((value: boolean) => {
		shouldKeepOpenRef.current = value;
	}, []);

	const openTooltip = React.useCallback(() => {
		if (isControlled) {
			onOpenChange?.(true);
		} else {
			setUncontrolledOpen(true);
		}
	}, [isControlled, onOpenChange]);

	function handleOpenChange(
		nextOpen: boolean,
		eventDetails: TooltipPrimitive.Root.ChangeEventDetails,
	) {
		if (!nextOpen) {
			if (
				isPointerOverTriggerRef.current ||
				isPointerOverContentRef.current ||
				shouldKeepOpenRef.current
			) {
				if (isControlled) {
					onOpenChange?.(true, eventDetails);
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
			<TooltipPrimitive.Root open={isOpen} onOpenChange={handleOpenChange} {...props} />
		</TooltipInstanceContext.Provider>
	);

	if (hasProvider) {
		return tooltipRoot;
	}

	return <TooltipProvider delay={effectiveDelay}>{tooltipRoot}</TooltipProvider>;
}

export type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>;

function TooltipTrigger({
	onClick,
	onPointerDown,
	onPointerLeave,
	onPointerEnter,
	onTouchStart,
	onTouchEnd,
	onTouchCancel,
	...props
}: TooltipTriggerProps) {
	const {
		setShouldKeepOpen,
		isPointerOverTriggerRef,
		isPointerOverContentRef,
		openTooltip,
		delay,
	} = React.useContext(TooltipInstanceContext);

	const longPressTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
	const isTouchActiveRef = React.useRef(false);

	React.useEffect(() => {
		return () => {
			if (longPressTimeoutRef.current) {
				clearTimeout(longPressTimeoutRef.current);
			}
		};
	}, []);

	const handleClick = React.useCallback<NonNullable<TooltipTriggerProps["onClick"]>>(
		(event) => {
			event.stopPropagation();
			onClick?.(event);
		},
		[onClick],
	);

	const handlePointerDown = React.useCallback<NonNullable<TooltipTriggerProps["onPointerDown"]>>(
		(event) => {
			setShouldKeepOpen(true);
			isPointerOverTriggerRef.current = true;
			event.stopPropagation();
			onPointerDown?.(event);
		},
		[onPointerDown, setShouldKeepOpen, isPointerOverTriggerRef],
	);

	const handlePointerEnter = React.useCallback<NonNullable<TooltipTriggerProps["onPointerEnter"]>>(
		(event) => {
			setShouldKeepOpen(true);
			isPointerOverTriggerRef.current = true;
			onPointerEnter?.(event);
		},
		[onPointerEnter, setShouldKeepOpen, isPointerOverTriggerRef],
	);

	const handlePointerLeave = React.useCallback<NonNullable<TooltipTriggerProps["onPointerLeave"]>>(
		(event) => {
			isPointerOverTriggerRef.current = false;
			if (!isPointerOverContentRef.current) {
				setShouldKeepOpen(false);
			}
			onPointerLeave?.(event);
		},
		[onPointerLeave, setShouldKeepOpen, isPointerOverTriggerRef, isPointerOverContentRef],
	);

	const handleTouchStart = React.useCallback<NonNullable<TooltipTriggerProps["onTouchStart"]>>(
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
					if (event.cancelable) event.preventDefault();
				}
			}, delay);

			onTouchStart?.(event);
		},
		[onTouchStart, setShouldKeepOpen, isPointerOverTriggerRef, openTooltip, delay],
	);

	const handleTouchEnd = React.useCallback<NonNullable<TooltipTriggerProps["onTouchEnd"]>>(
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

	const handleTouchCancel = React.useCallback<NonNullable<TooltipTriggerProps["onTouchCancel"]>>(
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

export type TooltipContentProps = Omit<
	React.ComponentProps<typeof TooltipPrimitive.Popup>,
	"className"
> &
	Pick<
		React.ComponentProps<typeof TooltipPrimitive.Positioner>,
		"align" | "alignOffset" | "side" | "sideOffset"
	> & {
		className?: string;
		variant?: VariantProps<typeof buttonVariants>["variant"];
	};

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
}: TooltipContentProps) {
	const { setShouldKeepOpen, isPointerOverTriggerRef, isPointerOverContentRef } =
		React.useContext(TooltipInstanceContext);

	const handlePointerEnter = React.useCallback<NonNullable<TooltipContentProps["onPointerEnter"]>>(
		(event) => {
			setShouldKeepOpen(true);
			isPointerOverContentRef.current = true;
			onPointerEnter?.(event);
		},
		[onPointerEnter, setShouldKeepOpen, isPointerOverContentRef],
	);

	const handlePointerLeave = React.useCallback<NonNullable<TooltipContentProps["onPointerLeave"]>>(
		(event) => {
			isPointerOverContentRef.current = false;
			if (!isPointerOverTriggerRef.current) {
				setShouldKeepOpen(false);
			}
			onPointerLeave?.(event);
		},
		[onPointerLeave, setShouldKeepOpen, isPointerOverContentRef, isPointerOverTriggerRef],
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

Tooltip.displayName = "Tooltip";
TooltipTrigger.displayName = "TooltipTrigger";
TooltipContent.displayName = "TooltipContent";
TooltipProvider.displayName = "TooltipProvider";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
