"use client";
import { ComponentConfig } from "../layout";
import { ShowMore } from "@/registry/optics/show-more";

import generatedProps from "@/registry/optics/dist/show-more.json";
import componentCode from "@/registry/optics/dist/show-more.jsx.txt";

const componentFiles = [
	{
		path: "@/components/optics/show-more.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex flex-col gap-2">
		<ShowMore
			maskColor={{
				default: "from-sidebar",
				dark: "from-sidebar",
			}}
			moreContent={
				<div className="text-base space-y-3 mt-3">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<p>
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
						nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
			}
		>
			<p className="text-base ">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus quisquam
				assumenda eligendi provident magni error voluptatibus obcaecati ab qui
				necessitatibus.
			</p>
		</ShowMore>
	</div>
);

const componentConfig = {
	header: {
		title: "Show More",
		description:
			'An expandable content component that shows a "Show More" button when content exceeds a specified length or number of lines.',
		href: "https://ui.shadcn.com/docs/components/accordion",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		children: demoComponent,
		imports: `import { ShowMore } from "@/components/optics/show-more";`,
		filename: "show-more.jsx",
	},
	installation: {
		componentName: "show-more",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
