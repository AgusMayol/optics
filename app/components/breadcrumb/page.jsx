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
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/optics/breadcrumb";
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
import { ArrowUpRight, Slash } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/breadcrumb.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "breadcrumb.jsx",
		code: `import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/optics/breadcrumb";
import Link from "next/link";

<Breadcrumb>
	<BreadcrumbList>
		<BreadcrumbItem>
			<BreadcrumbLink asChild>
				<Link href="/">Home</Link>
			</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbLink asChild>
				<Link href="/components">Components</Link>
			</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
		</BreadcrumbItem>
	</BreadcrumbList>
</Breadcrumb>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/breadcrumb.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-slot lucide-react",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-slot lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-slot lucide-react",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-slot lucide-react",
	},
];

export default function Page() {
	const { value, setValue, installationTab, handleTabChange } =
		useCookiePreferences("breadcrumb", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Breadcrumb
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/breadcrumb"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Displays the path to the current resource using a hierarchy of links.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center justify-center gap-4">
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href="/">Home</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href="/components">Components</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>

						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href="/">Home</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator>
									<Slash />
								</BreadcrumbSeparator>
								<BreadcrumbItem>
									<BreadcrumbEllipsis />
								</BreadcrumbItem>
								<BreadcrumbSeparator>
									<Slash />
								</BreadcrumbSeparator>
								<BreadcrumbItem>
									<BreadcrumbPage>Current</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
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
				componentName="breadcrumb"
				installDeps={installDeps}
				manualFiles={componentFiles}
				installationTab={installationTab}
				handleTabChange={handleTabChange}
			/>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>

				<p className="text-sm text-muted-foreground">
					The Breadcrumb component is composed of several sub-components that
					work together to create a navigation breadcrumb trail.
				</p>

				<PropsTable
					data={[
						{
							component: "<Breadcrumb />",
							props: [
								{
									name: "",
									type: "No specific props. Accepts standard HTML nav attributes.",
									description: "Main container component.",
								},
							],
						},
						{
							component: "<BreadcrumbList />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the list.",
								},
							],
						},
						{
							component: "<BreadcrumbItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the item.",
								},
							],
						},
						{
							component: "<BreadcrumbLink />",
							props: [
								{
									name: "asChild",
									type: "boolean",
									description:
										"When true, the link will render as its child element instead of an anchor tag.",
								},
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the link.",
								},
							],
						},
						{
							component: "<BreadcrumbPage />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the page indicator.",
								},
							],
						},
						{
							component: "<BreadcrumbSeparator />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the separator.",
								},
								{
									name: "children",
									type: "React.ReactNode",
									description:
										"Custom separator element. Defaults to ChevronRight icon if not provided.",
								},
							],
						},
						{
							component: "<BreadcrumbEllipsis />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the ellipsis.",
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
