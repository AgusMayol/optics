"use client";

import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import { cn } from "@/lib/utils";
import {
	StackTrace,
	StackTraceActions,
	StackTraceContent,
	StackTraceCopyButton,
	StackTraceError,
	StackTraceErrorMessage,
	StackTraceErrorType,
	StackTraceFrame,
	StackTraceFrames,
	StackTraceHeader,
} from "@/registry/optics/ai-elements/stack-trace";
import generatedProps from "@/registry/optics/dist/ai-elements/stack-trace.json";
import componentCode from "@/registry/optics/dist/ai-elements/stack-trace.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/stack-trace.tsx",
		code: componentCode,
	},
];

interface TraceFrameEntry {
	functionName: string;
	filePath: string;
	lineNumber: number;
	columnNumber: number;
	isInternal: boolean;
}

const ERROR_HEADER = "ToolExecutionError: Failed to parse JSON output from read_file";

const SAMPLE_FRAMES: readonly TraceFrameEntry[] = [
	{
		functionName: "parseToolResponse",
		filePath: "lib/agent/tool-runner.ts",
		lineNumber: 84,
		columnNumber: 17,
		isInternal: false,
	},
	{
		functionName: "executeStep",
		filePath: "app/api/agent/route.ts",
		lineNumber: 42,
		columnNumber: 11,
		isInternal: false,
	},
	{
		functionName: "processToolStream",
		filePath: "node_modules/@ai-sdk/core/dist/runtime.js",
		lineNumber: 319,
		columnNumber: 24,
		isInternal: true,
	},
	{
		functionName: "runAsync",
		filePath: "node:internal/process/task_queues",
		lineNumber: 95,
		columnNumber: 5,
		isInternal: true,
	},
];

const SAMPLE_TRACE = [
	ERROR_HEADER,
	...SAMPLE_FRAMES.map(
		(frame) =>
			`    at ${frame.functionName} (${frame.filePath}:${frame.lineNumber}:${frame.columnNumber})`,
	),
].join("\n");

function StackTraceDemo() {
	const [activeFrameIndex, setActiveFrameIndex] = useState(0);
	const activeFrame = SAMPLE_FRAMES[activeFrameIndex] ?? SAMPLE_FRAMES[0];

	return (
		<div className="flex w-full max-w-xl flex-col gap-3 rounded-xl border bg-card p-4">
			<StackTrace trace={SAMPLE_TRACE} defaultOpen>
				<StackTraceHeader>
					<StackTraceError>
						<StackTraceErrorType />
						<StackTraceErrorMessage />
					</StackTraceError>
					<StackTraceActions>
						<StackTraceCopyButton />
					</StackTraceActions>
				</StackTraceHeader>
				<StackTraceContent>
					<StackTraceFrames>
						<pre className="mb-2 font-mono text-xs break-words whitespace-pre-wrap text-destructive">
							<code>{ERROR_HEADER}</code>
						</pre>
						<ol className="flex flex-col gap-1 font-mono text-xs">
							{SAMPLE_FRAMES.map((frame, index) => (
								<StackTraceFrame
									key={`${frame.filePath}:${frame.lineNumber}`}
									filePath={frame.filePath}
									lineNumber={frame.lineNumber}
									columnNumber={frame.columnNumber}
									functionName={frame.functionName}
									isInternal={frame.isInternal}
									onSelectFrame={() => setActiveFrameIndex(index)}
									className={cn(
										"rounded-sm px-1.5 py-0.5 transition-colors",
										activeFrameIndex === index && "bg-primary/10 text-foreground font-medium",
									)}
								/>
							))}
						</ol>
					</StackTraceFrames>
				</StackTraceContent>
			</StackTrace>

			<div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2 font-mono text-xs text-muted-foreground">
				<span>Selected frame</span>
				<span className="text-foreground">
					{activeFrame.functionName} ({activeFrame.filePath}:{activeFrame.lineNumber}:
					{activeFrame.columnNumber})
				</span>
			</div>
		</div>
	);
}

StackTraceDemo.displayName = "StackTraceDemo";

