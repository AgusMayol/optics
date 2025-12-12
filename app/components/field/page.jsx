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
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/registry/optics/field";
import { Input } from "@/registry/optics/input";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/field.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "field.jsx",
		code: `import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/optics/field";
import { Input } from "@/components/optics/input";

<FieldGroup>
	<FieldSet>
		<FieldLegend>Payment Method</FieldLegend>
		<FieldDescription>
			All transactions are secure and encrypted
		</FieldDescription>
		<FieldGroup>
			<Field>
				<FieldLabel htmlFor="card-name">Name on Card</FieldLabel>
				<Input id="card-name" placeholder="John Doe" required />
			</Field>
			<Field>
				<FieldLabel htmlFor="card-number">Card Number</FieldLabel>
				<Input id="card-number" placeholder="1234 5678 9012 3456" required />
				<FieldDescription>
					Enter your 16-digit card number
				</FieldDescription>
			</Field>
		</FieldGroup>
	</FieldSet>
</FieldGroup>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/field.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("field", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Field
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/field"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Composable form field components for building accessible forms.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center justify-center gap-4 min-h-[300px]">
						<div className="w-full max-w-md">
							<FieldGroup>
								<FieldSet>
									<FieldLegend>Payment Method</FieldLegend>
									<FieldDescription>
										All transactions are secure and encrypted
									</FieldDescription>
									<FieldGroup>
										<Field>
											<FieldLabel htmlFor="demo-card-name">
												Name on Card
											</FieldLabel>
											<Input
												id="demo-card-name"
												placeholder="John Doe"
												variant="raised"
												required
											/>
										</Field>
										<Field>
											<FieldLabel htmlFor="demo-card-number">
												Card Number
											</FieldLabel>
											<Input
												id="demo-card-number"
												placeholder="1234 5678 9012 3456"
												variant="raised"
												required
											/>
											<FieldDescription>
												Enter your 16-digit card number
											</FieldDescription>
										</Field>
									</FieldGroup>
								</FieldSet>
							</FieldGroup>
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
				componentName="field"
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
							component: "<Field />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the field.",
								},
								{
									name: "orientation",
									type: `"vertical" | "horizontal" | "responsive" (default: "vertical")`,
									description: "Layout orientation for the field.",
								},
							],
						},
						{
							component: "<FieldContent />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the content container.",
								},
							],
						},
						{
							component: "<FieldLabel />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the label.",
								},
								{
									name: "htmlFor",
									type: "string",
									description:
										"The id of the form element this label is associated with.",
								},
							],
						},
						{
							component: "<FieldTitle />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the title.",
								},
							],
						},
						{
							component: "<FieldDescription />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the description.",
								},
							],
						},
						{
							component: "<FieldError />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the error message.",
								},
								{
									name: "errors",
									type: "Array<{ message?: string }>",
									description: "Array of error objects to display.",
								},
								{
									name: "children",
									type: "React.ReactNode",
									description:
										"Custom error message content. If provided, errors prop is ignored.",
								},
							],
						},
						{
							component: "<FieldGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the group.",
								},
							],
						},
						{
							component: "<FieldSet />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the fieldset.",
								},
							],
						},
						{
							component: "<FieldLegend />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the legend.",
								},
								{
									name: "variant",
									type: `"legend" | "label" (default: "legend")`,
									description: "Visual variant of the legend.",
								},
							],
						},
						{
							component: "<FieldSeparator />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the separator.",
								},
								{
									name: "children",
									type: "React.ReactNode",
									description:
										"Optional content to display in the center of the separator.",
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
