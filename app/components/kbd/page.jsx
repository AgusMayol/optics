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
import { Kbd, KbdGroup } from "@/registry/optics/kbd";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/kbd.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "kbd.jsx",
		code: `import { Kbd, KbdGroup } from "@/components/optics/kbd";
import { Command } from "lucide-react";

// Basic usage
<Kbd>⌘</Kbd>
<Kbd>K</Kbd>

// Grouped keys
<KbdGroup>
	<Kbd><Command /></Kbd>
	<Kbd>+</Kbd>
	<Kbd>K</Kbd>
</KbdGroup>

// With hotkey detection and animation
<Kbd useHotkey>⌘</Kbd>
<Kbd useHotkey>K</Kbd>

// With custom hotkey prop
<Kbd useHotkey hotkey="mod+k" onHotkeyPress={() => console.log("Pressed!")}>
	⌘ K
</Kbd>

// Legacy variant
<Kbd variant="legacy">⌘</Kbd>
<Kbd variant="legacy">K</Kbd>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/kbd.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add clsx tailwind-merge class-variance-authority react-hotkeys-hook",
	},
	{
		label: "npm",
		code: "npm install clsx tailwind-merge class-variance-authority react-hotkeys-hook",
	},
	{
		label: "yarn",
		code: "yarn add clsx tailwind-merge class-variance-authority react-hotkeys-hook",
	},
	{
		label: "bun",
		code: "bun add clsx tailwind-merge class-variance-authority react-hotkeys-hook",
	},
];

// Helper functions for cookies

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("kbd", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Kbd
					</h1>

					<Button variant="link" size="sm" asChild>
						<Link
							href="https://cuicui.day/application-ui/kbd"
							target="_blank"
							rel="noopener noreferrer"
						>
							CuiCui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A component to display keyboard keys and shortcuts.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center gap-6">
						<div className="flex items-center gap-2">
							<p className="text-sm">Press</p>
							<Kbd useHotkey>⌘</Kbd>
							<Kbd useHotkey>K</Kbd>
							<p className="text-sm">to open search</p>
						</div>

						<div className="flex items-center gap-2">
							<p className="text-sm">Or use</p>
							<KbdGroup>
								<Kbd useHotkey>⌘ + K</Kbd>
							</KbdGroup>
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
				componentName="kbd"
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
							component: "<Kbd />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the keyboard key.",
								},
								{
									name: "variant",
									type: `"default" | "legacy" (default: "default")`,
									description: "Visual variant of the keyboard key.",
								},
								{
									name: "useHotkey",
									type: "boolean (default: false)",
									description:
										"Enable hotkey detection and animation. The hotkey is automatically extracted from children or can be provided via the hotkey prop.",
								},
								{
									name: "hotkey",
									type: "string",
									description:
										"Explicit hotkey string. If not provided, extracted from children.",
								},
								{
									name: "onHotkeyPress",
									type: "(event) => void",
									description:
										"Callback function called when the hotkey is pressed.",
								},
								{
									name: "animate",
									type: "boolean (default: true)",
									description: "Enable animation when the hotkey is pressed.",
								},
							],
						},
						{
							component: "<KbdGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the keyboard key group.",
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
