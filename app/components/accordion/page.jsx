"use client";
import { ComponentNavigation } from "@/components/component-navigation";
import { InstallationGuide } from "@/components/installation-guide";
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
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import componentCode from "@/registry/optics/accordion.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "accordion.jsx",
		code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/registry/optics/accordion";

<Accordion type="single" collapsible>
	<AccordionItem value="item-1">
		<AccordionTrigger>Is it accessible?</AccordionTrigger>
		<AccordionContent>
			Yes. It adheres to the WAI-ARIA design pattern.
		</AccordionContent>
	</AccordionItem>
	<AccordionItem value="item-2">
		<AccordionTrigger>Is it styled?</AccordionTrigger>
		<AccordionContent>
			Yes. It comes with default styles that matches the other components aesthetic.
		</AccordionContent>
	</AccordionItem>
</Accordion>`,
	},
];

import accordionPrimitiveCode from "@/registry/optics/accordion-primitive.jsx.txt";

// Leer archivos en build time usando readManualFiles
const componentFiles = [
	{
		path: "@/components/optics/accordion.jsx",
		code: componentCode,
	},
	{
		path: "@/components/optics/accordion-primitive.jsx",
		code: accordionPrimitiveCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-accordion lucide-react",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-accordion lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-accordion lucide-react",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-accordion lucide-react",
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
	} = useCookiePreferences("accordion", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Accordion
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/accordion"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A vertically stacked set of interactive headings that each reveal a
					section of content.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center">
						<Accordion type="single" collapsible className="w-full max-w-md">
							<AccordionItem value="item-1">
								<AccordionTrigger>Is it accessible?</AccordionTrigger>
								<AccordionContent>
									Yes. It adheres to the WAI-ARIA design pattern.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>Is it styled?</AccordionTrigger>
								<AccordionContent>
									Yes. It comes with default styles that matches the other
									components aesthetic.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>Is it animated?</AccordionTrigger>
								<AccordionContent>
									Yes. It's animated by default, but you can disable it if you
									prefer.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
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
				componentName="accordion"
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
							component: "<Accordion />",
							props: [
								{
									name: "type",
									type: `"single" | "multiple"`,
									description:
										"Determines whether one or multiple items can be opened at the same time.",
								},
								{
									name: "value",
									type: "string | string[]",
									description:
										"The controlled value of the accordion. Use with onValueChange.",
								},
								{
									name: "defaultValue",
									type: "string | string[]",
									description:
										"The uncontrolled default value of the accordion.",
								},
								{
									name: "onValueChange",
									type: "(value: string | string[]) => void",
									description:
										"Callback fired when the accordion value changes.",
								},
								{
									name: "collapsible",
									type: "boolean",
									description:
										"When type is 'single', allows closing content when clicking trigger for an open item.",
								},
								{
									name: "disabled",
									type: "boolean",
									description:
										"When true, prevents user interaction with the accordion.",
								},
								{
									name: "dir",
									type: `"ltr" | "rtl"`,
									description: "The reading direction of the accordion.",
								},
								{
									name: "orientation",
									type: `"horizontal" | "vertical"`,
									description:
										"The orientation of the accordion. Defaults to 'vertical'.",
								},
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the accordion.",
								},
							],
						},
						{
							component: "<AccordionItem />",
							props: [
								{
									name: "value",
									type: "string (required)",
									description:
										"A unique value for the item. Used to identify which item is open.",
								},
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the accordion item.",
								},
							],
						},
						{
							component: "<AccordionTrigger />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the trigger.",
								},
								{
									name: "showArrow",
									type: "boolean (default: true)",
									description:
										"Whether to show the chevron arrow icon. Defaults to true.",
								},
								{
									name: "disabled",
									type: "boolean",
									description:
										"When true, prevents user interaction with the trigger.",
								},
							],
						},
						{
							component: "<AccordionContent />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the content.",
								},
								{
									name: "keepRendered",
									type: "boolean (default: false)",
									description:
										"When true, the content remains in the DOM even when closed. Defaults to false.",
								},
								{
									name: "transition",
									type: "object",
									description:
										"Animation transition configuration. Defaults to { type: 'spring', stiffness: 150, damping: 22 }.",
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
