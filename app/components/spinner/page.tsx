"use client";
import type { ManualFile } from "@/components/installation-guide";
import generatedProps from "@/registry/optics/dist/spinner.json";
import componentCode from "@/registry/optics/dist/spinner.tsx.txt";
import { Spinner } from "@/registry/optics/spinner";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/spinner.tsx",
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

const componentConfig: ComponentConfigData = {
	header: {
		title: "Spinner",
		description: "An animated loading spinner component for indicating loading states.",
		href: "https://www.luxeui.com/ui/spinner",
		hrefText: "Luxe",
	},
	content: {
		children: demoComponent,
		imports: `import { Spinner } from "@/components/optics/spinner";`,
		filename: "spinner.tsx",
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
