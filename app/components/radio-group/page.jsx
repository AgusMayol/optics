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
import { Label } from "@/registry/optics/label";
import { RadioGroup, RadioGroupItem } from "@/registry/optics/radio-group";
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

import componentCode from "@/registry/optics/radio-group.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "radio-group.jsx",
		code: `import { RadioGroup, RadioGroupItem } from "@/registry/optics/radio-group";
import { Label } from "@/registry/optics/label";

<RadioGroup defaultValue="comfortable">
	<div className="flex items-center space-x-2">
		<RadioGroupItem value="default" id="r1" />
		<Label htmlFor="r1">Default</Label>
	</div>
	<div className="flex items-center space-x-2">
		<RadioGroupItem value="comfortable" id="r2" />
		<Label htmlFor="r2">Comfortable</Label>
	</div>
	<div className="flex items-center space-x-2">
		<RadioGroupItem value="compact" id="r3" />
		<Label htmlFor="r3">Compact</Label>
	</div>
</RadioGroup>`,
	},
];

const radioGroupComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/radio-group.jsx",
		code: `"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props} />
  );
}

function RadioGroupItem({
  className,
  ...props
}) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center">
        <CircleIcon
          className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem }`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/radio-group.jsx",
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
	} = useCookiePreferences("radio-group", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Radio Group
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/radio-group"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A set of checkable buttons—known as radio buttons—where no more than
					one of the buttons can be checked at a time.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<RadioGroup
							defaultValue="comfortable"
							className="flex flex-col items-start justify-start"
						>
							<div className="flex items-center justify-start gap-2">
								<RadioGroupItem value="default" id="r1" />
								<Label htmlFor="r1">Default</Label>
							</div>
							<div className="flex items-center justify-start gap-2">
								<RadioGroupItem value="comfortable" id="r2" />
								<Label htmlFor="r2">Comfortable</Label>
							</div>
							<div className="flex items-center justify-start gap-2">
								<RadioGroupItem value="compact" id="r3" />
								<Label htmlFor="r3">Compact</Label>
							</div>
						</RadioGroup>
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
				componentName="radio-group"
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
							component: "<RadioGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the radio group.",
								},
								{
									name: "value",
									type: "string",
									description: "The controlled value of the radio group. Use with onValueChange.",
								},
								{
									name: "defaultValue",
									type: "string",
									description: "The uncontrolled default value of the radio group.",
								},
								{
									name: "onValueChange",
									type: "(value: string) => void",
									description: "Callback fired when the radio group value changes.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents user interaction with the radio group.",
								},
								{
									name: "name",
									type: "string",
									description: "The name of the radio group. Submitted with its owning form as part of a name/value pair.",
								},
								{
									name: "required",
									type: "boolean",
									description: "When true, indicates that the user must select a value before the owning form can be submitted.",
								},
								{
									name: "orientation",
									type: `"horizontal" | "vertical"`,
									description: "The orientation of the radio group. Defaults to 'vertical'.",
								},
								{
									name: "dir",
									type: `"ltr" | "rtl"`,
									description: "The reading direction of the radio group.",
								},
							],
						},
						{
							component: "<RadioGroupItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the radio item.",
								},
								{
									name: "value",
									type: "string (required)",
									description: "The value of the radio item. Must be unique within the radio group.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents user interaction with the radio item.",
								},
								{
									name: "required",
									type: "boolean",
									description: "When true, indicates that the user must select this item before the owning form can be submitted.",
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
