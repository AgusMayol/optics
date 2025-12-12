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
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/registry/optics/command";
import { Separator } from "@/registry/optics/separator";
import {
	ArrowUpRight,
	Calculator,
	Calendar,
	CreditCard,
	Settings,
	Smile,
	User,
} from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/command.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "command.jsx",
		code: `import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/optics/command";

<Command className="rounded-lg border shadow-md">
	<CommandInput placeholder="Type a command or search..." />
	<CommandList>
		<CommandEmpty>No results found.</CommandEmpty>
		<CommandGroup heading="Suggestions">
			<CommandItem>
				<Calendar />
				<span>Calendar</span>
			</CommandItem>
			<CommandItem>
				<Smile />
				<span>Search Emoji</span>
			</CommandItem>
		</CommandGroup>
		<CommandSeparator />
		<CommandGroup heading="Settings">
			<CommandItem>
				<User />
				<span>Profile</span>
				<CommandShortcut>⌘P</CommandShortcut>
			</CommandItem>
		</CommandGroup>
	</CommandList>
</Command>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/command.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const { value, setValue, installationTab, handleTabChange } =
		useCookiePreferences("command", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Command
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/command"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Fast, composable, unstyled command menu for React.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<Command className="rounded-lg border shadow-md max-w-md">
							<CommandInput placeholder="Type a command or search..." />
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								<CommandGroup heading="Suggestions">
									<CommandItem>
										<Calendar className="mr-2 h-4 w-4" />
										<span>Calendar</span>
									</CommandItem>
									<CommandItem>
										<Smile className="mr-2 h-4 w-4" />
										<span>Search Emoji</span>
									</CommandItem>
									<CommandItem>
										<Calculator className="mr-2 h-4 w-4" />
										<span>Calculator</span>
									</CommandItem>
								</CommandGroup>
								<CommandSeparator />
								<CommandGroup heading="Settings">
									<CommandItem>
										<User className="mr-2 h-4 w-4" />
										<span>Profile</span>
										<CommandShortcut>⌘P</CommandShortcut>
									</CommandItem>
									<CommandItem>
										<CreditCard className="mr-2 h-4 w-4" />
										<span>Billing</span>
										<CommandShortcut>⌘B</CommandShortcut>
									</CommandItem>
									<CommandItem>
										<Settings className="mr-2 h-4 w-4" />
										<span>Settings</span>
										<CommandShortcut>⌘S</CommandShortcut>
									</CommandItem>
								</CommandGroup>
							</CommandList>
						</Command>
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
				componentName="command"
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
							component: "<Command />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the command palette.",
								},
							],
						},
						{
							component: "<CommandDialog />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the dialog.",
								},
								{
									name: "title",
									type: 'string (default: "Command Palette")',
									description: "Title for the command dialog.",
								},
								{
									name: "description",
									type: 'string (default: "Search for a command to run...")',
									description: "Description text for the command dialog.",
								},
								{
									name: "showCloseButton",
									type: "boolean (default: false)",
									description:
										"Whether to show the close button in the dialog.",
								},
								{
									name: "open",
									type: "boolean",
									description:
										"The controlled open state of the dialog. Use with onOpenChange.",
								},
								{
									name: "onOpenChange",
									type: "(open: boolean) => void",
									description: "Callback fired when the open state changes.",
								},
							],
						},
						{
							component: "<CommandInput />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the input.",
								},
								{
									name: "placeholder",
									type: "string",
									description: "Placeholder text for the input.",
								},
							],
						},
						{
							component: "<CommandList />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the list.",
								},
							],
						},
						{
							component: "<CommandEmpty />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the empty state.",
								},
							],
						},
						{
							component: "<CommandGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the group.",
								},
								{
									name: "heading",
									type: "string",
									description: "Heading text for the command group.",
								},
							],
						},
						{
							component: "<CommandItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the item.",
								},
								{
									name: "value",
									type: "string",
									description: "The value of the command item.",
								},
								{
									name: "onSelect",
									type: "(value: string) => void",
									description: "Callback fired when the item is selected.",
								},
								{
									name: "disabled",
									type: "boolean",
									description:
										"When true, prevents the item from being selected.",
								},
							],
						},
						{
							component: "<CommandSeparator />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the separator.",
								},
							],
						},
						{
							component: "<CommandShortcut />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the shortcut.",
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
