import * as React from "react";

import { cn } from "@/lib/utils";

function Window({ className, ...props }) {
	return (
		<div
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border pb-6 shadow-sm",
				className,
			)}
			{...props}
		/>
	);
}

function WindowHeader({ className, children, ...props }) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-xl py-6 px-6 grid-cols-[1fr_1fr_1fr] [.border-b]:pb-6 bg-background border-b",
				className,
			)}
			{...props}
		>
			<div className="flex items-center justify-start gap-2">
				<div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
				<div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
				<div className="w-3 h-3 rounded-full bg-[#27c93f]" />
			</div>
			{children}
		</div>
	);
}

function WindowTitle({ className, ...props }) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"leading-none text-muted-foreground text-sm text-center self-start",
				className,
			)}
			{...props}
		/>
	);
}

// function WindowDescription({
// 	className,
// 	...props
// }) {
// 	return (
// 		<div
// 			data-slot="card-description"
// 			className={cn("text-muted-foreground text-sm", className)}
// 			{...props}
// 		/>
// 	);
// }

function WindowAction({ className, ...props }) {
	return (
		<div
			data-slot="card-action"
			className={cn("self-start justify-self-end", className)}
			{...props}
		/>
	);
}

function WindowContent({ className, ...props }) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	);
}

function WindowFooter({ className, ...props }) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
			{...props}
		/>
	);
}

export {
	Window,
	WindowHeader,
	WindowFooter,
	WindowTitle,
	WindowAction,
	// WindowDescription,
	WindowContent,
};
