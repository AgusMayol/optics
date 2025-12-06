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
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/optics/resizable";
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

import componentCode from "@/registry/optics/resizable.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "resizable.jsx",
		code: `import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from "@/registry/optics/resizable";

<ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
	<ResizablePanel defaultSize={50}>
		<div className="flex h-[200px] items-center justify-center p-6">
			<span className="font-semibold">One</span>
		</div>
	</ResizablePanel>
	<ResizableHandle />
	<ResizablePanel defaultSize={50}>
		<div className="flex h-[200px] items-center justify-center p-6">
			<span className="font-semibold">Two</span>
		</div>
	</ResizablePanel>
</ResizablePanelGroup>`,
	},
];

const resizableComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/resizable.jsx",
		code: `"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

function ResizablePanelGroup({
  className,
  ...props
}) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props} />
  );
}

function ResizablePanel({
  ...props
}) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden",
        className
      )}
      {...props}>
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/resizable.jsx",
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
	} = useCookiePreferences("resizable", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Resizable
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/resizable"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Accessible resizable panel groups and layouts with keyboard support.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<ResizablePanelGroup
							direction="horizontal"
							className="max-w-md rounded-lg border bg-background"
						>
							<ResizablePanel defaultSize={50}>
								<div className="flex h-[200px] items-center justify-center p-6">
									<span className="font-semibold">One</span>
								</div>
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel defaultSize={50}>
								<div className="flex h-[200px] items-center justify-center p-6">
									<span className="font-semibold">Two</span>
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
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
				componentName="resizable"
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
							component: "<ResizablePanelGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the panel group.",
								},
								{
									name: "direction",
									type: `"horizontal" | "vertical"`,
									description: "The direction of the resizable panels.",
								},
								{
									name: "autoSaveId",
									type: "string",
									description:
										"Unique identifier for auto-saving panel sizes to localStorage.",
								},
							],
						},
						{
							component: "<ResizablePanel />",
							props: [
								{
									name: "defaultSize",
									type: "number",
									description: "Default size of the panel (0-100, percentage).",
								},
								{
									name: "minSize",
									type: "number",
									description: "Minimum size of the panel (0-100, percentage).",
								},
								{
									name: "maxSize",
									type: "number",
									description: "Maximum size of the panel (0-100, percentage).",
								},
								{
									name: "collapsible",
									type: "boolean",
									description: "Whether the panel can be collapsed.",
								},
								{
									name: "collapsedSize",
									type: "number",
									description: "Size when collapsed (0-100, percentage).",
								},
							],
						},
						{
							component: "<ResizableHandle />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the handle.",
								},
								{
									name: "withHandle",
									type: "boolean",
									description: "Whether to show a visible handle grip icon.",
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
