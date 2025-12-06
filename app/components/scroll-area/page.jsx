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
import { ScrollArea } from "@/registry/optics/scroll-area";
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

import componentCode from "@/registry/optics/scroll-area.jsx.txt";
import utilsCode from "@/registry/optics/lib/utils.ts.txt";
import useHasPrimaryTouchCode from "@/registry/optics/hooks/use-has-primary-touch.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "scroll-area.jsx",
		code: `import { ScrollArea } from "@/registry/optics/scroll-area";

<ScrollArea className="h-72 w-48 rounded-md border">
	<div className="p-4">
		<h4 className="mb-4 text-sm font-medium">Tags</h4>
		{Array.from({ length: 50 }).map((_, i) => (
			<div key={i} className="text-sm">
				Tag {i + 1}
			</div>
		))}
	</div>
</ScrollArea>`,
	},
];

const scrollAreaComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/scroll-area.jsx",
		code: `"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { useTouchPrimary } from "@/hooks/use-has-primary-touch";

const ScrollArea = React.forwardRef(
	(
		{
			className,
			children,
			scrollHideDelay = 0,
			viewportClassName,
			maskClassName,
			maskHeight = 30,
			...props
		},
		ref,
	) => {
		return (
			<ScrollAreaPrimitive.Root
				ref={ref}
				data-slot="scroll-area"
				scrollHideDelay={scrollHideDelay}
				className={cn("relative overflow-hidden", className)}
				{...props}
			>
				<ScrollAreaPrimitive.Viewport
					data-slot="scroll-area-viewport"
					className={cn("size-full rounded-[inherit]", viewportClassName)}
				>
					{children}
				</ScrollAreaPrimitive.Viewport>
				<ScrollBar />
				<ScrollAreaPrimitive.Corner />
			</ScrollAreaPrimitive.Root>
		);
	},
);

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef(
	({ className, orientation = "vertical", ...props }, ref) => (
		<ScrollAreaPrimitive.ScrollAreaScrollbar
			ref={ref}
			orientation={orientation}
			data-slot="scroll-area-scrollbar"
			className={cn(
				"hover:bg-muted flex touch-none p-px transition-colors",
				orientation === "vertical" && "h-full w-2.5 border-l",
				orientation === "horizontal" && "h-2.5 flex-col border-t",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.ScrollAreaThumb
				className="bg-border relative flex-1 rounded-full"
			/>
		</ScrollAreaPrimitive.ScrollAreaScrollbar>
	),
);

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/scroll-area.jsx",
		code: componentCode,
	},
	{
		path: "@/registry/optics/lib/utils.ts",
		code: utilsCode,
	},
	{
		path: "@/registry/optics/hooks/use-has-primary-touch.jsx",
		code: useHasPrimaryTouchCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-scroll-area",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-scroll-area",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-scroll-area",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-scroll-area",
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
	} = useCookiePreferences("scroll-area", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Scroll Area
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/scroll-area"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Augments native scroll functionality for custom, cross-browser
					styling.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<ScrollArea className="h-72 w-48 rounded-md border bg-background">
							<div className="p-4">
								<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
								{Array.from({ length: 50 }).map((_, i) => (
									<div key={i} className="text-sm py-1">
										Tag {i + 1}
									</div>
								))}
							</div>
						</ScrollArea>
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
				componentName="scroll-area"
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
							component: "<ScrollArea />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the scroll area.",
								},
								{
									name: "scrollHideDelay",
									type: "number (default: 0)",
									description:
										"Delay in milliseconds before hiding the scrollbar.",
								},
								{
									name: "viewportClassName",
									type: "string",
									description: "CSS classes for the viewport element.",
								},
								{
									name: "maskClassName",
									type: "string",
									description: "CSS classes for the fade mask elements.",
								},
								{
									name: "maskHeight",
									type: "number (default: 30)",
									description: "Height of the fade mask in pixels.",
								},
								{
									name: "maskColor",
									type: "string",
									description: "Color for the fade mask effect.",
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
