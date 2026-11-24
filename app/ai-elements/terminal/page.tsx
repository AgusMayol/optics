"use client";

import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Terminal,
	TerminalActions,
	TerminalContent,
	TerminalCopyButton,
	TerminalHeader,
	TerminalStatus,
	TerminalTitle,
} from "@/registry/optics/ai-elements/terminal";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/terminal.json";
import componentCode from "@/registry/optics/dist/ai-elements/terminal.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/terminal.tsx",
		code: componentCode,
	},
];

type TerminalMode = "success" | "streaming" | "error";

const TERMINAL_OUTPUT: Record<TerminalMode, string> = {
	success: [
		"$ bun test src/rate-limit.test.ts",
		"bun test v1.4.5",
		"",
		"src/rate-limit.test.ts:",
		"(pass) allows requests within burst limit [12.4ms]",
		"(pass) enforces retry-after window [18.1ms]",
		"(pass) resets bucket after TTL expires [9.2ms]",
		"",
		" 3 pass",
		" 0 fail",
		"Ran 3 tests across 1 file. [148ms]",
	].join("\n"),
	streaming: [
		"$ bun test src/rate-limit.test.ts",
		"bun test v1.4.5",
		"",
		"src/rate-limit.test.ts:",
		"(pass) allows requests within burst limit [12.4ms]",
		"(running) enforces retry-after window...",
	].join("\n"),
	error: [
		"$ bun test src/rate-limit.test.ts",
		"bun test v1.4.5",
		"",
		"src/rate-limit.test.ts:",
		"(pass) allows requests within burst limit [12.4ms]",
		"(fail) enforces retry-after window [21.6ms]",
		"  error: expect(received).toBe(expected)",
		"  Expected: 429",
		"  Received: 200",
		"      at src/rate-limit.test.ts:42:18",
		"",
		" 1 pass",
		" 1 fail",
	].join("\n"),
};

function TerminalDemo() {
	const [mode, setMode] = useState<TerminalMode>("success");
	const isStreaming = mode === "streaming";
	const exitCode = mode === "error" ? 1 : 0;

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<div className="flex flex-wrap items-center gap-1.5">
				<Button
					type="button"
					size="xs"
					variant={isStreaming ? "default" : "outline"}
					onClick={() => setMode((prev) => (prev === "streaming" ? "success" : "streaming"))}
				>
					Toggle Streaming
				</Button>
				<Button
					type="button"
					size="xs"
					variant={mode === "error" ? "destructive" : "outline"}
					onClick={() => setMode((prev) => (prev === "error" ? "success" : "error"))}
				>
					Simulate Error
				</Button>
			</div>

			<div className="rounded-xl border bg-background p-4">
				<Terminal output={TERMINAL_OUTPUT[mode]} isStreaming={isStreaming} defaultOpen>
					<TerminalHeader>
						<TerminalTitle command="bun test src/rate-limit.test.ts" />
						<TerminalActions>
							<TerminalStatus exitCode={exitCode} />
							<TerminalCopyButton />
						</TerminalActions>
					</TerminalHeader>
					<TerminalContent />
				</Terminal>
			</div>
		</div>
	);
}

TerminalDemo.displayName = "TerminalDemo";

const demoImportsAndSetup = `import { useState } from "react";
import {
	Terminal,
	TerminalActions,
	TerminalContent,
	TerminalCopyButton,
	TerminalHeader,
	TerminalStatus,
	TerminalTitle,
} from "@/components/optics/ai-elements/terminal";
import { Button } from "@/components/optics/button";

type TerminalMode = "success" | "streaming" | "error";

const TERMINAL_OUTPUT: Record<TerminalMode, string> = {
	success: [
		"$ bun test src/rate-limit.test.ts",
		"bun test v1.4.5",
		"",
		"src/rate-limit.test.ts:",
		"(pass) allows requests within burst limit [12.4ms]",
		"(pass) enforces retry-after window [18.1ms]",
		"(pass) resets bucket after TTL expires [9.2ms]",
		"",
		" 3 pass",
		" 0 fail",
		"Ran 3 tests across 1 file. [148ms]",
	].join("\\n"),
	streaming: [
		"$ bun test src/rate-limit.test.ts",
		"bun test v1.4.5",
		"",
		"src/rate-limit.test.ts:",
		"(pass) allows requests within burst limit [12.4ms]",
		"(running) enforces retry-after window...",
	].join("\\n"),
	error: [
		"$ bun test src/rate-limit.test.ts",
		"bun test v1.4.5",
		"",
		"src/rate-limit.test.ts:",
		"(pass) allows requests within burst limit [12.4ms]",
		"(fail) enforces retry-after window [21.6ms]",
		"  error: expect(received).toBe(expected)",
		"  Expected: 429",
		"  Received: 200",
		"      at src/rate-limit.test.ts:42:18",
		"",
		" 1 pass",
		" 1 fail",
	].join("\\n"),
};

function TerminalDemo() {
	const [mode, setMode] = useState<TerminalMode>("success");
	const isStreaming = mode === "streaming";
	const exitCode = mode === "error" ? 1 : 0;

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<div className="flex flex-wrap items-center gap-1.5">
				<Button
					type="button"
					size="xs"
					variant={isStreaming ? "default" : "outline"}
					onClick={() => setMode((prev) => (prev === "streaming" ? "success" : "streaming"))}
				>
					Toggle Streaming
				</Button>
				<Button
					type="button"
					size="xs"
					variant={mode === "error" ? "destructive" : "outline"}
					onClick={() => setMode((prev) => (prev === "error" ? "success" : "error"))}
				>
					Simulate Error
				</Button>
			</div>

			<div className="rounded-xl border bg-background p-4">
				<Terminal output={TERMINAL_OUTPUT[mode]} isStreaming={isStreaming} defaultOpen>
					<TerminalHeader>
						<TerminalTitle command="bun test src/rate-limit.test.ts" />
						<TerminalActions>
							<TerminalStatus exitCode={exitCode} />
							<TerminalCopyButton />
						</TerminalActions>
					</TerminalHeader>
					<TerminalContent />
				</Terminal>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Terminal",
		description:
			"Collapsible shell command log with exit code badge, output preview, and copy button.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/terminal",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <TerminalDemo />,
		imports: demoImportsAndSetup,
		filename: "terminal.tsx",
	},
	installation: {
		componentName: "ai-terminal",
		dependencies: "lucide-react clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
