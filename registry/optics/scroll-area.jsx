"use client";

import * as React from "react";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from '@/registry/optics/lib/utils';

import { useTouchPrimary } from '@/registry/optics/hooks/use-has-primary-touch';

const ScrollAreaContext = React.createContext(false);

const ScrollArea = React.forwardRef(
	(
		{
			className,
			children,
			scrollHideDelay = 0,
			viewportClassName,
			maskClassName,
			maskHeight = 30,
			maskColor,
			...props
		},
		ref,
	) => {
		const [showMask, setShowMask] = React.useState({
			top: false,
			bottom: false,
			left: false,
			right: false,
		});
		const viewportRef = React.useRef(null);
		const isTouch = useTouchPrimary();

		const checkScrollability = React.useCallback(() => {
			const element = viewportRef.current;
			if (!element) return;

			const {
				scrollTop,
				scrollLeft,
				scrollWidth,
				clientWidth,
				scrollHeight,
				clientHeight,
			} = element;
			setShowMask((prev) => ({
				...prev,
				top: scrollTop > 0,
				bottom: scrollTop + clientHeight < scrollHeight - 1,
				left: scrollLeft > 0,
				right: scrollLeft + clientWidth < scrollWidth - 1,
			}));
		}, []);

		React.useEffect(() => {
			if (typeof window === "undefined") return;

			const element = viewportRef.current;
			if (!element) return;

			const controller = new AbortController();
			const { signal } = controller;

			const resizeObserver = new ResizeObserver(checkScrollability);
			resizeObserver.observe(element);

			element.addEventListener("scroll", checkScrollability, { signal });
			window.addEventListener("resize", checkScrollability, { signal });

			// Run an initial check whenever dependencies change (including pointer mode)
			checkScrollability();

			return () => {
				controller.abort();
				resizeObserver.disconnect();
			};
		}, [checkScrollability, isTouch]);

		return (
			<ScrollAreaContext.Provider value={isTouch}>
				{isTouch ? (
					<div
						ref={ref}
						role="group"
						data-slot="scroll-area"
						aria-roledescription="scroll area"
						className={cn("relative overflow-hidden", className)}
						{...props}
					>
						<div
							ref={viewportRef}
							data-slot="scroll-area-viewport"
							className={cn(
								"size-full overflow-auto rounded-[inherit]",
								viewportClassName,
							)}
							tabIndex={0}
						>
							{children}
						</div>

						{maskHeight > 0 && (
							<ScrollMask
								showMask={showMask}
								className={maskClassName}
								maskHeight={maskHeight}
								maskColor={maskColor}
							/>
						)}
					</div>
				) : (
					<ScrollAreaPrimitive.Root
						ref={ref}
						data-slot="scroll-area"
						scrollHideDelay={scrollHideDelay}
						className={cn("relative overflow-hidden", className)}
						{...props}
					>
						<ScrollAreaPrimitive.Viewport
							ref={viewportRef}
							data-slot="scroll-area-viewport"
							className={cn("size-full rounded-[inherit]", viewportClassName)}
						>
							{children}
						</ScrollAreaPrimitive.Viewport>

						{maskHeight > 0 && (
							<ScrollMask
								showMask={showMask}
								className={maskClassName}
								maskHeight={maskHeight}
								maskColor={maskColor}
							/>
						)}
						<ScrollBar />
						<ScrollAreaPrimitive.Corner />
					</ScrollAreaPrimitive.Root>
				)}
			</ScrollAreaContext.Provider>
		);
	},
);

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef(
	({ className, orientation = "vertical", ...props }, ref) => {
		const isTouch = React.useContext(ScrollAreaContext);

		if (isTouch) return null;

		return (
			<ScrollAreaPrimitive.ScrollAreaScrollbar
				ref={ref}
				orientation={orientation}
				data-slot="scroll-area-scrollbar"
				className={cn(
					"hover:bg-muted dark:hover:bg-muted/50 data-[state=visible]:fade-in-0 data-[state=hidden]:fade-out-0 data-[state=visible]:animate-in data-[state=hidden]:animate-out flex touch-none p-px transition-[colors] duration-150 select-none",
					orientation === "vertical" &&
						"h-full w-2.5 border-l border-l-transparent",
					orientation === "horizontal" &&
						"h-2.5 flex-col border-t border-t-transparent px-1 pr-1.25",
					className,
				)}
				{...props}
			>
				<ScrollAreaPrimitive.ScrollAreaThumb
					data-slot="scroll-area-thumb"
					className={cn(
						"bg-border relative flex-1 origin-center rounded-full transition-[scale]",
						orientation === "vertical" && "my-1 active:scale-y-95",
						orientation === "horizontal" && "active:scale-x-98",
					)}
				/>
			</ScrollAreaPrimitive.ScrollAreaScrollbar>
		);
	},
);

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

