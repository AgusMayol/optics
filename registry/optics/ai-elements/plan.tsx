"use client";

import * as React from "react";
import {
	CircleAlertIcon,
	CircleCheckIcon,
	CircleDotIcon,
	CircleIcon,
	RouteIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import { Progress } from "@/registry/optics/progress";
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

export type PlanStepStatus = "completed" | "in-progress" | "pending" | "error";

interface PlanContextValue {
	isStreaming: boolean | undefined;
}

const PlanContext = React.createContext<PlanContextValue>({
	isStreaming: undefined,
});

export interface PlanProps extends Omit<React.ComponentProps<typeof Trace>, "onChange"> {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	isStreaming?: boolean;
}

function Plan({
	open,
	defaultOpen = false,
	onOpenChange,
	isStreaming,
	className = "",
	children,
	...props
}: PlanProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
	const isControlled = open !== undefined;
	const resolvedOpen = isControlled ? open : uncontrolledOpen;

	const handleOpenChange: NonNullable<
		React.ComponentProps<typeof TraceCollapsible>["onOpenChange"]
	> = (nextOpen, eventDetails) => {
		if (!isControlled && !eventDetails.isCanceled) {
			setUncontrolledOpen(nextOpen);
		}
		onOpenChange?.(nextOpen);
	};

	return (
		<PlanContext.Provider value={{ isStreaming }}>
			<Trace data-slot="plan" className={cn(className)} {...props}>
				<TraceCollapsible
					open={resolvedOpen}
					defaultOpen={defaultOpen}
					onOpenChange={handleOpenChange}
					className="gap-2"
				>
					{children}
				</TraceCollapsible>
			</Trace>
		</PlanContext.Provider>
	);
}

export interface PlanHeaderProps extends React.ComponentProps<typeof TraceCollapsibleTrigger> {
	icon?: React.ReactNode;
	badge?: React.ReactNode;
}

function PlanHeader({ icon, badge, className = "", children, ...props }: PlanHeaderProps) {
	const { isStreaming } = React.useContext(PlanContext);

	return (
		<TraceCollapsibleTrigger data-slot="plan-header" className={cn(className)} {...props}>
			<TraceLine status={isStreaming ? "running" : undefined}>
				<TraceIcon>{icon ?? <RouteIcon />}</TraceIcon>
				{children}
				{badge !== undefined
					? badge
					: isStreaming && (
							<Badge variant="secondary" className="ml-1 shrink-0">
								Streaming
							</Badge>
						)}
			</TraceLine>
		</TraceCollapsibleTrigger>
	);
}

export type PlanTitleProps = React.ComponentProps<typeof TraceTitle>;

function PlanTitle({ className = "", ...props }: PlanTitleProps) {
	return <TraceTitle data-slot="plan-title" className={cn("font-medium", className)} {...props} />;
}

export type PlanDescriptionProps = React.ComponentProps<typeof TraceDescription>;

function PlanDescription({ className = "", ...props }: PlanDescriptionProps) {
	return <TraceDescription data-slot="plan-description" className={cn(className)} {...props} />;
}

export interface PlanProgressProps extends Omit<
	React.ComponentProps<typeof Progress>,
	"value" | "max"
> {
	completed?: number;
	total?: number;
	value?: number;
	max?: number;
	showLabel?: boolean;
}

function PlanProgress({
	completed,
	total,
	value,
	max,
	showLabel = true,
	className = "",
	...props
}: PlanProgressProps) {
	let percent = 0;
	let labelText = "0%";

	if (completed !== undefined && total !== undefined) {
		const safeTotal = Math.max(total, 0);
		const safeCompleted = Math.min(Math.max(completed, 0), safeTotal);
		percent = safeTotal > 0 ? Math.round((safeCompleted / safeTotal) * 100) : 0;
		labelText = `${safeCompleted}/${safeTotal}`;
	} else {
		const safeMax = max !== undefined && max > 0 ? max : 100;
		const safeValue = Math.min(Math.max(value ?? 0, 0), safeMax);
		percent = Math.round((safeValue / safeMax) * 100);
		labelText = `${percent}%`;
	}

	return (
		<div data-slot="plan-progress" className={cn("flex w-full items-center gap-2.5", className)}>
			<Progress
				value={percent}
				max={100}
				aria-label={props["aria-label"] ?? "Plan progress"}
				className="min-w-0 flex-1 gap-0"
				{...props}
			/>
			{showLabel && (
				<Badge
					variant={percent === 100 ? "secondary" : "outline"}
					className="shrink-0 tabular-nums"
				>
					{labelText}
				</Badge>
			)}
		</div>
	);
}

export type PlanContentProps = React.ComponentProps<typeof TraceCollapsibleContent>;

function PlanContent({ className = "", children, ...props }: PlanContentProps) {
	return (
		<TraceCollapsibleContent data-slot="plan-content" className={cn(className)} {...props}>
			<Trace className="gap-1.5">{children}</Trace>
		</TraceCollapsibleContent>
	);
}

export interface PlanStepProps extends Omit<React.ComponentProps<typeof TraceLine>, "status"> {
	status?: PlanStepStatus;
	icon?: React.ReactNode;
	description?: React.ReactNode;
}

function getStepTraceStatus(
	status: PlanStepStatus,
	isStreaming: boolean | undefined,
): React.ComponentProps<typeof TraceLine>["status"] {
	switch (status) {
		case "error":
			return "error";
		case "pending":
			return "pending";
		case "in-progress":
			return isStreaming !== false ? "running" : undefined;
		case "completed":
			return undefined;
		default: {
			const exhaustive: never = status;
			return exhaustive;
		}
	}
}

function getStepDefaultIcon(status: PlanStepStatus): React.ReactNode {
	switch (status) {
		case "completed":
			return <CircleCheckIcon className="text-emerald-600 dark:text-emerald-400" />;
		case "in-progress":
			return <CircleDotIcon className="text-foreground" />;
		case "pending":
			return <CircleIcon />;
		case "error":
			return <CircleAlertIcon />;
		default: {
			const exhaustive: never = status;
			return exhaustive;
		}
	}
}

function PlanStep({
	status = "pending",
	icon,
	description,
	className = "",
	children,
	...props
}: PlanStepProps) {
	const { isStreaming } = React.useContext(PlanContext);
	const traceStatus = getStepTraceStatus(status, isStreaming);

	return (
		<TraceLine
			data-slot="plan-step"
			data-step-status={status}
			status={traceStatus}
			className={cn(className)}
			{...props}
		>
			<TraceIcon>{icon ?? getStepDefaultIcon(status)}</TraceIcon>
			<TraceTitle className={status === "completed" ? "text-foreground" : undefined}>
				{children}
			</TraceTitle>
			{description !== undefined && <TraceDescription>{description}</TraceDescription>}
		</TraceLine>
	);
}

Plan.displayName = "Plan";
PlanHeader.displayName = "PlanHeader";
PlanTitle.displayName = "PlanTitle";
PlanDescription.displayName = "PlanDescription";
PlanProgress.displayName = "PlanProgress";
PlanContent.displayName = "PlanContent";
PlanStep.displayName = "PlanStep";

export { Plan, PlanHeader, PlanTitle, PlanDescription, PlanProgress, PlanContent, PlanStep };
