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
				<div className="w-full bg-background rounded-full h-2 overflow-hidden">
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
			{/* Header */}
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
					Web Animations Guide
				</h1>
				<p className="text-muted-foreground text-xl">
					Create beautiful, performant animations for modern web applications
					using React, Motion, and CSS.
				</p>
			</div>

			{/* Introduction */}
			<div className="px-12">
				<Card decorations>
					<CardContent className="p-6">
						<div className="flex items-start gap-4">
							<Wand2 className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
							<div>
								<h3 className="font-semibold mb-2">
									Why animations matter in modern web design
								</h3>
								<p className="text-muted-foreground">
									Animations enhance user experience by providing visual
									feedback, guiding attention, and creating delightful
									interactions. When done right, they make interfaces feel
									responsive and polished.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Animation Principles */}
			<div className="px-12 pt-8">
				<div>
					<h2 className="text-2xl font-bold mb-6">Animation Principles</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
							<CardHeader className="pb-3">
								<div className="flex items-center gap-2">
									<Clock className="h-5 w-5 text-primary" />
									<CardTitle className="text-lg">Timing</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Use appropriate durations and easing for natural motion.
								</p>
							</CardContent>
						</Card>

						<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
							<CardHeader className="pb-3">
								<div className="flex items-center gap-2">
									<Eye className="h-5 w-5 text-primary" />
									<CardTitle className="text-lg">Purpose</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Every animation should serve a clear functional purpose.
								</p>
							</CardContent>
						</Card>

						<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
							<CardHeader className="pb-3">
								<div className="flex items-center gap-2">
									<Zap className="h-5 w-5 text-primary" />
									<CardTitle className="text-lg">Performance</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Optimize for 60fps using transform and opacity properties.
								</p>
							</CardContent>
						</Card>

						<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
							<CardHeader className="pb-3">
								<div className="flex items-center gap-2">
									<Accessibility className="h-5 w-5 text-primary" />
									<CardTitle className="text-lg">Accessibility</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Respect user preferences for reduced motion.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* NumberFlow Examples */}
			<div className="px-12 pt-8">
				<div>
					<h2 className="text-2xl font-bold mb-8">Number Animations</h2>

					{/* Animated Counter */}
					<div className="mb-8">
						<Card decorations>
							<CardHeader>
								<div className="flex items-center gap-2">
									<CardTitle>Animated Counter</CardTitle>
								</div>
								<CardDescription>
									Smooth number transitions with NumberFlow for counters and
									statistics.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-center">
									<AnimatedCounter />
								</div>

								<Accordion type="single" collapsible className="w-full">
									<AccordionItem value="number-flow" className="rounded-lg">
										<AccordionTrigger
											className="pt-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
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
												className="border-none rounded-none rounded-b-lg shadow-none group"
											>
												<CodeBlockHeader className="border-0 absolute right-6 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
													<CodeBlockCopyButton
														onCopy={() =>
															console.log("Copied code to clipboard")
														}
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
																className="bg-muted"
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
							</CardContent>
						</Card>
					</div>

					{/* Progress Indicator */}
					<div className="mb-8">
						<Card decorations>
							<CardHeader>
								<div className="flex items-center gap-2">
									<CardTitle>Progress Indicator</CardTitle>
								</div>
								<CardDescription>
									Animated progress bars with smooth number transitions.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-center">
									<ProgressIndicator />
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Icon Animations */}
			<div className="px-12 pt-8">
				<div>
					<h2 className="text-2xl font-bold mb-8">Icon Animations</h2>

					{/* Animated Icons */}
					<div className="mb-8">
						<Card decorations>
							<CardHeader>
								<div className="flex items-center gap-2">
									<CardTitle>Interactive Icons</CardTitle>
								</div>
								<CardDescription>
									Delightful icon animations with scale, rotation, and state
									changes.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-center">
									<AnimatedIcon />
								</div>

								<Accordion type="single" collapsible className="w-full">
									<AccordionItem value="icon-animation" className="rounded-lg">
										<AccordionTrigger
											className="pt-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
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
												className="border-none rounded-none rounded-b-lg shadow-none group"
											>
												<CodeBlockHeader className="border-0 absolute right-6 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
													<CodeBlockCopyButton
														onCopy={() =>
															console.log("Copied code to clipboard")
														}
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
																className="bg-muted"
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
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* CSS Animations */}
			<div className="px-12 pt-8">
				<div>
					<h2 className="text-2xl font-bold mb-8">CSS Animations</h2>

					{/* CSS Animation Examples */}
					<div className="mb-8">
						<Card decorations>
							<CardHeader>
								<div className="flex items-center gap-2">
									<CardTitle>Pure CSS Animations</CardTitle>
								</div>
								<CardDescription>
									Lightweight CSS animations for hover effects, loading states,
									and transitions.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<h4 className="font-semibold mb-2 flex items-center gap-2">
											<CheckCircle className="h-4 w-4" />
											Hover Effects
										</h4>
										<ul className="text-sm text-muted-foreground space-y-1 ml-6">
											<li>• Scale and lift animations</li>
											<li>• Color transitions</li>
											<li>• Shadow changes</li>
										</ul>
									</div>
									<div>
										<h4 className="font-semibold mb-2 flex items-center gap-2">
											<CheckCircle className="h-4 w-4" />
											Loading States
										</h4>
										<ul className="text-sm text-muted-foreground space-y-1 ml-6">
											<li>• Pulse animations</li>
											<li>• Spinner rotations</li>
											<li>• Skeleton loading</li>
										</ul>
									</div>
								</div>

								<Accordion type="single" collapsible className="w-full">
									<AccordionItem value="css-animations" className="rounded-lg">
										<AccordionTrigger
											className="pt-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
											showArrow
										>
											Show Code
										</AccordionTrigger>
										<AccordionContent
											className="border-b-0 border-x-0 border-t pb-0 shadow-none"
											keepRendered
										>
											<CodeBlock
												data={cssAnimationCode}
												defaultValue={cssAnimationCode[0].filename}
												className="border-none rounded-none rounded-b-lg shadow-none group"
											>
												<CodeBlockHeader className="border-0 absolute right-6 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
													<CodeBlockCopyButton
														onCopy={() =>
															console.log("Copied code to clipboard")
														}
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
																className="bg-muted"
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
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Best Practices */}
			<div className="px-12 pt-8">
				<Card decorations>
					<CardHeader>
						<div className="flex items-center gap-2">
							<CardTitle>Animation Best Practices</CardTitle>
						</div>
						<CardDescription>
							Key principles for creating effective and performant animations.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold mb-3">Performance</h4>
								<ul className="text-sm space-y-2">
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Use transform and opacity for smooth 60fps</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Avoid animating layout properties</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Use will-change sparingly</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Test on lower-end devices</span>
									</li>
								</ul>
							</div>
							<div>
								<h4 className="font-semibold mb-3">User Experience</h4>
								<ul className="text-sm space-y-2">
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Keep animations under 300ms</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Use easing functions for natural motion</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Respect prefers-reduced-motion</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Provide meaningful feedback</span>
									</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Resources */}
			<div className="px-12 pb-12 pt-8">
				<div>
					<h2 className="text-2xl font-bold mb-6">Animation Resources</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card className="bg-transparent border-none shadow-none">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Sparkles className="h-5 w-5" />
									Animation Libraries
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<Button
									variant="outline"
									className="w-full justify-start"
									asChild
								>
									<Link
										href="https://motion.dev/"
										target="_blank"
										rel="noopener noreferrer"
									>
										Motion (Framer Motion)
										<ArrowUpRight className="h-3 w-3 ml-auto" />
									</Link>
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start"
									asChild
								>
									<Link
										href="https://number-flow.barvian.me/"
										target="_blank"
										rel="noopener noreferrer"
									>
										NumberFlow
										<ArrowUpRight className="h-3 w-3 ml-auto" />
									</Link>
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start"
									asChild
								>
									<Link
										href="https://animations.dev/"
										target="_blank"
										rel="noopener noreferrer"
									>
										Animations.dev
										<ArrowUpRight className="h-3 w-3 ml-auto" />
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card className="bg-transparent border-none shadow-none">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Code className="h-5 w-5" />
									Learning Resources
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<Button
									variant="outline"
									className="w-full justify-start"
									asChild
								>
									<Link
										href="https://web.dev/animations/"
										target="_blank"
										rel="noopener noreferrer"
									>
										Web.dev Animation Guide
										<ArrowUpRight className="h-3 w-3 ml-auto" />
									</Link>
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start"
									asChild
								>
									<Link
										href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations"
										target="_blank"
										rel="noopener noreferrer"
									>
										MDN CSS Animations
										<ArrowUpRight className="h-3 w-3 ml-auto" />
									</Link>
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start"
									asChild
								>
									<Link
										href="https://jakub.kr/components/animating-icons"
										target="_blank"
										rel="noopener noreferrer"
									>
										Jakub Krehel's Portfolio
										<ArrowUpRight className="h-3 w-3 ml-auto" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</main>
	);
}
