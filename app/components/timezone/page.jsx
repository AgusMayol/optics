"use client";
import { InstallationGuide } from "@/components/installation-guide";
import { ComponentNavigation } from "@/components/component-navigation";
import { PropsTable } from "@/components/props-table";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/optics/accordion";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
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
import { Timezone } from "@/registry/optics/timezone";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/timezone.jsx.txt";
import utilsCode from "@/registry/optics/lib/utils.js.txt";

const code = [
	{
		language: "jsx",
		filename: "timezone.jsx",
		code: `import { Timezone } from "@/components/optics/timezone";
import { Button } from "@/components/optics/button";

<Timezone 
	timestamp={Date.now() - 5 * 60 * 1000} 
	asChild
	side="top"
	sideOffset={4}
>
	<Button variant="raised">Open Timezone</Button>
</Timezone>`,
	},
	,
	{
		path: "lib/utils.js",
		code: utilsCode,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/timezone.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-tooltip ms",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-tooltip ms",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-tooltip ms",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-tooltip ms",
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("timezone", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Timezone
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
					Display the current timezone and relative time from a given timestamp.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<Timezone timestamp={Date.now() - 5 * 60 * 1000} asChild>
							<Button variant="raised">Open Timezone</Button>
						</Timezone>
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
				componentName="timezone"
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
							component: "<Timezone />",
							props: [
								{
									name: "timestamp",
									type: "string | number (required)",
									description: "The timestamp to display.",
								},
								{
									name: "asChild",
									type: "boolean (default: false)",
									description:
										"Render as a child element instead of the default element.",
								},
								{
									name: "children",
									type: "ReactNode (required)",
									description: "The trigger element for the timezone tooltip.",
								},
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes.",
								},
								{
									name: "side",
									type: '"top" | "right" | "bottom" | "left"',
									description: "Side of the trigger where the tooltip appears.",
								},
								{
									name: "sideOffset",
									type: "number (default: 0)",
									description: "Distance in pixels from the trigger.",
								},
								{
									name: "...props",
									type: "TooltipContentProps (align, alignOffset, etc.)",
									description: "Additional tooltip content props.",
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
