"use client";

import * as React from "react";
import {
	CircleAlertIcon,
	CircleCheckIcon,
	ClockIcon,
	LoaderCircleIcon,
	WrenchIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge, type BadgeProps } from "@/registry/optics/badge";
import {
	Trace,
	TraceCollapsible,
	TraceCollapsibleContent,
	TraceCollapsibleTrigger,
	TraceIcon,
	TraceLine,
	TraceTitle,
} from "@/registry/optics/trace";

export type ToolState =
	| "input-streaming"
	| "input-available"
	| "approval-requested"
	| "output-available"
	| "output-error";

export type ToolProps = React.ComponentProps<"div"> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

function Tool({
	className = "",
	defaultOpen = false,
	open,
	onOpenChange,
	children,
	...props
}: ToolProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
	const isControlled = open !== undefined;
	const resolvedOpen = isControlled ? open : uncontrolledOpen;

	const handleOpenChange: NonNullable<
		React.ComponentProps<typeof TraceCollapsible>["onOpenChange"]
	> = (nextOpen, eventDetails) => {
		onOpenChange?.(nextOpen);
		if (!isControlled && !eventDetails.isCanceled) {
			setUncontrolledOpen(nextOpen);
		}
	};

	return (
		<Trace data-slot="tool" className={className} {...props}>
			<TraceCollapsible
				open={resolvedOpen}
				defaultOpen={defaultOpen}
				onOpenChange={handleOpenChange}
			>
				{children}
			</TraceCollapsible>
		</Trace>
	);
}

const TOOL_STATE_META: Record<
	ToolState,
	{
		traceStatus: "running" | "error" | "pending" | undefined;
		label: string;
		variant: BadgeProps["variant"];
	}
> = {
	"input-streaming": {
		traceStatus: "running",
		label: "Pending",
		variant: "secondary",
	},
	"input-available": {
		traceStatus: "running",
		label: "Running",
		variant: "secondary",
	},
	"approval-requested": {
		traceStatus: "pending",
		label: "Awaiting approval",
		variant: "outline",
	},
	"output-available": {
		traceStatus: undefined,
		label: "Completed",
		variant: "secondary",
	},
	"output-error": {
		traceStatus: "error",
		label: "Error",
		variant: "destructive",
	},
};

function ToolStateBadgeIcon({ state }: { state: ToolState }) {
	switch (state) {
		case "input-streaming":
		case "input-available":
			return <LoaderCircleIcon className="animate-spin" />;
		case "approval-requested":
			return <ClockIcon />;
		case "output-available":
			return <CircleCheckIcon />;
		case "output-error":
			return <CircleAlertIcon />;
	}
}

export type ToolHeaderProps = React.ComponentProps<typeof TraceCollapsibleTrigger> & {
	name?: string;
	type?: string;
	state: ToolState;
	title?: string;
};

function formatToolType(type?: string): string | undefined {
	if (!type) return undefined;
	return type.startsWith("tool-") ? type.slice(5) : type;
}

function ToolHeader({
	name,
	type,
	state,
	title,
	className = "",
	children,
	...props
}: ToolHeaderProps) {
	const meta = TOOL_STATE_META[state];
	const resolvedTitle = title ?? name ?? formatToolType(type) ?? "Tool";

	return (
		<TraceCollapsibleTrigger data-slot="tool-header" className={className} {...props}>
			<TraceLine status={meta.traceStatus}>
				<TraceIcon>
					<WrenchIcon />
				</TraceIcon>
				<TraceTitle>{resolvedTitle}</TraceTitle>
				<Badge variant={meta.variant} className="shrink-0">
					<ToolStateBadgeIcon state={state} />
					{meta.label}
				</Badge>
				{children}
			</TraceLine>
		</TraceCollapsibleTrigger>
	);
}

export type ToolContentProps = React.ComponentProps<typeof TraceCollapsibleContent>;

function ToolContent({ className = "", children, ...props }: ToolContentProps) {
	return (
		<TraceCollapsibleContent
			data-slot="tool-content"
			keepMounted
			className={cn("flex flex-col gap-3", className)}
			{...props}
		>
			{children}
		</TraceCollapsibleContent>
	);
}

function formatToolData(value: unknown): string {
	if (typeof value === "string") {
		return value;
	}
	try {
		return JSON.stringify(value, null, 2) ?? String(value);
	} catch {
		return String(value);
	}
}

export type ToolInputProps = React.ComponentProps<"div"> & {
	input: unknown;
};

function ToolInput({ input, className = "", ...props }: ToolInputProps) {
	if (input === undefined) {
		return null;
	}

	return (
		<div data-slot="tool-input" className={cn("flex flex-col gap-1.5", className)} {...props}>
			<span className="text-xs font-medium text-muted-foreground">Parameters</span>
			<pre className="overflow-x-auto rounded-lg border bg-muted/50 p-3 font-mono text-xs leading-relaxed text-foreground">
				{formatToolData(input)}
			</pre>
		</div>
	);
}

export type ToolOutputProps = React.ComponentProps<"div"> & {
	output?: React.ReactNode;
	errorText?: string;
};

function getToolOutputText(output: React.ReactNode): string | null {
	if (
		typeof output === "string" ||
		typeof output === "number" ||
		typeof output === "boolean" ||
		typeof output === "bigint"
	) {
		return String(output);
	}

	if (
		typeof output === "object" &&
		output !== null &&
		!React.isValidElement(output) &&
		!(Symbol.iterator in output)
	) {
		return formatToolData(output);
	}

	return null;
}

function ToolOutput({ output, errorText, className = "", ...props }: ToolOutputProps) {
	const hasOutput = output !== undefined && output !== null && output !== "";
	const hasError = Boolean(errorText);

	if (!hasOutput && !hasError) {
		return null;
	}

	const outputText = hasError ? null : getToolOutputText(output);

	return (
		<div data-slot="tool-output" className={cn("flex flex-col gap-1.5", className)} {...props}>
			<span
				className={cn(
					"text-xs font-medium",
					hasError ? "text-destructive" : "text-muted-foreground",
				)}
			>
				{hasError ? "Error" : "Result"}
			</span>
			{hasError ? (
				<pre className="overflow-x-auto rounded-lg border bg-muted/50 p-3 font-mono text-xs leading-relaxed text-destructive">
					{errorText}
				</pre>
			) : outputText !== null ? (
				<pre className="overflow-x-auto rounded-lg border bg-muted/50 p-3 font-mono text-xs leading-relaxed text-foreground">
					{outputText}
				</pre>
			) : (
				<div className="overflow-x-auto rounded-lg border bg-muted/50 p-3 text-xs leading-relaxed text-foreground">
					{output}
				</div>
			)}
		</div>
	);
}

Tool.displayName = "Tool";
ToolHeader.displayName = "ToolHeader";
ToolContent.displayName = "ToolContent";
ToolInput.displayName = "ToolInput";
ToolOutput.displayName = "ToolOutput";

export { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput };
