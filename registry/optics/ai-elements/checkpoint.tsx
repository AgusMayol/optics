import type * as React from "react";
import { BookmarkIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/optics/button";
import { Marker, MarkerContent, MarkerIcon } from "@/registry/optics/marker";

export type CheckpointProps = React.ComponentProps<typeof Marker>;

function Checkpoint({ className = "", variant = "separator", ...props }: CheckpointProps) {
	return <Marker data-slot="checkpoint" variant={variant} className={cn(className)} {...props} />;
}

export type CheckpointIconProps = React.ComponentProps<typeof MarkerIcon>;

function CheckpointIcon({ className = "", children, ...props }: CheckpointIconProps) {
	return (
		<MarkerIcon data-slot="checkpoint-icon" className={cn(className)} {...props}>
			{children ?? <BookmarkIcon />}
		</MarkerIcon>
	);
}

export type CheckpointLabelProps = React.ComponentProps<typeof MarkerContent>;

function CheckpointLabel({ className = "", ...props }: CheckpointLabelProps) {
	return (
		<MarkerContent
			data-slot="checkpoint-label"
			className={cn("inline-flex items-center gap-2", className)}
			{...props}
		/>
	);
}

export type CheckpointTriggerProps = React.ComponentProps<typeof Button> & {
	tooltip?: string;
};

function CheckpointTrigger({
	className = "",
	size = "xs",
	variant = "outline",
	type = "button",
	tooltip,
	title,
	children = "Restore",
	...props
}: CheckpointTriggerProps) {
	return (
		<Button
			data-slot="checkpoint-trigger"
			type={type}
			size={size}
			variant={variant}
			title={title ?? tooltip}
			className={cn(className)}
			{...props}
		>
			{children}
		</Button>
	);
}

Checkpoint.displayName = "Checkpoint";
CheckpointIcon.displayName = "CheckpointIcon";
CheckpointTrigger.displayName = "CheckpointTrigger";
CheckpointLabel.displayName = "CheckpointLabel";

export { Checkpoint, CheckpointIcon, CheckpointTrigger, CheckpointLabel };
