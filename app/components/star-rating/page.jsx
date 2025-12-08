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
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsContents,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/optics/code-snippet";
import { Separator } from "@/registry/optics/separator";
import { StarRating } from "@/registry/optics/star-rating";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import componentCode from "@/registry/optics/star-rating.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "star-rating.jsx",
		code: `import { StarRating } from "@/components/optics/star-rating";

<StarRating />
<StarRating defaultValue={3} />
<StarRating size="sm" />
<StarRating size="md" />
<StarRating size="lg" />
<StarRating totalStars={10} />
<StarRating disabled />
<StarRating onRate={(rating) => console.log(rating)} />`,
	},
];

const starRatingComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/star-rating.jsx",
		code: `"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StarRating({
	totalStars = 5,
	defaultValue = 0,
	onRate,
	size = "md",
	className,
	disabled = false,
}) {
	const [rating, setRating] = useState(defaultValue);
	const [hover, setHover] = useState(0);

	const handleRating = (star) => {
		if (disabled) return;
		setRating(star);
		onRate?.(star);
	};

	const starSizes = {
		sm: "h-4 w-4",
		md: "h-6 w-6",
		lg: "h-8 w-8",
	};

	return (
		<div
			className={cn(
				"flex items-center gap-2",
				disabled && "opacity-50",
				className,
			)}
		>
			{Array.from({ length: totalStars }, (_, index) => index + 1).map(
				(star) => (
					<motion.button
						key={star}
						type="button"
						className={cn(
							"relative focus-visible:outline-none focus-visible:ring-2",
							"focus-visible:ring-ring focus-visible:ring-offset-2",
							disabled && "cursor-not-allowed",
						)}
						onClick={() => handleRating(star)}
						onMouseEnter={() => !disabled && setHover(star)}
						onMouseLeave={() => !disabled && setHover(0)}
						whileHover={!disabled ? { scale: 1.3, rotate: -10 } : undefined}
						whileTap={!disabled ? { scale: 0.9, rotate: 15 } : undefined}
						disabled={disabled}
					>
						<motion.div
							className={cn(
								"transition-colors duration-300",
								(hover || rating) >= star
									? "text-yellow-400 dark:text-yellow-300"
									: "text-muted",
							)}
							initial={{ scale: 1 }}
							animate={{
								scale: (hover || rating) >= star ? 1.2 : 1,
							}}
							transition={{
								duration: 0.3,
								ease: "easeOut",
							}}
						>
							<Star
								className={cn(starSizes[size], "fill-current stroke-[1.5px]")}
							/>
						</motion.div>
					</motion.button>
				),
			)}
		</div>
	);
}`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/star-rating.jsx",
		code: componentCode,
	},
];

// Helper functions for cookies

export default function Page() {
	const {
		mounted,
		value,
		setValue,
		installationTab,
		handleTabChange,
		activeCommand,
		activeDepsCommand,
	} = useCookiePreferences("star-rating", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Star Rating
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://21st.dev/community/components/ayushmxxn/star-rating/default"
							target="_blank"
							rel="noopener noreferrer"
						>
							21st.dev
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					An interactive star rating component with smooth animations and
					customizable options.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-8">
						{/* Component */}
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">Default</p>
							<StarRating />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">With Value</p>
							<StarRating defaultValue={3} />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">Small</p>
							<StarRating size="sm" />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">Medium</p>
							<StarRating size="md" />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">Large</p>
							<StarRating size="lg" />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">10 Stars</p>
							<StarRating totalStars={10} />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm text-muted-foreground">Disabled</p>
							<StarRating disabled defaultValue={2} />
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
				activeCommand={activeCommand}
				activeDepsCommand={activeDepsCommand}
				componentName="star-rating"
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
							component: "<StarRating />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the star rating container.",
								},
								{
									name: "totalStars",
									type: "number (default: 5)",
									description: "Total number of stars to display.",
								},
								{
									name: "defaultValue",
									type: "number (default: 0)",
									description: "Default rating value (uncontrolled).",
								},
								{
									name: "value",
									type: "number",
									description: "The controlled rating value. Use with onRate.",
								},
								{
									name: "onRate",
									type: "(rating: number) => void",
									description: "Callback function called when rating changes.",
								},
								{
									name: "size",
									type: `"sm" | "md" | "lg" (default: "md")`,
									description: "Size of the stars.",
								},
								{
									name: "disabled",
									type: "boolean (default: false)",
									description: "Whether the rating is disabled.",
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
