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
					Typography
				</h1>
				<p className="text-muted-foreground text-base lg:text-xl">
					Rules of typesetting throughout the system.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-end justify-start gap-4 p-6 lg:p-12 pt-0">
				<GridContainer
					cols={12}
					rows={11}
					border={false}
					gap={0}
					className="[&>*:not(:first-child)]:!border-t [&>*:not(:first-child)]:hover:bg-muted [&>*:not(:first-child)]:py-1 [&>*:not(:first-child)]:px-2"
				>
					<GridRow>
						<GridItem
							span={7}
							className="text-xs font-semibold justify-start gap-1"
						>
							<ALargeSmall />
							Example
						</GridItem>
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
						<GridItem />
						<GridItem
							span={2}
							className="text-xs font-semibold gap-1 mx-auto text-balance"
						>
							<Info size={16} />
							Usage
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={7} className="justify-start text-72">
							Heading 72
						</GridItem>
						<GridItem span={2} className="text-xs font-mono text-balance">
							text&#8209;[72px] leading&#8209;[1.1]
							tracking&#8209;[&#8209;0.03em] font&#8209;bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs text-balance">
							Marketing heroes.
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={7} className="justify-start text-64">
							Heading 64
						</GridItem>
						<GridItem span={2} className="text-xs font-mono text-balance">
							text&#8209;[64px] leading&#8209;[1.1]
							tracking&#8209;[&#8209;0.03em] font&#8209;bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs text-balance">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={7} className="justify-start text-56">
							Heading 56
						</GridItem>
						<GridItem span={2} className="text-xs font-mono text-balance">
							text&#8209;[56px] leading&#8209;[1.1]
							tracking&#8209;[&#8209;0.03em] font&#8209;bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs text-balance">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={7} className="justify-start text-48">
							Heading 48
						</GridItem>
						<GridItem span={2} className="text-xs font-mono text-balance">
							text&#8209;[48px] leading&#8209;[1.1]
							tracking&#8209;[&#8209;0.03em] font&#8209;bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs text-balance">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={7} className="justify-start text-40">
							Heading 40
						</GridItem>
						<GridItem span={2} className="text-xs font-mono text-balance">
							text&#8209;[40px] leading&#8209;[1.1]
							tracking&#8209;[&#8209;0.03em] font&#8209;bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs text-balance">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={7} className="justify-start text-32 gap-1">
							Heading 32{" "}
							<strong className="text-muted-foreground font-medium">
								with Muted
							</strong>
						</GridItem>
						<GridItem span={2} className="text-xs font-mono text-balance">
							text&#8209;[32px] leading&#8209;[1.2]
							tracking&#8209;[&#8209;0.02em] font&#8209;bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs text-balance">
							Marketing subheadings, paragraphs, and dashboard headings.
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={7} className="justify-start text-24 gap-1">
							Heading 24{" "}
							<strong className="text-muted-foreground font-medium">
								with Muted
							</strong>
						</GridItem>
						<GridItem span={2} className="text-xs font-mono text-balance">
							text&#8209;[24px] leading&#8209;[1.2]
							tracking&#8209;[&#8209;0.02em] font&#8209;bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs text-balance">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={7} className="justify-start text-20 gap-1">
							Heading 20{" "}
							<strong className="text-muted-foreground font-medium">
								with Muted
							</strong>
						</GridItem>
						<GridItem span={2} className="text-xs font-mono text-balance">
							text&#8209;[20px] leading&#8209;[1.3]
							tracking&#8209;[&#8209;0.01em] font&#8209;bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs text-balance">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={7} className="justify-start text-16 gap-1">
							Heading 16{" "}
							<strong className="text-muted-foreground font-medium">
								with Muted
							</strong>
						</GridItem>
						<GridItem span={2} className="text-xs font-mono text-balance">
							text&#8209;[16px] leading&#8209;[1.3]
							tracking&#8209;[&#8209;0.01em] font&#8209;bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs text-balance">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem span={7} className="justify-start text-14">
							Heading 14
						</GridItem>
						<GridItem span={2} className="text-xs font-mono text-balance">
							text&#8209;[14px] leading&#8209;[1.4]
							tracking&#8209;[&#8209;0.01em] font&#8209;bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs text-balance">
							—
						</GridItem>
					</GridRow>
				</GridContainer>
			</div>
		</main>
	);
}
