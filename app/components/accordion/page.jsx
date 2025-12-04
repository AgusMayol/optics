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
		filename: "accordion.jsx",
		code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/registry/optics/accordion";

<Accordion type="single" collapsible>
	<AccordionItem value="item-1">
		<AccordionTrigger>Is it accessible?</AccordionTrigger>
		<AccordionContent>
			Yes. It adheres to the WAI-ARIA design pattern.
		</AccordionContent>
	</AccordionItem>
	<AccordionItem value="item-2">
		<AccordionTrigger>Is it styled?</AccordionTrigger>
		<AccordionContent>
			Yes. It comes with default styles that matches the other components aesthetic.
		</AccordionContent>
	</AccordionItem>
</Accordion>`,
	},
];

const accordionComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/accordion.jsx",
		code: `import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import {
	Accordion as AccordionPrimitive,
	AccordionItem as AccordionItemPrimitive,
	AccordionHeader as AccordionHeaderPrimitive,
	AccordionTrigger as AccordionTriggerPrimitive,
	AccordionContent as AccordionContentPrimitive,
} from "@/registry/optics/accordion-primitive";
import { cn } from "@/lib/utils";

function Accordion(props) {
	return <AccordionPrimitive {...props} />;
}

function AccordionItem({ className, ...props }) {
	return (
		<AccordionItemPrimitive
			className={cn("border-b last:border-b-0", className)}
			{...props}
		/>
	);
}

function AccordionTrigger({ className, children, showArrow = true, ...props }) {
	return (
		<AccordionHeaderPrimitive className="flex">
			<AccordionTriggerPrimitive
				className={cn(
					"focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				{showArrow && (
					<ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
				)}
			</AccordionTriggerPrimitive>
		</AccordionHeaderPrimitive>
	);
}

function AccordionContent({ className, children, ...props }) {
	return (
		<AccordionContentPrimitive {...props}>
			<div className={cn("text-sm pt-0 pb-4", className)}>{children}</div>
		</AccordionContentPrimitive>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/accordion",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/accordion",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/accordion",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/accordion",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-accordion lucide-react",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-accordion lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-accordion lucide-react",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-accordion lucide-react",
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
						Accordion
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/accordion"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A vertically stacked set of interactive headings that each reveal a
					section of content.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center">
						<Accordion type="single" collapsible className="w-full max-w-md">
							<AccordionItem value="item-1">
								<AccordionTrigger>Is it accessible?</AccordionTrigger>
								<AccordionContent>
									Yes. It adheres to the WAI-ARIA design pattern.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>Is it styled?</AccordionTrigger>
								<AccordionContent>
									Yes. It comes with default styles that matches the other
									components aesthetic.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>Is it animated?</AccordionTrigger>
								<AccordionContent>
									Yes. It's animated by default, but you can disable it if you
									prefer.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
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
									data={accordionComponentCode}
									defaultValue={accordionComponentCode[0].filename}
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
							component: "<Accordion />",
							props: [
								{
									name: "type",
									type: `"single" | "multiple"`,
									description: "Determines whether one or multiple items can be opened at the same time.",
								},
								{
									name: "value",
									type: "string | string[]",
									description: "The controlled value of the accordion. Use with onValueChange.",
								},
								{
									name: "defaultValue",
									type: "string | string[]",
									description: "The uncontrolled default value of the accordion.",
								},
								{
									name: "onValueChange",
									type: "(value: string | string[]) => void",
									description: "Callback fired when the accordion value changes.",
								},
								{
									name: "collapsible",
									type: "boolean",
									description: "When type is 'single', allows closing content when clicking trigger for an open item.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents user interaction with the accordion.",
								},
								{
									name: "dir",
									type: `"ltr" | "rtl"`,
									description: "The reading direction of the accordion.",
								},
								{
									name: "orientation",
									type: `"horizontal" | "vertical"`,
									description: "The orientation of the accordion. Defaults to 'vertical'.",
								},
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the accordion.",
								},
							],
						},
						{
							component: "<AccordionItem />",
							props: [
								{
									name: "value",
									type: "string (required)",
									description: "A unique value for the item. Used to identify which item is open.",
								},
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the accordion item.",
								},
							],
						},
						{
							component: "<AccordionTrigger />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the trigger.",
								},
								{
									name: "showArrow",
									type: "boolean (default: true)",
									description: "Whether to show the chevron arrow icon. Defaults to true.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents user interaction with the trigger.",
								},
							],
						},
						{
							component: "<AccordionContent />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the content.",
								},
								{
									name: "keepRendered",
									type: "boolean (default: false)",
									description: "When true, the content remains in the DOM even when closed. Defaults to false.",
								},
								{
									name: "transition",
									type: "object",
									description: "Animation transition configuration. Defaults to { type: 'spring', stiffness: 150, damping: 22 }.",
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
