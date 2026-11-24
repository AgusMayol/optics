import type * as React from "react";

import { cn } from "@/lib/utils";

export type AspectRatioProps = React.ComponentProps<"div"> & {
	ratio?: number;
};

function AspectRatio({ ratio = 1, className = "", style, ...props }: AspectRatioProps) {
	const aspectStyle: React.CSSProperties & { "--ratio": number } = {
		...style,
		"--ratio": ratio,
	};

	return (
		<div
			data-slot="aspect-ratio"
			style={aspectStyle}
			className={cn("relative aspect-(--ratio)", className)}
			{...props}
		/>
	);
}

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
