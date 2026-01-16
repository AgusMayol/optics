"use client";
import { cn } from "@/registry/optics/lib/utils";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/registry/optics/separator";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	useAccordionItem,
} from "@/registry/optics/accordion";
import { buttonVariants } from "@/registry/optics/button";
import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

// Helper function to extract color variable
const getColorVar = (color) => {
	if (!color) return "oklch(var(--background))";
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

function ShowMoreButton({ isOpen }) {
	return (
		<div className="w-full -mt-4.5 flex items-center justify-center pb-2">
			<div
				className={cn(
					buttonVariants({
						variant: "raised",
						size: "default",
					}),
					"rounded-full squircle-none z-10 relative overflow-hidden",
				)}
			>
				<div
					className={cn(
						"absolute inset-0 flex mr-6 items-center justify-center transition-all duration-300 ease-in-out will-change-[transform,opacity]",
						isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
					)}
				>
					Show Less
				</div>
				<div
					className={cn(
						"transition-all duration-300 ease-in-out will-change-[transform,opacity]",
						isOpen
							? "-translate-y-full opacity-0"
							: "translate-y-0 opacity-100",
					)}
				>
					Show More
				</div>
				<ChevronDown
					className={cn(
						"text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-300 ease-in-out -mt-0.5",
						isOpen ? "rotate-180" : "rotate-0",
					)}
				/>
			</div>
		</div>
	);
}

function ShowMoreContent({
	children,
	moreContent,
	showSeparator,
	maskColor,
	defaultColor,
	darkColor,
}) {
	const { isOpen } = useAccordionItem();

	return (
		<div className="relative">
			{/* Main content - always visible */}
			<div className="relative">{children}</div>

			{/* Top button & mask - visible when closed */}
			<AnimatePresence mode="wait">
				{!isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25, ease: "easeInOut" }}
						className="w-full pt-6 relative z-10"
					>
						{showSeparator && (
							<div className="relative z-[1]">
								<Separator decoration />
							</div>
						)}
						{/* Fade mask */}
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-x-0 bottom-6.75 z-[5]"
							style={{ height: "80px" }}
						>
							<div
								className="dark:hidden absolute inset-x-0 bottom-0 h-full"
								style={{
									backgroundImage: `linear-gradient(to top, ${getColorVar(defaultColor)}, transparent)`,
								}}
							/>
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
							<ShowMoreButton isOpen={isOpen} />
						</AccordionTrigger>
					</motion.div>
				)}
			</AnimatePresence>

			<AccordionContent
				className="border-none p-0 relative overflow-hidden"
				keepRendered
			>
				{moreContent}
			</AccordionContent>

			{/* Bottom button & mask - visible when open */}
			<AnimatePresence mode="wait">
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25, ease: "easeInOut" }}
						className="w-full mt-8 relative z-10"
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
							<ShowMoreButton isOpen={isOpen} />
						</AccordionTrigger>
						{/* Fade mask */}
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-x-0 bottom-6.75 z-[9]"
							style={{ height: "40px" }}
						>
							<div
								className="dark:hidden absolute inset-x-0 bottom-0 h-full"
								style={{
									backgroundImage: `linear-gradient(to top, ${getColorVar(defaultColor)}, transparent)`,
								}}
							/>
							<div
								className="hidden dark:block absolute inset-x-0 bottom-0 h-full"
								style={{
									backgroundImage: `linear-gradient(to top, ${getColorVar(darkColor)}, transparent)`,
								}}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export function ShowMore({
	children = null,
	moreContent = null,
	maskColor = "oklch(var(--background))",
	showSeparator = true,
}) {
	// If no moreContent is provided, don't render the show more functionality
	const hasMoreContent = moreContent != null;

	// Get default and dark colors
	const defaultColor = useMemo(
		() =>
			typeof maskColor === "object" && maskColor !== null
				? maskColor.default || maskColor.dark || "oklch(var(--background))"
				: maskColor,
		[maskColor],
	);
	const darkColor = useMemo(
		() =>
			typeof maskColor === "object" && maskColor !== null
				? maskColor.dark || maskColor.default || "oklch(var(--background))"
				: maskColor,
		[maskColor],
	);

	if (!hasMoreContent) {
		return <div>{children}</div>;
	}

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="show-more" className="w-full border-none">
				<ShowMoreContent
					moreContent={moreContent}
					showSeparator={showSeparator}
					maskColor={maskColor}
					defaultColor={defaultColor}
					darkColor={darkColor}
				>
					{children}
				</ShowMoreContent>

			</AccordionItem>
		</Accordion>
	);
}

ShowMoreButton.displayName = "ShowMoreButton";
ShowMoreContent.displayName = "ShowMoreContent";
ShowMore.displayName = "ShowMore";

