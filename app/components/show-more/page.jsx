"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.svg";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import { Separator } from "@/registry/agusmayol/separator";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/agusmayol/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/agusmayol/accordion";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlockSelect,
	CodeBlockSelectContent,
	CodeBlockSelectItem,
	CodeBlockSelectTrigger,
	CodeBlockSelectValue,
} from "@/registry/agusmayol/code-block";
import { buttonVariants } from "@/registry/agusmayol/button";
import { Fragment, useState } from "react";

const code = [
	{
		language: "jsx",
		filename: "card.jsx",
		code: `<Card decorations>
	<CardHeader>
		<CardTitle>Titulo de la tarjeta</CardTitle>
		<CardDescription>Descripcion de la tarjeta</CardDescription>
	</CardHeader>
	<CardContent>Contenido de la tarjeta</CardContent>
	<CardFooter className="flex items-center justify-end" background>
		<Button>Accion</Button>
	</CardFooter>
</Card>`,
	},
];
export default function Page() {
	const [open, setOpen] = useState(false);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">Show More</h1>
				<p className="text-muted-foreground text-xl">
					Displays a button that shows more content when clicked.
				</p>
			</div>
			<div className="flex flex-col flex-1 gap-8 p-12 bg-background">
			<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8">
						<p className="text-base font-normal">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus quisquam assumenda eligendi provident magni error voluptatibus obcaecati ab qui necessitatibus.
						</p>
						{/* Component */}
						<Accordion type={"single"} collapsible className="w-full" onValueChange={setOpen}>
					<AccordionItem value="codeblock" className="w-full rounded-b-xl">
						<AccordionTrigger
							showArrow={false}
							className="w-full px-0 pt-8 pb-0 group flex-row-reverse items-center justify-end hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none [&>svg]:hidden"
						>
					
							<div className="w-full">
								<Separator decoration />
								<div className="w-full -mt-4.5 flex items-center justify-center">

								
								<div
									className={cn(
										buttonVariants({ variant: "raised", size: "default" }),
										"rounded-full z-10",
										"group-[.data-state=open]:[&>svg]:rotate-270 group-[.data-state=open]:[&[data-state=open]>svg]:rotate-360",
									)}
								>
									<div
					className={cn(
						"absolute inset-0 flex mr-6 items-center justify-center transition-all duration-300 ease-in-out will-change-[transform,opacity,filter]",
						open
							? "scale-100 opacity-100 blur-0"
							: "blur-xs scale-[0.25] opacity-0",
					)}
				>
					Show Less
				</div>
				<div
					className={cn(
						"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter]",
						
							open ? "blur-xs scale-[0.25] opacity-0"
							: "scale-100 opacity-100 blur-0",
					)}
				>
					Show More
				</div>
									<ChevronDown className={cn("text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-300", !open ? "rotate-360" : "rotate-180")} />
								</div>
								</div>
							</div>

							
						</AccordionTrigger>
						<AccordionContent
							className="border-b-0 border-x-0 pb-0 shadow-none pt-8"
							keepRendered
						>
							<p className="text-base font-normal">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus quisquam assumenda eligendi provident magni error voluptatibus obcaecati ab qui necessitatibus.
						</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
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
													<CodeBlockContent language={item.language} className="bg-sidebar">
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
		</main>
	);
}
