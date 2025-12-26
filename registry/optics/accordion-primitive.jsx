"use client";
import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { motion, AnimatePresence } from "motion/react";

import { useControlledState } from "@/registry/optics/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/optics/lib/get-strict-context";

const [AccordionProvider, useAccordion] = getStrictContext("AccordionContext");

const [AccordionItemProvider, useAccordionItem] = getStrictContext(
	"AccordionItemContext",
);

function Accordion(props = {}) {
	const [value, setValue] = useControlledState({
		value: props?.value,
		defaultValue: props?.defaultValue,
		onChange: props?.onValueChange,
	});

	return (
		<AccordionProvider value={{ value, setValue }}>
			<AccordionPrimitive.Root
				data-slot="accordion"
				{...props}
				onValueChange={setValue}
			/>
		</AccordionProvider>
	);
}

function AccordionItem(props = {}) {
	const { value } = useAccordion();
	const [isOpen, setIsOpen] = React.useState(
		value?.includes(props?.value) ?? false,
	);

	React.useEffect(() => {
		setIsOpen(value?.includes(props?.value) ?? false);
	}, [value, props?.value]);

	return (
		<AccordionItemProvider value={{ isOpen, setIsOpen, value: props.value }}>
			<AccordionPrimitive.Item data-slot="accordion-item" {...props} />
		</AccordionItemProvider>
	);
}

function AccordionHeader(props = {}) {
	return <AccordionPrimitive.Header data-slot="accordion-header" {...props} />;
}

function AccordionTrigger(props = {}) {
	return (
		<AccordionPrimitive.Trigger data-slot="accordion-trigger" {...props} />
	);
}

function AccordionContent({
	keepRendered = false,
	transition = { type: "spring", stiffness: 150, damping: 22 },
	...props
}) {
	const { isOpen } = useAccordionItem();

	return (
		<AnimatePresence>
			{keepRendered ? (
				<AccordionPrimitive.Content asChild forceMount>
					<motion.div
						key="accordion-content"
						data-slot="accordion-content"
						initial={{ height: 0, opacity: 0, "--mask-stop": "0%" }}
						animate={
							isOpen
								? { height: "auto", opacity: 1, "--mask-stop": "100%" }
								: { height: 0, opacity: 0, "--mask-stop": "0%" }
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
				</AccordionPrimitive.Content>
			) : (
				isOpen && (
					<AccordionPrimitive.Content asChild forceMount>
						<motion.div
							key="accordion-content"
							data-slot="accordion-content"
							initial={{ height: 0, opacity: 0, "--mask-stop": "0%" }}
							animate={{ height: "auto", opacity: 1, "--mask-stop": "100%" }}
							exit={{ height: 0, opacity: 0, "--mask-stop": "0%" }}
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
					</AccordionPrimitive.Content>
				)
			)}
		</AnimatePresence>
	);
}

export {
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionTrigger,
	AccordionContent,
	useAccordion,
	useAccordionItem,
};
