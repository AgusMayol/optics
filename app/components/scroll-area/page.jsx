"use client";
import { ComponentConfig } from "../layout";
import { ScrollArea } from "@/registry/optics/scroll-area";

import componentCode from "@/registry/optics/dist/scroll-area.jsx.txt";
import utilsCode from "@/registry/optics/dist/lib/utils.js.txt";
import useHasPrimaryTouchCode from "@/registry/optics/dist/hooks/use-has-primary-touch.jsx.txt";

const componentFiles = [
	{
		path: "@/components/optics/scroll-area.jsx",
		code: componentCode,
	},
	{
		path: "@/components/optics/lib/utils.js",
		code: utilsCode,
	},
	{
		path: "@/components/optics/hooks/use-has-primary-touch.jsx",
		code: useHasPrimaryTouchCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "scroll-area.jsx",
		code: `import { ScrollArea } from "@/components/optics/scroll-area";

<ScrollArea className="h-72 w-48 rounded-md border bg-background">
	<div className="p-4">
		<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
		{Array.from({ length: 50 }).map((_, i) => (
			<div key={i} className="text-sm py-1">
				Tag {i + 1}
			</div>
		))}
	</div>
</ScrollArea>`,
	},
];

const propsData = [
	{
		component: "<ScrollArea />",
		props: [
			{
				name: "className",
				type: "string",
				description:
					"Additional CSS classes to apply to the scroll area.",
			},
			{
				name: "scrollHideDelay",
				type: "number (default: 0)",
				description:
					"Delay in milliseconds before hiding the scrollbar.",
			},
			{
				name: "viewportClassName",
				type: "string",
				description: "CSS classes for the viewport element.",
			},
			{
				name: "maskClassName",
				type: "string",
				description: "CSS classes for the fade mask elements.",
			},
			{
				name: "maskHeight",
				type: "number (default: 30)",
				description: "Height of the fade mask in pixels.",
			},
			{
				name: "maskColor",
				type: "string",
				description: "Color for the fade mask effect.",
			},
		],
	},
];

const demoComponent = (
	<ScrollArea className="h-72 w-48 rounded-md border bg-background">
		<div className="p-4">
			<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
			{Array.from({ length: 50 }).map((_, i) => (
				<div key={i} className="text-sm py-1">
					Tag {i + 1}
				</div>
			))}
		</div>
	</ScrollArea>
);

const componentConfig = {
	header: {
		title: "Scroll Area",
		description:
			"Augments native scroll functionality for custom, cross-browser styling.",
		href: "https://ui.shadcn.com/docs/components/scroll-area",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "scroll-area",
		dependencies: "@radix-ui/react-scroll-area",
		manualFiles: componentFiles,
	},
	props: propsData,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
