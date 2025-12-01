import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, decorations = false, children, ...props }) {
	return (
		<div
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm relative",
				className,
				decorations && "rounded-none",
			)}
			{...props}
		>
			{children}

			{decorations && (
				<div className={cn("absolute -left-[1px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[7.87px] rounded-full absolute top-0" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{decorations && (
				<div className={cn("absolute -right-[0px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[7.87px] rounded-full absolute top-0" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute -left-[7px]" />
					</div>
				</div>
			)}

			{decorations && (
				<div className={cn("absolute -left-[1px] -bottom-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[7.87px] rounded-full absolute -top-[7px]" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{decorations && (
				<div className={cn("absolute -right-[0px] -bottom-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[7.87px] rounded-full absolute -top-[7px]" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute -left-[7px]" />
					</div>
				</div>
			)}
		</div>
	);
}

function CardHeader({ className, ...props }) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, background = false, children, ...props }) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"flex items-center px-6",
				background &&
					`bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)] -mb-6 pb-3 pt-3 border-t relative`,
				className,
			)}
			{...props}
		>
			{children}

			{background && (
				<div className={cn("absolute -left-[1px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[11.80px] rounded-full absolute -top-[5.5px]" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{background && (
				<div className={cn("absolute -right-[0px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[11.80px] rounded-full absolute -top-[5.5px]" />
						<div className="bg-muted-foreground w-[7.87px] h-[1px] rounded-full absolute -left-[7px]" />
					</div>
				</div>
			)}
		</div>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};
