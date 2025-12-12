"use client";
import * as React from "react";

import componentCode from "@/registry/optics/calendar.jsx.txt";
import { InstallationGuide } from "@/components/installation-guide";
import { ComponentNavigation } from "@/components/component-navigation";
import { PropsTable } from "@/components/props-table";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import { Calendar } from "@/registry/optics/calendar";
import { Button } from "@/registry/optics/button";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/optics/accordion";
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

const code = [
	{
		language: "jsx",
		filename: "calendar.jsx",
		code: `import { Calendar } from "@/components/optics/calendar";

<Calendar
	mode="single"
	selected={date}
	onSelect={setDate}
	className="rounded-md border"
/>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/calendar.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const [date, setDate] = React.useState();
	const { value, setValue, installationTab, handleTabChange } =
		useCookiePreferences("calendar", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Calendar
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/calendar"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A date field component that allows users to enter and edit date.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							className="rounded-md border !bg-background"
						/>
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
				componentName="calendar"
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
							component: "<Calendar />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the calendar.",
								},
								{
									name: "classNames",
									type: "object",
									description:
										"DayPicker classNames object to customize individual calendar elements.",
								},
								{
									name: "showOutsideDays",
									type: "boolean (default: true)",
									description:
										"When true, displays days from the previous and next months. Defaults to true.",
								},
								{
									name: "captionLayout",
									type: `"label" | "dropdown" | "dropdown-months" | "dropdown-years"`,
									description:
										"Layout style for the month/year caption. Defaults to 'label'.",
								},
								{
									name: "buttonVariant",
									type: `"default" | "outline" | "ghost" | "destructive" | "secondary" | "info" | "success" | "warning" | "muted" | "raised" | "link" (default: "ghost")`,
									description:
										"Variant style for navigation buttons. Defaults to 'ghost'.",
								},
								{
									name: "formatters",
									type: "object",
									description:
										"DayPicker formatters object to customize date formatting.",
								},
								{
									name: "components",
									type: "object",
									description:
										"DayPicker components object to customize calendar components.",
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
