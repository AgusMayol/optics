"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/optics/hover-card";

export interface InlineCitationSourceItem {
	title?: string;
	url?: string;
	description?: string;
	quote?: string;
}

function getSourceHostname(url: string): string {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch {
		return url;
	}
}

export type InlineCitationProps = React.ComponentProps<"span">;

function InlineCitation({ className = "", ...props }: InlineCitationProps) {
	return (
		<span
			data-slot="inline-citation"
			className={cn("group/inline-citation inline items-baseline gap-1", className)}
			{...props}
		/>
	);
}

export type InlineCitationTextProps = React.ComponentProps<"span">;

function InlineCitationText({ className = "", ...props }: InlineCitationTextProps) {
	return (
		<span
			data-slot="inline-citation-text"
			className={cn(
				"rounded-sm transition-colors group-hover/inline-citation:bg-accent/60",
				className,
			)}
			{...props}
		/>
	);
}

export type InlineCitationCardProps = React.ComponentProps<typeof HoverCard>;

function InlineCitationCard(props: InlineCitationCardProps) {
	return <HoverCard data-slot="inline-citation-card" {...props} />;
}

export interface InlineCitationCardTriggerProps extends Omit<
	React.ComponentProps<typeof HoverCardTrigger>,
	"children"
> {
	sources?: string[];
	label?: React.ReactNode;
	children?: React.ReactNode;
}

function InlineCitationCardTrigger({
	sources,
	label,
	children,
	delay = 10,
	closeDelay = 100,
	render,
	className = "",
	...props
}: InlineCitationCardTriggerProps) {
	const firstSource = sources?.[0];
	const sourceLabel =
		firstSource !== undefined
			? sources && sources.length > 1
				? `${getSourceHostname(firstSource)} +${sources.length - 1}`
				: getSourceHostname(firstSource)
			: "Source";

	return (
		<HoverCardTrigger
			data-slot="inline-citation-card-trigger"
			delay={delay}
			closeDelay={closeDelay}
			render={
				render ?? (
					<Button
						type="button"
						variant="secondary"
						size="xs"
						className={cn("h-5 rounded-full px-2 text-[0.6875rem] font-normal", className)}
					/>
				)
			}
			className={render ? className : undefined}
			{...props}
		>
			{children ?? label ?? sourceLabel}
		</HoverCardTrigger>
	);
}

export interface InlineCitationSourceProps extends React.ComponentProps<"div"> {
	title?: string;
	url?: string;
	description?: string;
}

function InlineCitationSource({
	title,
	url,
	description,
	className = "",
	children,
	...props
}: InlineCitationSourceProps) {
	const host = url ? getSourceHostname(url) : undefined;
	const displayTitle = title ?? host;

	return (
		<div
			data-slot="inline-citation-source"
			className={cn("flex min-w-0 flex-col gap-1", className)}
			{...props}
		>
			{displayTitle !== undefined && (
				<div
					data-slot="inline-citation-source-title"
					className="truncate text-xs font-medium text-foreground"
				>
					{displayTitle}
				</div>
			)}
			{description !== undefined && (
				<p
					data-slot="inline-citation-source-description"
					className="line-clamp-3 text-xs leading-relaxed text-muted-foreground"
				>
					{description}
				</p>
			)}
			{url !== undefined && (
				<a
					data-slot="inline-citation-source-url"
					href={url}
					target="_blank"
					rel="noreferrer"
					className="inline-flex w-fit max-w-full items-center gap-1 truncate text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
				>
					<span className="truncate">{host ?? url}</span>
					<ExternalLinkIcon className="size-3 shrink-0" />
					<span className="sr-only"> (opens in a new tab)</span>
				</a>
			)}
			{children}
		</div>
	);
}

export type InlineCitationQuoteProps = React.ComponentProps<"blockquote">;

function InlineCitationQuote({ className = "", ...props }: InlineCitationQuoteProps) {
	return (
		<blockquote
			data-slot="inline-citation-quote"
			className={cn(
				"border-l-2 border-border pl-2.5 text-xs leading-relaxed text-muted-foreground italic",
				className,
			)}
			{...props}
		/>
	);
}

