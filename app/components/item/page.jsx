"use client";
import * as React from "react";
import {
	Item,
	ItemMedia,
	ItemContent,
	ItemActions,
	ItemGroup,
	ItemSeparator,
	ItemTitle,
	ItemDescription,
	ItemHeader,
	ItemFooter,
} from "@/registry/optics/item";
import { cn } from "@/lib/utils";
import { links } from "@/app/layout-content";
import { usePathname } from "next/navigation";
import {
	ALargeSmall,
	ArrowLeft,
	ArrowRight,
	Binary,
	Mail,
	Star,
} from "lucide-react";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/optics/grid";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
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
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
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
		filename: "item.jsx",
		code: `import {
	Item,
	ItemMedia,
	ItemContent,
	ItemTitle,
	ItemDescription,
	ItemActions,
} from "@/registry/optics/item";
import { Button } from "@/registry/optics/button";
import { Mail } from "lucide-react";

<Item>
	<ItemMedia variant="icon">
		<Mail />
	</ItemMedia>
	<ItemContent>
		<ItemTitle>New Message</ItemTitle>
		<ItemDescription>
			You have a new message from John Doe
		</ItemDescription>
	</ItemContent>
	<ItemActions>
		<Button size="sm">View</Button>
	</ItemActions>
</Item>`,
	},
];

const itemComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/item.jsx",
		code: `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { otherThemes } from "@/registry/optics/button";

function ItemGroup({ className, ...props }) {
	return (
		<div
			role="list"
			data-slot="item-group"
			className={cn("group/item-group flex flex-col", className)}
			{...props}
		/>
	);
}

function ItemSeparator({ className, ...props }) {
	return (
		<Separator
			data-slot="item-separator"
			orientation="horizontal"
			className={cn("my-0", className)}
			{...props}
		/>
	);
}

const itemVariants = cva(
	"group/item flex items-center border border-transparent text-sm rounded-md transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "border-border",
				muted: "bg-muted/50",
			},
			size: {
				default: "p-4 gap-4",
				sm: "py-3 px-4 gap-2.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Item({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}) {
	const Comp = asChild ? Slot : "div";
	return (
		<Comp
			data-slot="item"
			data-variant={variant}
			data-size={size}
			className={cn(
				itemVariants({ variant, size, className }),
				otherThemes({ variant }),
			)}
			{...props}
		/>
	);
}

const itemMediaVariants = cva(
	"flex shrink-0 items-center justify-center gap-2",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
				image: "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function ItemMedia({ className, variant = "default", ...props }) {
	return (
		<div
			data-slot="item-media"
			data-variant={variant}
			className={cn(itemMediaVariants({ variant, className }))}
			{...props}
		/>
	);
}

function ItemContent({ className, ...props }) {
	return (
		<div
			data-slot="item-content"
			className={cn("flex flex-1 flex-col gap-1", className)}
			{...props}
		/>
	);
}

function ItemTitle({ className, ...props }) {
	return (
		<div
			data-slot="item-title"
			className={cn("flex w-fit items-center gap-2 text-sm leading-snug font-medium", className)}
			{...props}
		/>
	);
}

function ItemDescription({ className, ...props }) {
	return (
		<p
			data-slot="item-description"
			className={cn("text-muted-foreground line-clamp-2 text-sm leading-normal font-normal", className)}
			{...props}
		/>
	);
}

function ItemActions({ className, ...props }) {
	return (
		<div
			data-slot="item-actions"
			className={cn("flex items-center gap-2", className)}
			{...props}
		/>
	);
}

function ItemHeader({ className, ...props }) {
	return (
		<div
			data-slot="item-header"
			className={cn("flex basis-full items-center justify-between gap-2", className)}
			{...props}
		/>
	);
}

function ItemFooter({ className, ...props }) {
	return (
		<div
			data-slot="item-footer"
			className={cn("flex basis-full items-center justify-between gap-2", className)}
			{...props}
		/>
	);
}

export {
	Item,
	ItemMedia,
	ItemContent,
	ItemActions,
	ItemGroup,
	ItemSeparator,
	ItemTitle,
	ItemDescription,
	ItemHeader,
	ItemFooter,
};`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/item",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/item",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/item",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/item",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-slot class-variance-authority",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-slot class-variance-authority",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-slot class-variance-authority",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-slot class-variance-authority",
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
						Item
					</h1>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A flexible list item component for building complex layouts with
					media, content, and actions.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center gap-4">
						<ItemGroup>
							<Item>
								<ItemMedia variant="icon">
									<Mail />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>New Message</ItemTitle>
									<ItemDescription>
										You have a new message from John Doe
									</ItemDescription>
								</ItemContent>
								<ItemActions>
									<Button size="sm">View</Button>
								</ItemActions>
							</Item>
							<ItemSeparator />
							<Item>
								<ItemMedia variant="icon">
									<Star />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>Featured Item</ItemTitle>
									<ItemDescription>
										This is a featured item with special content
									</ItemDescription>
								</ItemContent>
								<ItemActions>
									<Button size="sm" variant="secondary">
										Details
									</Button>
								</ItemActions>
							</Item>
						</ItemGroup>
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
									data={itemComponentCode}
									defaultValue={itemComponentCode[0].filename}
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
							{"<Item />"}
						</Badge>

						<GridContainer
							cols={12}
							border={false}
							rows={4}
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
										variant
									</Badge>
								</GridItem>
								<GridItem span={8} className="text-xs font-mono justify-start">
									"default" | "outline" | "muted"
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
									"default" | "sm"
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

					<div className="w-full flex flex-col gap-2">
						<Badge variant="outline" className="text-xs font-mono">
							{"<ItemMedia />"}
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
									"default" | "icon" | "image"
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
