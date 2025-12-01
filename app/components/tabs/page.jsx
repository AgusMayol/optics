"use client";
import * as React from "react";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContents,
	TabsContent,
} from "@/registry/optics/tabs";
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
import { GridContainer, GridRow, GridItem } from "@/registry/optics/grid";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/optics/card";
import { Label } from "@/registry/optics/label";
import { Input } from "@/registry/optics/input";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/optics/accordion";
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
import { Separator } from "@/registry/optics/separator";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
	SnippetTabsContents,
} from "@/registry/optics/code-snippet";

const code = [
	{
		language: "jsx",
		filename: "tabs.jsx",
		code: `import { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent } from "@/registry/optics/tabs";
import { Card } from "@/registry/optics/card";

<Tabs defaultValue="account" className="w-[400px]">
	<TabsList variant="default">
		<TabsTrigger value="account">Account</TabsTrigger>
		<TabsTrigger value="password">Password</TabsTrigger>
	</TabsList>
	<TabsContents>
		<TabsContent value="account">
			<Card>
				<p>Make changes to your account here.</p>
			</Card>
		</TabsContent>
		<TabsContent value="password">
			<Card>
				<p>Change your password here.</p>
			</Card>
		</TabsContent>
	</TabsContents>
</Tabs>`,
	},
];

const tabsComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/tabs.jsx",
		code: `import * as React from "react";

import {
	Tabs as TabsPrimitive,
	TabsList as TabsListPrimitive,
	TabsTrigger as TabsTriggerPrimitive,
	TabsContent as TabsContentPrimitive,
	TabsContents as TabsContentsPrimitive,
	TabsHighlight as TabsHighlightPrimitive,
	TabsHighlightItem as TabsHighlightItemPrimitive,
} from "@/components/animate-ui/primitives/radix/tabs";
import { cn } from "@/lib/utils";
import { getStrictContext } from "@/lib/get-strict-context";

const [TabsVariantProvider, useTabsVariant] =
	getStrictContext("TabsVariantContext");

function Tabs({ className, ...props }) {
	return (
		<TabsPrimitive
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

function TabsList({ className, variant = "default", ...props }) {
	const highlightStyles = {
		default:
			"absolute z-0 inset-0 border border-transparent rounded-md bg-background dark:border-input dark:bg-input/30 shadow-sm",
		outline:
			"absolute z-0 inset-0 border rounded-md dark:border-input dark:bg-input/30",
		underline: "absolute z-0 -bottom-0.25 left-0 right-0 h-0.5 bg-foreground",
	};

	const listStyles = {
		default:
			"bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
		outline:
			"bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
		underline:
			"inline-flex h-9 w-fit items-center justify-center gap-1 border-b border-border",
	};

	return (
		<TabsVariantProvider value={{ variant }}>
			<TabsHighlightPrimitive className={highlightStyles[variant]}>
				<TabsListPrimitive
					className={cn(listStyles[variant], className)}
					{...props}
				/>
			</TabsHighlightPrimitive>
		</TabsVariantProvider>
	);
}

function TabsTrigger({ className, ...props }) {
	const { variant } = useTabsVariant();

	const triggerStyles = {
		default:
			"data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md w-full px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		outline:
			"data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md w-full px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		underline:
			"data-[state=active]:text-foreground text-muted-foreground inline-flex h-full flex-1 items-center justify-center gap-1.5 w-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	};

	return (
		<TabsHighlightItemPrimitive value={props.value} className="flex-1">
			<TabsTriggerPrimitive
				className={cn(triggerStyles[variant], className)}
				{...props}
			/>
		</TabsHighlightItemPrimitive>
	);
}

function TabsContents(props) {
	return <TabsContentsPrimitive {...props} />;
}

function TabsContent({ className, ...props }) {
	return (
		<TabsContentPrimitive
			className={cn("flex-1 outline-none", className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent };`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/tabs",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/tabs",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/tabs",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/tabs",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-tabs",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-tabs",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-tabs",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-tabs",
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
						Tabs
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://animate-ui.com/docs/components/radix/tabs"
							target="_blank"
							rel="noopener noreferrer"
						>
							animate-ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A set of layered sections of content—known as tab panels—that are
					displayed one at a time.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 w-full flex items-center justify-center">
						<Tabs defaultValue="account" className="w-full max-w-sm">
							<TabsList variant="default">
								<TabsTrigger value="account">Account</TabsTrigger>
								<TabsTrigger value="password">Password</TabsTrigger>
							</TabsList>
							<Card className="shadow-none py-0">
								<TabsContents className="py-6">
									<TabsContent value="account" className="flex flex-col gap-6">
										<CardHeader>
											<CardTitle>Account</CardTitle>
											<CardDescription>
												Make changes to your account here. Click save when
												you&apos;re done.
											</CardDescription>
										</CardHeader>
										<CardContent className="grid gap-6">
											<div className="grid gap-3">
												<Label htmlFor="tabs-demo-name">Name</Label>
												<Input
													id="tabs-demo-name"
													defaultValue="Pedro Duarte"
												/>
											</div>
										</CardContent>
										<CardFooter>
											<Button>Save changes</Button>
										</CardFooter>
									</TabsContent>
									<TabsContent value="password" className="flex flex-col gap-6">
										<CardHeader>
											<CardTitle>Password</CardTitle>
											<CardDescription>
												Change your password here. After saving, you&apos;ll be
												logged out.
											</CardDescription>
										</CardHeader>
										<CardContent className="grid gap-6">
											<div className="grid gap-3">
												<Label htmlFor="tabs-demo-current">
													Current password
												</Label>
												<Input id="tabs-demo-current" type="password" />
											</div>
											<div className="grid gap-3">
												<Label htmlFor="tabs-demo-new">New password</Label>
												<Input id="tabs-demo-new" type="password" />
											</div>
										</CardContent>
										<CardFooter>
											<Button>Save password</Button>
										</CardFooter>
									</TabsContent>
								</TabsContents>
							</Card>
						</Tabs>
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
									data={tabsComponentCode}
									defaultValue={tabsComponentCode[0].filename}
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

				<div className="w-full flex flex-col gap-6">
					<div className="w-full flex flex-col gap-2">
						<Badge variant="outline" className="text-xs font-mono w-fit">
							{"<TabsList />"}
						</Badge>

						<GridContainer
							cols={12}
							border={false}
							rows={2}
							className={`[&>*:not(:first-child)]:!border-t [&>*]:py-4 [&>*]:pl-4 [&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl shadow border rounded-xl [&>*:nth-child(even)]:bg-muted`}
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
									"default" | "outline" | "underline"
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
		</main>
	);
}
