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
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/separator.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "separator.jsx",
		code: `import { Separator } from "@/components/optics/separator";

<Separator />
<Separator decoration />
<Separator orientation="vertical" className="h-20" />`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/separator.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-separator",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-separator",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-separator",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-separator",
	},
];

// Helper functions for cookies

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("separator", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Separator
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/separator"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Visually or semantically separates content.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center gap-4">
						<div className="w-full">
							<h4 className="text-sm font-medium">Horizontal</h4>
							<Separator className="my-4" />
							<div className="flex h-5 items-center space-x-4 text-sm">
								<div>Item 1</div>
								<Separator orientation="vertical" />
								<div>Item 2</div>
								<Separator orientation="vertical" />
								<div>Item 3</div>
							</div>
						</div>

						<Separator decoration className="my-4" />

						<div className="w-full">
							<h4 className="text-sm font-medium">With Decorations</h4>
							<Separator decoration className="my-4" />
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
				componentName="separator"
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
							component: "<Separator />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the separator.",
								},
								{
									name: "orientation",
									type: `"horizontal" | "vertical" (default: "horizontal")`,
									description: "The orientation of the separator.",
								},
								{
									name: "decorative",
									type: "boolean (default: true)",
									description: "When true, the separator is purely decorative. Defaults to true.",
								},
								{
									name: "decoration",
									type: "boolean (default: false)",
									description: "Adds decorative elements to both ends of the separator.",
								},
								{
									name: "decorationLeft",
									type: "boolean (default: false)",
									description: "Adds decorative element to the left end (horizontal) or top end (vertical).",
								},
								{
									name: "decorationRight",
									type: "boolean (default: false)",
									description: "Adds decorative element to the right end (horizontal) or bottom end (vertical).",
								},
								{
									name: "decorationTop",
									type: "boolean (default: false)",
									description: "Adds decorative element to the top end (vertical orientation only).",
								},
								{
									name: "decorationBottom",
									type: "boolean (default: false)",
									description: "Adds decorative element to the bottom end (vertical orientation only).",
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
