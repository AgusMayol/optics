"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/agusmayol/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/agusmayol/select";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/agusmayol/code-snippet";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "@/registry/agusmayol/tooltip";
import { Fragment, useState } from "react";
import { tailwindColors } from "@/lib/tailwind-colors";
import { toast } from "@/registry/agusmayol/sonner";
import { Separator } from "@/registry/agusmayol/separator";

export default function Page() {
	const colors = [
		{
			name: "Neutral",
			colors: [
				"bg-neutral-50",
				"bg-neutral-100",
				"bg-neutral-200",
				"bg-neutral-300",
				"bg-neutral-400",
				"bg-neutral-500",
				"bg-neutral-600",
				"bg-neutral-700",
				"bg-neutral-800",
				"bg-neutral-900",
				"bg-neutral-950",
			],
		},
		{
			name: "Stone",
			colors: [
				"bg-stone-50",
				"bg-stone-100",
				"bg-stone-200",
				"bg-stone-300",
				"bg-stone-400",
				"bg-stone-500",
				"bg-stone-600",
				"bg-stone-700",
				"bg-stone-800",
				"bg-stone-900",
				"bg-stone-950",
			],
		},
		{
			name: "Zinc",
			colors: [
				"bg-zinc-50",
				"bg-zinc-100",
				"bg-zinc-200",
				"bg-zinc-300",
				"bg-zinc-400",
				"bg-zinc-500",
				"bg-zinc-600",
				"bg-zinc-700",
				"bg-zinc-800",
				"bg-zinc-900",
				"bg-zinc-950",
			],
		},
		{
			name: "Slate",
			colors: [
				"bg-slate-50",
				"bg-slate-100",
				"bg-slate-200",
				"bg-slate-300",
				"bg-slate-400",
				"bg-slate-500",
				"bg-slate-600",
				"bg-slate-700",
				"bg-slate-800",
				"bg-slate-900",
				"bg-slate-950",
			],
		},
		{
			name: "Gray",
			colors: [
				"bg-gray-50",
				"bg-gray-100",
				"bg-gray-200",
				"bg-gray-300",
				"bg-gray-400",
				"bg-gray-500",
				"bg-gray-600",
				"bg-gray-700",
				"bg-gray-800",
				"bg-gray-900",
				"bg-gray-950",
			],
		},
		{
			name: "Red",
			colors: [
				"bg-red-50",
				"bg-red-100",
				"bg-red-200",
				"bg-red-300",
				"bg-red-400",
				"bg-red-500",
				"bg-red-600",
				"bg-red-700",
				"bg-red-800",
				"bg-red-900",
				"bg-red-950",
			],
		},
		{
			name: "Orange",
			colors: [
				"bg-orange-50",
				"bg-orange-100",
				"bg-orange-200",
				"bg-orange-300",
				"bg-orange-400",
				"bg-orange-500",
				"bg-orange-600",
				"bg-orange-700",
				"bg-orange-800",
				"bg-orange-900",
				"bg-orange-950",
			],
		},
		{
			name: "Amber",
			colors: [
				"bg-amber-50",
				"bg-amber-100",
				"bg-amber-200",
				"bg-amber-300",
				"bg-amber-400",
				"bg-amber-500",
				"bg-amber-600",
				"bg-amber-700",
				"bg-amber-800",
				"bg-amber-900",
				"bg-amber-950",
			],
		},
		{
			name: "Yellow",
			colors: [
				"bg-yellow-50",
				"bg-yellow-100",
				"bg-yellow-200",
				"bg-yellow-300",
				"bg-yellow-400",
				"bg-yellow-500",
				"bg-yellow-600",
				"bg-yellow-700",
				"bg-yellow-800",
				"bg-yellow-900",
				"bg-yellow-950",
			],
		},
		{
			name: "Lime",
			colors: [
				"bg-lime-50",
				"bg-lime-100",
				"bg-lime-200",
				"bg-lime-300",
				"bg-lime-400",
				"bg-lime-500",
				"bg-lime-600",
				"bg-lime-700",
				"bg-lime-800",
				"bg-lime-900",
				"bg-lime-950",
			],
		},
		{
			name: "Green",
			colors: [
				"bg-green-50",
				"bg-green-100",
				"bg-green-200",
				"bg-green-300",
				"bg-green-400",
				"bg-green-500",
				"bg-green-600",
				"bg-green-700",
				"bg-green-800",
				"bg-green-900",
				"bg-green-950",
			],
		},
		{
			name: "Emerald",
			colors: [
				"bg-emerald-50",
				"bg-emerald-100",
				"bg-emerald-200",
				"bg-emerald-300",
				"bg-emerald-400",
				"bg-emerald-500",
				"bg-emerald-600",
				"bg-emerald-700",
				"bg-emerald-800",
				"bg-emerald-900",
				"bg-emerald-950",
			],
		},
		{
			name: "Teal",
			colors: [
				"bg-teal-50",
				"bg-teal-100",
				"bg-teal-200",
				"bg-teal-300",
				"bg-teal-400",
				"bg-teal-500",
				"bg-teal-600",
				"bg-teal-700",
				"bg-teal-800",
				"bg-teal-900",
				"bg-teal-950",
			],
		},
		{
			name: "Cyan",
			colors: [
				"bg-cyan-50",
				"bg-cyan-100",
				"bg-cyan-200",
				"bg-cyan-300",
				"bg-cyan-400",
				"bg-cyan-500",
				"bg-cyan-600",
				"bg-cyan-700",
				"bg-cyan-800",
				"bg-cyan-900",
				"bg-cyan-950",
			],
		},
		{
			name: "Sky",
			colors: [
				"bg-sky-50",
				"bg-sky-100",
				"bg-sky-200",
				"bg-sky-300",
				"bg-sky-400",
				"bg-sky-500",
				"bg-sky-600",
				"bg-sky-700",
				"bg-sky-800",
				"bg-sky-900",
				"bg-sky-950",
			],
		},
		{
			name: "Blue",
			colors: [
				"bg-blue-50",
				"bg-blue-100",
				"bg-blue-200",
				"bg-blue-300",
				"bg-blue-400",
				"bg-blue-500",
				"bg-blue-600",
				"bg-blue-700",
				"bg-blue-800",
				"bg-blue-900",
				"bg-blue-950",
			],
		},
		{
			name: "Indigo",
			colors: [
				"bg-indigo-50",
				"bg-indigo-100",
				"bg-indigo-200",
				"bg-indigo-300",
				"bg-indigo-400",
				"bg-indigo-500",
				"bg-indigo-600",
				"bg-indigo-700",
				"bg-indigo-800",
				"bg-indigo-900",
				"bg-indigo-950",
			],
		},
		{
			name: "Violet",
			colors: [
				"bg-violet-50",
				"bg-violet-100",
				"bg-violet-200",
				"bg-violet-300",
				"bg-violet-400",
				"bg-violet-500",
				"bg-violet-600",
				"bg-violet-700",
				"bg-violet-800",
				"bg-violet-900",
				"bg-violet-950",
			],
		},
		{
			name: "Purple",
			colors: [
				"bg-purple-50",
				"bg-purple-100",
				"bg-purple-200",
				"bg-purple-300",
				"bg-purple-400",
				"bg-purple-500",
				"bg-purple-600",
				"bg-purple-700",
				"bg-purple-800",
				"bg-purple-900",
				"bg-purple-950",
			],
		},
		{
			name: "Fuchsia",
			colors: [
				"bg-fuchsia-50",
				"bg-fuchsia-100",
				"bg-fuchsia-200",
				"bg-fuchsia-300",
				"bg-fuchsia-400",
				"bg-fuchsia-500",
				"bg-fuchsia-600",
				"bg-fuchsia-700",
				"bg-fuchsia-800",
				"bg-fuchsia-900",
				"bg-fuchsia-950",
			],
		},
		{
			name: "Pink",
			colors: [
				"bg-pink-50",
				"bg-pink-100",
				"bg-pink-200",
				"bg-pink-300",
				"bg-pink-400",
				"bg-pink-500",
				"bg-pink-600",
				"bg-pink-700",
				"bg-pink-800",
				"bg-pink-900",
				"bg-pink-950",
			],
		},
		{
			name: "Rose",
			colors: [
				"bg-rose-50",
				"bg-rose-100",
				"bg-rose-200",
				"bg-rose-300",
				"bg-rose-400",
				"bg-rose-500",
				"bg-rose-600",
				"bg-rose-700",
				"bg-rose-800",
				"bg-rose-900",
				"bg-rose-950",
			],
		},
	];

	// Color conversion function using real Tailwind values
	const getColorValue = (colorClass, format) => {
		if (format === "classname") {
			return colorClass;
		}

		const colorData = tailwindColors[colorClass];
		if (!colorData) return colorClass; // fallback to class name

		return colorData[format] || colorClass;
	};

	const [selectedFormat, setSelectedFormat] = useState("classname");

	return (
		<TooltipProvider delayDuration={400} skipDelayDuration={0}>
			<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
				<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
						Colors
					</h1>
					<p className="text-muted-foreground text-xl">
						The complete Tailwind color palette in HEX, RGB, HSL, CSS variables,
						and classes. Ready to copy and paste into your project.
					</p>
				</div>

				<Separator decoration />

				<div className="flex flex-col items-end justify-start gap-4 p-6 lg:p-12 pt-4">
					<Select value={selectedFormat} onValueChange={setSelectedFormat}>
						<SelectTrigger className="w-[180px]" variant="raised">
							<SelectValue placeholder="Format" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="classname">classname</SelectItem>
							<SelectItem value="hex">hex</SelectItem>
							<SelectItem value="rgb">rgb</SelectItem>
							<SelectItem value="hsl">hsl</SelectItem>
							<SelectItem value="oklch">oklch</SelectItem>
							<SelectItem value="var">var</SelectItem>
						</SelectContent>
					</Select>

					<GridContainer cols={13} rows={23} border={true} className="border-r">
						<GridRow>
							<GridItem span={2} decorationTopLeft></GridItem>
							<GridItem className="text-xs font-semibold">50</GridItem>
							<GridItem className="text-xs font-semibold">100</GridItem>
							<GridItem className="text-xs font-semibold">200</GridItem>
							<GridItem className="text-xs font-semibold">300</GridItem>
							<GridItem className="text-xs font-semibold">400</GridItem>
							<GridItem className="text-xs font-semibold">500</GridItem>
							<GridItem className="text-xs font-semibold">600</GridItem>
							<GridItem className="text-xs font-semibold">700</GridItem>
							<GridItem className="text-xs font-semibold">800</GridItem>
							<GridItem className="text-xs font-semibold">900</GridItem>
							<GridItem className="text-xs font-semibold !border-r-0">
								950
							</GridItem>
						</GridRow>
						{colors.map((color) => (
							<GridRow key={color.name} className="not-last:h-[calc(100%-1px)]">
								<GridItem span={2} className="text-xs font-semibold">
									{color.name}
								</GridItem>
								{color.colors.map((colorClass) => {
									const displayValue = getColorValue(
										colorClass,
										selectedFormat,
									);

									const handleColorClick = () => {
										if (
											typeof navigator !== "undefined" &&
											navigator.clipboard &&
											typeof navigator.clipboard.writeText === "function"
										) {
											navigator.clipboard.writeText(displayValue).catch(() => {
												// fallback: try legacy execCommand if available
												const textarea = document.createElement("textarea");
												textarea.value = displayValue;
												textarea.style.position = "fixed";
												textarea.style.opacity = "0";
												document.body.appendChild(textarea);
												textarea.select();
												try {
													document.execCommand("copy");
												} catch (err) {
													// fallback failed, possibly due to iOS/WebKit limitations
												}
												document.body.removeChild(textarea);
											});
										} else {
											// fallback if clipboard API is not available
											const textarea = document.createElement("textarea");
											textarea.value = displayValue;
											textarea.style.position = "fixed";
											textarea.style.opacity = "0";
											document.body.appendChild(textarea);
											textarea.select();
											try {
												document.execCommand("copy");
											} catch (err) {
												// fallback failed, possibly due to iOS/WebKit limitations
											}
											document.body.removeChild(textarea);
										}

										toast({
											toastId: "success-copy-color-to-clipboard",
											type: "success",
											title: "Copied to clipboard!",
											//description:
											//	"The color has been copied to your clipboard.",
										});
									};

									return (
										<Tooltip key={colorClass}>
											<TooltipTrigger asChild>
												<GridItem
													decorationBottomRight={colorClass === "bg-rose-950"}
													className="!border-r-0 cursor-pointer"
													onClick={handleColorClick}
												>
													<Card
														className={cn(
															"aspect-square rounded-md border-0 transition-all duration-200 hover:scale-105 hover:shadow-lg",
															colorClass,
														)}
													/>
												</GridItem>
											</TooltipTrigger>
											<TooltipContent className="px-0 pl-2 py-0">
												<Snippet className="w-full z-[99999] flex items-center justify-center bg-transparent border-0 px-0">
													<SnippetHeader className="w-full gap-2 flex items-center justify-center bg-transparent border-0">
														<span className="text-xs font-mono">
															{displayValue}
														</span>

														<SnippetCopyButton value={displayValue} />
													</SnippetHeader>
													<SnippetTabsContent value={colorClass}>
														{displayValue}
													</SnippetTabsContent>
												</Snippet>
											</TooltipContent>
										</Tooltip>
									);
								})}
							</GridRow>
						))}
					</GridContainer>
				</div>
			</main>
		</TooltipProvider>
	);
}
