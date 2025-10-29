"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.svg";
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

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">Typography</h1>
				<p className="text-muted-foreground text-xl">
					Rules of typesetting throughout the system.
				</p>
			</div>

			<div className="flex flex-col items-end justify-start gap-4 p-12 bg-background">
				<GridContainer
					cols={12}
					rows={11}
					border={false}
					gap={4}
					className="[&>*:not(:first-child)]:!border-t"
				>
					<GridRow>
						<GridItem
							span={7}
							className="text-xs font-semibold justify-start gap-1"
						>
							<ALargeSmall />
							Example
						</GridItem>
						<GridItem span={2} className="text-xs font-semibold gap-1 mr-4">
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
						<GridItem span={2} className="text-xs font-semibold gap-1 mr-4">
							<Info size={16} />
							Usage
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={7}
							className="justify-start text-[72px] leading-[1.1] tracking-[-0.03em] font-bold"
						>
							Heading 72
						</GridItem>
						<GridItem span={2} className="text-xs font-mono">
							text-[72px] leading-[1.1] tracking-[-0.03em] font-bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs">
							Marketing heroes.
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={7}
							className="justify-start text-[64px] leading-[1.1] tracking-[-0.03em] font-bold"
						>
							Heading 64
						</GridItem>
						<GridItem span={2} className="text-xs font-mono">
							text-[64px] leading-[1.1] tracking-[-0.03em] font-bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={7}
							className="justify-start text-[56px] leading-[1.1] tracking-[-0.03em] font-bold"
						>
							Heading 56
						</GridItem>
						<GridItem span={2} className="text-xs font-mono">
							text-[56px] leading-[1.1] tracking-[-0.03em] font-bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={7}
							className="justify-start text-[48px] leading-[1.1] tracking-[-0.03em] font-bold"
						>
							Heading 48
						</GridItem>
						<GridItem span={2} className="text-xs font-mono">
							text-[48px] leading-[1.1] tracking-[-0.03em] font-bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={7}
							className="justify-start text-[40px] leading-[1.1] tracking-[-0.03em] font-bold"
						>
							Heading 40
						</GridItem>
						<GridItem span={2} className="text-xs font-mono">
							text-[40px] leading-[1.1] tracking-[-0.03em] font-bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={7}
							className="justify-start text-[32px] leading-[1.2] tracking-[-0.02em] font-bold gap-1"
						>
							Heading 32{" "}
							<strong className="text-muted-foreground font-medium">
								with Subtle
							</strong>
						</GridItem>
						<GridItem span={2} className="text-xs font-mono">
							text-[32px] leading-[1.2] tracking-[-0.02em] font-bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs">
							Marketing subheadings, paragraphs, and dashboard headings.
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={7}
							className="justify-start text-[24px] leading-[1.2] tracking-[-0.02em] font-bold gap-1"
						>
							Heading 24{" "}
							<strong className="text-muted-foreground font-medium">
								with Subtle
							</strong>
						</GridItem>
						<GridItem span={2} className="text-xs font-mono">
							text-[24px] leading-[1.2] tracking-[-0.02em] font-bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={7}
							className="justify-start text-[20px] leading-[1.3] tracking-[-0.01em] font-bold gap-1"
						>
							Heading 20{" "}
							<strong className="text-muted-foreground font-medium">
								with Subtle
							</strong>
						</GridItem>
						<GridItem span={2} className="text-xs font-mono">
							text-[20px] leading-[1.3] tracking-[-0.01em] font-bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={7}
							className="justify-start text-[16px] leading-[1.3] tracking-[-0.01em] font-bold gap-1"
						>
							Heading 16{" "}
							<strong className="text-muted-foreground font-medium">
								with Subtle
							</strong>
						</GridItem>
						<GridItem span={2} className="text-xs font-mono">
							text-[16px] leading-[1.3] tracking-[-0.01em] font-bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs">
							—
						</GridItem>
					</GridRow>
					<GridRow>
						<GridItem
							span={7}
							className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em] font-bold"
						>
							Heading 14
						</GridItem>
						<GridItem span={2} className="text-xs font-mono">
							text-[14px] leading-[1.4] tracking-[-0.01em] font-bold
						</GridItem>
						<GridItem />
						<GridItem span={2} className="text-xs">
							—
						</GridItem>
					</GridRow>
				</GridContainer>
			</div>
		</main>
	);
}
