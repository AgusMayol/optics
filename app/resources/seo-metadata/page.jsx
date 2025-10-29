"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";
import {
	Accessibility,
	CheckCircle,
	AlertTriangle,
	Eye,
	Keyboard,
	Code,
	Search,
	Monitor,
	Globe,
	Shield,
	BookOpen,
	ArrowUpRight,
	Info,
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

const semanticHtmlCode = [
	{
		language: "html",
		filename: "semantic-html.html",
		code: `<main>
  <header>
    <h1>Main Title</h1>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  </header>
</main>`,
	},
];

const altTextCode = [
	{
		language: "html",
		filename: "alt-text.html",
		code: `<!-- Correct -->
<img src="chart.png" alt="Q1 2024 sales chart: 25% increase" />

<!-- Decorative -->
<img src="decoration.png" alt="" />

<!-- Incorrect -->
<img src="chart.png" alt="image" />`,
	},
];

const ariaCode = [
	{
		language: "html",
		filename: "aria.html",
		code: `<!-- Button with ARIA -->
<button 
  aria-expanded="false" 
  aria-controls="menu"
  aria-label="Open navigation menu"
>
  Menu
</button>

<!-- Modal with ARIA -->
<div role="dialog" aria-labelledby="modal-title" aria-modal="true">
  <h2 id="modal-title">Confirm action</h2>
</div>`,
	},
];

const contrastCode = [
	{
		language: "css",
		filename: "contrast.css",
		code: `/* Adequate contrast */
.text-primary {
  color: #1a1a1a; /* Black on white: 21:1 */
}

/* Visible focus states */
button:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}`,
	},
];

const keyboardCode = [
	{
		language: "css",
		filename: "keyboard.css",
		code: `/* Visible focus */
.focusable:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
}

.skip-link:focus {
  top: 6px;
}`,
	},
];

const formsCode = [
	{
		language: "html",
		filename: "forms.html",
		code: `<form>
  <div>
    <label for="email">Email *</label>
    <input 
      type="email" 
      id="email" 
      name="email"
      aria-required="true"
      aria-describedby="email-help"
    />
    <div id="email-help">Enter your email address</div>
  </div>
  
  <div>
    <label for="password">Password *</label>
    <input 
      type="password" 
      id="password" 
      name="password"
      aria-required="true"
      aria-invalid="false"
      aria-describedby="password-error"
    />
    <div id="password-error" role="alert">
      Password must be at least 8 characters
    </div>
  </div>
</form>`,
	},
];

const motionCode = [
	{
		language: "css",
		filename: "motion.css",
		code: `/* Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Safe animation */
.safe-animation {
  animation: fadeIn 0.3s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .safe-animation {
    animation: none;
  }
}`,
	},
];

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			{/* Header */}
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">
					Web Accessibility Guide
				</h1>
				<p className="text-muted-foreground text-xl">
					Best practices for creating accessible, inclusive, and SEO-optimized
					websites.
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
									Why is accessibility important?
								</h3>
								<p className="text-muted-foreground">
									Web accessibility not only benefits people with disabilities,
									but improves the experience for all users and contributes
									significantly to SEO. Follow WCAG 2.2 guidelines to create
									inclusive and high-quality web experiences.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Core Principles */}
			<div className="px-12 pt-8">
				<h2 className="text-2xl font-bold mb-6">WCAG 2.2 Core Principles</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<Eye className="h-5 w-5" />
								<CardTitle className="text-lg">Perceivable</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Information must be presented in ways users can perceive.
							</p>
						</CardContent>
					</Card>

					<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<Keyboard className="h-5 w-5" />
								<CardTitle className="text-lg">Operable</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Interface components must be operable by all users.
							</p>
						</CardContent>
					</Card>

					<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<BookOpen className="h-5 w-5" />
								<CardTitle className="text-lg">Understandable</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Information and interface operation must be understandable.
							</p>
						</CardContent>
					</Card>

					<Card className="bg-transparent border-none shadow-none hover:bg-muted/50 transition-colors">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<Shield className="h-5 w-5" />
								<CardTitle className="text-lg">Robust</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Content must be robust enough to be interpreted by various
								technologies.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Essential Guidelines */}
			<div className="px-12 pt-8">
				<h2 className="text-2xl font-bold mb-8">
					Essential Accessibility Guidelines
				</h2>

				{/* Semantic HTML */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Semantic HTML and Structure</CardTitle>
							</div>
							<CardDescription>
								Use appropriate HTML elements to create a clear and navigable
								structure.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Titles and Headings
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>
											• Use unique and descriptive &lt;title&gt; tags (30-60
											characters)
										</li>
										<li>• Logical hierarchy of H1-H6</li>
										<li>• One H1 per page</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Semantic Elements
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>
											• &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;,
											&lt;section&gt;
										</li>
										<li>• &lt;article&gt;, &lt;aside&gt;, &lt;footer&gt;</li>
										<li>• Lists &lt;ul&gt;, &lt;ol&gt;, &lt;dl&gt;</li>
									</ul>
								</div>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="semantic-html" className="rounded-lg">
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
											data={semanticHtmlCode}
											defaultValue={semanticHtmlCode[0].filename}
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

				{/* Images and Alt Text */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Images and Alt Text</CardTitle>
							</div>
							<CardDescription>
								Provide clear descriptions for all images.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Alt Attributes
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Descriptive and concise</li>
										<li>• Alt="" for decorative images</li>
										<li>• Include text in images</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<AlertTriangle className="h-4 w-4" />
										Avoid
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• "image", "photo", "graphic"</li>
										<li>• Text as image</li>
										<li>• Very long alt text</li>
									</ul>
								</div>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="alt-text" className="rounded-lg">
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
											data={altTextCode}
											defaultValue={altTextCode[0].filename}
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

				{/* ARIA */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>
									ARIA (Accessible Rich Internet Applications)
								</CardTitle>
							</div>
							<CardDescription>
								Enhance accessibility of dynamic and interactive components.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										ARIA Roles
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• role="button" for clickable elements</li>
										<li>• role="dialog" for modals</li>
										<li>• role="alert" for important messages</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										States and Properties
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• aria-expanded for menus</li>
										<li>• aria-label for descriptions</li>
										<li>• aria-describedby for help</li>
									</ul>
								</div>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="aria" className="rounded-lg">
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
											data={ariaCode}
											defaultValue={ariaCode[0].filename}
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

				{/* Color and Contrast */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Color Contrast</CardTitle>
							</div>
							<CardDescription>
								Ensure sufficient contrast for readability.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Contrast Ratios
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Normal text: 4.5:1 minimum</li>
										<li>• Large text: 3:1 minimum</li>
										<li>• UI elements: 3:1 minimum</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<AlertTriangle className="h-4 w-4" />
										Considerations
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Color blindness (red-green)</li>
										<li>• Don't rely only on color</li>
										<li>• Hover and focus states</li>
									</ul>
								</div>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="contrast" className="rounded-lg">
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
											data={contrastCode}
											defaultValue={contrastCode[0].filename}
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

				{/* Keyboard Navigation */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Keyboard Navigation</CardTitle>
							</div>
							<CardDescription>
								All interactive elements must be accessible with keyboard.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Requirements
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Logical tab order</li>
										<li>• Visible focus</li>
										<li>• Keyboard shortcuts</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Important Keys
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Tab: navigate</li>
										<li>• Enter/Space: activate</li>
										<li>• Escape: close</li>
									</ul>
								</div>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="keyboard" className="rounded-lg">
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
											data={keyboardCode}
											defaultValue={keyboardCode[0].filename}
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

				{/* Forms */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Accessible Forms</CardTitle>
							</div>
							<CardDescription>
								Clear and easy-to-use forms for everyone.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Labels and Associations
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• &lt;label&gt; associated with each field</li>
										<li>• aria-describedby for help</li>
										<li>• aria-required for required fields</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Error Messages
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Clear and specific</li>
										<li>• aria-invalid="true"</li>
										<li>• Correction suggestions</li>
									</ul>
								</div>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="forms" className="rounded-lg">
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
											data={formsCode}
											defaultValue={formsCode[0].filename}
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

				{/* Motion and Animation */}
				<div className="mb-8">
					<Card decorations>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CardTitle>Reduced Motion</CardTitle>
							</div>
							<CardDescription>
								Respect user motion preferences.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<CheckCircle className="h-4 w-4" />
										Media Query
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• @media (prefers-reduced-motion)</li>
										<li>• Disable animations</li>
										<li>• Smoother transitions</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<AlertTriangle className="h-4 w-4" />
										Avoid
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1 ml-6">
										<li>• Flashing &gt; 3 times/second</li>
										<li>• Auto-playing animations</li>
										<li>• Excessive movement</li>
									</ul>
								</div>
							</div>

							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="motion" className="rounded-lg">
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
											data={motionCode}
											defaultValue={motionCode[0].filename}
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

			{/* SEO and Accessibility */}
			<div className="px-12 pt-8">
				<Card decorations>
					<CardHeader>
						<div className="flex items-center gap-2">
							<CardTitle>Accessibility and SEO</CardTitle>
						</div>
						<CardDescription>
							Web accessibility significantly improves search engine ranking.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold mb-3">SEO Benefits</h4>
								<ul className="text-sm space-y-2">
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Better user experience (Core Web Vitals)</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>More structured and semantic content</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Better search engine indexing</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Increased time on site</span>
									</li>
								</ul>
							</div>
							<div>
								<h4 className="font-semibold mb-3">Key Practices</h4>
								<ul className="text-sm space-y-2">
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Descriptive and unique titles</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Alt text in images</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Clear heading structure</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
										<span>Descriptive links</span>
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
								<BookOpen className="h-5 w-5" />
								Official Documentation
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link
									href="https://www.w3.org/WAI/WCAG22/quickref/"
									target="_blank"
									rel="noopener noreferrer"
								>
									WCAG 2.2 Quick Reference
									<ArrowUpRight className="h-3 w-3 ml-auto" />
								</Link>
							</Button>
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link
									href="https://web.dev/accessibility/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Web.dev Accessibility Guide
									<ArrowUpRight className="h-3 w-3 ml-auto" />
								</Link>
							</Button>
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link
									href="https://developer.mozilla.org/en-US/docs/Web/Accessibility"
									target="_blank"
									rel="noopener noreferrer"
								>
									MDN Accessibility
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
