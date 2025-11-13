"use client";
import * as React from "react";
import { Feedback } from "@/registry/agusmayol/feedback";
import { cn } from "@/lib/utils";
import { links } from "@/app/layout-content";
import { usePathname } from "next/navigation";
import {
	ALargeSmall,
	ArrowLeft,
	ArrowRight,
	Binary,
} from "lucide-react";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import { Badge } from "@/registry/agusmayol/badge";
import { Button } from "@/registry/agusmayol/button";
import {
	Card,
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
} from "@/registry/agusmayol/code-block";
import { Separator } from "@/registry/agusmayol/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/agusmayol/tabs";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
	SnippetTabsContents,
} from "@/registry/agusmayol/code-snippet";

const code = [
	{
		language: "jsx",
		filename: "feedback.jsx",
		code: `import { Feedback } from "@/registry/agusmayol/feedback";

<Feedback label="How was your experience?" />`,
	},
];

const feedbackComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/feedback.jsx",
		code: `import React from "react";
import { Button } from "@/registry/agusmayol/button";
import { Textarea } from "@/registry/agusmayol/textarea";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/registry/agusmayol/popover";
import { otherThemes } from "@/registry/agusmayol/button";

// Icon components for ratings
const LoveItIcon = ({ pathClassName }) => (
	<svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			fill="var(--color-muted-foreground)"
			d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M6.15295 4.92093L5.375 3.5L4.59705 4.92093L3 5.21885L4.11625 6.39495L3.90717 8L5.375 7.30593L6.84283 8L6.63375 6.39495L7.75 5.21885L6.15295 4.92093Z"
			className={pathClassName}
		/>
	</svg>
);

const ItsOkayIcon = () => (
	<svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			fill="var(--color-muted-foreground)"
			d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
		/>
	</svg>
);

const NotGreaterIcon = () => (
	<svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			fill="var(--color-muted-foreground)"
			d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
		/>
	</svg>
);

const HateIcon = () => (
	<svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			fill="var(--color-muted-foreground)"
			d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
		/>
	</svg>
);

export const Feedback = ({ type = "default", label }) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className={cn(
					otherThemes({ variant: "outline" }), 
					"rounded-full flex items-center justify-center gap-2 !px-4 py-2 text-sm hover:bg-transparent text-muted-foreground"
				)}>
					{label}
					<div className="flex items-center gap-0.5">
						<Button variant="ghost" size="icon-sm" className="rounded-full">
							<LoveItIcon pathClassName="fill-amber-500" />
						</Button>
						<Button variant="ghost" size="icon-sm" className="rounded-full">
							<ItsOkayIcon />
						</Button>
						<Button variant="ghost" size="icon-sm" className="rounded-full">
							<NotGreaterIcon />
						</Button>
						<Button variant="ghost" size="icon-sm" className="rounded-full">
							<HateIcon />
						</Button>
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent>
				{/* Feedback form content */}
			</PopoverContent>
		</Popover>
	);
};`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/feedback",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/feedback",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/feedback",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/feedback",
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
	const [value, setValue] = React.useState(commands[0].label);
	const [installationTab, setInstallationTab] = React.useState("tab1");
	
	const activeCommand = commands.find((command) => command.label === value);
	const activeDepsCommand = installDeps.find((command) => command.label === value);

	React.useEffect(() => {
		setMounted(true);
		const savedPackageManager = getCookie("preferred-package-manager");
		if (savedPackageManager && commands.find(c => c.label === savedPackageManager)) {
			setValue(savedPackageManager);
		} else {
			setCookie("preferred-package-manager", commands[0].label);
		}
		
		const savedInstallationTab = getCookie("preferred-installation-tab");
		if (savedInstallationTab === "tab1" || savedInstallationTab === "tab2") {
			setInstallationTab(savedInstallationTab);
		} else {
			setCookie("preferred-installation-tab", "tab1");
		}
	}, []);

	React.useEffect(() => {
		if (mounted) {
			setCookie("preferred-package-manager", value);
		}
	}, [value, mounted]);

	const handleTabChange = React.useCallback((newTab) => {
		setInstallationTab(newTab);
		if (mounted) {
			setCookie("preferred-installation-tab", newTab);
		}
	}, [mounted]);

	function getSiblingComponent(pathname, direction = "previous") {
		const componentsSection = links.find(
			(section) =>
				section.name && section.name.toLowerCase().includes("component"),
		);

		if (!componentsSection || !Array.isArray(componentsSection.items))
			return null;

		const items = componentsSection.items;
		const currentIdx = items.findIndex((item) => item.href === pathname);

		if (currentIdx === -1) return null;
		if (direction === "previous" && currentIdx === 0) return null;
		if (direction === "next" && currentIdx === items.length - 1) return null;

		let siblingIdx = direction === "previous" ? currentIdx - 1 : currentIdx + 1;
		if (siblingIdx < 0 || siblingIdx >= items.length) return null;

		return items[siblingIdx];
	}

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-4xl font-bold tracking-tight">Feedback</h1>
				</div>

				<p className="text-muted-foreground text-xl">
					A feedback widget with emoji ratings and text input for collecting user feedback.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center gap-4">
						<Feedback label="How was your experience?" />
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

			<div className="flex flex-col items-start justify-start gap-4 p-12 pt-0">
				<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
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
						<TabsContent value="tab2" className="w-full pt-4 flex flex-col gap-12">
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
									data={feedbackComponentCode}
									defaultValue={feedbackComponentCode[0].filename}
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

			<div className="flex flex-col items-start justify-start gap-4 p-12 pt-0">
				<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>
				
				<div className="w-full flex flex-col gap-2">
					<Badge variant="outline" className="text-xs font-mono">
						{"<Feedback />"}
					</Badge>

					<GridContainer
						cols={12}
						border={false}
						rows={3}
						className={`[&>*:not(:first-child)]:!border-t [&>*]:py-4 [&>*]:pl-4 [&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl shadow border rounded-xl [&>*:nth-child(odd)]:bg-muted`}
					>
						<GridRow>
							<GridItem span={4} className="text-xs font-semibold justify-start gap-1">
								<ALargeSmall />
								Name
							</GridItem>
							<GridItem span={8} className="text-xs font-semibold gap-1 mr-auto">
								<Binary size={16} />
								Type
							</GridItem>
						</GridRow>
						<GridRow>
							<GridItem span={4} className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]">
								<Badge variant="outline" className="font-mono text-blue-600 dark:text-blue-400 bg-background">
									label
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								string
							</GridItem>
						</GridRow>
						<GridRow>
							<GridItem span={4} className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]">
								<Badge variant="outline" className="font-mono text-blue-600 dark:text-blue-400 bg-background">
									type
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								string (default: "default")
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

