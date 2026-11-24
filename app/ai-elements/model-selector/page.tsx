"use client";
import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	type EffortOption,
	ModelEffortMenu,
	type ModelProvider,
	ModelSelector,
	ModelSelectorComposer,
	ModelSelectorMenu,
	type ModelSelectorSubmitPayload,
} from "@/registry/optics/ai-elements/model-selector";
import generatedProps from "@/registry/optics/dist/ai-elements/model-selector.json";
import componentCode from "@/registry/optics/dist/ai-elements/model-selector.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/model-selector.tsx",
		code: componentCode,
	},
];

const PROVIDERS: ModelProvider[] = [
	{
		name: "OpenAI",
		models: [
			{ id: "gpt-5", name: "GPT-5", description: "Flagship coding & reasoning" },
			{ id: "gpt-5-mini", name: "GPT-5 mini", description: "Fast everyday edits" },
		],
	},
	{
		name: "Anthropic",
		models: [
			{ id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5", description: "Balanced speed & depth" },
			{ id: "claude-opus-4-1", name: "Claude Opus 4.1", description: "Deep multi-file refactors" },
		],
	},
	{
		name: "Google",
		models: [
			{ id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", description: "Long-context analysis" },
			{ id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", description: "Low-latency execution" },
		],
	},
];

const EFFORTS: EffortOption[] = [
	{ id: "low", name: "Low", description: "Fast responses" },
	{ id: "medium", name: "Medium", description: "Balanced depth" },
	{ id: "high", name: "High", description: "Extended thinking" },
];

function ModelSelectorDemo() {
	const [model, setModel] = useState("gpt-5");
	const [effort, setEffort] = useState("medium");
	const [lastSubmission, setLastSubmission] = useState<ModelSelectorSubmitPayload | null>(null);

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<ModelSelector
				providers={PROVIDERS}
				efforts={EFFORTS}
				model={model}
				onModelChange={setModel}
				effort={effort}
				onEffortChange={setEffort}
				className="gap-3"
			>
				<div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2">
					<span className="text-xs font-medium text-muted-foreground">Active defaults</span>
					<div className="flex items-center gap-1.5">
						<ModelSelectorMenu size="xs" />
						<ModelEffortMenu size="xs" />
					</div>
				</div>

				<ModelSelectorComposer
					defaultValue="Audit the FileTree component for keyboard focus handling."
					onSubmit={(payload) => setLastSubmission(payload)}
				/>
			</ModelSelector>

			<div className="rounded-lg border bg-card px-3 py-2.5 text-xs">
				{lastSubmission ? (
					<div className="flex flex-col gap-1">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<span className="font-medium text-foreground">Submitted payload</span>
							<span className="font-mono text-muted-foreground">
								{lastSubmission.model} · {lastSubmission.effort}
							</span>
						</div>
						<p className="text-muted-foreground">{lastSubmission.text}</p>
					</div>
				) : (
					<div className="flex flex-wrap items-center justify-between gap-2 text-muted-foreground">
						<span>Ready to submit</span>
						<span className="font-mono">
							{model} · {effort}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}

ModelSelectorDemo.displayName = "ModelSelectorDemo";

const demoImportsAndSetup = `import { useState } from "react";
import {
	type EffortOption,
	ModelEffortMenu,
	type ModelProvider,
	ModelSelector,
	ModelSelectorComposer,
	ModelSelectorMenu,
	type ModelSelectorSubmitPayload,
} from "@/components/optics/ai-elements/model-selector";

const PROVIDERS: ModelProvider[] = [
	{
		name: "OpenAI",
		models: [
			{ id: "gpt-5", name: "GPT-5", description: "Flagship coding & reasoning" },
			{ id: "gpt-5-mini", name: "GPT-5 mini", description: "Fast everyday edits" },
		],
	},
	{
		name: "Anthropic",
		models: [
			{ id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5", description: "Balanced speed & depth" },
			{ id: "claude-opus-4-1", name: "Claude Opus 4.1", description: "Deep multi-file refactors" },
		],
	},
	{
		name: "Google",
		models: [
			{ id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", description: "Long-context analysis" },
			{ id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", description: "Low-latency execution" },
		],
	},
];

const EFFORTS: EffortOption[] = [
	{ id: "low", name: "Low", description: "Fast responses" },
	{ id: "medium", name: "Medium", description: "Balanced depth" },
	{ id: "high", name: "High", description: "Extended thinking" },
];

function ModelSelectorDemo() {
	const [model, setModel] = useState("gpt-5");
	const [effort, setEffort] = useState("medium");
	const [lastSubmission, setLastSubmission] = useState<ModelSelectorSubmitPayload | null>(null);

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<ModelSelector
				providers={PROVIDERS}
				efforts={EFFORTS}
				model={model}
				onModelChange={setModel}
				effort={effort}
				onEffortChange={setEffort}
				className="gap-3"
			>
				<div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2">
					<span className="text-xs font-medium text-muted-foreground">Active defaults</span>
					<div className="flex items-center gap-1.5">
						<ModelSelectorMenu size="xs" />
						<ModelEffortMenu size="xs" />
					</div>
				</div>

				<ModelSelectorComposer
					defaultValue="Audit the FileTree component for keyboard focus handling."
					onSubmit={(payload) => setLastSubmission(payload)}
				/>
			</ModelSelector>

			<div className="rounded-lg border bg-card px-3 py-2.5 text-xs">
				{lastSubmission ? (
					<div className="flex flex-col gap-1">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<span className="font-medium text-foreground">Submitted payload</span>
							<span className="font-mono text-muted-foreground">
								{lastSubmission.model} · {lastSubmission.effort}
							</span>
						</div>
						<p className="text-muted-foreground">{lastSubmission.text}</p>
					</div>
				) : (
					<div className="flex flex-wrap items-center justify-between gap-2 text-muted-foreground">
						<span>Ready to submit</span>
						<span className="font-mono">
							{model} · {effort}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Model Selector",
		description:
			"Grouped model and reasoning-effort selector menus with integrated prompt composer.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/model-selector",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <ModelSelectorDemo />,
		imports: demoImportsAndSetup,
		filename: "model-selector.tsx",
	},
	installation: {
		componentName: "ai-model-selector",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
