import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
	className,
	size = "default",
	decorations = false,
	children,
	...props
}) {
	return (
		<div
			data-slot="card"
			data-size={size}
			className={cn(
				"ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-lg py-4 has-[data-slot=card-footer]:pb-0 text-xs/relaxed ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg group/card flex flex-col relative",
				decorations && "rounded-none overflow-visible",
				className,
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
				"gap-1 rounded-t-lg px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
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
			className={cn("text-sm font-medium", className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-xs/relaxed", className)}
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
			className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, background = false, children, ...props }) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"rounded-b-lg h-full p-4 group-data-[size=sm]/card:px-3 group-data-[size=sm]/card:pb-3 [.border-t]:pt-4 -mb-4 group-data-[size=sm]/card:[.border-t]:pt-3 flex items-center",
				background &&
				`bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)] p-3! border-t relative`,
				className,
			)}
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


Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardFooter.displayName = "CardFooter";
CardTitle.displayName = "CardTitle";
CardAction.displayName = "CardAction";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};

