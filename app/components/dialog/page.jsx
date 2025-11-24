"use client";
import * as React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/agusmayol/dialog";
import { Button } from "@/registry/agusmayol/button";
import { Input } from "@/registry/agusmayol/input";
import { Label } from "@/registry/agusmayol/label";
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
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import { Badge } from "@/registry/agusmayol/badge";
import Link from "next/link";
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
		filename: "dialog.jsx",
		code: `import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/agusmayol/dialog";
import { Button } from "@/registry/agusmayol/button";

<Dialog>
	<DialogTrigger asChild>
		<Button variant="raised">Edit Profile</Button>
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Edit profile</DialogTitle>
			<DialogDescription>
				Make changes to your profile here. Click save when you're done.
			</DialogDescription>
		</DialogHeader>
		<div className="grid gap-4 py-4">
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="name" className="text-right">
					Name
				</Label>
				<Input id="name" value="Pedro Duarte" className="col-span-3" />
			</div>
		</div>
		<DialogFooter>
			<Button type="submit" variant="raised">Save changes</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>`,
	},
];

const dialogComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/dialog.jsx",
		code: `"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}>
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
}`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/dialog",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/dialog",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/dialog",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/dialog",
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
	const [open, setOpen] = React.useState(false);

	const activeCommand = commands.find((command) => command.label === value);

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
						Dialog
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/dialog"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A window overlaid on either the primary window or another dialog
					window, rendering the content underneath inert.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger asChild>
								<Button variant="raised">Edit Profile</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Edit profile</DialogTitle>
									<DialogDescription>
										Make changes to your profile here. Click save when you're
										done.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Name
										</Label>
										<Input
											id="name"
											defaultValue="Pedro Duarte"
											className="col-span-3"
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="username" className="text-right">
											Username
										</Label>
										<Input
											id="username"
											defaultValue="@peduarte"
											className="col-span-3"
										/>
									</div>
								</div>
								<DialogFooter>
									<Button type="submit" variant="default">
										Save changes
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
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
									Copy and paste the following code into your project:
								</p>

								<CodeBlock
									data={dialogComponentCode}
									defaultValue={dialogComponentCode[0].filename}
								>
									<CodeBlockHeader>
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
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>
				<div className="w-full flex flex-col gap-2">
					<Badge variant="outline" className="text-xs font-mono">
						{"<Dialog />"}
					</Badge>

					<GridContainer
						cols={12}
						border={false}
						rows={3}
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
									open
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								boolean (controlled)
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
									onOpenChange
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								(open: boolean) =&gt; void
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
