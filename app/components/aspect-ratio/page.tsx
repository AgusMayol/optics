"use client";

import Image from "next/image";
import type { ManualFile } from "@/components/installation-guide";
import { AspectRatio } from "@/registry/optics/aspect-ratio";
import generatedProps from "@/registry/optics/dist/aspect-ratio.json";
import componentCode from "@/registry/optics/dist/aspect-ratio.tsx.txt";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/aspect-ratio.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="w-[450px]">
		<AspectRatio ratio={16 / 9} className="bg-muted">
			<Image
				src="/images/background-placeholder.jpeg"
				alt="Photo by Ale"
				fill
				sizes="(max-width: 768px) 100vw, 450px"
				className="rounded-md object-cover"
			/>
		</AspectRatio>
	</div>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Aspect Ratio",
		description: "Displays content within a desired ratio.",
		href: "https://ui.shadcn.com/docs/components/aspect-ratio",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { AspectRatio } from "@/components/optics/aspect-ratio";
import Image from "next/image";`,
		filename: "aspect-ratio.tsx",
	},
	installation: {
		componentName: "aspect-ratio",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
