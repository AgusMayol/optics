"use client";

import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "lucide-react";

import { getStrictContext } from "@/registry/optics/lib/get-strict-context";
import { useControlledState } from "@/registry/optics/hooks/use-controlled-state";
import { cn } from "@/registry/optics/lib/utils";

// --- Internal Primitive Logic ---

const [AccordionProvider, useAccordion] = getStrictContext("AccordionContext");

const [AccordionItemProvider, useAccordionItem] = getStrictContext(
	"AccordionItemContext",
);

function PrimitiveAccordion({ collapsible = false, ...props } = {}) {
	const [value, setValue] = useControlledState({
		value: props?.value,
		defaultValue: props?.defaultValue,
		onChange: props?.onValueChange,
	});

	return (
		<AccordionProvider value={{ value, setValue }}>
			<BaseAccordion.Root
				data-slot="accordion"
				{...props}
				onValueChange={setValue}
			/>
		</AccordionProvider>
	);
}

function PrimitiveAccordionItem(props = {}) {
	const { value } = useAccordion();
	const [isOpen, setIsOpen] = React.useState(
		value?.includes(props?.value) ?? false,
	);

	React.useEffect(() => {
		setIsOpen(value?.includes(props?.value) ?? false);
	}, [value, props?.value]);

	return (
		<AccordionItemProvider value={{ isOpen, setIsOpen }}>
			<BaseAccordion.Item data-slot="accordion-item" {...props} />
		</AccordionItemProvider>
	);
}

function PrimitiveAccordionHeader(props = {}) {
	return <BaseAccordion.Header data-slot="accordion-header" {...props} />;
}

function PrimitiveAccordionTrigger(props = {}) {
	return <BaseAccordion.Trigger data-slot="accordion-trigger" {...props} />;
}

function PrimitiveAccordionPanel({
	transition = { duration: 0.35, ease: "easeInOut" },
	hiddenUntilFound,
	keepRendered = false,
	...props
} = {}) {
	const { isOpen } = useAccordionItem();

	return (
		<AnimatePresence>
			{keepRendered ? (
				<BaseAccordion.Panel
					hidden={false}
					hiddenUntilFound={hiddenUntilFound}
					keepMounted
					render={
						<motion.div
							key="accordion-panel"
							data-slot="accordion-panel"
							initial={{ height: 0, opacity: 0, "--mask-stop": "0%", y: 20 }}
							animate={
								isOpen
									? { height: "auto", opacity: 1, "--mask-stop": "100%", y: 0 }
									: { height: 0, opacity: 0, "--mask-stop": "0%", y: 20 }
							}
							transition={transition}
							style={{
								maskImage:
									"linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
								WebkitMaskImage:
									"linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
								overflow: "hidden",
							}}
							{...props}
						/>
					}
				/>
			) : (
				isOpen && (
					<BaseAccordion.Panel
						hidden={false}
						hiddenUntilFound={hiddenUntilFound}
						keepMounted
						render={
							<motion.div
								key="accordion-panel"
								data-slot="accordion-panel"
								initial={{ height: 0, opacity: 0, "--mask-stop": "0%", y: 20 }}
								animate={{
									height: "auto",
									opacity: 1,
									"--mask-stop": "100%",
									y: 0,
								}}
								exit={{ height: 0, opacity: 0, "--mask-stop": "0%", y: 20 }}
								transition={transition}
								style={{
									maskImage:
										"linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
									WebkitMaskImage:
										"linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
									overflow: "hidden",
								}}
								{...props}
							/>
						}
					/>
				)
			)}
		</AnimatePresence>
	);
}

// --- User-Facing Components ---

function Accordion({ collapsible = false, ...props } = {}) {
	return <PrimitiveAccordion collapsible={collapsible} {...props} />;
}

function AccordionItem({ className = "", ...props } = {}) {
	return (
		<PrimitiveAccordionItem
			className={cn("border-b last:border-b-0", className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className = "",
	children = null,
	showArrow = true,
	...props
} = {}) {
	return (
		<PrimitiveAccordionHeader className="flex">
			<PrimitiveAccordionTrigger
				className={cn(
					"focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-panel-open]>svg]:rotate-180 [&[data-state=open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				{showArrow && (
					<ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
				)}
			</PrimitiveAccordionTrigger>
		</PrimitiveAccordionHeader>
	);
}

function AccordionPanel({ className = "", children = null, ...props } = {}) {
	return (
		<PrimitiveAccordionPanel {...props}>
			<div className={cn("text-sm pt-0 pb-4", className)}>{children}</div>
		</PrimitiveAccordionPanel>
	);
}

// Aliases for backward compatibility
const AccordionContent = AccordionPanel;

export {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionPanel,
	AccordionContent,
	useAccordionItem,
};
