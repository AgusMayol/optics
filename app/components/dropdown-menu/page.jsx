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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/registry/optics/dropdown-menu";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/dropdown-menu.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "dropdown-menu.jsx",
		code: `import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/optics/dropdown-menu";
import { Button } from "@/components/optics/button";

<DropdownMenu>
	<DropdownMenuTrigger asChild>
		<Button variant="raised">Open Menu</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuLabel>My Account</DropdownMenuLabel>
		<DropdownMenuSeparator />
		<DropdownMenuItem>Profile</DropdownMenuItem>
		<DropdownMenuItem>Settings</DropdownMenuItem>
		<DropdownMenuItem>Team</DropdownMenuItem>
		<DropdownMenuSeparator />
		<DropdownMenuItem>Logout</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/dropdown-menu.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-dropdown-menu",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-dropdown-menu",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-dropdown-menu",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-dropdown-menu",
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("dropdown-menu", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Dropdown Menu
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/dropdown-menu"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Displays a menu to the user triggered by a button or other element.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="raised">Open Menu</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="start">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuGroup>
									<DropdownMenuItem>
										Profile
										<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										Billing
										<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										Settings
										<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										Keyboard shortcuts
										<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>Team</DropdownMenuItem>
									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											Invite users
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem>Email</DropdownMenuItem>
												<DropdownMenuItem>Message</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem>More...</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>
									<DropdownMenuItem>
										New Team
										<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem>GitHub</DropdownMenuItem>
								<DropdownMenuItem>Support</DropdownMenuItem>
								<DropdownMenuItem disabled>API</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									Log out
									<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
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
				componentName="dropdown-menu"
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
							component: "<DropdownMenu />",
							props: [
								{
									name: "open",
									type: "boolean",
									description: "The controlled open state of the dropdown menu. Use with onOpenChange.",
								},
								{
									name: "defaultOpen",
									type: "boolean",
									description: "The uncontrolled default open state of the dropdown menu.",
								},
								{
									name: "onOpenChange",
									type: "(open: boolean) => void",
									description: "Callback fired when the open state changes.",
								},
								{
									name: "modal",
									type: "boolean (default: true)",
									description: "When true, interaction with outside elements is disabled. Defaults to true.",
								},
							],
						},
						{
							component: "<DropdownMenuTrigger />",
							props: [
								{
									name: "asChild",
									type: "boolean",
									description: "When true, the trigger will render as its child element instead of a button.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents user interaction with the trigger.",
								},
							],
						},
						{
							component: "<DropdownMenuContent />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the content.",
								},
								{
									name: "side",
									type: `"top" | "right" | "bottom" | "left"`,
									description: "The preferred side of the trigger to render against.",
								},
								{
									name: "sideOffset",
									type: "number (default: 4)",
									description: "The distance in pixels from the trigger.",
								},
								{
									name: "align",
									type: `"start" | "center" | "end"`,
									description: "The preferred alignment against the trigger.",
								},
								{
									name: "alignOffset",
									type: "number",
									description: "An offset in pixels from the 'align' option.",
								},
								{
									name: "onEscapeKeyDown",
									type: "(event: KeyboardEvent) => void",
									description: "Callback fired when the Escape key is pressed.",
								},
								{
									name: "onPointerDownOutside",
									type: "(event: PointerEvent) => void",
									description: "Callback fired when a pointer event occurs outside the menu.",
								},
								{
									name: "onInteractOutside",
									type: "(event: Event) => void",
									description: "Callback fired when an interaction occurs outside the menu.",
								},
							],
						},
						{
							component: "<DropdownMenuItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the item.",
								},
								{
									name: "inset",
									type: "boolean",
									description: "When true, adds left padding to accommodate an icon.",
								},
								{
									name: "variant",
									type: `"default" | "destructive" (default: "default")`,
									description: "Variant style for the item.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents the item from being selected.",
								},
								{
									name: "onSelect",
									type: "(event: Event) => void",
									description: "Callback fired when the item is selected.",
								},
							],
						},
						{
							component: "<DropdownMenuCheckboxItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the checkbox item.",
								},
								{
									name: "checked",
									type: "boolean",
									description: "The controlled checked state. Use with onCheckedChange.",
								},
								{
									name: "defaultChecked",
									type: "boolean",
									description: "The uncontrolled default checked state.",
								},
								{
									name: "onCheckedChange",
									type: "(checked: boolean) => void",
									description: "Callback fired when the checked state changes.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents the item from being toggled.",
								},
							],
						},
						{
							component: "<DropdownMenuRadioGroup />",
							props: [
								{
									name: "value",
									type: "string",
									description: "The controlled value of the radio group. Use with onValueChange.",
								},
								{
									name: "defaultValue",
									type: "string",
									description: "The uncontrolled default value of the radio group.",
								},
								{
									name: "onValueChange",
									type: "(value: string) => void",
									description: "Callback fired when the value changes.",
								},
							],
						},
						{
							component: "<DropdownMenuRadioItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the radio item.",
								},
								{
									name: "value",
									type: "string (required)",
									description: "The value of the radio item.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents the item from being selected.",
								},
							],
						},
						{
							component: "<DropdownMenuLabel />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the label.",
								},
								{
									name: "inset",
									type: "boolean",
									description: "When true, adds left padding to match items with icons.",
								},
							],
						},
						{
							component: "<DropdownMenuSeparator />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the separator.",
								},
							],
						},
						{
							component: "<DropdownMenuGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the group.",
								},
							],
						},
						{
							component: "<DropdownMenuSub />",
							props: [
								{
									name: "open",
									type: "boolean",
									description: "The controlled open state of the submenu. Use with onOpenChange.",
								},
								{
									name: "defaultOpen",
									type: "boolean",
									description: "The uncontrolled default open state of the submenu.",
								},
								{
									name: "onOpenChange",
									type: "(open: boolean) => void",
									description: "Callback fired when the open state changes.",
								},
							],
						},
						{
							component: "<DropdownMenuSubTrigger />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the sub trigger.",
								},
								{
									name: "inset",
									type: "boolean",
									description: "When true, adds left padding to accommodate an icon.",
								},
								{
									name: "disabled",
									type: "boolean",
									description: "When true, prevents the submenu from opening.",
								},
							],
						},
						{
							component: "<DropdownMenuSubContent />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the sub content.",
								},
								{
									name: "side",
									type: `"top" | "right" | "bottom" | "left"`,
									description: "The preferred side of the trigger to render against.",
								},
								{
									name: "sideOffset",
									type: "number (default: 2)",
									description: "The distance in pixels from the trigger.",
								},
								{
									name: "align",
									type: `"start" | "center" | "end" (default: "start")`,
									description: "The preferred alignment against the trigger.",
								},
								{
									name: "alignOffset",
									type: "number (default: -4)",
									description: "An offset in pixels from the 'align' option.",
								},
							],
						},
						{
							component: "<DropdownMenuShortcut />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the shortcut.",
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
