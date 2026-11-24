"use client";

import * as React from "react";
import { AlertTriangleIcon, CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import type { Collapsible } from "@/registry/optics/collapsible";
import {
	Trace,
	TraceCollapsible,
	TraceCollapsibleContent,
	TraceCollapsibleTrigger,
	TraceIcon,
	TraceLine,
	TraceTitle,
} from "@/registry/optics/trace";

export interface StackTraceFrameData {
	raw: string;
	filePath: string;
	lineNumber?: number;
	columnNumber?: number;
	functionName?: string;
	isInternal: boolean;
}

interface ParsedStackTrace {
	errorHeader: string;
	errorType: string | null;
	errorMessage: string;
	frames: StackTraceFrameData[];
}

interface StackTraceContextValue extends ParsedStackTrace {
	trace: string;
	onFilePathClick?: (filePath: string, lineNumber?: number, columnNumber?: number) => void;
}

const StackTraceContext = React.createContext<StackTraceContextValue | null>(null);

const FRAME_START_PATTERN = /^(?:at\s+|\S+@\S+:\d+)/;
const V8_PARENS_FULL = /^at\s+(?:async\s+)?(.+?)\s+\((.+?):(\d+):(\d+)\)$/;
const V8_PARENS_LINE = /^at\s+(?:async\s+)?(.+?)\s+\((.+?):(\d+)\)$/;
const V8_PARENS_OPAQUE = /^at\s+(?:async\s+)?(.+?)\s+\((.+)\)$/;
const V8_BARE_FULL = /^at\s+(?:async\s+)?(.+?):(\d+):(\d+)$/;
const V8_BARE_LINE = /^at\s+(?:async\s+)?(.+?):(\d+)$/;
const AT_SYMBOL_FULL = /^(.+?)@(.+?):(\d+):(\d+)$/;
const AT_SYMBOL_LINE = /^(.+?)@(.+?):(\d+)$/;
const ERROR_PREFIX_PATTERN = /^([A-Za-z_$][\w$.]*):\s*(.*)$/;

function isInternalFrame(raw: string): boolean {
	return (
		raw.includes("node_modules") ||
		raw.includes("node:") ||
		raw.includes("<anonymous>") ||
		raw.includes("(internal/")
	);
}

function parseFrameLine(line: string): StackTraceFrameData {
	const raw = line.trim();
	const internal = isInternalFrame(raw);

	const v8ParensFull = raw.match(V8_PARENS_FULL);
	if (v8ParensFull) {
		return {
			raw,
			functionName: v8ParensFull[1],
			filePath: v8ParensFull[2],
			lineNumber: Number(v8ParensFull[3]),
			columnNumber: Number(v8ParensFull[4]),
			isInternal: internal,
		};
	}

	const v8ParensLine = raw.match(V8_PARENS_LINE);
	if (v8ParensLine) {
		return {
			raw,
			functionName: v8ParensLine[1],
			filePath: v8ParensLine[2],
			lineNumber: Number(v8ParensLine[3]),
			isInternal: internal,
		};
	}

	const v8BareFull = raw.match(V8_BARE_FULL);
	if (v8BareFull) {
		return {
			raw,
			filePath: v8BareFull[1],
			lineNumber: Number(v8BareFull[2]),
			columnNumber: Number(v8BareFull[3]),
			isInternal: internal,
		};
	}

	const v8BareLine = raw.match(V8_BARE_LINE);
	if (v8BareLine) {
		return {
			raw,
			filePath: v8BareLine[1],
			lineNumber: Number(v8BareLine[2]),
			isInternal: internal,
		};
	}

	const v8ParensOpaque = raw.match(V8_PARENS_OPAQUE);
	if (v8ParensOpaque) {
		return {
			raw,
			functionName: v8ParensOpaque[1],
			filePath: v8ParensOpaque[2],
			isInternal: internal,
		};
	}

	const atSymbolFull = raw.match(AT_SYMBOL_FULL);
	if (atSymbolFull) {
		return {
			raw,
			functionName: atSymbolFull[1],
			filePath: atSymbolFull[2],
			lineNumber: Number(atSymbolFull[3]),
			columnNumber: Number(atSymbolFull[4]),
			isInternal: internal,
		};
	}

	const atSymbolLine = raw.match(AT_SYMBOL_LINE);
	if (atSymbolLine) {
		return {
			raw,
			functionName: atSymbolLine[1],
			filePath: atSymbolLine[2],
			lineNumber: Number(atSymbolLine[3]),
			isInternal: internal,
		};
	}

	return {
		raw,
		filePath: raw.replace(/^at\s+/, ""),
		isInternal: internal,
	};
}

function parseStackTrace(trace: string): ParsedStackTrace {
	const lines = trace
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter((line) => line.length > 0);

	if (lines.length === 0) {
		return {
			errorHeader: "",
			errorType: null,
			errorMessage: "",
			frames: [],
		};
	}

	const firstFrameIndex = lines.findIndex((line) => FRAME_START_PATTERN.test(line));
	const headerLines = firstFrameIndex === -1 ? lines : lines.slice(0, firstFrameIndex);
	const frameLines = firstFrameIndex === -1 ? [] : lines.slice(firstFrameIndex);

	const errorHeader = headerLines.join(" ");
	const prefixMatch = errorHeader.match(ERROR_PREFIX_PATTERN);

	return {
		errorHeader,
		errorType: prefixMatch ? prefixMatch[1] : null,
		errorMessage: prefixMatch ? prefixMatch[2] : errorHeader,
		frames: frameLines.map(parseFrameLine),
	};
}

export type StackTraceProps = Omit<React.ComponentProps<typeof Trace>, "children"> & {
	trace?: string;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: NonNullable<React.ComponentProps<typeof Collapsible>["onOpenChange"]>;
	onFilePathClick?: (filePath: string, lineNumber?: number, columnNumber?: number) => void;
	children?: React.ReactNode;
};

function StackTrace({
	className = "",
	trace = "",
	open,
	defaultOpen = false,
	onOpenChange,
	onFilePathClick,
	children,
	...props
}: StackTraceProps) {
	const parsed = React.useMemo(() => parseStackTrace(trace), [trace]);

	const contextValue = React.useMemo<StackTraceContextValue>(
		() => ({
			...parsed,
			trace,
			onFilePathClick,
		}),
		[parsed, trace, onFilePathClick],
	);

	return (
		<StackTraceContext.Provider value={contextValue}>
			<Trace data-slot="stack-trace" className={cn(className)} {...props}>
				{open !== undefined ? (
					<TraceCollapsible
						open={open}
						onOpenChange={(nextOpen, eventDetails) => {
							onOpenChange?.(nextOpen, eventDetails);
						}}
					>
						{children}
					</TraceCollapsible>
				) : (
					<TraceCollapsible defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
						{children}
					</TraceCollapsible>
				)}
			</Trace>
		</StackTraceContext.Provider>
	);
}

export type StackTraceActionsProps = React.ComponentProps<"div">;

function StackTraceActions({ className = "", ...props }: StackTraceActionsProps) {
	return (
		<div
			data-slot="stack-trace-actions"
			className={cn("flex shrink-0 items-center gap-1", className)}
			{...props}
		/>
	);
}

export type StackTraceCopyButtonProps = Omit<
	React.ComponentProps<typeof Button>,
	"value" | "onCopy" | "onError"
> & {
	value?: string;
	onCopy?: () => void;
	onError?: (error: Error) => void;
	timeout?: number;
};

function StackTraceCopyButton({
	className = "",
	variant = "ghost",
	size = "icon-xs",
	type = "button",
	value: valueProp,
	onCopy,
	onError,
	onClick,
	timeout = 2000,
	children,
	...props
}: StackTraceCopyButtonProps) {
	const context = React.useContext(StackTraceContext);
	const [copied, setCopied] = React.useState(false);
	const timeoutRef = React.useRef<number | null>(null);
	const textToCopy = valueProp ?? context?.trace ?? "";

	React.useEffect(
		() => () => {
			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current);
			}
		},
		[],
	);

	const handleCopy = async (
		event: Parameters<NonNullable<React.ComponentProps<typeof Button>["onClick"]>>[0],
	) => {
		onClick?.(event);
		if (event.defaultPrevented || !textToCopy) {
			return;
		}
		try {
			if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(textToCopy);
			} else if (typeof document !== "undefined") {
				const textarea = document.createElement("textarea");
				textarea.value = textToCopy;
				textarea.style.position = "fixed";
				textarea.style.opacity = "0";
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			}
			setCopied(true);
			onCopy?.();
			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = window.setTimeout(() => {
				setCopied(false);
				timeoutRef.current = null;
			}, timeout);
		} catch (error) {
			onError?.(error instanceof Error ? error : new Error(String(error)));
		}
	};

	return (
		<Button
			data-slot="stack-trace-copy-button"
			type={type}
			variant={variant}
			size={size}
			aria-label={copied ? "Copied stack trace" : "Copy stack trace"}
			className={cn("text-muted-foreground hover:text-foreground", className)}
			onClick={handleCopy}
			{...props}
		>
			{children ?? (copied ? <CheckIcon /> : <CopyIcon />)}
		</Button>
	);
}

