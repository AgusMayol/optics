"use client";
import { ComponentConfig } from "../layout";
import { toast, Toaster } from "@/registry/optics/sonner";
import { Button } from "@/registry/optics/button";

import componentCode from "@/registry/optics/dist/sonner.jsx.txt";
import utilsCode from "@/registry/optics/dist/lib/utils.js.txt";

const componentFiles = [
	{
		path: "@/components/optics/sonner.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "sonner.jsx",
		code: `import { toast } from "@/components/optics/sonner";

<Button onClick={() => toast({ type: "success", title: "Success!", description: "Your action was completed." })}>
	Show Toast
</Button>

<Button onClick={() => toast({ 
	type: "promise", 
	promise: fetch("/api/data"),
	loading: "Loading...",
	success: "Data loaded!",
	error: "Failed to load data"
})}>
	Promise Toast
</Button>`,
	},
];

const propsData = [
	{
		component: "toast()",
		props: [
			{
				name: "type",
				type: '"success" | "error" | "info" | "warning" | "promise"',
				description: "Type of toast notification.",
			},
			{
				name: "title",
				type: "string",
				description: "Title text for the toast.",
			},
			{
				name: "description",
				type: "string",
				description: "Description text for the toast.",
			},
			{
				name: "button",
				type: "{ label: string, onClick: () => void }",
				description: "Optional button configuration.",
			},
			{
				name: "promise",
				type: "Promise",
				description: "Promise to track for promise-type toasts.",
			},
			{
				name: "loading",
				type: "string (for promise type)",
				description: "Loading message for promise-type toasts.",
			},
			{
				name: "success",
				type: "string (for promise type)",
				description: "Success message for promise-type toasts.",
			},
			{
				name: "duration",
				type: "number (default: 5500)",
				description:
					"Duration in milliseconds before the toast auto-dismisses.",
			},
		],
	},
];

const demoComponent = (
	<div className="flex flex-wrap items-center justify-center gap-4">
		<Button
			variant="success"
			onClick={() =>
				toast({
					type: "success",
					title: "Success!",
					description: "Your action was completed successfully.",
				})
			}
		>
			Success
		</Button>
		<Button
			variant="destructive"
			onClick={() =>
				toast({
					type: "error",
					title: "Error",
					description: "Something went wrong.",
				})
			}
		>
			Error
		</Button>
		<Button
			variant="info"
			onClick={() =>
				toast({
					type: "info",
					title: "Info",
					description: "Here's some information.",
				})
			}
		>
			Info
		</Button>
		<Button
			variant="warning"
			onClick={() =>
				toast({
					type: "warning",
					title: "Warning",
					description: "Please be careful.",
				})
			}
		>
			Warning
		</Button>
		<Button
			variant="raised"
			onClick={() =>
				toast({
					type: "promise",
					promise: new Promise((resolve) =>
						setTimeout(resolve, 2000),
					),
					loading: "Loading...",
					success: "Done!",
					error: "Failed!",
				})
			}
		>
			Promise
		</Button>
	</div>
);

const componentConfig = {
	header: {
		title: "Sonner",
		description:
			"An opinionated toast component for React. Supports promises, custom styling, and multiple types.",
		href: "https://ui.shadcn.com/docs/components/sonner",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "sonner",
		dependencies: "sonner next-themes lucide-react",
		manualFiles: componentFiles,
	},
	props: propsData,
};

export default function Page() {
	return (
		<>
			<ComponentConfig config={componentConfig}>{null}</ComponentConfig>
			<Toaster />
		</>
	);
}
