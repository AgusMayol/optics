"use client";

import * as React from "react";
import {
	BrainIcon,
	CircleAlertIcon,
	CircleCheckIcon,
	CircleDotIcon,
	LoaderCircleIcon,
	type LucideIcon,
} from "lucide-react";

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

export type ChainOfThoughtStatus = "complete" | "active" | "pending" | "error";

type IconComponent = LucideIcon | React.ComponentType<{ className?: string }>;

function isIconComponent(value: IconComponent | React.ReactNode): value is IconComponent {
	if (typeof value === "function") {
		return true;
	}
	if (
		typeof value === "object" &&
		value !== null &&
		!React.isValidElement(value) &&
		"$$typeof" in value &&
		("render" in value || "type" in value)
	) {
		return true;
	}
	return false;
}

function mapTraceStatus(
	status?: ChainOfThoughtStatus,
): React.ComponentProps<typeof TraceLine>["status"] {
	switch (status) {
		case "active":
			return "running";
		case "pending":
			return "pending";
		case "error":
			return "error";
		case "complete":
		case undefined:
			return undefined;
	}
}

function renderStatusIcon(status?: ChainOfThoughtStatus, fallback?: React.ReactNode) {
	switch (status) {
		case "active":
			return <LoaderCircleIcon className="animate-spin" />;
		case "error":
			return <CircleAlertIcon />;
		case "pending":
			return <CircleDotIcon />;
		case "complete":
			return <CircleCheckIcon />;
		case undefined:
			return fallback ?? <BrainIcon />;
	}
}

export type ChainOfThoughtProps = React.ComponentProps<typeof Trace> & {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
};

function ChainOfThought({
	className = "",
	open,
	defaultOpen = false,
	onOpenChange,
	children,
	...props
}: ChainOfThoughtProps) {
	const handleOpenChange = React.useCallback(
		(nextOpen: boolean) => {
			onOpenChange?.(nextOpen);
		},
		[onOpenChange],
	);

	return (
		<Trace data-slot="chain-of-thought" className={cn(className)} {...props}>
			{open !== undefined ? (
				<TraceCollapsible open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
					{children}
				</TraceCollapsible>
			) : (
				<TraceCollapsible defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
					{children}
				</TraceCollapsible>
			)}
		</Trace>
	);
}

export type ChainOfThoughtHeaderProps = React.ComponentProps<typeof TraceCollapsibleTrigger> & {
	icon?: IconComponent | React.ReactNode;
	status?: ChainOfThoughtStatus;
};

function ChainOfThoughtHeader({
	className = "",
	icon,
	status,
	children = "Chain of Thought",
	...props
}: ChainOfThoughtHeaderProps) {
	const resolvedIcon =
		icon !== undefined
			? isIconComponent(icon)
				? React.createElement(icon)
				: icon
			: renderStatusIcon(status, <BrainIcon />);

	return (
		<TraceCollapsibleTrigger
			data-slot="chain-of-thought-header"
			className={cn(className)}
			{...props}
		>
			<TraceLine status={mapTraceStatus(status)}>
				<TraceIcon>{resolvedIcon}</TraceIcon>
				<TraceTitle>{children}</TraceTitle>
			</TraceLine>
		</TraceCollapsibleTrigger>
	);
}

export type ChainOfThoughtContentProps = React.ComponentProps<typeof TraceCollapsibleContent>;

function ChainOfThoughtContent({
	className = "",
	keepMounted = true,
	children,
	...props
}: ChainOfThoughtContentProps) {
	return (
		<TraceCollapsibleContent keepMounted={keepMounted} className={cn(className)} {...props}>
			<Trace>{children}</Trace>
		</TraceCollapsibleContent>
	);
}

export type ChainOfThoughtStepProps = Omit<React.ComponentProps<typeof TraceLine>, "status"> & {
	icon?: IconComponent | React.ReactNode;
	label?: React.ReactNode;
	description?: React.ReactNode;
	status?: ChainOfThoughtStatus;
	defaultOpen?: boolean;
};

function ChainOfThoughtStep({
	className = "",
	icon,
	label,
	description,
	status = "complete",
	defaultOpen = true,
	children,
	...props
}: ChainOfThoughtStepProps) {
	const resolvedIcon =
		icon !== undefined
			? isIconComponent(icon)
				? React.createElement(icon)
				: icon
			: renderStatusIcon(status);

	const line = (
		<TraceLine status={mapTraceStatus(status)} className={cn(className)} {...props}>
			<TraceIcon>{resolvedIcon}</TraceIcon>
			{label !== undefined && label !== null && <TraceTitle>{label}</TraceTitle>}
			{description !== undefined && description !== null && (
				<TraceDescription>{description}</TraceDescription>
			)}
		</TraceLine>
	);

	if (children === undefined || children === null || children === false) {
		return line;
	}

	return (
		<TraceCollapsible defaultOpen={defaultOpen}>
			<TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
			<TraceCollapsibleContent>{children}</TraceCollapsibleContent>
		</TraceCollapsible>
	);
}

export type ChainOfThoughtSearchResultsProps = React.ComponentProps<"div">;

function ChainOfThoughtSearchResults({
	className = "",
	...props
}: ChainOfThoughtSearchResultsProps) {
	return (
		<div
			data-slot="chain-of-thought-search-results"
			className={cn("flex flex-wrap items-center gap-1.5", className)}
			{...props}
		/>
	);
}

export type ChainOfThoughtSearchResultProps = React.ComponentProps<typeof Badge>;

function ChainOfThoughtSearchResult({
	className = "",
	variant = "secondary",
	...props
}: ChainOfThoughtSearchResultProps) {
	return (
		<Badge
			data-slot="chain-of-thought-search-result"
			variant={variant}
			className={cn("font-normal", className)}
			{...props}
		/>
	);
}

ChainOfThought.displayName = "ChainOfThought";
ChainOfThoughtHeader.displayName = "ChainOfThoughtHeader";
ChainOfThoughtContent.displayName = "ChainOfThoughtContent";
ChainOfThoughtStep.displayName = "ChainOfThoughtStep";
ChainOfThoughtSearchResults.displayName = "ChainOfThoughtSearchResults";
ChainOfThoughtSearchResult.displayName = "ChainOfThoughtSearchResult";

export {
	ChainOfThought,
	ChainOfThoughtHeader,
	ChainOfThoughtContent,
	ChainOfThoughtStep,
	ChainOfThoughtSearchResults,
	ChainOfThoughtSearchResult,
};
