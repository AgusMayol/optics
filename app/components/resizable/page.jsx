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
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/optics/resizable";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/resizable.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "resizable.jsx",
		code: `import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from "@/components/optics/resizable";

<ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
	<ResizablePanel defaultSize={50}>
		<div className="flex h-[200px] items-center justify-center p-6">
			<span className="font-semibold">One</span>
		</div>
	</ResizablePanel>
	<ResizableHandle />
	<ResizablePanel defaultSize={50}>
		<div className="flex h-[200px] items-center justify-center p-6">
			<span className="font-semibold">Two</span>
		</div>
	</ResizablePanel>
</ResizablePanelGroup>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/resizable.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("resizable", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Resizable
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/resizable"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Accessible resizable panel groups and layouts with keyboard support.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<ResizablePanelGroup
							direction="horizontal"
							className="max-w-md rounded-lg border bg-background"
						>
							<ResizablePanel defaultSize={50}>
								<div className="flex h-[200px] items-center justify-center p-6">
									<span className="font-semibold">One</span>
								</div>
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel defaultSize={50}>
								<div className="flex h-[200px] items-center justify-center p-6">
									<span className="font-semibold">Two</span>
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
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
				componentName="resizable"
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
							component: "<ResizablePanelGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the panel group.",
								},
								{
									name: "direction",
									type: `"horizontal" | "vertical"`,
									description: "The direction of the resizable panels.",
								},
								{
									name: "autoSaveId",
									type: "string",
									description:
										"Unique identifier for auto-saving panel sizes to localStorage.",
								},
							],
						},
						{
							component: "<ResizablePanel />",
							props: [
								{
									name: "defaultSize",
									type: "number",
									description: "Default size of the panel (0-100, percentage).",
								},
								{
									name: "minSize",
									type: "number",
									description: "Minimum size of the panel (0-100, percentage).",
								},
								{
									name: "maxSize",
									type: "number",
									description: "Maximum size of the panel (0-100, percentage).",
								},
								{
									name: "collapsible",
									type: "boolean",
									description: "Whether the panel can be collapsed.",
								},
								{
									name: "collapsedSize",
									type: "number",
									description: "Size when collapsed (0-100, percentage).",
								},
							],
						},
						{
							component: "<ResizableHandle />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the handle.",
								},
								{
									name: "withHandle",
									type: "boolean",
									description: "Whether to show a visible handle grip icon.",
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
