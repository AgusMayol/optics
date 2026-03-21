"use client";

import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "lucide-react";

import { getStrictContext } from "@/registry/optics/lib/get-strict-context";
import { cn } from "@/registry/optics/lib/utils";

type BaseAccordionRootProps = React.ComponentProps<typeof BaseAccordion.Root>;
type BaseAccordionItemProps = React.ComponentProps<typeof BaseAccordion.Item>;
type BaseAccordionHeaderProps = React.ComponentProps<
	typeof BaseAccordion.Header
>;
type BaseAccordionTriggerProps = React.ComponentProps<
	typeof BaseAccordion.Trigger
>;
type BaseAccordionPanelProps = React.ComponentProps<typeof BaseAccordion.Panel>;
type AccordionChangeDetails = Parameters<
	NonNullable<BaseAccordionRootProps["onValueChange"]>
>[1];
type AccordionValue = NonNullable<BaseAccordionRootProps["value"]>;
type AccordionItemValue = BaseAccordionItemProps["value"];
type AccordionType = "single" | "multiple";

type AccordionContextValue = {
	value: AccordionValue;
	setValue: (
		nextValue: AccordionValue,
		eventDetails: AccordionChangeDetails,
	) => void;
};

type AccordionItemContextValue = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type AccordionSharedProps = Omit<
	BaseAccordionRootProps,
	"multiple" | "value" | "defaultValue" | "onValueChange"
> & {
	collapsible?: boolean;
};

type SingleAccordionProps = AccordionSharedProps & {
	type?: "single";
	value?: AccordionItemValue | null;
	defaultValue?: AccordionItemValue | null;
	onValueChange?: (
		value: AccordionItemValue | undefined,
		eventDetails: AccordionChangeDetails,
	) => void;
};

type MultipleAccordionProps = AccordionSharedProps & {
	type: "multiple";
	value?: AccordionValue;
	defaultValue?: AccordionValue;
	onValueChange?: (
		value: AccordionValue,
		eventDetails: AccordionChangeDetails,
	) => void;
};

type AccordionProps = SingleAccordionProps | MultipleAccordionProps;
type AccordionItemProps = Omit<BaseAccordionItemProps, "className"> & {
	className?: string;
};
type AccordionTriggerProps = Omit<
	BaseAccordionTriggerProps,
	"className" | "children"
> & {
	className?: string;
	children?: React.ReactNode;
	showArrow?: boolean;
};
type PrimitiveAccordionPanelProps = Omit<
	React.ComponentProps<typeof motion.div>,
	"transition"
> &
	Pick<BaseAccordionPanelProps, "hiddenUntilFound"> & {
		transition?: React.ComponentProps<typeof motion.div>["transition"];
		keepRendered?: boolean;
	};
type AccordionPanelProps = PrimitiveAccordionPanelProps & {
	className?: string;
	children?: React.ReactNode;
};

// --- Internal Primitive Logic ---

const [AccordionProvider, useAccordion] =
	getStrictContext<AccordionContextValue>("AccordionContext");

const [AccordionItemProvider, useAccordionItem] =
	getStrictContext<AccordionItemContextValue>("AccordionItemContext");

function normalizeAccordionValue(
	type: AccordionType,
	value: SingleAccordionProps["value"] | MultipleAccordionProps["value"],
) {
	if (type === "multiple") {
		return value as AccordionValue | undefined;
	}

	return value == null ? undefined : [value];
}

function PrimitiveAccordion(accordionProps: AccordionProps) {
	const isControlled = "value" in accordionProps;
	const {
		type = "single",
		collapsible = false,
		onValueChange,
		value: controlledValue,
		defaultValue: defaultControlledValue,
		...props
	} = accordionProps;
	const initialDefaultValue = React.useRef<AccordionValue>(
		normalizeAccordionValue(type, defaultControlledValue) ?? [],
	).current;
	const [uncontrolledValue, setUncontrolledValue] =
		React.useState<AccordionValue>(initialDefaultValue);
	const normalizedControlledValue =
		normalizeAccordionValue(type, controlledValue) ?? [];
	const accordionValue = isControlled
		? normalizedControlledValue
		: uncontrolledValue;

	const setValue = React.useCallback(
		(nextValue: AccordionValue, eventDetails: AccordionChangeDetails) => {
			const resolvedValue =
				type === "single" && !collapsible && nextValue.length === 0
					? accordionValue
					: nextValue;

			if (!isControlled) {
				setUncontrolledValue(resolvedValue);
			}

			if (type === "multiple") {
				onValueChange?.(resolvedValue, eventDetails);
				return;
			}

			(onValueChange as SingleAccordionProps["onValueChange"])?.(
				resolvedValue[0] ?? undefined,
				eventDetails,
			);
		},
		[accordionValue, collapsible, isControlled, onValueChange, type],
	);

	return (
		<AccordionProvider value={{ value: accordionValue, setValue }}>
			<BaseAccordion.Root
				data-slot="accordion"
				multiple={type === "multiple"}
				{...props}
				onValueChange={setValue}
				value={accordionValue}
			/>
		</AccordionProvider>
	);
}

function PrimitiveAccordionItem(props: BaseAccordionItemProps) {
	const { value } = useAccordion();
	const [isOpen, setIsOpen] = React.useState(
		value?.includes(props.value) ?? false,
	);

	React.useEffect(() => {
		setIsOpen(value?.includes(props.value) ?? false);
	}, [value, props.value]);

	return (
		<AccordionItemProvider value={{ isOpen, setIsOpen }}>
			<BaseAccordion.Item data-slot="accordion-item" {...props} />
		</AccordionItemProvider>
	);
}

function PrimitiveAccordionHeader(props: BaseAccordionHeaderProps) {
	return <BaseAccordion.Header data-slot="accordion-header" {...props} />;
}

function PrimitiveAccordionTrigger(props: BaseAccordionTriggerProps) {
	return <BaseAccordion.Trigger data-slot="accordion-trigger" {...props} />;
}

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

function Accordion({ collapsible = false, ...props }: AccordionProps) {
	return <PrimitiveAccordion collapsible={collapsible} {...props} />;
}

function AccordionItem({ className = "", ...props }: AccordionItemProps) {
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

function AccordionPanel({
	className = "",
	children = null,
	...props
}: AccordionPanelProps) {
	return (
		<PrimitiveAccordionPanel {...props}>
			<div className={cn("text-sm pt-0 pb-4", className)}>{children}</div>
		</PrimitiveAccordionPanel>
	);
}

// Aliases for backward compatibility
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
