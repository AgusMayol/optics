"use client";
import * as React from "react";
import { motion } from "motion/react";

import { useAutoHeight } from "@/registry/optics/hooks/use-auto-height";
import { Slot } from "@/registry/optics/helpers/primitives/animate/slot";

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
}) {
	const { ref, height } = useAutoHeight(deps);

	const motionProps = {
		style: { overflow: "hidden", ...style },
		animate: { height, ...animate },
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
