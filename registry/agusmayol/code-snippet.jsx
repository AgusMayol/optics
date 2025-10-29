"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { cloneElement, useState } from "react";
import { Button } from "@/registry/agusmayol/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Snippet = ({ className, ...props }) => (
	<Tabs
		className={cn(
			"group w-full gap-0 overflow-hidden rounded-md border",
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

	const copyToClipboard = () => {
		if (
			typeof window === "undefined" ||
			!navigator.clipboard.writeText ||
			!value
		) {
			return;
		}

		navigator.clipboard.writeText(value).then(() => {
			setIsCopied(true);
			onCopy?.();

			setTimeout(() => setIsCopied(false), timeout);
		}, onError);
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

export const SnippetTabsList = TabsList;

export const SnippetTabsTrigger = ({ className, ...props }) => (
	<TabsTrigger className={cn("gap-1.5", className)} {...props} />
);

export const SnippetTabsContent = ({ className, children, ...props }) => (
	<TabsContent
		asChild
		className={cn("mt-0 bg-background p-4 text-sm", className)}
		{...props}
	>
		<pre className="truncate">{children}</pre>
	</TabsContent>
);
