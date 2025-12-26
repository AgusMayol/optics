"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { buttonVariants } from "@/registry/optics/button";

function Checkbox({
	className = "",
	variant = "black",
	variantChecked = undefined,
	variantUnchecked = undefined,
	checked = undefined,
	defaultChecked = false,
	onCheckedChange = undefined,
	...props
}) {
	const [isChecked, setIsChecked] = React.useState(
		checked ?? defaultChecked ?? false,
	);

	// Sincronizar con la prop checked si es controlado
	React.useEffect(() => {
		if (checked !== undefined) {
			setIsChecked(checked);
		}
	}, [checked]);

	// Manejar cambios de estado
	const handleCheckedChange = (newChecked) => {
		setIsChecked(newChecked);
		onCheckedChange?.(newChecked);
	};
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				buttonVariants({
					variant: isChecked ? "default" : "outline",
					size: "icon-sm",
					className:
						"border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border transition-all duration-200 ease-out group-has-disabled/field:opacity-50 focus-visible:ring-[2px] aria-invalid:ring-[2px] peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed! disabled:opacity-50 data-[state=checked]:animate-in data-[state=checked]:zoom-in-50 data-[state=checked]:duration-200 data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out-50 data-[state=unchecked]:duration-150",
				}),
				className,
			)}
			checked={checked ?? isChecked}
			onCheckedChange={handleCheckedChange}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="[&>svg]:size-3.5 grid place-content-center text-current animate-in fade-in-0 zoom-in-50 duration-200"
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
