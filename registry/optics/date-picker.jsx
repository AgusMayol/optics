"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/registry/optics/lib/utils";
import { Button } from "@/registry/optics/button";
import { Calendar } from "@/registry/optics/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/registry/optics/popover";

function DatePicker({
	date = null,
	onDateChange = () => {},
	placeholder = "Pick a date",
	variant = "outline",
	className = "",
	...props
}) {
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
				<Calendar
					mode="single"
					selected={date}
					onSelect={onDateChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

export { DatePicker };
