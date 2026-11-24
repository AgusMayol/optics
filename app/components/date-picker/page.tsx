"use client";
import { DatePicker } from "@/registry/optics/date-picker";
import generatedProps from "@/registry/optics/dist/date-picker.json";
import componentCode from "@/registry/optics/dist/date-picker.tsx.txt";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles = [
	{
		path: "@/components/optics/date-picker.tsx",
		code: componentCode,
	},
];

const demoComponent = <DatePicker placeholder="Pick a date" variant="raised" />;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Date Picker",
		description: "A date picker component built with Calendar and Popover.",
		href: "https://ui.shadcn.com/docs/components/date-picker",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { DatePicker } from "@/components/optics/date-picker";`,
		filename: "date-picker.tsx",
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
