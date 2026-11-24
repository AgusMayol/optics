"use client";

import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { AnimatePresence, motion, type HTMLMotionProps, type Transition } from "motion/react";
import { ChevronDownIcon } from "lucide-react";

import { getStrictContext } from "@/registry/optics/lib/get-strict-context";
import { useControlledState } from "@/registry/optics/hooks/use-controlled-state";
import { cn } from "@/registry/optics/lib/utils";

type AccordionContextType = {
	value: BaseAccordion.Root.Props["value"];
	setValue: (
		value: BaseAccordion.Root.Value,
		eventDetails: BaseAccordion.Root.ChangeEventDetails,
	) => void;
};

type AccordionItemContextType = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const [AccordionProvider, useAccordion] =
	getStrictContext<AccordionContextType>("AccordionContext");

const [AccordionItemProvider, useAccordionItem] =
	getStrictContext<AccordionItemContextType>("AccordionItemContext");

export type AccordionProps = React.ComponentProps<typeof BaseAccordion.Root> & {
	collapsible?: boolean;
	type?: "single" | "multiple";
};

function PrimitiveAccordion({
	collapsible: _collapsible = false,
	type: _type,
	...props
}: AccordionProps) {
	const [value, setValue] = useControlledState<
		BaseAccordion.Root.Value,
		[BaseAccordion.Root.ChangeEventDetails]
	>({
		value: props.value,
		defaultValue: props.defaultValue,
		onChange: props.onValueChange,
	});

	return (
		<AccordionProvider value={{ value, setValue }}>
			<BaseAccordion.Root data-slot="accordion" {...props} onValueChange={setValue} />
		</AccordionProvider>
	);
}

export type AccordionItemProps = Omit<
	React.ComponentProps<typeof BaseAccordion.Item>,
	"className"
> & {
	className?: string;
};

function PrimitiveAccordionItem(props: React.ComponentProps<typeof BaseAccordion.Item>) {
	const { value } = useAccordion();
	const [isOpen, setIsOpen] = React.useState(value?.includes(props.value) ?? false);

	React.useEffect(() => {
		setIsOpen(value?.includes(props.value) ?? false);
	}, [value, props.value]);

	return (
		<AccordionItemProvider value={{ isOpen, setIsOpen }}>
			<BaseAccordion.Item data-slot="accordion-item" {...props} />
		</AccordionItemProvider>
	);
}

function PrimitiveAccordionHeader(props: React.ComponentProps<typeof BaseAccordion.Header>) {
	return <BaseAccordion.Header data-slot="accordion-header" {...props} />;
}

function PrimitiveAccordionTrigger(props: React.ComponentProps<typeof BaseAccordion.Trigger>) {
	return <BaseAccordion.Trigger data-slot="accordion-trigger" {...props} />;
}

type PrimitiveAccordionPanelProps = Omit<HTMLMotionProps<"div">, "children"> &
	Pick<React.ComponentProps<typeof BaseAccordion.Panel>, "hiddenUntilFound"> & {
		transition?: Transition;
		keepRendered?: boolean;
		children?: React.ReactNode;
	};

function PrimitiveAccordionPanel({
	transition = { duration: 0.35, ease: "easeInOut" },
	hiddenUntilFound,
	keepRendered = false,
	...props
}: PrimitiveAccordionPanelProps) {
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
								maskImage: "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
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

function Accordion({ collapsible = false, ...props }: AccordionProps) {
	return <PrimitiveAccordion collapsible={collapsible} {...props} />;
}

function AccordionItem({ className = "", ...props }: AccordionItemProps) {
	return (
		<PrimitiveAccordionItem className={cn("border-b last:border-b-0", className)} {...props} />
	);
}

export type AccordionTriggerProps = Omit<
	React.ComponentProps<typeof BaseAccordion.Trigger>,
	"className"
> & {
	className?: string;
	showArrow?: boolean;
};

function AccordionTrigger({
	className = "",
	children = null,
	showArrow = true,
	...props
}: AccordionTriggerProps) {
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

export type AccordionPanelProps = Omit<PrimitiveAccordionPanelProps, "className"> & {
	className?: string;
};

function AccordionPanel({ className = "", children = null, ...props }: AccordionPanelProps) {
	return (
		<PrimitiveAccordionPanel {...props}>
			<div className={cn("text-sm pt-0 pb-4", className)}>{children}</div>
		</PrimitiveAccordionPanel>
	);
}

const AccordionContent = AccordionPanel;

Accordion.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionPanel.displayName = "AccordionPanel";
AccordionContent.displayName = "AccordionContent";

export {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionPanel,
	AccordionContent,
	useAccordionItem,
};
