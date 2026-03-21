import { cn } from "@/lib/utils";

type AspectRatioProps = React.ComponentProps<"div"> & {
	ratio?: number;
};

function AspectRatio({
	ratio = 1,
	className = "",
	...props
}: AspectRatioProps) {
	return (
		<div
			data-slot="aspect-ratio"
			style={
				{
					"--ratio": ratio,
				} as React.CSSProperties
			}
			className={cn("relative aspect-(--ratio)", className)}
			{...props}
		/>
	);
}

export { AspectRatio };
