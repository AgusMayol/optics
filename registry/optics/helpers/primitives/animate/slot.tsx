"use client";
import { isMotionComponent, motion, type HTMLMotionProps } from "motion/react";
import * as React from "react";
import { cn } from "@/registry/optics/lib/utils";

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
	HTMLMotionProps<keyof HTMLElementTagNameMap>,
	"ref"
> & { ref?: React.Ref<T> };

export type WithAsChild<Base extends object> =
	| (Base & { asChild: true; children: React.ReactElement })
	| (Base & { asChild?: false });

export type SlotProps<T extends HTMLElement = HTMLElement> = {
	children?: React.ReactNode;
} & DOMMotionProps<T>;

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
	return (node) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === "function") {
				ref(node);
			} else {
				(ref as React.RefObject<T | null>).current = node;
			}
		});
	};
}

function mergeProps<T extends HTMLElement>(
	childProps: AnyProps,
	slotProps: DOMMotionProps<T>,
): AnyProps {
	const merged: AnyProps = { ...childProps, ...slotProps };

	if (childProps.className || slotProps.className) {
		merged.className = cn(
			childProps.className as string | undefined,
			slotProps.className as string | undefined,
		);
	}

	if (childProps.style || slotProps.style) {
		merged.style = {
			...(childProps.style as React.CSSProperties | undefined),
			...(slotProps.style as React.CSSProperties | undefined),
		};
	}

	return merged;
}

function Slot<T extends HTMLElement = HTMLElement>({ children, ref, ...props }: SlotProps<T>) {
	const isValidChild = React.isValidElement(children);
	const childType = isValidChild ? children.type : "div";

	const isAlreadyMotion =
		typeof childType === "object" &&
		childType !== null &&
		isMotionComponent(childType as React.ComponentType);

	const Base = React.useMemo(
		() =>
			isAlreadyMotion
				? (childType as React.ElementType)
				: motion.create(childType as React.ElementType),
		[isAlreadyMotion, childType],
	);

	if (!isValidChild) return null;

	const childElement = children as React.ReactElement<AnyProps & { ref?: React.Ref<T> }>;
	const { ref: childRef, ...childProps } = childElement.props;
	const mergedProps = mergeProps(childProps, props);

	return <Base {...mergedProps} ref={mergeRefs(childRef, ref)} />;
}

export { Slot };
