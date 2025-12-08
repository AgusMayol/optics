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
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsContents,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/optics/code-snippet";
import { Separator } from "@/registry/optics/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { ArrowUpRight, Sparkle } from "lucide-react";
import Link from "next/link";
import * as React from "react";

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

const buttonComponentCode = [
	{
		language: "tsx",
		filename: "components/ui/optics/button.tsx",
		code: `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const otherThemes = cva("transition-all duration-150", {
	variants: {
		variant: {
			raised:
				"[text-shadow:0_1px_0_var(--color-zinc-100)] dark:[text-shadow:0_1px_0_var(--color-zinc-900)] bg-background border-input/50 relative border-b-2 shadow-sm shadow-zinc-950/15 ring-1 ring-zinc-300 dark:ring-zinc-700 text-foreground",
			ghost:
				"bg-transparent hover:bg-accent text-foreground border-none !shadow-none",
			outline:
				"border border-input bg-transparent shadow-xs hover:bg-accent text-foreground",
		},
	},
});

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none cursor-pointer text-white",
	{
		variants: {
			variant: {
				default:
					"bg-radial-[at_52%_-52%] [text-shadow:0_1px_0_var(--color-primary)] border-primary from-primary/70 to-primary/95 text-primary-foreground inset-shadow-2xs inset-shadow-white/25 border text-sm shadow-md shadow-zinc-950/30 ring-0 transition-[filter] duration-200 hover:brightness-125 active:brightness-95",
				secondary:
					"shadow-xs bg-linear-to-t hover:to-muted to-sidebar from-muted dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10 duration-200 text-foreground",
				muted:
					"bg-muted hover:bg-neutral-200 shadow-zinc-950/10 duration-200 text-foreground",
				outline:
					"border border-input bg-transparent shadow-xs hover:bg-accent text-foreground",
				ghost: "bg-transparent hover:bg-accent text-foreground",
				link: "text-primary underline-offset-4 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current hover:after:w-full after:transition-[width] after:duration-150 !px-0 !pb-0 -mt-1.5 [&_svg]:text-muted-foreground group [&_svg]:group-hover:text-foreground transition-colors",
				info: "[text-shadow:0_1px_0_var(--color-blue-800)] from-blue-600/85 to-blue-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
				success:
					"[text-shadow:0_1px_0_var(--color-emerald-800)] from-emerald-600/85 to-emerald-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
				warning:
					"[text-shadow:0_1px_0_var(--color-amber-800)] from-amber-600/85 to-amber-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
				destructive:
					"from-destructive to-destructive/85 bg-linear-to-t border border-b-2 border-zinc-950/40 shadow-md shadow-zinc-950/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90",
				raised:
					"[text-shadow:0_1px_0_var(--color-zinc-100)] dark:[text-shadow:0_1px_0_var(--color-zinc-900)] bg-background hover:bg-zinc-50 dark:hover:bg-neutral-900 border-input/50 relative border-b-2 shadow-sm shadow-zinc-950/15 ring-1 ring-zinc-300 dark:ring-zinc-700 text-foreground",
			},

			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},

			animation: {
				colors: "transition-colors duration-150",
				all: "active:scale-[0.97] transition-all duration-150",
				none: "transition-none",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	animation = "all",
	asChild = false,
	...props
}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, animation, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants, otherThemes };
`,
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
	const {
		mounted,
		value,
		setValue,
		installationTab,
		handleTabChange,
		activeCommand,
		activeDepsCommand,
	} = useCookiePreferences("button", installDeps);

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
				activeCommand={activeCommand}
				activeDepsCommand={activeDepsCommand}
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
