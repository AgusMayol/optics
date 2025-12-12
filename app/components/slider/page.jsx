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
import { Button } from "@/registry/optics/button";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";
import { Separator } from "@/registry/optics/separator";
import { Slider } from "@/registry/optics/slider";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import componentCode from "@/registry/optics/slider.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "slider.jsx",
		code: `import { Slider } from "@/components/optics/slider";

<Slider defaultValue={[50]} max={100} step={1} />
<Slider defaultValue={[25, 75]} max={100} step={1} />`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/slider.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-slider",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-slider",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-slider",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-slider",
	},
];

export default function Page() {
	const [sliderValue, setSliderValue] = React.useState([50]);
	const [rangeValue, setRangeValue] = React.useState([25, 75]);

	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("slider", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Slider
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/slider"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					An input where the user selects a value from within a given range.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center gap-8">
						<div className="w-full max-w-md flex flex-col gap-2">
							<Slider
								value={sliderValue}
								onValueChange={setSliderValue}
								max={100}
								step={1}
							/>
							<p className="text-sm text-muted-foreground">
								Value: {sliderValue[0]}
							</p>
						</div>

						<div className="w-full max-w-md flex flex-col gap-2">
							<Slider
								value={rangeValue}
								onValueChange={setRangeValue}
								max={100}
								step={1}
							/>
							<p className="text-sm text-muted-foreground">
								Range: {rangeValue[0]} - {rangeValue[1]}
							</p>
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
				componentName="slider"
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
							component: "<Slider />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the slider.",
								},
								{
									name: "defaultValue",
									type: "number[]",
									description:
										"The default value of the slider (uncontrolled).",
								},
								{
									name: "value",
									type: "number[]",
									description:
										"The controlled value of the slider. Use with onValueChange.",
								},
								{
									name: "onValueChange",
									type: "(value: number[]) => void",
									description: "Callback fired when the slider value changes.",
								},
								{
									name: "min",
									type: "number (default: 0)",
									description: "The minimum value of the slider.",
								},
								{
									name: "max",
									type: "number (default: 100)",
									description: "The maximum value of the slider.",
								},
								{
									name: "step",
									type: "number",
									description: "The stepping interval for the slider.",
								},
								{
									name: "orientation",
									type: `"horizontal" | "vertical"`,
									description:
										"The orientation of the slider. Defaults to 'horizontal'.",
								},
								{
									name: "disabled",
									type: "boolean",
									description:
										"When true, prevents user interaction with the slider.",
								},
								{
									name: "variant",
									type: `"raised" | "ghost" | "outline"`,
									description:
										"Variant style that inherits button variant styles.",
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
