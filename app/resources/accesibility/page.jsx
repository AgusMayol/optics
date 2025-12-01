"use client";
import * as React from "react";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/optics/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/optics/accordion";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";

// Code examples data
const semanticHTMLCode = [
	{
		language: "jsx",
		filename: "app/components/Layout.jsx",
		code: `export default function Layout({ children }) {
  return (
    <div>
      <header>
        <nav aria-label="Main navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      
      <main id="main-content">
        {children}
      </main>
      
      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}`,
	},
];

const skipLinkCode = [
	{
		language: "jsx",
		filename: "app/components/SkipLink.jsx",
		code: `export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
    >
      Skip to main content
    </a>
  );
}

// In your layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <Navigation />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}`,
	},
];

const accessibleButtonCode = [
	{
		language: "jsx",
		filename: "app/components/Button.jsx",
		code: `"use client";

export function Button({ 
  children, 
  onClick, 
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  type = "button"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {children}
    </button>
  );
}

// Icon button example
export function IconButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <Icon className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}`,
	},
];

const accessibleFormCode = [
	{
		language: "jsx",
		filename: "app/components/Form.jsx",
		code: `"use client";
import { useState } from "react";

export function AccessibleForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    // Submit form
  };
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email" className="block mb-2">
          Email Address <span aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required="true"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "email-error" : undefined}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {error && (
          <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
      
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Submit
      </button>
    </form>
  );
}`,
	},
];

const accessibleImagesCode = [
	{
		language: "jsx",
		filename: "app/components/Images.jsx",
		code: `import Image from "next/image";

// Informative image - needs descriptive alt text
export function ProductImage() {
  return (
    <Image
      src="/product.jpg"
      alt="Blue cotton t-shirt with round neck and short sleeves"
      width={400}
      height={400}
    />
  );
}

// Decorative image - use empty alt
export function DecorativeImage() {
  return (
    <Image
      src="/decoration.jpg"
      alt=""
      width={400}
      height={400}
      aria-hidden="true"
    />
  );
}

// Complex image with description
export function ChartImage() {
  return (
    <figure>
      <Image
        src="/sales-chart.jpg"
        alt="Sales growth chart"
        width={800}
        height={400}
        aria-describedby="chart-description"
      />
      <figcaption id="chart-description">
        A line chart showing 25% sales growth from Q1 to Q4 2024
      </figcaption>
    </figure>
  );
}`,
	},
];

const ariaLiveRegionCode = [
	{
		language: "jsx",
		filename: "app/components/Notifications.jsx",
		code: `"use client";
import { useState } from "react";

export function NotificationSystem() {
  const [message, setMessage] = useState("");
  
  const notify = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 5000);
  };
  
  return (
    <div>
      <button onClick={() => notify("Item added to cart")}>
        Add to Cart
      </button>
      
      {/* Live region for screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {message}
      </div>
      
      {/* Visual notification */}
      {message && (
        <div className="fixed bottom-4 right-4 p-4 bg-primary text-primary-foreground rounded-md">
          {message}
        </div>
      )}
    </div>
  );
}`,
	},
];

