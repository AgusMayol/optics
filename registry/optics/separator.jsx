"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";

function Separator({
	className = "",
	orientation = "horizontal",
	decoration = false,
	decorationLeft = false,
	decorationRight = false,
	decorationTop = false,
	decorationBottom = false,
	...props
}) {
	return (
		<SeparatorPrimitive
			data-slot="separator"
			orientation={orientation}
			className={cn(
				"bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch relative",
				className,
			)}
			{...props}
		>
			{(decoration || decorationLeft) && orientation === "horizontal" && (
				<div className={cn("absolute -left-[1px] -top-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[5.9px] rounded-full absolute -top-[2.25px]" />
						<div className="bg-muted-foreground w-[3.93px] h-[1px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{(decoration || decorationRight) && orientation === "horizontal" && (
				<div className={cn("absolute -right-[0px] -top-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[5.9px] rounded-full absolute -top-[2.5px]" />
						<div className="bg-muted-foreground w-[3.93px] h-[1px] rounded-full absolute -left-[3.5px]" />
					</div>
				</div>
			)}

			{(decoration || decorationTop) && orientation === "vertical" && (
				<div className={cn("absolute -left-[0px] -top-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[5.9px] h-[1px] rounded-full absolute -left-[2.5px]" />
						<div className="bg-muted-foreground w-[1px] h-[3.93px] rounded-full absolute left-0" />
					</div>
				</div>
			)}

			{(decoration || decorationBottom) && orientation === "vertical" && (
				<div className={cn("absolute -left-[0px] -bottom-[0px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[5.9px] h-[1px] rounded-full absolute -left-[2.5px] bottom-0" />
						<div className="bg-muted-foreground w-[1px] h-[3.93px] rounded-full absolute left-0 bottom-0" />
					</div>
				</div>
			)}
		</SeparatorPrimitive>
	);
}


Separator.displayName = "Separator";

export { Separator };

