"use client";
import { ComponentConfig } from "../layout";
import { AspectRatio } from "@/registry/optics/aspect-ratio";
import Image from "next/image";

import componentCode from "@/registry/optics/dist/aspect-ratio.jsx.txt";
import generatedProps from "@/registry/optics/dist/aspect-ratio.json";

const componentFiles = [
	{
		path: "@/components/optics/aspect-ratio.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "aspect-ratio.jsx",
		code: `import { AspectRatio } from "@/components/optics/aspect-ratio";
import Image from "next/image";

<div className="w-[450px]">
	<AspectRatio ratio={16 / 9} className="bg-muted">
		<Image
			src="/images/background-placeholder.jpeg"
			alt="Photo by Ale"
			fill
			className="rounded-md object-cover"
		/>
	</AspectRatio>
</div>`,
	},
];



const demoComponent = (
	<div className="w-[450px]">
		<AspectRatio ratio={16 / 9} className="bg-muted">
			<Image
				src="/images/background-placeholder.jpeg"
				alt="Photo by Ale"
				fill
				className="rounded-md object-cover"
			/>
		</AspectRatio>
	</div>
);

const componentConfig = {
	header: {
		title: "Aspect Ratio",
		description: "Displays content within a desired ratio.",
		href: "https://ui.shadcn.com/docs/components/aspect-ratio",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "aspect-ratio",
		dependencies: "@radix-ui/react-aspect-ratio",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
