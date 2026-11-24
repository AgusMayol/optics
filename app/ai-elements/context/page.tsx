"use client";
import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Context,
	ContextContent,
	ContextContentBody,
	ContextContentFooter,
	ContextContentHeader,
	ContextTrigger,
	ContextUsageRow,
	type ContextUsage,
} from "@/registry/optics/ai-elements/context";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/context.json";
import componentCode from "@/registry/optics/dist/ai-elements/context.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/context.tsx",
		code: componentCode,
	},
];

type PresetId = "24" | "68" | "94";

interface ContextPreset {
	id: PresetId;
	label: string;
	usedTokens: number;
	usage: ContextUsage;
	costs: {
		input: string;
		cache: string;
		reasoning: string;
		output: string;
	};
}

const MAX_TOKENS = 200_000;

const PRESETS: ContextPreset[] = [
	{
		id: "24",
		label: "24%",
		usedTokens: 48_000,
		usage: {
			inputTokens: 32_400,
			cachedInputTokens: 8_200,
			reasoningTokens: 3_800,
			outputTokens: 3_600,
			totalTokens: 48_000,
		},
		costs: {
			input: "$0.10",
			cache: "$0.01",
			reasoning: "$0.06",
			output: "$0.05",
		},
	},
	{
		id: "68",
		label: "68%",
		usedTokens: 136_000,
		usage: {
			inputTokens: 84_500,
			cachedInputTokens: 28_000,
			reasoningTokens: 11_500,
			outputTokens: 12_000,
			totalTokens: 136_000,
		},
		costs: {
			input: "$0.25",
			cache: "$0.02",
			reasoning: "$0.17",
			output: "$0.18",
		},
	},
	{
		id: "94",
		label: "94%",
		usedTokens: 188_000,
		usage: {
			inputTokens: 112_000,
			cachedInputTokens: 42_000,
			reasoningTokens: 18_000,
			outputTokens: 16_000,
			totalTokens: 188_000,
		},
		costs: {
			input: "$0.34",
			cache: "$0.03",
			reasoning: "$0.27",
			output: "$0.24",
		},
	},
];

function ContextDemo() {
	const [selectedId, setSelectedId] = useState<PresetId>("24");
	const activePreset = PRESETS.find((preset) => preset.id === selectedId) ?? PRESETS[0];

	return (
		<div className="flex flex-col items-center gap-4">
			<Context
				usedTokens={activePreset.usedTokens}
				maxTokens={MAX_TOKENS}
				usage={activePreset.usage}
				modelId="claude-sonnet-4-5"
			>
				<ContextTrigger />
				<ContextContent>
					<ContextContentHeader />
					<ContextContentBody>
						<ContextUsageRow kind="input" costText={activePreset.costs.input} />
						<ContextUsageRow kind="cache" costText={activePreset.costs.cache} />
						<ContextUsageRow kind="reasoning" costText={activePreset.costs.reasoning} />
						<ContextUsageRow kind="output" costText={activePreset.costs.output} />
					</ContextContentBody>
					<ContextContentFooter />
				</ContextContent>
			</Context>
			<div className="flex items-center gap-2">
				{PRESETS.map((preset) => (
					<Button
						key={preset.id}
						type="button"
						size="sm"
						variant={selectedId === preset.id ? "default" : "outline"}
						onClick={() => setSelectedId(preset.id)}
					>
						{preset.label}
					</Button>
				))}
			</div>
			<p className="text-xs text-muted-foreground">
				Hover the ring gauge to inspect the token breakdown.
			</p>
		</div>
	);
}

ContextDemo.displayName = "ContextDemo";

const demoImportsAndSetup = `import { useState } from "react";
import {
	Context,
	ContextContent,
	ContextContentBody,
	ContextContentFooter,
	ContextContentHeader,
	ContextTrigger,
	ContextUsageRow,
	type ContextUsage,
} from "@/components/optics/ai-elements/context";
import { Button } from "@/components/optics/button";

type PresetId = "24" | "68" | "94";

interface ContextPreset {
	id: PresetId;
	label: string;
	usedTokens: number;
	usage: ContextUsage;
	costs: {
		input: string;
		cache: string;
		reasoning: string;
		output: string;
	};
}

const MAX_TOKENS = 200_000;

const PRESETS: ContextPreset[] = [
	{
		id: "24",
		label: "24%",
		usedTokens: 48_000,
		usage: {
			inputTokens: 32_400,
			cachedInputTokens: 8_200,
			reasoningTokens: 3_800,
			outputTokens: 3_600,
			totalTokens: 48_000,
		},
		costs: { input: "$0.10", cache: "$0.01", reasoning: "$0.06", output: "$0.05" },
	},
	{
		id: "68",
		label: "68%",
		usedTokens: 136_000,
		usage: {
			inputTokens: 84_500,
			cachedInputTokens: 28_000,
			reasoningTokens: 11_500,
			outputTokens: 12_000,
			totalTokens: 136_000,
		},
		costs: { input: "$0.25", cache: "$0.02", reasoning: "$0.17", output: "$0.18" },
	},
	{
		id: "94",
		label: "94%",
		usedTokens: 188_000,
		usage: {
			inputTokens: 112_000,
			cachedInputTokens: 42_000,
			reasoningTokens: 18_000,
			outputTokens: 16_000,
			totalTokens: 188_000,
		},
		costs: { input: "$0.34", cache: "$0.03", reasoning: "$0.27", output: "$0.24" },
	},
];

function ContextDemo() {
	const [selectedId, setSelectedId] = useState<PresetId>("24");
	const activePreset = PRESETS.find((preset) => preset.id === selectedId) ?? PRESETS[0];

	return (
		<div className="flex flex-col items-center gap-4">
			<Context
				usedTokens={activePreset.usedTokens}
				maxTokens={MAX_TOKENS}
				usage={activePreset.usage}
				modelId="claude-sonnet-4-5"
			>
				<ContextTrigger />
				<ContextContent>
					<ContextContentHeader />
					<ContextContentBody>
						<ContextUsageRow kind="input" costText={activePreset.costs.input} />
						<ContextUsageRow kind="cache" costText={activePreset.costs.cache} />
						<ContextUsageRow kind="reasoning" costText={activePreset.costs.reasoning} />
						<ContextUsageRow kind="output" costText={activePreset.costs.output} />
					</ContextContentBody>
					<ContextContentFooter />
				</ContextContent>
			</Context>
			<div className="flex items-center gap-2">
				{PRESETS.map((preset) => (
					<Button
						key={preset.id}
						type="button"
						size="sm"
						variant={selectedId === preset.id ? "default" : "outline"}
						onClick={() => setSelectedId(preset.id)}
					>
						{preset.label}
					</Button>
				))}
			</div>
			<p className="text-xs text-muted-foreground">
				Hover the ring gauge to inspect the token breakdown.
			</p>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Context",
		description:
			"Displays token context window utilization with a circular gauge and breakdown hover card.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/context",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <ContextDemo />,
		imports: demoImportsAndSetup,
		filename: "context.tsx",
	},
	installation: {
		componentName: "ai-context",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
