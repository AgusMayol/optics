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
} from "@/registry/optics/multi-select";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/multi-select.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "multi-select.jsx",
		code: `import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/optics/multi-select";

<Select onValuesChange={(values) => console.log(values)}>
	<SelectTrigger variant="raised">
		<SelectValue placeholder="Select status" />
	</SelectTrigger>
	<SelectContent>
		<SelectGroup>
			<SelectLabel>Status</SelectLabel>
			<SelectItem value="ready" color="bg-teal-400">
				Ready
			</SelectItem>
			<SelectItem value="error" color="bg-red-500">
				Error
			</SelectItem>
			<SelectItem value="building" color="bg-amber-400">
				Building
			</SelectItem>
			<SelectItem value="queued" color="bg-gray-200">
				Queued
			</SelectItem>
		</SelectGroup>
	</SelectContent>
</Select>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/multi-select.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-select @radix-ui/react-checkbox lucide-react",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-select @radix-ui/react-checkbox lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-select @radix-ui/react-checkbox lucide-react",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-select @radix-ui/react-checkbox lucide-react",
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("multi-select", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Multi Select
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
					Multi select allows the user to select multiple options from a list.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<Select onValuesChange={(values) => console.log(values)}>
							<SelectTrigger variant="raised">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent className="w-full">
								<SelectGroup>
									<SelectLabel>Status</SelectLabel>
									<SelectItem value="ready" color="bg-teal-400">
										Ready
									</SelectItem>
									<SelectItem value="error" color="bg-red-500">
										Error
									</SelectItem>
									<SelectItem value="building" color="bg-amber-400">
										Building
									</SelectItem>
									<SelectItem value="queued" color="bg-gray-200">
										Queued
									</SelectItem>
									<SelectItem value="provisioning" color="bg-gray-200">
										Provisioning
									</SelectItem>
									<SelectItem value="canceled" color="bg-gray-200">
										Canceled
									</SelectItem>
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
				componentName="multi-select"
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
									name: "onValuesChange",
									type: "(values: Array<{value: string, checked: boolean}>) => void",
									description:
										"Callback function called when selected values change.",
								},
								{
									name: "onOpenChange",
									type: "(open: boolean) => void",
									description:
										"Callback function called when the select opens or closes.",
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
									description: "Size of the trigger button.",
								},
								{
									name: "variant",
									type: `"raised" | "ghost" | "outline"`,
									description: "Variant style for the trigger button.",
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
									description: "Positioning strategy for the content.",
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
									name: "color",
									type: "string (Tailwind color class)",
									description:
										"Tailwind color class for the item's badge when selected.",
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
