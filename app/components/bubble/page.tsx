"use client";
import type { ManualFile } from "@/components/installation-guide";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/registry/optics/bubble";
import generatedProps from "@/registry/optics/dist/bubble.json";
import componentCode from "@/registry/optics/dist/bubble.tsx.txt";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/bubble.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<BubbleGroup className="w-full max-w-md gap-4">
		<Bubble align="start" variant="muted">
			<BubbleContent>Hey! Did you get a chance to review the new layout specs?</BubbleContent>
		</Bubble>

		<Bubble align="end" variant="default" className="mb-3">
			<BubbleContent>
				Yes! Just finished looking through them. Everything looks super clean.
			</BubbleContent>
			<BubbleReactions align="end">
				<span>👍</span>
				<span className="text-xs text-muted-foreground">2</span>
			</BubbleReactions>
		</Bubble>

		<Bubble align="start" variant="secondary">
			<BubbleContent>Awesome, I pushed the updated spacing tokens to the branch.</BubbleContent>
		</Bubble>

		<Bubble align="end" variant="tinted" className="mb-3">
			<BubbleContent>Pulled and verified. Ready to ship whenever you are!</BubbleContent>
			<BubbleReactions align="start">
				<span>🚀</span>
				<span className="text-xs text-muted-foreground">1</span>
			</BubbleReactions>
		</Bubble>
	</BubbleGroup>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Bubble",
		description: "Styled chat message bubble with alignment variants and reaction badges.",
		href: "https://ui.shadcn.com/docs/components/bubble",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/optics/bubble";`,
		filename: "bubble.tsx",
	},
	installation: {
		componentName: "bubble",
		dependencies: "@base-ui/react class-variance-authority",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
