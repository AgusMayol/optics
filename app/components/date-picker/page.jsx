"use client";
import { ComponentConfig } from "../layout";
import { useState } from "react";
import { DatePicker } from "@/registry/optics/date-picker";

import componentCode from "@/registry/optics/dist/date-picker.jsx.txt";
import generatedProps from "@/registry/optics/dist/date-picker.json";

const componentFiles = [
	{
		path: "@/components/optics/date-picker.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "date-picker.jsx",
		code: `import { DatePicker } from "@/components/optics/date-picker";
import { useState } from "react";

const [date, setDate] = useState();

<DatePicker
	date={date}
	onDateChange={setDate}
	placeholder="Pick a date"
	variant="raised"
/>`,
	},
];


function DatePickerDemo() {
	const [date, setDate] = useState();

	return (
		<DatePicker
			date={date}
			onDateChange={setDate}
			placeholder="Pick a date"
			variant="raised"
		/>
	);
}

const componentConfig = {
	header: {
		title: "Date Picker",
		description:
			"A date picker component built with Calendar and Popover.",
		href: "https://ui.shadcn.com/docs/components/date-picker",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <DatePickerDemo />,
		code: code,
	},
	installation: {
		componentName: "date-picker",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
