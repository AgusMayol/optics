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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogIcon,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/registry/optics/alert-dialog";
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
import { ArrowUpRight, Info } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/alert-dialog.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "alert-dialog.jsx",
		code: `import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogIcon,
} from "@/components/optics/alert-dialog";
import { Button } from "@/registry/optics/button";
import { AlertTriangle } from "lucide-react";

<AlertDialog>
	<AlertDialogTrigger asChild>
		<Button variant="raised">Show Dialog</Button>
	</AlertDialogTrigger>
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogIcon>
				<div className="p-2 rounded-full squircle-none flex items-center justify-center shadow-md bg-emerald-500/20">
					<Info className="text-emerald-600" />
				</div>
				<AlertDialogTitle>
					Are you absolutely sure?
				</AlertDialogTitle>
			</AlertDialogIcon>
			<AlertDialogDescription>
				This action cannot be undone. This will permanently delete
				your account and remove your data from our servers.
			</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<AlertDialogCancel>Cancel</AlertDialogCancel>
			<AlertDialogAction>Continue</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/alert-dialog.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-alert-dialog lucide-react",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-alert-dialog lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-alert-dialog lucide-react",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-alert-dialog lucide-react",
	},
];

export default function Page() {
	const { value, setValue, installationTab, handleTabChange } =
		useCookiePreferences("alert-dialog", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Alert Dialog
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/alert-dialog"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A modal dialog that interrupts the user with important content and
					expects a response.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="raised">Show Dialog</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogIcon>
										<div className="p-2 rounded-full squircle-none flex items-center justify-center shadow-md bg-emerald-500/20">
											<Info className="text-emerald-600" />
										</div>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
									</AlertDialogIcon>

									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your account and remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction>Continue</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
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
				componentName="alert-dialog"
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
							component: "<AlertDialog />",
							props: [
								{
									name: "open",
									type: "boolean",
									description:
										"The controlled open state of the alert dialog. Use with onOpenChange.",
								},
								{
									name: "defaultOpen",
									type: "boolean",
									description:
										"The uncontrolled default open state of the alert dialog.",
								},
								{
									name: "onOpenChange",
									type: "(open: boolean) => void",
									description: "Callback fired when the open state changes.",
								},
							],
						},
						{
							component: "<AlertDialogTrigger />",
							props: [
								{
									name: "asChild",
									type: "boolean",
									description:
										"When true, the trigger will render as its child element instead of a button.",
								},
							],
						},
						{
							component: "<AlertDialogContent />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the content.",
								},
								{
									name: "onEscapeKeyDown",
									type: "(event: KeyboardEvent) => void",
									description: "Callback fired when the Escape key is pressed.",
								},
								{
									name: "onPointerDownOutside",
									type: "(event: PointerEvent) => void",
									description:
										"Callback fired when a pointer event occurs outside the dialog.",
								},
								{
									name: "onInteractOutside",
									type: "(event: Event) => void",
									description:
										"Callback fired when an interaction occurs outside the dialog.",
								},
							],
						},
						{
							component: "<AlertDialogHeader />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the header.",
								},
							],
						},
						{
							component: "<AlertDialogFooter />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the footer.",
								},
							],
						},
						{
							component: "<AlertDialogTitle />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the title.",
								},
							],
						},
						{
							component: "<AlertDialogDescription />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the description.",
								},
							],
						},
						{
							component: "<AlertDialogAction />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the action button.",
								},
								{
									name: "variant",
									type: `"default" | "outline" | "ghost" | "destructive" | "secondary" | "info" | "success" | "warning" | "muted" | "raised" | "link"`,
									description:
										"Variant style that inherits button variant styles.",
								},
								{
									name: "size",
									type: `"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"`,
									description: "Size that inherits button size styles.",
								},
							],
						},
						{
							component: "<AlertDialogCancel />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the cancel button.",
								},
								{
									name: "variant",
									type: `"default" | "outline" | "ghost" | "destructive" | "secondary" | "info" | "success" | "warning" | "muted" | "raised" | "link" (default: "raised")`,
									description:
										"Variant style that inherits button variant styles. Defaults to 'raised'.",
								},
								{
									name: "size",
									type: `"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"`,
									description: "Size that inherits button size styles.",
								},
							],
						},
						{
							component: "<AlertDialogIcon />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the icon container.",
								},
								{
									name: "children",
									type: "React.ReactNode",
									description: "The icon element to display.",
								},
							],
						},
						{
							component: "<AlertDialogOverlay />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the overlay.",
								},
							],
						},
						{
							component: "<AlertDialogPortal />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the portal.",
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
