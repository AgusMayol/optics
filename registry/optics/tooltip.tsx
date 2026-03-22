"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/optics/button";

type ButtonVariantOptions = NonNullable<Parameters<typeof buttonVariants>[0]>;
type TooltipProviderProps = Omit<
	React.ComponentProps<typeof TooltipPrimitive.Provider>,
	"children"
> & {
	children?: React.ReactNode;
	delayDuration?: number;
	skipDelayDuration?: number;
	shared?: boolean;
};
type TooltipRootProps = React.ComponentProps<typeof TooltipPrimitive.Root> & {
	delay?: number;
};
type TooltipTriggerProps = React.ComponentProps<
	typeof TooltipPrimitive.Trigger
>;
type TooltipContentProps = Omit<
	React.ComponentProps<typeof TooltipPrimitive.Popup>,
	"className" | "children"
> & {
	className?: string;
	children?: React.ReactNode;
	side?: React.ComponentProps<typeof TooltipPrimitive.Positioner>["side"];
	sideOffset?: React.ComponentProps<
		typeof TooltipPrimitive.Positioner
	>["sideOffset"];
	align?: React.ComponentProps<typeof TooltipPrimitive.Positioner>["align"];
	alignOffset?: React.ComponentProps<
		typeof TooltipPrimitive.Positioner
	>["alignOffset"];
	variant?: ButtonVariantOptions["variant"];
};
type TooltipOpenChangeDetails = Parameters<
	NonNullable<TooltipRootProps["onOpenChange"]>
>[1];
type TooltipTriggerClickEvent = Parameters<
	NonNullable<TooltipTriggerProps["onClick"]>
>[0];
type TooltipTriggerPointerEvent = Parameters<
	NonNullable<TooltipTriggerProps["onPointerDown"]>
>[0];
type TooltipTriggerTouchEvent = Parameters<
	NonNullable<TooltipTriggerProps["onTouchStart"]>
>[0];
type TooltipContentPointerEvent = Parameters<
	NonNullable<TooltipContentProps["onPointerEnter"]>
>[0];

type TooltipProviderContextValue = {
	hasProvider: boolean;
	delay: number;
};

type TooltipInstanceContextValue = {
	shouldKeepOpenRef: React.MutableRefObject<boolean>;
	setShouldKeepOpen: (value: boolean) => void;
	isPointerOverTriggerRef: React.MutableRefObject<boolean>;
	isPointerOverContentRef: React.MutableRefObject<boolean>;
	openTooltip: () => void;
	delay: number;
};

const TooltipProviderContext = React.createContext<TooltipProviderContextValue>(
	{
		hasProvider: false,
		delay: 400,
	},
);

const TooltipInstanceContext = React.createContext<TooltipInstanceContextValue>(
	{
		shouldKeepOpenRef: { current: false },
		setShouldKeepOpen: () => {},
		isPointerOverTriggerRef: { current: false },
		isPointerOverContentRef: { current: false },
		openTooltip: () => {},
		delay: 400,
	},
);

function TooltipProvider({
	delay = 400,
	timeout,
	closeDelay,
	delayDuration,
	skipDelayDuration = 0,
	shared: _shared = true,
	children,
	...props
}: TooltipProviderProps) {
	const resolvedDelayDuration = delayDuration ?? delay;

	return (
		<TooltipProviderContext.Provider
			value={{ hasProvider: true, delay: resolvedDelayDuration }}
		>
			<TooltipPrimitive.Provider
				data-slot="tooltip-provider"
				delay={resolvedDelayDuration}
				closeDelay={closeDelay}
				timeout={skipDelayDuration ?? timeout}
				{...props}
			>
				{children}
			</TooltipPrimitive.Provider>
		</TooltipProviderContext.Provider>
	);
}

