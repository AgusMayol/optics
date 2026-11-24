"use client";
import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Plan,
	PlanContent,
	PlanDescription,
	PlanHeader,
	PlanProgress,
	PlanStep,
	type PlanStepStatus,
	PlanTitle,
} from "@/registry/optics/ai-elements/plan";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/plan.json";
import componentCode from "@/registry/optics/dist/ai-elements/plan.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/plan.tsx",
		code: componentCode,
	},
];

interface PlanStepItem {
	id: string;
	title: string;
	duration: string;
}

const PLAN_STEPS: PlanStepItem[] = [
	{
		id: "audit",
		title: "Inspect registry schemas and exports",
		duration: "140ms",
	},
	{
		id: "docs",
		title: "Author interactive component examples",
		duration: "420ms",
	},
	{
		id: "lint",
		title: "Format and verify lint rules",
		duration: "180ms",
	},
	{
		id: "types",
		title: "Run strict TypeScript check",
		duration: "610ms",
	},
];

function getStepStatus(index: number, completedCount: number): PlanStepStatus {
	if (index < completedCount) {
		return "completed";
	}
	if (index === completedCount) {
		return "in-progress";
	}
	return "pending";
}

function getStepDescription(status: PlanStepStatus, duration: string): string {
	switch (status) {
		case "completed":
			return duration;
		case "in-progress":
			return "Running";
		case "pending":
			return "Queued";
		case "error":
			return "Failed";
		default: {
			const exhaustive: never = status;
			return exhaustive;
		}
	}
}

function PlanDemo() {
	const [completedCount, setCompletedCount] = useState(1);
	const isComplete = completedCount >= PLAN_STEPS.length;

	function handleAdvanceStep() {
		setCompletedCount((prev) => (prev >= PLAN_STEPS.length ? 1 : prev + 1));
	}

	return (
		<div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground">
			<Plan defaultOpen isStreaming={!isComplete}>
				<PlanHeader>
					<PlanTitle>Ship AI Elements documentation</PlanTitle>
					<PlanDescription>
						{completedCount} of {PLAN_STEPS.length} complete
					</PlanDescription>
				</PlanHeader>
				<PlanProgress completed={completedCount} total={PLAN_STEPS.length} />
				<PlanContent>
					{PLAN_STEPS.map((step, index) => {
						const status = getStepStatus(index, completedCount);
						return (
							<PlanStep
								key={step.id}
								status={status}
								description={getStepDescription(status, step.duration)}
							>
								{step.title}
							</PlanStep>
						);
					})}
				</PlanContent>
			</Plan>

			<div className="flex items-center justify-between gap-3 border-t pt-3">
				<span className="text-xs text-muted-foreground">
					{isComplete ? "All steps completed" : "Click to test live step progress"}
				</span>
				<Button type="button" variant="outline" size="sm" onClick={handleAdvanceStep}>
					{isComplete ? "Reset progress" : "Advance step"}
				</Button>
			</div>
		</div>
	);
}

PlanDemo.displayName = "PlanDemo";

const demoImportsAndSetup = `import { useState } from "react";
import {
	Plan,
	PlanContent,
	PlanDescription,
	PlanHeader,
	PlanProgress,
	PlanStep,
	type PlanStepStatus,
	PlanTitle,
} from "@/components/optics/ai-elements/plan";
import { Button } from "@/components/optics/button";

interface PlanStepItem {
	id: string;
	title: string;
	duration: string;
}

const PLAN_STEPS: PlanStepItem[] = [
	{
		id: "audit",
		title: "Inspect registry schemas and exports",
		duration: "140ms",
	},
	{
		id: "docs",
		title: "Author interactive component examples",
		duration: "420ms",
	},
	{
		id: "lint",
		title: "Format and verify lint rules",
		duration: "180ms",
	},
	{
		id: "types",
		title: "Run strict TypeScript check",
		duration: "610ms",
	},
];

function getStepStatus(index: number, completedCount: number): PlanStepStatus {
	if (index < completedCount) {
		return "completed";
	}
	if (index === completedCount) {
		return "in-progress";
	}
	return "pending";
}

function getStepDescription(status: PlanStepStatus, duration: string): string {
	switch (status) {
		case "completed":
			return duration;
		case "in-progress":
			return "Running";
		case "pending":
			return "Queued";
		case "error":
			return "Failed";
		default: {
			const exhaustive: never = status;
			return exhaustive;
		}
	}
}

function PlanDemo() {
	const [completedCount, setCompletedCount] = useState(1);
	const isComplete = completedCount >= PLAN_STEPS.length;

	function handleAdvanceStep() {
		setCompletedCount((prev) => (prev >= PLAN_STEPS.length ? 1 : prev + 1));
	}

	return (
		<div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground">
			<Plan defaultOpen isStreaming={!isComplete}>
				<PlanHeader>
					<PlanTitle>Ship AI Elements documentation</PlanTitle>
					<PlanDescription>
						{completedCount} of {PLAN_STEPS.length} complete
					</PlanDescription>
				</PlanHeader>
				<PlanProgress completed={completedCount} total={PLAN_STEPS.length} />
				<PlanContent>
					{PLAN_STEPS.map((step, index) => {
						const status = getStepStatus(index, completedCount);
						return (
							<PlanStep
								key={step.id}
								status={status}
								description={getStepDescription(status, step.duration)}
							>
								{step.title}
							</PlanStep>
						);
					})}
				</PlanContent>
			</Plan>

			<div className="flex items-center justify-between gap-3 border-t pt-3">
				<span className="text-xs text-muted-foreground">
					{isComplete ? "All steps completed" : "Click to test live step progress"}
				</span>
				<Button type="button" variant="outline" size="sm" onClick={handleAdvanceStep}>
					{isComplete ? "Reset progress" : "Advance step"}
				</Button>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Plan",
		description:
			"Structured execution plan displaying overall progress and expandable step details.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/plan",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <PlanDemo />,
		imports: demoImportsAndSetup,
		filename: "plan.tsx",
	},
	installation: {
		componentName: "ai-plan",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
