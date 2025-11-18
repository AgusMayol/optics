"use client";
import * as React from "react";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";
import { links } from "@/app/layout-content";
import { usePathname } from "next/navigation";
import {
	ALargeSmall,
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	Binary,
	CircleDashed,
	Sparkle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import { Badge } from "@/registry/agusmayol/badge";
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
import { Feedback } from "@/registry/agusmayol/feedback";
const code = [
	{
		language: "jsx",
		filename: "card.jsx",
		code: `import { Button } from "@/registry/agusmayol/button";

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="info">Info</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="muted">Muted</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="raised">Raised</Button>
<Button size="lg">Large</Button>
<Button size="icon-lg">
	<Sparkle />
</Button>
<Button size="icon">
	<Sparkle />
</Button>
<Button size="icon-sm">
	<Sparkle />
</Button>
<Button size="sm">Small</Button>
<Button variant="link" asChild>
	<Link href="#">
		Link
		<ArrowUpRight size={16} className="-ml-1" />
	</Link>
</Button>`,
	},
];

const buttonComponentCode = [
	{
		language: "tsx",
		filename: "components/ui/optics/button.tsx",
		code: `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const otherThemes = cva("transition-all duration-150", {
	variants: {
		variant: {
			raised:
				"[text-shadow:0_1px_0_var(--color-zinc-100)] dark:[text-shadow:0_1px_0_var(--color-zinc-900)] bg-background border-input/50 relative border-b-2 shadow-sm shadow-zinc-950/15 ring-1 ring-zinc-300 dark:ring-zinc-700 text-foreground",
			ghost:
				"bg-transparent hover:bg-accent text-foreground border-none !shadow-none",
			outline:
				"border border-input bg-transparent shadow-xs hover:bg-accent text-foreground",
		},
	},
});

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none cursor-pointer text-white",
	{
		variants: {
			variant: {
				default:
					"bg-radial-[at_52%_-52%] [text-shadow:0_1px_0_var(--color-primary)] border-primary from-primary/70 to-primary/95 text-primary-foreground inset-shadow-2xs inset-shadow-white/25 border text-sm shadow-md shadow-zinc-950/30 ring-0 transition-[filter] duration-200 hover:brightness-125 active:brightness-95",
				secondary:
					"shadow-xs bg-linear-to-t hover:to-muted to-sidebar from-muted dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10 duration-200 text-foreground",
				muted:
					"bg-muted hover:bg-neutral-200 shadow-zinc-950/10 duration-200 text-foreground",
				outline:
					"border border-input bg-transparent shadow-xs hover:bg-accent text-foreground",
				ghost: "bg-transparent hover:bg-accent text-foreground",
				link: "text-primary underline-offset-4 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current hover:after:w-full after:transition-[width] after:duration-150 !px-0 !pb-0 -mt-1.5 [&_svg]:text-muted-foreground group [&_svg]:group-hover:text-foreground transition-colors",
				info: "[text-shadow:0_1px_0_var(--color-blue-800)] from-blue-600/85 to-blue-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
				success:
					"[text-shadow:0_1px_0_var(--color-emerald-800)] from-emerald-600/85 to-emerald-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
				warning:
					"[text-shadow:0_1px_0_var(--color-amber-800)] from-amber-600/85 to-amber-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
				destructive:
					"from-destructive to-destructive/85 bg-linear-to-t border border-b-2 border-zinc-950/40 shadow-md shadow-zinc-950/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90",
				raised:
					"[text-shadow:0_1px_0_var(--color-zinc-100)] dark:[text-shadow:0_1px_0_var(--color-zinc-900)] bg-background hover:bg-zinc-50 dark:hover:bg-neutral-900 border-input/50 relative border-b-2 shadow-sm shadow-zinc-950/15 ring-1 ring-zinc-300 dark:ring-zinc-700 text-foreground",
			},

			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},

			animation: {
				colors: "transition-colors duration-150",
				all: "active:scale-[0.97] transition-all duration-150",
				none: "transition-none",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	animation = "all",
	asChild = false,
	...props
}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, animation, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants, otherThemes };
`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/button",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/button",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/button",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/button",
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
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Button
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/button"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Displays a button or a component that looks like a button.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center flex-wrap gap-4">
						{/* Component */}
						<Button>Default</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="info">Info</Button>
						<Button variant="success">Success</Button>
						<Button variant="warning">Warning</Button>
						<Button variant="muted">Muted</Button>
						<Button variant="ghost">Ghost</Button>

						<Button variant="destructive">Destructive</Button>
						<Button variant="raised">Raised</Button>
						<Button size="lg">Large</Button>

						<Button size="icon-lg">
							<Sparkle />
						</Button>
						<Button size="icon">
							<Sparkle />
						</Button>
						<Button size="icon-sm">
							<Sparkle />
						</Button>
						<Button size="sm">Small</Button>
						<Button variant="link" asChild>
							<Link href="#">
								Link
								<ArrowUpRight size={16} className="-ml-1" />
							</Link>
						</Button>
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
									data={buttonComponentCode}
									defaultValue={buttonComponentCode[0].filename}
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
				<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>
				<div className="w-full flex flex-col gap-2">
					<Badge variant="outline" className="text-xs font-mono">
						{"<Button />"}
					</Badge>

					<GridContainer
						cols={12}
						border={false}
						rows={4}
						className={`[&>*:not(:first-child)]:!border-t [&>*]:py-4 [&>*]:pl-4 [&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl shadow border rounded-xl ${
							4 % 2 === 0
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
									variant
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								"default" | "outline" | "ghost" | "destructive" | "secondary" |
								"info" | "success" | "warning" | "muted" | "raised" | "link"
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
								"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"
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
									asChild
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								boolean
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
