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
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/registry/optics/carousel";
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
import Link from "next/link";

import componentCode from "@/registry/optics/carousel.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "carousel.jsx",
		code: `import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/optics/carousel";

<Carousel className="w-full max-w-xs">
	<CarouselContent>
		<CarouselItem>
			<div className="p-1">
				<Card>
					<CardContent className="flex aspect-square items-center justify-center p-6">
						<span className="text-4xl font-semibold">1</span>
					</CardContent>
				</Card>
			</div>
		</CarouselItem>
		<CarouselItem>
			<div className="p-1">
				<Card>
					<CardContent className="flex aspect-square items-center justify-center p-6">
						<span className="text-4xl font-semibold">2</span>
					</CardContent>
				</Card>
			</div>
		</CarouselItem>
	</CarouselContent>
	<CarouselPrevious />
	<CarouselNext />
</Carousel>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/carousel.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const { value, setValue, installationTab, handleTabChange } =
		useCookiePreferences("carousel", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Carousel
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/carousel"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A carousel with motion and swipe built using Embla.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						<Carousel className="w-full max-w-xs">
							<CarouselContent>
								{Array.from({ length: 5 }).map((_, index) => (
									<CarouselItem key={index}>
										<div className="p-1">
											<Card>
												<CardContent className="flex aspect-square items-center justify-center p-6">
													<span className="text-4xl font-semibold">
														{index + 1}
													</span>
												</CardContent>
											</Card>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
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
				componentName="carousel"
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
							component: "<Carousel />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the carousel.",
								},
								{
									name: "orientation",
									type: `"horizontal" | "vertical" (default: "horizontal")`,
									description: "The orientation of the carousel.",
								},
								{
									name: "opts",
									type: "object (Embla carousel options)",
									description: "Configuration options for the Embla carousel.",
								},
								{
									name: "setApi",
									type: "(api: EmblaCarouselType) => void",
									description:
										"Callback to receive the Embla carousel API instance.",
								},
								{
									name: "plugins",
									type: "EmblaPluginType[]",
									description: "Array of Embla carousel plugins.",
								},
							],
						},
						{
							component: "<CarouselContent />",
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
							component: "<CarouselItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the item.",
								},
							],
						},
						{
							component: "<CarouselPrevious />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the previous button.",
								},
								{
									name: "variant",
									type: `"default" | "outline" | "ghost" | "destructive" | "secondary" | "info" | "success" | "warning" | "muted" | "raised" | "link" (default: "outline")`,
									description: "Variant style for the button.",
								},
								{
									name: "size",
									type: `"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" (default: "icon")`,
									description: "Size of the button.",
								},
							],
						},
						{
							component: "<CarouselNext />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the next button.",
								},
								{
									name: "variant",
									type: `"default" | "outline" | "ghost" | "destructive" | "secondary" | "info" | "success" | "warning" | "muted" | "raised" | "link" (default: "outline")`,
									description: "Variant style for the button.",
								},
								{
									name: "size",
									type: `"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" (default: "icon")`,
									description: "Size of the button.",
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
