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
		filename: "separator.jsx",
		code: `import { Separator } from "@/registry/optics/separator";

<Separator />
<Separator decoration />
<Separator orientation="vertical" className="h-20" />`,
	},
];

const separatorComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/separator.jsx",
		code: `"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
	className,
	children,
	decoration = false,
	decorationLeft = false,
	decorationRight = false,
	decorationTop = false,
	decorationBottom = false,
	orientation = "horizontal",
	decorative = true,
	...props
}) {
	return (
		<SeparatorPrimitive.Root
			data-slot="separator"
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px relative",
				className,
			)}
			{...props}
		>
			{children}

			{(decoration || decorationLeft) && orientation === "horizontal" && (
				<div className={cn("absolute -left-[1px] -top-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[5.9px] rounded-full absolute -top-[2.25px]" />
						<div className="bg-muted-foreground w-[3.93px] h-[1px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{(decoration || decorationRight) && orientation === "horizontal" && (
				<div className={cn("absolute -right-[0px] -top-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[5.9px] rounded-full absolute -top-[2.5px]" />
						<div className="bg-muted-foreground w-[3.93px] h-[1px] rounded-full absolute -left-[3.5px]" />
					</div>
				</div>
			)}

			{(decoration || decorationTop) && orientation === "vertical" && (
				<div className={cn("absolute -left-[0px] -top-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[5.9px] h-[1px] rounded-full absolute -left-[2.5px]" />
						<div className="bg-muted-foreground w-[1px] h-[3.93px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{(decoration || decorationBottom) && orientation === "vertical" && (
				<div className={cn("absolute -left-[0px] -bottom-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[5.9px] h-[1px] rounded-full absolute -left-[2.5px] bottom-0" />
						<div className="bg-muted-foreground w-[1px] h-[3.93px] rounded-full absolute left-0 bottom-0" />
					</div>
				</div>
			)}
		</SeparatorPrimitive.Root>
	);
}

export { Separator };`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/separator",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/separator",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/separator",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/separator",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-separator",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-separator",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-separator",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-separator",
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
						Separator
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/separator"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Visually or semantically separates content.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center gap-4">
						<div className="w-full">
							<h4 className="text-sm font-medium">Horizontal</h4>
							<Separator className="my-4" />
							<div className="flex h-5 items-center space-x-4 text-sm">
								<div>Item 1</div>
								<Separator orientation="vertical" />
								<div>Item 2</div>
								<Separator orientation="vertical" />
								<div>Item 3</div>
							</div>
						</div>

						<Separator decoration className="my-4" />

						<div className="w-full">
							<h4 className="text-sm font-medium">With Decorations</h4>
							<Separator decoration className="my-4" />
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
									data={separatorComponentCode}
									defaultValue={separatorComponentCode[0].filename}
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
							component: "<Separator />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the separator.",
								},
								{
									name: "orientation",
									type: `"horizontal" | "vertical" (default: "horizontal")`,
									description: "The orientation of the separator.",
								},
								{
									name: "decorative",
									type: "boolean (default: true)",
									description: "When true, the separator is purely decorative. Defaults to true.",
								},
								{
									name: "decoration",
									type: "boolean (default: false)",
									description: "Adds decorative elements to both ends of the separator.",
								},
								{
									name: "decorationLeft",
									type: "boolean (default: false)",
									description: "Adds decorative element to the left end (horizontal) or top end (vertical).",
								},
								{
									name: "decorationRight",
									type: "boolean (default: false)",
									description: "Adds decorative element to the right end (horizontal) or bottom end (vertical).",
								},
								{
									name: "decorationTop",
									type: "boolean (default: false)",
									description: "Adds decorative element to the top end (vertical orientation only).",
								},
								{
									name: "decorationBottom",
									type: "boolean (default: false)",
									description: "Adds decorative element to the bottom end (vertical orientation only).",
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