export type StackTraceErrorTypeProps = React.ComponentProps<typeof Badge>;

function StackTraceErrorType({
	className = "",
	variant = "destructive",
	children,
	...props
}: StackTraceErrorTypeProps) {
	const context = React.useContext(StackTraceContext);
	const content = children ?? context?.errorType;

	if (!content) {
		return null;
	}

	return (
		<Badge
			data-slot="stack-trace-error-type"
			variant={variant}
			className={cn("mr-1.5 font-mono", className)}
			{...props}
		>
			{content}
		</Badge>
	);
}

export type StackTraceErrorMessageProps = React.ComponentProps<"span">;

function StackTraceErrorMessage({
	className = "",
	children,
	...props
}: StackTraceErrorMessageProps) {
	const context = React.useContext(StackTraceContext);
	const content = children ?? context?.errorMessage;

	if (!content) {
		return null;
	}

	return (
		<span data-slot="stack-trace-error-message" className={cn(className)} {...props}>
			{content}
		</span>
	);
}

export type StackTraceErrorProps = React.ComponentProps<typeof TraceTitle>;

function StackTraceError({ className = "", children, ...props }: StackTraceErrorProps) {
	const context = React.useContext(StackTraceContext);

	return (
		<TraceTitle data-slot="stack-trace-error" className={cn(className)} {...props}>
			{children ??
				(context?.errorHeader ? (
					<>
						<StackTraceErrorType />
						<StackTraceErrorMessage />
					</>
				) : (
					"Error"
				))}
		</TraceTitle>
	);
}

