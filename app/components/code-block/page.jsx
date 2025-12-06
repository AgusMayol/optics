"use client";
import { InstallationGuide } from "@/components/installation-guide";
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

import componentCode from "@/registry/optics/code-block.jsx.txt";

const code = [
	{
		language: "js",
		filename: "example.js",
		code: `console.log("Hello World!");`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/code-block.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add shiki @radix-ui/react-tabs",
	},
	{
		label: "npm",
		code: "npm install shiki @radix-ui/react-tabs",
	},
	{
		label: "yarn",
		code: "yarn add shiki @radix-ui/react-tabs",
	},
	{
		label: "bun",
		code: "bun add shiki @radix-ui/react-tabs",
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
	} = useCookiePreferences("code-block", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Code Block
					</h1>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A powerful code block component with syntax highlighting, file tabs,
					and copy functionality.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<div className="w-full">
							<CodeBlock data={code} defaultValue={code[0].filename}>
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
									<CodeBlockCopyButton />
								</CodeBlockHeader>
								<CodeBlockBody>
									{(item) => (
										<CodeBlockItem key={item.language} value={item.filename}>
											<CodeBlockContent language={item.language}>
												{item.code}
											</CodeBlockContent>
										</CodeBlockItem>
									)}
								</CodeBlockBody>
							</CodeBlock>
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

			<InstallationGuide
				value={value}
				setValue={setValue}
				activeCommand={activeCommand}
				activeDepsCommand={activeDepsCommand}
				componentName="code-block"
				installDeps={installDeps}
				manualFiles={componentFiles}
				installationTab={installationTab}
				handleTabChange={handleTabChange}
			/>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>
				<PropsTable
					data={[
						{
							component: "<CodeBlock />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the code block container.",
								},
								{
									name: "data",
									type: "Array<{ language: string, filename: string, code: string }> (required)",
									description: "Array of code files to display in the code block.",
								},
								{
									name: "value",
									type: "string",
									description: "The controlled active filename. Use with onValueChange.",
								},
								{
									name: "defaultValue",
									type: "string",
									description: "The uncontrolled default active filename.",
								},
								{
									name: "onValueChange",
									type: "(value: string) => void",
									description: "Callback fired when the active filename changes.",
								},
							],
						},
						{
							component: "<CodeBlockHeader />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the header.",
								},
							],
						},
						{
							component: "<CodeBlockBody />",
							props: [
								{
									name: "children",
									type: "(item: { language: string, filename: string, code: string }) => React.ReactNode",
									description: "Render function that receives each code file item.",
								},
							],
						},
						{
							component: "<CodeBlockContent />",
							props: [
								{
									name: "children",
									type: "string (required)",
									description: "The code content to display.",
								},
								{
									name: "language",
									type: "string",
									description: "The programming language for syntax highlighting.",
								},
								{
									name: "themes",
									type: "{ light: string, dark: string }",
									description: "Shiki theme configuration for light and dark modes.",
								},
								{
									name: "syntaxHighlighting",
									type: "boolean (default: true)",
									description: "Whether to enable syntax highlighting.",
								},
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the content.",
								},
							],
						},
						{
							component: "<CodeBlockItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the item.",
								},
								{
									name: "value",
									type: "string (required)",
									description: "The filename that identifies this code block item.",
								},
								{
									name: "lineNumbers",
									type: "boolean (default: true)",
									description: "Whether to show line numbers.",
								},
								{
									name: "children",
									type: "React.ReactNode (required)",
									description: "The code content to display (usually CodeBlockContent).",
								},
							],
						},
						{
							component: "<CodeBlockCopyButton />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the button.",
								},
								{
									name: "variant",
									type: `"default" | "outline" | "ghost" | "destructive" | "secondary" | "info" | "success" | "warning" | "muted" | "raised" | "link" (default: "outline")`,
									description: "Variant style for the button.",
								},
								{
									name: "size",
									type: `"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" (default: "icon")`,
									description: "Size of the button.",
								},
								{
									name: "asChild",
									type: "boolean",
									description: "When true, the button will render as its child element instead of a button.",
								},
								{
									name: "timeout",
									type: "number (default: 2000)",
									description: "Duration in milliseconds before the 'copied' state resets.",
								},
								{
									name: "onCopy",
									type: "() => void",
									description: "Callback fired when code is successfully copied.",
								},
								{
									name: "onError",
									type: "(error: Error) => void",
									description: "Callback fired when copy operation fails.",
								},
							],
						},
						{
							component: "<CodeBlockFiles />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the files container.",
								},
								{
									name: "children",
									type: "(item: { language: string, filename: string, code: string }) => React.ReactNode",
									description: "Render function that receives each code file item.",
								},
							],
						},
						{
							component: "<CodeBlockFilename />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the filename.",
								},
								{
									name: "value",
									type: "string (required)",
									description: "The filename value that identifies this tab.",
								},
								{
									name: "icon",
									type: "React.ComponentType",
									description: "Custom icon component to display before the filename.",
								},
								{
									name: "children",
									type: "React.ReactNode (required)",
									description: "The filename text to display.",
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
