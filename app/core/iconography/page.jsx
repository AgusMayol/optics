"use client";
import * as React from "react";
import { Button } from "@/registry/optics/button";
import { cn } from "@/lib/utils";

import { Badge } from "@/registry/optics/badge";
import {
	ALargeSmall,
	ArrowLeft,
	ArrowUpRight,
	Binary,
	CircleDashed,
	ExternalLink,
	Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/optics/grid";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/optics/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/optics/select";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/registry/optics/tooltip";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/optics/code-snippet";
import { Separator } from "@/registry/optics/separator";
import { PropsTable } from "@/components/props-table";

const commands = [
	{
		label: "bun",
		code: "bun add lucide-react",
	},
];

export default function Page() {
	const [value, setValue] = React.useState(commands[0].label);
	const activeCommand = commands.find((command) => command.label === value);

	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
					Iconography
				</h1>
				<p className="text-muted-foreground text-base lg:text-xl">
					Beautiful & consistent icons.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-4">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Installation
				</h2>
				<p className="w-full flex items-center justify-start text-muted-foreground gap-1">
					This design system loves{" "}
					<Button
						variant="link"
						className="text-muted-foreground hover:text-primary transition-colors"
						asChild
					>
						<Link
							href="https://lucide.dev/"
							rel="noopener noreferrer"
							target="blank"
						>
							Lucide Icons
							<ArrowUpRight size={16} className="-ml-1" />
						</Link>
					</Button>
				</p>
				<Snippet className="w-auto mt-2">
					<SnippetHeader className="pl-4 flex gap-4 bg-transparent border-0">
						<span className="text-xs font-mono">{activeCommand.code}</span>

						<SnippetCopyButton value={activeCommand.code} />
					</SnippetHeader>
					<SnippetTabsContent value={activeCommand.label}>
						{activeCommand.code}
					</SnippetTabsContent>
				</Snippet>
			</div>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>

				<PropsTable
					data={[
						{
							component: "<Icon />",
							props: [
								{
									name: "size",
									type: "number (default: 24)",
									description: "The size of the icon.",
								},
								{
									name: "color",
									type: "string (default: currentColor)",
									description: "The color of the icon.",
								},
								{
									name: "strokeWidth",
									type: "number (default: 2)",
									description: "The stroke width of the icon.",
								},
								{
									name: "absoluteStrokeWidth",
									type: "boolean (default: false)",
									description: "Whether to use absolute stroke width.",
								},
							],
						},
					]}
				/>
			</div>
		</main>
	);
}
