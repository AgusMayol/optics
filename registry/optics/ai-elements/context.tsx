"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/optics/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/optics/hover-card";
import { Progress } from "@/registry/optics/progress";

export type ContextUsage = {
	inputTokens?: number;
	outputTokens?: number;
	totalTokens?: number;
	reasoningTokens?: number;
	cachedInputTokens?: number;
};

type ContextValue = {
	usedTokens: number;
	maxTokens: number;
	usage?: ContextUsage;
	modelId?: string;
};

const ContextStore = React.createContext<ContextValue | null>(null);

function useContextData(): ContextValue {
	const context = React.useContext(ContextStore);
	if (!context) {
		throw new Error("Context subcomponents must be used within <Context />.");
	}
	return context;
}

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
	notation: "compact",
	maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
	style: "percent",
	maximumFractionDigits: 1,
});

function formatTokens(value: number): string {
	return compactNumberFormatter.format(value);
}

function getUsageRatio(usedTokens: number, maxTokens: number): number {
	if (!Number.isFinite(usedTokens) || !Number.isFinite(maxTokens) || maxTokens <= 0) {
		return 0;
	}
	return Math.min(Math.max(usedTokens / maxTokens, 0), 1);
}

const GAUGE_RADIUS = 9;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;

export type ContextProps = React.ComponentProps<typeof HoverCard> & {
	usedTokens: number;
	maxTokens: number;
	usage?: ContextUsage;
	modelId?: string;
};

function Context({ usedTokens, maxTokens, usage, modelId, children, ...props }: ContextProps) {
	const value = React.useMemo(
		() => ({ usedTokens, maxTokens, usage, modelId }),
		[usedTokens, maxTokens, usage, modelId],
	);

	return (
		<ContextStore.Provider value={value}>
			<HoverCard data-slot="context" {...props}>
				{children}
			</HoverCard>
		</ContextStore.Provider>
	);
}

export type ContextTriggerProps = Omit<React.ComponentProps<typeof HoverCardTrigger>, "className"> &
	Pick<React.ComponentProps<typeof Button>, "variant" | "size"> & {
		className?: string;
	};

function ContextTrigger({
	className = "",
	variant = "outline",
	size = "sm",
	delay = 10,
	closeDelay = 100,
	render,
	children,
	...props
}: ContextTriggerProps) {
	const { usedTokens, maxTokens } = useContextData();
	const ratio = getUsageRatio(usedTokens, maxTokens);
	const formattedPercent = percentFormatter.format(ratio);
	const strokeDashoffset = GAUGE_CIRCUMFERENCE * (1 - ratio);

	return (
		<HoverCardTrigger
			data-slot="context-trigger"
			delay={delay}
			closeDelay={closeDelay}
			render={render ?? <Button type="button" variant={variant} size={size} />}
			className={cn("gap-1.5 tabular-nums", className)}
			{...props}
		>
			{children ?? (
				<>
					<svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 shrink-0">
						<circle
							cx="12"
							cy="12"
							r={GAUGE_RADIUS}
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							opacity={0.25}
						/>
						<circle
							cx="12"
							cy="12"
							r={GAUGE_RADIUS}
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeDasharray={GAUGE_CIRCUMFERENCE}
							strokeDashoffset={strokeDashoffset}
							transform="rotate(-90 12 12)"
						/>
					</svg>
					<span>{formattedPercent}</span>
					<span className="sr-only"> context used</span>
				</>
			)}
		</HoverCardTrigger>
	);
}

export type ContextContentProps = React.ComponentProps<typeof HoverCardContent>;

function ContextContent({ className = "", ...props }: ContextContentProps) {
	return (
		<HoverCardContent
			data-slot="context-content"
			className={cn("flex w-64 flex-col gap-3 p-3", className)}
			{...props}
		/>
	);
}

export type ContextContentHeaderProps = React.ComponentProps<"div">;

