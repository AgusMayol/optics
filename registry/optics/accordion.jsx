import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import {
	Accordion as AccordionPrimitive,
	AccordionItem as AccordionItemPrimitive,
	AccordionHeader as AccordionHeaderPrimitive,
	AccordionTrigger as AccordionTriggerPrimitive,
	AccordionContent as AccordionContentPrimitive,
} from "@/registry/optics/accordion-primitive";
import { cn } from '@/registry/optics/lib/utils';

function Accordion(props) {
	return <AccordionPrimitive {...props} />;
}

function AccordionItem({ className, ...props }) {
	return (
		<AccordionItemPrimitive
			className={cn("border-b last:border-b-0", className)}
			{...props}
		/>
	);
}

function AccordionTrigger({ className, children, showArrow = true, ...props }) {
	return (
		<AccordionHeaderPrimitive className="flex">
			<AccordionTriggerPrimitive
				className={cn(
					"focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				{showArrow && (
					<ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
				)}
			</AccordionTriggerPrimitive>
		</AccordionHeaderPrimitive>
	);
}

function AccordionContent({ className, children, ...props }) {
	return (
		<AccordionContentPrimitive {...props}>
			<div className={cn("text-sm pt-0 pb-4", className)}>{children}</div>
		</AccordionContentPrimitive>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
