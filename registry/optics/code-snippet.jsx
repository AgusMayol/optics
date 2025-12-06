"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { cloneElement, useState } from "react";
import { Button } from "@/registry/optics/button";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { ScrollArea } from "@/registry/optics/scroll-area";
import { cn } from '@/registry/optics/lib/utils';

export const Snippet = ({ className, ...props }) => (
	<Tabs
		className={cn(
			"group w-full gap-0 overflow-hidden rounded-md border border-input",
			className,
		)}
		{...props}
	/>
);

export const SnippetHeader = ({ className, ...props }) => (
	<div
		className={cn(
			"flex flex-row items-center justify-between border-b bg-secondary p-1",
			className,
		)}
		{...props}
	/>
);

export const SnippetCopyButton = ({
	asChild,
	value,
	onCopy,
	onError,
	timeout = 2000,
	children,
	...props
}) => {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = async () => {
		if (typeof window === "undefined" || !value) return;

		try {
			// Try modern clipboard API first
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(value);
			} else {
				// Fallback for iOS and older browsers
				const textArea = document.createElement("textarea");
				textArea.value = value;
				textArea.style.position = "fixed";
				textArea.style.opacity = "0";
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);
			}
			setIsCopied(true);
			onCopy?.();
			setTimeout(() => setIsCopied(false), timeout);
		} catch (error) {
			onError?.(error);
		}
	};

	if (asChild) {
		return cloneElement(children, {
			onClick: copyToClipboard,
		});
	}

	return (
		<Button
			variant="ghost"
			role="button"
			aria-label="Copy to clipboard"
			size="icon"
			className={cn("shrink-0")}
			onClick={copyToClipboard}
			{...props}
		>
			<div className="relative">
				<div
					className={cn(
						"absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out will-change-[transform,opacity,filter]",
						isCopied
							? "scale-100 opacity-100 blur-0"
							: "blur-xs scale-[0.25] opacity-0",
					)}
				>
					<CheckIcon className="text-muted-foreground" size={14} />
				</div>
				<div
					className={cn(
						"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter]",
						isCopied
							? "blur-xs scale-[0.25] opacity-0"
							: "scale-100 opacity-100 blur-0",
					)}
				>
					<CopyIcon className="text-muted-foreground" size={14} />
				</div>
			</div>
			<span className="sr-only">Copy to clipboard</span>
		</Button>
	);
};

export const SnippetTabsList = ({ className, ...props }) => (
	<TabsList className={cn(className)} {...props} />
);

export const SnippetTabsTrigger = ({ className, ...props }) => (
	<TabsTrigger className={cn("gap-1.5", className)} {...props} />
);

export const SnippetTabsContent = ({
	className,
	children,
	textClassName,
	...props
}) => (
	<TabsContent className={cn("mt-0 bg-background p-4", className)} {...props}>
		<ScrollArea
			className="w-full"
			viewportClassName={cn(
				"w-full text-sm font-mono whitespace-nowrap",
				textClassName,
			)}
		>
			<div className="flex items-center justify-between gap-4 min-w-full">
				{children}
			</div>
		</ScrollArea>
	</TabsContent>
);

export const SnippetTabsContents = ({ className, children, ...props }) => (
	<TabsContents className={cn(className)} {...props}>
		{children}
	</TabsContents>
);
