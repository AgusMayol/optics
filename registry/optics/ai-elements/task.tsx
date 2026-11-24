"use client";

import * as React from "react";
import { CircleAlertIcon, CircleCheckIcon, CircleDotIcon, LoaderCircleIcon } from "lucide-react";

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

export type TaskStatus = "running" | "completed" | "error" | "pending";

export type TaskProps = React.ComponentProps<"div"> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

function Task({
	className = "",
	defaultOpen = false,
	open,
	onOpenChange,
	children,
	...props
}: TaskProps) {
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
		<Trace data-slot="task" className={className} {...props}>
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

function getTaskTraceStatus(status?: TaskStatus): "running" | "error" | "pending" | undefined {
	if (status === "running" || status === "error" || status === "pending") {
		return status;
	}
	return undefined;
}

function TaskStatusIcon({ status }: { status: TaskStatus }) {
	if (status === "running") {
		return <LoaderCircleIcon className="animate-spin" />;
	}
	if (status === "error") {
		return <CircleAlertIcon />;
	}
	if (status === "pending") {
		return <CircleDotIcon />;
	}
	return <CircleCheckIcon />;
}

export type TaskTriggerProps = React.ComponentProps<typeof TraceCollapsibleTrigger> & {
	title: string;
	status?: TaskStatus;
	count?: number;
};

function TaskTrigger({
	title,
	status,
	count,
	className = "",
	children,
	...props
}: TaskTriggerProps) {
	return (
		<TraceCollapsibleTrigger data-slot="task-trigger" className={className} {...props}>
			<TraceLine status={getTaskTraceStatus(status)}>
				{status !== undefined ? (
					<TraceIcon>
						<TaskStatusIcon status={status} />
					</TraceIcon>
				) : null}
				<TraceTitle>{title}</TraceTitle>
				{count !== undefined ? (
					<Badge variant="secondary" className="shrink-0 tabular-nums">
						{count}
					</Badge>
				) : null}
				{children}
			</TraceLine>
		</TraceCollapsibleTrigger>
	);
}

export type TaskContentProps = React.ComponentProps<typeof TraceCollapsibleContent>;

function TaskContent({ className = "", children, ...props }: TaskContentProps) {
	return (
		<TraceCollapsibleContent data-slot="task-content" keepMounted className={className} {...props}>
			<Trace>{children}</Trace>
		</TraceCollapsibleContent>
	);
}

export type TaskItemProps = Omit<React.ComponentProps<typeof TraceLine>, "status"> & {
	status?: TaskStatus;
};

function TaskItem({ status, className = "", children, ...props }: TaskItemProps) {
	return (
		<TraceLine
			data-slot="task-item"
			status={getTaskTraceStatus(status)}
			className={className}
			{...props}
		>
			{status !== undefined ? (
				<TraceIcon>
					<TaskStatusIcon status={status} />
				</TraceIcon>
			) : null}
			<TraceTitle>{children}</TraceTitle>
		</TraceLine>
	);
}

export type TaskItemFileProps = BadgeProps;

function TaskItemFile({ className = "", variant = "outline", ...props }: TaskItemFileProps) {
	return (
		<Badge
			data-slot="task-item-file"
			variant={variant}
			className={cn(
				"rounded-md align-middle font-mono text-[0.6875rem] text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

Task.displayName = "Task";
TaskTrigger.displayName = "TaskTrigger";
TaskContent.displayName = "TaskContent";
TaskItem.displayName = "TaskItem";
TaskItemFile.displayName = "TaskItemFile";

export { Task, TaskTrigger, TaskContent, TaskItem, TaskItemFile };
