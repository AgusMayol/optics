"use client";

import type * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/registry/optics/lib/utils";
import { Button, type buttonVariants } from "@/registry/optics/button";
import { Calendar } from "@/registry/optics/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/optics/popover";

type DatePickerProps = Omit<
	React.ComponentProps<typeof Button>,
	"variant" | "className" | "children"
> & {
	date?: Date | null;
	onDateChange?: (date: Date | undefined) => void;
	placeholder?: string;
	variant?: NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
	className?: string;
};

function DatePicker({
	date = null,
	onDateChange = () => {},
	placeholder = "Pick a date",
	variant = "outline",
	className = "",
	...props
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						variant={variant || "outline"}
						className={cn(
							"w-[240px] justify-start text-left font-normal",
							!date && "text-muted-foreground",
							className,
						)}
						aria-label="Open date picker"
						{...props}
					>
						<CalendarIcon />
						{date ? format(date, "PPP") : <span>{placeholder}</span>}
					</Button>
				}
			/>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar mode="single" selected={date ?? undefined} onSelect={onDateChange} initialFocus />
			</PopoverContent>
		</Popover>
	);
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
