"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";
import {
	Layout,
	CheckCircle,
	AlertTriangle,
	Grid3X3,
	Monitor,
	Smartphone,
	Tablet,
	Ruler,
	Type,
	Space,
	ArrowUpRight,
	Info,
	Code,
	Palette,
	Zap,
	Play,
	Pause,
	RotateCcw,
	Heart,
	Copy,
	Check,
	Minus,
	Plus,
	ArrowUp,
	Sparkles,
	Wand2,
	Eye,
	MousePointer,
	Clock,
	Accessibility,
	TrendingUp,
} from "lucide-react";
import Link from "next/link";
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
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import { motion, AnimatePresence } from "motion/react";
import NumberFlow, { continuous } from "@number-flow/react";
import { useState, useEffect } from "react";
import { Separator } from "@/registry/agusmayol/separator";
import { Badge } from "@/registry/agusmayol/badge";

// Interactive Components
function AnimatedCounter() {
	const [count, setCount] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	const handleIncrement = () => {
		setIsAnimating(true);
		setCount((prev) => prev + 1);
		setTimeout(() => setIsAnimating(false), 300);
	};

	const handleDecrement = () => {
		setIsAnimating(true);
		setCount((prev) => Math.max(0, prev - 1));
		setTimeout(() => setIsAnimating(false), 300);
	};

	return (
		<div className="flex items-center gap-4 p-6 bg-muted rounded-lg">
			<Button
				variant="outline"
				size="icon"
				onClick={handleDecrement}
				disabled={count === 0}
			>
				<Minus className="h-4 w-4" />
			</Button>
			<div className="min-w-[4rem] text-center">
				<NumberFlow
					value={count}
					locales="en-US"
					format={{ useGrouping: false }}
					className="text-2xl font-bold"
					willChange
				/>
			</div>
			<Button variant="outline" size="icon" onClick={handleIncrement}>
				<Plus className="h-4 w-4" />
			</Button>
		</div>
	);
}

function AnimatedIcon() {
	const [isLiked, setIsLiked] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	const handleLike = () => {
		setIsLiked(!isLiked);
	};

	const handleCopy = () => {
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<div className="flex items-center gap-6 p-6 bg-muted rounded-lg">
			<button
				onClick={handleLike}
				className="group flex items-center gap-2 transition-colors hover:text-pink-500"
			>
				<motion.div
					animate={{
						scale: isLiked ? [1, 1.2, 1] : 1,
						rotate: isLiked ? [0, -10, 10, 0] : 0,
					}}
					transition={{ duration: 0.3 }}
				>
					<Heart
						className={cn(
							"size-6 transition-colors",
							isLiked ? "fill-pink-500 text-pink-500" : "text-muted-foreground",
						)}
					/>
				</motion.div>
			</button>

			<button onClick={handleCopy} className="button">
				<AnimatePresence mode="popLayout" initial={false}>
					<motion.div
						key={isCopied ? "check" : "copy"}
						initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
						transition={{
							type: "spring",
							duration: 0.3,
							bounce: 0,
						}}
					>
						{isCopied ? (
							<Check className="size-5.5" />
						) : (
							<Copy className="size-5.5 text-muted-foreground" />
						)}
					</motion.div>
				</AnimatePresence>
			</button>
		</div>
	);
}

function ProgressIndicator() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="p-6 bg-muted rounded-lg">
			<div className="mb-4 w-xs">
				<div className="flex justify-between text-sm text-muted-foreground mb-2 gap-8">
					<span>Progress</span>
					<div className="flex items-center gap-0.5">
						<NumberFlow
							value={progress}
							locales="es-ES"
							className="font-medium"
							willChange
						/>
						<span>%</span>
					</div>
				</div>
				<div className="w-full rounded-full h-2 overflow-hidden">
					<motion.div
						className="h-full bg-primary rounded-full"
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					/>
				</div>
			</div>
		</div>
	);
}

// Code examples
const numberFlowCode = [
	{
		language: "jsx",
		filename: "number-flow-counter.jsx",
		code: `import NumberFlow from '@number-flow/react';
import { useState } from 'react';

function AnimatedCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <NumberFlow
        value={count}
        locales="en-US"
        format={{ useGrouping: false }}
        className="text-2xl font-bold"
        willChange
      />
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}`,
	},
];