export type StackTraceHeaderProps = React.ComponentProps<"div">;

function StackTraceHeader({ className = "", children, ...props }: StackTraceHeaderProps) {
	const childArray = React.Children.toArray(children);
	const triggerChildren: React.ReactNode[] = [];
	const actionChildren: React.ReactNode[] = [];

	for (const child of childArray) {
		if (
			React.isValidElement(child) &&
			(child.type === StackTraceActions || child.type === StackTraceCopyButton)
		) {
			actionChildren.push(child);
		} else {
			triggerChildren.push(child);
		}
	}

	return (
		<div
			data-slot="stack-trace-header"
			className={cn("flex w-full min-w-0 items-center justify-between gap-2", className)}
			{...props}
		>
			<TraceCollapsibleTrigger className="min-w-0 flex-1">
				<TraceLine status="error">
					<TraceIcon>
						<AlertTriangleIcon />
					</TraceIcon>
					{triggerChildren.length > 0 ? triggerChildren : <StackTraceError />}
				</TraceLine>
			</TraceCollapsibleTrigger>
			{actionChildren}
		</div>
	);
}

export type StackTraceContentProps = React.ComponentProps<typeof TraceCollapsibleContent>;

function StackTraceContent({ className = "", children, ...props }: StackTraceContentProps) {
	return (
		<TraceCollapsibleContent
			data-slot="stack-trace-content"
			className={cn("flex flex-col gap-2", className)}
			{...props}
		>
			{children ?? <StackTraceFrames />}
		</TraceCollapsibleContent>
	);
}

export interface StackTraceFrameSelectEvent {
	filePath: string;
	lineNumber?: number;
	columnNumber?: number;
	functionName?: string;
	isInternal?: boolean;
}

