"use client";
import { ComponentConfig } from "../layout";
import { GridContainer, GridRow, GridItem } from "@/registry/optics/grid";

import componentCode from "@/registry/optics/dist/grid.jsx.txt";

const componentFiles = [
	{
		path: "@/components/optics/grid.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "grid.jsx",
		code: `import { GridContainer, GridRow, GridItem } from "@/components/optics/grid";

<GridContainer cols={12} rows={3} border>
	<GridRow className="rounded-t-xl">
		<GridItem span={4}>Column 1</GridItem>
		<GridItem span={4}>Column 2</GridItem>
		<GridItem span={4}>Column 3</GridItem>
	</GridRow>
	<GridRow>
		<GridItem span={6}>Half</GridItem>
		<GridItem span={6}>Half</GridItem>
	</GridRow>
	<GridRow>
		<GridItem span={12}>Full Width</GridItem>
	</GridRow>
</GridContainer>`,
	},
];

const propsData = [
	{
		component: "<GridContainer />",
		props: [
			{
				name: "className",
				type: "string",
				description:
					"Additional CSS classes to apply to the grid container.",
			},
			{
				name: "cols",
				type: "number (default: 12)",
				description: "Number of columns in the grid.",
			},
			{
				name: "rows",
				type: "number (default: 1)",
				description: "Number of rows in the grid.",
			},
			{
				name: "gap",
				type: "number (default: 0)",
				description: "Gap between grid items in pixels.",
			},
			{
				name: "border",
				type: "boolean (default: true)",
				description: "Whether to show borders between grid items.",
			},
		],
	},
	{
		component: "<GridRow />",
		props: [
			{
				name: "className",
				type: "string",
				description:
					"Additional CSS classes to apply to the grid row.",
			},
			{
				name: "span",
				type: "number (default: 0, uses cols if 0)",
				description: "Number of columns this row spans.",
			},
			{
				name: "gap",
				type: "number (default: 0)",
				description: "Gap between items in this row in pixels.",
			},
			{
				name: "overrideStyles",
				type: "boolean (default: false)",
				description:
					"When true, disables the default grid styles so you can fully control layout via className and style.",
			},
			{
				name: "borderTop",
				type: "boolean (default: true)",
				description: "Whether to show top border.",
			},
			{
				name: "borderBottom",
				type: "boolean (default: true)",
				description: "Whether to show bottom border.",
			},
		],
	},
	{
		component: "<GridItem />",
		props: [
			{
				name: "className",
				type: "string",
				description:
					"Additional CSS classes to apply to the grid item.",
			},
			{
				name: "span",
				type: "number (default: 1)",
				description: "Number of columns this item spans.",
			},
			{
				name: "borderLeft",
				type: "boolean (default: true)",
				description: "Whether to show left border.",
			},
			{
				name: "borderRight",
				type: "boolean (default: true)",
				description: "Whether to show right border.",
			},
			{
				name: "borderTop",
				type: "boolean (default: false)",
				description: "Whether to show top border.",
			},
			{
				name: "borderBottom",
				type: "boolean (default: false)",
				description: "Whether to show bottom border.",
			},
			{
				name: "decorationTopLeft",
				type: "boolean (default: false)",
				description: "Whether to show top-left decoration.",
			},
			{
				name: "decorationTopRight",
				type: "boolean (default: false)",
				description: "Whether to show top-right decoration.",
			},
			{
				name: "decorationBottomLeft",
				type: "boolean (default: false)",
				description: "Whether to show bottom-left decoration.",
			},
			{
				name: "decorationBottomRight",
				type: "boolean (default: false)",
				description: "Whether to show bottom-right decoration.",
			},
		],
	},
];

const demoComponent = (
	<GridContainer
		cols={12}
		rows={3}
		border
		className="w-full max-w-2xl"
	>
		<GridRow className="rounded-t-xl">
			<GridItem
				decorationTopLeft
				span={4}
				className="aspect-square"
			></GridItem>
			<GridItem span={4} className="aspect-square"></GridItem>
			<GridItem span={4} className="aspect-square"></GridItem>
		</GridRow>
		<GridRow>
			<GridItem span={4} className="aspect-square"></GridItem>
			<GridItem span={4} className="aspect-square"></GridItem>
			<GridItem span={4} className="aspect-square"></GridItem>
		</GridRow>
		<GridRow>
			<GridItem span={4} className="aspect-square"></GridItem>
			<GridItem span={4} className="aspect-square"></GridItem>
			<GridItem
				decorationBottomRight
				span={4}
				className="aspect-square"
			></GridItem>
		</GridRow>
	</GridContainer>
);

const componentConfig = {
	header: {
		title: "Grid",
		description:
			"A flexible grid system for building complex layouts with rows and columns.",
		href: undefined,
		hrefText: undefined,
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "grid",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: propsData,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
