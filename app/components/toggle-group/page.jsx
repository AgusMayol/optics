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
import { ToggleGroup, ToggleGroupItem } from "@/registry/optics/toggle-group";
import { ArrowUpRight, Bold, Italic, Underline } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/toggle-group.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "toggle-group.jsx",
		code: `import { ToggleGroup, ToggleGroupItem } from "@/components/optics/toggle-group";

<ToggleGroup type="multiple">
	<ToggleGroupItem value="bold" aria-label="Toggle bold">
		<Bold className="h-4 w-4" />
	</ToggleGroupItem>
	<ToggleGroupItem value="italic" aria-label="Toggle italic">
		<Italic className="h-4 w-4" />
	</ToggleGroupItem>
	<ToggleGroupItem value="underline" aria-label="Toggle underline">
		<Underline className="h-4 w-4" />
	</ToggleGroupItem>
</ToggleGroup>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/toggle-group.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("toggle-group", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Toggle Group
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/toggle-group"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A set of two-state buttons that can be toggled on or off.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<ToggleGroup type="multiple">
							<ToggleGroupItem value="bold" aria-label="Toggle bold">
								<Bold className="h-4 w-4" />
							</ToggleGroupItem>
							<ToggleGroupItem value="italic" aria-label="Toggle italic">
								<Italic className="h-4 w-4" />
							</ToggleGroupItem>
							<ToggleGroupItem value="underline" aria-label="Toggle underline">
								<Underline className="h-4 w-4" />
							</ToggleGroupItem>
						</ToggleGroup>
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
				componentName="toggle-group"
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
							component: "<ToggleGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the toggle group.",
								},
								{
									name: "type",
									type: `"single" | "multiple"`,
									description: "Determines whether one or multiple items can be pressed at the same time.",
								},
								{
									name: "value",
									type: "string | string[]",
									description: "The controlled value of the toggle group. Use with onValueChange.",
								},
								{
									name: "defaultValue",
									type: "string | string[]",
									description: "The uncontrolled default value of the toggle group.",
								},
								{
									name: "onValueChange",
									type: "(value: string | string[]) => void",
									description: "Callback fired when the value changes.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents user interaction with the toggle group.",
								},
								{
									name: "variant",
									type: `"default" | "outline"`,
									description: "Variant style for the toggle group items.",
								},
								{
									name: "size",
									type: `"default" | "sm" | "lg"`,
									description: "Size of the toggle group items.",
								},
								{
									name: "spacing",
									type: "number (default: 0)",
									description: "Spacing in pixels between toggle group items.",
								},
							],
						},
						{
							component: "<ToggleGroupItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the toggle group item.",
								},
								{
									name: "value",
									type: "string (required)",
									description: "The value of the toggle group item.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents the item from being pressed.",
								},
								{
									name: "variant",
									type: `"default" | "outline"`,
									description: "Variant style for the item. Inherits from ToggleGroup if not specified.",
								},
								{
									name: "size",
									type: `"default" | "sm" | "lg"`,
									description: "Size of the item. Inherits from ToggleGroup if not specified.",
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