export type StackTraceFrameProps = Omit<React.ComponentProps<"li">, "onSelect"> & {
	filePath: string;
	lineNumber?: number;
	columnNumber?: number;
	functionName?: string;
	isInternal?: boolean;
	onSelectFrame?: (frame: StackTraceFrameSelectEvent) => void;
};

function StackTraceFrame({
	className = "",
	filePath,
	lineNumber,
	columnNumber,
	functionName,
	isInternal = false,
	onSelectFrame,
	children,
	...props
}: StackTraceFrameProps) {
	const context = React.useContext(StackTraceContext);
	const location =
		lineNumber !== undefined
			? columnNumber !== undefined
				? `${filePath}:${lineNumber}:${columnNumber}`
				: `${filePath}:${lineNumber}`
			: filePath;

	const isInteractive = Boolean(onSelectFrame || context?.onFilePathClick);

	const handleSelect = () => {
		onSelectFrame?.({
			filePath,
			lineNumber,
			columnNumber,
			functionName,
			isInternal,
		});
		context?.onFilePathClick?.(filePath, lineNumber, columnNumber);
	};

	return (
		<li
			data-slot="stack-trace-frame"
			data-internal={isInternal ? "true" : undefined}
			className={cn(
				"font-mono text-xs whitespace-nowrap",
				isInternal ? "text-muted-foreground/60" : "text-foreground",
				className,
			)}
			{...props}
		>
			{children ?? (
				<code className="font-mono text-xs">
					<span className="text-muted-foreground/70">at </span>
					{functionName && <span>{functionName} </span>}
					{isInteractive ? (
						<Button
							type="button"
							variant="link"
							onClick={handleSelect}
							className="inline-flex h-auto border-0 py-0 font-mono text-xs text-current"
						>
							({location})
						</Button>
					) : (
						<span>({location})</span>
					)}
				</code>
			)}
		</li>
	);
}

export type StackTraceFramesProps = React.ComponentProps<"div"> & {
	showInternalFrames?: boolean;
};

function StackTraceFrames({
	className = "",
	showInternalFrames = true,
	children,
	...props
}: StackTraceFramesProps) {
	const context = React.useContext(StackTraceContext);
	const frames = context?.frames ?? [];
	const visibleFrames = showInternalFrames ? frames : frames.filter((frame) => !frame.isInternal);

	return (
		<div
			data-slot="stack-trace-frames"
			className={cn(
				"overflow-x-auto rounded-md border bg-muted/50 p-3 font-mono text-xs",
				className,
			)}
			{...props}
		>
			{children ?? (
				<>
					{context?.errorHeader && (
						<pre className="mb-2 font-mono text-xs break-words whitespace-pre-wrap text-destructive">
							<code>{context.errorHeader}</code>
						</pre>
					)}
					{visibleFrames.length > 0 ? (
						<ol className="flex flex-col gap-1 font-mono text-xs">
							{visibleFrames.map((frame, index) => (
								<StackTraceFrame
									key={`${frame.raw}-${index}`}
									filePath={frame.filePath}
									lineNumber={frame.lineNumber}
									columnNumber={frame.columnNumber}
									functionName={frame.functionName}
									isInternal={frame.isInternal}
								/>
							))}
						</ol>
					) : (
						!context?.errorHeader && (
							<pre className="font-mono text-xs text-muted-foreground">
								<code>No stack frames</code>
							</pre>
						)
					)}
				</>
			)}
		</div>
	);
}

StackTrace.displayName = "StackTrace";
StackTraceHeader.displayName = "StackTraceHeader";
StackTraceError.displayName = "StackTraceError";
StackTraceErrorType.displayName = "StackTraceErrorType";
StackTraceErrorMessage.displayName = "StackTraceErrorMessage";
StackTraceActions.displayName = "StackTraceActions";
StackTraceCopyButton.displayName = "StackTraceCopyButton";
StackTraceContent.displayName = "StackTraceContent";
StackTraceFrames.displayName = "StackTraceFrames";
StackTraceFrame.displayName = "StackTraceFrame";

export {
	StackTrace,
	StackTraceHeader,
	StackTraceError,
	StackTraceErrorType,
	StackTraceErrorMessage,
	StackTraceActions,
	StackTraceCopyButton,
	StackTraceContent,
	StackTraceFrames,
	StackTraceFrame,
};