function Tooltip({
	open: controlledOpen,
	onOpenChange,
	delay: localDelay,
	...props
}: TooltipRootProps) {
	const { hasProvider, delay: providerDelay } = React.useContext(
		TooltipProviderContext,
	);
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
		if (!isControlled) {
			setUncontrolledOpen(true);
		}
	}, [isControlled]);

	const handleOpenChange = React.useCallback(
		(nextOpen: boolean, eventDetails: TooltipOpenChangeDetails) => {
			if (
				!nextOpen &&
				(isPointerOverTriggerRef.current ||
					isPointerOverContentRef.current ||
					shouldKeepOpenRef.current)
			) {
				if (isControlled) {
					onOpenChange?.(true, eventDetails);
				} else {
					setUncontrolledOpen(true);
				}
				return;
			}

			if (!isControlled) {
				setUncontrolledOpen(nextOpen);
			}

			setShouldKeepOpen(nextOpen);
			onOpenChange?.(nextOpen, eventDetails);
		},
		[isControlled, onOpenChange, setShouldKeepOpen],
	);

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
				{...props}
			/>
		</TooltipInstanceContext.Provider>
	);

	if (hasProvider) {
		return tooltipRoot;
	}

	return (
		<TooltipProvider delay={effectiveDelay}>{tooltipRoot}</TooltipProvider>
	);
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
}: TooltipTriggerProps) {
	const {
		setShouldKeepOpen,
		isPointerOverTriggerRef,
		isPointerOverContentRef,
		openTooltip,
		delay,
	} = React.useContext(TooltipInstanceContext);

	const longPressTimeoutRef = React.useRef<ReturnType<
		typeof setTimeout
	> | null>(null);
	const isTouchActiveRef = React.useRef(false);

	React.useEffect(() => {
		return () => {
			if (longPressTimeoutRef.current) {
				clearTimeout(longPressTimeoutRef.current);
			}
		};
	}, []);

	const handleClick = React.useCallback(
		(event: TooltipTriggerClickEvent) => {
			event.stopPropagation();
			onClick?.(event);
		},
		[onClick],
	);

	const handlePointerDown = React.useCallback(
		(event: TooltipTriggerPointerEvent) => {
			setShouldKeepOpen(true);
			isPointerOverTriggerRef.current = true;
			event.stopPropagation();
			onPointerDown?.(event);
		},
		[isPointerOverTriggerRef, onPointerDown, setShouldKeepOpen],
	);

	const handlePointerEnter = React.useCallback(
		(event: TooltipTriggerPointerEvent) => {
			setShouldKeepOpen(true);
			isPointerOverTriggerRef.current = true;
			onPointerEnter?.(event);
		},
		[isPointerOverTriggerRef, onPointerEnter, setShouldKeepOpen],
	);

	const handlePointerLeave = React.useCallback(
		(event: TooltipTriggerPointerEvent) => {
			isPointerOverTriggerRef.current = false;
			if (!isPointerOverContentRef.current) {
				setShouldKeepOpen(false);
			}
			onPointerLeave?.(event);
		},
		[
			isPointerOverContentRef,
			isPointerOverTriggerRef,
			onPointerLeave,
			setShouldKeepOpen,
		],
	);

	const handleTouchStart = React.useCallback(
		(event: TooltipTriggerTouchEvent) => {
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
		[
			delay,
			isPointerOverTriggerRef,
			onTouchStart,
			openTooltip,
			setShouldKeepOpen,
		],
	);

	const handleTouchEnd = React.useCallback(
		(event: TooltipTriggerTouchEvent) => {
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
		(event: TooltipTriggerTouchEvent) => {
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
}: TooltipContentProps) {
	const {
		setShouldKeepOpen,
		isPointerOverTriggerRef,
		isPointerOverContentRef,
	} = React.useContext(TooltipInstanceContext);

	const handlePointerEnter = React.useCallback(
		(event: TooltipContentPointerEvent) => {
			setShouldKeepOpen(true);
			isPointerOverContentRef.current = true;
			onPointerEnter?.(event);
		},
		[isPointerOverContentRef, onPointerEnter, setShouldKeepOpen],
	);

	const handlePointerLeave = React.useCallback(
		(event: TooltipContentPointerEvent) => {
			isPointerOverContentRef.current = false;
			if (!isPointerOverTriggerRef.current) {
				setShouldKeepOpen(false);
			}
			onPointerLeave?.(event);
		},
		[
			isPointerOverContentRef,
			isPointerOverTriggerRef,
			onPointerLeave,
			setShouldKeepOpen,
		],
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
