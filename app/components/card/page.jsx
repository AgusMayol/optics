"use client";
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
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/optics/card";
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
import { ArrowUpRight, Bell } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const code = [
	{
		language: "jsx",
		filename: "card.jsx",
		code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/registry/optics/card";
import { Button } from "@/registry/optics/button";

<Card className="w-[350px]">
	<CardHeader>
		<CardTitle>Notifications</CardTitle>
		<CardDescription>You have 3 unread messages.</CardDescription>
		<CardAction>
			<Button size="icon-sm" variant="ghost">
				<Bell />
			</Button>
		</CardAction>
	</CardHeader>
	<CardContent>
		<p className="text-sm">
			This is a sample card with header, content, and footer
			sections.
		</p>
	</CardContent>
	<CardFooter>
		<Button className="w-full">Mark all as read</Button>
	</CardFooter>
</Card>

<Card className="w-[350px]" decorations>
	<CardHeader>
		<CardTitle>Notifications</CardTitle>
		<CardDescription>You have 3 unread messages.</CardDescription>
		<CardAction>
			<Button size="icon-sm" variant="ghost">
				<Bell />
			</Button>
		</CardAction>
	</CardHeader>
	<CardContent>
		<p className="text-sm">
			This is a sample card with header, content, and footer
			sections.
		</p>
	</CardContent>
	<CardFooter background className="justify-end">
		<Button size="sm">Mark all as read</Button>
	</CardFooter>
</Card>`,
	},
];

const cardComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/card.jsx",
		code: `import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, decorations = false, children, ...props }) {
	return (
		<div
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm relative",
				className,
				decorations && "rounded-none",
			)}
			{...props}
		>
			{children}

			{decorations && (
				<div className={cn("absolute -left-[1px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[7.87px] rounded-full absolute top-0" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{decorations && (
				<div className={cn("absolute -right-[0px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[7.87px] rounded-full absolute top-0" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute -left-[7px]" />
					</div>
				</div>
			)}

			{decorations && (
				<div className={cn("absolute -left-[1px] -bottom-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[7.87px] rounded-full absolute -top-[7px]" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{decorations && (
				<div className={cn("absolute -right-[0px] -bottom-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[7.87px] rounded-full absolute -top-[7px]" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute -left-[7px]" />
					</div>
				</div>
			)}
		</div>
	);
}

function CardHeader({ className, ...props }) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	);
}

function CardFooter({
	className,
	background = false,
	color,
	children,
	...props
}) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"flex items-center px-6",
				background &&
					\`bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)] -mb-6 pb-3 pt-3 border-t relative\`,
				className,
			)}
			{...props}
		>
			{children}

			{background && (
				<div className={cn("absolute -left-[1px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[11.80px] rounded-full absolute -top-[5.5px]" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{background && (
				<div className={cn("absolute -right-[0px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[11.80px] rounded-full absolute -top-[5.5px]" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute -left-[7px]" />
					</div>
				</div>
			)}
		</div>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/card",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/card",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/card",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/card",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add lucide-react",
	},
	{
		label: "npm",
		code: "npm install lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add lucide-react",
	},
	{
		label: "bun",
		code: "bun add lucide-react",
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
	} = useCookiePreferences(commands, installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Card
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/card"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Displays a card with header, content, and footer.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<Card className="w-[350px]">
							<CardHeader>
								<CardTitle>Notifications</CardTitle>
								<CardDescription>You have 3 unread messages.</CardDescription>
								<CardAction>
									<Button size="icon-sm" variant="ghost">
										<Bell />
									</Button>
								</CardAction>
							</CardHeader>
							<CardContent>
								<p className="text-sm">
									This is a sample card with header, content, and footer
									sections.
								</p>
							</CardContent>
							<CardFooter>
								<Button className="w-full">Mark all as read</Button>
							</CardFooter>
						</Card>

						<Card className="w-[350px]" decorations>
							<CardHeader>
								<CardTitle>Notifications</CardTitle>
								<CardDescription>You have 3 unread messages.</CardDescription>
								<CardAction>
									<Button size="icon-sm" variant="ghost">
										<Bell />
									</Button>
								</CardAction>
							</CardHeader>
							<CardContent>
								<p className="text-sm">
									This is a sample card with header, content, and footer
									sections.
								</p>
							</CardContent>
							<CardFooter background className="justify-end">
								<Button size="sm">Mark all as read</Button>
							</CardFooter>
						</Card>
					</CardContent>

					<div className="border-t px-0 py-0 bg-background rounded-b-xl mt-8">
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
					</div>
				</Card>
			</div>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Installation
				</h2>
				<Tabs
					value={installationTab}
					onValueChange={handleTabChange}
					className="w-full"
				>
					<TabsList variant="underline">
						<TabsTrigger value="tab1">CLI</TabsTrigger>
						<TabsTrigger value="tab2">Manual</TabsTrigger>
					</TabsList>
					<TabsContents className="w-full pt-2">
						<TabsContent value="tab1" className="w-full pt-4">
							<Snippet
								onValueChange={setValue}
								value={value}
								className="w-full"
							>
								<SnippetHeader>
									<SnippetTabsList variant="outline">
										{commands.map((command) => (
											<SnippetTabsTrigger
												key={command.label}
												value={command.label}
											>
												<span>{command.label}</span>
											</SnippetTabsTrigger>
										))}
									</SnippetTabsList>
								</SnippetHeader>
								<SnippetTabsContents>
									{commands.map((command) => (
										<SnippetTabsContent
											key={command.label}
											value={command.label}
											className="w-full flex items-center justify-between gap-8 py-2 pr-2"
										>
											{command.code}
											{activeCommand && (
												<SnippetCopyButton value={activeCommand.code} />
											)}
										</SnippetTabsContent>
									))}
								</SnippetTabsContents>
							</Snippet>
						</TabsContent>
						<TabsContent
							value="tab2"
							className="w-full pt-4 flex flex-col gap-12"
						>
							<div className="w-full flex flex-col gap-2">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Install the following dependencies:
								</p>

								<Snippet
									onValueChange={setValue}
									value={value}
									className="w-full"
								>
									<SnippetHeader>
										<SnippetTabsList variant="outline">
											{installDeps.map((command) => (
												<SnippetTabsTrigger
													key={command.label}
													value={command.label}
												>
													<span>{command.label}</span>
												</SnippetTabsTrigger>
											))}
										</SnippetTabsList>
									</SnippetHeader>
									<SnippetTabsContents>
										{installDeps.map((command) => (
											<SnippetTabsContent
												key={command.label}
												value={command.label}
												className="w-full flex items-center justify-between gap-8 py-2 pr-2"
											>
												{command.code}
												{activeDepsCommand && (
													<SnippetCopyButton value={activeDepsCommand.code} />
												)}
											</SnippetTabsContent>
										))}
									</SnippetTabsContents>
								</Snippet>
							</div>

							<div className="w-full flex flex-col gap-2">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Copy and paste the following code into your project:
								</p>

								<CodeBlock
									data={cardComponentCode}
									defaultValue={cardComponentCode[0].filename}
								>
									<CodeBlockHeader>
										<CodeBlockFiles>
											{(item) => (
												<CodeBlockFilename
													key={item.language}
													value={item.filename}
												>
													{item.filename}
												</CodeBlockFilename>
											)}
										</CodeBlockFiles>

										<CodeBlockCopyButton variant="ghost" />
									</CodeBlockHeader>
									<CodeBlockBody>
										{(item) => (
											<CodeBlockItem key={item.language} value={item.filename}>
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
							</div>

							<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
								Update the import paths to match your project setup.
							</p>
						</TabsContent>
					</TabsContents>
				</Tabs>
			</div>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>

				<PropsTable
					data={[
						{
							component: "<Card />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the card.",
								},
								{
									name: "decorations",
									type: "boolean (default: false)",
									description: "When true, adds decorative corner elements to the card.",
								},
							],
						},
						{
							component: "<CardHeader />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the card header.",
								},
							],
						},
						{
							component: "<CardTitle />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the card title.",
								},
							],
						},
						{
							component: "<CardDescription />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the card description.",
								},
							],
						},
						{
							component: "<CardAction />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the card action.",
								},
							],
						},
						{
							component: "<CardContent />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the card content.",
								},
							],
						},
						{
							component: "<CardFooter />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the card footer.",
								},
								{
									name: "background",
									type: "boolean (default: false)",
									description: "When true, adds a striped background pattern to the footer.",
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
