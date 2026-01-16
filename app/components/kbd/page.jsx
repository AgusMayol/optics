"use client";
import { ComponentConfig } from "../layout";
import { Kbd, KbdGroup } from "@/registry/optics/kbd";

import componentCode from "@/registry/optics/dist/kbd.jsx.txt";
import generatedProps from "@/registry/optics/dist/kbd.json";

const componentFiles = [
	{
		path: "@/components/optics/kbd.jsx",
		code: componentCode,
	},
];





const demoComponent = (
	<div className="flex flex-col items-center gap-6">
		<div className="flex items-center gap-2">
			<p className="text-sm">Press</p>
			<Kbd useHotkey>⌘</Kbd>
			<Kbd useHotkey>K</Kbd>
			<p className="text-sm">to open search</p>
		</div>

		<div className="flex items-center gap-2">
			<p className="text-sm">Or use</p>
			<KbdGroup>
				<Kbd useHotkey>⌘ + K</Kbd>
			</KbdGroup>
		</div>
	</div>
);

const componentConfig = {
	header: {
		title: "Kbd",
		description: "A component to display keyboard keys and shortcuts.",
		href: "https://cuicui.day/application-ui/kbd",
		hrefText: "CuiCui",
	},
	content: {
		children: demoComponent,
		imports: `import { Kbd, KbdGroup } from "@/components/optics/kbd";`,
		filename: "kbd.jsx",
	},
	installation: {
		componentName: "kbd",
		dependencies:
			"clsx tailwind-merge class-variance-authority react-hotkeys-hook",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
