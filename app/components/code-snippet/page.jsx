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
import { GridContainer, GridItem, GridRow } from "@/registry/optics/grid";
import { Separator } from "@/registry/optics/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { ALargeSmall, Binary } from "lucide-react";
import * as React from "react";

import componentCode from "@/registry/optics/code-snippet.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "code-snippet.jsx",
		code: `import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
	SnippetTabsContents,
} from "@/registry/optics/code-snippet";

const componentFiles = [
	{
		path: "@/components/optics/code-snippet.jsx",
		code: componentCode,
	},
];

<Snippet value={value} onValueChange={setValue}>
	<SnippetHeader>
		<SnippetTabsList variant="outline">
			{commands.map((cmd) => (
				<SnippetTabsTrigger key={cmd.label} value={cmd.label}>
					{cmd.label}
				</SnippetTabsTrigger>
			))}
		</SnippetTabsList>
	</SnippetHeader>
	<SnippetTabsContents>
		{commands.map((cmd) => (
			<SnippetTabsContent key={cmd.label} value={cmd.label}>
				{cmd.code}
				<SnippetCopyButton value={cmd.code} />
			</SnippetTabsContent>
		))}
	</SnippetTabsContents>
</Snippet>`,
	},
];

const codeSnippetComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/code-snippet.jsx",
		code: `"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { cloneElement, useState } from "react";
import { Button } from "@/registry/optics/button";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { cn } from "@/lib/utils";

export const Snippet = ({ className, ...props }) => (
	<Tabs
		className={cn(
			"group w-full gap-0 overflow-hidden rounded-md border",
			className,
		)}
		{...props}
	/>
);

export const SnippetHeader = ({ className, ...props }) => (
	<div
		className={cn(
			"flex flex-row items-center justify-between border-b bg-secondary p-1",
			className,
		)}
		{...props}
	/>
);

export const SnippetCopyButton = ({
	asChild,
	value,
	onCopy,
	onError,
	timeout = 2000,
	children,
	...props
}) => {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = () => {
		if (
			typeof window === "undefined" ||
			!navigator.clipboard.writeText ||
			!value
		) {
			return;
		}

		navigator.clipboard.writeText(value).then(() => {
			setIsCopied(true);
			onCopy?.();

			setTimeout(() => setIsCopied(false), timeout);
		}, onError);
	};

	if (asChild) {
		return cloneElement(children, {
			onClick: copyToClipboard,
		});
	}

	return (
		<Button
			variant="ghost"
			role="button"
			aria-label="Copy to clipboard"
			size="icon"
			className={cn("shrink-0")}
			onClick={copyToClipboard}
			{...props}
		>
			<div className="relative">
				<div
					className={cn(
						"absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out will-change-[transform,opacity,filter]",
						isCopied
							? "scale-100 opacity-100 blur-0"
							: "blur-xs scale-[0.25] opacity-0",
					)}
				>
					<CheckIcon className="text-muted-foreground" size={14} />
				</div>
				<div
					className={cn(
						"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter]",
						isCopied
							? "blur-xs scale-[0.25] opacity-0"
							: "scale-100 opacity-100 blur-0",
					)}
				>
					<CopyIcon className="text-muted-foreground" size={14} />
				</div>
			</div>
			<span className="sr-only">Copy to clipboard</span>
		</Button>
	);
};

export const SnippetTabsList = ({ className, ...props }) => (
	<TabsList className={cn(className)} {...props} />
);

export const SnippetTabsTrigger = ({ className, ...props }) => (
	<TabsTrigger className={cn("gap-1.5", className)} {...props} />
);

export const SnippetTabsContent = ({ className, children, ...props }) => (
	<TabsContent
		className={cn(
			"mt-0 bg-background p-4 text-sm truncate font-mono",
			className,
		)}
		{...props}
	>
		{children}
	</TabsContent>
);

export const SnippetTabsContents = ({ className, children, ...props }) => (
	<TabsContents className={cn(className)} {...props}>
		{children}
	</TabsContents>
);`,
	},
];

const commandsExample = [
	{
		label: "npm",
		code: "npm install package",
	},
	{
		label: "yarn",
		code: "yarn add package",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add lucide-react",
	},
	{
		label: "npm",
		code: "npm install lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add lucide-react",
	},
	{
		label: "bun",
		code: "bun add lucide-react",
	},
];

export default function Page() {
	const [valueExample, setValueExample] = React.useState(
		commandsExample[0].label,
	);
	const {
		mounted,
		value,
		setValue,
		installationTab,
		handleTabChange,
		activeCommand,
		activeDepsCommand,
	} = useCookiePreferences("code-snippet", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Code Snippet
					</h1>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A component for displaying code snippets with syntax highlighting and
					copy functionality.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<Snippet
							value={valueExample}
							onValueChange={setValueExample}
							className="w-full"
						>
							<SnippetHeader>
								<SnippetTabsList variant="outline">
									{commandsExample.map((command) => (
										<SnippetTabsTrigger
											key={command.label}
											value={command.label}
										>
											{command.label}
										</SnippetTabsTrigger>
									))}
								</SnippetTabsList>
							</SnippetHeader>
							<SnippetTabsContents>
								{commandsExample.map((command) => (
									<SnippetTabsContent
										key={command.label}
										value={command.label}
										className="flex items-center justify-between gap-4"
									>
										{command.code}
										<SnippetCopyButton value={command.code} />
									</SnippetTabsContent>
								))}
							</SnippetTabsContents>
						</Snippet>
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
				componentName="code-snippet"
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
							component: "<SnippetCopyButton />",
							props: [
								{
									name: "value",
									type: "string",
									description: "The value to copy to the clipboard.",
								},
								{
									name: "timeout",
									type: "number",
									description:
										"The timeout in milliseconds to copy the value to the clipboard.",
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
