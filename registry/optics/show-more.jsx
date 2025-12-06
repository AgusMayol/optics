"use client";
import { cn } from '@/registry/optics/lib/utils';
import { ChevronDown } from "lucide-react";
import { Separator } from "@/registry/optics/separator";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/optics/accordion";
import { buttonVariants } from "@/registry/optics/button";
import { useState } from "react";

export function ShowMore({
	children,
	moreContent,
	maskColor = "oklch(var(--background))",
	showSeparator = true,
}) {
	const [open, setOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isOpening, setIsOpening] = useState(false);

	// If no moreContent is provided, don't render the show more functionality
	const hasMoreContent = moreContent != null;

	const handleButtonClick = (e) => {
		if (open) {
			// Prevent default accordion behavior
			e.preventDefault();
			e.stopPropagation();
			// Start closing animation - close accordion immediately so Show More button can appear
			setIsClosing(true);
			setOpen(false);
			// Reset closing state after animation completes
			setTimeout(() => {
				setIsClosing(false);
			}, 250);
		}
	};

	const ShowMoreButton = () => (
		<div className="w-full -mt-4.5 flex items-center justify-center pb-2">
			<div
				className={cn(
					buttonVariants({
						variant: "raised",
						size: "default",
					}),
					"rounded-full squircle-none z-10 relative overflow-hidden",
				)}
				onClick={open ? handleButtonClick : undefined}
			>
				<div
					className={cn(
						"absolute inset-0 flex mr-6 items-center justify-center transition-all duration-300 ease-in-out will-change-[transform,opacity]",
						open && !isClosing
							? "translate-y-0 opacity-100"
							: "translate-y-full opacity-0",
					)}
				>
					Show Less
				</div>
				<div
					className={cn(
						"transition-all duration-300 ease-in-out will-change-[transform,opacity]",
						open && !isClosing
							? "-translate-y-full opacity-0"
							: "translate-y-0 opacity-100",
					)}
				>
					Show More
				</div>
				<ChevronDown
					className={cn(
						"text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-300 ease-in-out -mt-0.5",
						open ? "rotate-180" : "rotate-0",
					)}
				/>
			</div>
		</div>
	);

	// If no moreContent, just render children
	if (!hasMoreContent) {
		return <div>{children}</div>;
	}

	// Helper function to extract color variable
	const getColorVar = (color) => {
		// If it's a CSS value (contains functions or hex), return it as is
		if (color.match(/\(|var\(|hsl\(|oklch\(|rgb\(|rgba\(|#[0-9a-fA-F]/)) {
			return color;
		}

		// Extract color name from Tailwind classes like "from-background" or "bg-background"
		const colorName = color.startsWith("from-")
			? color.slice(5)
			: color.startsWith("bg-")
				? color.slice(3)
				: color;

		// Return CSS variable format
		return `var(--${colorName})`;
	};

	// Get default and dark colors
	const defaultColor =
		typeof maskColor === "object" && maskColor !== null
			? maskColor.default || maskColor.dark || "oklch(var(--background))"
			: maskColor;
	const darkColor =
		typeof maskColor === "object" && maskColor !== null
			? maskColor.dark || maskColor.default || "oklch(var(--background))"
			: maskColor;

	const handleValueChange = (value) => {
		if (value === "show-more") {
			// Opening - start opening animation
			setIsOpening(true);
			setOpen(true);
			setIsClosing(false);
			// Reset opening state after animation
			setTimeout(() => {
				setIsOpening(false);
			}, 400);
		} else if (value === "") {
			// Accordion closed externally - reset states
			if (open && !isClosing) {
				setIsClosing(true);
				setTimeout(() => {
					setIsClosing(false);
				}, 300);
			}
		}
		// Closing is handled by handleButtonClick
	};

	return (
		<Accordion
			type={"single"}
			collapsible
			className="w-full"
			value={open && !isClosing ? "show-more" : ""}
			onValueChange={handleValueChange}
		>
			<AccordionItem value="show-more" className="w-full rounded-b-xl">
				<div className="relative">
					{/* Main content - always visible */}
					<div className="relative">
						<div className="relative transition-all duration-200 ease-in-out">
							{children}
						</div>
					</div>

					{/* Show More button - appears when collapsed */}
					{!open && (
						<div
							className={cn(
								"w-full pt-6 relative transition-opacity duration-250 ease-in-out",
								isClosing ? "opacity-100" : "opacity-100",
							)}
							style={{
								transition: "opacity 250ms cubic-bezier(0.4, 0, 1, 1)",
							}}
						>
							{showSeparator && (
								<div className="relative z-[1]">
									<Separator decoration />
								</div>
							)}
							{/* Fade mask container - covers from separator (bottom) to top (text) */}
							<div
								aria-hidden="true"
								className="pointer-events-none absolute inset-x-0 bottom-6.75 z-[5]"
								style={{
									height: "80px",
								}}
							>
								{/* Light mode mask */}
								<div
									className="dark:hidden absolute inset-x-0 bottom-0 h-full"
									style={{
										backgroundImage: `linear-gradient(to top, ${getColorVar(defaultColor)}, transparent)`,
									}}
								/>
								{/* Dark mode mask */}
								<div
									className="hidden dark:block absolute inset-x-0 bottom-0 h-full"
									style={{
										backgroundImage: `linear-gradient(to top, ${getColorVar(darkColor)}, transparent)`,
									}}
								/>
							</div>
							<AccordionTrigger
								showArrow={false}
								className="w-full px-0 pt-0 pb-0 group flex-row-reverse items-center justify-end hover:no-underline hover:cursor-pointer rounded-none [&>svg]:hidden relative z-10"
							>
								<ShowMoreButton />
							</AccordionTrigger>
						</div>
					)}
				</div>

				<AccordionContent
					className="border-b-0 border-x-0 pb-0 shadow-none pt-0 relative overflow-hidden"
					keepRendered
				>
					<div
						className={cn(
							"relative will-change-[transform,opacity]",
							open && !isClosing && !isOpening
								? "opacity-100 translate-y-0"
								: isClosing
									? "opacity-0 translate-y-1"
									: isOpening
										? "opacity-0 translate-y-4"
										: "opacity-0 translate-y-4",
						)}
						style={{
							transition:
								open && !isClosing && !isOpening
									? "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)"
									: isClosing
										? "opacity 250ms cubic-bezier(0.4, 0, 1, 1), transform 250ms cubic-bezier(0.4, 0, 1, 1)"
										: "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
						}}
					>
						{moreContent}
					</div>
				</AccordionContent>

				{/* Show Less button at bottom when open - outside AccordionContent to avoid overflow issues */}
				{(open || isClosing) && (
					<div
						className={cn(
							"w-full mt-8 relative transition-opacity duration-250 ease-in-out",
							isClosing ? "opacity-0" : "opacity-100",
						)}
					>
						{showSeparator && (
							<div className="relative z-[10]">
								<Separator decoration />
							</div>
						)}
						<AccordionTrigger
							showArrow={false}
							className="w-full px-0 pt-0 pb-0 group flex-row-reverse items-center justify-end hover:no-underline hover:cursor-pointer rounded-none [&>svg]:hidden relative z-[11]"
						>
							<ShowMoreButton />
						</AccordionTrigger>
						{/* Fade mask from separator line (bottom) to top (text) */}
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-x-0 bottom-6.75 z-[9]"
							style={{ height: "40px" }}
						>
							{/* Light mode mask */}
							<div
								className="dark:hidden absolute inset-x-0 bottom-0 h-full"
								style={{
									backgroundImage: `linear-gradient(to top, ${getColorVar(defaultColor)}, transparent)`,
								}}
							/>
							{/* Dark mode mask */}
							<div
								className="hidden dark:block absolute inset-x-0 bottom-0 h-full"
								style={{
									backgroundImage: `linear-gradient(to top, ${getColorVar(darkColor)}, transparent)`,
								}}
							/>
						</div>
					</div>
				)}
			</AccordionItem>
		</Accordion>
	);
}
