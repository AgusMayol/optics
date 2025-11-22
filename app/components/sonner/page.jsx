"use client";
import * as React from "react";
import { toast, Toaster } from "@/registry/agusmayol/sonner";
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
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import { Badge } from "@/registry/agusmayol/badge";
import { Button } from "@/registry/agusmayol/button";
import { Card, CardContent, CardFooter } from "@/registry/agusmayol/card";
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
		filename: "sonner.jsx",
		code: `import { toast } from "@/registry/agusmayol/sonner";

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
	const activeDepsCommand = installDeps.find(
		(command) => command.label === value,
	);

	React.useEffect(() => {
		setMounted(true);
		const savedPackageManager = getCookie("preferred-package-manager");
		if (
			savedPackageManager &&
			commands.find((c) => c.label === savedPackageManager)
		) {
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

	const handleTabChange = React.useCallback(
		(newTab) => {
			setInstallationTab(newTab);
			if (mounted) {
				setCookie("preferred-installation-tab", newTab);
			}
		},
		[mounted],
	);

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

				<div className="w-full flex flex-col gap-8">
					<div className="w-full flex flex-col gap-2">
						<Badge variant="outline" className="text-xs font-mono">
							{"toast()"}
						</Badge>

						<GridContainer
							cols={12}
							border={false}
							rows={9}
							className={`[&>*:not(:first-child)]:!border-t [&>*]:py-4 [&>*]:pl-4 [&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl shadow border rounded-xl [&>*:nth-child(odd)]:bg-muted`}
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
										type
									</Badge>
								</GridItem>
								<GridItem span={8} className="text-xs font-mono justify-start">
									"success" | "error" | "info" | "warning" | "promise"
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
										title
									</Badge>
								</GridItem>
								<GridItem span={8} className="text-xs font-mono justify-start">
									string
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
										description
									</Badge>
								</GridItem>
								<GridItem span={8} className="text-xs font-mono justify-start">
									string
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
										button
									</Badge>
								</GridItem>
								<GridItem span={8} className="text-xs font-mono justify-start">
									{"{ label: string, onClick: () => void }"}
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
										promise
									</Badge>
								</GridItem>
								<GridItem span={8} className="text-xs font-mono justify-start">
									Promise
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
										loading
									</Badge>
								</GridItem>
								<GridItem span={8} className="text-xs font-mono justify-start">
									string (for promise type)
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
										success
									</Badge>
								</GridItem>
								<GridItem span={8} className="text-xs font-mono justify-start">
									string (for promise type)
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
										duration
									</Badge>
								</GridItem>
								<GridItem span={8} className="text-xs font-mono justify-start">
									number (default: 5500)
								</GridItem>
							</GridRow>
						</GridContainer>
					</div>
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
			<Toaster />
		</main>
	);
}
