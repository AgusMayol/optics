"use client";
import { ComponentConfig } from "../layout";
import {
	GuidedTour,
	GuidedTourOverlay,
	GuidedTourProvider,
	GuidedTourStep,
	GuidedTourTrigger,
} from "@/registry/optics/guided-tour";
import { Button } from "@/registry/optics/button";
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";
import { HelpCircle } from "lucide-react";

import componentCode from "@/registry/optics/dist/guided-tour.jsx.txt";
import generatedProps from "@/registry/optics/dist/guided-tour.json";

const componentFiles = [
	{
		path: "@/components/optics/guided-tour.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "example.jsx",
		code: `import {
	GuidedTourProvider,
	GuidedTour,
	GuidedTourTrigger,
	GuidedTourStep,
	GuidedTourOverlay,
} from "@/components/optics/guided-tour";
import { Button } from "@/components/optics/button";

function MyComponent() {
	return (
		<GuidedTourProvider>
			<GuidedTour>
				<GuidedTourOverlay />
				
				<GuidedTourTrigger tourId="welcome-tour" render={<Button>Start Tour</Button>} />

				<div className="space-y-4">
					<GuidedTourStep
						tourId="welcome-tour"
						step={1}
						content={
							<div>
								<h3 className="font-semibold mb-2">Welcome</h3>
								<p className="text-sm text-muted-foreground">
									This is the first step of the tour.
								</p>
							</div>
						}
					>
						<Button>Main Button</Button>
					</GuidedTourStep>

					<GuidedTourStep
						tourId="welcome-tour"
						step={2}
						content={
							<div>
								<h3 className="font-semibold mb-2">Second Step</h3>
								<p className="text-sm text-muted-foreground">
									Here you can see the second element.
								</p>
							</div>
						}
					>
						<Input placeholder="Input field" />
					</GuidedTourStep>

					<GuidedTourStep
						tourId="welcome-tour"
						step={3}
						content={
							<div>
								<h3 className="font-semibold mb-2">Final</h3>
								<p className="text-sm text-muted-foreground">
									This is the last step of the tour.
								</p>
							</div>
						}
					>
						<Button variant="secondary">Finish</Button>
					</GuidedTourStep>
				</div>
			</GuidedTour>
		</GuidedTourProvider>
	);
}`,
	},
];

const demoComponent = (
	<GuidedTourProvider>
		<GuidedTour>
			<GuidedTourOverlay />
			<div className="flex flex-col items-center gap-4 w-full max-w-md">
				<GuidedTourTrigger
					tourId="demo-tour"
					render={
						<Button>
							<HelpCircle className="mr-2" />
							Start Demo Tour
						</Button>
					}
				/>

				<div className="w-full flex items-stretch justify-center gap-8">
					<GuidedTourStep
						tourId="demo-tour"
						step={1}
						content={
							<div>
								<h3 className="font-semibold mb-2 text-base">
									Welcome to the Tour
								</h3>
								<p className="text-sm text-muted-foreground">
									This is the first step. Here you can see how the guided tour
									component works.
								</p>
							</div>
						}
					>
						<div className="p-4 border rounded-lg bg-background space-y-2">
							<Label>Step 1: Input Field</Label>
							<Input placeholder="Type something here..." />
						</div>
					</GuidedTourStep>

					<GuidedTourStep
						tourId="demo-tour"
						step={2}
						content={
							<div>
								<h3 className="font-semibold mb-2 text-base">Second Step</h3>
								<p className="text-sm text-muted-foreground">
									This is the second element of the tour. You can continue
									navigating between steps.
								</p>
							</div>
						}
					>
						<div className="p-4 border rounded-lg bg-background space-y-2">
							<Label>Step 2: Action Button</Label>
							<Button className="w-full">Click Here</Button>
						</div>
					</GuidedTourStep>

					<GuidedTourStep
						tourId="demo-tour"
						step={3}
						content={
							<div>
								<h3 className="font-semibold mb-2 text-base">Last Step</h3>
								<p className="text-sm text-muted-foreground">
									This is the last step of the tour. Press "Finish" to complete
									the tour.
								</p>
							</div>
						}
					>
						<div className="p-4 border rounded-lg bg-background space-y-2">
							<Label>Step 3: Completion</Label>
							<Button variant="secondary" className="w-full">
								Complete
							</Button>
						</div>
					</GuidedTourStep>
				</div>
			</div>
		</GuidedTour>
	</GuidedTourProvider>
);

const componentConfig = {
	header: {
		title: "Guided Tour",
		description:
			"A component for creating interactive guided tours that walk users through your application step by step. Includes forward and backward navigation, dark overlay, and customizable content for each step.",
		href: "https://ui.shadcn.com/docs/components/popover",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "guided-tour",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
