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
import { AspectRatio } from "@/registry/optics/aspect-ratio";
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
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import componentCode from "@/registry/optics/aspect-ratio.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "aspect-ratio.jsx",
		code: `import { AspectRatio } from "@/components/optics/aspect-ratio";
import Image from "next/image";

<div className="w-[450px]">
	<AspectRatio ratio={16 / 9}>
		<Image
			src="/images/placeholder.jpg"
			alt="Photo"
			fill
			className="rounded-md object-cover"
		/>
	</AspectRatio>
</div>`,
	},
];

const componentFiles = [
	{
		path: "@/components/optics/aspect-ratio.jsx",
		code: componentCode,
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-aspect-ratio",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-aspect-ratio",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-aspect-ratio",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-aspect-ratio",
	},
];

export default function Page() {
	const { value, setValue, installationTab, handleTabChange } =
		useCookiePreferences("aspect-ratio", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Aspect Ratio
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/aspect-ratio"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Displays content within a desired ratio.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center justify-center gap-4">
						<div className="w-[450px]">
							<AspectRatio ratio={16 / 9} className="bg-muted">
								<Image
									src="/images/background-placeholder.jpeg"
									alt="Photo by Ale"
									fill
									className="rounded-md object-cover"
								/>
							</AspectRatio>
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
				componentName="aspect-ratio"
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
							component: "<AspectRatio />",
							props: [
								{
									name: "ratio",
									type: "number (required, e.g., 16 / 9, 4 / 3)",
									description: "The aspect ratio to maintain (width / height).",
								},
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the aspect ratio container.",
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
