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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/optics/dialog";
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import componentCode from "@/registry/optics/dialog.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "dialog.jsx",
		code: `import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/optics/dialog";
import { Button } from "@/components/optics/button";

<Dialog>
	<DialogTrigger asChild>
		<Button variant="raised">Edit Profile</Button>
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Edit profile</DialogTitle>
			<DialogDescription>
				Make changes to your profile here. Click save when you're done.
			</DialogDescription>
		</DialogHeader>
		<div className="grid gap-4 py-4">
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="name" className="text-right">
					Name
				</Label>
				<Input id="name" value="Pedro Duarte" className="col-span-3" />
			</div>
		</div>
		<DialogFooter>
			<Button type="submit" variant="raised">Save changes</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/dialog.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const [open, setOpen] = React.useState(false);
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("dialog", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Dialog
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/dialog"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A window overlaid on either the primary window or another dialog
					window, rendering the content underneath inert.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger asChild>
								<Button variant="raised">Edit Profile</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Edit profile</DialogTitle>
									<DialogDescription>
										Make changes to your profile here. Click save when you're
										done.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Name
										</Label>
										<Input
											id="name"
											defaultValue="Pedro Duarte"
											className="col-span-3"
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="username" className="text-right">
											Username
										</Label>
										<Input
											id="username"
											defaultValue="@peduarte"
											className="col-span-3"
										/>
									</div>
								</div>
								<DialogFooter>
									<Button type="submit" variant="default">
										Save changes
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
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
				componentName="dialog"
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
							component: "<Dialog />",
							props: [
								{
									name: "open",
									type: "boolean",
									description: "The controlled open state of the dialog. Use with onOpenChange.",
								},
								{
									name: "defaultOpen",
									type: "boolean",
									description: "The uncontrolled default open state of the dialog.",
								},
								{
									name: "onOpenChange",
									type: "(open: boolean) => void",
									description: "Callback fired when the open state changes.",
								},
								{
									name: "modal",
									type: "boolean (default: true)",
									description: "When true, interaction with outside elements is disabled and only dialog content receives focus. Defaults to true.",
								},
							],
						},
						{
							component: "<DialogTrigger />",
							props: [
								{
									name: "asChild",
									type: "boolean",
									description: "When true, the trigger will render as its child element instead of a button.",
								},
							],
						},
						{
							component: "<DialogContent />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the content.",
								},
								{
									name: "containerClassName",
									type: "string",
									description: "Additional CSS classes to apply to the inner container.",
								},
								{
									name: "showCloseButton",
									type: "boolean (default: true)",
									description: "When true, displays a close button in the top-right corner. Defaults to true.",
								},
								{
									name: "onEscapeKeyDown",
									type: "(event: KeyboardEvent) => void",
									description: "Callback fired when the Escape key is pressed.",
								},
								{
									name: "onPointerDownOutside",
									type: "(event: PointerEvent) => void",
									description: "Callback fired when a pointer event occurs outside the dialog.",
								},
								{
									name: "onInteractOutside",
									type: "(event: Event) => void",
									description: "Callback fired when an interaction occurs outside the dialog.",
								},
							],
						},
						{
							component: "<DialogHeader />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the header.",
								},
							],
						},
						{
							component: "<DialogFooter />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the footer.",
								},
							],
						},
						{
							component: "<DialogTitle />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the title.",
								},
							],
						},
						{
							component: "<DialogDescription />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the description.",
								},
							],
						},
						{
							component: "<DialogOverlay />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the overlay.",
								},
							],
						},
						{
							component: "<DialogClose />",
							props: [
								{
									name: "asChild",
									type: "boolean",
									description: "When true, the close button will render as its child element instead of a button.",
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
