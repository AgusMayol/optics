"use client";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	ChainOfThought,
	ChainOfThoughtContent,
	ChainOfThoughtHeader,
	ChainOfThoughtSearchResult,
	ChainOfThoughtSearchResults,
	ChainOfThoughtStep,
	type ChainOfThoughtStatus,
} from "@/registry/optics/ai-elements/chain-of-thought";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/chain-of-thought.json";
import componentCode from "@/registry/optics/dist/ai-elements/chain-of-thought.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/chain-of-thought.tsx",
		code: componentCode,
	},
];

interface ResearchStep {
	id: string;
	label: string;
	description: string;
	results?: string[];
}

const RESEARCH_STEPS: ResearchStep[] = [
	{
		id: "search",
		label: "Searching workspace for navigation and layout tokens",
		description: "320ms",
		results: ["app/layout-content.tsx", "app/ai-elements/page.tsx", "registry.json"],
	},
	{
		id: "inspect",
		label: "Reading Trace and Badge primitive contracts",
		description: "480ms",
		results: ["trace.tsx", "badge.tsx"],
	},
	{
		id: "synthesize",
		label: "Mapping interactive step statuses and prop schemas",
		description: "290ms",
	},
	{
		id: "verify",
		label: "Validating strict TypeScript and lint diagnostics",
		description: "210ms",
	},
];

function getStepStatus(index: number, activeStep: number): ChainOfThoughtStatus {
	if (index < activeStep) {
		return "complete";
	}
	if (index === activeStep) {
		return "active";
	}
	return "pending";
}

function ChainOfThoughtDemo() {
	const [traceState, setTraceState] = useState({ activeStep: 1, runId: 0 });
	const isComplete = traceState.activeStep >= RESEARCH_STEPS.length;

	useEffect(() => {
		if (traceState.activeStep >= RESEARCH_STEPS.length) {
			return;
		}
		const timer = setTimeout(() => {
			setTraceState((prev) => ({ ...prev, activeStep: prev.activeStep + 1 }));
		}, 1300);
		return () => clearTimeout(timer);
	}, [traceState.activeStep, traceState.runId]);

	return (
		<div className="flex w-full max-w-lg flex-col gap-4">
			<ChainOfThought defaultOpen className="rounded-xl border bg-background p-4">
				<ChainOfThoughtHeader status={isComplete ? "complete" : "active"}>
					{isComplete ? "Researched in 4 steps" : "Researching implementation..."}
				</ChainOfThoughtHeader>
				<ChainOfThoughtContent>
					{RESEARCH_STEPS.map((step, index) => {
						const status = getStepStatus(index, traceState.activeStep);

						return (
							<ChainOfThoughtStep
								key={step.id}
								label={step.label}
								description={step.description}
								status={status}
							>
								{step.results && status !== "pending" ? (
									<ChainOfThoughtSearchResults>
										{step.results.map((result) => (
											<ChainOfThoughtSearchResult key={result}>{result}</ChainOfThoughtSearchResult>
										))}
									</ChainOfThoughtSearchResults>
								) : null}
							</ChainOfThoughtStep>
						);
					})}
				</ChainOfThoughtContent>
			</ChainOfThought>
			<div className="flex items-center justify-end">
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => setTraceState((prev) => ({ activeStep: 0, runId: prev.runId + 1 }))}
				>
					<RotateCcw />
					Replay
				</Button>
			</div>
		</div>
	);
}

ChainOfThoughtDemo.displayName = "ChainOfThoughtDemo";

const demoImportsAndSetup = `import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import {
	ChainOfThought,
	ChainOfThoughtContent,
	ChainOfThoughtHeader,
	ChainOfThoughtSearchResult,
	ChainOfThoughtSearchResults,
	ChainOfThoughtStep,
	type ChainOfThoughtStatus,
} from "@/components/optics/ai-elements/chain-of-thought";
import { Button } from "@/components/optics/button";

interface ResearchStep {
	id: string;
	label: string;
	description: string;
	results?: string[];
}

const RESEARCH_STEPS: ResearchStep[] = [
	{
		id: "search",
		label: "Searching workspace for navigation and layout tokens",
		description: "320ms",
		results: ["app/layout-content.tsx", "app/ai-elements/page.tsx", "registry.json"],
	},
	{
		id: "inspect",
		label: "Reading Trace and Badge primitive contracts",
		description: "480ms",
		results: ["trace.tsx", "badge.tsx"],
	},
	{
		id: "synthesize",
		label: "Mapping interactive step statuses and prop schemas",
		description: "290ms",
	},
	{
		id: "verify",
		label: "Validating strict TypeScript and lint diagnostics",
		description: "210ms",
	},
];

function getStepStatus(index: number, activeStep: number): ChainOfThoughtStatus {
	if (index < activeStep) {
		return "complete";
	}
	if (index === activeStep) {
		return "active";
	}
	return "pending";
}

function ChainOfThoughtDemo() {
	const [traceState, setTraceState] = useState({ activeStep: 1, runId: 0 });
	const isComplete = traceState.activeStep >= RESEARCH_STEPS.length;

	useEffect(() => {
		if (traceState.activeStep >= RESEARCH_STEPS.length) {
			return;
		}
		const timer = setTimeout(() => {
			setTraceState((prev) => ({ ...prev, activeStep: prev.activeStep + 1 }));
		}, 1300);
		return () => clearTimeout(timer);
	}, [traceState.activeStep, traceState.runId]);

	return (
		<div className="flex w-full max-w-lg flex-col gap-4">
			<ChainOfThought defaultOpen className="rounded-xl border bg-background p-4">
				<ChainOfThoughtHeader status={isComplete ? "complete" : "active"}>
					{isComplete ? "Researched in 4 steps" : "Researching implementation..."}
				</ChainOfThoughtHeader>
				<ChainOfThoughtContent>
					{RESEARCH_STEPS.map((step, index) => {
						const status = getStepStatus(index, traceState.activeStep);

						return (
							<ChainOfThoughtStep
								key={step.id}
								label={step.label}
								description={step.description}
								status={status}
							>
								{step.results && status !== "pending" ? (
									<ChainOfThoughtSearchResults>
										{step.results.map((result) => (
											<ChainOfThoughtSearchResult key={result}>
												{result}
											</ChainOfThoughtSearchResult>
										))}
									</ChainOfThoughtSearchResults>
								) : null}
							</ChainOfThoughtStep>
						);
					})}
				</ChainOfThoughtContent>
			</ChainOfThought>
			<div className="flex items-center justify-end">
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => setTraceState((prev) => ({ activeStep: 0, runId: prev.runId + 1 }))}
				>
					<RotateCcw />
					Replay
				</Button>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Chain of Thought",
		description: "A collapsible reasoning summary expanding into the steps an agent took.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/chain-of-thought",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <ChainOfThoughtDemo />,
		imports: demoImportsAndSetup,
		filename: "chain-of-thought.tsx",
	},
	installation: {
		componentName: "ai-chain-of-thought",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
