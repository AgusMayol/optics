"use client";
import { ComponentNavigation } from "@/components/component-navigation";
import { PropsTable } from "@/components/props-table";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/optics/accordion";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
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
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsContents,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/optics/code-snippet";
import { Kbd, KbdGroup } from "@/registry/optics/kbd";
import { Separator } from "@/registry/optics/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const code = [
	{
		language: "jsx",
		filename: "kbd.jsx",
		code: `import { Kbd, KbdGroup } from "@/registry/optics/kbd";
import { Command } from "lucide-react";

// Basic usage
<Kbd>⌘</Kbd>
<Kbd>K</Kbd>

// Grouped keys
<KbdGroup>
	<Kbd><Command /></Kbd>
	<Kbd>+</Kbd>
	<Kbd>K</Kbd>
</KbdGroup>

// With hotkey detection and animation
<Kbd useHotkey>⌘</Kbd>
<Kbd useHotkey>K</Kbd>

// With custom hotkey prop
<Kbd useHotkey hotkey="mod+k" onHotkeyPress={() => console.log("Pressed!")}>
	⌘ K
</Kbd>

// Legacy variant
<Kbd variant="legacy">⌘</Kbd>
<Kbd variant="legacy">K</Kbd>`,
	},
];

const kbdComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/kbd.jsx",
		code: `"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useHotkeys } from "react-hotkeys-hook";
import {
	useCallback,
	useRef,
	useState,
	useMemo,
	isValidElement,
	useEffect,
} from "react";

// ... (helper functions for text extraction and hotkey normalization)

const kbdVariants = cva(
	"select-none outline-hidden transition-all duration-150",
	{
		variants: {
			variant: {
				default:
					"transform-gpu cursor-pointer rounded-lg border border-neutral-500/50 bg-neutral-300 shadow-[-10px_0px_15px_rgba(255,255,255,1),3px_10px_12.5px_rgba(0,0,0,0.1)] active:shadow-none dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[-10px_0px_15px_rgba(0,0,0,0.3),3px_10px_12.5px_rgba(255,255,255,0.05)]",
				legacy:
					"bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium [&_svg:not([class*='size-'])]:size-3 [[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Kbd({
	className,
	variant = "default",
	useHotkey = false,
	animate = true,
	onHotkeyPress,
	hotkey: hotkeyProp,
	...props
}) {
	// ... (hotkey detection and animation logic)
	
	if (variant === "legacy") {
		return (
			<kbd
				data-slot="kbd"
				className={cn(kbdVariants({ variant }), className)}
				{...props}
			>
				{props.children}
			</kbd>
		);
	}

	return (
		<kbd
			data-slot="kbd"
			className={cn(
				!isCompound && "aspect-square",
				kbdVariants({ variant }),
				isPressed && "shadow-none",
				className,
			)}
			{...props}
		>
			<span
				className={cn(
					kbdInnerVariants({ variant }),
					isPressed && "translate-y-0 shadow-transparent",
				)}
			>
				<span className="block text-center align-center text-xs">
					{props.children}
				</span>
			</span>
		</kbd>
	);
}

function KbdGroup({ className, ...props }) {
	return (
		<kbd
			data-slot="kbd-group"
			className={cn("inline-flex items-center gap-1", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/kbd",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/kbd",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/kbd",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/kbd",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add clsx tailwind-merge class-variance-authority react-hotkeys-hook",
	},
	{
		label: "npm",
		code: "npm install clsx tailwind-merge class-variance-authority react-hotkeys-hook",
	},
	{
		label: "yarn",
		code: "yarn add clsx tailwind-merge class-variance-authority react-hotkeys-hook",
	},
	{
		label: "bun",
		code: "bun add clsx tailwind-merge class-variance-authority react-hotkeys-hook",
	},
];

// Helper functions for cookies

export default function Page() {
	const {
		mounted,
		value,
		setValue,
		installationTab,
		handleTabChange,
		activeCommand,
		activeDepsCommand,
	} = useCookiePreferences(commands, installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Kbd
					</h1>

					<Button variant="link" size="sm" asChild>
						<Link
							href="https://cuicui.day/application-ui/kbd"
							target="_blank"
							rel="noopener noreferrer"
						>
							CuiCui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A component to display keyboard keys and shortcuts.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center gap-6">
						<div className="flex items-center gap-2">
							<p className="text-sm">Press</p>
							<Kbd useHotkey>⌘</Kbd>
							<Kbd useHotkey>K</Kbd>
							<p className="text-sm">to open search</p>
						</div>

						<div className="flex items-center gap-2">
							<p className="text-sm">Or use</p>
							<KbdGroup>
								<Kbd useHotkey>⌘ + K</Kbd>
							</KbdGroup>
						</div>
					</CardContent>

					<CardFooter className="border-t px-0 py-0 bg-background rounded-b-xl">
						<Accordion type={"single"} collapsible className="w-full">
							<AccordionItem value="codeblock" className="rounded-b-xl">
								<AccordionTrigger
									className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
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
											<CodeBlockCopyButton />
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
								<SnippetHeader>
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
									<SnippetHeader>
										<SnippetTabsList variant="outline">
											{installDeps.map((command) => (
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
										{installDeps.map((command) => (
											<SnippetTabsContent
												key={command.label}
												value={command.label}
												className="w-full flex items-center justify-between gap-8 py-2 pr-2"
											>
												{command.code}
												{activeDepsCommand && (
													<SnippetCopyButton value={activeDepsCommand.code} />
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
									data={kbdComponentCode}
									defaultValue={kbdComponentCode[0].filename}
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

										<CodeBlockCopyButton variant="ghost" />
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
				<PropsTable
					data={[
						{
							component: "<Kbd />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the keyboard key.",
								},
								{
									name: "variant",
									type: `"default" | "legacy" (default: "default")`,
									description: "Visual variant of the keyboard key.",
								},
								{
									name: "useHotkey",
									type: "boolean (default: false)",
									description: "Enable hotkey detection and animation. The hotkey is automatically extracted from children or can be provided via the hotkey prop.",
								},
								{
									name: "hotkey",
									type: "string",
									description: "Explicit hotkey string. If not provided, extracted from children.",
								},
								{
									name: "onHotkeyPress",
									type: "(event) => void",
									description: "Callback function called when the hotkey is pressed.",
								},
								{
									name: "animate",
									type: "boolean (default: true)",
									description: "Enable animation when the hotkey is pressed.",
								},
							],
						},
						{
							component: "<KbdGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the keyboard key group.",
								},
							],
						},
						{
							component: "<KbdGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Accepts standard HTML kbd element attributes. Used to group multiple Kbd components.",
								},
							],
						},
					]}
				/>
			</div>

			<ComponentNavigation />
		</main>
	);
}
