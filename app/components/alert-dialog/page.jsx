"use client";
import { ComponentConfig } from "../layout";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogIcon,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/registry/optics/alert-dialog";
import { Button } from "@/registry/optics/button";
import { Info } from "lucide-react";

import componentCode from "@/registry/optics/dist/alert-dialog.jsx.txt";
import generatedProps from "@/registry/optics/dist/alert-dialog.json";

const componentFiles = [
	{
		path: "@/components/optics/alert-dialog.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "alert-dialog.jsx",
		code: `import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogIcon,
} from "@/components/optics/alert-dialog";
import { Button } from "@/components/optics/button";
import { Info } from "lucide-react";

<AlertDialog>
	<AlertDialogTrigger asChild>
		<Button variant="raised">Show Dialog</Button>
	</AlertDialogTrigger>
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogIcon>
				<div className="p-2 rounded-full squircle-none flex items-center justify-center shadow-md bg-emerald-500/20">
					<Info className="text-emerald-600" />
				</div>
				<AlertDialogTitle>
					Are you absolutely sure?
				</AlertDialogTitle>
			</AlertDialogIcon>
			<AlertDialogDescription>
				This action cannot be undone. This will permanently delete
				your account and remove your data from our servers.
			</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<AlertDialogCancel>Cancel</AlertDialogCancel>
			<AlertDialogAction>Continue</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>`,
	},
];

const demoComponent = (
	<AlertDialog>
		<AlertDialogTrigger asChild>
			<Button variant="raised">Show Dialog</Button>
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogIcon>
					<div className="p-2 rounded-full squircle-none flex items-center justify-center shadow-md bg-emerald-500/20">
						<Info className="text-emerald-600" />
					</div>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				</AlertDialogIcon>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction>Continue</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);

const componentConfig = {
	header: {
		title: "Alert Dialog",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
		href: "https://ui.shadcn.com/docs/components/alert-dialog",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "alert-dialog",
		dependencies: "@radix-ui/react-alert-dialog lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
