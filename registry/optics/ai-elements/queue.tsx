"use client";

import * as React from "react";
import { CircleCheckIcon, CircleDotIcon, CircleIcon } from "lucide-react";

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

export type QueueProps = React.ComponentProps<typeof Trace>;

function Queue({ className = "", ...props }: QueueProps) {
	return <Trace data-slot="queue" className={cn(className)} {...props} />;
}

export type QueueSectionProps = Omit<
	React.ComponentProps<typeof Collapsible>,
	"className" | "open" | "onOpenChange"
> & {
	className?: string;
	open?: boolean;
	onOpenChange?: NonNullable<React.ComponentProps<typeof TraceCollapsible>["onOpenChange"]>;
};

function QueueSection({
	className = "",
	open,
	defaultOpen = true,
	onOpenChange,
	...props
}: QueueSectionProps) {
	if (open !== undefined) {
		return (
			<TraceCollapsible
				data-slot="queue-section"
				open={open}
				onOpenChange={(nextOpen, eventDetails) => {
					onOpenChange?.(nextOpen, eventDetails);
				}}
				className={cn(className)}
				{...props}
			/>
		);
	}

	return (
		<TraceCollapsible
			data-slot="queue-section"
			defaultOpen={defaultOpen}
			onOpenChange={onOpenChange}
			className={cn(className)}
			{...props}
		/>
	);
}

export type QueueSectionLabelProps = React.ComponentProps<typeof TraceLine> & {
	count?: number;
	label?: React.ReactNode;
	icon?: React.ReactNode;
};

function QueueSectionLabel({
	className = "",
	count,
	label,
	icon,
	children,
	...props
}: QueueSectionLabelProps) {
	const hasStructuredHeader = label !== undefined || count !== undefined;
	const isPlainChild = typeof children === "string" || typeof children === "number";

	return (
		<TraceLine data-slot="queue-section-label" className={cn(className)} {...props}>
			{icon !== undefined && <TraceIcon>{icon}</TraceIcon>}
			{hasStructuredHeader ? (
				<>
					{label !== undefined && <TraceTitle>{label}</TraceTitle>}
					{count !== undefined && (
						<Badge variant="secondary" className="tabular-nums">
							{count}
						</Badge>
					)}
					{children}
				</>
			) : isPlainChild ? (
				<TraceTitle>{children}</TraceTitle>
			) : (
				children
			)}
		</TraceLine>
	);
}

export type QueueSectionTriggerProps = Omit<
	React.ComponentProps<typeof TraceCollapsibleTrigger>,
	"children"
> & {
	count?: number;
	label?: React.ReactNode;
	icon?: React.ReactNode;
	children?: React.ReactNode;
};

function QueueSectionTrigger({
	className = "",
	count,
	label,
	icon,
	children,
	...props
}: QueueSectionTriggerProps) {
	const hasLabelProps = label !== undefined || count !== undefined || icon !== undefined;

	return (
		<TraceCollapsibleTrigger data-slot="queue-section-trigger" className={cn(className)} {...props}>
			{hasLabelProps ? (
				<QueueSectionLabel count={count} label={label} icon={icon}>
					{children}
				</QueueSectionLabel>
			) : (
				children
			)}
		</TraceCollapsibleTrigger>
	);
}

export type QueueSectionContentProps = React.ComponentProps<typeof TraceCollapsibleContent>;

function QueueSectionContent({ className = "", ...props }: QueueSectionContentProps) {
	return (
		<TraceCollapsibleContent
			data-slot="queue-section-content"
			className={cn(className)}
			{...props}
		/>
	);
}

export type QueueListProps = React.ComponentProps<typeof Trace>;

function QueueList({ className = "", ...props }: QueueListProps) {
	return <Trace data-slot="queue-list" className={cn(className)} {...props} />;
}

interface QueueItemContextValue {
	completed: boolean;
	status?: React.ComponentProps<typeof TraceLine>["status"];
}

const QueueItemContext = React.createContext<QueueItemContextValue | null>(null);

export type QueueItemProps = React.ComponentProps<typeof TraceLine> & {
	completed?: boolean;
};

