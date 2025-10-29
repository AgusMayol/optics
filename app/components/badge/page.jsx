"use client";
import { Button } from "@/registry/agusmayol/button";
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

import { AspectRatio } from "@/registry/agusmayol/aspect-ratio";
import { BadgeCheckIcon } from "lucide-react";
import { Badge } from "@/registry/agusmayol/badge";

const code = [
	{
		language: "jsx",
		filename: "card.jsx",
		code: `import { BadgeCheckIcon } from "lucide-react"
import { Badge } from "@/registry/agusmayol/badge"
        
        
<div className="flex flex-col items-center gap-2">
    <div className="flex w-full flex-wrap gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="raised">Raised</Badge>
    </div>
    <div className="flex w-full flex-wrap gap-2">
        <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
        >
            <BadgeCheckIcon />
            Verified
        </Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
            8
        </Badge>
        <Badge
            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            variant="destructive"
        >
            99
        </Badge>
        <Badge
            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            variant="outline"
        >
            20+
        </Badge>
    </div>
</div>`,
	},
];
export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">Badge</h1>
				<p className="text-muted-foreground text-xl">
                Displays a badge or a component that looks like a badge.
				</p>
			</div>
			<div className="flex flex-col flex-1 gap-8 p-12 bg-background">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						{/* Component */}
						<div className="flex flex-col items-center gap-2">
							<div className="flex w-full flex-wrap gap-2">
								<Badge>Badge</Badge>
								<Badge variant="secondary">Secondary</Badge>
								<Badge variant="destructive">Destructive</Badge>
								<Badge variant="outline">Outline</Badge>
								<Badge variant="raised">Raised</Badge>
							</div>
							<div className="flex w-full flex-wrap gap-2">
								<Badge
									variant="secondary"
									className="bg-blue-500 text-white dark:bg-blue-600"
								>
									<BadgeCheckIcon />
									Verified
								</Badge>
								<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
									8
								</Badge>
								<Badge
									className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
									variant="destructive"
								>
									99
								</Badge>
								<Badge
									className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
									variant="outline"
								>
									20+
								</Badge>
							</div>
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
