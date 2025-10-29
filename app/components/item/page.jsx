"use client";

import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.svg";
import { ArrowLeft, Info, Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
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
import { Input } from "@/registry/agusmayol/input";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/registry/agusmayol/tooltip";
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
} from "@/registry/agusmayol/sheet";

import {
	AlertDialog,
	AlertDialogPortal,
	AlertDialogOverlay,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogIcon,
} from "@/registry/agusmayol/alert-dialog";

import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/registry/agusmayol/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/registry/agusmayol/item";

const code = [
	{
		language: "jsx",
		filename: "card.jsx",
		code: `import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/registry/agusmayol/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
  } from "@/registry/agusmayol/item"
        
        
<div className="flex w-full max-w-md flex-col gap-6">
	<Item>
		<ItemContent>
			<ItemTitle>Default Variant</ItemTitle>
			<ItemDescription>
				Standard styling with subtle background and borders.
			</ItemDescription>
		</ItemContent>
		<ItemActions>
			<Button variant="outline" size="sm">
				Open
			</Button>
		</ItemActions>
	</Item>
	<Item variant="outline">
		<ItemContent>
			<ItemTitle>Outline Variant</ItemTitle>
			<ItemDescription>
				Outlined style with clear borders and transparent
				background.
			</ItemDescription>
		</ItemContent>
		<ItemActions>
			<Button variant="outline" size="sm">
				Open
			</Button>
		</ItemActions>
	</Item>
	<Item variant="muted">
		<ItemContent>
			<ItemTitle>Muted Variant</ItemTitle>
			<ItemDescription>
				Subdued appearance with muted colors for secondary content.
			</ItemDescription>
		</ItemContent>
		<ItemActions>
			<Button variant="outline" size="sm">
				Open
			</Button>
		</ItemActions>
	</Item>
	<Item variant="raised">
		<ItemContent>
			<ItemTitle>Raised Variant</ItemTitle>
			<ItemDescription>
				Subdued appearance with raised colors for secondary content.
			</ItemDescription>
		</ItemContent>
		<ItemActions>
			<Button variant="outline" size="sm">
				Open
			</Button>
		</ItemActions>
	</Item>
	<Item variant="outline" size="sm" asChild>
		<a href="#">
			<ItemMedia>
				<BadgeCheckIcon className="size-5" />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>Your profile has been verified.</ItemTitle>
			</ItemContent>
			<ItemActions>
				<ChevronRightIcon className="size-4" />
			</ItemActions>
		</a>
	</Item>
</div>`,
	},
];
export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">Item</h1>
				<p className="text-muted-foreground text-xl">
					A versatile component that you can use to display any content.
				</p>
			</div>
			<div className="flex flex-col flex-1 gap-8 p-12 bg-background">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						{/* Component */}
						<div className="flex w-full max-w-md flex-col gap-6">
							<Item>
								<ItemContent>
									<ItemTitle>Default Variant</ItemTitle>
									<ItemDescription>
										Standard styling with subtle background and borders.
									</ItemDescription>
								</ItemContent>
								<ItemActions>
									<Button variant="outline" size="sm">
										Open
									</Button>
								</ItemActions>
							</Item>
							<Item variant="outline">
								<ItemContent>
									<ItemTitle>Outline Variant</ItemTitle>
									<ItemDescription>
										Outlined style with clear borders and transparent
										background.
									</ItemDescription>
								</ItemContent>
								<ItemActions>
									<Button variant="outline" size="sm">
										Open
									</Button>
								</ItemActions>
							</Item>
							<Item variant="muted">
								<ItemContent>
									<ItemTitle>Muted Variant</ItemTitle>
									<ItemDescription>
										Subdued appearance with muted colors for secondary content.
									</ItemDescription>
								</ItemContent>
								<ItemActions>
									<Button variant="outline" size="sm">
										Open
									</Button>
								</ItemActions>
							</Item>
							<Item variant="raised">
								<ItemContent>
									<ItemTitle>Raised Variant</ItemTitle>
									<ItemDescription>
										Subdued appearance with raised colors for secondary content.
									</ItemDescription>
								</ItemContent>
								<ItemActions>
									<Button variant="outline" size="sm">
										Open
									</Button>
								</ItemActions>
							</Item>
							<Item variant="outline" size="sm" asChild>
								<a href="#">
									<ItemMedia>
										<BadgeCheckIcon className="size-5" />
									</ItemMedia>
									<ItemContent>
										<ItemTitle>Your profile has been verified.</ItemTitle>
									</ItemContent>
									<ItemActions>
										<ChevronRightIcon className="size-4" />
									</ItemActions>
								</a>
							</Item>
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
		</main>
	);
}
