"use client";
import { type HTMLMotionProps, motion, type Transition } from "motion/react";
import * as React from "react";

import { Slot } from "@/registry/optics/helpers/primitives/animate/slot";
import { useAutoHeight } from "@/registry/optics/hooks/use-auto-height";

export type AutoHeightProps = Omit<HTMLMotionProps<"div">, "children"> & {
	children?: React.ReactNode;
	deps?: React.DependencyList;
	transition?: Transition;
	render?: React.ReactElement<{ children?: React.ReactNode }>;
};

function AutoHeight({
	children,
	deps = [],
	transition = {
		type: "spring",
		stiffness: 300,
		damping: 30,
		bounce: 0,
		restDelta: 0.01,
	},
	style,
	animate,
	render,
	...props
}: AutoHeightProps) {
	const { ref, height } = useAutoHeight<HTMLDivElement>(deps);

	const motionProps = {
		style: { overflow: "hidden", ...style },
		animate: {
			height,
			...(typeof animate === "object" && animate !== null ? animate : {}),
		},
		transition,
	};

	if (render) {
		return (
			<Slot {...motionProps} {...(props as Record<string, unknown>)}>
				{React.cloneElement(render, {
					children: (
						<>
							{render.props.children}
							<div ref={ref}>{children}</div>
						</>
					),
				})}
			</Slot>
		);
	}

	return (
		<motion.div {...motionProps} {...props}>
			<div ref={ref}>{children}</div>
		</motion.div>
	);
}

export { AutoHeight };
