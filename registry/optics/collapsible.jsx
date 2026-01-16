"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn } from "@/registry/optics/lib/utils";

function Collapsible({
	open = false,
	defaultOpen = false,
	onOpenChange = undefined,
	disabled = false,
	className = "",
	...props
}) {
	return (
		<CollapsiblePrimitive.Root
			data-slot="collapsible"
			open={open}
			defaultOpen={defaultOpen}
			onOpenChange={onOpenChange}
			disabled={disabled}
			className={className}
			{...props}
		/>
	);
}

function CollapsibleTrigger({ disabled = false, className = "", ...props }) {
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="collapsible-trigger"
			disabled={disabled}
			className={className}
			{...props}
		/>
	);
}

function CollapsibleContent({
	className = "",
	forceMount = false,
	children = null,
	...props
}) {
	return (
		<CollapsiblePrimitive.Panel
			data-slot="collapsible-content"
			keepMounted={forceMount}
			className={cn(
				"grid transition-[grid-template-rows,opacity] duration-300 ease-out",
				"data-[closed]:grid-rows-[0fr] data-[closed]:opacity-0",
				"data-[starting-style]:grid-rows-[0fr] data-[ending-style]:grid-rows-[0fr]",
				"data-[open]:grid-rows-[1fr] data-[open]:opacity-100",
				className,
			)}
			{...props}
		>
			<div className={cn("min-h-0 overflow-hidden", className)}>{children}</div>
		</CollapsiblePrimitive.Panel>
	);
}


Collapsible.displayName = "Collapsible";
CollapsibleTrigger.displayName = "CollapsibleTrigger";
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

