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
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
} from "@/registry/optics/button-group";
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
import { Copy, Download, Share2 } from "lucide-react";

import componentCode from "@/registry/optics/button-group.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "button-group.jsx",
		code: `import { ButtonGroup } from "@/components/optics/button-group";
import { Button } from "@/registry/optics/button";

<div className="flex items-center justify-center gap-6">
	<ButtonGroup orientation="vertical">
		<Button variant="raised" animation="none">
			<Copy />
			Copy
		</Button>
		<Button variant="raised" animation="colors">
			<Download />
			Download
		</Button>
		<Button variant="raised" animation="colors">
			<Share2 />
			Share
		</Button>
	</ButtonGroup>

	<div className="flex flex-col items-start justify-center gap-6">
		<ButtonGroup>
			<Button variant="raised" animation="colors">
				<Copy />
				Copy
			</Button>
			<Button variant="raised" animation="colors">
				<Download />
				Download
			</Button>
			<Button variant="raised" animation="colors">
				<Share2 />
				Share
			</Button>
		</ButtonGroup>

		<ButtonGroup>
			<ButtonGroupText variant="raised">Actions</ButtonGroupText>
			<ButtonGroupSeparator />
			<Button variant="raised" animation="colors">
				<Copy />
			</Button>
			<Button variant="raised" animation="colors">
				<Download />
			</Button>
			<Button variant="raised" animation="colors">
				<Share2 />
			</Button>
		</ButtonGroup>
	</div>
</div>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/button-group.jsx",
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
	const { value, setValue, installationTab, handleTabChange } =
		useCookiePreferences("button-group", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Button Group
					</h1>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A component that groups multiple buttons together with consistent
					styling and spacing.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center justify-center gap-6">
						<div className="flex items-center justify-center gap-6">
							<ButtonGroup orientation="vertical">
								<Button variant="raised" animation="none">
									<Copy />
									Copy
								</Button>
								<Button variant="raised" animation="colors">
									<Download />
									Download
								</Button>
								<Button variant="raised" animation="colors">
									<Share2 />
									Share
								</Button>
							</ButtonGroup>

							<div className="flex flex-col items-start justify-center gap-6">
								<ButtonGroup>
									<Button variant="raised" animation="colors">
										<Copy />
										Copy
									</Button>
									<Button variant="raised" animation="colors">
										<Download />
										Download
									</Button>
									<Button variant="raised" animation="colors">
										<Share2 />
										Share
									</Button>
								</ButtonGroup>

								<ButtonGroup>
									<ButtonGroupText variant="raised">Actions</ButtonGroupText>
									<ButtonGroupSeparator />
									<Button variant="raised" animation="colors">
										<Copy />
									</Button>
									<Button variant="raised" animation="colors">
										<Download />
									</Button>
									<Button variant="raised" animation="colors">
										<Share2 />
									</Button>
								</ButtonGroup>
							</div>
						</div>
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
				componentName="button-group"
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
							component: "<ButtonGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the button group.",
								},
								{
									name: "orientation",
									type: `"horizontal" | "vertical"`,
									description:
										"The orientation of the button group. Defaults to 'horizontal'.",
								},
							],
						},
						{
							component: "<ButtonGroupText />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the button group text.",
								},
								{
									name: "variant",
									type: `"raised" | "ghost" | "outline" (default: "raised")`,
									description:
										"Variant style for the text element. Defaults to 'raised'.",
								},
								{
									name: "animation",
									type: `"colors" | "all" | "none" | "only-scale" (default: "colors")`,
									description:
										"Animation style for interactions. Defaults to 'colors'.",
								},
								{
									name: "asChild",
									type: "boolean (default: false)",
									description:
										"When true, the text will render as its child element instead of a div. Defaults to false.",
								},
							],
						},
						{
							component: "<ButtonGroupSeparator />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the separator.",
								},
								{
									name: "orientation",
									type: `"vertical" | "horizontal"`,
									description:
										"The orientation of the separator. Defaults to 'vertical'.",
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
