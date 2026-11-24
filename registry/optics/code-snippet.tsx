"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { Button } from "@/registry/optics/button";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "@/registry/optics/tabs";
import { ScrollArea } from "@/registry/optics/scroll-area";
import { cn } from "@/registry/optics/lib/utils";

export const Snippet = ({ className = "", ...props }: ComponentProps<typeof Tabs>) => (
	<Tabs
		className={cn("group w-full gap-0 overflow-hidden rounded-md border border-input", className)}
		{...props}
	/>
);

export const SnippetHeader = ({ className = "", ...props }: ComponentProps<"div">) => (
	<div
		className={cn(
			"flex flex-row items-center justify-between border-b bg-secondary p-1",
			className,
		)}
		{...props}
	/>
);

type SnippetCopyButtonState = {
	isCopied: boolean;
};

export type SnippetCopyButtonProps = Omit<
	ComponentProps<typeof Button>,
	"onCopy" | "onError" | "render" | "value" | "style"
> & {
	render?: useRender.RenderProp<SnippetCopyButtonState>;
	value?: string;
	onCopy?: () => void;
	onError?: (error: Error) => void;
	timeout?: number;
	style?: ComponentProps<"button">["style"];
};

export const SnippetCopyButton = ({
	render = undefined,
	value = "",
	onCopy = undefined,
	onError = undefined,
	timeout = 2000,
	...props
}: SnippetCopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);

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
			onError?.(error instanceof Error ? error : new Error(String(error)));
		}
	};

	const buttonContent = (
		<>
			<div className="relative">
				<div
					className={cn(
						"absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out will-change-[transform,opacity,filter]",
						isCopied ? "scale-100 opacity-100 blur-0" : "blur-xs scale-[0.25] opacity-0",
					)}
				>
					<CheckIcon className="text-muted-foreground" size={14} />
				</div>
				<div
					className={cn(
						"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter]",
						isCopied ? "blur-xs scale-[0.25] opacity-0" : "scale-100 opacity-100 blur-0",
					)}
				>
					<CopyIcon className="text-muted-foreground" size={14} />
				</div>
			</div>
			<span className="sr-only">Copy to clipboard</span>
		</>
	);

	const htmlDefaultProps: ComponentProps<"button"> = {
		role: "button",
		"aria-label": "Copy to clipboard",
		className: cn("shrink-0"),
		onClick: copyToClipboard,
		children: buttonContent,
	};

	const {
		ref,
		variant: _variant,
		size: _size,
		animation: _animation,
		focusableWhenDisabled: _focusableWhenDisabled,
		nativeButton: _nativeButton,
		...htmlProps
	} = props;

	const rendered = useRender({
		enabled: Boolean(render),
		ref,
		defaultTagName: "button",
		render:
			typeof render === "function"
				? (renderProps, state) => {
						const mergedProps = mergeProps<"button">(htmlDefaultProps, renderProps);
						return render(mergedProps, { ...state, isCopied });
					}
				: render,
		props: mergeProps<"button">(htmlDefaultProps, htmlProps),
		state: {
			isCopied,
		},
	});

	if (render) {
		return rendered;
	}

	return <Button {...htmlDefaultProps} variant="ghost" size="icon" {...props} />;
};

export const SnippetTabsList = ({ className = "", ...props }: ComponentProps<typeof TabsList>) => (
	<TabsList className={cn(className)} {...props} />
);

export const SnippetTabsTrigger = ({
	className = "",
	...props
}: ComponentProps<typeof TabsTrigger>) => (
	<TabsTrigger className={cn("gap-1.5", className)} {...props} />
);

export type SnippetTabsContentProps = ComponentProps<typeof TabsContent> & {
	textClassName?: string;
};

export const SnippetTabsContent = ({
	className = "",
	children = null,
	textClassName = "",
	...props
}: SnippetTabsContentProps) => (
	<TabsContent className={cn("mt-0 bg-background p-4", className)} {...props}>
		<ScrollArea
			className="w-full"
			viewportClassName={cn("w-full text-sm font-mono whitespace-nowrap", textClassName)}
		>
			<div className="flex items-center justify-between gap-4 min-w-full">{children}</div>
		</ScrollArea>
	</TabsContent>
);

export const SnippetTabsContents = ({
	className = "",
	children = null,
	...props
}: ComponentProps<typeof TabsContents>) => (
	<TabsContents className={cn(className)} {...props}>
		{children}
	</TabsContents>
);

Snippet.displayName = "Snippet";
SnippetHeader.displayName = "SnippetHeader";
SnippetCopyButton.displayName = "SnippetCopyButton";
SnippetTabsList.displayName = "SnippetTabsList";
SnippetTabsTrigger.displayName = "SnippetTabsTrigger";
SnippetTabsContent.displayName = "SnippetTabsContent";
SnippetTabsContents.displayName = "SnippetTabsContents";