const demoImports = `import { useState } from "react";
import {
	StackTrace,
	StackTraceActions,
	StackTraceContent,
	StackTraceCopyButton,
	StackTraceError,
	StackTraceErrorMessage,
	StackTraceErrorType,
	StackTraceFrame,
	StackTraceFrames,
	StackTraceHeader,
} from "@/components/optics/ai-elements/stack-trace";
import { cn } from "@/lib/utils";

interface TraceFrameEntry {
	functionName: string;
	filePath: string;
	lineNumber: number;
	columnNumber: number;
	isInternal: boolean;
}

const ERROR_HEADER = "ToolExecutionError: Failed to parse JSON output from read_file";

const SAMPLE_FRAMES: readonly TraceFrameEntry[] = [
	{
		functionName: "parseToolResponse",
		filePath: "lib/agent/tool-runner.ts",
		lineNumber: 84,
		columnNumber: 17,
		isInternal: false,
	},
	{
		functionName: "executeStep",
		filePath: "app/api/agent/route.ts",
		lineNumber: 42,
		columnNumber: 11,
		isInternal: false,
	},
	{
		functionName: "processToolStream",
		filePath: "node_modules/@ai-sdk/core/dist/runtime.js",
		lineNumber: 319,
		columnNumber: 24,
		isInternal: true,
	},
	{
		functionName: "runAsync",
		filePath: "node:internal/process/task_queues",
		lineNumber: 95,
		columnNumber: 5,
		isInternal: true,
	},
];

const SAMPLE_TRACE = [
	ERROR_HEADER,
	...SAMPLE_FRAMES.map(
		(frame) =>
			\`    at \${frame.functionName} (\${frame.filePath}:\${frame.lineNumber}:\${frame.columnNumber})\`,
	),
].join("\\n");

function StackTraceDemo() {
	const [activeFrameIndex, setActiveFrameIndex] = useState(0);
	const activeFrame = SAMPLE_FRAMES[activeFrameIndex] ?? SAMPLE_FRAMES[0];

	return (
		<div className="flex w-full max-w-xl flex-col gap-3 rounded-xl border bg-card p-4">
			<StackTrace trace={SAMPLE_TRACE} defaultOpen>
				<StackTraceHeader>
					<StackTraceError>
						<StackTraceErrorType />
						<StackTraceErrorMessage />
					</StackTraceError>
					<StackTraceActions>
						<StackTraceCopyButton />
					</StackTraceActions>
				</StackTraceHeader>
				<StackTraceContent>
					<StackTraceFrames>
						<pre className="mb-2 font-mono text-xs break-words whitespace-pre-wrap text-destructive">
							<code>{ERROR_HEADER}</code>
						</pre>
						<ol className="flex flex-col gap-1 font-mono text-xs">
							{SAMPLE_FRAMES.map((frame, index) => (
								<StackTraceFrame
									key={\`\${frame.filePath}:\${frame.lineNumber}\`}
									filePath={frame.filePath}
									lineNumber={frame.lineNumber}
									columnNumber={frame.columnNumber}
									functionName={frame.functionName}
									isInternal={frame.isInternal}
									onSelectFrame={() => setActiveFrameIndex(index)}
									className={cn(
										"rounded-sm px-1.5 py-0.5 transition-colors",
										activeFrameIndex === index && "bg-primary/10 text-foreground font-medium",
									)}
								/>
							))}
						</ol>
					</StackTraceFrames>
				</StackTraceContent>
			</StackTrace>

			<div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2 font-mono text-xs text-muted-foreground">
				<span>Selected frame</span>
				<span className="text-foreground">
					{activeFrame.functionName} ({activeFrame.filePath}:{activeFrame.lineNumber}:
					{activeFrame.columnNumber})
				</span>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Stack Trace",
		description:
			"Expandable error frame viewer with copy controls and selectable stack frame lines.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/stack-trace",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <StackTraceDemo />,
		imports: demoImports,
		filename: "stack-trace.tsx",
	},
	installation: {
		componentName: "ai-stack-trace",
		dependencies: "lucide-react clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
