"use client";
import { ComponentConfig } from "../layout";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/optics/multi-select";

import componentCode from "@/registry/optics/dist/multi-select.jsx.txt";
import generatedProps from "@/registry/optics/dist/multi-select.json";

const componentFiles = [
	{
		path: "@/components/optics/multi-select.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "multi-select.jsx",
		code: `import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/optics/multi-select";

<Select onValuesChange={(values) => console.log(values)}>
	<SelectTrigger variant="raised">
		<SelectValue placeholder="Select status" />
	</SelectTrigger>
	<SelectContent className="w-full">
		<SelectGroup>
			<SelectLabel>Status</SelectLabel>
			<SelectItem value="ready" color="bg-teal-400">
				Ready
			</SelectItem>
			<SelectItem value="error" color="bg-red-500">
				Error
			</SelectItem>
			<SelectItem value="building" color="bg-amber-400">
				Building
			</SelectItem>
			<SelectItem value="queued" color="bg-gray-200">
				Queued
			</SelectItem>
		</SelectGroup>
	</SelectContent>
</Select>`,
	},
];



const demoComponent = (
	<Select onValuesChange={(values) => console.log(values)}>
		<SelectTrigger variant="raised">
			<SelectValue placeholder="Select status" />
		</SelectTrigger>
		<SelectContent className="w-full">
			<SelectGroup>
				<SelectLabel>Status</SelectLabel>
				<SelectItem value="ready" color="bg-teal-400">
					Ready
				</SelectItem>
				<SelectItem value="error" color="bg-red-500">
					Error
				</SelectItem>
				<SelectItem value="building" color="bg-amber-400">
					Building
				</SelectItem>
				<SelectItem value="queued" color="bg-gray-200">
					Queued
				</SelectItem>
				<SelectItem value="provisioning" color="bg-gray-200">
					Provisioning
				</SelectItem>
				<SelectItem value="canceled" color="bg-gray-200">
					Canceled
				</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>
);

const componentConfig = {
	header: {
		title: "Multi Select",
		description:
			"Multi select allows the user to select multiple options from a list.",
		href: "https://ui.shadcn.com/docs/components/select",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "multi-select",
		dependencies:
			"@radix-ui/react-select @radix-ui/react-checkbox lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
