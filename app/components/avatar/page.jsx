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
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarStack,
} from "@/registry/optics/avatar";
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
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import componentCode from "@/registry/optics/avatar.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "avatar.jsx",
		code: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/optics/avatar";

<Avatar title="Optics">
	<AvatarImage src="/images/logo.svg" alt="optics" />
	<AvatarFallback>OP</AvatarFallback>
</Avatar>

<AvatarStack
	data={[
		{
			image: "https://github.com/agusmayol.png",
			fallback: "AM",
			title: "Agus Mayol",
		},
		{
			image: "https://github.com/clcautomation.png",
			fallback: "CLC",
			title: "CLC Automation",
		},
	]}
/>`,
	},
];

const avatarComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/avatar.jsx",
		code: `"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/registry/optics/tooltip";

import { cn } from "@/lib/utils";

function AvatarStack({ data, children, ...props }) {
	return (
		<div className="flex items-center -space-x-2">
			{data.map((item, index) => (
				<Avatar title={item.title} key={index}>
					<AvatarImage src={item.image} />
					<AvatarFallback>{item.fallback}</AvatarFallback>
				</Avatar>
			))}
		</div>
	);
}

function Avatar({ className, title, ...props }) {
	return (
		<Tooltip>
			<TooltipTrigger>
				<AvatarPrimitive.Root
					data-slot="avatar"
					className={cn(
						"relative flex size-8 shrink-0 overflow-hidden rounded-full border border-background shadow-sm",
						className,
					)}
					{...props}
				/>
			</TooltipTrigger>
			<TooltipContent>
				<p>{title}</p>
			</TooltipContent>
		</Tooltip>
	);
}

function AvatarImage({ className, ...props }) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn("aspect-square size-full", className)}
			{...props}
		/>
	);
}

function AvatarFallback({ className, ...props }) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"bg-muted flex size-full items-center justify-center rounded-full",
				className,
			)}
			{...props}
		/>
	);
}

export { Avatar, AvatarImage, AvatarFallback, AvatarStack };`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/avatar.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-avatar",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-avatar",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-avatar",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-avatar",
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
	} = useCookiePreferences("avatar", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Avatar
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/avatar"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					An image element with a fallback for representing the user.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center justify-center gap-4">
						<Avatar title="Optics">
							<AvatarImage src="/images/logo.svg" alt="optics" />
							<AvatarFallback>OP</AvatarFallback>
						</Avatar>

						<AvatarStack
							data={[
								{
									image: "https://github.com/agusmayol.png",
									fallback: "AM",
									title: "Agus Mayol",
								},
								{
									image: "https://github.com/clcautomation.png",
									fallback: "CLC",
									title: "CLC Automation",
								},
							]}
						/>
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
				activeCommand={activeCommand}
				activeDepsCommand={activeDepsCommand}
				componentName="avatar"
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
							component: "<Avatar />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the avatar.",
								},
								{
									name: "title",
									type: "string",
									description: "Tooltip text displayed when hovering over the avatar.",
								},
								{
									name: "side",
									type: "string",
									description: "The side of the tooltip relative to the avatar.",
								},
								{
									name: "sideOffset",
									type: "number",
									description: "The distance in pixels from the tooltip to the avatar. Defaults to 0.",
								},
							],
						},
						{
							component: "<AvatarImage />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the avatar image.",
								},
								{
									name: "src",
									type: "string",
									description: "The source URL of the avatar image.",
								},
								{
									name: "alt",
									type: "string",
									description: "Alternative text for the avatar image.",
								},
							],
						},
						{
							component: "<AvatarFallback />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the avatar fallback.",
								},
							],
						},
						{
							component: "<AvatarStack />",
							props: [
								{
									name: "data",
									type: "Array<{ image: string, fallback: string, title: string }>",
									description: "Array of avatar data objects containing image URL, fallback text, and tooltip title.",
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
