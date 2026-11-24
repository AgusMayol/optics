"use client";
import type { ManualFile } from "@/components/installation-guide";
import generatedProps from "@/registry/optics/dist/star-rating.json";
import componentCode from "@/registry/optics/dist/star-rating.tsx.txt";
import { StarRating } from "@/registry/optics/star-rating";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/star-rating.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex items-center justify-center flex-wrap gap-8">
		<div className="flex flex-col items-center gap-2">
			<p className="text-sm text-muted-foreground">Default</p>
			<StarRating />
		</div>
		<div className="flex flex-col items-center gap-2">
			<p className="text-sm text-muted-foreground">With Value</p>
			<StarRating defaultValue={3} />
		</div>
		<div className="flex flex-col items-center gap-2">
			<p className="text-sm text-muted-foreground">Small</p>
			<StarRating size="sm" />
		</div>
		<div className="flex flex-col items-center gap-2">
			<p className="text-sm text-muted-foreground">Medium</p>
			<StarRating size="md" />
		</div>
		<div className="flex flex-col items-center gap-2">
			<p className="text-sm text-muted-foreground">Large</p>
			<StarRating size="lg" />
		</div>
		<div className="flex flex-col items-center gap-2">
			<p className="text-sm text-muted-foreground">10 Stars</p>
			<StarRating totalStars={10} />
		</div>
		<div className="flex flex-col items-center gap-2">
			<p className="text-sm text-muted-foreground">Disabled</p>
			<StarRating disabled defaultValue={2} />
		</div>
	</div>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Star Rating",
		description:
			"An interactive star rating component with smooth animations and customizable options.",
		href: "https://21st.dev/community/components/ayushmxxn/star-rating/default",
		hrefText: "21st.dev",
	},
	content: {
		children: demoComponent,
		imports: `import { StarRating } from "@/components/optics/star-rating";`,
		filename: "star-rating.tsx",
	},
	installation: {
		componentName: "star-rating",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
