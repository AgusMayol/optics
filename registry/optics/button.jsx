import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border border-transparent bg-clip-padding text-xs/relaxed font-medium focus-visible:ring-[2px] aria-invalid:ring-[2px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none gap-2! rounded-lg disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 cursor-pointer aria-expanded:ring-[2px] aria-expanded:ring-ring/30",
	{
		variants: {
			variant: {
				default:
					"bg-radial-[at_52%_-52%] [text-shadow:0_1px_0_var(--color-primary)] border-primary bg-background from-primary/70 to-primary/95 hover:from-primary/80 hover:to-primary/100 text-primary-foreground inset-shadow-2xs inset-shadow-white/25 border shadow-md shadow-zinc-950/30",
				secondary:
					"shadow-xs bg-linear-to-t hover:to-muted to-sidebar from-muted bg-background dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10 text-foreground",
				decorations:
					"shadow-xs hover:bg-muted bg-background dark:border-border border border-zinc-300 shadow-zinc-950/10 text-foreground",
				muted:
					"bg-muted hover:bg-neutral-200 dark:hover:bg-accent shadow-zinc-950/10 duration-200 text-foreground",
				outline:
					"border-border dark:bg-input/20 dark:bg-input/30 hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				ghost:
					"hover:bg-neutral-200 dark:hover:bg-accent hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				info: "text-white [text-shadow:0_1px_0_var(--color-blue-800)] from-blue-600/85 to-blue-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 border-0 hover:brightness-110 active:brightness-95",
				success:
					"text-white [text-shadow:0_1px_0_var(--color-emerald-800)] from-emerald-600/85 to-emerald-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 border-0 hover:brightness-110 active:brightness-95",
				warning:
					"text-white [text-shadow:0_1px_0_var(--color-amber-800)] from-amber-600/85 to-amber-600 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b border border-zinc-950/35 shadow-md shadow-zinc-950/20 border-0 hover:brightness-110 active:brightness-95",
				destructive:
					"text-white from-destructive to-destructive/85 bg-linear-to-t border border-b-2 border-zinc-950/40 shadow-md shadow-zinc-950/20 border-red-800 ring-1 ring-inset ring-white/25 hover:brightness-110 active:brightness-90",
				raised:
					"[text-shadow:0_1px_0_var(--color-zinc-100)] dark:[text-shadow:0_1px_0_var(--color-zinc-900)] bg-background hover:bg-zinc-50 dark:hover:bg-neutral-900 border-input/50 relative border-b-2 shadow-sm shadow-zinc-950/15 ring-0 ring-zinc-300 dark:ring-zinc-700 text-foreground",
				link: "text-primary underline-offset-4 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current hover:after:w-full after:transition-[width] after:duration-150 !px-0 !pb-0 [&_svg]:text-muted-foreground group [&_svg]:group-hover:text-foreground transition-colors",
			},

			size: {
				default:
					"h-7 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				xs: "h-5 gap-1 rounded-sm px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-2.5",
				sm: "h-6 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				lg: "h-8 gap-1 px-2.5 text-xs/relaxed has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-4",
				icon: "size-7 [&_svg:not([class*='size-'])]:size-3.5",
				"icon-xs": "size-5 rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
				"icon-sm": "size-6 [&_svg:not([class*='size-'])]:size-3",
				"icon-lg": "size-8 [&_svg:not([class*='size-'])]:size-4",
			},
			animation: {
				all: "active:scale-[0.97] transition-all duration-150",
				colors: "transition-colors duration-150",
				none: "",
				"only-scale": "active:scale-[0.97] transition-scale duration-150",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			animation: "all",
		},
	},
);

function Button({
	className = "",
	variant = "default",
	size = "default",
	animation = "all",
	children,
	...props
}) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(
				buttonVariants({ variant, size, animation, className }),
				variant === "decorations" &&
				"relative rounded-none squircle-none overflow-visible",
			)}
			{...props}
		>
			{children}
			{variant === "decorations" && (
				<div className={cn("absolute -left-[1px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[5px] rounded-full absolute top-0" />
						<div className="bg-muted-foreground w-[5px] h-[1px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{variant === "decorations" && (
				<div className={cn("absolute -right-[0px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[5px] rounded-full absolute top-0" />
						<div className="bg-muted-foreground w-[5px] h-[1px] rounded-full absolute -left-[4.5px]" />
					</div>
				</div>
			)}

			{variant === "decorations" && (
				<div className={cn("absolute -left-[1px] -bottom-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[5px] rounded-full absolute -top-[4.5px]" />
						<div className="bg-muted-foreground w-[5px] h-[1px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{variant === "decorations" && (
				<div className={cn("absolute -right-[0px] -bottom-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[5px] rounded-full absolute -top-[4.5px]" />
						<div className="bg-muted-foreground w-[5px] h-[1px] rounded-full absolute -left-[4.5px]" />
					</div>
				</div>
			)}
		</ButtonPrimitive>
	);
}


Button.displayName = "Button";

export { Button, buttonVariants };

