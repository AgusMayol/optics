"use client";
import * as React from "react";
import { StarRating } from "@/registry/optics/star-rating";
import { cn } from "@/lib/utils";
import { links } from "@/app/layout-content";
import { usePathname } from "next/navigation";
import {
	ALargeSmall,
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	Binary,
} from "lucide-react";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/optics/grid";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/optics/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/optics/accordion";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";
import { Separator } from "@/registry/optics/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
	SnippetTabsContents,
} from "@/registry/optics/code-snippet";

const code = [
	{
		language: "jsx",
		filename: "star-rating.jsx",
		code: `import { StarRating } from "@/registry/optics/star-rating";

<StarRating />
<StarRating defaultValue={3} />
<StarRating size="sm" />
<StarRating size="md" />
<StarRating size="lg" />
<StarRating totalStars={10} />
<StarRating disabled />
<StarRating onRate={(rating) => console.log(rating)} />`,
	},
];

const starRatingComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/star-rating.jsx",
		code: `"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StarRating({
	totalStars = 5,
	defaultValue = 0,
	onRate,
	size = "md",
	className,
	disabled = false,
}) {
	const [rating, setRating] = useState(defaultValue);
	const [hover, setHover] = useState(0);

	const handleRating = (star) => {
		if (disabled) return;
		setRating(star);
		onRate?.(star);
	};

	const starSizes = {
		sm: "h-4 w-4",
		md: "h-6 w-6",
		lg: "h-8 w-8",
	};

	return (
		<div
			className={cn(
				"flex items-center gap-2",
				disabled && "opacity-50",
				className,
			)}
		>
			{Array.from({ length: totalStars }, (_, index) => index + 1).map(
				(star) => (
					<motion.button
						key={star}
						type="button"
						className={cn(
							"relative focus-visible:outline-none focus-visible:ring-2",
							"focus-visible:ring-ring focus-visible:ring-offset-2",
							disabled && "cursor-not-allowed",
						)}
						onClick={() => handleRating(star)}
						onMouseEnter={() => !disabled && setHover(star)}
						onMouseLeave={() => !disabled && setHover(0)}
						whileHover={!disabled ? { scale: 1.3, rotate: -10 } : undefined}
						whileTap={!disabled ? { scale: 0.9, rotate: 15 } : undefined}
						disabled={disabled}
					>
						<motion.div
							className={cn(
								"transition-colors duration-300",
								(hover || rating) >= star
									? "text-yellow-400 dark:text-yellow-300"
									: "text-muted",
							)}
							initial={{ scale: 1 }}
							animate={{
								scale: (hover || rating) >= star ? 1.2 : 1,
							}}
							transition={{
								duration: 0.3,
								ease: "easeOut",
							}}
						>
							<Star
								className={cn(starSizes[size], "fill-current stroke-[1.5px]")}
							/>
						</motion.div>
					</motion.button>
				),
			)}
		</div>
	);
}`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/star-rating",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/star-rating",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/star-rating",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/star-rating",
	},
];

// Helper functions for cookies
function getCookie(name) {
	if (typeof document === "undefined") return null;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
	return null;
}

