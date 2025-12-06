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
import { Badge } from "@/registry/optics/badge";
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
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/registry/optics/input-group";
import { Separator } from "@/registry/optics/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import componentCode from "@/registry/optics/input-group.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "input-group.jsx",
		code: `import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/registry/optics/input-group";
import { Search } from "lucide-react";

<InputGroup>
	<InputGroupInput placeholder="Search..." />
	<InputGroupAddon>
		<Search />
	</InputGroupAddon>
	<InputGroupAddon align="inline-end">
		<InputGroupText>12 results</InputGroupText>
	</InputGroupAddon>
</InputGroup>`,
	},
];

const inputGroupComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/input-group.jsx",
		code: `"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/optics/button";
import { Input } from "@/registry/optics/input";
import { Textarea } from "@/registry/optics/textarea";

function InputGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
        "h-9 min-w-0 has-[>textarea]:h-auto",
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",
        className
      )}
      {...props} />
  );
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3",
        "inline-end": "order-last pr-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      {...props} />
  );
}

function InputGroupText({
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props} />
  );
}

function InputGroupInput({
  className,
  ...props
}) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props} />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
};`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/input-group.jsx",
		code: componentCode,
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
	} = useCookiePreferences("input-group", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Input Group
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/input-group"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Group input elements with addons, icons, and text for enhanced form
					controls.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center justify-center gap-4 min-h-[200px]">
						<div className="w-full max-w-sm">
							<InputGroup variant="raised">
								<InputGroupInput placeholder="Search..." />
								<InputGroupAddon>
									<Search className="size-4" />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<InputGroupText>12 results</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</div>
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
				componentName="input-group"
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
							component: "<InputGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the input group.",
								},
								{
									name: "variant",
									type: "string",
									description:
										"Variant style for the input group (inherits button variant styles).",
								},
							],
						},
						{
							component: "<InputGroupAddon />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the addon.",
								},
								{
									name: "align",
									type: `"inline-start" | "inline-end" | "block-start" | "block-end" (default: "inline-start")`,
									description:
										"The alignment of the addon relative to the input. Defaults to 'inline-start'.",
								},
							],
						},
						{
							component: "<InputGroupButton />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the button.",
								},
								{
									name: "type",
									type: `"button" | "submit" | "reset" (default: "button")`,
									description: "The type of the button. Defaults to 'button'.",
								},
								{
									name: "variant",
									type: `"default" | "outline" | "ghost" | "destructive" | "secondary" | "info" | "success" | "warning" | "muted" | "raised" | "link" (default: "ghost")`,
									description:
										"Variant style for the button. Defaults to 'ghost'.",
								},
								{
									name: "size",
									type: `"xs" | "sm" | "icon-xs" | "icon-sm" (default: "xs")`,
									description: "Size of the button. Defaults to 'xs'.",
								},
							],
						},
						{
							component: "<InputGroupText />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the text element.",
								},
							],
						},
						{
							component: "<InputGroupInput />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the input.",
								},
								{
									name: "type",
									type: "string (standard HTML input types)",
									description:
										"The type of input (text, email, password, etc.).",
								},
								{
									name: "variant",
									type: `"raised" | "ghost" | "outline"`,
									description:
										"Variant style that inherits button variant styles.",
								},
							],
						},
						{
							component: "<InputGroupTextarea />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the textarea.",
								},
								{
									name: "variant",
									type: `"raised" | "ghost" | "outline"`,
									description:
										"Variant style that inherits button variant styles.",
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