const keyboardNavigationCode = [
	{
		language: "jsx",
		filename: "app/components/Menu.jsx",
		code: `"use client";
import { useState, useRef, useEffect } from "react";

export function KeyboardMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const menuRef = useRef(null);
  
  const menuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { label: "Logout", href: "/logout" },
  ];
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => 
          prev < menuItems.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => 
          prev > 0 ? prev - 1 : menuItems.length - 1
        );
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(menuItems.length - 1);
        break;
    }
  };
  
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="menu"
      >
        Menu
      </button>
      
      {isOpen && (
        <ul
          id="menu"
          role="menu"
          ref={menuRef}
          onKeyDown={handleKeyDown}
          className="mt-2 border rounded-md"
        >
          {menuItems.map((item, index) => (
            <li key={item.href} role="none">
              <a
                href={item.href}
                role="menuitem"
                tabIndex={focusedIndex === index ? 0 : -1}
                className="block px-4 py-2 hover:bg-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
	},
];

const focusManagementCode = [
	{
		language: "jsx",
		filename: "app/components/Modal.jsx",
		code: `"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function AccessibleModal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement;
      
      // Focus the modal
      modalRef.current?.focus();
      
      // Trap focus within modal
      const handleTabKey = (e) => {
        const focusableElements = modalRef.current?.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];
        
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };
      
      document.addEventListener("keydown", handleTabKey);
      
      return () => {
        document.removeEventListener("keydown", handleTabKey);
        // Restore focus when modal closes
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-background p-6 rounded-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        
        {children}
        
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}`,
	},
];

const colorContrastCode = [
	{
		language: "css",
		filename: "app/globals.css",
		code: `/* WCAG 2.2 Level AA requires:
 * - 4.5:1 for normal text (under 24px or 19px bold)
 * - 3:1 for large text (24px+ or 19px+ bold)
 * - 3:1 for UI components and graphics
 */

:root {
  /* Good contrast examples */
  --primary: 220 13% 13%;        /* Dark blue - passes AA */
  --primary-foreground: 0 0% 100%; /* White - passes AAA */
  
  --secondary: 220 13% 91%;      /* Light blue - passes AA */
  --secondary-foreground: 220 13% 13%; /* Dark blue - passes AAA */
  
  /* Focus indicators must be visible */
  --ring: 220 13% 50%;
  --ring-offset: 0 0% 100%;
}

/* Ensure focus is always visible */
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Don't remove focus indicators */
*:focus:not(:focus-visible) {
  outline: none;
}`,
	},
];

const responsiveA11yCode = [
	{
		language: "jsx",
		filename: "app/components/ResponsiveNav.jsx",
		code: `"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav aria-label="Main navigation">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="md:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X aria-hidden="true" />
        ) : (
          <Menu aria-hidden="true" />
        )}
      </button>
      
      {/* Desktop navigation */}
      <ul className="hidden md:flex gap-4">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      
      {/* Mobile navigation */}
      {isOpen && (
        <ul id="mobile-menu" className="md:hidden">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      )}
    </nav>
  );
}`,
	},
];

const accessibleDataTableCode = [
	{
		language: "jsx",
		filename: "app/components/DataTable.jsx",
		code: `export function AccessibleTable({ data }) {
  return (
    <table>
      <caption className="text-lg font-bold mb-2">
        Sales Data for Q4 2024
      </caption>
      <thead>
        <tr>
          <th scope="col">Month</th>
          <th scope="col">Revenue</th>
          <th scope="col">Growth</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.month}>
            <th scope="row">{row.month}</th>
            <td>{row.revenue}</td>
            <td>{row.growth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`,
	},
];

const nextConfigA11yCode = [
	{
		language: "js",
		filename: "next.config.js",
		code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better accessibility warnings
  reactStrictMode: true,
  
  // Configure i18n for language support
  i18n: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
  },
  
  // Image optimization maintains aspect ratios and supports alt text
  images: {
    domains: ['yourdomain.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;`,
	},
];

