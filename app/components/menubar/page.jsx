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
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/registry/optics/menubar";
import { Separator } from "@/registry/optics/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { ALargeSmall, ArrowUpRight, Binary } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const code = [
	{
		language: "jsx",
		filename: "menubar.jsx",
		code: `import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/registry/optics/menubar";

<Menubar>
	<MenubarMenu>
		<MenubarTrigger>File</MenubarTrigger>
		<MenubarContent>
			<MenubarItem>
				New Tab <MenubarShortcut>⌘T</MenubarShortcut>
			</MenubarItem>
			<MenubarItem>
				New Window <MenubarShortcut>⌘N</MenubarShortcut>
			</MenubarItem>
			<MenubarSeparator />
			<MenubarItem>
				Share <MenubarShortcut>⌘⇧S</MenubarShortcut>
			</MenubarItem>
		</MenubarContent>
	</MenubarMenu>
</Menubar>`,
	},
];

const menubarComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/menubar.jsx",
		code: `"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Menubar({
  className,
  ...props
}) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className
      )}
      {...props} />
  );
}

function MenubarMenu({
  ...props
}) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarTrigger({
  className,
  ...props
}) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className
      )}
      {...props} />
  );
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
}`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/menubar",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/menubar",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/menubar",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/menubar",
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
	} = useCookiePreferences(commands, []);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Menubar
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/menubar"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Displays a menu bar that can be used to create a native application
					menu.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<Menubar>
							<MenubarMenu>
								<MenubarTrigger>File</MenubarTrigger>
								<MenubarContent>
									<MenubarItem>
										New Tab <MenubarShortcut>⌘T</MenubarShortcut>
									</MenubarItem>
									<MenubarItem>
										New Window <MenubarShortcut>⌘N</MenubarShortcut>
									</MenubarItem>
									<MenubarItem disabled>New Incognito Window</MenubarItem>
									<MenubarSeparator />
									<MenubarSub>
										<MenubarSubTrigger>Share</MenubarSubTrigger>
										<MenubarSubContent>
											<MenubarItem>Email link</MenubarItem>
											<MenubarItem>Messages</MenubarItem>
											<MenubarItem>Notes</MenubarItem>
										</MenubarSubContent>
									</MenubarSub>
									<MenubarSeparator />
									<MenubarItem>
										Print... <MenubarShortcut>⌘P</MenubarShortcut>
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
							<MenubarMenu>
								<MenubarTrigger>Edit</MenubarTrigger>
								<MenubarContent>
									<MenubarItem>
										Undo <MenubarShortcut>⌘Z</MenubarShortcut>
									</MenubarItem>
									<MenubarItem>
										Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
									</MenubarItem>
									<MenubarSeparator />
									<MenubarSub>
										<MenubarSubTrigger>Find</MenubarSubTrigger>
										<MenubarSubContent>
											<MenubarItem>Search the web</MenubarItem>
											<MenubarSeparator />
											<MenubarItem>Find...</MenubarItem>
											<MenubarItem>Find Next</MenubarItem>
											<MenubarItem>Find Previous</MenubarItem>
										</MenubarSubContent>
									</MenubarSub>
									<MenubarSeparator />
									<MenubarItem>Cut</MenubarItem>
									<MenubarItem>Copy</MenubarItem>
									<MenubarItem>Paste</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
							<MenubarMenu>
								<MenubarTrigger>View</MenubarTrigger>
								<MenubarContent>
									<MenubarCheckboxItem>
										Always Show Bookmarks Bar
									</MenubarCheckboxItem>
									<MenubarCheckboxItem checked>
										Always Show Full URLs
									</MenubarCheckboxItem>
									<MenubarSeparator />
									<MenubarItem inset>
										Reload <MenubarShortcut>⌘R</MenubarShortcut>
									</MenubarItem>
									<MenubarItem disabled inset>
										Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
									</MenubarItem>
									<MenubarSeparator />
									<MenubarItem inset>Toggle Fullscreen</MenubarItem>
									<MenubarSeparator />
									<MenubarItem inset>Hide Sidebar</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
							<MenubarMenu>
								<MenubarTrigger>Profiles</MenubarTrigger>
								<MenubarContent>
									<MenubarRadioGroup value="benoit">
										<MenubarRadioItem value="andy">Andy</MenubarRadioItem>
										<MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
										<MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
									</MenubarRadioGroup>
									<MenubarSeparator />
									<MenubarItem inset>Edit...</MenubarItem>
									<MenubarSeparator />
									<MenubarItem inset>Add Profile...</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
						</Menubar>
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
									data={menubarComponentCode}
									defaultValue={menubarComponentCode[0].filename}
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
				<PropsTable
					data={[
						{
							component: "<Menubar />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the menubar.",
								},
							],
						},
						{
							component: "<MenubarMenu />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard Radix Menubar.Menu props.",
									description: "Menu container component.",
								},
							],
						},
						{
							component: "<MenubarTrigger />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the trigger.",
								},
							],
						},
						{
							component: "<MenubarContent />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the content.",
								},
								{
									name: "align",
									type: `"start" | "center" | "end" (default: "start")`,
									description: "The preferred alignment against the trigger.",
								},
								{
									name: "alignOffset",
									type: "number (default: -4)",
									description: "An offset in pixels from the 'align' option.",
								},
								{
									name: "sideOffset",
									type: "number (default: 8)",
									description: "The distance in pixels from the trigger.",
								},
							],
						},
						{
							component: "<MenubarItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the item.",
								},
								{
									name: "inset",
									type: "boolean",
									description: "When true, adds left padding to accommodate an icon.",
								},
								{
									name: "variant",
									type: `"default" | "destructive" (default: "default")`,
									description: "Variant style for the item.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents the item from being selected.",
								},
							],
						},
						{
							component: "<MenubarCheckboxItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the checkbox item.",
								},
								{
									name: "checked",
									type: "boolean",
									description: "The checked state of the checkbox.",
								},
								{
									name: "children",
									type: "React.ReactNode",
									description: "The content of the checkbox item.",
								},
							],
						},
						{
							component: "<MenubarRadioItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the radio item.",
								},
								{
									name: "children",
									type: "React.ReactNode",
									description: "The content of the radio item.",
								},
							],
						},
						{
							component: "<MenubarLabel />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the label.",
								},
								{
									name: "inset",
									type: "boolean",
									description: "When true, adds left padding to accommodate an icon.",
								},
							],
						},
						{
							component: "<MenubarSeparator />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the separator.",
								},
							],
						},
						{
							component: "<MenubarShortcut />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the shortcut.",
								},
							],
						},
						{
							component: "<MenubarSub />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard Radix Menubar.Sub props.",
									description: "Submenu container component.",
								},
							],
						},
						{
							component: "<MenubarSubTrigger />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the sub trigger.",
								},
								{
									name: "inset",
									type: "boolean",
									description: "When true, adds left padding to accommodate an icon.",
								},
								{
									name: "children",
									type: "React.ReactNode",
									description: "The content of the sub trigger.",
								},
							],
						},
						{
							component: "<MenubarSubContent />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the sub content.",
								},
								{
									name: "sideOffset",
									type: "number (default: 2)",
									description: "The distance in pixels from the trigger.",
								},
								{
									name: "align",
									type: `"start" | "center" | "end" (default: "start")`,
									description: "The preferred alignment against the trigger.",
								},
								{
									name: "alignOffset",
									type: "number (default: -4)",
									description: "An offset in pixels from the 'align' option.",
								},
							],
						},
						{
							component: "<MenubarGroup />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard Radix Menubar.Group props.",
									description: "Group container for menu items.",
								},
							],
						},
						{
							component: "<MenubarRadioGroup />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard Radix Menubar.RadioGroup props.",
									description: "Radio group container for radio items.",
								},
							],
						},
						{
							component: "<MenubarPortal />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard Radix Menubar.Portal props.",
									description: "Portal component for rendering content outside the DOM hierarchy.",
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
