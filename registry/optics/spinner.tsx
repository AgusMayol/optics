import * as React from "react";

import { cn } from "@/registry/optics/lib/utils";

type SpinnerProps = React.ComponentProps<"div"> & {
	size?: string;
	barClassName?: string;
};

export function Spinner({
	size = "size-6",
	barClassName = "",
	className = "",
	...props
}: SpinnerProps) {
	const bars = Array(12).fill(0);

	return (
		<div className={cn("inline-block", size, className)} {...props}>
			<div
				aria-hidden="true"
				className={cn("relative top-1/2 left-1/2 h-[inherit] w-[inherit]")}
			>
				{bars.map((_, i) => (
					<div
						key={`spinner-bar-${String(i)}`}
						aria-hidden="true"
						className={cn(
							"-left-[10%] -top-[3.9%] absolute h-[8%] w-[24%] animate-spinner rounded-md bg-primary",
							`bar:nth-child(${i + 1})`,
							barClassName,
						)}
						style={{
							animationDelay: `-${1.3 - i * 0.1}s`,
							transform: `rotate(${30 * i}deg) translate(146%)`,
						}}
					/>
				))}
			</div>
		</div>
	);
}

Spinner.displayName = "Spinner";
