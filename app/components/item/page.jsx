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
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@/registry/optics/item";
import { Separator } from "@/registry/optics/separator";
import { Mail, Star } from "lucide-react";

import componentCode from "@/registry/optics/item.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "item.jsx",
		code: `import {
	Item,
	ItemMedia,
	ItemContent,
	ItemTitle,
	ItemDescription,
	ItemActions,
} from "@/components/optics/item";
import { Button } from "@/components/optics/button";
import { Mail } from "lucide-react";

<Item>
	<ItemMedia variant="icon">
		<Mail />
	</ItemMedia>
	<ItemContent>
		<ItemTitle>New Message</ItemTitle>
		<ItemDescription>
			You have a new message from John Doe
		</ItemDescription>
	</ItemContent>
	<ItemActions>
		<Button size="sm">View</Button>
	</ItemActions>
</Item>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/item.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-slot class-variance-authority",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-slot class-variance-authority",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-slot class-variance-authority",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-slot class-variance-authority",
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("item", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Item
					</h1>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A flexible list item component for building complex layouts with
					media, content, and actions.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center gap-4">
						<ItemGroup>
							<Item>
								<ItemMedia variant="icon">
									<Mail />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>New Message</ItemTitle>
									<ItemDescription>
										You have a new message from John Doe
									</ItemDescription>
								</ItemContent>
								<ItemActions>
									<Button size="sm">View</Button>
								</ItemActions>
							</Item>
							<ItemSeparator />
							<Item>
								<ItemMedia variant="icon">
									<Star />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>Featured Item</ItemTitle>
									<ItemDescription>
										This is a featured item with special content
									</ItemDescription>
								</ItemContent>
								<ItemActions>
									<Button size="sm" variant="secondary">
										Details
									</Button>
								</ItemActions>
							</Item>
						</ItemGroup>
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
				componentName="item"
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
							component: "<Item />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the item.",
								},
								{
									name: "variant",
									type: `"default" | "outline" | "muted" (default: "default")`,
									description: "Visual variant of the item.",
								},
								{
									name: "size",
									type: `"default" | "sm" (default: "default")`,
									description: "Size of the item.",
								},
								{
									name: "asChild",
									type: "boolean (default: false)",
									description:
										"Render as a child element instead of the default div element.",
								},
							],
						},
						{
							component: "<ItemMedia />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the media element.",
								},
								{
									name: "variant",
									type: `"default" | "icon" | "image" (default: "default")`,
									description: "Type of media to display.",
								},
							],
						},
						{
							component: "<ItemContent />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the content container.",
								},
							],
						},
						{
							component: "<ItemTitle />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the title.",
								},
							],
						},
						{
							component: "<ItemDescription />",
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
							component: "<ItemActions />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the actions container.",
								},
							],
						},
						{
							component: "<ItemHeader />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the header.",
								},
							],
						},
						{
							component: "<ItemFooter />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the footer.",
								},
							],
						},
						{
							component: "<ItemGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the group container.",
								},
							],
						},
						{
							component: "<ItemSeparator />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the separator.",
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
