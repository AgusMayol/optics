"use client";
import * as React from "react";
import { motion } from "motion/react";

import { useAutoHeight } from "@/registry/optics/hooks/use-auto-height";
import { Slot } from "@/registry/optics/helpers/primitives/animate/slot";

type AutoHeightProps = Omit<
	React.ComponentPropsWithoutRef<typeof motion.div>,
	"children" | "transition" | "style" | "animate"
> & {
	children?: React.ReactNode;
	deps?: React.DependencyList;
	transition?: React.ComponentProps<typeof motion.div>["transition"];
	style?: React.ComponentProps<typeof motion.div>["style"];
	animate?: React.ComponentProps<typeof motion.div>["animate"];
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
	const resolvedAnimate =
		typeof animate === "object" && animate !== null ? animate : {};

	const motionProps = {
		style: { overflow: "hidden", ...style },
		animate: { height, ...resolvedAnimate },
		transition,
	};

	if (render) {
		return (
			<Slot {...motionProps} {...props}>
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
