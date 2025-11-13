"use client";

import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/agusmayol/code-snippet";
import { BoxIcon, HeartIcon, Sparkle } from "lucide-react";
import * as React from "react";
const commands = [
	{
		label: "agusmayol's optics",
		icon: Sparkle,
		code: "npx agusmayol@latest add snippet",
	},
	{
		label: "shadcn",
		icon: BoxIcon,
		code: "npx shadcn@latest add https://www.kibo-ui.com/r/snippet.json",
	},
];

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
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/agusmayol/accordion";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlockSelect,
	CodeBlockSelectContent,
	CodeBlockSelectItem,
	CodeBlockSelectTrigger,
	CodeBlockSelectValue,
} from "@/registry/agusmayol/code-block";

export default function Page() {
	const [value, setValue] = React.useState(commands[0].label);
	const activeCommand = commands.find((command) => command.label === value);

	const code = [
		{
			language: "jsx",
			filename: "card.jsx",
			code: `import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/agusmayol/code-snippet";

const [value, setValue] = React.useState(commands[0].label);
const activeCommand = commands.find((command) => command.label === value);

const commands = [
	{
		label: "agusmayol's optics",
		icon: Sparkle,
		code: "npx amo@latest add snippet",
	},
	{
		label: "shadcn",
		icon: BoxIcon,
		code: "npx shadcn@latest add https://www.kibo-ui.com/r/snippet.json",
	},
];


<Snippet onValueChange={setValue} value={value}>
	<SnippetHeader>
		<SnippetTabsList>
			{commands.map((command) => (
				<SnippetTabsTrigger key={command.label} value={command.label}>
					<command.icon size={14} />
					<span>{command.label}</span>
				</SnippetTabsTrigger>
			))}
		</SnippetTabsList>
		{activeCommand && (
			<SnippetCopyButton
				value={activeCommand.code}
			/>
		)}
	</SnippetHeader>
	{commands.map((command) => (
		<SnippetTabsContent key={command.label} value={command.label}>
			{command.code}
		</SnippetTabsContent>
	))}
</Snippet>`,
		},
	];

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">Code Snippet</h1>
				<p className="text-muted-foreground text-xl">
					Displays a code snippet with tabs and a copy button.
				</p>
			</div>
			<div className="flex flex-col flex-1 gap-8 p-12 bg-background">
				<Card className="pt-8 pb-0 bg-background">
					<CardContent className="px-8">
						{/* Component */}
						<Snippet onValueChange={setValue} value={value}>
							<SnippetHeader>
								<SnippetTabsList>
									{commands.map((command) => (
										<SnippetTabsTrigger
											key={command.label}
											value={command.label}
										>
											<command.icon size={14} />
											<span>{command.label}</span>
										</SnippetTabsTrigger>
									))}
								</SnippetTabsList>
								{activeCommand && (
									<SnippetCopyButton
										onCopy={() =>
											console.log(`Copied "${activeCommand.code}" to clipboard`)
										}
										onError={() =>
											console.error(
												`Failed to copy "${activeCommand.code}" to clipboard`,
											)
										}
										value={activeCommand.code}
									/>
								)}
							</SnippetHeader>
							{commands.map((command) => (
								<SnippetTabsContent key={command.label} value={command.label}>
									{command.code}
								</SnippetTabsContent>
							))}
						</Snippet>
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
		</main>
	);
}
