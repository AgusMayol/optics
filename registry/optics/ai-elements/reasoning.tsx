"use client";

import * as React from "react";
import { BrainIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
	Trace,
	TraceCollapsible,
	TraceCollapsibleContent,
	TraceCollapsibleTrigger,
	TraceIcon,
	TraceLine,
	TraceTitle,
} from "@/registry/optics/trace";

interface ReasoningContextValue {
	isStreaming: boolean;
	isOpen: boolean;
	duration?: number;
}

const ReasoningContext = React.createContext<ReasoningContextValue | null>(null);

export type ReasoningProps = Omit<React.ComponentProps<typeof Trace>, "children"> & {
	isStreaming?: boolean;
	duration?: number;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children?: React.ReactNode;
};

function Reasoning({
	className = "",
	isStreaming = false,
	duration: durationProp,
	open: openProp,
	defaultOpen,
	onOpenChange,
	children,
	...props
}: ReasoningProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean | undefined>(defaultOpen);
	const [measuredDuration, setMeasuredDuration] = React.useState<number | undefined>(undefined);

	React.useEffect(() => {
		if (durationProp !== undefined || !isStreaming) {
			return;
		}
		const startTime = Date.now();
		const resetTimerId = window.setTimeout(() => {
			setMeasuredDuration(undefined);
		}, 0);
		const intervalId = window.setInterval(() => {
			setMeasuredDuration(Math.max(1, Math.round((Date.now() - startTime) / 1000)));
		}, 1000);
		return () => {
			window.clearTimeout(resetTimerId);
			window.clearInterval(intervalId);
		};
	}, [durationProp, isStreaming]);

	const isControlled = openProp !== undefined;
	const resolvedOpen = isControlled ? openProp : (uncontrolledOpen ?? isStreaming);
	const resolvedDuration = durationProp ?? measuredDuration;

	const handleOpenChange: NonNullable<
		React.ComponentProps<typeof TraceCollapsible>["onOpenChange"]
	> = React.useCallback(
		(nextOpen, eventDetails) => {
			onOpenChange?.(nextOpen);
			if (!isControlled && !eventDetails.isCanceled) {
				setUncontrolledOpen(nextOpen);
			}
		},
		[isControlled, onOpenChange],
	);

	const contextValue = React.useMemo<ReasoningContextValue>(
		() => ({
			isStreaming,
			isOpen: resolvedOpen,
			duration: resolvedDuration,
		}),
		[isStreaming, resolvedOpen, resolvedDuration],
	);

	return (
		<ReasoningContext.Provider value={contextValue}>
			<Trace
				data-slot="reasoning"
				data-streaming={isStreaming ? "true" : undefined}
				className={cn(className)}
				{...props}
			>
				<TraceCollapsible open={resolvedOpen} onOpenChange={handleOpenChange}>
					{children}
				</TraceCollapsible>
			</Trace>
		</ReasoningContext.Provider>
	);
}

function getDefaultThinkingLabel(isStreaming: boolean, duration?: number): string {
	if (isStreaming) {
		return "Thinking...";
	}
	if (duration !== undefined && duration > 0) {
		return `Thought for ${duration}s`;
	}
	return "Thought for a few seconds";
}

export type ReasoningTriggerProps = Omit<
	React.ComponentProps<typeof TraceCollapsibleTrigger>,
	"children"
> & {
	icon?: React.ReactNode;
	getThinkingMessage?: (isStreaming: boolean, duration?: number) => React.ReactNode;
	children?: React.ReactNode;
};

function ReasoningTrigger({
	className = "",
	icon,
	getThinkingMessage,
	children,
	...props
}: ReasoningTriggerProps) {
	const context = React.useContext(ReasoningContext);
	const isStreaming = context?.isStreaming ?? false;
	const duration = context?.duration;

	const label = getThinkingMessage
		? getThinkingMessage(isStreaming, duration)
		: getDefaultThinkingLabel(isStreaming, duration);

	return (
		<TraceCollapsibleTrigger data-slot="reasoning-trigger" className={cn(className)} {...props}>
			{children ?? (
				<TraceLine status={isStreaming ? "running" : undefined}>
					<TraceIcon>{icon ?? <BrainIcon />}</TraceIcon>
					<TraceTitle>{label}</TraceTitle>
				</TraceLine>
			)}
		</TraceCollapsibleTrigger>
	);
}

export type ReasoningContentProps = React.ComponentProps<typeof TraceCollapsibleContent>;

function ReasoningContent({ className = "", children, ...props }: ReasoningContentProps) {
	return (
		<TraceCollapsibleContent
			data-slot="reasoning-content"
			className={cn("text-sm whitespace-pre-wrap", className)}
			{...props}
		>
			{children}
		</TraceCollapsibleContent>
	);
}

Reasoning.displayName = "Reasoning";
ReasoningTrigger.displayName = "ReasoningTrigger";
ReasoningContent.displayName = "ReasoningContent";

export { Reasoning, ReasoningTrigger, ReasoningContent };
