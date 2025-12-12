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
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/optics/select";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/select.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "select.jsx",
		code: `import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/optics/select";

<Select>
	<SelectTrigger>
		<SelectValue placeholder="Select a fruit" />
	</SelectTrigger>
	<SelectContent>
		<SelectGroup>
			<SelectLabel>Fruits</SelectLabel>
			<SelectItem value="apple">Apple</SelectItem>
			<SelectItem value="banana">Banana</SelectItem>
			<SelectItem value="blueberry">Blueberry</SelectItem>
			<SelectItem value="grapes">Grapes</SelectItem>
			<SelectItem value="pineapple">Pineapple</SelectItem>
		</SelectGroup>
	</SelectContent>
</Select>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/select.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-select lucide-react",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-select lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-select lucide-react",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-select lucide-react",
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("select", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Select
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/select"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Displays a list of options for the user to pick from—triggered by a
					button.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<Select>
							<SelectTrigger variant="raised">
								<SelectValue placeholder="Select a fruit" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Fruits</SelectLabel>
									<SelectItem value="apple">Apple</SelectItem>
									<SelectItem value="banana">Banana</SelectItem>
									<SelectItem value="blueberry">Blueberry</SelectItem>
									<SelectItem value="grapes">Grapes</SelectItem>
									<SelectItem value="pineapple">Pineapple</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
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
				componentName="select"
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
							component: "<Select />",
							props: [
								{
									name: "value",
									type: "string",
									description:
										"The controlled value of the select. Use with onValueChange.",
								},
								{
									name: "defaultValue",
									type: "string",
									description: "The uncontrolled default value of the select.",
								},
								{
									name: "onValueChange",
									type: "(value: string) => void",
									description: "Callback fired when the select value changes.",
								},
								{
									name: "open",
									type: "boolean",
									description:
										"The controlled open state of the select. Use with onOpenChange.",
								},
								{
									name: "defaultOpen",
									type: "boolean",
									description:
										"The uncontrolled default open state of the select.",
								},
								{
									name: "onOpenChange",
									type: "(open: boolean) => void",
									description: "Callback fired when the open state changes.",
								},
								{
									name: "disabled",
									type: "boolean",
									description:
										"When true, prevents user interaction with the select.",
								},
								{
									name: "name",
									type: "string",
									description:
										"The name of the select. Submitted with its owning form as part of a name/value pair.",
								},
								{
									name: "required",
									type: "boolean",
									description:
										"When true, indicates that the user must select a value before the owning form can be submitted.",
								},
							],
						},
						{
							component: "<SelectTrigger />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the trigger.",
								},
								{
									name: "size",
									type: `"default" | "sm" (default: "default")`,
									description: "The size of the trigger.",
								},
								{
									name: "animation",
									type: `"colors" | "all" | "none" | "only-scale" (default: "colors")`,
									description: "Animation style for interactions.",
								},
								{
									name: "variant",
									type: `"raised" | "ghost" | "outline"`,
									description:
										"Variant style that inherits button variant styles.",
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
							component: "<SelectValue />",
							props: [
								{
									name: "placeholder",
									type: "string",
									description:
										"The placeholder text displayed when no value is selected.",
								},
							],
						},
						{
							component: "<SelectContent />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the content.",
								},
								{
									name: "position",
									type: `"popper" | "item-aligned" (default: "popper")`,
									description: "The positioning strategy for the content.",
								},
								{
									name: "side",
									type: `"top" | "right" | "bottom" | "left"`,
									description:
										"The preferred side of the trigger to render against.",
								},
								{
									name: "sideOffset",
									type: "number",
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
							],
						},
						{
							component: "<SelectItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the item.",
								},
								{
									name: "value",
									type: "string (required)",
									description: "The value of the select item.",
								},
								{
									name: "disabled",
									type: "boolean",
									description:
										"When true, prevents the item from being selected.",
								},
							],
						},
						{
							component: "<SelectLabel />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the label.",
								},
							],
						},
						{
							component: "<SelectGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the group.",
								},
							],
						},
						{
							component: "<SelectSeparator />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the separator.",
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
