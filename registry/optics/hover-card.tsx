"use client";

import * as React from "react";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

import { cn } from "@/lib/utils";

type HoverCardProps = React.ComponentProps<typeof PreviewCardPrimitive.Root> & {
	delay?: number;
	children?: React.ReactNode;
};

type HoverCardTriggerProps = React.ComponentProps<
	typeof PreviewCardPrimitive.Trigger
>;

type HoverCardContentProps = Omit<
	React.ComponentProps<typeof PreviewCardPrimitive.Popup>,
	"className"
> & {
	className?: string;
	side?: React.ComponentProps<typeof PreviewCardPrimitive.Positioner>["side"];
	sideOffset?: React.ComponentProps<
		typeof PreviewCardPrimitive.Positioner
	>["sideOffset"];
	align?: React.ComponentProps<typeof PreviewCardPrimitive.Positioner>["align"];
	alignOffset?: React.ComponentProps<
		typeof PreviewCardPrimitive.Positioner
	>["alignOffset"];
};

type HoverCardOpenChangeDetails = Parameters<
	NonNullable<HoverCardProps["onOpenChange"]>
>[1];

function createHoverOpenChangeDetails(): HoverCardOpenChangeDetails {
	return {
		reason: "trigger-hover",
		event: new MouseEvent("mouseenter"),
		cancel: () => {},
		allowPropagation: () => {},
		isCanceled: false,
		isPropagationAllowed: false,
		trigger: undefined,
	};
}

type HoverCardInstanceContextValue = {
	shouldKeepOpenRef: React.MutableRefObject<boolean>;
	setShouldKeepOpen: (value: boolean) => void;
	isPointerOverTriggerRef: React.MutableRefObject<boolean>;
	isPointerOverContentRef: React.MutableRefObject<boolean>;
	openHoverCard: () => void;
	delay: number;
};

const HoverCardInstanceContext =
	React.createContext<HoverCardInstanceContextValue>({
		shouldKeepOpenRef: { current: false },
		setShouldKeepOpen: () => {},
		isPointerOverTriggerRef: { current: false },
		isPointerOverContentRef: { current: false },
		openHoverCard: () => {},
		delay: 600,
	});

