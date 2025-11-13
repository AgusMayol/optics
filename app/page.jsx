"use client";
import * as React from "react";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import { Button } from "@/registry/agusmayol/button";
import { ScrollArea } from "@/registry/agusmayol/scroll-area";
import Image from "next/image";
import Link from "next/link";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/agusmayol/code-snippet";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Window,
	WindowAction,
	WindowContent,
	// WindowDescription,
	WindowFooter,
	WindowHeader,
	WindowTitle,
} from "@/registry/agusmayol/window";
import { MessageBox } from "../registry/agusmayol/message-box";
import {
	Brush,
	AppWindowMac,
	Zap,
	Star,
	Heart,
	Crown,
	Feather,
	Rocket,
	Sparkle,
	Wand2,
	Layers,
	Compass,
	Shield,
	Sparkles,
	Palette,
	Command,
	ArrowUpRight,
	BadgeCheck,
	Database,
	Shapes,
	Lightbulb,
	Puzzle,
	Gem,
	Infinity,
	Ear,
	Accessibility,
	PersonStanding,
	Eye,
	Speech,
	Contrast,
	ClosedCaption,
	Glasses,
	ChartSpline,
	Plus,
	Mail,
	Monitor,
	Smartphone,
	Check,
	X,
} from "lucide-react";

import { AnimationsBackground } from "@/components/animations-background";
import { cn } from "@/lib/utils";

