"use client";
import type { ManualFile } from "@/components/installation-guide";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/registry/optics/combobox";
import generatedProps from "@/registry/optics/dist/combobox.json";
import componentCode from "@/registry/optics/dist/combobox.tsx.txt";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/combobox.tsx",
		code: componentCode,
	},
];

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

const demoComponent = (
	<Combobox items={frameworks}>
		<ComboboxInput placeholder="Select a framework..." showClear className="w-64" />
		<ComboboxContent>
			<ComboboxEmpty>No frameworks found.</ComboboxEmpty>
			<ComboboxList>
				{(framework: string) => (
					<ComboboxItem key={framework} value={framework}>
						{framework}
					</ComboboxItem>
				)}
			</ComboboxList>
		</ComboboxContent>
	</Combobox>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Combobox",
		description:
			"Autocomplete input and command palette with filterable dropdown options and chips.",
		href: "https://ui.shadcn.com/docs/components/combobox",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/optics/combobox";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];`,
		filename: "combobox.tsx",
	},
	installation: {
		componentName: "combobox",
		dependencies: "@base-ui/react lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
