"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { buttonVariants } from "@/registry/optics/button";
import { cn } from "@/lib/utils";
import { CircleIcon } from "lucide-react";
import * as React from "react";

function RadioGroup({ className = "", ...props }) {
	return (
		<RadioGroupPrimitive
			data-slot="radio-group"
			className={cn("grid gap-3 w-full", className)}
			{...props}
		/>
	);
}

function RadioGroupItem({ className = "", ...props }) {
	const [isChecked, setIsChecked] = React.useState(false);
	const ref = React.useRef(null);

	// Detectar cambios en el estado del radio usando MutationObserver
	React.useEffect(() => {
		const element = ref.current;
		if (!element) return;

		// Función para verificar el estado
		const checkState = () => {
			const checked =
				element.hasAttribute("data-checked") ||
				element.getAttribute("aria-checked") === "true";
			setIsChecked(checked);
		};

		// Verificar estado inicial
		checkState();

		// Observar cambios en atributos
		const observer = new MutationObserver(checkState);
		observer.observe(element, {
			attributes: true,
			attributeFilter: ["data-checked", "aria-checked"],
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<RadioPrimitive.Root
			ref={ref}
			data-slot="radio-group-item"
			className={cn(
				"border-input text-primary dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 data-checked:bg-primary data-checked:border-primary flex size-4 rounded-full squircle-none transition-none focus-visible:ring-[2px] aria-invalid:ring-[2px] group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50",
				buttonVariants({
					variant: isChecked ? "default" : "outline",
					size: "icon-xs",
					className: "rounded-full squircle-none",
				}),
				className,
			)}
			{...props}
		>
			<RadioPrimitive.Indicator
				data-slot="radio-group-indicator"
				className={cn(
					"group-aria-invalid/radio-group-item:text-destructive flex size-4 p-4 items-center justify-center text-white",
				)}
			>
				<CircleIcon className="absolute top-1/2 left-1/2 size-2.5! -translate-x-1/2 -translate-y-1/2 fill-current" />
			</RadioPrimitive.Indicator>
		</RadioPrimitive.Root>
	);
}

export { RadioGroup, RadioGroupItem };
