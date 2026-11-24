"use client";

import { PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	PromptInput,
	PromptInputAttachButton,
	PromptInputAttachments,
	type PromptInputStatus,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputToolbar,
	PromptInputTools,
} from "@/registry/optics/ai-elements/prompt-input";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/prompt-input.json";
import componentCode from "@/registry/optics/dist/ai-elements/prompt-input.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/prompt-input.tsx",
		code: componentCode,
	},
];

interface SampleAttachment {
	name: string;
	type: string;
	content: string;
}

interface SubmittedPrompt {
	text: string;
	fileNames: string[];
}

const SAMPLE_ATTACHMENTS: readonly SampleAttachment[] = [
	{
		name: "schema.sql",
		type: "text/plain",
		content: "SELECT id, status, duration_ms FROM agent_runs ORDER BY created_at DESC;",
	},
	{
		name: "wireframe.png",
		type: "image/png",
		content: "wireframe-preview",
	},
];

function PromptInputDemo() {
	const [files, setFiles] = useState<File[]>([]);
	const [status, setStatus] = useState<PromptInputStatus>("ready");
	const [lastSubmission, setLastSubmission] = useState<SubmittedPrompt | null>(null);
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
			}
		};
	}, []);

	function handleAddSample(sample: SampleAttachment) {
		setFiles((current) => {
			if (current.some((file) => file.name === sample.name)) {
				return current;
			}
			return [...current, new File([sample.content], sample.name, { type: sample.type })];
		});
	}

	function handleSubmitMessage(text: string, submittedFiles: File[]) {
		if (status === "streaming") {
			return;
		}
		if (timerRef.current !== null) {
			window.clearTimeout(timerRef.current);
		}
		setLastSubmission({
			text: text.trim(),
			fileNames: submittedFiles.map((file) => file.name),
		});
		setFiles([]);
		setStatus("streaming");
		timerRef.current = window.setTimeout(() => {
			setStatus("ready");
			timerRef.current = null;
		}, 1200);
	}

	function handleStop() {
		if (timerRef.current !== null) {
			window.clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		setStatus("ready");
	}

	return (
		<div className="flex w-full max-w-xl flex-col gap-3">
			<PromptInput
				files={files}
				onFilesChange={setFiles}
				status={status}
				onSubmitMessage={handleSubmitMessage}
			>
				<PromptInputAttachments />
				<PromptInputTextarea
					placeholder="Ask the agent to inspect a file or draft a migration..."
					submitOnEnter={status !== "streaming"}
				/>
				<PromptInputToolbar>
					<PromptInputTools>
						<PromptInputAttachButton />
						{SAMPLE_ATTACHMENTS.map((sample) => {
							const attached = files.some((file) => file.name === sample.name);
							return (
								<Button
									key={sample.name}
									type="button"
									variant="ghost"
									size="xs"
									disabled={attached || status === "streaming"}
									onClick={() => handleAddSample(sample)}
								>
									<PlusIcon />
									{sample.name}
								</Button>
							);
						})}
					</PromptInputTools>
					<PromptInputSubmit onStop={handleStop} />
				</PromptInputToolbar>
			</PromptInput>

			<div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2 text-xs text-muted-foreground">
				<div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
					<Badge variant={status === "streaming" ? "default" : "secondary"}>{status}</Badge>
					{lastSubmission ? (
						<span className="truncate text-foreground">
							{lastSubmission.text || "(attachments only)"}
							{lastSubmission.fileNames.length > 0
								? ` · Files: ${lastSubmission.fileNames.join(", ")}`
								: ""}
						</span>
					) : (
						<span>Press Enter to send or attach a sample file above.</span>
					)}
				</div>
				<span className="tabular-nums">{files.length} attached</span>
			</div>
		</div>
	);
}

PromptInputDemo.displayName = "PromptInputDemo";

