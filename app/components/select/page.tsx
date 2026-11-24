"use client";
import type { ManualFile } from "@/components/installation-guide";
import generatedProps from "@/registry/optics/dist/select.json";
import componentCode from "@/registry/optics/dist/select.tsx.txt";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/optics/select";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/select.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<Select defaultValue="apple">
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

const componentConfig: ComponentConfigData = {
	header: {
		title: "Select",
		description: "Displays a list of options for the user to pick from—triggered by a button.",
		href: "https://ui.shadcn.com/docs/components/select",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/optics/select";`,
		filename: "select.tsx",
	},
	installation: {
		componentName: "select",
		dependencies: "@base-ui/react lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
