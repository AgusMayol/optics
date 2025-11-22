"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";

import { ALargeSmall, ArrowLeft, Info } from "lucide-react";
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
import { Separator } from "@/registry/agusmayol/separator";

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
					Materials
				</h1>
				<p className="text-muted-foreground text-base lg:text-xl">
					Materials are the building blocks of the system.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-4">
				<div className="flex flex-col gap-2 -mb-24">
					<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
						Surface
					</h2>
					<p className="text-muted-foreground text-md">On the page.</p>
				</div>
				<GridContainer
					cols={12}
					rows={5}
					border={false}
					gap={0}
					className="[&>*:not(:first-child)]:!border-t [&>*:not(:first-child)]:hover:bg-muted [&>*:not(:first-child)]:py-1"
				>
					<GridRow className="items-end pb-8">
						<GridItem
							span={4}
							className="text-xs font-semibold justify-start gap-1"
						>
							<ALargeSmall />
							Example
						</GridItem>
						<GridItem span={2} />
						<GridItem
							span={2}
							className="text-xs font-semibold gap-1 mr-auto text-balance"
						>
							<svg
								className="size-4"
								fill="none"
								viewBox="0 0 54 33"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#prefix__clip0)">
									<path
										clipRule="evenodd"
										d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
										fill="#38bdf8"
										fillRule="evenodd"
									></path>
								</g>
							</svg>
							ClassName
						</GridItem>
						<GridItem span={2} />
						<GridItem
							span={2}
							className="text-xs font-semibold gap-1 mr-auto text-balance"
						>
							<Info size={16} />
							Usage
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={4} className="flex justify-start py-4 pl-2">
							<div className="border bg-background rounded-md aspect-video p-18"></div>
						</GridItem>
						<GridItem span={2} />
						<GridItem span={2} className="text-xs font-mono text-balance">
							border bg&#8209;background rounded&#8209;md
						</GridItem>
						<GridItem span={2} />
						<GridItem span={2} className="text-xs text-balance">
							Everyday use. Radius 4px.
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={4} className="flex justify-start py-4 pl-2">
							<div className="border bg-background rounded-md aspect-video p-18 shadow-xs"></div>
						</GridItem>
						<GridItem span={2} />
						<GridItem span={2} className="text-xs font-mono text-balance">
							border bg&#8209;background rounded&#8209;md shadow&#8209;xs
						</GridItem>
						<GridItem span={2} />
						<GridItem span={2} className="text-xs text-balance">
							Slightly raised. Radius 4px.
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={4} className="flex justify-start py-4 pl-2">
							<div className="border bg-background rounded-lg aspect-video p-18 shadow-md"></div>
						</GridItem>
						<GridItem span={2} />
						<GridItem span={2} className="text-xs font-mono text-balance">
							border bg&#8209;background rounded&#8209;lg shadow&#8209;md
						</GridItem>
						<GridItem span={2} />
						<GridItem span={2} className="text-xs text-balance">
							Further raised. Radius 8px.
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={4} className="flex justify-start py-4 pl-2">
							<div className="border bg-background rounded-2xl aspect-video p-18 shadow-xl"></div>
						</GridItem>
						<GridItem span={2} />
						<GridItem span={2} className="text-xs font-mono text-balance">
							border bg&#8209;background rounded&#8209;2xl shadow&#8209;xl
						</GridItem>
						<GridItem span={2} />
						<GridItem span={2} className="text-xs text-balance">
							Highly raised. Radius 16px.
						</GridItem>
					</GridRow>
				</GridContainer>
			</div>
		</main>
	);
}