export default function Home() {
	const [state, setState] = React.useState(false);

	React.useEffect(() => {
		//Alternar estado cada X segundos
		setTimeout(() => {
			setState(!state);
		}, 2500);
	}, [state]);

	return (
		<main className="flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12">
				<h1 className="text-4xl font-bold tracking-tight truncate">
					AgusMayol's Optics
				</h1>
				<p className="text-muted-foreground text-xl text-pretty">
					A personalized design system that combines accessibility, intuitive
					functionality, curated animations and visual appeal.
				</p>
			</div>
			<GridContainer cols={4} rows={6}>
				<GridRow>
					<GridItem
						span={4}
						borderLeft={false}
						borderRight={false}
						decorationTopLeft
						className="justify-start items-start"
					>
						<Button
							variant="ghost"
							className="w-full h-[calc(100%-1px)] rounded-none flex flex-col items-center justify-center px-12 gap-8"
						>
							<p className="text-center text-5xl text-balance font-bold font-serif tracking-wide text-foreground truncate py-1">
								"Design is not just what it looks like and feels like. Design is
								how it works."
							</p>
							<span className="text-muted-foreground text-sm font-semibold truncate">
								- Steve Jobs -
							</span>
						</Button>
					</GridItem>
				</GridRow>
				<GridRow>
					<GridItem
						span={2}
						borderLeft={false}
						className="justify-start items-start h-[calc(100%-1px)]"
					>
						<Button
							variant="ghost"
							className="w-full h-full rounded-none"
							asChild
						>
							<Link
								href="/core/typography"
								className="!p-5 !py-7 flex flex-col items-start !justify-between group"
							>
								<GridContainer cols={8} rows={1} className="w-full h-full p-8">
									<GridRow className="rounded-md border-dashed">
										<GridItem span={4} className="rounded-l-md border-dashed">
											<span className="text-muted-foreground text-xl font-semibold truncate">
												Inter
											</span>
										</GridItem>
										<GridItem span={4} className="rounded-r-md border-dashed">
											<span className="text-muted-foreground text-2xl font-semibold font-serif tracking-wider truncate">
												Instrument
											</span>
										</GridItem>
									</GridRow>
								</GridContainer>
								<div className="w-full">
									<h2 className="text-base text-foreground truncate">
										Typography
									</h2>
									<p className="text-muted-foreground font-normal truncate">
										Rules of typesetting throughout the system.
									</p>
								</div>
							</Link>
						</Button>
					</GridItem>
					<GridItem
						span={2}
						borderRight={false}
						className="justify-start items-start h-[calc(100%-1px)]"
					>
						<Button
							variant="ghost"
							className="w-full h-full rounded-none"
							asChild
						>
							<Link
								href="/core/colors"
								className="!p-5 !py-7 flex flex-col items-start !justify-between group"
							>
								<div className="w-full flex items-center justify-between">
									<div className="w-9 h-32 border rounded-full p-2 shadow-xs bg-background/55">
										<div
											className="w-full h-full rounded-full relative"
											style={{ backgroundColor: "oklch(0.8 0.193 280)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full p-2 shadow-xs bg-background/55">
										<div
											className="w-full h-full rounded-full relative"
											style={{ backgroundColor: "oklch(0.8 0.193 254.9)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full p-2 shadow-xs bg-background/55">
										<div
											className="w-full h-full rounded-full relative"
											style={{ backgroundColor: "oklch(0.8 0.193 220)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full p-2 shadow-xs bg-background/55">
										<div
											className="w-full h-full rounded-full relative"
											style={{ backgroundColor: "oklch(0.8 0.193 180)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full p-2 shadow-xs bg-background/55">
										<div
											className="w-full h-full rounded-full relative"
											style={{ backgroundColor: "oklch(0.8 0.193 140)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full p-2 shadow-xs bg-background/55">
										<div
											className="w-full h-full rounded-full relative"
											style={{ backgroundColor: "oklch(0.905 0.166 98.1)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full p-2 shadow-xs bg-background/55">
										<div
											className="w-full h-full rounded-full relative"
											style={{ backgroundColor: "oklch(0.8 0.193 60)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full p-2 shadow-xs bg-background/55">
										<div
											className="w-full h-full rounded-full relative"
											style={{ backgroundColor: "oklch(0.8 0.193 20)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full p-2 shadow-xs bg-background/55">
										<div
											className="w-full h-full rounded-full relative"
											style={{ backgroundColor: "oklch(0.8 0.193 0)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
								</div>

								<div className="w-full">
									<h2 className="text-base text-foreground truncate">Colors</h2>
									<p className="text-muted-foreground font-normal truncate">
										The complete Tailwind color palette.
									</p>
								</div>
							</Link>
						</Button>
					</GridItem>
				</GridRow>
				<GridRow>
					<GridItem
						borderLeft={false}
						span={2}
						className="justify-start items-start h-[calc(100%-1px)]"
					>
						<Button variant="ghost" className="w-full rounded-none" asChild>
							<Link
								href="/components/accordion"
								className="!p-5 !py-7 w-full h-full flex flex-col items-start !justify-between group"
							>
								<div className="w-full flex flex-col gap-4 mt-4">
									<Snippet value={null} className="">
										<SnippetTabsContent
											value={null}
											className="w-full text-start text-xs flex items-center justify-between py-1 pr-1 opacity-55 text-foreground truncate"
										>
											bunx --bun shadcn@latest add grid
											<SnippetCopyButton value={null} />
										</SnippetTabsContent>
									</Snippet>

									<div className="w-full flex gap-4">
										<div className="flex items-center justify-start gap-2 opacity-55">
											<div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
											<div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
											<div className="w-3 h-3 rounded-full bg-[#27c93f]" />
										</div>
										<Button
											className="opacity-55 text-xs truncate min-w-24 bg-background"
											variant="outline"
										>
											Call to Action
										</Button>
										<Button
											size="icon"
											variant="outline"
											className="opacity-55 min-w-9 truncate bg-background"
											role="button"
											aria-label="Add"
										>
											<span className="sr-only">Add</span>
											<Plus size="4" />
										</Button>

										<div className="w-full flex opacity-55 text-foreground truncate">
											<div className="p-2 border border-r-0 dark:border-border border-zinc-300 bg-background rounded-md rounded-r-none text-xs truncate w-10 flex items-center justify-center">
												<span className="truncate">
													<Mail />
												</span>
											</div>
											<div className="w-full p-2 border dark:border-border border-zinc-300 bg-background rounded-md rounded-l-none text-xs truncate">
												<span className="truncate">Email Address</span>
											</div>
										</div>
									</div>
								</div>

								<div className="w-full">
									<h2 className="text-foreground text-base truncate">
										Components
									</h2>
									<p className="text-muted-foreground font-normal truncate">
										Clean, modern building blocks.
									</p>
								</div>
							</Link>
						</Button>
					</GridItem>
					<GridItem
						span={2}
						borderRight={false}
						className="justify-start items-start h-[calc(100%-1px)]"
					>
						<Button variant="ghost" className="w-full rounded-none" asChild>
							<Link
								href="/core/iconography"
								className="!p-5 !py-7 !pt-2 w-full h-full flex flex-col items-start !justify-between group"
							>
								<GridContainer
									cols={8}
									rows={3}
									border={false}
									className="text-muted-foreground"
								>
									<GridRow>
										<GridItem>
											<Sparkles />
										</GridItem>
										<GridItem>
											<Palette />
										</GridItem>
										<GridItem>
											<Command />
										</GridItem>
										<GridItem>
											<Layers />
										</GridItem>
										<GridItem>
											<Compass />
										</GridItem>
										<GridItem>
											<Shield />
										</GridItem>
										<GridItem>
											<Lightbulb />
										</GridItem>
										<GridItem>
											<Puzzle />
										</GridItem>
									</GridRow>
									<GridRow>
										<GridItem>
											<Brush />
										</GridItem>
										<GridItem>
											<AppWindowMac />
										</GridItem>
										<GridItem>
											<Zap />
										</GridItem>
										<GridItem>
											<Star />
										</GridItem>
										<GridItem>
											<Heart />
										</GridItem>
										<GridItem>
											<Crown />
										</GridItem>
										<GridItem>
											<Feather />
										</GridItem>
										<GridItem>
											<Rocket />
										</GridItem>
									</GridRow>
									<GridRow>
										<GridItem>
											<Database />
										</GridItem>
										<GridItem>
											<ArrowUpRight />
										</GridItem>
										<GridItem>
											<Shapes />
										</GridItem>
										<GridItem>
											<BadgeCheck />
										</GridItem>
										<GridItem>
											<Infinity />
										</GridItem>
										<GridItem>
											<Sparkle />
										</GridItem>
										<GridItem>
											<Wand2 />
										</GridItem>
										<GridItem>
											<Gem />
										</GridItem>
									</GridRow>
								</GridContainer>
								<div className="w-full">
									<h2 className="text-base text-foreground truncate">
										Iconography
									</h2>
									<p className="text-muted-foreground font-normal truncate">
										Beautiful & consistent icons.
									</p>
								</div>
							</Link>
						</Button>
					</GridItem>
				</GridRow>
				<GridRow>
					<GridItem
						borderLeft={false}
						span={2}
						className="justify-start items-start h-[calc(100%-1px)]"
					>
						<Button variant="ghost" className="w-full rounded-none" asChild>
							<Link
								href="/core/layout"
								className="!p-5 !py-7 w-full h-full flex flex-col items-start !justify-between group absolute"
							>
								<div className="w-full h-full flex items-center justify-center gap-4 relative -top-7 left-0 p-4">
									<div className="p-4 rounded-lg border flex items-center justify-center">
										<GridContainer cols={4} rows={4}>
											<GridRow className="border-dashed">
												<GridItem className="p-4 border-dashed"></GridItem>
												<GridItem
													className="p-4 border-dashed"
													span={2}
												></GridItem>
												<GridItem className="p-4 border-dashed"></GridItem>
											</GridRow>
											<GridRow className="border-dashed">
												<GridItem className="p-4 border-dashed"></GridItem>
												<GridItem className="p-2 border-dashed" span={2}>
													<Monitor className="!size-10 text-muted-foreground absolute top-0 left-[1/4] mt-3.5 stroke-1" />
												</GridItem>
												<GridItem className="p-4 border-dashed"></GridItem>
											</GridRow>
											<GridRow className="border-t-0 border-dashed">
												<GridItem className="p-4 border-dashed"></GridItem>
												<GridItem
													className="p-2 border-dashed"
													span={2}
												></GridItem>
												<GridItem className="p-4 border-dashed"></GridItem>
											</GridRow>
											<GridRow className="-mt-[1px] border-dashed">
												<GridItem className="p-4 border-dashed"></GridItem>
												<GridItem
													className="p-4 border-dashed"
													span={2}
												></GridItem>
												<GridItem className="p-4 border-dashed"></GridItem>
											</GridRow>
										</GridContainer>
									</div>

									<div className="p-4 rounded-lg border flex items-center justify-center">
										<GridContainer cols={4} rows={4}>
											<GridRow className="border-dashed">
												<GridItem className="p-4 border-dashed"></GridItem>
												<GridItem
													className="p-4 border-dashed"
													span={2}
												></GridItem>
												<GridItem className="p-4 border-dashed"></GridItem>
											</GridRow>
											<GridRow className="border-dashed">
												<GridItem className="p-4 border-dashed"></GridItem>
												<GridItem className="p-2 border-dashed" span={2}>
													<Smartphone className="!size-10 text-muted-foreground absolute top-0 left-[1/4] mt-3.5 stroke-1" />
												</GridItem>
												<GridItem className="p-4 border-dashed"></GridItem>
											</GridRow>
											<GridRow className="border-t-0 border-dashed">
												<GridItem className="p-4 border-dashed"></GridItem>
												<GridItem
													className="p-2 border-dashed"
													span={2}
												></GridItem>
												<GridItem className="p-4 border-dashed"></GridItem>
											</GridRow>
											<GridRow className="-mt-[1px] border-dashed">
												<GridItem className="p-4 border-dashed"></GridItem>
												<GridItem
													className="p-4 border-dashed"
													span={2}
												></GridItem>
												<GridItem className="p-4 border-dashed"></GridItem>
											</GridRow>
										</GridContainer>
									</div>
								</div>

								<div className="relative -top-12 left-0 w-full">
									<h2 className="text-base text-foreground truncate">Layout</h2>
									<p className="text-muted-foreground font-normal truncate">
										Consistent layout that adapts to various contexts.
									</p>
								</div>
							</Link>
						</Button>
					</GridItem>
					<GridItem
						span={2}
						borderRight={false}
						className="justify-start items-start h-[calc(100%-1px)]"
					>
						<Button variant="ghost" className="w-full rounded-none" asChild>
							<Link
								href="/core/accesibility"
								className="!p-5 !py-7 w-full h-full flex flex-col items-start !justify-between absolute"
							>
								<div className="w-full h-full flex items-center justify-center relative top-0 left-0 p-4">
									<div className="p-8 rounded-full border border-dashed flex items-center justify-center">
										<div className="p-8 rounded-full border border-dashed flex items-center justify-center">
											<div className="p-4 rounded-full border border-dashed flex items-center justify-center">
												<PersonStanding className="!size-10 text-muted-foreground" />
											</div>
										</div>
									</div>
								</div>

								<div className="relative -top-12 left-0 w-full">
									<h2 className="text-base text-foreground truncate">
										Accessibility
									</h2>
									<p className="text-muted-foreground font-normal truncate">
										Content that everyone can access.
									</p>
								</div>
							</Link>
						</Button>
					</GridItem>
				</GridRow>

				<GridRow className="border-b">
					<GridItem
						borderLeft={false}
						span={2}
						className="justify-start items-start"
					>
						<Button variant="ghost" className="w-full rounded-none" asChild>
							<Link
								href="/core/materials"
								className="!p-5 !py-7 w-full h-full flex flex-col items-start !justify-between group absolute"
							>
								<GridContainer
									cols={9}
									rows={3}
									className="relative -top-2.5 left-0"
								>
									<GridRow>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
									</GridRow>
									<GridRow>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
									</GridRow>
									<GridRow>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
										<GridItem className="bg-zinc-50 !border-l-4 !border-t-4 border-l-zinc-200 border-t-zinc-200 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1)] hover:brightness-105 transition-all"></GridItem>
										<GridItem className="bg-sky-700 !border-l-4 !border-t-4 border-l-sky-900 border-t-sky-900 shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"></GridItem>
									</GridRow>
								</GridContainer>

								<div className="relative -top-1.5 left-0 w-full">
									<h2 className="text-base text-foreground truncate">
										Materials
									</h2>
									<p className="text-muted-foreground font-normal truncate">
										Visual effect that creates a sense of depth.
									</p>
								</div>
							</Link>
						</Button>
					</GridItem>

					<GridItem
						borderRight={false}
						span={2}
						className="justify-start items-start"
					>
						<Button variant="ghost" className="w-full rounded-none" asChild>
							<Link
								href="/core/animations"
								className="!p-5 !py-7 w-full h-full flex flex-col items-start !justify-between group absolute"
							>
								<div className="w-full h-full flex items-center justify-center relative -top-2.5 left-0 p-4">
									<div
										className={cn(
											"absolute inset-0 transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg flex items-center justify-center gap-4",
											state
												? "scale-100 opacity-100 blur-0"
												: "blur-xs scale-[0.25] opacity-0",
										)}
									>
										<div
											className={cn(
												"transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg border border-dashed flex items-center justify-center gap-4",
												state
													? "scale-100 opacity-100 blur-0"
													: "blur-xs scale-[0.25] opacity-0",
											)}
										>
											<div
												className={cn(
													"transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg border border-dashed flex items-center justify-center",
													state
														? "scale-100 opacity-100 blur-0"
														: "blur-xs scale-[0.25] opacity-0",
												)}
											>
												<div
													className={cn(
														"transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg border border-dashed flex items-center justify-center",
														state
															? "scale-100 opacity-100 blur-0"
															: "blur-xs scale-[0.25] opacity-0",
													)}
												>
													<Check className="!size-6 text-muted-foreground" />
												</div>
											</div>
											<div
												className={cn(
													"transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg border border-dashed flex items-center justify-center",
													state
														? "scale-100 opacity-100 blur-0"
														: "blur-xs scale-[0.25] opacity-0",
												)}
											>
												<div
													className={cn(
														"transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg border border-dashed flex items-center justify-center",
														state
															? "scale-100 opacity-100 blur-0"
															: "blur-xs scale-[0.25] opacity-0",
													)}
												>
													<X className="!size-6 text-muted-foreground" />
												</div>
											</div>
										</div>
									</div>

									<div
										className={cn(
											"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-full border border-dashed flex items-center justify-center gap-4",
											state
												? "blur-xs scale-[0.25] opacity-0"
												: "scale-100 opacity-100 blur-0",
										)}
									>
										<div
											className={cn(
												"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-full border border-dashed flex items-center justify-center",
												state
													? "blur-xs scale-[0.25] opacity-0"
													: "scale-100 opacity-100 blur-0",
											)}
										>
											<div
												className={cn(
													"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-full border border-dashed flex items-center justify-center",
													state
														? "blur-xs scale-[0.25] opacity-0"
														: "scale-100 opacity-100 blur-0",
												)}
											>
												<X className="!size-6 text-muted-foreground" />
											</div>
										</div>

										<div
											className={cn(
												"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-full border border-dashed flex items-center justify-center",
												state
													? "blur-xs scale-[0.25] opacity-0"
													: "scale-100 opacity-100 blur-0",
											)}
										>
											<div
												className={cn(
													"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-full border border-dashed flex items-center justify-center",
													state
														? "blur-xs scale-[0.25] opacity-0"
														: "scale-100 opacity-100 blur-0",
												)}
											>
												<Check className="!size-6 text-muted-foreground" />
											</div>
										</div>
									</div>
								</div>

								<div className="relative -top-2.5 left-0 w-full">
									<h2 className="text-base text-foreground truncate">
										Animations
									</h2>
									<p className="text-muted-foreground font-normal truncate">
										Transitions that enhance the user experience.
									</p>
								</div>
							</Link>
						</Button>
					</GridItem>
				</GridRow>
				<GridRow borderBottom={false} borderTop={false}>
					<GridItem
						span={4}
						borderLeft={false}
						borderRight={false}
						decorationTopRight
						className="mt-[1px]"
					></GridItem>
				</GridRow>
			</GridContainer>
		</main>
	);
}
