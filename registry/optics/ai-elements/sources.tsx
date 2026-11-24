"use client";

import type * as React from "react";
import { ArrowUpRightIcon, GlobeIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
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

export type SourcesProps = Omit<React.ComponentProps<typeof Trace>, "children"> & {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: NonNullable<React.ComponentProps<typeof Collapsible>["onOpenChange"]>;
	children?: React.ReactNode;
};

function Sources({
	className = "",
	open,
	defaultOpen = false,
	onOpenChange,
	children,
	...props
}: SourcesProps) {
	return (
		<Trace data-slot="sources" className={cn(className)} {...props}>
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
	);
}

export type SourcesTriggerProps = Omit<
	React.ComponentProps<typeof TraceCollapsibleTrigger>,
	"children"
> & {
	count: number;
	icon?: React.ReactNode;
	children?: React.ReactNode;
};

function SourcesTrigger({ className = "", count, icon, children, ...props }: SourcesTriggerProps) {
	return (
		<TraceCollapsibleTrigger data-slot="sources-trigger" className={cn(className)} {...props}>
			{children ?? (
				<TraceLine>
					<TraceIcon>{icon ?? <GlobeIcon />}</TraceIcon>
					<TraceTitle>
						Used {count} {count === 1 ? "source" : "sources"}
					</TraceTitle>
					<Badge variant="secondary" className="tabular-nums">
						{count}
					</Badge>
				</TraceLine>
			)}
		</TraceCollapsibleTrigger>
	);
}

export type SourcesContentProps = React.ComponentProps<typeof TraceCollapsibleContent>;

function SourcesContent({ className = "", children, ...props }: SourcesContentProps) {
	return (
		<TraceCollapsibleContent data-slot="sources-content" className={cn(className)} {...props}>
			<Trace>{children}</Trace>
		</TraceCollapsibleContent>
	);
}

function getHostnameFallback(href: string): string {
	try {
		return new URL(href).hostname || href;
	} catch {
		return href;
	}
}

export type SourceProps = Omit<React.ComponentProps<"a">, "title"> & {
	href: string;
	title?: React.ReactNode;
	description?: React.ReactNode;
	icon?: React.ReactNode;
};

function Source({
	className = "",
	href,
	title,
	description,
	icon,
	target = "_blank",
	rel = "noreferrer",
	children,
	...props
}: SourceProps) {
	const resolvedTitle = title ?? children ?? getHostnameFallback(href);

	return (
		<a
			data-slot="source"
			href={href}
			target={target}
			rel={rel}
			className={cn("group/source flex flex-col gap-0.5", className)}
			{...props}
		>
			<TraceLine>
				<TraceIcon>{icon ?? <GlobeIcon />}</TraceIcon>
				<TraceTitle>
					{resolvedTitle}
					<span className="sr-only"> (opens in a new tab)</span>
				</TraceTitle>
				<TraceIcon>
					<ArrowUpRightIcon />
				</TraceIcon>
			</TraceLine>
			{description !== undefined && description !== null && (
				<span
					data-slot="source-description"
					className="line-clamp-2 pl-6 text-xs text-muted-foreground/80"
				>
					{description}
				</span>
			)}
		</a>
	);
}

Sources.displayName = "Sources";
SourcesTrigger.displayName = "SourcesTrigger";
SourcesContent.displayName = "SourcesContent";
Source.displayName = "Source";

export { Sources, SourcesTrigger, SourcesContent, Source };
