"use client";
import { ComponentConfig } from "../layout";
import { Skeleton } from "@/registry/optics/skeleton";
import { Card, CardContent } from "@/registry/optics/card";

import componentCode from "@/registry/optics/dist/skeleton.jsx.txt";
import generatedProps from "@/registry/optics/dist/skeleton.json";

const componentFiles = [
	{
		path: "@/components/optics/skeleton.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex items-center space-x-4 w-full max-w-md">
		<Card className="w-full">
			<CardContent className="flex items-center space-x-4 w-full max-w-md">
				<Skeleton className="h-12 w-12 rounded-full squircle-none" />
				<div className="space-y-2 flex-1">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</CardContent>
		</Card>
	</div>
);

const componentConfig = {
	header: {
		title: "Skeleton",
		description: "Use to show a placeholder while content is loading.",
		href: "https://ui.shadcn.com/docs/components/skeleton",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Skeleton } from "@/components/optics/skeleton";`,
		filename: "skeleton.jsx",
	},
	installation: {
		componentName: "skeleton",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
