"use client";
import { ComponentConfig } from "../layout";
import { Spinner } from "@/registry/optics/spinner";

import componentCode from "@/registry/optics/dist/spinner.jsx.txt";
import generatedProps from "@/registry/optics/dist/spinner.json";

const componentFiles = [
	{
		path: "@/components/optics/spinner.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex items-center justify-center gap-4">
		<Spinner />
		<Spinner size="size-8" />
		<Spinner size="size-12" />
	</div>
);

const componentConfig = {
	header: {
		title: "Spinner",
		description:
			"An animated loading spinner component for indicating loading states.",
		href: "https://www.luxeui.com/ui/spinner",
		hrefText: "Luxe",
	},
	content: {
		children: demoComponent,
		imports: `import { Spinner } from "@/components/optics/spinner";`,
		filename: "spinner.jsx",
	},
	installation: {
		componentName: "spinner",
		dependencies: "clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
