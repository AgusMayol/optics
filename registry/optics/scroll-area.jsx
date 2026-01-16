"use client";

import * as React from "react";

import { cn } from "@/registry/optics/lib/utils";

const ScrollArea = React.forwardRef(
	(
		{
			className = "",
			children = null,
			scrollHideDelay = 0,
			viewportClassName = "",
			maskClassName = "",
			maskHeight = 30,
			maskColor = undefined,
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

			checkScrollability();

			return () => {
				controller.abort();
				resizeObserver.disconnect();
			};
		}, [checkScrollability]);

		return (
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
						"size-full overflow-auto rounded-[inherit] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
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
		);
	},
);

ScrollArea.displayName = "ScrollArea";

const ScrollBar = () => null;


const ScrollMask = ({
	showMask,
	maskHeight,
	maskColor = undefined,
	className = "",
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


ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };

