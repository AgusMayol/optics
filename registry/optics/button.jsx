import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from '@/registry/optics/lib/utils';

const otherThemes = cva(
	"data-[state='open']:!ring-offset-2 data-[state='open']:!ring-offset-transparent data-[state='open']:!ring-ring/25",
	{
		variants: {
			variant: {
				raised:
					"[text-shadow:0_1px_0_var(--color-zinc-100)] dark:[text-shadow:0_1px_0_var(--color-zinc-900)] bg-background border-input/50 relative border-b-2 shadow-sm shadow-zinc-950/15 ring-1 ring-zinc-300 dark:ring-zinc-700 text-foreground",
				ghost:
					"bg-transparent hover:bg-accent text-foreground border-none !shadow-none",
				outline:
					"border border-input bg-transparent shadow-xs hover:bg-accent text-foreground",
				black:
					"bg-radial-[at_52%_-52%] [text-shadow:0_1px_0_var(--color-primary)] border-primary from-primary/70 to-primary/95 text-primary-foreground inset-shadow-2xs inset-shadow-white/25 border text-sm shadow-md shadow-zinc-950/30 ring-0 transition-[filter] duration-200 hover:brightness-125 active:brightness-95",
			},

			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 px-3 text-xs",
				lg: "h-10 rounded-lg px-8",
				icon: "h-9 w-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},

			animation: {
				colors:
					"transition-colors duration-150 data-[state='open']:!scale-[1] scale-[1]",
				all: "active:scale-[0.97] transition-all duration-150",
				none: "transition-none data-[state='open']:!scale-[1] scale-[1]",
				"only-scale": "active:scale-[0.97] transition-scale duration-150",
			},
		},
	},
);

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none cursor-pointer text-white data-[state='open']:!ring-offset-2 data-[state='open']:!ring-offset-transparent data-[state='open']:!ring-ring/25",
	{
		variants: {
			variant: {
				default:
					"bg-radial-[at_52%_-52%] [text-shadow:0_1px_0_var(--color-primary)] border-primary from-primary/70 to-primary/95 text-primary-foreground inset-shadow-2xs inset-shadow-white/25 border text-sm shadow-md shadow-zinc-950/30 ring-0 transition-[filter] duration-200 hover:brightness-125 active:brightness-95",
				secondary:
					"shadow-xs bg-linear-to-t hover:to-muted to-sidebar from-muted dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10 duration-200 text-foreground",
				muted:
					"bg-muted hover:bg-neutral-200 dark:hover:bg-accent shadow-zinc-950/10 duration-200 text-foreground",
				outline:
					"border border-input bg-transparent shadow-xs hover:bg-accent text-foreground",
				ghost: "bg-transparent hover:bg-accent text-foreground",
				link: "text-primary underline-offset-4 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current hover:after:w-full after:transition-[width] after:duration-150 !px-0 !pb-0 -mt-1.5 [&_svg]:text-muted-foreground group [&_svg]:group-hover:text-foreground transition-colors",
				info: "[text-shadow:0_1px_0_var(--color-blue-800)] from-blue-600/85 to-blue-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
				success:
					"[text-shadow:0_1px_0_var(--color-emerald-800)] from-emerald-600/85 to-emerald-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
				warning:
					"[text-shadow:0_1px_0_var(--color-amber-800)] from-amber-600/85 to-amber-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
				destructive:
					"from-destructive to-destructive/85 bg-linear-to-t border border-b-2 border-zinc-950/40 shadow-md shadow-zinc-950/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90",
				raised:
					"[text-shadow:0_1px_0_var(--color-zinc-100)] dark:[text-shadow:0_1px_0_var(--color-zinc-900)] bg-background hover:bg-zinc-50 dark:hover:bg-neutral-900 border-input/50 relative border-b-2 shadow-sm shadow-zinc-950/15 ring-1 ring-zinc-300 dark:ring-zinc-700 text-foreground",
			},

			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 px-3 text-xs",
				lg: "h-10 rounded-lg px-8",
				icon: "h-9 w-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},

			animation: {
				colors: "transition-colors duration-150",
				all: "active:scale-[0.97] transition-all duration-150",
				none: "transition-none",
				"only-scale": "active:scale-[0.97] transition-scale duration-150",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className = "",
	variant = "default",
	size = "default",
	animation = "all",
	asChild = false,
	...props
}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, animation, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants, otherThemes };
