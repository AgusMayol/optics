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
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight, Bell } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/card.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "card.jsx",
		code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/optics/card";
import { Button } from "@/components/optics/button";

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

const componentFiles = [
	{
		path: "@/components/optics/card.jsx",
		code: componentCode,
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
	const { value, setValue, installationTab, handleTabChange } =
		useCookiePreferences("card", installDeps);

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

			<InstallationGuide
				value={value}
				setValue={setValue}
				componentName="card"
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
									description:
										"When true, adds decorative corner elements to the card.",
								},
							],
						},
						{
							component: "<CardHeader />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the card header.",
								},
							],
						},
						{
							component: "<CardTitle />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the card title.",
								},
							],
						},
						{
							component: "<CardDescription />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the card description.",
								},
							],
						},
						{
							component: "<CardAction />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the card action.",
								},
							],
						},
						{
							component: "<CardContent />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the card content.",
								},
							],
						},
						{
							component: "<CardFooter />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the card footer.",
								},
								{
									name: "background",
									type: "boolean (default: false)",
									description:
										"When true, adds a striped background pattern to the footer.",
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
