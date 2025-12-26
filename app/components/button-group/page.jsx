"use client";
import { ComponentConfig } from "../layout";
import {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
} from "@/registry/optics/button-group";
import { Button } from "@/registry/optics/button";
import { Copy, Download, Share2 } from "lucide-react";

import componentCode from "@/registry/optics/dist/button-group.jsx.txt";
import generatedProps from "@/registry/optics/dist/button-group.json";

const componentFiles = [
	{
		path: "@/components/optics/button-group.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "button-group.jsx",
		code: `import { ButtonGroup } from "@/components/optics/button-group";
import { Button } from "@/registry/optics/button";

<div className="flex items-center justify-center gap-6">
	<ButtonGroup orientation="vertical">
		<Button variant="raised" animation="none">
			<Copy />
			Copy
		</Button>
		<Button variant="raised" animation="colors">
			<Download />
			Download
		</Button>
		<Button variant="raised" animation="colors">
			<Share2 />
			Share
		</Button>
	</ButtonGroup>

	<div className="flex flex-col items-start justify-center gap-6">
		<ButtonGroup>
			<Button variant="raised" animation="colors">
				<Copy />
				Copy
			</Button>
			<Button variant="raised" animation="colors">
				<Download />
				Download
			</Button>
			<Button variant="raised" animation="colors">
				<Share2 />
				Share
			</Button>
		</ButtonGroup>

		<ButtonGroup>
			<ButtonGroupText variant="raised">Actions</ButtonGroupText>
			<ButtonGroupSeparator />
			<Button variant="raised" animation="colors">
				<Copy />
			</Button>
			<Button variant="raised" animation="colors">
				<Download />
			</Button>
			<Button variant="raised" animation="colors">
				<Share2 />
			</Button>
		</ButtonGroup>
	</div>
</div>`,
	},
];


const demoComponent = (
	<div className="flex items-center justify-center gap-6">
		<ButtonGroup orientation="vertical">
			<Button variant="raised" animation="none">
				<Copy />
				Copy
			</Button>
			<Button variant="raised" animation="colors">
				<Download />
				Download
			</Button>
			<Button variant="raised" animation="colors">
				<Share2 />
				Share
			</Button>
		</ButtonGroup>

		<div className="flex flex-col items-start justify-center gap-6">
			<ButtonGroup>
				<Button variant="raised" animation="colors">
					<Copy />
					Copy
				</Button>
				<Button variant="raised" animation="colors">
					<Download />
					Download
				</Button>
				<Button variant="raised" animation="colors">
					<Share2 />
					Share
				</Button>
			</ButtonGroup>

			<ButtonGroup>
				<ButtonGroupText variant="raised">Actions</ButtonGroupText>
				<ButtonGroupSeparator />
				<Button variant="raised" animation="colors">
					<Copy />
				</Button>
				<Button variant="raised" animation="colors">
					<Download />
				</Button>
				<Button variant="raised" animation="colors">
					<Share2 />
				</Button>
			</ButtonGroup>
		</div>
	</div>
);

const componentConfig = {
	header: {
		title: "Button Group",
		description:
			"A component that groups multiple buttons together with consistent styling and spacing.",
		href: undefined,
		hrefText: undefined,
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "button-group",
		dependencies: "@radix-ui/react-slot class-variance-authority",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
