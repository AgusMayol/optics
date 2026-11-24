"use client";

import { RotateCcwIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Subagent,
	SubagentContent,
	SubagentHeader,
	SubagentResult,
	type SubagentStatus,
	SubagentToolCall,
} from "@/registry/optics/ai-elements/subagent";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/subagent.json";
import componentCode from "@/registry/optics/dist/ai-elements/subagent.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/subagent.tsx",
		code: componentCode,
	},
];

const STATUS_OPTIONS: { value: SubagentStatus; label: string }[] = [
	{ value: "running", label: "Running" },
	{ value: "completed", label: "Completed" },
	{ value: "error", label: "Error" },
];

function SubagentDemo() {
	const [status, setStatus] = useState<SubagentStatus>("completed");
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	function clearReplayTimer() {
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}

	function handleSelectStatus(nextStatus: SubagentStatus) {
		clearReplayTimer();
		setStatus(nextStatus);
	}

	function handleReplay() {
		clearReplayTimer();
		setStatus("running");
		timerRef.current = setTimeout(() => {
			setStatus("completed");
			timerRef.current = null;
		}, 1200);
	}

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex flex-wrap items-center gap-1.5">
					{STATUS_OPTIONS.map((option) => (
						<Button
							key={option.value}
							type="button"
							size="xs"
							variant={status === option.value ? "default" : "outline"}
							onClick={() => handleSelectStatus(option.value)}
						>
							{option.label}
						</Button>
					))}
				</div>
				<Button type="button" size="xs" variant="outline" onClick={handleReplay}>
					<RotateCcwIcon />
					Replay
				</Button>
			</div>

			<div className="rounded-xl border bg-background p-4">
				<Subagent defaultOpen>
					<SubagentHeader name="Codebase Researcher" role="Explore" status={status} />
					<SubagentContent>
						<SubagentToolCall
							name="search_files"
							status="completed"
							summary="Matched 14 files in components/optics"
						/>
						<SubagentToolCall
							name="read_file"
							status="completed"
							summary="Inspected trace.tsx and badge.tsx"
						/>
						<SubagentToolCall
							name="verify_exports"
							status={status}
							summary={
								status === "running"
									? "Checking barrel exports and prop types..."
									: status === "error"
										? "Type mismatch in SubagentResult props"
										: "All 5 exported symbols verified"
							}
						/>
						<SubagentResult
							className={
								status === "error"
									? "text-destructive"
									: status === "running"
										? "text-muted-foreground"
										: "text-foreground"
							}
						>
							{status === "running"
								? "Streaming tool results from subagent..."
								: status === "error"
									? "Subagent stopped with 1 error while verifying component exports."
									: "Verified trace primitives, collapsible state, and exported TypeScript types."}
						</SubagentResult>
					</SubagentContent>
				</Subagent>
			</div>
		</div>
	);
}

SubagentDemo.displayName = "SubagentDemo";

const demoImportsAndSetup = `import { RotateCcwIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
	Subagent,
	SubagentContent,
	SubagentHeader,
	SubagentResult,
	type SubagentStatus,
	SubagentToolCall,
} from "@/components/optics/ai-elements/subagent";
import { Button } from "@/components/optics/button";

const STATUS_OPTIONS: { value: SubagentStatus; label: string }[] = [
	{ value: "running", label: "Running" },
	{ value: "completed", label: "Completed" },
	{ value: "error", label: "Error" },
];

function SubagentDemo() {
	const [status, setStatus] = useState<SubagentStatus>("completed");
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	function clearReplayTimer() {
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}

	function handleSelectStatus(nextStatus: SubagentStatus) {
		clearReplayTimer();
		setStatus(nextStatus);
	}

	function handleReplay() {
		clearReplayTimer();
		setStatus("running");
		timerRef.current = setTimeout(() => {
			setStatus("completed");
			timerRef.current = null;
		}, 1200);
	}

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex flex-wrap items-center gap-1.5">
					{STATUS_OPTIONS.map((option) => (
						<Button
							key={option.value}
							type="button"
							size="xs"
							variant={status === option.value ? "default" : "outline"}
							onClick={() => handleSelectStatus(option.value)}
						>
							{option.label}
						</Button>
					))}
				</div>
				<Button type="button" size="xs" variant="outline" onClick={handleReplay}>
					<RotateCcwIcon />
					Replay
				</Button>
			</div>

			<div className="rounded-xl border bg-background p-4">
				<Subagent defaultOpen>
					<SubagentHeader name="Codebase Researcher" role="Explore" status={status} />
					<SubagentContent>
						<SubagentToolCall
							name="search_files"
							status="completed"
							summary="Matched 14 files in components/optics"
						/>
						<SubagentToolCall
							name="read_file"
							status="completed"
							summary="Inspected trace.tsx and badge.tsx"
						/>
						<SubagentToolCall
							name="verify_exports"
							status={status}
							summary={
								status === "running"
									? "Checking barrel exports and prop types..."
									: status === "error"
										? "Type mismatch in SubagentResult props"
										: "All 5 exported symbols verified"
							}
						/>
						<SubagentResult
							className={
								status === "error"
									? "text-destructive"
									: status === "running"
										? "text-muted-foreground"
										: "text-foreground"
							}
						>
							{status === "running"
								? "Streaming tool results from subagent..."
								: status === "error"
									? "Subagent stopped with 1 error while verifying component exports."
									: "Verified trace primitives, collapsible state, and exported TypeScript types."}
						</SubagentResult>
					</SubagentContent>
				</Subagent>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Subagent",
		description:
			"Displays a delegated subagent execution run with nested tool calls and final result.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/subagent",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <SubagentDemo />,
		imports: demoImportsAndSetup,
		filename: "subagent.tsx",
	},
	installation: {
		componentName: "ai-subagent",
		dependencies: "lucide-react clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