const demoImports = `import { PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
	PromptInput,
	PromptInputAttachButton,
	PromptInputAttachments,
	type PromptInputStatus,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputToolbar,
	PromptInputTools,
} from "@/components/optics/ai-elements/prompt-input";
import { Badge } from "@/components/optics/badge";
import { Button } from "@/components/optics/button";

interface SampleAttachment {
	name: string;
	type: string;
	content: string;
}

interface SubmittedPrompt {
	text: string;
	fileNames: string[];
}

const SAMPLE_ATTACHMENTS: readonly SampleAttachment[] = [
	{
		name: "schema.sql",
		type: "text/plain",
		content: "SELECT id, status, duration_ms FROM agent_runs ORDER BY created_at DESC;",
	},
	{
		name: "wireframe.png",
		type: "image/png",
		content: "wireframe-preview",
	},
];

function PromptInputDemo() {
	const [files, setFiles] = useState<File[]>([]);
	const [status, setStatus] = useState<PromptInputStatus>("ready");
	const [lastSubmission, setLastSubmission] = useState<SubmittedPrompt | null>(null);
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
			}
		};
	}, []);

	function handleAddSample(sample: SampleAttachment) {
		setFiles((current) => {
			if (current.some((file) => file.name === sample.name)) {
				return current;
			}
			return [...current, new File([sample.content], sample.name, { type: sample.type })];
		});
	}

	function handleSubmitMessage(text: string, submittedFiles: File[]) {
		if (status === "streaming") {
			return;
		}
		if (timerRef.current !== null) {
			window.clearTimeout(timerRef.current);
		}
		setLastSubmission({
			text: text.trim(),
			fileNames: submittedFiles.map((file) => file.name),
		});
		setFiles([]);
		setStatus("streaming");
		timerRef.current = window.setTimeout(() => {
			setStatus("ready");
			timerRef.current = null;
		}, 1200);
	}

	function handleStop() {
		if (timerRef.current !== null) {
			window.clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		setStatus("ready");
	}

	return (
		<div className="flex w-full max-w-xl flex-col gap-3">
			<PromptInput
				files={files}
				onFilesChange={setFiles}
				status={status}
				onSubmitMessage={handleSubmitMessage}
			>
				<PromptInputAttachments />
				<PromptInputTextarea
					placeholder="Ask the agent to inspect a file or draft a migration..."
					submitOnEnter={status !== "streaming"}
				/>
				<PromptInputToolbar>
					<PromptInputTools>
						<PromptInputAttachButton />
						{SAMPLE_ATTACHMENTS.map((sample) => {
							const attached = files.some((file) => file.name === sample.name);
							return (
								<Button
									key={sample.name}
									type="button"
									variant="ghost"
									size="xs"
									disabled={attached || status === "streaming"}
									onClick={() => handleAddSample(sample)}
								>
									<PlusIcon />
									{sample.name}
								</Button>
							);
						})}
					</PromptInputTools>
					<PromptInputSubmit onStop={handleStop} />
				</PromptInputToolbar>
			</PromptInput>

			<div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2 text-xs text-muted-foreground">
				<div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
					<Badge variant={status === "streaming" ? "default" : "secondary"}>{status}</Badge>
					{lastSubmission ? (
						<span className="truncate text-foreground">
							{lastSubmission.text || "(attachments only)"}
							{lastSubmission.fileNames.length > 0
								? \` · Files: \${lastSubmission.fileNames.join(", ")}\`
								: ""}
						</span>
					) : (
						<span>Press Enter to send or attach a sample file above.</span>
					)}
				</div>
				<span className="tabular-nums">{files.length} attached</span>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Prompt Input",
		description:
			"Chat composer with file attachments, keyboard submission shortcuts, and streaming status.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/prompt-input",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <PromptInputDemo />,
		imports: demoImports,
		filename: "prompt-input.tsx",
	},
	installation: {
		componentName: "ai-prompt-input",
		dependencies: "lucide-react clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
