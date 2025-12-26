"use client";
import { ComponentConfig } from "../layout";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/optics/select";

import componentCode from "@/registry/optics/dist/select.jsx.txt";
import generatedProps from "@/registry/optics/dist/select.json";

const componentFiles = [
	{
		path: "@/components/optics/select.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "select.jsx",
		code: `import { useState } from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/optics/select";

export default function Demo() {
	const [value, setValue] = useState("apple");

	return (
		<Select value={value} onValueChange={setValue}>
			<SelectTrigger variant="raised">
				<SelectValue placeholder="Select a fruit" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="blueberry">Blueberry</SelectItem>
					<SelectItem value="grapes">Grapes</SelectItem>
					<SelectItem value="pineapple">Pineapple</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}`,
	},
];

function SelectDemo() {
	const [value, setValue] = useState("apple");

	return (
		<Select value={value} onValueChange={setValue}>
			<SelectTrigger variant="raised">
				<SelectValue placeholder="Select a fruit" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="blueberry">Blueberry</SelectItem>
					<SelectItem value="grapes">Grapes</SelectItem>
					<SelectItem value="pineapple">Pineapple</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

const componentConfig = {
	header: {
		title: "Select",
		description:
			"Displays a list of options for the user to pick from—triggered by a button.",
		href: "https://ui.shadcn.com/docs/components/select",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <SelectDemo />,
		code: code,
	},
	installation: {
		componentName: "select",
		dependencies: "@radix-ui/react-select lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
