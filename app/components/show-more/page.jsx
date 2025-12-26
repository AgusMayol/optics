"use client";
import { ComponentConfig } from "../layout";
import { ShowMore } from "@/registry/optics/show-more";

import componentCode from "@/registry/optics/dist/show-more.jsx.txt";
import generatedProps from "@/registry/optics/dist/show-more.json";

const componentFiles = [
	{
		path: "@/components/optics/show-more.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "show-more.jsx",
		code: `import { ShowMore } from "@/components/optics/show-more";

<ShowMore
	maskColor={{
		default: "from-sidebar",
		dark: "from-sidebar",
	}}
	moreContent={
		<div className="space-y-3">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Sed do eiusmod tempor incididunt ut labore et dolore
				magna aliqua.
			</p>
			<p>
				Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat.
			</p>
		</div>
	}
>
	<p className="text-base font-normal">
		An expandable content block shows a preview and keeps the rest
		hidden until the user expands it.
	</p>
</ShowMore>

<ShowMore
	showSeparator={false}
	moreContent={
		<p>
			You can place any JSX here: lists, images, or additional
			paragraphs. The component keeps the bottom action in view.
		</p>
	}
>
	<p className="text-base font-normal">
		This example hides the separator for a tighter layout.
	</p>
</ShowMore>`,
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
		code: code,
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
