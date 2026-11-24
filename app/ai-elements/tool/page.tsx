"use client";

import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Tool,
	ToolContent,
	ToolHeader,
	ToolInput,
	ToolOutput,
	type ToolState,
} from "@/registry/optics/ai-elements/tool";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/tool.json";
import componentCode from "@/registry/optics/dist/ai-elements/tool.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/tool.tsx",
		code: componentCode,
	},
];

const LIFECYCLE_STATES = [
	"input-streaming",
	"approval-requested",
	"output-available",
	"output-error",
] as const satisfies readonly ToolState[];

type LifecycleState = (typeof LIFECYCLE_STATES)[number];

interface LifecyclePayload {
	input: unknown;
	output?: string;
	errorText?: string;
}

const LIFECYCLE_DATA: Record<LifecycleState, LifecyclePayload> = {
	"input-streaming": {
		input: '{\n  "command": "bun run db:migrate",\n  "environment": "staging',
	},
	"approval-requested": {
		input: { command: "bun run db:migrate", environment: "staging", dryRun: false },
	},
	"output-available": {
		input: { command: "bun run db:migrate", environment: "staging", dryRun: false },
		output: JSON.stringify({ appliedMigrations: 2, durationMs: 318, status: "healthy" }, null, 2),
	},
	"output-error": {
		input: { command: "bun run db:migrate", environment: "staging", dryRun: false },
		errorText: 'MigrationError: relation "sessions" already exists (code 42P07)',
	},
};

function ToolDemo() {
	const [lifecycleState, setLifecycleState] = useState<LifecycleState>("input-streaming");
	const activePayload = LIFECYCLE_DATA[lifecycleState];

	function handleAdvanceState() {
		setLifecycleState((prev) => {
			const currentIndex = LIFECYCLE_STATES.indexOf(prev);
			return LIFECYCLE_STATES[(currentIndex + 1) % LIFECYCLE_STATES.length];
		});
	}

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex flex-wrap items-center gap-1.5">
					{LIFECYCLE_STATES.map((stateOption) => (
						<Button
							key={stateOption}
							type="button"
							size="xs"
							variant={lifecycleState === stateOption ? "default" : "outline"}
							onClick={() => setLifecycleState(stateOption)}
						>
							{stateOption}
						</Button>
					))}
				</div>
				<Button type="button" size="xs" variant="outline" onClick={handleAdvanceState}>
					Next state
				</Button>
			</div>

			<div className="flex flex-col gap-3 rounded-xl border bg-background p-4">
				<Tool defaultOpen>
					<ToolHeader name="run_migration" state={lifecycleState} />
					<ToolContent>
						<ToolInput input={activePayload.input} />
						<ToolOutput output={activePayload.output} errorText={activePayload.errorText} />
					</ToolContent>
				</Tool>

				<div className="flex flex-col gap-2 border-t pt-3">
					<Tool>
						<ToolHeader name="search_docs" state="input-available" />
						<ToolContent>
							<ToolInput input={{ query: "trace collapsible slots", limit: 5 }} />
						</ToolContent>
					</Tool>

					<Tool>
						<ToolHeader name="read_file" state="output-available" />
						<ToolContent>
							<ToolInput input={{ path: "registry/optics/ai-elements/tool.tsx" }} />
							<ToolOutput output={JSON.stringify({ lines: 276, exports: 5 }, null, 2)} />
						</ToolContent>
					</Tool>

					<Tool>
						<ToolHeader name="fetch_schema" state="output-error" />
						<ToolContent>
							<ToolInput input={{ endpoint: "https://api.internal.local/schema.json" }} />
							<ToolOutput errorText="Request timed out after 5000ms (ETIMEDOUT)" />
						</ToolContent>
					</Tool>
				</div>
			</div>
		</div>
	);
}

ToolDemo.displayName = "ToolDemo";

