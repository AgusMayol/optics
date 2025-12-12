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
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/optics/form";
import { Input } from "@/registry/optics/input";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/form.jsx.txt";
import { useForm } from "react-hook-form";

const code = [
	{
		language: "jsx",
		filename: "form.jsx",
		code: `import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/optics/form";
import { Input } from "@/components/optics/input";
import { Button } from "@/registry/optics/button";

const form = useForm({
	defaultValues: {
		username: "",
	},
});

function onSubmit(data) {
	console.log(data);
}

<Form {...form}>
	<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
		<FormField
			control={form.control}
			name="username"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Username</FormLabel>
					<FormControl>
						<Input placeholder="John Doe" variant="raised" {...field} />
					</FormControl>
					<FormDescription>
						This is your public display name.
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
		<Button type="submit" variant="raised">Submit</Button>
	</form>
</Form>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/form.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("form", installDeps);

	const form = useForm({
		defaultValues: {
			username: "",
		},
	});

	function onSubmit(data) {
		console.log(data);
	}

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Form
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/form"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Building forms with React Hook Form and Zod.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-8 w-full max-w-md"
							>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													placeholder="John Doe"
													variant="raised"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This is your public display name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" variant="default">
									Submit
								</Button>
							</form>
						</Form>
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
				componentName="form"
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
							component: "<Form />",
							props: [
								{
									name: "...form",
									type: "UseFormReturn (react-hook-form form object)",
									description: "Spread props from react-hook-form's useForm hook return value.",
								},
							],
						},
						{
							component: "<FormField />",
							props: [
								{
									name: "name",
									type: "string (required)",
									description: "The name of the field (must match the form schema).",
								},
								{
									name: "control",
									type: "Control",
									description: "The form control from react-hook-form.",
								},
								{
									name: "render",
									type: "({ field, fieldState, formState }) => React.ReactNode",
									description: "Render function that receives field props and state.",
								},
							],
						},
						{
							component: "<FormItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the form item.",
								},
							],
						},
						{
							component: "<FormLabel />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the label.",
								},
							],
						},
						{
							component: "<FormControl />",
							props: [
								{
									name: "asChild",
									type: "boolean",
									description: "When true, the control will render as its child element instead of a div.",
								},
							],
						},
						{
							component: "<FormDescription />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the description.",
								},
							],
						},
						{
							component: "<FormMessage />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the error message.",
								},
								{
									name: "children",
									type: "React.ReactNode",
									description: "Custom error message. If not provided, displays the field's error message.",
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
