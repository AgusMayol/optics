"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.svg";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/registry/agusmayol/tooltip";

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">Iconography</h1>
				<p className="text-muted-foreground text-xl">
					Beautiful & consistent icons.
				</p>
			</div>

			<p className="w-full flex items-center justify-start gap-2 px-12 pb-0 text-muted-foreground">
				This proyect loves
				<Button variant="link" className="-ml-4.5 mt-0.5" asChild>
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

			<div className="flex flex-col items-start justify-start gap-4 p-12 bg-background">
				<h2 className="text-[32px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>
				<GridContainer
					cols={12}
					border={false}
					rows={5}
					className="[&>*:not(:first-child)]:!border-t [&>*]:py-4"
				>
					<GridRow>
						<GridItem
							span={4}
							className="text-xs font-semibold justify-start gap-1"
						>
							<ALargeSmall />
							Name
						</GridItem>
						<GridItem span={4} className="text-xs font-semibold gap-1 mr-4">
							<Binary size={16} />
							Type
						</GridItem>
						<GridItem span={4} className="text-xs font-semibold gap-1 mr-4">
							<CircleDashed size={16} />
							Default
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={4}
							className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
						>
							size
						</GridItem>
						<GridItem span={4} className="text-xs font-mono">
							number
						</GridItem>
						<GridItem span={4} className="text-xs font-mono tabular-nums">
							24
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={4}
							className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
						>
							color
						</GridItem>
						<GridItem span={4} className="text-xs font-mono">
							string
						</GridItem>
						<GridItem span={4} className="text-xs font-mono">
							currentColor
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={4}
							className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
						>
							strokeWidth
						</GridItem>
						<GridItem span={4} className="text-xs font-mono">
							number
						</GridItem>
						<GridItem span={4} className="text-xs font-mono tabular-nums">
							2
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={4}
							className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
						>
							absoluteStrokeWidth
						</GridItem>
						<GridItem span={4} className="text-xs font-mono">
							boolean
						</GridItem>
						<GridItem span={4} className="text-xs font-mono">
							false
						</GridItem>
					</GridRow>
				</GridContainer>
			</div>
		</main>
	);
}
