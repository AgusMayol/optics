"use client";

import { useEffect, useRef, useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Reasoning,
	ReasoningContent,
	ReasoningTrigger,
} from "@/registry/optics/ai-elements/reasoning";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/reasoning.json";
import componentCode from "@/registry/optics/dist/ai-elements/reasoning.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/reasoning.tsx",
		code: componentCode,
	},
];

const REASONING_TEXT = [
	"1. Inspecting route dependencies to locate where session cookies are parsed.",
	"2. Comparing server action boundaries against client form state to prevent hydration mismatch.",
	"3. Confirming edge middleware forwards the refreshed token header before rendering.",
].join("\n");

function ReasoningDemo() {
	const [isStreaming, setIsStreaming] = useState(false);
	const [duration, setDuration] = useState(4);
	const [open, setOpen] = useState(true);
	const timerRef = useRef<number | null>(null);
	const startedAtRef = useRef(0);

	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
			}
		};
	}, []);

	function handleToggleStreaming() {
		if (isStreaming) {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
				timerRef.current = null;
			}
			const elapsed = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
			setDuration(elapsed);
			setIsStreaming(false);
			return;
		}

		startedAtRef.current = Date.now();
		setOpen(true);
		setIsStreaming(true);
		timerRef.current = window.setTimeout(() => {
			setDuration(4);
			setIsStreaming(false);
			timerRef.current = null;
		}, 4000);
	}

	return (
		<div className="flex w-full max-w-md flex-col gap-3 rounded-xl border bg-card p-4">
			<div className="flex items-center justify-between gap-2">
				<span className="text-xs font-medium text-muted-foreground">Agent reasoning trace</span>
				<Button type="button" variant="outline" size="xs" onClick={handleToggleStreaming}>
					{isStreaming ? "Stop" : "Simulate thinking"}
				</Button>
			</div>

			<Reasoning
				isStreaming={isStreaming}
				duration={isStreaming ? undefined : duration}
				open={open}
				onOpenChange={setOpen}
			>
				<ReasoningTrigger />
				<ReasoningContent>{REASONING_TEXT}</ReasoningContent>
			</Reasoning>
		</div>
	);
}

ReasoningDemo.displayName = "ReasoningDemo";

const demoImports = `import { useEffect, useRef, useState } from "react";
import {
	Reasoning,
	ReasoningContent,
	ReasoningTrigger,
} from "@/components/optics/ai-elements/reasoning";
import { Button } from "@/components/optics/button";

const REASONING_TEXT = [
	"1. Inspecting route dependencies to locate where session cookies are parsed.",
	"2. Comparing server action boundaries against client form state to prevent hydration mismatch.",
	"3. Confirming edge middleware forwards the refreshed token header before rendering.",
].join("\\n");

function ReasoningDemo() {
	const [isStreaming, setIsStreaming] = useState(false);
	const [duration, setDuration] = useState(4);
	const [open, setOpen] = useState(true);
	const timerRef = useRef<number | null>(null);
	const startedAtRef = useRef(0);

	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
			}
		};
	}, []);

	function handleToggleStreaming() {
		if (isStreaming) {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
				timerRef.current = null;
			}
			const elapsed = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
			setDuration(elapsed);
			setIsStreaming(false);
			return;
		}

		startedAtRef.current = Date.now();
		setOpen(true);
		setIsStreaming(true);
		timerRef.current = window.setTimeout(() => {
			setDuration(4);
			setIsStreaming(false);
			timerRef.current = null;
		}, 4000);
	}

	return (
		<div className="flex w-full max-w-md flex-col gap-3 rounded-xl border bg-card p-4">
			<div className="flex items-center justify-between gap-2">
				<span className="text-xs font-medium text-muted-foreground">Agent reasoning trace</span>
				<Button type="button" variant="outline" size="xs" onClick={handleToggleStreaming}>
					{isStreaming ? "Stop" : "Simulate thinking"}
				</Button>
			</div>

			<Reasoning
				isStreaming={isStreaming}
				duration={isStreaming ? undefined : duration}
				open={open}
				onOpenChange={setOpen}
			>
				<ReasoningTrigger />
				<ReasoningContent>{REASONING_TEXT}</ReasoningContent>
			</Reasoning>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Reasoning",
		description:
			"Collapsible thinking panel showing live streaming shimmer and elapsed reasoning time.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/reasoning",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <ReasoningDemo />,
		imports: demoImports,
		filename: "reasoning.tsx",
	},
	installation: {
		componentName: "ai-reasoning",
		dependencies: "lucide-react clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
