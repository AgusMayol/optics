"use client";

import * as React from "react";
import { CircleAlertIcon, CircleCheckIcon, LoaderCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import {
	Trace,
	TraceCollapsible,
	TraceCollapsibleContent,
	TraceCollapsibleTrigger,
	TraceDescription,
	TraceIcon,
	TraceLine,
	TraceTitle,
} from "@/registry/optics/trace";

export type SubagentStatus = "running" | "completed" | "error";

export type SubagentProps = React.ComponentProps<"div"> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

function Subagent({
	className = "",
	defaultOpen = false,
	open,
	onOpenChange,
	children,
	...props
}: SubagentProps) {
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
		<Trace data-slot="subagent" className={className} {...props}>
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

export type SubagentHeaderProps = React.ComponentProps<typeof TraceCollapsibleTrigger> & {
	name: string;
	role?: string;
	status: SubagentStatus;
};

function getSubagentTraceStatus(status: SubagentStatus): "running" | "error" | undefined {
	if (status === "running") return "running";
	if (status === "error") return "error";
	return undefined;
}

function SubagentStatusIcon({ status }: { status: SubagentStatus }) {
	if (status === "running") {
		return <LoaderCircleIcon className="animate-spin" />;
	}
	if (status === "error") {
		return <CircleAlertIcon />;
	}
	return <CircleCheckIcon />;
}

function SubagentHeader({
	name,
	role,
	status,
	className = "",
	children,
	...props
}: SubagentHeaderProps) {
	return (
		<TraceCollapsibleTrigger data-slot="subagent-header" className={className} {...props}>
			<TraceLine status={getSubagentTraceStatus(status)}>
				<TraceIcon>
					<SubagentStatusIcon status={status} />
				</TraceIcon>
				<TraceTitle>{name}</TraceTitle>
				{role ? (
					<Badge variant="secondary" className="shrink-0">
						{role}
					</Badge>
				) : null}
				{children}
			</TraceLine>
		</TraceCollapsibleTrigger>
	);
}

export type SubagentContentProps = React.ComponentProps<typeof TraceCollapsibleContent>;

function SubagentContent({ className = "", children, ...props }: SubagentContentProps) {
	return (
		<TraceCollapsibleContent
			data-slot="subagent-content"
			keepMounted
			className={cn("flex flex-col gap-2", className)}
			{...props}
		>
			{children}
		</TraceCollapsibleContent>
	);
}

export type SubagentToolCallProps = Omit<React.ComponentProps<typeof TraceLine>, "status"> & {
	name: string;
	status?: SubagentStatus;
	summary?: string;
};

function SubagentToolCall({
	name,
	status = "completed",
	summary,
	className = "",
	children,
	...props
}: SubagentToolCallProps) {
	return (
		<TraceLine
			data-slot="subagent-tool-call"
			status={getSubagentTraceStatus(status)}
			className={className}
			{...props}
		>
			<TraceIcon>
				<SubagentStatusIcon status={status} />
			</TraceIcon>
			<TraceTitle>{name}</TraceTitle>
			{summary ? (
				<TraceDescription className="min-w-0 shrink truncate text-xs">{summary}</TraceDescription>
			) : null}
			{children}
		</TraceLine>
	);
}

export type SubagentResultProps = React.ComponentProps<"div">;

function SubagentResult({ className = "", ...props }: SubagentResultProps) {
	return (
		<div
			data-slot="subagent-result"
			className={cn("pt-1 text-sm leading-relaxed text-foreground", className)}
			{...props}
		/>
	);
}

Subagent.displayName = "Subagent";
SubagentHeader.displayName = "SubagentHeader";
SubagentContent.displayName = "SubagentContent";
SubagentToolCall.displayName = "SubagentToolCall";
SubagentResult.displayName = "SubagentResult";

export { Subagent, SubagentHeader, SubagentContent, SubagentToolCall, SubagentResult };
