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

const gridBasicCode = [
	{
		language: "jsx",
		filename: "grid-basic.jsx",
		code: `import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";

// Basic 12-column grid
<GridContainer cols={12} gap={4}>
  <GridRow>
    <GridItem span={6}>Half width</GridItem>
    <GridItem span={6}>Half width</GridItem>
  </GridRow>
  <GridRow>
    <GridItem span={4}>One third</GridItem>
    <GridItem span={4}>One third</GridItem>
    <GridItem span={4}>One third</GridItem>
  </GridRow>
</GridContainer>`,
	},
];

const gridResponsiveCode = [
	{
		language: "jsx",
		filename: "grid-responsive.jsx",
		code: `// Responsive grid with different spans
<GridContainer cols={12} gap={4}>
  <GridRow>
    <GridItem 
      span={12} 
      className="md:col-span-6 lg:col-span-4"
    >
      Responsive item
    </GridItem>
    <GridItem 
      span={12} 
      className="md:col-span-6 lg:col-span-4"
    >
      Responsive item
    </GridItem>
    <GridItem 
      span={12} 
      className="md:col-span-12 lg:col-span-4"
    >
      Responsive item
    </GridItem>
  </GridRow>
</GridContainer>`,
	},
];

const layoutPatternsCode = [
	{
		language: "jsx",
		filename: "layout-patterns.jsx",
		code: `// Hero section layout
<GridContainer cols={12} gap={8}>
  <GridRow>
    <GridItem span={12} className="text-center">
      <h1>Hero Title</h1>
      <p>Hero description</p>
    </GridItem>
  </GridRow>
</GridContainer>

// Content with sidebar
<GridContainer cols={12} gap={6}>
  <GridRow>
    <GridItem span={12} className="lg:col-span-8">
      <main>Main content</main>
    </GridItem>
    <GridItem span={12} className="lg:col-span-4">
      <aside>Sidebar content</aside>
    </GridItem>
  </GridRow>
</GridContainer>`,
	},
];

const spacingCode = [
	{
		language: "css",
		filename: "spacing.css",
		code: `/* Consistent spacing scale */
:root {
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */
  --spacing-3xl: 4rem;    /* 64px */
}

/* Component spacing */
.card {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.section {
  padding: var(--spacing-2xl) 0;
}`,
	},
];

const typographyCode = [
	{
		language: "css",
		filename: "typography.css",
		code: `/* Typography scale */
.text-display {
  font-size: 3.5rem;
  line-height: 1.1;
  font-weight: 700;
}

.text-h1 {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 600;
}

.text-h2 {
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 600;
}

.text-body {
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 400;
}

.text-caption {
  font-size: 0.875rem;
  line-height: 1.4;
  font-weight: 400;
}`,
	},
];

