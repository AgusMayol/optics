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
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";
import { Separator } from "@/registry/optics/separator";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/registry/optics/sheet";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/sheet.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "sheet.jsx",
		code: `import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/optics/sheet";
import { Button } from "@/components/optics/button";
import { Input } from "@/components/optics/input";
import { Label } from "@/registry/optics/label";

<Sheet>
	<SheetTrigger asChild>
		<Button variant="outline">Open</Button>
	</SheetTrigger>
	<SheetContent>
		<SheetHeader>
			<SheetTitle>Edit profile</SheetTitle>
			<SheetDescription>
				Make changes to your profile here. Click save when you're done.
			</SheetDescription>
		</SheetHeader>
		<div className="grid gap-4 py-4">
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="name" className="text-right">
					Name
				</Label>
				<Input id="name" value="Pedro Duarte" className="col-span-3" />
			</div>
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="username" className="text-right">
					Username
				</Label>
				<Input id="username" value="@peduarte" className="col-span-3" />
			</div>
		</div>
		<SheetFooter>
			<SheetClose asChild>
				<Button type="submit">Save changes</Button>
			</SheetClose>
		</SheetFooter>
	</SheetContent>
</Sheet>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/sheet.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-dialog class-variance-authority",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-dialog class-variance-authority",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-dialog class-variance-authority",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-dialog class-variance-authority",
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("sheet", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Sheet
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/sheet"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Extends the Dialog component to display content that complements the
					main content of the screen.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="raised">Open</Button>
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Edit profile</SheetTitle>
									<SheetDescription>
										Make changes to your profile here. Click save when you're
										done.
									</SheetDescription>
								</SheetHeader>
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
								<SheetFooter>
									<SheetClose asChild>
										<Button type="submit">Save changes</Button>
									</SheetClose>
								</SheetFooter>
							</SheetContent>
						</Sheet>
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
				componentName="sheet"
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
							component: "<Sheet />",
							props: [
								{
									name: "open",
									type: "boolean",
									description: "The controlled open state of the sheet. Use with onOpenChange.",
								},
								{
									name: "defaultOpen",
									type: "boolean",
									description: "The uncontrolled default open state of the sheet.",
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
							component: "<SheetTrigger />",
							props: [
								{
									name: "asChild",
									type: "boolean",
									description: "When true, the trigger will render as its child element instead of a button.",
								},
							],
						},
						{
							component: "<SheetContent />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the content.",
								},
								{
									name: "side",
									type: `"top" | "right" | "bottom" | "left" | "popIn" (default: "right")`,
									description: "The side of the screen where the sheet appears.",
								},
								{
									name: "onEscapeKeyDown",
									type: "(event: KeyboardEvent) => void",
									description: "Callback fired when the Escape key is pressed.",
								},
								{
									name: "onPointerDownOutside",
									type: "(event: PointerEvent) => void",
									description: "Callback fired when a pointer event occurs outside the sheet.",
								},
								{
									name: "onInteractOutside",
									type: "(event: Event) => void",
									description: "Callback fired when an interaction occurs outside the sheet.",
								},
							],
						},
						{
							component: "<SheetHeader />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the header.",
								},
							],
						},
						{
							component: "<SheetFooter />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the footer.",
								},
							],
						},
						{
							component: "<SheetTitle />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the title.",
								},
							],
						},
						{
							component: "<SheetDescription />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the description.",
								},
							],
						},
						{
							component: "<SheetOverlay />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the overlay.",
								},
							],
						},
						{
							component: "<SheetClose />",
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
