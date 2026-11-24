"use client";
import type { ManualFile } from "@/components/installation-guide";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/toast.json";
import componentCode from "@/registry/optics/dist/toast.tsx.txt";
import { Toaster, toast } from "@/registry/optics/toast";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/toast.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex flex-wrap items-center justify-center gap-4">
		<Button
			variant="outline"
			onClick={() =>
				toast.add({
					title: "Event created",
					description: "Monday, January 3rd at 6:00pm",
				})
			}
		>
			Default
		</Button>
		<Button
			variant="success"
			onClick={() =>
				toast.add({
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
				toast.add({
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
				toast.add({
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
				toast.add({
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
				toast.add({
					type: "loading",
					title: "Loading...",
					description: "Syncing your latest changes.",
				})
			}
		>
			Loading
		</Button>
		<Button
			variant="secondary"
			onClick={() =>
				toast.add({
					title: "Message archived",
					description: "Moved to archive folder.",
					actionProps: {
						children: "Undo",
						onClick: () =>
							toast.add({
								type: "info",
								title: "Restored",
								description: "Message returned to inbox.",
							}),
					},
				})
			}
		>
			With Action
		</Button>
	</div>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Toast",
		description: "Accessible notification toast manager, viewport, and dismissible message cards.",
		href: "https://ui.shadcn.com/docs/components/toast",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Toaster, toast } from "@/components/optics/toast";
import { Button } from "@/components/optics/button";`,
		filename: "toast.tsx",
	},
	installation: {
		componentName: "toast",
		dependencies: "@base-ui/react lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return (
		<>
			<ComponentConfig config={componentConfig}>{null}</ComponentConfig>
			<Toaster />
		</>
	);
}