function QueueItem({
	className = "",
	completed = false,
	status,
	children,
	...props
}: QueueItemProps) {
	const contextValue = React.useMemo<QueueItemContextValue>(
		() => ({ completed, status }),
		[completed, status],
	);

	return (
		<QueueItemContext.Provider value={contextValue}>
			<TraceLine
				data-slot="queue-item"
				data-completed={completed ? "true" : undefined}
				status={status}
				className={cn(
					"group/queue-item w-full flex-wrap items-center gap-x-2 gap-y-0.5",
					completed && "text-muted-foreground/70",
					className,
				)}
				{...props}
			>
				{children}
			</TraceLine>
		</QueueItemContext.Provider>
	);
}

export type QueueItemIndicatorProps = React.ComponentProps<typeof TraceIcon> & {
	completed?: boolean;
};

function QueueItemIndicator({
	className = "",
	completed,
	children,
	...props
}: QueueItemIndicatorProps) {
	const itemContext = React.useContext(QueueItemContext);
	const isCompleted = completed ?? itemContext?.completed ?? false;
	const isRunning = itemContext?.status === "running";

	return (
		<TraceIcon
			data-slot="queue-item-indicator"
			className={cn("order-1", isCompleted && "text-foreground", className)}
			{...props}
		>
			{children ??
				(isCompleted ? <CircleCheckIcon /> : isRunning ? <CircleDotIcon /> : <CircleIcon />)}
		</TraceIcon>
	);
}

export type QueueItemContentProps = React.ComponentProps<typeof TraceTitle>;

function QueueItemContent({ className = "", ...props }: QueueItemContentProps) {
	const itemContext = React.useContext(QueueItemContext);
	const isCompleted = itemContext?.completed ?? false;

	return (
		<TraceTitle
			data-slot="queue-item-content"
			className={cn(
				"order-2 min-w-0 flex-1",
				isCompleted && "text-muted-foreground/70 line-through",
				className,
			)}
			{...props}
		/>
	);
}

export type QueueItemDescriptionProps = React.ComponentProps<"span">;

function QueueItemDescription({ className = "", ...props }: QueueItemDescriptionProps) {
	return (
		<span
			data-slot="queue-item-description"
			className={cn("order-4 basis-full pl-6 text-xs text-muted-foreground/80", className)}
			{...props}
		/>
	);
}

export type QueueItemActionsProps = React.ComponentProps<"span">;

function QueueItemActions({ className = "", ...props }: QueueItemActionsProps) {
	return (
		<span
			data-slot="queue-item-actions"
			className={cn(
				"order-3 ml-auto flex shrink-0 items-center gap-1 opacity-70 transition-opacity group-focus-within/queue-item:opacity-100 group-hover/queue-item:opacity-100",
				className,
			)}
			{...props}
		/>
	);
}

export type QueueItemActionProps = React.ComponentProps<typeof Button>;

function QueueItemAction({
	className = "",
	type = "button",
	variant = "ghost",
	size = "icon-xs",
	...props
}: QueueItemActionProps) {
	return (
		<Button
			data-slot="queue-item-action"
			type={type}
			variant={variant}
			size={size}
			className={cn("text-muted-foreground hover:text-foreground", className)}
			{...props}
		/>
	);
}

Queue.displayName = "Queue";
QueueSection.displayName = "QueueSection";
QueueSectionTrigger.displayName = "QueueSectionTrigger";
QueueSectionLabel.displayName = "QueueSectionLabel";
QueueSectionContent.displayName = "QueueSectionContent";
QueueList.displayName = "QueueList";
QueueItem.displayName = "QueueItem";
QueueItemIndicator.displayName = "QueueItemIndicator";
QueueItemContent.displayName = "QueueItemContent";
QueueItemDescription.displayName = "QueueItemDescription";
QueueItemActions.displayName = "QueueItemActions";
QueueItemAction.displayName = "QueueItemAction";

export {
	Queue,
	QueueSection,
	QueueSectionTrigger,
	QueueSectionLabel,
	QueueSectionContent,
	QueueList,
	QueueItem,
	QueueItemIndicator,
	QueueItemContent,
	QueueItemDescription,
	QueueItemActions,
	QueueItemAction,
};
