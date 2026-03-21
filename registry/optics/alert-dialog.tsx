"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/registry/optics/button";
import { X } from "lucide-react";

type AlertDialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;
type AlertDialogTriggerProps = React.ComponentProps<
	typeof DialogPrimitive.Trigger
> & {
	asChild?: boolean;
	children?: React.ReactNode;
};
type AlertDialogPortalProps = React.ComponentProps<
	typeof DialogPrimitive.Portal
>;
type AlertDialogOverlayProps = Omit<
	React.ComponentProps<typeof DialogPrimitive.Backdrop>,
	"className"
> & {
	className?: string;
};
type AlertDialogContentProps = Omit<
	React.ComponentProps<typeof DialogPrimitive.Popup>,
	"className" | "children"
> & {
	className?: string;
	children?: React.ReactNode;
};
type AlertDialogCloseProps = Omit<
	React.ComponentProps<typeof DialogPrimitive.Close>,
	"className"
> & {
	className?: string;
};
type AlertDialogTitleProps = Omit<
	React.ComponentProps<typeof DialogPrimitive.Title>,
	"className"
> & {
	className?: string;
};
type AlertDialogDescriptionProps = Omit<
	React.ComponentProps<typeof DialogPrimitive.Description>,
	"className"
> & {
	className?: string;
};

function AlertDialog(props: AlertDialogProps) {
	return <DialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
	asChild = false,
	children,
	...props
}: AlertDialogTriggerProps) {
	if (asChild && React.isValidElement(children)) {
		return (
			<DialogPrimitive.Trigger
				data-slot="alert-dialog-trigger"
				render={children}
				{...props}
			/>
		);
	}

	return (
		<DialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props}>
			{children}
		</DialogPrimitive.Trigger>
	);
}

function AlertDialogPortal(props: AlertDialogPortalProps) {
	return <DialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({
	className = "",
	...props
}: AlertDialogOverlayProps) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="alert-dialog-overlay"
			render={
				<div
					className={cn(
						"fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
						className,
					)}
				/>
			}
			{...props}
		/>
	);
}

function AlertDialogContent({
	className = "",
	children = null,
	...props
}: AlertDialogContentProps) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<DialogPrimitive.Popup
					data-slot="alert-dialog-content"
					render={
						<div
							className={cn(
								"bg-muted fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-3xl border p-2 shadow-lg duration-200 sm:max-w-lg transition-all data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:scale-95 data-starting-style:scale-95",
								className,
							)}
						>
							<div className="bg-background grid w-full gap-8 rounded-2xl p-6 px-6 shadow-lg duration-200 sm:max-w-lg">
								{children}
							</div>
						</div>
					}
					{...props}
				/>
			</div>
		</AlertDialogPortal>
	);
}

function AlertDialogHeader({
	className = "",
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
			{...props}
		/>
	);
}

function AlertDialogFooter({
	className = "",
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={cn(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogTitle({ className = "", ...props }: AlertDialogTitleProps) {
	return (
		<DialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={cn("text-lg font-semibold", className)}
			{...props}
		/>
	);
}

function AlertDialogDescription({
	className = "",
	...props
}: AlertDialogDescriptionProps) {
	return (
		<DialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={cn("text-muted-foreground text-sm text-balance", className)}
			{...props}
		/>
	);
}

function AlertDialogAction({
	className = "",
	...props
}: AlertDialogCloseProps) {
	return (
		<DialogPrimitive.Close
			className={cn(buttonVariants(), className)}
			{...props}
		/>
	);
}

function AlertDialogCancel({
	className = "",
	...props
}: AlertDialogCloseProps) {
	return (
		<DialogPrimitive.Close
			className={cn(buttonVariants({ variant: "raised" }), className)}
			{...props}
		/>
	);
}

function AlertDialogIcon({
	className = "",
	children = null,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className="w-full flex items-start justify-between -mt-2">
			<div
				className={cn(
					"flex items-center justify-center gap-2.5 -ml-2",
					className,
				)}
			>
				{children}
			</div>

			<DialogPrimitive.Close
				render={
					<Button
						variant="outline"
						size="icon"
						className="rounded-full squircle-none size-6 p-0 -mr-4 -mt-2"
					>
						<X className="!size-4"></X>
					</Button>
				}
			/>
		</div>
	);
}

AlertDialog.displayName = "AlertDialog";
AlertDialogPortal.displayName = "AlertDialogPortal";
AlertDialogOverlay.displayName = "AlertDialogOverlay";
AlertDialogTrigger.displayName = "AlertDialogTrigger";
AlertDialogContent.displayName = "AlertDialogContent";
AlertDialogHeader.displayName = "AlertDialogHeader";
AlertDialogFooter.displayName = "AlertDialogFooter";
AlertDialogTitle.displayName = "AlertDialogTitle";
AlertDialogDescription.displayName = "AlertDialogDescription";
AlertDialogAction.displayName = "AlertDialogAction";
AlertDialogCancel.displayName = "AlertDialogCancel";
AlertDialogIcon.displayName = "AlertDialogIcon";

export {
	AlertDialog,
	AlertDialogPortal,
	AlertDialogOverlay,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogIcon,
};
