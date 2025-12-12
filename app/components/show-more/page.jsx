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
import { ShowMore } from "@/registry/optics/show-more";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/show-more.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "show-more.jsx",
		code: `import { ShowMore } from "@/components/optics/show-more";

<ShowMore maxLines={3}>
	<p className="text-base font-normal">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit.
		Minus quisquam assumenda eligendi provident magni error
		voluptatibus obcaecati ab qui necessitatibus.
	</p>
</ShowMore>

<ShowMore maxLength={100}>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</ShowMore>

<ShowMore 
	maxLines={2}
	maskColor={{
		default: "from-sidebar",
		dark: "from-sidebar",
	}}
>
	<p>Content with custom mask color</p>
</ShowMore>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/show-more.jsx",
		code: componentCode,
	},
];

// Helper functions for cookies

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("show-more", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Show More
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/accordion"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					An expandable content component that shows a "Show More" button when
					content exceeds a specified length or number of lines.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col gap-8">
						{/* Component */}
						<div className="flex flex-col gap-2">
							<ShowMore
								maxLines={3}
								maskColor={{
									default: "from-sidebar",
									dark: "from-sidebar",
								}}
							>
								<p className="text-base font-normal">
									Lorem ipsum dolor sit, amet consectetur adipisicing elit.
									Minus quisquam assumenda eligendi provident magni error
									voluptatibus obcaecati ab qui necessitatibus. Lorem ipsum
									dolor sit, amet consectetur adipisicing elit. Minus quisquam
									assumenda eligendi provident magni error voluptatibus
									obcaecati ab qui necessitatibus. Lorem ipsum dolor sit, amet
									consectetur adipisicing elit. Minus quisquam assumenda
									eligendi provident magni error voluptatibus obcaecati ab qui
									necessitatibus.
								</p>
							</ShowMore>
						</div>
					</CardContent>

					<CardFooter className="border-t px-0 py-0 bg-background rounded-b-xl">
						{/* Component Code */}
						<Accordion type={"single"} collapsible className="w-full">
							<AccordionItem value="codeblock" className="rounded-b-xl">
								<AccordionTrigger
									className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 	hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
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
				componentName="show-more"
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
							component: "<ShowMore />",
							props: [
								{
									name: "children",
									type: "React.ReactNode",
									description: "The content to display.",
								},
								{
									name: "moreContent",
									type: "React.ReactNode",
									description: "Additional content to show when expanded.",
								},
								{
									name: "maskColor",
									type: 'string | { default: string, dark: string } (default: "oklch(var(--background))")',
									description: "Color for the fade mask effect.",
								},
								{
									name: "showSeparator",
									type: "boolean (default: true)",
									description:
										"Whether to show the separator line above the Show More button.",
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
