"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { tv } from "tailwind-variants";

import { cn } from "@/registry/optics/lib/utils";
import { XIcon } from "lucide-react";

function Sheet(props = {}) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props = {}) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props = {}) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(props = {}) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetBackdrop({ className = "", ...props }) {
	return (
		<SheetPrimitive.Backdrop
			data-slot="sheet-backdrop"
			className={cn(
				"fixed inset-0 bg-black/32 backdrop-blur-sm z-50 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute",
				className,
			)}
			{...props}
		/>
	);
}

const sheetVariants = tv({
	slots: {
		viewport: "fixed inset-0 z-50 flex",
		popup: "group bg-background flex flex-col gap-4 min-h-0 max-h-full",
	},
	variants: {
		side: {
			right: {
				viewport: "justify-end",
				popup:
					"w-3/4 border-l sm:max-w-sm [transition-property:translate,opacity,scale,border-radius] will-change-[translate,opacity,scale,border-radius] duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] data-starting-style:opacity-0 data-starting-style:translate-x-full data-ending-style:opacity-0 data-ending-style:translate-x-full opacity-[calc(1-var(--nested-dialogs)*0.25)] -translate-x-[calc(2.5rem*var(--nested-dialogs))] scale-[calc(1-0.15*var(--nested-dialogs))] data-nested-dialog-open:rounded-lg",
			},
			left: {
				viewport: "justify-start",
				popup:
					"w-3/4 border-r sm:max-w-sm [transition-property:translate,opacity,scale,border-radius] will-change-[translate,opacity,scale,border-radius] duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] data-starting-style:opacity-0 data-starting-style:-translate-x-full data-ending-style:opacity-0 data-ending-style:-translate-x-full opacity-[calc(1-var(--nested-dialogs)*0.25)] translate-x-[calc(2.5rem*var(--nested-dialogs))] scale-[calc(1-0.15*var(--nested-dialogs))] data-nested-dialog-open:rounded-lg",
			},
			top: {
				viewport: "flex-col justify-start",
				popup:
					"h-auto border-b [transition-property:translate,opacity,scale,border-radius] will-change-[translate,opacity,scale,border-radius] duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] data-starting-style:opacity-0 data-starting-style:-translate-y-full data-ending-style:opacity-0 data-ending-style:-translate-y-full opacity-[calc(1-var(--nested-dialogs)*0.25)] scale-[calc(1-0.15*var(--nested-dialogs))] data-nested-dialog-open:rounded-lg data-nested-dialog-open:translate-y-[calc(1%*var(--nested-dialogs))]",
			},
			bottom: {
				viewport: "flex-col justify-end",
				popup:
					"h-auto border-t [transition-property:translate,opacity,scale,border-radius] will-change-[translate,opacity,scale,border-radius] duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] data-starting-style:opacity-0 data-starting-style:translate-y-full data-ending-style:opacity-0 data-ending-style:translate-y-full opacity-[calc(1-var(--nested-dialogs)*0.25)] scale-[calc(1-0.15*var(--nested-dialogs))] data-nested-dialog-open:rounded-lg data-nested-dialog-open:-translate-y-[calc(1%*var(--nested-dialogs))]",
			},
		},
		variant: {
			full: {},
			rounded: {
				viewport: "p-3",
				popup: "rounded-lg border",
			},
		},
	},
	defaultVariants: {
		side: "right",
		variant: "full",
	},
});

function SheetViewport({
	side = "right",
	variant = "full",
	className = "",
	...props
}) {
	const { viewport: viewportStyles } = sheetVariants();

	return (
		<SheetPrimitive.Viewport
			data-slot="sheet-viewport"
			data-side={side}
			data-variant={variant}
			className={cn(viewportStyles({ side, variant }), className)}
			{...props}
		/>
	);
}

function SheetPopup({
	side = "right",
	variant = "full",
	showCloseButton = true,
	reduceMotion = false,
	className = "",
	children = null,
	...props
}) {
	const { popup: popupStyles } = sheetVariants();

	return (
		<SheetPortal>
			<SheetBackdrop />
			<SheetViewport variant={variant} side={side}>
				<SheetPrimitive.Popup
					className={cn(
						popupStyles({ side, variant }),
						className,
						reduceMotion && "transition-none!",
					)}
					data-slot="sheet-popup"
					data-side={side}
					data-variant={variant}
					{...props}
				>
					{children}
					{showCloseButton && (
						<SheetPrimitive.Close className="absolute right-2 top-2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-72 outline-none transition-[color,background-color,box-shadow,opacity] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0">
							<XIcon />
							<span className="sr-only">Close</span>
						</SheetPrimitive.Close>
					)}
				</SheetPrimitive.Popup>
			</SheetViewport>
		</SheetPortal>
	);
}

function SheetHeader({ className = "", ...props }) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex flex-col gap-1.5 p-4", className)}
			{...props}
		/>
	);
}

function SheetFooter({ className = "", ...props }) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("mt-auto flex flex-col gap-2 p-4", className)}
			{...props}
		/>
	);
}

function SheetTitle({ className = "", ...props }) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn("text-foreground font-semibold", className)}
			{...props}
		/>
	);
}

function SheetDescription({ className = "", ...props }) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}


Sheet.displayName = "Sheet";
SheetTrigger.displayName = "SheetTrigger";
SheetClose.displayName = "SheetClose";
SheetPopup.displayName = "SheetPopup";
SheetHeader.displayName = "SheetHeader";
SheetFooter.displayName = "SheetFooter";
SheetTitle.displayName = "SheetTitle";
SheetDescription.displayName = "SheetDescription";

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetPopup,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};

