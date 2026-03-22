"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/registry/optics/lib/utils";
import { Separator } from "@/registry/optics/separator";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	useAccordionItem,
} from "@/registry/optics/accordion";
import { buttonVariants } from "@/registry/optics/button";

type ShowMoreMaskColor =
	| string
	| {
			default?: string;
			dark?: string;
	  };

type ShowMoreButtonProps = {
	isOpen: boolean;
};

type ShowMoreContentProps = {
	children?: React.ReactNode;
	moreContent?: React.ReactNode;
	showSeparator: boolean;
	defaultColor: string;
	darkColor: string;
};

type ShowMoreProps = {
	children?: React.ReactNode;
	moreContent?: React.ReactNode;
	maskColor?: ShowMoreMaskColor;
	showSeparator?: boolean;
};

const getColorVar = (color?: string) => {
	if (!color) return "oklch(var(--background))";

	if (color.match(/\(|var\(|hsl\(|oklch\(|rgb\(|rgba\(|#[0-9a-fA-F]/)) {
		return color;
	}

	const colorName = color.startsWith("from-")
		? color.slice(5)
		: color.startsWith("bg-")
			? color.slice(3)
			: color;

	return `var(--${colorName})`;
};

function ShowMoreButton({ isOpen }: ShowMoreButtonProps) {
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
	defaultColor,
	darkColor,
}: ShowMoreContentProps) {
	const { isOpen } = useAccordionItem();

	return (
		<div className="relative">
			<div className="relative">{children}</div>

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
}: ShowMoreProps) {
	const hasMoreContent = moreContent != null;

	const defaultColor = React.useMemo(
		() =>
			typeof maskColor === "object" && maskColor !== null
				? maskColor.default || maskColor.dark || "oklch(var(--background))"
				: maskColor,
		[maskColor],
	);

	const darkColor = React.useMemo(
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
					defaultColor={defaultColor}
					darkColor={darkColor}
				>
					{children}
				</ShowMoreContent>
			</AccordionItem>
		</Accordion>
	);
}
