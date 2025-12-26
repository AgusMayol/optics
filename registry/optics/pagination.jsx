import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/optics/button";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon,
} from "lucide-react";

function Pagination({ className = "", ...props }) {
	return (
		<nav
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

function PaginationContent({ className = "", ...props }) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("gap-0.5 flex items-center", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props } = {}) {
	return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({
	className = "",
	isActive = false,
	size = "icon",
	...props
}) {
	return (
		<Button
			variant={isActive ? "raised" : "ghost"}
			size={size}
			className={cn(className)}
			nativeButton={false}
			render={
				<a
					aria-current={isActive ? "page" : undefined}
					data-slot="pagination-link"
					data-active={isActive}
					{...props}
				/>
			}
		/>
	);
}

function PaginationPrevious({ className = "", ...props }) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("pl-2!", className)}
			{...props}
		>
			<ChevronLeftIcon data-icon="inline-start" />
			<span className="hidden sm:block">Previous</span>
		</PaginationLink>
	);
}

function PaginationNext({ className = "", ...props }) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("pr-2!", className)}
			{...props}
		>
			<span className="hidden sm:block">Next</span>
			<ChevronRightIcon data-icon="inline-end" />
		</PaginationLink>
	);
}

function PaginationEllipsis({ className = "", ...props }) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn(
				"size-7 items-center justify-center [&_svg:not([class*='size-'])]:size-3.5 flex items-center justify-center",
				className,
			)}
			{...props}
		>
			<MoreHorizontalIcon />
			<span className="sr-only">More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
