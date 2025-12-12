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
import { Label } from "@/registry/optics/label";
import { Separator } from "@/registry/optics/separator";
import { Switch } from "@/registry/optics/switch";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/switch.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "switch.jsx",
		code: `import { Switch } from "@/components/optics/switch";
import { Label } from "@/registry/optics/label";

<div className="flex items-center space-x-2">
	<Switch id="airplane-mode" />
	<Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/switch.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-switch",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-switch",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-switch",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-switch",
	},
];

// Helper functions for cookies

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("switch", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Switch
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/switch"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A control that allows the user to toggle between checked and not
					checked.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<div className="flex items-center space-x-2">
							<Switch id="airplane-mode" variant="raised" />
							<Label htmlFor="airplane-mode">Airplane Mode</Label>
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
				componentName="switch"
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
							component: "<Switch />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the switch.",
								},
								{
									name: "variant",
									type: `"raised" | "ghost" | "outline"`,
									description: "Variant style that inherits button variant styles.",
								},
								{
									name: "checked",
									type: "boolean",
									description: "The controlled checked state of the switch. Use with onCheckedChange.",
								},
								{
									name: "defaultChecked",
									type: "boolean",
									description: "The uncontrolled default checked state of the switch.",
								},
								{
									name: "onCheckedChange",
									type: "(checked: boolean) => void",
									description: "Callback fired when the checked state changes.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents user interaction with the switch.",
								},
								{
									name: "required",
									type: "boolean",
									description: "When true, indicates that the user must toggle the switch before the owning form can be submitted.",
								},
								{
									name: "name",
									type: "string",
									description: "The name of the switch. Submitted with its owning form as part of a name/value pair.",
								},
								{
									name: "value",
									type: "string",
									description: "The value given as data when submitted with a name.",
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
