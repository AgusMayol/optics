"use client";

import * as React from "react";
import { CheckIcon, CopyIcon, LoaderCircleIcon, TerminalIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge, type BadgeProps } from "@/registry/optics/badge";
import { Button, type ButtonProps } from "@/registry/optics/button";
import {
	Trace,
	TraceCollapsible,
	TraceCollapsibleContent,
	TraceCollapsibleTrigger,
	TraceIcon,
	TraceLine,
	TraceTitle,
} from "@/registry/optics/trace";

type TerminalContextValue = {
	output?: string;
	isStreaming: boolean;
};

const TerminalContext = React.createContext<TerminalContextValue | null>(null);

export type TerminalProps = React.ComponentProps<"div"> & {
	output?: string;
	isStreaming?: boolean;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

function Terminal({
	output,
	isStreaming = false,
	defaultOpen,
	open,
	onOpenChange,
	className = "",
	children,
	...props
}: TerminalProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean | undefined>(defaultOpen);
	const isControlled = open !== undefined;
	const autoOpen = isStreaming && Boolean(output && output.length > 0);
	const resolvedOpen = isControlled ? open : (uncontrolledOpen ?? autoOpen);

	const handleOpenChange: NonNullable<
		React.ComponentProps<typeof TraceCollapsible>["onOpenChange"]
	> = (nextOpen, eventDetails) => {
		onOpenChange?.(nextOpen);
		if (!isControlled && !eventDetails.isCanceled) {
			setUncontrolledOpen(nextOpen);
		}
	};

	return (
		<TerminalContext.Provider value={{ output, isStreaming }}>
			<Trace data-slot="terminal" className={className} {...props}>
				<TraceCollapsible
					open={resolvedOpen}
					defaultOpen={defaultOpen ?? false}
					onOpenChange={handleOpenChange}
				>
					{children}
				</TraceCollapsible>
			</Trace>
		</TerminalContext.Provider>
	);
}

export type TerminalHeaderProps = React.ComponentProps<"div">;

function TerminalHeader({ className = "", ...props }: TerminalHeaderProps) {
	return (
		<div
			data-slot="terminal-header"
			className={cn("flex w-full min-w-0 items-center gap-2", className)}
			{...props}
		/>
	);
}

export type TerminalTitleProps = React.ComponentProps<typeof TraceCollapsibleTrigger> & {
	command?: string;
};

function TerminalTitle({ command, className = "", children, ...props }: TerminalTitleProps) {
	const ctx = React.useContext(TerminalContext);
	const isStreaming = ctx?.isStreaming ?? false;

	const titleContent =
		children ?? (command ? (isStreaming ? `Running ${command}` : `Ran ${command}`) : "Terminal");

	return (
		<TraceCollapsibleTrigger
			data-slot="terminal-title"
			className={cn("min-w-0", className)}
			{...props}
		>
			<TraceLine status={isStreaming ? "running" : undefined}>
				<TraceIcon>
					<TerminalIcon />
				</TraceIcon>
				<TraceTitle>{titleContent}</TraceTitle>
			</TraceLine>
		</TraceCollapsibleTrigger>
	);
}

export type TerminalStatusProps = BadgeProps & {
	isStreaming?: boolean;
	exitCode?: number;
};

function TerminalStatus({
	isStreaming,
	exitCode,
	variant,
	className = "",
	children,
	...props
}: TerminalStatusProps) {
	const ctx = React.useContext(TerminalContext);
	const streaming = isStreaming ?? ctx?.isStreaming ?? false;

	if (children !== undefined) {
		return (
			<Badge
				data-slot="terminal-status"
				variant={variant ?? "secondary"}
				className={cn("shrink-0", className)}
				{...props}
			>
				{children}
			</Badge>
		);
	}

	if (streaming) {
		return (
			<Badge
				data-slot="terminal-status"
				variant={variant ?? "secondary"}
				className={cn("shrink-0", className)}
				{...props}
			>
				<LoaderCircleIcon className="animate-spin" />
				Running
			</Badge>
		);
	}

	if (exitCode !== undefined) {
		return (
			<Badge
				data-slot="terminal-status"
				variant={variant ?? (exitCode === 0 ? "secondary" : "destructive")}
				className={cn("shrink-0 tabular-nums", className)}
				{...props}
			>
				Exit {exitCode}
			</Badge>
		);
	}

	return null;
}

export type TerminalActionsProps = React.ComponentProps<"div">;

function TerminalActions({ className = "", ...props }: TerminalActionsProps) {
	return (
		<div
			data-slot="terminal-actions"
			className={cn("ml-auto flex shrink-0 items-center gap-1", className)}
			{...props}
		/>
	);
}

export type TerminalCopyButtonProps = Omit<ButtonProps, "value" | "onCopy"> & {
	value?: string;
	onCopy?: () => void;
	timeout?: number;
};

function TerminalCopyButton({
	value,
	onCopy,
	timeout = 2000,
	variant = "ghost",
	size = "icon-xs",
	className = "",
	onClick,
	type = "button",
	...props
}: TerminalCopyButtonProps) {
	const ctx = React.useContext(TerminalContext);
	const [isCopied, setIsCopied] = React.useState(false);
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const textToCopy = value ?? ctx?.output ?? "";

	const handleClick: NonNullable<ButtonProps["onClick"]> = async (event) => {
		onClick?.(event);
		if (event.defaultPrevented || !textToCopy) {
			return;
		}
		if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
			try {
				await navigator.clipboard.writeText(textToCopy);
				setIsCopied(true);
				onCopy?.();
				if (timeoutRef.current !== null) {
					clearTimeout(timeoutRef.current);
				}
				timeoutRef.current = setTimeout(() => {
					setIsCopied(false);
				}, timeout);
			} catch {
				return;
			}
		}
	};

	return (
		<Button
			data-slot="terminal-copy-button"
			type={type}
			variant={variant}
			size={size}
			aria-label={isCopied ? "Copied output" : "Copy output"}
			className={cn("shrink-0 text-muted-foreground hover:text-foreground", className)}
			onClick={handleClick}
			{...props}
		>
			{isCopied ? <CheckIcon /> : <CopyIcon />}
		</Button>
	);
}

export type TerminalContentProps = React.ComponentProps<typeof TraceCollapsibleContent> & {
	output?: string;
};

function TerminalContent({ output, className = "", children, ...props }: TerminalContentProps) {
	const ctx = React.useContext(TerminalContext);
	const resolvedOutput = output ?? ctx?.output;

	return (
		<TraceCollapsibleContent data-slot="terminal-content" className={className} {...props}>
			{children ??
				(resolvedOutput ? (
					<pre className="max-h-64 overflow-x-auto rounded-lg border bg-muted/50 p-3 font-mono text-xs leading-relaxed text-foreground">
						{resolvedOutput}
					</pre>
				) : null)}
		</TraceCollapsibleContent>
	);
}

Terminal.displayName = "Terminal";
TerminalHeader.displayName = "TerminalHeader";
TerminalTitle.displayName = "TerminalTitle";
TerminalStatus.displayName = "TerminalStatus";
TerminalActions.displayName = "TerminalActions";
TerminalCopyButton.displayName = "TerminalCopyButton";
TerminalContent.displayName = "TerminalContent";

export {
	Terminal,
	TerminalHeader,
	TerminalTitle,
	TerminalStatus,
	TerminalActions,
	TerminalCopyButton,
	TerminalContent,
};