const reducedMotionCode = [
	{
		language: "css",
		filename: "app/globals.css",
		code: `/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Smooth scroll for users who don't prefer reduced motion */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --primary: 0 0% 0%;
    --primary-foreground: 0 0% 100%;
    --border: 0 0% 0%;
  }
}`,
	},
];

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
					Accessibility
				</h1>
				<p className="text-muted-foreground text-base lg:text-xl">
					Build inclusive Next.js applications that work for everyone, following
					WCAG 2.2 guidelines.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-12 lg:gap-24 p-6 lg:p-12 pt-4">
				{/* Introduction */}
				<div className="flex flex-col gap-4 -mt-2">
					<p className="text-muted-foreground text-sm lg:leading-7">
						Web accessibility ensures that your application can be used by
						everyone, including people with disabilities. This guide provides
						practical examples following WCAG 2.2 standards and Next.js best
						practices.
					</p>
				</div>

				{/* 1. Semantic HTML & Structure */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										1
									</Badge>
									Semantic HTML & Structure
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Use semantic HTML elements to provide meaning and structure. This
						helps screen readers understand your content hierarchy.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className=" px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Semantic Layout Example
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={semanticHTMLCode}
											defaultValue={semanticHTMLCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 2. Skip Links */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										2
									</Badge>
									Skip Links
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Skip links allow keyboard users to bypass repetitive content and
						jump directly to the main content. Essential for WCAG 2.4.1
						compliance.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Skip Link Implementation
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={skipLinkCode}
											defaultValue={skipLinkCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 3. Accessible Buttons */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/ARIA/apg/patterns/button/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										3
									</Badge>
									Accessible Buttons
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Buttons must be keyboard accessible, have proper labels, and visible
						focus states. Always use proper ARIA attributes when needed.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Button Components
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={accessibleButtonCode}
											defaultValue={accessibleButtonCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 4. Accessible Forms */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										4
									</Badge>
									Accessible Forms
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Forms must have proper labels, error messages, and validation states
						that are accessible to screen readers.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Form with Validation
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={accessibleFormCode}
											defaultValue={accessibleFormCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 5. Accessible Images */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										5
									</Badge>
									Accessible Images
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						All images must have appropriate alt text. Use descriptive text for
						informative images, empty alt for decorative images, and detailed
						descriptions for complex images.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Image Examples
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={accessibleImagesCode}
											defaultValue={accessibleImagesCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 6. ARIA Live Regions */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										6
									</Badge>
									ARIA Live Regions
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Use live regions to announce dynamic content changes to screen
						reader users without interrupting their current task.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Notification System
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={ariaLiveRegionCode}
											defaultValue={ariaLiveRegionCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 7. Keyboard Navigation */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										7
									</Badge>
									Keyboard Navigation
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						All functionality must be accessible via keyboard. Implement proper
						arrow key navigation, Home/End keys, and Escape key support for
						menus and dropdowns.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Keyboard-Accessible Menu
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={keyboardNavigationCode}
											defaultValue={keyboardNavigationCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 8. Focus Management */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										8
									</Badge>
									Focus Management
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Manage focus properly when opening/closing modals, dialogs, and
						other dynamic content. Trap focus within modals and restore it when
						closed.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Modal with Focus Trap
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={focusManagementCode}
											defaultValue={focusManagementCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 9. Color Contrast */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										9
									</Badge>
									Color Contrast
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Ensure sufficient color contrast between text and background. WCAG
						2.2 Level AA requires 4.5:1 for normal text and 3:1 for large text.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Color Contrast CSS
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={colorContrastCode}
											defaultValue={colorContrastCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 10. Responsive Accessibility */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/WCAG22/Understanding/reflow.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										10
									</Badge>
									Responsive Accessibility
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Ensure your application works on all screen sizes and orientations.
						Mobile navigation should be just as accessible as desktop.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Responsive Navigation
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={responsiveA11yCode}
											defaultValue={responsiveA11yCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 11. Data Tables */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										11
									</Badge>
									Accessible Data Tables
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Use proper table markup with{" "}
						<Badge variant="outline" className="text-xs font-mono">
							caption
						</Badge>
						,{" "}
						<Badge variant="outline" className="text-xs font-mono">
							thead
						</Badge>
						,{" "}
						<Badge variant="outline" className="text-xs font-mono">
							tbody
						</Badge>
						, and{" "}
						<Badge variant="outline" className="text-xs font-mono">
							scope
						</Badge>{" "}
						attributes to help screen readers understand table relationships.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Data Table Example
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={accessibleDataTableCode}
											defaultValue={accessibleDataTableCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 12. Motion Preferences */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										12
									</Badge>
									Motion Preferences
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Respect user motion preferences using{" "}
						<Badge variant="outline" className="text-xs font-mono">
							prefers-reduced-motion
						</Badge>
						. Some users experience vestibular disorders triggered by motion
						animations.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Motion Preferences CSS
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={reducedMotionCode}
											defaultValue={reducedMotionCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

				{/* 13. Next.js Configuration */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://nextjs.org/docs/app/building-your-application/configuring"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										13
									</Badge>
									Next.js Configuration
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Configure Next.js for better accessibility with React Strict Mode,
						internationalization, and optimized images.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										next.config.js
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={nextConfigA11yCode}
											defaultValue={nextConfigA11yCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
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

			{/* WCAG 2.2 Principles & Testing Tools */}
			<div className="w-full flex flex-col items-start justify-start gap-12 p-6 lg:p-12 pt-4">
				<div className="w-full flex flex-col gap-8">
					<h3 className="text-xl font-semibold">WCAG 2.2 Core Principles</h3>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>1. Perceivable</CardTitle>
								<CardDescription>
									Information must be presentable to users in ways they can
									perceive
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Provide text alternatives for non-text content</p>
								<p>• Provide captions and alternatives for multimedia</p>
								<p>• Create content that can be presented in different ways</p>
								<p>• Make it easier to see and hear content</p>
							</CardContent>
						</Card>

						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>2. Operable</CardTitle>
								<CardDescription>
									Interface components must be operable by all users
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Make all functionality available from keyboard</p>
								<p>• Give users enough time to read and use content</p>
								<p>• Don't use content that causes seizures</p>
								<p>• Help users navigate and find content</p>
							</CardContent>
						</Card>

						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>3. Understandable</CardTitle>
								<CardDescription>
									Information and interface operation must be understandable
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Make text readable and understandable</p>
								<p>• Make content appear and operate predictably</p>
								<p>• Help users avoid and correct mistakes</p>
								<p>• Provide clear instructions and error messages</p>
							</CardContent>
						</Card>

						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>4. Robust</CardTitle>
								<CardDescription>
									Content must be robust enough for reliable interpretation
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Maximize compatibility with assistive technologies</p>
								<p>• Ensure valid, semantic HTML</p>
								<p>• Use ARIA attributes correctly</p>
								<p>• Test with actual assistive technologies</p>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="w-full flex flex-wrap items-center gap-8">
					<Button variant="link" asChild>
						<Link
							href="https://www.w3.org/WAI/WCAG22/quickref/"
							target="_blank"
							rel="noopener noreferrer"
						>
							WCAG 2.2 Quick Reference
							<ArrowUpRight size={16} />
						</Link>
					</Button>

					<Button variant="link" asChild>
						<Link
							href="https://www.w3.org/WAI/ARIA/apg/"
							target="_blank"
							rel="noopener noreferrer"
						>
							ARIA Authoring Practices
							<ArrowUpRight size={16} />
						</Link>
					</Button>

					<Button variant="link" asChild>
						<Link
							href="https://webaim.org/"
							target="_blank"
							rel="noopener noreferrer"
						>
							WebAIM Resources
							<ArrowUpRight size={16} />
						</Link>
					</Button>

					<Button variant="link" asChild>
						<Link
							href="https://nextjs.org/docs/architecture/accessibility"
							target="_blank"
							rel="noopener noreferrer"
						>
							Next.js Accessibility
							<ArrowUpRight size={16} />
						</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
