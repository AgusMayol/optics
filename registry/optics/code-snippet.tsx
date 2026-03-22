"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/registry/optics/button";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { ScrollArea } from "@/registry/optics/scroll-area";
import { cn } from "@/registry/optics/lib/utils";

type SnippetProps = React.ComponentProps<typeof Tabs>;
type SnippetHeaderProps = React.ComponentProps<"div">;
type SnippetCopyButtonProps = Omit<
	React.ComponentProps<typeof Button>,
	"children" | "value"
> & {
	render?: Parameters<typeof useRender>[0]["render"];
	value?: string | null;
	onCopy?: () => void;
	onError?: (error: unknown) => void;
	timeout?: number;
};
type SnippetTabsListProps = React.ComponentProps<typeof TabsList>;
type SnippetTabsTriggerProps = React.ComponentProps<typeof TabsTrigger>;
type SnippetTabsContentProps = Omit<
	React.ComponentProps<typeof TabsContent>,
	"children" | "className" | "value"
> & {
	className?: string;
	textClassName?: string;
	value?: string | null;
	children?: React.ReactNode;
};
type SnippetTabsContentsProps = React.ComponentProps<typeof TabsContents>;

export function Snippet({ className = "", ...props }: SnippetProps) {
	return (
		<Tabs
			className={cn(
				"group w-full gap-0 overflow-hidden rounded-md border border-input",
				className,
			)}
			{...props}
		/>
	);
}

export function SnippetHeader({
	className = "",
	...props
}: SnippetHeaderProps) {
	return (
		<div
			className={cn(
				"flex flex-row items-center justify-between border-b bg-secondary p-1",
				className,
			)}
			{...props}
		/>
	);
}

export function SnippetCopyButton({
	render = undefined,
	value = "",
	onCopy = undefined,
	onError = undefined,
	timeout = 2000,
	className = "",
	variant = "ghost",
	size = "icon",
	...props
}: SnippetCopyButtonProps) {
	const [isCopied, setIsCopied] = React.useState(false);

	const copyToClipboard = async () => {
		if (typeof window === "undefined" || !value) return;

		try {
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(value);
			} else {
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

	const buttonContent = (
		<>
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
		</>
	);

	const defaultProps = {
		variant,
		"aria-label": "Copy to clipboard",
		size,
		className: cn("shrink-0", className),
		onClick: copyToClipboard,
		children: buttonContent,
	};

	if (render) {
		return useRender({
			defaultTagName: "button",
			render:
				typeof render === "function"
					? (renderProps, state) => {
							const mergedProps = mergeProps(defaultProps, renderProps);
							return render(mergedProps, {
								...state,
								disabled: false,
								isCopied,
							});
						}
					: render,
			props: mergeProps(defaultProps, props),
			state: {
				disabled: false,
				isCopied,
			},
		});
	}

	return <Button {...defaultProps} {...props} />;
}

export function SnippetTabsList({
	className = "",
	...props
}: SnippetTabsListProps) {
	return <TabsList className={cn(className)} {...props} />;
}

export function SnippetTabsTrigger({
	className = "",
	...props
}: SnippetTabsTriggerProps) {
	return <TabsTrigger className={cn("gap-1.5", className)} {...props} />;
}

export function SnippetTabsContent({
	className = "",
	children = null,
	textClassName = "",
	value = undefined,
	...props
}: SnippetTabsContentProps) {
	const content = (
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
	);

	if (value == null) {
		return (
			<div className={cn("mt-0 bg-background p-4", className)}>{content}</div>
		);
	}

	return (
		<TabsContent
			value={value}
			className={cn("mt-0 bg-background p-4", className)}
			{...props}
		>
			{content}
		</TabsContent>
	);
}

export function SnippetTabsContents({
	className = "",
	children = null,
	...props
}: SnippetTabsContentsProps) {
	return (
		<TabsContents className={cn(className)} {...props}>
			{children}
		</TabsContents>
	);
}
