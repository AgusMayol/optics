"use client";
import type { ManualFile } from "@/components/installation-guide";
import type { ComponentPropsGroup } from "@/components/props-table";
import componentCode from "@/registry/optics/dist/native-select.tsx.txt";
import {
	NativeSelect,
	NativeSelectOptGroup,
	NativeSelectOption,
} from "@/registry/optics/native-select";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/native-select.tsx",
		code: componentCode,
	},
];

const propsData: ComponentPropsGroup[] = [
	{
		component: "<NativeSelect />",
		props: [
			{
				name: "size",
				type: '"sm" | "default"',
				defaultValue: "(default: default)",
				description: "Controls the height and font size of the select control.",
			},
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes to apply to the wrapper element.",
			},
			{
				name: "disabled",
				type: "boolean",
				description: "When true, disables the native select control.",
			},
			{
				name: "...props",
				type: 'Omit<React.ComponentProps<"select">, "size">',
				description:
					"Standard HTML select attributes such as value, defaultValue, onChange, and name.",
			},
		],
	},
	{
		component: "<NativeSelectOption />",
		props: [
			{
				name: "value",
				type: "string | number | readonly string[]",
				description: "The value submitted when this option is selected.",
			},
			{
				name: "disabled",
				type: "boolean",
				description: "When true, prevents selecting this option.",
			},
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes to apply to the option element.",
			},
			{
				name: "...props",
				type: 'React.ComponentProps<"option">',
				description: "Standard HTML option attributes.",
			},
		],
	},
	{
		component: "<NativeSelectOptGroup />",
		props: [
			{
				name: "label",
				type: "string",
				description: "Group heading displayed above nested options.",
			},
			{
				name: "disabled",
				type: "boolean",
				description: "When true, disables all options inside the group.",
			},
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes to apply to the optgroup element.",
			},
			{
				name: "...props",
				type: 'React.ComponentProps<"optgroup">',
				description: "Standard HTML optgroup attributes.",
			},
		],
	},
];

const demoComponent = (
	<div className="flex flex-wrap items-center justify-center gap-4">
		<NativeSelect aria-label="Select a fruit" defaultValue="">
			<NativeSelectOption value="">Select a fruit</NativeSelectOption>
			<NativeSelectOptGroup label="Orchard">
				<NativeSelectOption value="apple">Apple</NativeSelectOption>
				<NativeSelectOption value="pear">Pear</NativeSelectOption>
				<NativeSelectOption value="peach">Peach</NativeSelectOption>
			</NativeSelectOptGroup>
			<NativeSelectOptGroup label="Citrus">
				<NativeSelectOption value="orange">Orange</NativeSelectOption>
				<NativeSelectOption value="lemon">Lemon</NativeSelectOption>
			</NativeSelectOptGroup>
		</NativeSelect>

		<NativeSelect size="sm" aria-label="Select workflow status" defaultValue="in-progress">
			<NativeSelectOptGroup label="Status">
				<NativeSelectOption value="todo">Todo</NativeSelectOption>
				<NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
				<NativeSelectOption value="done">Done</NativeSelectOption>
			</NativeSelectOptGroup>
		</NativeSelect>

		<NativeSelect aria-label="Disabled select" disabled defaultValue="locked">
			<NativeSelectOption value="locked">Disabled</NativeSelectOption>
		</NativeSelect>
	</div>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Native Select",
		description: "Accessible styled native HTML select control with option group support.",
		href: "https://ui.shadcn.com/docs/components/native-select",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/optics/native-select";`,
		filename: "native-select.tsx",
	},
	installation: {
		componentName: "native-select",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: propsData,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
