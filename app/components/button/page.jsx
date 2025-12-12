"use client";
import { ComponentNavigation } from "@/components/component-navigation";
import { InstallationGuide } from "@/components/installation-guide";
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
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight, Sparkle } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/button.jsx.txt";
const code = [
	{
		language: "jsx",
		filename: "button.jsx",
		code: `import { Button } from "@/components/optics/button";

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="info">Info</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="muted">Muted</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="raised">Raised</Button>
<Button size="lg">Large</Button>
<Button size="icon-lg">
	<Sparkle />
</Button>
<Button size="icon">
	<Sparkle />
</Button>
<Button size="icon-sm">
	<Sparkle />
</Button>
<Button size="sm">Small</Button>
<Button variant="link" asChild>
	<Link href="#">
		Link
		<ArrowUpRight size={16} className="-ml-1" />
	</Link>
</Button>`,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-slot class-variance-authority",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-slot class-variance-authority",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-slot class-variance-authority",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-slot class-variance-authority",
	},
];

const componentFiles = [
	{
		path: "@/components/optics/button.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const { value, setValue, installationTab, handleTabChange } =
		useCookiePreferences("button", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Button
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/button"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Displays a button or a component that looks like a button.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						{/* Component */}
						<Button>Default</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="info">Info</Button>
						<Button variant="success">Success</Button>
						<Button variant="warning">Warning</Button>
						<Button variant="muted">Muted</Button>
						<Button variant="ghost">Ghost</Button>

						<Button variant="destructive">Destructive</Button>
						<Button variant="raised">Raised</Button>
						<Button size="lg">Large</Button>

						<Button size="icon-lg">
							<Sparkle />
						</Button>
						<Button size="icon">
							<Sparkle />
						</Button>
						<Button size="icon-sm">
							<Sparkle />
						</Button>
						<Button size="sm">Small</Button>
						<Button variant="link" asChild>
							<Link href="#">
								Link
								<ArrowUpRight size={16} className="-ml-1" />
							</Link>
						</Button>
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
				componentName="button"
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
							component: "<Button />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the button.",
								},
								{
									name: "variant",
									type: `"default" | "outline" | "ghost" | "destructive" | "secondary" | "info" | "success" | "warning" | "muted" | "raised" | "link"`,
									description:
										"The visual style variant of the button. Defaults to 'default'.",
								},
								{
									name: "size",
									type: `"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"`,
									description: "The size of the button. Defaults to 'default'.",
								},
								{
									name: "animation",
									type: `"colors" | "all" | "none" | "only-scale"`,
									description:
										"The animation style for button interactions. Defaults to 'all'.",
								},
								{
									name: "asChild",
									type: "boolean",
									description:
										"When true, the button will render as its child element instead of a button. Defaults to false.",
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