const demoImportsAndSetup = `import { useState } from "react";
import {
	Tool,
	ToolContent,
	ToolHeader,
	ToolInput,
	ToolOutput,
	type ToolState,
} from "@/components/optics/ai-elements/tool";
import { Button } from "@/components/optics/button";

const LIFECYCLE_STATES = [
	"input-streaming",
	"approval-requested",
	"output-available",
	"output-error",
] as const satisfies readonly ToolState[];

type LifecycleState = (typeof LIFECYCLE_STATES)[number];

interface LifecyclePayload {
	input: unknown;
	output?: string;
	errorText?: string;
}

const LIFECYCLE_DATA: Record<LifecycleState, LifecyclePayload> = {
	"input-streaming": {
		input: '{\\n  "command": "bun run db:migrate",\\n  "environment": "staging',
	},
	"approval-requested": {
		input: { command: "bun run db:migrate", environment: "staging", dryRun: false },
	},
	"output-available": {
		input: { command: "bun run db:migrate", environment: "staging", dryRun: false },
		output: JSON.stringify(
			{ appliedMigrations: 2, durationMs: 318, status: "healthy" },
			null,
			2,
		),
	},
	"output-error": {
		input: { command: "bun run db:migrate", environment: "staging", dryRun: false },
		errorText: 'MigrationError: relation "sessions" already exists (code 42P07)',
	},
};

function ToolDemo() {
	const [lifecycleState, setLifecycleState] = useState<LifecycleState>("input-streaming");
	const activePayload = LIFECYCLE_DATA[lifecycleState];

	function handleAdvanceState() {
		setLifecycleState((prev) => {
			const currentIndex = LIFECYCLE_STATES.indexOf(prev);
			return LIFECYCLE_STATES[(currentIndex + 1) % LIFECYCLE_STATES.length];
		});
	}

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex flex-wrap items-center gap-1.5">
					{LIFECYCLE_STATES.map((stateOption) => (
						<Button
							key={stateOption}
							type="button"
							size="xs"
							variant={lifecycleState === stateOption ? "default" : "outline"}
							onClick={() => setLifecycleState(stateOption)}
						>
							{stateOption}
						</Button>
					))}
				</div>
				<Button type="button" size="xs" variant="outline" onClick={handleAdvanceState}>
					Next state
				</Button>
			</div>

			<div className="flex flex-col gap-3 rounded-xl border bg-background p-4">
				<Tool defaultOpen>
					<ToolHeader name="run_migration" state={lifecycleState} />
					<ToolContent>
						<ToolInput input={activePayload.input} />
						<ToolOutput output={activePayload.output} errorText={activePayload.errorText} />
					</ToolContent>
				</Tool>

				<div className="flex flex-col gap-2 border-t pt-3">
					<Tool>
						<ToolHeader name="search_docs" state="input-available" />
						<ToolContent>
							<ToolInput input={{ query: "trace collapsible slots", limit: 5 }} />
						</ToolContent>
					</Tool>

					<Tool>
						<ToolHeader name="read_file" state="output-available" />
						<ToolContent>
							<ToolInput input={{ path: "registry/optics/ai-elements/tool.tsx" }} />
							<ToolOutput
								output={JSON.stringify({ lines: 276, exports: 5 }, null, 2)}
							/>
						</ToolContent>
					</Tool>

					<Tool>
						<ToolHeader name="fetch_schema" state="output-error" />
						<ToolContent>
							<ToolInput input={{ endpoint: "https://api.internal.local/schema.json" }} />
							<ToolOutput errorText="Request timed out after 5000ms (ETIMEDOUT)" />
						</ToolContent>
					</Tool>
				</div>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Tool",
		description:
			"Displays an agent tool invocation lifecycle across streaming, approval, output, and error states.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/tool",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <ToolDemo />,
		imports: demoImportsAndSetup,
		filename: "tool.tsx",
	},
	installation: {
		componentName: "ai-tool",
		dependencies: "lucide-react clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