function setCookie(name, value, days = 365) {
	if (typeof document === "undefined") return;
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value};${expires};path=/`;
}

export default function Page() {
	const pathname = usePathname();
	const [mounted, setMounted] = React.useState(false);

	// State for package manager (pnpm, npm, yarn, bun)
	const [value, setValue] = React.useState(commands[0].label);

	// State for installation tab (CLI or Manual)
	const [installationTab, setInstallationTab] = React.useState("tab1");

	const activeCommand = commands.find((command) => command.label === value);

	// Load cookies on mount
	React.useEffect(() => {
		setMounted(true);

		// Load package manager preference
		const savedPackageManager = getCookie("preferred-package-manager");
		if (
			savedPackageManager &&
			commands.find((c) => c.label === savedPackageManager)
		) {
			setValue(savedPackageManager);
		} else {
			// Set default cookie if it doesn't exist
			setCookie("preferred-package-manager", commands[0].label);
		}

		// Load installation tab preference
		const savedInstallationTab = getCookie("preferred-installation-tab");
		if (savedInstallationTab === "tab1" || savedInstallationTab === "tab2") {
			setInstallationTab(savedInstallationTab);
		} else {
			// Set default cookie if it doesn't exist
			setCookie("preferred-installation-tab", "tab1");
		}
	}, []);

	// Update cookie when package manager changes
	React.useEffect(() => {
		if (mounted) {
			setCookie("preferred-package-manager", value);
		}
	}, [value, mounted]);

	// Update cookie when installation tab changes
	const handleTabChange = React.useCallback(
		(newTab) => {
			setInstallationTab(newTab);
			if (mounted) {
				setCookie("preferred-installation-tab", newTab);
			}
		},
		[mounted],
	);

	// Función para obtener el anterior o siguiente item de la sección "Components"
	function getSiblingComponent(pathname, direction = "previous") {
		// Busca la sección "Components"
		const componentsSection = links.find(
			(section) =>
				section.name && section.name.toLowerCase().includes("component"),
		);

		if (!componentsSection || !Array.isArray(componentsSection.items))
			return null;

		const items = componentsSection.items;
		const currentIdx = items.findIndex((item) => item.href === pathname);

		if (currentIdx === -1) return null;

		// Si está en el primer item y se pide "previous", no devolver nada
		if (direction === "previous" && currentIdx === 0) return null;

		// Si está en el último item y se pide "next", no devolver nada
		if (direction === "next" && currentIdx === items.length - 1) return null;

		let siblingIdx = direction === "previous" ? currentIdx - 1 : currentIdx + 1;

		if (siblingIdx < 0 || siblingIdx >= items.length) return null;

		return items[siblingIdx];
	}
	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Star Rating
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://21st.dev/community/components/ayushmxxn/star-rating/default"
							target="_blank"
							rel="noopener noreferrer"
						>
							21st.dev
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					An interactive star rating component with smooth animations and
					customizable options.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-8">
						{/* Component */}
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">Default</p>
							<StarRating />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">With Value</p>
							<StarRating defaultValue={3} />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">Small</p>
							<StarRating size="sm" />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">Medium</p>
							<StarRating size="md" />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">Large</p>
							<StarRating size="lg" />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">10 Stars</p>
							<StarRating totalStars={10} />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">Disabled</p>
							<StarRating disabled defaultValue={2} />
						</div>
					</CardContent>

					<CardFooter className="border-t px-0 py-0 bg-background rounded-b-xl">
						{/* Component Code */}
						<Accordion type={"single"} collapsible className="w-full">
							<AccordionItem value="codeblock" className="rounded-b-xl">
								<AccordionTrigger
									className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 	hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
									showArrow
								>
									Show Code
								</AccordionTrigger>
								<AccordionContent
									className="border-b-0 border-x-0 border-t pb-0 shadow-none"
									keepRendered
								>
									<CodeBlock
										data={code}
										defaultValue={code[0].filename}
										className="border-none rounded-none rounded-b-xl shadow-none group"
									>
										<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
											<CodeBlockCopyButton
												onCopy={() => console.log("Copied code to clipboard")}
												onError={() =>
													console.error("Failed to copy code to clipboard")
												}
											/>
										</CodeBlockHeader>
										<CodeBlockBody>
											{(item) => (
												<CodeBlockItem
													key={item.language}
													value={item.filename}
												>
													<CodeBlockContent
														language={item.language}
														className="bg-sidebar"
													>
														{item.code}
													</CodeBlockContent>
												</CodeBlockItem>
											)}
										</CodeBlockBody>
									</CodeBlock>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardFooter>
				</Card>
			</div>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Installation
				</h2>
				<Tabs
					value={installationTab}
					onValueChange={handleTabChange}
					className="w-full"
				>
					<TabsList variant="underline">
						<TabsTrigger value="tab1">CLI</TabsTrigger>
						<TabsTrigger value="tab2">Manual</TabsTrigger>
					</TabsList>
					<TabsContents className="w-full pt-2">
						<TabsContent value="tab1" className="w-full pt-4">
							<Snippet
								onValueChange={setValue}
								value={value}
								className="w-full"
							>
								<SnippetHeader className="">
									<SnippetTabsList variant="outline">
										{commands.map((command) => (
											<SnippetTabsTrigger
												key={command.label}
												value={command.label}
											>
												<span>{command.label}</span>
											</SnippetTabsTrigger>
										))}
									</SnippetTabsList>
								</SnippetHeader>
								<SnippetTabsContents>
									{commands.map((command) => (
										<SnippetTabsContent
											key={command.label}
											value={command.label}
											className="w-full flex items-center justify-between gap-8 py-2 pr-2"
										>
											{command.code}
											{activeCommand && (
												<SnippetCopyButton value={activeCommand.code} />
											)}
										</SnippetTabsContent>
									))}
								</SnippetTabsContents>
							</Snippet>
						</TabsContent>
						<TabsContent
							value="tab2"
							className="w-full pt-4 flex flex-col gap-12"
						>
							<div className="w-full flex flex-col gap-2">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Install the following dependencies:
								</p>

								<Snippet
									onValueChange={setValue}
									value={value}
									className="w-full"
								>
									<SnippetHeader className="">
										<SnippetTabsList variant="outline">
											{commands.map((command) => (
												<SnippetTabsTrigger
													key={command.label}
													value={command.label}
												>
													<span>{command.label}</span>
												</SnippetTabsTrigger>
											))}
										</SnippetTabsList>
									</SnippetHeader>
									<SnippetTabsContents>
										{commands.map((command) => (
											<SnippetTabsContent
												key={command.label}
												value={command.label}
												className="w-full flex items-center justify-between gap-8 py-2 pr-2"
											>
												{command.code}
												{activeCommand && (
													<SnippetCopyButton value={activeCommand.code} />
												)}
											</SnippetTabsContent>
										))}
									</SnippetTabsContents>
								</Snippet>
							</div>

							<div className="w-full flex flex-col gap-2">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Copy and paste the following code into your project:
								</p>

								<CodeBlock
									data={starRatingComponentCode}
									defaultValue={starRatingComponentCode[0].filename}
								>
									<CodeBlockHeader>
										<CodeBlockFiles>
											{(item) => (
												<CodeBlockFilename
													key={item.language}
													value={item.filename}
												>
													{item.filename}
												</CodeBlockFilename>
											)}
										</CodeBlockFiles>

										<CodeBlockCopyButton
											variant="ghost"
											onCopy={() => console.log("Copied code to clipboard")}
											onError={() =>
												console.error("Failed to copy code to clipboard")
											}
										/>
									</CodeBlockHeader>
									<CodeBlockBody>
										{(item) => (
											<CodeBlockItem key={item.language} value={item.filename}>
												<CodeBlockContent
													language={item.language}
													className="bg-sidebar"
												>
													{item.code}
												</CodeBlockContent>
											</CodeBlockItem>
										)}
									</CodeBlockBody>
								</CodeBlock>
							</div>

							<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
								Update the import paths to match your project setup.
							</p>
						</TabsContent>
					</TabsContents>
				</Tabs>
			</div>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>
				<div className="w-full flex flex-col gap-2">
					<Badge variant="outline" className="text-xs font-mono">
						{"<StarRating />"}
					</Badge>

					<GridContainer
						cols={12}
						border={false}
						rows={6}
						className={`[&>*:not(:first-child)]:!border-t [&>*]:py-4 [&>*]:pl-4 [&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl shadow border rounded-xl ${
							6 % 2 === 0
								? "[&>*:nth-child(even)]:bg-muted"
								: "[&>*:nth-child(odd)]:bg-muted"
						}`}
					>
						<GridRow>
							<GridItem
								span={4}
								className="text-xs font-semibold justify-start gap-1"
							>
								<ALargeSmall />
								Name
							</GridItem>
							<GridItem
								span={8}
								className="text-xs font-semibold gap-1 mr-auto"
							>
								<Binary size={16} />
								Type
							</GridItem>
						</GridRow>
						<GridRow>
							<GridItem
								span={4}
								className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
							>
								<Badge
									variant="outline"
									className="font-mono text-blue-600 dark:text-blue-400 bg-background"
								>
									totalStars
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								number (default: 5)
							</GridItem>
						</GridRow>
						<GridRow>
							<GridItem
								span={4}
								className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
							>
								<Badge
									variant="outline"
									className="font-mono text-blue-600 dark:text-blue-400 bg-background"
								>
									defaultValue
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								number (default: 0)
							</GridItem>
						</GridRow>
						<GridRow>
							<GridItem
								span={4}
								className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
							>
								<Badge
									variant="outline"
									className="font-mono text-blue-600 dark:text-blue-400 bg-background"
								>
									onRate
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								{"(rating: number) => void"}
							</GridItem>
						</GridRow>
						<GridRow>
							<GridItem
								span={4}
								className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
							>
								<Badge
									variant="outline"
									className="font-mono text-blue-600 dark:text-blue-400 bg-background"
								>
									size
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								"sm" | "md" | "lg" (default: "md")
							</GridItem>
						</GridRow>
						<GridRow>
							<GridItem
								span={4}
								className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
							>
								<Badge
									variant="outline"
									className="font-mono text-blue-600 dark:text-blue-400 bg-background"
								>
									disabled
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								boolean (default: false)
							</GridItem>
						</GridRow>
					</GridContainer>
				</div>
			</div>

			{(() => {
				const previous = getSiblingComponent(pathname, "previous");
				const next = getSiblingComponent(pathname, "next");
				const hasBoth = previous && next;
				const onlyPrevious = previous && !next;
				const onlyNext = next && !previous;

				return (
					<div
						className={cn(
							"w-full flex items-center gap-4 p-4 pt-8 pb-4",
							hasBoth && "justify-between",
							onlyPrevious && "justify-start",
							onlyNext && "justify-end",
						)}
					>
						{previous && (
							<Button variant="muted" size="sm" asChild>
								<Link href={previous.href || "#"}>
									<ArrowLeft />
									{previous.name || "Previous"}
								</Link>
							</Button>
						)}

						{next && (
							<Button variant="muted" size="sm" asChild>
								<Link href={next.href || "#"}>
									{next.name || "Next"}
									<ArrowRight />
								</Link>
							</Button>
						)}
					</div>
				);
			})()}
		</main>
	);
}