const iconAnimationCode = [
	{
		language: "jsx",
		filename: "animated-icon.jsx",
		code: `import { motion, AnimatePresence } from 'motion/react';
import { Heart, Copy, Check } from 'lucide-react';
import { useState } from 'react';

function AnimatedIcon() {
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setIsLiked(!isLiked)}>
        <motion.div
          animate={{
            scale: isLiked ? [1, 1.2, 1] : 1,
            rotate: isLiked ? [0, -10, 10, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Heart className={isLiked ? "fill-pink-500" : ""} />
        </motion.div>
      </button>

      <button onClick={() => setIsCopied(true)}>
        <AnimatePresence mode="wait">
          {isCopied ? (
            <motion.div
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Check />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Copy />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}`,
	},
];

const layoutAnimationCode = [
	{
		language: "jsx",
		filename: "layout-animation.jsx",
		code: `import { motion, AnimatePresence } from 'motion/react';

function LayoutAnimation() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    setItems(prev => [...prev, prev.length + 1]);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item !== id));
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <motion.div layout className="space-y-2">
        <AnimatePresence>
          {items.map(item => (
            <motion.div
              key={item}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="p-4 bg-muted rounded"
            >
              Item {item}
              <button onClick={() => removeItem(item)}>Remove</button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}`,
	},
];

