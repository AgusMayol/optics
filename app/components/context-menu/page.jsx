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
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/registry/optics/context-menu";
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
		filename: "context-menu.jsx",
		code: `import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/registry/optics/context-menu";

<ContextMenu>
    <ContextMenuTrigger>
		<div className="bg-muted rounded-lg p-8 border border-dashed flex items-center justify-center">
			<p className="text-muted-foreground text-sm select-none">
				Right click here to see the context menu
			</p>
		</div>
    </ContextMenuTrigger>

    <ContextMenuContent className="w-52">
        <ContextMenuItem inset>
        	Back
        	<ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
        	Forward
        	<ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
    		Reload
        	<ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
    		<ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
        	<ContextMenuSubContent className="w-44">
            	<ContextMenuItem>Save Page...</ContextMenuItem>
            	<ContextMenuItem>Create Shortcut...</ContextMenuItem>
            	<ContextMenuItem>Name Window...</ContextMenuItem>
            	<ContextMenuSeparator />
            	<ContextMenuItem>Developer Tools</ContextMenuItem>
            	<ContextMenuSeparator />
            	<ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        	</ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
        	Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
        	<ContextMenuLabel inset>People</ContextMenuLabel>
        	<ContextMenuRadioItem value="pedro">
        		Pedro Duarte
    		</ContextMenuRadioItem>
        	<ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
    </ContextMenuContent>
</ContextMenu>`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/context-menu",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/context-menu",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/context-menu",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/context-menu",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-context-menu",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-context-menu",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-context-menu",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-context-menu",
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
						Context Menu
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/context-menu"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Displays a menu to the user triggered by right-clicking or
					long-pressing.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<ContextMenu>
							<ContextMenuTrigger>
								<div className="bg-muted rounded-lg p-8 border border-dashed flex items-center justify-center">
									<p className="text-muted-foreground text-sm select-none">
										Right click here to see the context menu
									</p>
								</div>
							</ContextMenuTrigger>
							<ContextMenuContent className="w-52">
								<ContextMenuItem inset>
									Back
									<ContextMenuShortcut>⌘[</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuItem inset disabled>
									Forward
									<ContextMenuShortcut>⌘]</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuItem inset>
									Reload
									<ContextMenuShortcut>⌘R</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuSub>
									<ContextMenuSubTrigger inset>
										More Tools
									</ContextMenuSubTrigger>
									<ContextMenuSubContent className="w-44">
										<ContextMenuItem>Save Page...</ContextMenuItem>
										<ContextMenuItem>Create Shortcut...</ContextMenuItem>
										<ContextMenuItem>Name Window...</ContextMenuItem>
										<ContextMenuSeparator />
										<ContextMenuItem>Developer Tools</ContextMenuItem>
										<ContextMenuSeparator />
										<ContextMenuItem variant="destructive">
											Delete
										</ContextMenuItem>
									</ContextMenuSubContent>
								</ContextMenuSub>
								<ContextMenuSeparator />
								<ContextMenuCheckboxItem checked>
									Show Bookmarks
								</ContextMenuCheckboxItem>
								<ContextMenuCheckboxItem>
									Show Full URLs
								</ContextMenuCheckboxItem>
								<ContextMenuSeparator />
								<ContextMenuRadioGroup value="pedro">
									<ContextMenuLabel inset>People</ContextMenuLabel>
									<ContextMenuRadioItem value="pedro">
										Pedro Duarte
									</ContextMenuRadioItem>
									<ContextMenuRadioItem value="colm">
										Colm Tuite
									</ContextMenuRadioItem>
								</ContextMenuRadioGroup>
							</ContextMenuContent>
						</ContextMenu>
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
									Copy and paste the component code from the source:
								</p>

								<Button variant="link" size="sm" asChild className="w-fit">
									<Link
										href="https://github.com/optics/optics/blob/main/registry/optics/context-menu.jsx"
										target="_blank"
										rel="noopener noreferrer"
									>
										View full component code on GitHub
										<ArrowUpRight className="-ml-1" />
									</Link>
								</Button>
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

				<p className="text-sm text-muted-foreground">
					This component includes multiple sub-components for building context
					menus.
				</p>

				<PropsTable
					data={[
						{
							component: "<ContextMenu />",
							props: [
								{
									name: "open",
									type: "boolean",
									description: "The controlled open state of the context menu. Use with onOpenChange.",
								},
								{
									name: "defaultOpen",
									type: "boolean",
									description: "The uncontrolled default open state of the context menu.",
								},
								{
									name: "onOpenChange",
									type: "(open: boolean) => void",
									description: "Callback fired when the open state changes.",
								},
								{
									name: "modal",
									type: "boolean (default: true)",
									description: "When true, interaction with outside elements is disabled. Defaults to true.",
								},
							],
						},
						{
							component: "<ContextMenuTrigger />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard Radix ContextMenu.Trigger props.",
									description: "Element that the user interacts with to open the menu.",
								},
							],
						},
						{
							component: "<ContextMenuContent />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the content.",
								},
							],
						},
						{
							component: "<ContextMenuItem />",
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
							component: "<ContextMenuCheckboxItem />",
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
							component: "<ContextMenuRadioItem />",
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
							component: "<ContextMenuRadioGroup />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard Radix ContextMenu.RadioGroup props.",
									description: "Group of radio items where a single value can be selected.",
								},
							],
						},
						{
							component: "<ContextMenuLabel />",
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
							component: "<ContextMenuSeparator />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the separator.",
								},
							],
						},
						{
							component: "<ContextMenuShortcut />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the shortcut.",
								},
							],
						},
						{
							component: "<ContextMenuGroup />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard Radix ContextMenu.Group props.",
									description: "Group container for menu items.",
								},
							],
						},
						{
							component: "<ContextMenuPortal />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard Radix ContextMenu.Portal props.",
									description: "Portal component for rendering content outside the DOM hierarchy.",
								},
							],
						},
						{
							component: "<ContextMenuSub />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard Radix ContextMenu.Sub props.",
									description: "Submenu container component.",
								},
							],
						},
						{
							component: "<ContextMenuSubTrigger />",
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
							component: "<ContextMenuSubContent />",
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
					]}
				/>
			</div>

			<ComponentNavigation />
		</main>
	);
}
