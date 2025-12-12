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
	GuidedTour,
	GuidedTourOverlay,
	GuidedTourProvider,
	GuidedTourStep,
	GuidedTourTrigger,
} from "@/registry/optics/guided-tour";
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight, HelpCircle } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/guided-tour.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "example.jsx",
		code: `import {
	GuidedTourProvider,
	GuidedTour,
	GuidedTourTrigger,
	GuidedTourStep,
	GuidedTourOverlay,
} from "@/components/optics/guided-tour";
import { Button } from "@/components/optics/button";

function MyComponent() {
	return (
		<GuidedTourProvider>
			<GuidedTour>
				<GuidedTourOverlay />
				
				<GuidedTourTrigger tourId="welcome-tour" asChild>
					<Button>Start Tour</Button>
				</GuidedTourTrigger>

				<div className="space-y-4">
					<GuidedTourStep
						tourId="welcome-tour"
						step={1}
						content={
							<div>
								<h3 className="font-semibold mb-2">Welcome</h3>
								<p className="text-sm text-muted-foreground">
									This is the first step of the tour.
								</p>
							</div>
						}
					>
						<Button>Main Button</Button>
					</GuidedTourStep>

					<GuidedTourStep
						tourId="welcome-tour"
						step={2}
						content={
							<div>
								<h3 className="font-semibold mb-2">Second Step</h3>
								<p className="text-sm text-muted-foreground">
									Here you can see the second element.
								</p>
							</div>
						}
					>
						<Input placeholder="Input field" />
					</GuidedTourStep>

					<GuidedTourStep
						tourId="welcome-tour"
						step={3}
						content={
							<div>
								<h3 className="font-semibold mb-2">Final</h3>
								<p className="text-sm text-muted-foreground">
									This is the last step of the tour.
								</p>
							</div>
						}
					>
						<Button variant="secondary">Finish</Button>
					</GuidedTourStep>
				</div>
			</GuidedTour>
		</GuidedTourProvider>
	);
}`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/guided-tour.jsx",
		code: componentCode,
	},
];

// Helper functions for cookies

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("guided-tour", installDeps);

	return (
		<GuidedTourProvider>
			<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
				<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
					<div className="w-full flex items-center justify-between">
						<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
							Guided Tour
						</h1>
						<Button variant="link" size="sm" asChild>
							<Link
								href="https://ui.shadcn.com/docs/components/popover"
								target="_blank"
								rel="noopener noreferrer"
							>
								shadcn/ui
								<ArrowUpRight className="-ml-1" />
							</Link>
						</Button>
					</div>

					<p className="text-muted-foreground text-base lg:text-xl text-pretty">
						A component for creating interactive guided tours that walk users
						through your application step by step. Includes forward and backward
						navigation, dark overlay, and customizable content for each step.
					</p>
				</div>

				<Separator decoration />

				<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
					<GuidedTour>
						<GuidedTourOverlay />
						<Card className="pt-8 pb-0 bg-sidebar">
							<CardContent className="px-8 flex flex-col items-center justify-center gap-6 py-12">
								{/* Component */}
								<div className="flex flex-col items-center gap-4 w-full max-w-md">
									<GuidedTourTrigger tourId="demo-tour" asChild>
										<Button>
											<HelpCircle className="mr-2" />
											Start Demo Tour
										</Button>
									</GuidedTourTrigger>

									<div className="w-full space-y-4">
										<GuidedTourStep
											tourId="demo-tour"
											step={1}
											content={
												<div>
													<h3 className="font-semibold mb-2 text-base">
														Welcome to the Tour
													</h3>
													<p className="text-sm text-muted-foreground">
														This is the first step. Here you can see how the
														guided tour component works.
													</p>
												</div>
											}
										>
											<div className="p-4 border rounded-lg bg-background space-y-2">
												<Label>Step 1: Input Field</Label>
												<Input placeholder="Type something here..." />
											</div>
										</GuidedTourStep>

										<GuidedTourStep
											tourId="demo-tour"
											step={2}
											content={
												<div>
													<h3 className="font-semibold mb-2 text-base">
														Second Step
													</h3>
													<p className="text-sm text-muted-foreground">
														This is the second element of the tour. You can
														continue navigating between steps.
													</p>
												</div>
											}
										>
											<div className="p-4 border rounded-lg bg-background space-y-2">
												<Label>Step 2: Action Button</Label>
												<Button className="w-full">Click Here</Button>
											</div>
										</GuidedTourStep>

										<GuidedTourStep
											tourId="demo-tour"
											step={3}
											content={
												<div>
													<h3 className="font-semibold mb-2 text-base">
														Last Step
													</h3>
													<p className="text-sm text-muted-foreground">
														This is the last step of the tour. Press "Finish" to
														complete the tour.
													</p>
												</div>
											}
										>
											<div className="p-4 border rounded-lg bg-background space-y-2">
												<Label>Step 3: Completion</Label>
												<Button variant="secondary" className="w-full">
													Complete
												</Button>
											</div>
										</GuidedTourStep>
									</div>
								</div>
							</CardContent>

							<CardFooter className="border-t px-0 py-0 bg-background rounded-b-xl">
								{/* Component Code */}
								<Accordion type={"single"} collapsible className="w-full">
									<AccordionItem value="codeblock" className="rounded-b-xl">
										<AccordionTrigger
											className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 	hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
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
														onCopy={() =>
															console.log("Copied code to clipboard")
														}
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
					</GuidedTour>
				</div>

				<InstallationGuide
					value={value}
					setValue={setValue}
					componentName="guided-tour"
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
								component: "<GuidedTourProvider />",
								props: [
									{
										name: "",
										type: "No props required",
										description:
											"Provider that wraps the entire application or section where the guided tour will be used.",
									},
								],
							},
							{
								component: "<GuidedTour />",
								props: [
									{
										name: "",
										type: "No specific props",
										description:
											"Main container for the tour. Wraps all elements that will be part of the tour.",
									},
								],
							},
							{
								component: "<GuidedTourOverlay />",
								props: [
									{
										name: "",
										type: "No specific props",
										description:
											"Dark overlay that appears when a tour is active. Automatically displayed when there is an active tour.",
									},
								],
							},
							{
								component: "<GuidedTourTrigger />",
								props: [
									{
										name: "className",
										type: "string",
										description:
											"Additional CSS classes to apply to the trigger.",
									},
									{
										name: "tourId",
										type: "string (required)",
										description: "Unique identifier for the tour.",
									},
									{
										name: "asChild",
										type: "boolean (default: false)",
										description:
											"Render as a child element instead of the default button element.",
									},
								],
							},
							{
								component: "<GuidedTourStep />",
								props: [
									{
										name: "className",
										type: "string",
										description:
											"Additional CSS classes to apply to the step element.",
									},
									{
										name: "tourId",
										type: "string (required)",
										description:
											"Unique identifier for the tour this step belongs to.",
									},
									{
										name: "step",
										type: "number (required)",
										description: "Step number in the tour sequence.",
									},
									{
										name: "content",
										type: "ReactNode (required)",
										description: "Content to display in the tour step popover.",
									},
								],
							},
						]}
					/>
				</div>

				<ComponentNavigation />
			</main>
		</GuidedTourProvider>
	);
}