const cssAnimationCode = [
	{
		language: "css",
		filename: "css-animations.css",
		code: `/* Smooth transitions */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* Loading animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Stagger animations */
.stagger-item {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(20px);
}

.stagger-item:nth-child(1) { animation-delay: 0.1s; }
.stagger-item:nth-child(2) { animation-delay: 0.2s; }
.stagger-item:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
	},
];

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-4">
				<h1 className="text-4xl font-bold tracking-tight">
					Web Animations Guide
				</h1>
				<p className="text-muted-foreground text-xl">
					Create beautiful, performant animations for modern web applications
					using React, Motion, and CSS.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-24 p-12 pt-4">
				{/* Introduction */}
				<div className="flex flex-col gap-4 -mt-2">
					<p className="text-muted-foreground leading-7">
						Animations enhance user experience by providing visual feedback,
						guiding attention, and creating delightful interactions. This guide
						provides practical examples and best practices for implementing
						animations in Next.js applications.
					</p>
				</div>

				{/* 1. Number Animations with NumberFlow */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://number-flow.barvian.me/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										1
									</Badge>
									Number Animations
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground leading-7">
						Smooth number transitions with NumberFlow for counters, statistics,
						and progress indicators. Perfect for dashboards and data
						visualizations.
					</p>
					<div className="flex flex-col gap-4">
						<Card className="pt-0 pb-0 bg-background">
							<CardHeader className="p-6">
								<CardTitle>Animated Counter</CardTitle>
								<CardDescription>
									Smooth number transitions for counters and statistics
								</CardDescription>
							</CardHeader>
							<CardContent className="px-6">
								<div className="flex justify-center mb-4">
									<AnimatedCounter />
								</div>
							</CardContent>
							<CardFooter className="px-0 py-0 rounded-b-xl">
								<Accordion type={"single"} collapsible className="w-full">
									<AccordionItem value="codeblock" className="rounded-b-xl">
										<AccordionTrigger
											className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
											showArrow
										>
											Show Code
										</AccordionTrigger>
										<AccordionContent
											className="border-b-0 border-x-0 border-t pb-0 shadow-none"
											keepRendered
										>
											<CodeBlock
												data={numberFlowCode}
												defaultValue={numberFlowCode[0].filename}
												className="border-none rounded-none rounded-b-xl shadow-none group"
											>
												<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
													<CodeBlockCopyButton />
												</CodeBlockHeader>
												<CodeBlockBody>
													{(item) => (
														<CodeBlockItem
															key={item.filename}
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

						<Card className="pt-0 pb-0 bg-background">
							<CardHeader className="p-6">
								<CardTitle>Progress Indicator</CardTitle>
								<CardDescription>
									Animated progress bars with smooth number transitions
								</CardDescription>
							</CardHeader>
							<CardContent className="p-6">
								<div className="flex justify-center">
									<ProgressIndicator />
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* 2. Icon Animations */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://motion.dev/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										2
									</Badge>
									Icon Animations with Motion
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground leading-7">
						Delightful icon animations using Motion (Framer Motion) for scale,
						rotation, and state changes. Add personality to your interface
						interactions.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardHeader className="p-6">
							<CardTitle>Interactive Icons</CardTitle>
							<CardDescription>
								Icon animations with scale, rotation, and state changes
							</CardDescription>
						</CardHeader>
						<CardContent className="px-6">
							<div className="flex justify-center mb-4">
								<AnimatedIcon />
							</div>
						</CardContent>
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Show Code
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={iconAnimationCode}
											defaultValue={iconAnimationCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 3. Layout Animations */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://motion.dev/docs/react-layout-animations"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										3
									</Badge>
									Layout Animations
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground leading-7">
						Animate layout changes automatically when items are added, removed,
						or reordered. Perfect for dynamic lists and grids.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Layout Animation Example
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={layoutAnimationCode}
											defaultValue={layoutAnimationCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 4. CSS Animations */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										4
									</Badge>
									Pure CSS Animations
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground leading-7">
						Lightweight CSS animations for hover effects, loading states, and
						transitions. No JavaScript required for simple animations.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										CSS Animation Examples
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={cssAnimationCode}
											defaultValue={cssAnimationCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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
			</div>

			<Separator decoration />

			{/* Animation Principles & Resources */}
			<div className="flex flex-col items-start justify-start gap-12 p-12 pt-4">
				<div className="flex flex-col gap-8">
					<h3 className="text-xl font-semibold">Animation Principles</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<Card decorations>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Clock className="h-5 w-5" />
									Timing
								</CardTitle>
							</CardHeader>
							<CardContent className="text-sm">
								<p>
									Use appropriate durations (200-300ms for micro-interactions)
									and easing functions for natural motion.
								</p>
							</CardContent>
						</Card>

						<Card decorations>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Eye className="h-5 w-5" />
									Purpose
								</CardTitle>
							</CardHeader>
							<CardContent className="text-sm">
								<p>
									Every animation should serve a clear functional purpose:
									feedback, guidance, or delight.
								</p>
							</CardContent>
						</Card>

						<Card decorations>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Zap className="h-5 w-5" />
									Performance
								</CardTitle>
							</CardHeader>
							<CardContent className="text-sm">
								<p>
									Optimize for 60fps using transform and opacity. Avoid
									animating layout properties like width or height.
								</p>
							</CardContent>
						</Card>

						<Card decorations>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Accessibility className="h-5 w-5" />
									Accessibility
								</CardTitle>
							</CardHeader>
							<CardContent className="text-sm">
								<p>
									Respect user preferences for reduced motion using the
									prefers-reduced-motion media query.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="flex flex-col gap-8 w-full">
					<h3 className="text-xl font-semibold">Best Practices</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card decorations>
							<CardHeader>
								<CardTitle>Performance Guidelines</CardTitle>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p className="flex items-start gap-2">
									<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
									<span>
										Use transform and opacity for smooth 60fps animations
									</span>
								</p>
								<p className="flex items-start gap-2">
									<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
									<span>
										Avoid animating layout properties (width, height, top)
									</span>
								</p>
								<p className="flex items-start gap-2">
									<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
									<span>
										Use will-change sparingly and remove after animation
									</span>
								</p>
								<p className="flex items-start gap-2">
									<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
									<span>Test performance on lower-end devices</span>
								</p>
							</CardContent>
						</Card>

						<Card decorations>
							<CardHeader>
								<CardTitle>User Experience Guidelines</CardTitle>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p className="flex items-start gap-2">
									<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
									<span>
										Keep animations under 300ms for micro-interactions
									</span>
								</p>
								<p className="flex items-start gap-2">
									<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
									<span>
										Use easing functions (ease-out, ease-in-out) for natural
										motion
									</span>
								</p>
								<p className="flex items-start gap-2">
									<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
									<span>Respect prefers-reduced-motion for accessibility</span>
								</p>
								<p className="flex items-start gap-2">
									<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
									<span>Provide meaningful feedback for user actions</span>
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="w-full flex flex-wrap items-center gap-8">
					<Button variant="link" asChild>
						<Link
							href="https://motion.dev/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Motion (Framer Motion)
							<ArrowUpRight size={16} />
						</Link>
					</Button>

					<Button variant="link" asChild>
						<Link
							href="https://number-flow.barvian.me/"
							target="_blank"
							rel="noopener noreferrer"
						>
							NumberFlow
							<ArrowUpRight size={16} />
						</Link>
					</Button>

					<Button variant="link" asChild>
						<Link
							href="https://web.dev/animations/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Web.dev Animation Guide
							<ArrowUpRight size={16} />
						</Link>
					</Button>

					<Button variant="link" asChild>
						<Link
							href="https://animations.dev/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Animations.dev
							<ArrowUpRight size={16} />
						</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
