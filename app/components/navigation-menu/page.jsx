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
import { useIsMobile } from "@/hooks/use-mobile";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/registry/optics/navigation-menu";
import { Separator } from "@/registry/optics/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import {
	ArrowUpRight,
	CircleCheckIcon,
	CircleHelpIcon,
	CircleIcon,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import componentCode from "@/registry/optics/navigation-menu.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "navigation-menu.jsx",
		code: `import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/optics/navigation-menu";

<NavigationMenu>
	<NavigationMenuList>
		<NavigationMenuItem>
			<NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid gap-3 p-4 w-[400px]">
					<li>
						<NavigationMenuLink asChild>
							<a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
								<div className="text-sm font-medium leading-none">Introduction</div>
								<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
									Re-usable components built using Radix UI and Tailwind CSS.
								</p>
							</a>
						</NavigationMenuLink>
					</li>
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	</NavigationMenuList>
</NavigationMenu>`,
	},
];

const navigationMenuComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/navigation-menu.jsx",
		code: `import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}>
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
      {...props} />
  );
}

function NavigationMenuItem({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props} />
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
}`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/navigation-menu.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const isMobile = useIsMobile();
	const components = [
		{
			title: "Alert Dialog",
			href: "/docs/primitives/alert-dialog",
			description:
				"A modal dialog that interrupts the user with important content and expects a response.",
		},
		{
			title: "Hover Card",
			href: "/docs/primitives/hover-card",
			description:
				"For sighted users to preview content available behind a link.",
		},
		{
			title: "Progress",
			href: "/docs/primitives/progress",
			description:
				"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
		},
		{
			title: "Scroll-area",
			href: "/docs/primitives/scroll-area",
			description: "Visually or semantically separates content.",
		},
		{
			title: "Tabs",
			href: "/docs/primitives/tabs",
			description:
				"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
		},
		{
			title: "Tooltip",
			href: "/docs/primitives/tooltip",
			description:
				"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
		},
	];
	const {
		mounted,
		value,
		setValue,
		installationTab,
		handleTabChange,
		activeCommand,
		activeDepsCommand,
	} = useCookiePreferences("navigation-menu", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Navigation Menu
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/navigation-menu"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A collection of links for navigating websites.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<NavigationMenu viewport={isMobile}>
							<NavigationMenuList className="flex-wrap">
								<NavigationMenuItem>
									<NavigationMenuTrigger>Home</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
											<li className="row-span-3">
												<NavigationMenuLink asChild>
													<a
														className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
														href="/"
													>
														<div className="mb-2 text-lg font-medium sm:mt-4">
															shadcn/ui
														</div>
														<p className="text-muted-foreground text-sm leading-tight">
															Beautifully designed components built with
															Tailwind CSS.
														</p>
													</a>
												</NavigationMenuLink>
											</li>
											<ListItem href="/docs" title="Introduction">
												Re-usable components built using Radix UI and Tailwind
												CSS.
											</ListItem>
											<ListItem href="/docs/installation" title="Installation">
												How to install dependencies and structure your app.
											</ListItem>
											<ListItem
												href="/docs/primitives/typography"
												title="Typography"
											>
												Styles for headings, paragraphs, lists...etc
											</ListItem>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuTrigger>Components</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
											{components.map((component) => (
												<ListItem
													key={component.title}
													title={component.title}
													href={component.href}
												>
													{component.description}
												</ListItem>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}
									>
										<Link href="/docs">Docs</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem className="hidden md:block">
									<NavigationMenuTrigger>List</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[300px] gap-4">
											<li>
												<NavigationMenuLink asChild>
													<Link href="#">
														<div className="font-medium">Components</div>
														<div className="text-muted-foreground">
															Browse all components in the library.
														</div>
													</Link>
												</NavigationMenuLink>
												<NavigationMenuLink asChild>
													<Link href="#">
														<div className="font-medium">Documentation</div>
														<div className="text-muted-foreground">
															Learn how to use the library.
														</div>
													</Link>
												</NavigationMenuLink>
												<NavigationMenuLink asChild>
													<Link href="#">
														<div className="font-medium">Blog</div>
														<div className="text-muted-foreground">
															Read our latest blog posts.
														</div>
													</Link>
												</NavigationMenuLink>
											</li>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem className="hidden md:block">
									<NavigationMenuTrigger>Simple</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[200px] gap-4">
											<li>
												<NavigationMenuLink asChild>
													<Link href="#">Components</Link>
												</NavigationMenuLink>
												<NavigationMenuLink asChild>
													<Link href="#">Documentation</Link>
												</NavigationMenuLink>
												<NavigationMenuLink asChild>
													<Link href="#">Blocks</Link>
												</NavigationMenuLink>
											</li>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem className="hidden md:block">
									<NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[200px] gap-4">
											<li>
												<NavigationMenuLink asChild>
													<Link
														href="#"
														className="flex-row items-center gap-2"
													>
														<CircleHelpIcon />
														Backlog
													</Link>
												</NavigationMenuLink>
												<NavigationMenuLink asChild>
													<Link
														href="#"
														className="flex-row items-center gap-2"
													>
														<CircleIcon />
														To Do
													</Link>
												</NavigationMenuLink>
												<NavigationMenuLink asChild>
													<Link
														href="#"
														className="flex-row items-center gap-2"
													>
														<CircleCheckIcon />
														Done
													</Link>
												</NavigationMenuLink>
											</li>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
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

			<InstallationGuide
				value={value}
				setValue={setValue}
				activeCommand={activeCommand}
				activeDepsCommand={activeDepsCommand}
				componentName="navigation-menu"
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
							component: "<NavigationMenu />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the navigation menu.",
								},
								{
									name: "viewport",
									type: "boolean (default: true)",
									description: "Whether to show the viewport component.",
								},
								{
									name: "children",
									type: "React.ReactNode",
									description: "The navigation menu content.",
								},
							],
						},
						{
							component: "<NavigationMenuList />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the list.",
								},
							],
						},
						{
							component: "<NavigationMenuItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the item.",
								},
							],
						},
						{
							component: "<NavigationMenuTrigger />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the trigger.",
								},
								{
									name: "children",
									type: "React.ReactNode",
									description: "The trigger content.",
								},
							],
						},
						{
							component: "<NavigationMenuContent />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the content.",
								},
							],
						},
						{
							component: "<NavigationMenuLink />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the link.",
								},
							],
						},
						{
							component: "<NavigationMenuViewport />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the viewport.",
								},
							],
						},
						{
							component: "<NavigationMenuIndicator />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the indicator.",
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

function ListItem({ title, children, href, ...props }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div className="text-sm leading-none font-medium">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}