const breakpointsCode = [
	{
		language: "css",
		filename: "breakpoints.css",
		code: `/* Mobile-first breakpoints */
/* xs: 0px */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
}`,
	},
];

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			{/* Header */}
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-0">
				<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
					Layout Design System
				</h1>
				<p className="text-muted-foreground text-base lg:text-xl">
					Comprehensive guide for creating consistent, responsive, and beautiful
					layouts using modern design principles.
				</p>
			</div>

			{/* Introduction */}
			<div className="px-12">
				<Card decorations>
					<CardContent className="p-6">
						<div className="flex items-start gap-4">
							<Info className="h-6 w-6 mt-1 flex-shrink-0" />
							<div>
								<h3 className="font-semibold mb-2">
									Why is layout design important?
								</h3>
								<p className="text-muted-foreground">
									Good layout design creates visual hierarchy, improves user
									experience, and ensures consistency across your application.
									Following established patterns helps create professional,
									accessible interfaces.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Core Principles */}
			<div className="px-12 pt-8">
				<h2 className="text-2xl font-bold mb-6">Layout Design Principles</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<Grid3X3 className="h-5 w-5" />
								<CardTitle className="text-lg">Grid System</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Use consistent grid systems for alignment and structure.
							</p>
						</CardContent>
					</Card>

					<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<Monitor className="h-5 w-5" />
								<CardTitle className="text-lg">Responsive</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Design for all screen sizes with mobile-first approach.
							</p>
						</CardContent>
					</Card>

					<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<Space className="h-5 w-5" />
								<CardTitle className="text-lg">Spacing</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Maintain consistent spacing and visual rhythm.
							</p>
						</CardContent>
					</Card>

					<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<Type className="h-5 w-5" />
								<CardTitle className="text-lg">Typography</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Establish clear hierarchy with consistent typography.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Grid System */}
			<div className="px-12 pt-8">
				<h2 className="text-2xl font-bold mb-8">Grid System Fundamentals</h2>

				{/* Basic Grid */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Basic Grid Usage</CardTitle>
							</div>
							<CardDescription>
								Learn how to use the Grid component for consistent layouts.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										GridContainer
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Define columns (default: 12)</li>
										<li>• Set gap between items</li>
										<li>• Configure borders and styling</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										GridItem
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Set span (how many columns)</li>
										<li>• Add custom styling</li>
										<li>• Responsive breakpoints</li>
									</ul>
								</div>
							</div>

							{/* Live Grid Example */}
							<div className="p-4 bg-muted rounded-lg">
								<GridContainer cols={12} gap={2} border={false}>
									<GridRow>
										<GridItem
											span={6}
											className="bg-primary/10 p-2 rounded text-center text-sm"
										>
											span={6}
										</GridItem>
										<GridItem
											span={6}
											className="bg-primary/10 p-2 rounded text-center text-sm"
										>
											span={6}
										</GridItem>
									</GridRow>
									<GridRow>
										<GridItem
											span={4}
											className="bg-primary/10 p-2 rounded text-center text-sm"
										>
											span={4}
										</GridItem>
										<GridItem
											span={4}
											className="bg-primary/10 p-2 rounded text-center text-sm"
										>
											span={4}
										</GridItem>
										<GridItem
											span={4}
											className="bg-primary/10 p-2 rounded text-center text-sm"
										>
											span={4}
										</GridItem>
									</GridRow>
								</GridContainer>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="grid-basic" className="rounded-lg">
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
											data={gridBasicCode}
											defaultValue={gridBasicCode[0].filename}
											className="border-none rounded-none rounded-b-lg shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-6 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
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

				{/* Responsive Design */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Responsive Design</CardTitle>
							</div>
							<CardDescription>
								Create layouts that work across all device sizes.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Breakpoints
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Mobile: 0-640px</li>
										<li>• Tablet: 640-1024px</li>
										<li>• Desktop: 1024px+</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Mobile-First
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Start with mobile layout</li>
										<li>• Progressive enhancement</li>
										<li>• Touch-friendly interactions</li>
									</ul>
								</div>
							</div>

							{/* Responsive Grid Example */}
							<div className="p-4 bg-muted rounded-lg">
								<div className="text-sm text-muted-foreground mb-2">
									Responsive Grid (resize to see changes):
								</div>
								<GridContainer cols={12} gap={2} border={false}>
									<GridRow>
										<GridItem
											span={12}
											className="md:col-span-6 lg:col-span-4 bg-primary/10 p-2 rounded text-center text-sm"
										>
											Mobile: 12, Tablet: 6, Desktop: 4
										</GridItem>
										<GridItem
											span={12}
											className="md:col-span-6 lg:col-span-4 bg-primary/10 p-2 rounded text-center text-sm"
										>
											Mobile: 12, Tablet: 6, Desktop: 4
										</GridItem>
										<GridItem
											span={12}
											className="md:col-span-12 lg:col-span-4 bg-primary/10 p-2 rounded text-center text-sm"
										>
											Mobile: 12, Tablet: 12, Desktop: 4
										</GridItem>
									</GridRow>
								</GridContainer>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="grid-responsive" className="rounded-lg">
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
											data={gridResponsiveCode}
											defaultValue={gridResponsiveCode[0].filename}
											className="border-none rounded-none rounded-b-lg shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-6 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
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

				{/* Layout Patterns */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Common Layout Patterns</CardTitle>
							</div>
							<CardDescription>
								Proven layout patterns for different use cases.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Hero Section
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Full-width centered content</li>
										<li>• Clear call-to-action</li>
										<li>• Compelling headline</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Content + Sidebar
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• 8/4 column split</li>
										<li>• Related content</li>
										<li>• Navigation aids</li>
									</ul>
								</div>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="layout-patterns" className="rounded-lg">
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
											data={layoutPatternsCode}
											defaultValue={layoutPatternsCode[0].filename}
											className="border-none rounded-none rounded-b-lg shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-6 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
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

			{/* Spacing and Typography */}
			<div className="px-12 pt-8">
				<h2 className="text-2xl font-bold mb-8">Spacing and Typography</h2>

				{/* Spacing */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Consistent Spacing</CardTitle>
							</div>
							<CardDescription>
								Use a consistent spacing scale for visual harmony.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Spacing Scale
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• xs: 4px, sm: 8px, md: 16px</li>
										<li>• lg: 24px, xl: 32px, 2xl: 48px</li>
										<li>• 3xl: 64px, 4xl: 96px</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Usage
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Padding: component internals</li>
										<li>• Margin: component spacing</li>
										<li>• Gap: grid/flex spacing</li>
									</ul>
								</div>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="spacing" className="rounded-lg">
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
											data={spacingCode}
											defaultValue={spacingCode[0].filename}
											className="border-none rounded-none rounded-b-lg shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-6 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
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

				{/* Typography */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Typography Hierarchy</CardTitle>
							</div>
							<CardDescription>
								Establish clear visual hierarchy with consistent typography.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Text Sizes
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Display: 56px (3.5rem)</li>
										<li>• H1: 40px (2.5rem)</li>
										<li>• H2: 32px (2rem)</li>
										<li>• Body: 16px (1rem)</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Line Heights
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Display: 1.1</li>
										<li>• Headings: 1.2-1.3</li>
										<li>• Body: 1.6</li>
										<li>• Caption: 1.4</li>
									</ul>
								</div>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="typography" className="rounded-lg">
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
											data={typographyCode}
											defaultValue={typographyCode[0].filename}
											className="border-none rounded-none rounded-b-lg shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-6 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
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

			{/* Best Practices */}
			<div className="px-12 pt-8">
				<Card decorations>
					<CardHeader>
						<div className="flex items-center gap-2">
							<CardTitle>Layout Best Practices</CardTitle>
						</div>
						<CardDescription>
							Key principles for creating effective and maintainable layouts.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold mb-3">Design Principles</h4>
								<ul className="text-sm space-y-2">
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Consistent spacing and alignment</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Clear visual hierarchy</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Mobile-first responsive design</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Accessible and inclusive layouts</span>
									</li>
								</ul>
							</div>
							<div>
								<h4 className="font-semibold mb-3">Implementation Tips</h4>
								<ul className="text-sm space-y-2">
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Use CSS Grid for complex layouts</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Flexbox for component alignment</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Test across different screen sizes</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Document your design system</span>
									</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Resources */}
			<div className="px-12 pb-12 pt-8">
				<h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="bg-transparent border-none shadow-none">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Layout className="h-5 w-5" />
								Design Systems
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link
									href="https://vercel.com/design"
									target="_blank"
									rel="noopener noreferrer"
								>
									Vercel Design System
									<ArrowUpRight className="h-3 w-3 ml-auto" />
								</Link>
							</Button>
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link
									href="https://developer.apple.com/design/human-interface-guidelines/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Apple Human Interface Guidelines
									<ArrowUpRight className="h-3 w-3 ml-auto" />
								</Link>
							</Button>
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link
									href="https://ui.shadcn.com/"
									target="_blank"
									rel="noopener noreferrer"
								>
									shadcn/ui Components
									<ArrowUpRight className="h-3 w-3 ml-auto" />
								</Link>
							</Button>
						</CardContent>
					</Card>

					<Card className="bg-transparent border-none shadow-none">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Code className="h-5 w-5" />
								Technical Resources
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link
									href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout"
									target="_blank"
									rel="noopener noreferrer"
								>
									CSS Grid Layout Guide
									<ArrowUpRight className="h-3 w-3 ml-auto" />
								</Link>
							</Button>
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link
									href="https://web.dev/responsive-web-design-basics/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Responsive Web Design
									<ArrowUpRight className="h-3 w-3 ml-auto" />
								</Link>
							</Button>
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link
									href="https://tailwindcss.com/docs/responsive-design"
									target="_blank"
									rel="noopener noreferrer"
								>
									Tailwind Responsive Design
									<ArrowUpRight className="h-3 w-3 ml-auto" />
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