export interface InlineCitationCardBodyProps extends React.ComponentProps<typeof HoverCardContent> {
	sources?: Array<string | InlineCitationSourceItem>;
}

function groupChildSlides(children: React.ReactNode): React.ReactNode[][] {
	const nodes = React.Children.toArray(children);
	const sourceCount = nodes.filter(
		(node) => React.isValidElement(node) && node.type === InlineCitationSource,
	).length;

	if (sourceCount <= 1) {
		return [nodes];
	}

	const slides: React.ReactNode[][] = [];
	let currentSlide: React.ReactNode[] = [];

	for (const node of nodes) {
		if (React.isValidElement(node) && node.type === InlineCitationSource) {
			if (currentSlide.length > 0) {
				slides.push(currentSlide);
				currentSlide = [];
			}
		}
		currentSlide.push(node);
	}

	if (currentSlide.length > 0) {
		slides.push(currentSlide);
	}

	return slides;
}

function InlineCitationCardBody({
	sources,
	className = "",
	children,
	...props
}: InlineCitationCardBodyProps) {
	const [currentIndex, setCurrentIndex] = React.useState(0);

	const dataSlides: React.ReactNode[] | null =
		sources && sources.length > 0
			? sources.map((rawSource, index) => {
					const source: InlineCitationSourceItem =
						typeof rawSource === "string" ? { url: rawSource } : rawSource;
					return (
						<React.Fragment key={source.url ?? `${source.title ?? "source"}-${index}`}>
							<InlineCitationSource
								title={source.title}
								url={source.url}
								description={source.description}
							/>
							{source.quote !== undefined && (
								<InlineCitationQuote>{source.quote}</InlineCitationQuote>
							)}
						</React.Fragment>
					);
				})
			: null;

	const childSlides = dataSlides === null ? groupChildSlides(children) : null;
	const totalSlides = dataSlides ? dataSlides.length : (childSlides?.length ?? 0);
	const safeIndex = totalSlides > 0 ? Math.min(currentIndex, totalSlides - 1) : 0;

	const activeContent = dataSlides
		? dataSlides[safeIndex]
		: totalSlides > 1
			? childSlides?.[safeIndex]
			: children;

	return (
		<HoverCardContent
			data-slot="inline-citation-card-body"
			className={cn("flex w-80 flex-col gap-2.5 p-3", className)}
			{...props}
		>
			{totalSlides > 1 && (
				<div className="flex items-center gap-1 border-b border-border/60 pb-2">
					<Button
						type="button"
						variant="ghost"
						size="icon-xs"
						aria-label="Previous source"
						onClick={(event) => {
							event.stopPropagation();
							setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
						}}
					>
						<ChevronLeftIcon />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="icon-xs"
						aria-label="Next source"
						onClick={(event) => {
							event.stopPropagation();
							setCurrentIndex((prev) => (prev + 1) % totalSlides);
						}}
					>
						<ChevronRightIcon />
					</Button>
					<Badge variant="secondary" className="ml-auto tabular-nums">
						{safeIndex + 1} / {totalSlides}
					</Badge>
				</div>
			)}
			<div className="flex min-w-0 flex-col gap-2">{activeContent}</div>
		</HoverCardContent>
	);
}

InlineCitation.displayName = "InlineCitation";
InlineCitationText.displayName = "InlineCitationText";
InlineCitationCard.displayName = "InlineCitationCard";
InlineCitationCardTrigger.displayName = "InlineCitationCardTrigger";
InlineCitationCardBody.displayName = "InlineCitationCardBody";
InlineCitationSource.displayName = "InlineCitationSource";
InlineCitationQuote.displayName = "InlineCitationQuote";

export {
	InlineCitation,
	InlineCitationText,
	InlineCitationCard,
	InlineCitationCardTrigger,
	InlineCitationCardBody,
	InlineCitationSource,
	InlineCitationQuote,
};
