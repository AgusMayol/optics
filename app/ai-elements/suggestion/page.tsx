"use client";

import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	PromptInput,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputToolbar,
	PromptInputTools,
} from "@/registry/optics/ai-elements/prompt-input";
import { Suggestion, Suggestions } from "@/registry/optics/ai-elements/suggestion";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/suggestion.json";
import componentCode from "@/registry/optics/dist/ai-elements/suggestion.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/suggestion.tsx",
		code: componentCode,
	},
];

const SUGGESTIONS = [
	"Explain the auth middleware flow",
	"Write unit tests for rate limiting",
	"Find unused exports in components",
	"Optimize database query latency",
	"Add keyboard navigation to menu",
	"Summarize recent PR feedback",
];

function SuggestionDemo() {
	const [prompt, setPrompt] = useState("");
	const [submitted, setSubmitted] = useState<string[]>([]);

	function handleSubmit(text: string) {
		setSubmitted((prev) => [...prev, text]);
		setPrompt("");
	}

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			{submitted.length > 0 ? (
				<div className="flex flex-col gap-2 rounded-xl border bg-background p-3">
					<div className="flex items-center justify-between gap-2">
						<span className="text-xs font-medium text-muted-foreground">Submitted prompts</span>
						<Button type="button" size="xs" variant="ghost" onClick={() => setSubmitted([])}>
							Clear
						</Button>
					</div>
					<div className="flex flex-col gap-1.5">
						{submitted.map((entry, index) => (
							<div
								key={`${index}-${entry}`}
								className="rounded-lg bg-muted/60 px-3 py-2 text-xs text-foreground"
							>
								{entry}
							</div>
						))}
					</div>
				</div>
			) : null}

			<Suggestions>
				{SUGGESTIONS.map((item) => (
					<Suggestion
						key={item}
						suggestion={item}
						variant={prompt === item ? "secondary" : "outline"}
						onSelect={setPrompt}
					/>
				))}
			</Suggestions>

			<PromptInput
				value={prompt}
				onValueChange={setPrompt}
				onSubmitMessage={handleSubmit}
				inputGroupClassName="rounded-xl bg-background dark:bg-background"
			>
				<PromptInputTextarea placeholder="Ask anything or pick a suggestion above..." />
				<PromptInputToolbar>
					<PromptInputTools>
						<span className="px-2 text-xs text-muted-foreground">
							{prompt.trim().length > 0
								? "Press Enter or click Send to submit"
								: "Click a suggestion to populate"}
						</span>
					</PromptInputTools>
					<PromptInputSubmit disabled={prompt.trim().length === 0} />
				</PromptInputToolbar>
			</PromptInput>
		</div>
	);
}

SuggestionDemo.displayName = "SuggestionDemo";

const demoImportsAndSetup = `import { useState } from "react";
import {
	PromptInput,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputToolbar,
	PromptInputTools,
} from "@/components/optics/ai-elements/prompt-input";
import { Suggestion, Suggestions } from "@/components/optics/ai-elements/suggestion";
import { Button } from "@/components/optics/button";

const SUGGESTIONS = [
	"Explain the auth middleware flow",
	"Write unit tests for rate limiting",
	"Find unused exports in components",
	"Optimize database query latency",
	"Add keyboard navigation to menu",
	"Summarize recent PR feedback",
];

function SuggestionDemo() {
	const [prompt, setPrompt] = useState("");
	const [submitted, setSubmitted] = useState<string[]>([]);

	function handleSubmit(text: string) {
		setSubmitted((prev) => [...prev, text]);
		setPrompt("");
	}

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			{submitted.length > 0 ? (
				<div className="flex flex-col gap-2 rounded-xl border bg-background p-3">
					<div className="flex items-center justify-between gap-2">
						<span className="text-xs font-medium text-muted-foreground">Submitted prompts</span>
						<Button type="button" size="xs" variant="ghost" onClick={() => setSubmitted([])}>
							Clear
						</Button>
					</div>
					<div className="flex flex-col gap-1.5">
						{submitted.map((entry, index) => (
							<div
								key={\`\${index}-\${entry}\`}
								className="rounded-lg bg-muted/60 px-3 py-2 text-xs text-foreground"
							>
								{entry}
							</div>
						))}
					</div>
				</div>
			) : null}

			<Suggestions>
				{SUGGESTIONS.map((item) => (
					<Suggestion
						key={item}
						suggestion={item}
						variant={prompt === item ? "secondary" : "outline"}
						onSelect={setPrompt}
					/>
				))}
			</Suggestions>

			<PromptInput
				value={prompt}
				onValueChange={setPrompt}
				onSubmitMessage={handleSubmit}
				inputGroupClassName="rounded-xl bg-background dark:bg-background"
			>
				<PromptInputTextarea placeholder="Ask anything or pick a suggestion above..." />
				<PromptInputToolbar>
					<PromptInputTools>
						<span className="px-2 text-xs text-muted-foreground">
							{prompt.trim().length > 0
								? "Press Enter or click Send to submit"
								: "Click a suggestion to populate"}
						</span>
					</PromptInputTools>
					<PromptInputSubmit disabled={prompt.trim().length === 0} />
				</PromptInputToolbar>
			</PromptInput>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Suggestion",
		description: "Horizontal scrollable row of one-click prompt suggestions for the user.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/suggestion",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <SuggestionDemo />,
		imports: demoImportsAndSetup,
		filename: "suggestion.tsx",
	},
	installation: {
		componentName: "ai-suggestion",
		dependencies: "clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
