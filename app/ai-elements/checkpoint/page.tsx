"use client";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Checkpoint,
	CheckpointIcon,
	CheckpointLabel,
	CheckpointTrigger,
} from "@/registry/optics/ai-elements/checkpoint";
import {
	AIMessage,
	AIMessageContent,
	type AIMessageFrom,
} from "@/registry/optics/ai-elements/message";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/checkpoint.json";
import componentCode from "@/registry/optics/dist/ai-elements/checkpoint.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/checkpoint.tsx",
		code: componentCode,
	},
];

interface ConversationTurn {
	id: string;
	from: AIMessageFrom;
	text: string;
}

const TURNS_BEFORE_CHECKPOINT: ConversationTurn[] = [
	{
		id: "turn-1",
		from: "user",
		text: "Audit the session store and identify any stale refresh token paths.",
	},
	{
		id: "turn-2",
		from: "assistant",
		text: "Found two unkeyed refresh writes in auth/session.ts. State saved before applying edits.",
	},
];

const TURNS_AFTER_CHECKPOINT: ConversationTurn[] = [
	{
		id: "turn-3",
		from: "user",
		text: "Migrate the session store to an in-memory LRU cache.",
	},
	{
		id: "turn-4",
		from: "assistant",
		text: "Replaced the map with a 256-entry LRU cache and updated all four callers.",
	},
];

function CheckpointDemo() {
	const [restored, setRestored] = useState(false);

	return (
		<div className="flex w-full max-w-lg flex-col gap-4 rounded-xl border bg-background p-4">
			<div className="flex flex-col gap-4">
				{TURNS_BEFORE_CHECKPOINT.map((turn) => (
					<AIMessage key={turn.id} from={turn.from}>
						<AIMessageContent header={turn.from === "assistant" ? "Assistant" : "You"}>
							{turn.from === "assistant" ? (
								<p className="text-sm leading-relaxed text-foreground">{turn.text}</p>
							) : (
								turn.text
							)}
						</AIMessageContent>
					</AIMessage>
				))}

				<Checkpoint>
					<CheckpointIcon />
					<CheckpointLabel>Checkpoint · Pre-migration</CheckpointLabel>
					<CheckpointTrigger
						tooltip="Restore conversation back to this checkpoint"
						disabled={restored}
						onClick={() => setRestored(true)}
					>
						{restored ? "Restored" : "Restore"}
					</CheckpointTrigger>
				</Checkpoint>

				{!restored &&
					TURNS_AFTER_CHECKPOINT.map((turn) => (
						<AIMessage key={turn.id} from={turn.from}>
							<AIMessageContent header={turn.from === "assistant" ? "Assistant" : "You"}>
								{turn.from === "assistant" ? (
									<p className="text-sm leading-relaxed text-foreground">{turn.text}</p>
								) : (
									turn.text
								)}
							</AIMessageContent>
						</AIMessage>
					))}
			</div>

			<div className="flex items-center justify-between gap-3 border-t pt-3 text-xs text-muted-foreground">
				<span>
					{restored ? "Restored to checkpoint (2 later turns removed)" : "Showing all 4 turns"}
				</span>
				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={!restored}
					onClick={() => setRestored(false)}
				>
					<RotateCcw />
					Reset
				</Button>
			</div>
		</div>
	);
}

CheckpointDemo.displayName = "CheckpointDemo";

const demoImportsAndSetup = `import { RotateCcw } from "lucide-react";
import { useState } from "react";
import {
	Checkpoint,
	CheckpointIcon,
	CheckpointLabel,
	CheckpointTrigger,
} from "@/components/optics/ai-elements/checkpoint";
import { AIMessage, AIMessageContent, type AIMessageFrom } from "@/components/optics/ai-elements/message";
import { Button } from "@/components/optics/button";

interface ConversationTurn {
	id: string;
	from: AIMessageFrom;
	text: string;
}

const TURNS_BEFORE_CHECKPOINT: ConversationTurn[] = [
	{
		id: "turn-1",
		from: "user",
		text: "Audit the session store and identify any stale refresh token paths.",
	},
	{
		id: "turn-2",
		from: "assistant",
		text: "Found two unkeyed refresh writes in auth/session.ts. State saved before applying edits.",
	},
];

const TURNS_AFTER_CHECKPOINT: ConversationTurn[] = [
	{
		id: "turn-3",
		from: "user",
		text: "Migrate the session store to an in-memory LRU cache.",
	},
	{
		id: "turn-4",
		from: "assistant",
		text: "Replaced the map with a 256-entry LRU cache and updated all four callers.",
	},
];

function CheckpointDemo() {
	const [restored, setRestored] = useState(false);

	return (
		<div className="flex w-full max-w-lg flex-col gap-4 rounded-xl border bg-background p-4">
			<div className="flex flex-col gap-4">
				{TURNS_BEFORE_CHECKPOINT.map((turn) => (
					<AIMessage key={turn.id} from={turn.from}>
						<AIMessageContent header={turn.from === "assistant" ? "Assistant" : "You"}>
							{turn.from === "assistant" ? (
								<p className="text-sm leading-relaxed text-foreground">{turn.text}</p>
							) : (
								turn.text
							)}
						</AIMessageContent>
					</AIMessage>
				))}

				<Checkpoint>
					<CheckpointIcon />
					<CheckpointLabel>Checkpoint · Pre-migration</CheckpointLabel>
					<CheckpointTrigger
						tooltip="Restore conversation back to this checkpoint"
						disabled={restored}
						onClick={() => setRestored(true)}
					>
						{restored ? "Restored" : "Restore"}
					</CheckpointTrigger>
				</Checkpoint>

				{!restored &&
					TURNS_AFTER_CHECKPOINT.map((turn) => (
						<AIMessage key={turn.id} from={turn.from}>
							<AIMessageContent header={turn.from === "assistant" ? "Assistant" : "You"}>
								{turn.from === "assistant" ? (
									<p className="text-sm leading-relaxed text-foreground">{turn.text}</p>
								) : (
									turn.text
								)}
							</AIMessageContent>
						</AIMessage>
					))}
			</div>

			<div className="flex items-center justify-between gap-3 border-t pt-3 text-xs text-muted-foreground">
				<span>
					{restored ? "Restored to checkpoint (2 later turns removed)" : "Showing all 4 turns"}
				</span>
				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={!restored}
					onClick={() => setRestored(false)}
				>
					<RotateCcw />
					Reset
				</Button>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Checkpoint",
		description:
			"Marks a restore point in a conversation thread with an icon, label, and trigger button.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/checkpoint",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <CheckpointDemo />,
		imports: demoImportsAndSetup,
		filename: "checkpoint.tsx",
	},
	installation: {
		componentName: "ai-checkpoint",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