function ContextContentHeader({ className = "", children, ...props }: ContextContentHeaderProps) {
	const { usedTokens, maxTokens } = useContextData();
	const ratio = getUsageRatio(usedTokens, maxTokens);
	const formattedPercent = percentFormatter.format(ratio);
	const percentValue = Math.round(ratio * 100);

	return (
		<div
			data-slot="context-content-header"
			className={cn("flex flex-col gap-2", className)}
			{...props}
		>
			{children ?? (
				<>
					<div className="flex items-center justify-between gap-3 text-xs">
						<span className="font-medium text-foreground tabular-nums">{formattedPercent}</span>
						<span className="text-muted-foreground tabular-nums">
							{formatTokens(usedTokens)} / {formatTokens(maxTokens)}
						</span>
					</div>
					<Progress value={percentValue} aria-label="Context used" />
				</>
			)}
		</div>
	);
}

export type ContextContentBodyProps = React.ComponentProps<"div">;

function ContextContentBody({ className = "", ...props }: ContextContentBodyProps) {
	return (
		<div
			data-slot="context-content-body"
			className={cn("flex flex-col gap-1.5 text-xs", className)}
			{...props}
		/>
	);
}

export type ContextContentFooterProps = React.ComponentProps<"div">;

function ContextContentFooter({ className = "", children, ...props }: ContextContentFooterProps) {
	const { modelId } = useContextData();

	if (children === undefined && !modelId) {
		return null;
	}

	return (
		<div
			data-slot="context-content-footer"
			className={cn(
				"flex items-center justify-between gap-2 border-t border-border pt-2.5 text-xs text-muted-foreground",
				className,
			)}
			{...props}
		>
			{children ?? (
				<>
					<span>Model</span>
					<span className="truncate font-mono text-foreground">{modelId}</span>
				</>
			)}
		</div>
	);
}

export type ContextUsageKind = "input" | "output" | "reasoning" | "cache";

const usageKindLabels: Record<ContextUsageKind, string> = {
	input: "Input",
	output: "Output",
	reasoning: "Reasoning",
	cache: "Cache",
};

function getUsageTokensByKind(
	usage: ContextUsage | undefined,
	kind: ContextUsageKind,
): number | undefined {
	if (!usage) {
		return undefined;
	}
	switch (kind) {
		case "input":
			return usage.inputTokens;
		case "output":
			return usage.outputTokens;
		case "reasoning":
			return usage.reasoningTokens;
		case "cache":
			return usage.cachedInputTokens;
	}
}

export type ContextUsageRowProps = React.ComponentProps<"div"> & {
	kind?: ContextUsageKind;
	label?: React.ReactNode;
	tokens?: number;
	costText?: React.ReactNode;
};

function ContextUsageRow({
	className = "",
	kind,
	label,
	tokens,
	costText,
	children,
	...props
}: ContextUsageRowProps) {
	const { usage } = useContextData();
	const resolvedTokens =
		tokens !== undefined ? tokens : kind ? getUsageTokensByKind(usage, kind) : undefined;
	const resolvedLabel = label ?? (kind ? usageKindLabels[kind] : undefined);

	if (children !== undefined) {
		return (
			<div
				data-slot="context-usage-row"
				className={cn("flex items-center justify-between gap-3 text-xs", className)}
				{...props}
			>
				{children}
			</div>
		);
	}

	if (resolvedTokens === undefined) {
		return null;
	}

	return (
		<div
			data-slot="context-usage-row"
			className={cn("flex items-center justify-between gap-3 text-xs", className)}
			{...props}
		>
			<span className="text-muted-foreground">{resolvedLabel}</span>
			<span className="flex items-center gap-1.5 font-mono text-foreground tabular-nums">
				<span>{formatTokens(resolvedTokens)}</span>
				{costText && <span className="text-muted-foreground">{costText}</span>}
			</span>
		</div>
	);
}

Context.displayName = "Context";
ContextTrigger.displayName = "ContextTrigger";
ContextContent.displayName = "ContextContent";
ContextContentHeader.displayName = "ContextContentHeader";
ContextContentBody.displayName = "ContextContentBody";
ContextContentFooter.displayName = "ContextContentFooter";
ContextUsageRow.displayName = "ContextUsageRow";

export {
	Context,
	ContextTrigger,
	ContextContent,
	ContextContentHeader,
	ContextContentBody,
	ContextContentFooter,
	ContextUsageRow,
};
