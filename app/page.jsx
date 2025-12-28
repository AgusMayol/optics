"use client";
import { Button } from "@/registry/optics/button";
import {
	Snippet,
	SnippetCopyButton,
	SnippetTabsContent,
} from "@/registry/optics/code-snippet";
import { GridContainer, GridItem, GridRow } from "@/registry/optics/grid";
import { Input } from "@/registry/optics/input";
import { Dithering } from "@paper-design/shaders-react";
import {
	AppWindowMac,
	ArrowRight,
	ArrowUpRight,
	BadgeCheck,
	Brush,
	Check,
	Command,
	Compass,
	Crown,
	Database,
	Feather,
	Gem,
	Heart,
	Infinity,
	Layers,
	Lightbulb,
	Palette,
	Plus,
	Puzzle,
	Rocket,
	Shapes,
	Shield,
	Sparkle,
	Sparkles,
	Star,
	Wand2,
	X,
	Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useIsLight } from "@/hooks/use-get-theme";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function Home() {
	const [state, setState] = React.useState(false);
	const isMobile = useIsMobile();
	const isLight = useIsLight();

	React.useEffect(() => {
		//Alternar estado cada X segundos
		setTimeout(() => {
			setState(!state);
		}, 2500);
	}, [state]);

	return (
		<main className="flex flex-col flex-1 bg-background">
			<div className="flex flex-col gap-4 p-6 lg:p-12 relative lg:pb-20">
				<h1 className="text-32 tracking-tight! truncate">
					@optics/design-system
				</h1>
				<p className="text-muted-foreground text-20 font-normal! text-pretty">
					More than just a design system. It&apos;s a collection of tools and
					resources that help build a more accessible, intuitive, and
					aesthetically pleasing web applications.
				</p>
			</div>

			<GridContainer cols={4} rows={isMobile ? 10 : 6}>
				<GridItem
					span={4}
					borderLeft={false}
					borderRight={false}
					borderTop={true}
					decorationTopLeft={!isMobile}
					className="w-full rounded-none flex flex-col items-center justify-center px-0 lg:px-12 gap-8 relative z-10"
				>
					<p className="text-center text-3xl lg:text-5xl text-balance font-bold font-serif tracking-wide text-foreground truncate py-1 select-none">
						"Design is not just what it looks like and feels like. Design is how
						it works."
					</p>
					<span className="text-muted-foreground text-sm font-semibold truncate select-none">
						- Steve Jobs -
					</span>
					<Dithering
						colorBack={isLight ? "#ffffff" : "#0a0a0a"}
						colorFront="#6cace4"
						shape="warp"
						type="4x4"
						size={2}
						speed={0.08}
						className="w-full h-full absolute top-0 left-0 opacity-30 -z-10"
					/>
				</GridItem>
				<GridItem
					span={isMobile ? 4 : 2}
					borderLeft={false}
					borderRight={!isMobile}
					borderTop={true}
					className="justify-start items-start"
				>
					<Button
						variant="ghost"
						animation="none"
						className="w-full h-full rounded-none hover:bg-sidebar/75"
						nativeButton={false}
						render={
							<Link
								href="/core/typography"
								className="!p-5 !py-7 flex flex-col items-start !justify-between group [background-image:url('/images/sections/typography.svg')] bg-no-repeat bg-cover bg-center"
							>
								<div className="relative -bottom-38 left-0 w-full">
									<h2 className="text-base text-foreground truncate">
										Typography
									</h2>
									<p className="text-muted-foreground font-normal truncate">
										Rules of typesetting throughout the system.
									</p>
								</div>
							</Link>
						}
					/>
				</GridItem>
				<GridItem
					span={isMobile ? 4 : 2}
					borderRight={false}
					borderLeft={!isMobile}
					borderTop={true}
					className="justify-start items-start"
				>
					<Button
						variant="ghost"
						animation="none"
						className="w-full h-full rounded-none hover:bg-sidebar/75"
						nativeButton={false}
						render={
							<Link
								href="/core/colors"
								className="!p-5 !py-7 flex flex-col items-start !justify-between group"
							>
								<div className="w-full flex items-center justify-between">
									<div className="w-9 h-32 border rounded-full squircle-none p-2 shadow-xs bg-background">
										<div
											className="w-full h-full rounded-full squircle-none relative"
											style={{ backgroundColor: "oklch(0.8 0.193 280)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full squircle-none p-2 shadow-xs bg-background">
										<div
											className="w-full h-full rounded-full squircle-none relative"
											style={{ backgroundColor: "oklch(0.8 0.193 254.9)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full squircle-none p-2 shadow-xs bg-background">
										<div
											className="w-full h-full rounded-full squircle-none relative"
											style={{ backgroundColor: "oklch(0.8 0.193 220)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full squircle-none p-2 shadow-xs bg-background">
										<div
											className="w-full h-full rounded-full squircle-none relative"
											style={{ backgroundColor: "oklch(0.8 0.193 180)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full p-2 shadow-xs bg-background">
										<div
											className="w-full h-full rounded-full squircle-none relative"
											style={{ backgroundColor: "oklch(0.8 0.193 140)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full squircle-none p-2 shadow-xs bg-background">
										<div
											className="w-full h-full rounded-full squircle-none relative"
											style={{ backgroundColor: "oklch(0.905 0.166 98.1)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full squircle-none p-2 shadow-xs bg-background">
										<div
											className="w-full h-full rounded-full squircle-none relative"
											style={{ backgroundColor: "oklch(0.8 0.193 60)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full squircle-none p-2 shadow-xs bg-background">
										<div
											className="w-full h-full rounded-full squircle-none relative"
											style={{ backgroundColor: "oklch(0.8 0.193 20)" }}
										>
											<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-full border border-black/5 dark:border-white/5" />
										</div>
									</div>
									<div className="w-9 h-32 border rounded-full squircle-none p-2 shadow-xs bg-background">
										<div
											className="w-full h-full rounded-full squircle-none relative"
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
						}
					/>
				</GridItem>
				<GridItem
					borderLeft={false}
					borderRight={!isMobile}
					borderTop={true}
					span={isMobile ? 4 : 2}
					className="justify-start items-start"
				>
					<Button
						variant="ghost"
						animation="none"
						className="w-full rounded-none hover:bg-sidebar/75"
						nativeButton={false}
						render={
							<Link
								href="/components"
								className="!p-5 !py-7 w-full h-full flex flex-col items-start !justify-between group"
							>
								<div className="w-full flex flex-col gap-4 mt-4">
									<Snippet value={null} className="border  border-border!">
										<SnippetTabsContent
											value={null}
											className="w-full text-start flex items-center !justify-between py-1 pr-1 text-muted-foreground truncate !text-xs"
											textClassName="!text-xs"
										>
											bunx --bun shadcn@latest add grid
											<SnippetCopyButton value={null} />
										</SnippetTabsContent>
									</Snippet>

									<div className="w-full flex gap-4">
										<div className="flex items-center justify-start gap-2">
											<div className="w-3 h-3 rounded-full squircle-none bg-[#ff5f56]" />
											<div className="w-3 h-3 rounded-full squircle-none bg-[#ffbd2e]" />
											<div className="w-3 h-3 rounded-full squircle-none bg-[#27c93f]" />
										</div>
										<Button
											className="text-xs truncate min-w-24 bg-background! group-hover:bg-background text-muted-foreground border-border!"
											variant="outline"
										>
											Call to Action
										</Button>
										<Button
											size="icon"
											variant="outline"
											className="truncate bg-background! group-hover:bg-background text-muted-foreground border-border!"
											role="button"
											aria-label="Add"
										>
											<span className="sr-only">Add</span>
											<Plus size="4" />
										</Button>

										<Input
											type="email"
											name="email"
											placeholder="Email Address"
											className="flex-1 text-xs placeholder:text-xs pointer-events-none disabled:opacity-100 !bg-background group-hover:!bg-background border-border!"
										/>
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
						}
					/>
				</GridItem>
				<GridItem
					span={isMobile ? 4 : 2}
					borderRight={false}
					borderLeft={!isMobile}
					borderTop={true}
					className="justify-start items-start"
				>
					<Button
						variant="ghost"
						animation="none"
						className="w-full rounded-none hover:bg-sidebar/75"
						nativeButton={false}
						render={
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
						}
					/>
				</GridItem>
				<GridItem
					borderLeft={false}
					span={isMobile ? 4 : 2}
					borderRight={!isMobile}
					borderTop={true}
					className="justify-start items-start"
				>
					<Button
						variant="ghost"
						animation="none"
						className="w-full rounded-none hover:bg-sidebar/75"
						nativeButton={false}
						render={
							<Link
								href="/resources/animations"
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
												"transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg border border-border border-dashed flex items-center justify-center gap-4",
												state
													? "scale-100 opacity-100 blur-0"
													: "blur-xs scale-[0.25] opacity-0",
											)}
										>
											<div
												className={cn(
													"transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg border border-border border-dashed flex items-center justify-center",
													state
														? "scale-100 opacity-100 blur-0"
														: "blur-xs scale-[0.25] opacity-0",
												)}
											>
												<div
													className={cn(
														"transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg border border-border border-dashed flex items-center justify-center",
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
													"transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg border border-border border-dashed flex items-center justify-center",
													state
														? "scale-100 opacity-100 blur-0"
														: "blur-xs scale-[0.25] opacity-0",
												)}
											>
												<div
													className={cn(
														"transition-all duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-lg border border-border border-dashed flex items-center justify-center",
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
											"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-full border border-border border-dashed flex items-center justify-center gap-4",
											state
												? "blur-xs scale-[0.25] opacity-0"
												: "scale-100 opacity-100 blur-0",
										)}
									>
										<div
											className={cn(
												"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-full border border-border border-dashed flex items-center justify-center",
												state
													? "blur-xs scale-[0.25] opacity-0"
													: "scale-100 opacity-100 blur-0",
											)}
										>
											<div
												className={cn(
													"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-full border border-border border-dashed flex items-center justify-center",
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
												"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-full border border-border border-dashed flex items-center justify-center",
												state
													? "blur-xs scale-[0.25] opacity-0"
													: "scale-100 opacity-100 blur-0",
											)}
										>
											<div
												className={cn(
													"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter] p-4 rounded-full border border-border border-dashed flex items-center justify-center",
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
						}
					/>
				</GridItem>
				<GridItem
					span={isMobile ? 4 : 2}
					borderRight={false}
					borderLeft={!isMobile}
					borderTop={true}
					className="justify-start items-start"
				>
					<Button
						variant="ghost"
						animation="none"
						className="w-full rounded-none bg-transparent hover:bg-sidebar/75"
						nativeButton={false}
						render={
							<Link
								href="/resources/accesibility"
								className="!p-5 !py-7 w-full h-full flex flex-col items-start !justify-between [background-image:url('/images/sections/accessibility.svg')] bg-no-repeat bg-cover bg-center"
							>
								<div className="relative -bottom-38 left-0 w-full">
									<h2 className="text-base text-foreground truncate">
										Accessibility
									</h2>
									<p className="text-muted-foreground font-normal truncate">
										Content that everyone can access.
									</p>
								</div>
							</Link>
						}
					/>
				</GridItem>
				<GridItem
					borderLeft={false}
					span={isMobile ? 4 : 2}
					borderRight={!isMobile}
					borderTop={true}
					className="justify-start items-start"
				>
					<Button
						variant="ghost"
						animation="none"
						className="w-full rounded-none hover:bg-sidebar/75"
						nativeButton={false}
						render={
							<Link
								href="/collections/cursor-rules"
								className="!p-5 !py-7 w-full h-full flex flex-col items-start !justify-between group [background-image:url('/images/sections/cursor-rules.svg')] bg-no-repeat bg-cover bg-center"
							>
								<div className="relative -bottom-38 left-0 w-full">
									<h2 className="text-base text-foreground truncate">
										Cursor Rules & MCPs
									</h2>
									<p className="text-muted-foreground font-normal truncate">
										Rules that can be used to make Cursor more efficient.
									</p>
								</div>
							</Link>
						}
					/>
				</GridItem>

				<GridItem
					borderRight={false}
					span={isMobile ? 4 : 2}
					borderLeft={!isMobile}
					borderTop={true}
					className="justify-start items-start"
				>
					<Button
						variant="ghost"
						animation="none"
						className="w-full rounded-none hover:bg-sidebar/75"
						nativeButton={false}
						render={
							<Link
								href="/resources/security"
								className="!p-5 !py-7 w-full h-full flex flex-col items-start !justify-between group [background-image:url('/images/sections/security.svg')] bg-no-repeat bg-cover bg-center"
							>
								<div className="relative -bottom-38 left-0 w-full">
									<h2 className="text-base text-foreground truncate">
										Security
									</h2>
									<p className="text-muted-foreground font-normal truncate">
										Best practices for your project.
									</p>
								</div>
							</Link>
						}
					/>
				</GridItem>
				<GridItem
					span={4}
					borderTop={true}
					borderLeft={false}
					borderRight={false}
					decorationTopRight={!isMobile}
					className="flex items-end justify-end p-4"
				>
					<Button
						variant="muted"
						render={
							<Link href="/installation">
								Installation
								<ArrowRight />
							</Link>
						}
						nativeButton={false}
						size="lg"
					/>
				</GridItem>
			</GridContainer>
		</main>
	);
}
