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
import { Separator } from "@/registry/optics/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/optics/table";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/table.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "table.jsx",
		code: `import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/optics/table";

<Table>
	<TableHeader>
		<TableRow>
			<TableHead>Name</TableHead>
			<TableHead>Status</TableHead>
			<TableHead>Role</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		<TableRow>
			<TableCell>John Doe</TableCell>
			<TableCell>Active</TableCell>
			<TableCell>Admin</TableCell>
		</TableRow>
	</TableBody>
</Table>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/table.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("table", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Table
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/table"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Powerful table and datagrid built on top of the native table element.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center justify-center gap-4">
						<Table className="w-full">
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Role</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell className="font-medium">John Doe</TableCell>
									<TableCell>Active</TableCell>
									<TableCell>Admin</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">Jane Smith</TableCell>
									<TableCell>Active</TableCell>
									<TableCell>User</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">Bob Johnson</TableCell>
									<TableCell>Inactive</TableCell>
									<TableCell>User</TableCell>
								</TableRow>
							</TableBody>
						</Table>
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
				componentName="table"
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
							component: "<Table />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the table container.",
								},
							],
						},
						{
							component: "<TableHeader />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the table header.",
								},
							],
						},
						{
							component: "<TableBody />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the table body.",
								},
							],
						},
						{
							component: "<TableFooter />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the table footer.",
								},
							],
						},
						{
							component: "<TableRow />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the table row.",
								},
							],
						},
						{
							component: "<TableHead />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the table head cell.",
								},
							],
						},
						{
							component: "<TableCell />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the table cell.",
								},
							],
						},
						{
							component: "<TableCaption />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the table caption.",
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
