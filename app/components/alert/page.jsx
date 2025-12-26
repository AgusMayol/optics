"use client";
import { ComponentConfig } from "../layout";
import { Alert, AlertDescription, AlertTitle } from "@/registry/optics/alert";
import { AlertCircle, Terminal } from "lucide-react";

import componentCode from "@/registry/optics/dist/alert.jsx.txt";
import generatedProps from "@/registry/optics/dist/alert.json";

const componentFiles = [
	{
		path: "@/components/optics/alert.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex flex-col gap-4">
		<Alert>
			<Terminal />
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>
				You can add components to your app using the CLI.
			</AlertDescription>
		</Alert>

		<Alert variant="destructive">
			<AlertCircle />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				Your session has expired. Please log in again.
			</AlertDescription>
		</Alert>
	</div>
);

const componentConfig = {
	header: {
		title: "Alert",
		description: "Displays a callout for user attention.",
		href: "https://ui.shadcn.com/docs/components/alert",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Alert, AlertTitle, AlertDescription } from "@/components/optics/alert";
import { Terminal, AlertCircle } from "lucide-react";`,
		filename: "alert.jsx",
	},
	installation: {
		componentName: "alert",
		dependencies: "class-variance-authority",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
