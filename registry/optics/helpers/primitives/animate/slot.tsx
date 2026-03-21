"use client";
import * as React from "react";
import { motion, isMotionComponent } from "motion/react";
import { cn } from "@/registry/optics/lib/utils";

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === "function") {
				ref(node);
			} else {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		});
	};
}

type SlotChildProps = {
	className?: string;
	style?: unknown;
	ref?: React.Ref<HTMLElement>;
	[key: string]: unknown;
};

function mergeProps(childProps: SlotChildProps, slotProps: SlotChildProps) {
	const merged: SlotChildProps = { ...childProps, ...slotProps };

	if (childProps.className || slotProps.className) {
		merged.className = cn(childProps.className, slotProps.className);
	}

	if (childProps.style || slotProps.style) {
		merged.style = {
			...(typeof childProps.style === "object" && childProps.style
				? childProps.style
				: {}),
			...(typeof slotProps.style === "object" && slotProps.style
				? slotProps.style
				: {}),
		};
	}

	return merged;
}

type SlotProps = Omit<React.ComponentProps<typeof motion.div>, "children"> & {
	children: React.ReactElement;
};

const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(
	{ children, ...props },
	ref,
) {
	if (!React.isValidElement(children)) return null;

	const elementType = children.type as React.ElementType;
	const isAlreadyMotion =
		typeof elementType === "object" &&
		elementType !== null &&
		isMotionComponent(elementType);

	const Base = React.useMemo(
		() => (isAlreadyMotion ? elementType : motion.create(elementType)),
		[isAlreadyMotion, elementType],
	);

	const { ref: childRef, ...childProps } = children.props as SlotChildProps;

	const mergedProps = mergeProps(childProps, props);

	return <Base {...mergedProps} ref={mergeRefs(childRef, ref)} />;
});

export { Slot };