function HoverCard({
	open: controlledOpen,
	onOpenChange,
	delay = 600,
	children = null,
	...props
}: HoverCardProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

	const isControlled = controlledOpen !== undefined;
	const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

	const shouldKeepOpenRef = React.useRef(false);
	const isPointerOverTriggerRef = React.useRef(false);
	const isPointerOverContentRef = React.useRef(false);

	const setShouldKeepOpen = React.useCallback((value: boolean) => {
		shouldKeepOpenRef.current = value;
	}, []);

	const openHoverCard = React.useCallback(() => {
		if (isControlled) {
			onOpenChange?.(true, createHoverOpenChangeDetails());
		} else {
			setUncontrolledOpen(true);
		}
	}, [isControlled, onOpenChange]);

	const handleOpenChange = React.useCallback(
		(nextOpen: boolean, eventDetails: HoverCardOpenChangeDetails) => {
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

	return (
		<HoverCardInstanceContext.Provider
			value={{
				shouldKeepOpenRef,
				setShouldKeepOpen,
				isPointerOverTriggerRef,
				isPointerOverContentRef,
				openHoverCard,
				delay,
			}}
		>
			<PreviewCardPrimitive.Root
				data-slot="hover-card"
				open={isOpen}
				onOpenChange={handleOpenChange}
				{...props}
			>
				{children}
			</PreviewCardPrimitive.Root>
		</HoverCardInstanceContext.Provider>
	);
}

function HoverCardTrigger({
	onClick,
	onPointerDown,
	onPointerLeave,
	onPointerEnter,
	onTouchStart,
	onTouchEnd,
	onTouchCancel,
	...props
}: HoverCardTriggerProps) {
	const {
		setShouldKeepOpen,
		isPointerOverTriggerRef,
		isPointerOverContentRef,
		openHoverCard,
		delay,
	} = React.useContext(HoverCardInstanceContext);

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
		(event: Parameters<NonNullable<HoverCardTriggerProps["onClick"]>>[0]) => {
			event.stopPropagation();
			onClick?.(event);
		},
		[onClick],
	);

	const handlePointerDown = React.useCallback(
		(
			event: Parameters<NonNullable<HoverCardTriggerProps["onPointerDown"]>>[0],
		) => {
			setShouldKeepOpen(true);
			isPointerOverTriggerRef.current = true;
			event.stopPropagation();
			onPointerDown?.(event);
		},
		[isPointerOverTriggerRef, onPointerDown, setShouldKeepOpen],
	);

	const handlePointerEnter = React.useCallback(
		(
			event: Parameters<
				NonNullable<HoverCardTriggerProps["onPointerEnter"]>
			>[0],
		) => {
			setShouldKeepOpen(true);
			isPointerOverTriggerRef.current = true;
			onPointerEnter?.(event);
		},
		[isPointerOverTriggerRef, onPointerEnter, setShouldKeepOpen],
	);

	const handlePointerLeave = React.useCallback(
		(
			event: Parameters<
				NonNullable<HoverCardTriggerProps["onPointerLeave"]>
			>[0],
		) => {
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
		(
			event: Parameters<NonNullable<HoverCardTriggerProps["onTouchStart"]>>[0],
		) => {
			isTouchActiveRef.current = true;
			if (longPressTimeoutRef.current) {
				clearTimeout(longPressTimeoutRef.current);
			}

			longPressTimeoutRef.current = setTimeout(() => {
				if (isTouchActiveRef.current) {
					setShouldKeepOpen(true);
					isPointerOverTriggerRef.current = true;
					openHoverCard();
					if (event.cancelable) event.preventDefault();
				}
			}, delay);

			onTouchStart?.(event);
		},
		[
			delay,
			isPointerOverTriggerRef,
			onTouchStart,
			openHoverCard,
			setShouldKeepOpen,
		],
	);

	const handleTouchEnd = React.useCallback(
		(
			event: Parameters<NonNullable<HoverCardTriggerProps["onTouchEnd"]>>[0],
		) => {
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
		(
			event: Parameters<NonNullable<HoverCardTriggerProps["onTouchCancel"]>>[0],
		) => {
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
		<PreviewCardPrimitive.Trigger
			data-slot="hover-card-trigger"
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

function HoverCardContent({
	className = "",
	side = "bottom",
	sideOffset = 4,
	align = "center",
	alignOffset = 4,
	onPointerEnter,
	onPointerLeave,
	...props
}: HoverCardContentProps) {
	const {
		setShouldKeepOpen,
		isPointerOverTriggerRef,
		isPointerOverContentRef,
	} = React.useContext(HoverCardInstanceContext);

	const handlePointerEnter = React.useCallback(
		(
			event: Parameters<
				NonNullable<HoverCardContentProps["onPointerEnter"]>
			>[0],
		) => {
			setShouldKeepOpen(true);
			isPointerOverContentRef.current = true;
			onPointerEnter?.(event);
		},
		[isPointerOverContentRef, onPointerEnter, setShouldKeepOpen],
	);

	const handlePointerLeave = React.useCallback(
		(
			event: Parameters<
				NonNullable<HoverCardContentProps["onPointerLeave"]>
			>[0],
		) => {
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
		<PreviewCardPrimitive.Portal data-slot="hover-card-portal">
			<PreviewCardPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50"
			>
				<PreviewCardPrimitive.Popup
					data-slot="hover-card-content"
					className={cn(
						"data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground w-72 rounded-lg p-2.5 text-xs/relaxed shadow-md ring-1 duration-100 z-50 origin-(--transform-origin) outline-hidden",
						className,
					)}
					onPointerEnter={handlePointerEnter}
					onPointerLeave={handlePointerLeave}
					{...props}
				/>
			</PreviewCardPrimitive.Positioner>
		</PreviewCardPrimitive.Portal>
	);
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
