"use client";
import { CheckIcon, CircleDotIcon, Loader2Icon } from "lucide-react";
import type { ManualFile } from "@/components/installation-guide";
import generatedProps from "@/registry/optics/dist/trace.json";
import componentCode from "@/registry/optics/dist/trace.tsx.txt";
import {
	Trace,
	TraceCollapsible,
	TraceCollapsibleContent,
	TraceCollapsibleTrigger,
	TraceDescription,
	TraceIcon,
	TraceLine,
	TraceTitle,
} from "@/registry/optics/trace";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/trace.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<Trace className="w-full max-w-md">
		<TraceCollapsible defaultOpen>
			<TraceCollapsibleTrigger>
				<TraceLine>
					<TraceIcon>
						<CheckIcon className="text-emerald-600 dark:text-emerald-400" />
					</TraceIcon>
					<TraceTitle>Resolved workspace dependencies</TraceTitle>
					<TraceDescription>142ms</TraceDescription>
				</TraceLine>
			</TraceCollapsibleTrigger>
			<TraceCollapsibleContent>
				<p className="text-sm">
					Verified lockfile integrity and linked 18 local packages across the workspace.
				</p>
			</TraceCollapsibleContent>
		</TraceCollapsible>
		<TraceCollapsible>
			<TraceCollapsibleTrigger>
				<TraceLine>
					<TraceIcon>
						<CheckIcon className="text-emerald-600 dark:text-emerald-400" />
					</TraceIcon>
					<TraceTitle>Compiled TypeScript modules</TraceTitle>
					<TraceDescription>680ms</TraceDescription>
				</TraceLine>
			</TraceCollapsibleTrigger>
			<TraceCollapsibleContent>
				<p className="text-sm">
					Generated type declarations and validated strict compiler checks with zero errors.
				</p>
			</TraceCollapsibleContent>
		</TraceCollapsible>
		<TraceCollapsible>
			<TraceCollapsibleTrigger>
				<TraceLine status="running">
					<TraceIcon>
						<Loader2Icon className="animate-spin" />
					</TraceIcon>
					<TraceTitle>Running integration test suite</TraceTitle>
					<TraceDescription>1.2s</TraceDescription>
				</TraceLine>
			</TraceCollapsibleTrigger>
			<TraceCollapsibleContent>
				<p className="text-sm">
					Executing end-to-end assertions across component routes and handlers.
				</p>
			</TraceCollapsibleContent>
		</TraceCollapsible>
		<TraceLine status="pending">
			<TraceIcon>
				<CircleDotIcon />
			</TraceIcon>
			<TraceTitle>Publish production bundle</TraceTitle>
			<TraceDescription>Queued</TraceDescription>
		</TraceLine>
	</Trace>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Trace",
		description:
			"Displays step-by-step execution traces with status icons and collapsible details.",
		href: "https://ui.shadcn.com/docs/components/trace",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceDescription, TraceIcon, TraceLine, TraceTitle } from "@/components/optics/trace";
import { CheckIcon, CircleDotIcon, Loader2Icon } from "lucide-react";`,
		filename: "trace.tsx",
	},
	installation: {
		componentName: "trace",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