const ScrollMask = ({
	showMask,
	maskHeight,
	maskColor,
	className,
	...props
}) => {
	// Extract color name from maskColor (e.g., "from-sidebar" -> "sidebar", "sidebar" -> "sidebar")
	const getColorVar = () => {
		if (!maskColor || maskColor === "from-background") {
			return null; // Use default Tailwind classes
		}
		const colorName = maskColor.startsWith("from-")
			? maskColor.slice(5) // Remove "from-" prefix
			: maskColor;
		// Map color name to CSS variable
		return `var(--${colorName})`;
	};

	const colorVar = getColorVar();
	const useCustomColor = colorVar !== null;

	return (
		<>
			<div
				{...props}
				aria-hidden="true"
				className={cn("pointer-events-none absolute inset-0 z-10", className)}
			>
				{useCustomColor ? (
					<>
						<div
							className="absolute inset-x-0 top-0 transition-[height,opacity] duration-300"
							style={{
								height: showMask.top ? `${maskHeight}px` : "0px",
								opacity: showMask.top ? 1 : 0,
								backgroundImage: `linear-gradient(to bottom, ${colorVar}, transparent)`,
							}}
						/>
						<div
							className="absolute inset-x-0 bottom-0 transition-[height,opacity] duration-300"
							style={{
								height: showMask.bottom ? `${maskHeight}px` : "0px",
								opacity: showMask.bottom ? 1 : 0,
								backgroundImage: `linear-gradient(to top, ${colorVar}, transparent)`,
							}}
						/>
					</>
				) : (
					<>
						<div
							className={cn(
								"absolute inset-x-0 top-0 transition-[height,opacity] duration-300 before:from-background before:bg-gradient-to-b before:to-transparent",
								"before:absolute before:inset-x-0 before:top-0 before:h-full before:content-['']",
								showMask.top ? "before:opacity-100" : "before:opacity-0",
							)}
							style={{
								height: showMask.top ? `${maskHeight}px` : "0px",
							}}
						/>
						<div
							className={cn(
								"absolute inset-x-0 bottom-0 transition-[height,opacity] duration-300 after:from-background after:bg-gradient-to-t after:to-transparent",
								"after:absolute after:inset-x-0 after:bottom-0 after:h-full after:content-['']",
								showMask.bottom ? "after:opacity-100" : "after:opacity-0",
							)}
							style={{
								height: showMask.bottom ? `${maskHeight}px` : "0px",
							}}
						/>
					</>
				)}
			</div>
			<div
				{...props}
				aria-hidden="true"
				className={cn("pointer-events-none absolute inset-0 z-10", className)}
			>
				{useCustomColor ? (
					<>
						<div
							className="absolute inset-y-0 left-0 transition-[width,opacity] duration-300"
							style={{
								width: showMask.left ? `${maskHeight}px` : "0px",
								opacity: showMask.left ? 1 : 0,
								backgroundImage: `linear-gradient(to right, ${colorVar}, transparent)`,
							}}
						/>
						<div
							className="absolute inset-y-0 right-0 transition-[width,opacity] duration-300"
							style={{
								width: showMask.right ? `${maskHeight}px` : "0px",
								opacity: showMask.right ? 1 : 0,
								backgroundImage: `linear-gradient(to left, ${colorVar}, transparent)`,
							}}
						/>
					</>
				) : (
					<>
						<div
							className={cn(
								"absolute inset-y-0 left-0 transition-[width,opacity] duration-300 before:from-background before:bg-gradient-to-r before:to-transparent",
								"before:absolute before:inset-y-0 before:left-0 before:w-full before:content-['']",
								showMask.left ? "before:opacity-100" : "before:opacity-0",
							)}
							style={{
								width: showMask.left ? `${maskHeight}px` : "0px",
							}}
						/>
						<div
							className={cn(
								"absolute inset-y-0 right-0 transition-[width,opacity] duration-300 after:from-background after:bg-gradient-to-l after:to-transparent",
								"after:absolute after:inset-y-0 after:right-0 after:w-full after:content-['']",
								showMask.right ? "after:opacity-100" : "after:opacity-0",
							)}
							style={{
								width: showMask.right ? `${maskHeight}px` : "0px",
							}}
						/>
					</>
				)}
			</div>
		</>
	);
};

export { ScrollArea, ScrollBar };
