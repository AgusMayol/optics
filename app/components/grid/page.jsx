"use client";
import * as React from "react";

import componentCode from "@/registry/optics/grid.jsx.txt";
import { InstallationGuide } from "@/components/installation-guide";
import { ComponentNavigation } from "@/components/component-navigation";
import { PropsTable } from "@/components/props-table";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import { GridContainer, GridRow, GridItem } from "@/registry/optics/grid";
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

const code = [
	{
		language: "jsx",
		filename: "grid.jsx",
		code: `import { GridContainer, GridRow, GridItem } from "@/components/optics/grid";

<GridContainer cols={12} rows={3} border>
	<GridRow className="rounded-t-xl">
		<GridItem span={4}>Column 1</GridItem>
		<GridItem span={4}>Column 2</GridItem>
		<GridItem span={4}>Column 3</GridItem>
	</GridRow>
	<GridRow>
		<GridItem span={6}>Half</GridItem>
		<GridItem span={6}>Half</GridItem>
	</GridRow>
	<GridRow>
		<GridItem span={12}>Full Width</GridItem>
	</GridRow>
						</GridContainer>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/grid.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("grid", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Grid
					</h1>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A flexible grid system for building complex layouts with rows and
					columns.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center gap-4">
						<GridContainer
							cols={12}
							rows={3}
							border
							className="w-full max-w-2xl"
						>
							<GridRow className="rounded-t-xl">
								<GridItem
									decorationTopLeft
									span={4}
									className="aspect-square"
								></GridItem>
								<GridItem span={4} className="aspect-square"></GridItem>
								<GridItem span={4} className="aspect-square"></GridItem>
							</GridRow>
							<GridRow>
								<GridItem span={4} className="aspect-square"></GridItem>
								<GridItem span={4} className="aspect-square"></GridItem>
								<GridItem span={4} className="aspect-square"></GridItem>
							</GridRow>
							<GridRow>
								<GridItem span={4} className="aspect-square"></GridItem>
								<GridItem span={4} className="aspect-square"></GridItem>
								<GridItem
									decorationBottomRight
									span={4}
									className="aspect-square"
								></GridItem>
							</GridRow>
						</GridContainer>
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
				componentName="grid"
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
							component: "<GridContainer />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the grid container.",
								},
								{
									name: "cols",
									type: "number (default: 12)",
									description: "Number of columns in the grid.",
								},
								{
									name: "rows",
									type: "number (default: 1)",
									description: "Number of rows in the grid.",
								},
								{
									name: "gap",
									type: "number (default: 0)",
									description: "Gap between grid items in pixels.",
								},
								{
									name: "border",
									type: "boolean (default: true)",
									description: "Whether to show borders between grid items.",
								},
							],
						},
						{
							component: "<GridRow />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the grid row.",
								},
								{
									name: "span",
									type: "number (default: 0, uses cols if 0)",
									description: "Number of columns this row spans.",
								},
								{
									name: "gap",
									type: "number (default: 0)",
									description: "Gap between items in this row in pixels.",
								},
								{
									name: "overrideStyles",
									type: "boolean (default: false)",
									description:
										"When true, disables the default grid styles so you can fully control layout via className and style.",
								},
								{
									name: "borderTop",
									type: "boolean (default: true)",
									description: "Whether to show top border.",
								},
								{
									name: "borderBottom",
									type: "boolean (default: true)",
									description: "Whether to show bottom border.",
								},
							],
						},
						{
							component: "<GridItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the grid item.",
								},
								{
									name: "span",
									type: "number (default: 1)",
									description: "Number of columns this item spans.",
								},
								{
									name: "borderLeft",
									type: "boolean (default: true)",
									description: "Whether to show left border.",
								},
								{
									name: "borderRight",
									type: "boolean (default: true)",
									description: "Whether to show right border.",
								},
								{
									name: "borderTop",
									type: "boolean (default: false)",
									description: "Whether to show top border.",
								},
								{
									name: "borderBottom",
									type: "boolean (default: false)",
									description: "Whether to show bottom border.",
								},
								{
									name: "decorationTopLeft",
									type: "boolean (default: false)",
									description: "Whether to show top-left decoration.",
								},
								{
									name: "decorationTopRight",
									type: "boolean (default: false)",
									description: "Whether to show top-right decoration.",
								},
								{
									name: "decorationBottomLeft",
									type: "boolean (default: false)",
									description: "Whether to show bottom-left decoration.",
								},
								{
									name: "decorationBottomRight",
									type: "boolean (default: false)",
									description: "Whether to show bottom-right decoration.",
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
