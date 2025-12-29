"use client";
import { ComponentConfig } from "../layout";
import { Button } from "@/registry/optics/button";
import { ArrowUpRight, Sparkle } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/dist/button.jsx.txt";
import generatedProps from "@/registry/optics/dist/button.json";

const componentFiles = [
	{
		path: "@/components/optics/button.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex flex-wrap items-center justify-center gap-4">
		<Button>Default</Button>
		<Button variant="decorations">Decorations</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="info">Info</Button>
		<Button variant="success">Success</Button>
		<Button variant="warning">Warning</Button>
		<Button variant="muted">Muted</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="destructive">Destructive</Button>
		<Button variant="raised">Raised</Button>
		<Button size="lg">Large</Button>
		<Button size="icon-lg">
			<Sparkle />
		</Button>
		<Button size="icon">
			<Sparkle />
		</Button>
		<Button size="icon-sm">
			<Sparkle />
		</Button>
		<Button size="sm">Small</Button>
		<Button
			variant="link"
			nativeButton={false}
			render={
				<Link href="#">
					Link
					<ArrowUpRight size={16} className="-ml-1" />
				</Link>
			}
		/>
	</div>
);

const componentConfig = {
	header: {
		title: "Button",
		description: "Displays a button or a component that looks like a button.",
		href: "https://ui.shadcn.com/docs/components/button",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Button } from "@/components/optics/button";
import { Sparkle } from "lucide-react";
import Link from "next/link";`,
		filename: "button.jsx",
	},
	installation: {
		componentName: "button",
		dependencies: "@base-ui/react class-variance-authority",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
