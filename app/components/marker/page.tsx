"use client";
import { Calendar, CheckCircle2, Sparkles } from "lucide-react";
import type { ManualFile } from "@/components/installation-guide";
import generatedProps from "@/registry/optics/dist/marker.json";
import componentCode from "@/registry/optics/dist/marker.tsx.txt";
import { Marker, MarkerContent, MarkerIcon } from "@/registry/optics/marker";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/marker.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex w-full max-w-md flex-col gap-6">
		<Marker>
			<MarkerIcon>
				<Sparkles />
			</MarkerIcon>
			<MarkerContent>Started deployment pipeline for production</MarkerContent>
		</Marker>

		<Marker variant="separator">
			<MarkerIcon>
				<Calendar />
			</MarkerIcon>
			<MarkerContent>Today</MarkerContent>
		</Marker>

		<Marker variant="border">
			<MarkerIcon>
				<CheckCircle2 />
			</MarkerIcon>
			<MarkerContent>All verification checks passed before release</MarkerContent>
		</Marker>
	</div>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Marker",
		description:
			"Highlights status indicators, badges, or timeline waypoints with icons and content.",
		href: "https://ui.shadcn.com/docs/components/marker",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Marker, MarkerContent, MarkerIcon } from "@/components/optics/marker";
import { Calendar, CheckCircle2, Sparkles } from "lucide-react";`,
		filename: "marker.tsx",
	},
	installation: {
		componentName: "marker",
		dependencies: "@base-ui/react class-variance-authority",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
