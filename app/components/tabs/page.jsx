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
import { Button } from "@/registry/optics/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/optics/card";
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
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";
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

import componentCode from "@/registry/optics/tabs.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "tabs.jsx",
		code: `import { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent } from "@/components/optics/tabs";
import { Card } from "@/components/optics/card";

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
} from "@/registry/optics/helpers/primitives/radix/tabs";
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

import tabsPrimitiveCode from "@/registry/optics/helpers/primitives/radix/tabs.jsx.txt";
import highlightCode from "@/registry/optics/helpers/primitives/effects/highlight.jsx.txt";
import autoHeightCode from "@/registry/optics/helpers/primitives/effects/auto-height.jsx.txt";
import slotCode from "@/registry/optics/helpers/primitives/animate/slot.jsx.txt";
import utilsCode from "@/registry/optics/lib/utils.js.txt";
import getStrictContextCode from "@/registry/optics/lib/get-strict-context.jsx.txt";

const componentFiles = [
	{
		path: "@/components/optics/tabs.jsx",
		code: componentCode,
	},
	{
		path: "@/components/optics/helpers/primitives/radix/tabs.jsx",
		code: tabsPrimitiveCode,
	},
	{
		path: "@/components/optics/helpers/primitives/effects/highlight.jsx",
		code: highlightCode,
	},
	{
		path: "@/components/optics/helpers/primitives/effects/auto-height.jsx",
		code: autoHeightCode,
	},
	{
		path: "@/components/optics/helpers/primitives/animate/slot.jsx",
		code: slotCode,
	},
	{
		path: "@/components/optics/lib/utils.js",
		code: utilsCode,
	},
	{
		path: "@/components/optics/lib/get-strict-context.jsx",
		code: getStrictContextCode,
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

export default function Page() {
	const {
		mounted,
		value,
		setValue,
		installationTab,
		handleTabChange,
		activeCommand,
		activeDepsCommand,
	} = useCookiePreferences("tabs", installDeps);

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

			<InstallationGuide
				value={value}
				setValue={setValue}
				activeCommand={activeCommand}
				activeDepsCommand={activeDepsCommand}
				componentName="tabs"
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
							component: "<Tabs />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the tabs container.",
								},
								{
									name: "value",
									type: "string",
									description:
										"The controlled value of the active tab. Use with onValueChange.",
								},
								{
									name: "defaultValue",
									type: "string",
									description:
										"The uncontrolled default value of the active tab.",
								},
								{
									name: "onValueChange",
									type: "(value: string) => void",
									description: "Callback fired when the active tab changes.",
								},
								{
									name: "orientation",
									type: `"horizontal" | "vertical"`,
									description:
										"The orientation of the tabs. Defaults to 'horizontal'.",
								},
								{
									name: "dir",
									type: `"ltr" | "rtl"`,
									description: "The reading direction of the tabs.",
								},
							],
						},
						{
							component: "<TabsList />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the tabs list.",
								},
								{
									name: "variant",
									type: `"default" | "outline" | "underline"`,
									description:
										"The visual style variant of the tabs list. Defaults to 'default'.",
								},
							],
						},
						{
							component: "<TabsTrigger />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the tab trigger.",
								},
								{
									name: "value",
									type: "string (required)",
									description:
										"The value of the tab. Must be unique within the tabs container.",
								},
								{
									name: "disabled",
									type: "boolean",
									description:
										"When true, prevents user interaction with the tab trigger.",
								},
							],
						},
						{
							component: "<TabsContent />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the tab content.",
								},
								{
									name: "value",
									type: "string (required)",
									description:
										"The value of the tab content. Must match a TabsTrigger value.",
								},
							],
						},
						{
							component: "<TabsContents />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the tabs contents container.",
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
