"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/registry/optics/button";

export type SuggestionsProps = React.ComponentProps<"div">;

function Suggestions({ className = "", ...props }: SuggestionsProps) {
	return (
		<div
			data-slot="suggestions"
			className={cn(
				"flex min-w-0 scroll-fade-x no-scrollbar items-center gap-2 overflow-x-auto overscroll-x-contain py-1",
				className,
			)}
			{...props}
		/>
	);
}

export type SuggestionProps = Omit<ButtonProps, "onSelect"> & {
	suggestion: string;
	onSelect?: (suggestion: string) => void;
};

function Suggestion({
	suggestion,
	onSelect,
	onClick,
	className = "",
	variant = "outline",
	size = "sm",
	type = "button",
	children,
	...props
}: SuggestionProps) {
	const handleClick: NonNullable<ButtonProps["onClick"]> = (event) => {
		onClick?.(event);
		if (!event.defaultPrevented) {
			onSelect?.(suggestion);
		}
	};

	return (
		<Button
			data-slot="suggestion"
			type={type}
			variant={variant}
			size={size}
			className={cn("shrink-0", className)}
			onClick={handleClick}
			{...props}
		>
			{children ?? suggestion}
		</Button>
	);
}

Suggestions.displayName = "Suggestions";
Suggestion.displayName = "Suggestion";

export { Suggestions, Suggestion };
