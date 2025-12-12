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
import { Separator } from "@/registry/optics/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/registry/optics/tooltip";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/tooltip.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "tooltip.jsx",
		code: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/optics/tooltip";
import { Button } from "@/components/optics/button";

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger asChild>
			<Button variant="outline">Hover me</Button>
		</TooltipTrigger>
		<TooltipContent>
			<p>Add to library</p>
		</TooltipContent>
	</Tooltip>
</TooltipProvider>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/tooltip.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-tooltip",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-tooltip",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-tooltip",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-tooltip",
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("tooltip", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Tooltip
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/tooltip"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A popup that displays information related to an element when the
					element receives keyboard focus or the mouse hovers over it.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="raised">Hover me</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Add to library</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
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
				componentName="tooltip"
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
							component: "<TooltipProvider />",
							props: [
								{
									name: "delayDuration",
									type: "number (default: 400)",
									description: "The delay in milliseconds before showing the tooltip for the first time.",
								},
								{
									name: "skipDelayDuration",
									type: "number (default: 0)",
									description: "The delay in milliseconds before showing subsequent tooltips when one is already open.",
								},
								{
									name: "sharedMode",
									type: "boolean (default: false)",
									description: "When true, enables shared mode where multiple triggers can share a single tooltip content.",
								},
							],
						},
						{
							component: "<Tooltip />",
							props: [
								{
									name: "open",
									type: "boolean",
									description: "The controlled open state of the tooltip. Use with onOpenChange.",
								},
								{
									name: "defaultOpen",
									type: "boolean",
									description: "The uncontrolled default open state of the tooltip.",
								},
								{
									name: "onOpenChange",
									type: "(open: boolean) => void",
									description: "Callback fired when the open state changes.",
								},
								{
									name: "disableHoverableContent",
									type: "boolean",
									description: "When true, prevents the tooltip from staying open when hovering over the content.",
								},
							],
						},
						{
							component: "<TooltipTrigger />",
							props: [
								{
									name: "asChild",
									type: "boolean",
									description: "When true, the trigger will render as its child element instead of a button.",
								},
								{
									name: "disableHoverableContent",
									type: "boolean",
									description: "When true, prevents the tooltip from staying open when hovering over the content.",
								},
							],
						},
						{
							component: "<TooltipContent />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the content.",
								},
								{
									name: "side",
									type: `"top" | "right" | "bottom" | "left"`,
									description: "The preferred side of the trigger to render against.",
								},
								{
									name: "sideOffset",
									type: "number (default: 0)",
									description: "The distance in pixels from the trigger.",
								},
								{
									name: "align",
									type: `"start" | "center" | "end"`,
									description: "The preferred alignment against the trigger.",
								},
								{
									name: "alignOffset",
									type: "number",
									description: "An offset in pixels from the 'align' option.",
								},
								{
									name: "variant",
									type: `"raised" | "ghost" | "outline"`,
									description: "Variant style that inherits button variant styles.",
								},
								{
									name: "onEscapeKeyDown",
									type: "(event: KeyboardEvent) => void",
									description: "Callback fired when the Escape key is pressed.",
								},
								{
									name: "onPointerDownOutside",
									type: "(event: PointerEvent) => void",
									description: "Callback fired when a pointer event occurs outside the tooltip.",
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
