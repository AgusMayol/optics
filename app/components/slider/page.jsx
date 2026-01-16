"use client";
import { ComponentConfig } from "../layout";
import { useState } from "react";
import { Slider } from "@/registry/optics/slider";

import componentCode from "@/registry/optics/dist/slider.jsx.txt";
import generatedProps from "@/registry/optics/dist/slider.json";

const componentFiles = [
	{
		path: "@/components/optics/slider.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="w-full flex flex-col items-center gap-8">
		<div className="w-full max-w-md flex flex-col gap-2">
			<Slider
				defaultValue={[50]}
				max={100}
				step={1}
			/>
			<p className="text-sm text-muted-foreground">
				Value: 50
			</p>
		</div>

		<div className="w-full max-w-md flex flex-col gap-2">
			<Slider
				defaultValue={[25, 75]}
				max={100}
				step={1}
			/>
			<p className="text-sm text-muted-foreground">
				Range: 25 - 75
			</p>
		</div>
	</div>
);

const componentConfig = {
	header: {
		title: "Slider",
		description:
			"An input where the user selects a value from within a given range.",
		href: "https://ui.shadcn.com/docs/components/slider",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Slider } from "@/components/optics/slider";`,
		filename: "slider.jsx",
	},
	installation: {
		componentName: "slider",
		dependencies: "@base-ui/react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return (
		<>
			<ComponentConfig config={componentConfig}>{null}</ComponentConfig>
		</>
	);
}
