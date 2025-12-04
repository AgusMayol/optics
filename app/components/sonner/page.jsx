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
import { toast, Toaster } from "@/registry/optics/sonner";
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
		filename: "sonner.jsx",
		code: `import { toast } from "@/registry/optics/sonner";

<Button onClick={() => toast({ type: "success", title: "Success!", description: "Your action was completed." })}>
	Show Toast
</Button>

<Button onClick={() => toast({ 
	type: "promise", 
	promise: fetch("/api/data"),
	loading: "Loading...",
	success: "Data loaded!",
	error: "Failed to load data"
})}>
	Promise Toast
</Button>`,
	},
];

const sonnerComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/sonner.jsx",
		code: `"use client";
import React from "react";
import { useTheme } from "next-themes";
import { toast as sonnerToast, Toaster as Sonner } from "sonner";

export function Toaster({ ...props }) {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme}
			className="toaster group"
			style={{
				"--normal-bg": "var(--popover)",
				"--normal-text": "var(--popover-foreground)",
				"--normal-border": "var(--border)",
			}}
			{...props}
		/>
	);
}

export function toast(toastConfig) {
	const {
		type = "info",
		title,
		description,
		button,
		promise,
		loading,
		success,
		error,
		toastId,
		duration = 5500,
	} = toastConfig;

	// Toast implementation
	// See full implementation in the source code
}`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/sonner",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/sonner",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/sonner",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/sonner",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add sonner next-themes lucide-react",
	},
	{
		label: "npm",
		code: "npm install sonner next-themes lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add sonner next-themes lucide-react",
	},
	{
		label: "bun",
		code: "bun add sonner next-themes lucide-react",
	},
];

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
						Sonner
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/sonner"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					An opinionated toast component for React. Supports promises, custom
					styling, and multiple types.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-wrap items-center justify-center gap-4">
						<Button
							variant="success"
							onClick={() =>
								toast({
									type: "success",
									title: "Success!",
									description: "Your action was completed successfully.",
								})
							}
						>
							Success
						</Button>
						<Button
							variant="destructive"
							onClick={() =>
								toast({
									type: "error",
									title: "Error",
									description: "Something went wrong.",
								})
							}
						>
							Error
						</Button>
						<Button
							variant="info"
							onClick={() =>
								toast({
									type: "info",
									title: "Info",
									description: "Here's some information.",
								})
							}
						>
							Info
						</Button>
						<Button
							variant="warning"
							onClick={() =>
								toast({
									type: "warning",
									title: "Warning",
									description: "Please be careful.",
								})
							}
						>
							Warning
						</Button>
						<Button
							variant="raised"
							onClick={() =>
								toast({
									type: "promise",
									promise: new Promise((resolve) => setTimeout(resolve, 2000)),
									loading: "Loading...",
									success: "Done!",
									error: "Failed!",
								})
							}
						>
							Promise
						</Button>
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
									data={sonnerComponentCode}
									defaultValue={sonnerComponentCode[0].filename}
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
							component: "toast()",
							props: [
								{
									name: "type",
									type: '"success" | "error" | "info" | "warning" | "promise"',
									description: "Type of toast notification.",
								},
								{
									name: "title",
									type: "string",
									description: "Title text for the toast.",
								},
								{
									name: "description",
									type: "string",
									description: "Description text for the toast.",
								},
								{
									name: "button",
									type: "{ label: string, onClick: () => void }",
									description: "Optional button configuration.",
								},
								{
									name: "promise",
									type: "Promise",
									description: "Promise to track for promise-type toasts.",
								},
								{
									name: "loading",
									type: "string (for promise type)",
									description: "Loading message for promise-type toasts.",
								},
								{
									name: "success",
									type: "string (for promise type)",
									description: "Success message for promise-type toasts.",
								},
								{
									name: "duration",
									type: "number (default: 5500)",
									description: "Duration in milliseconds before the toast auto-dismisses.",
								},
							],
						},
					]}
				/>
			</div>

			<ComponentNavigation />
			<Toaster />
		</main>
	);
}
