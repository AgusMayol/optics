"use client";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	AIMessage,
	AIMessageAction,
	AIMessageActions,
	AIMessageBranch,
	AIMessageBranchNext,
	AIMessageBranchPage,
	AIMessageBranchPrevious,
	AIMessageContent,
	AIMessageCopyButton,
} from "@/registry/optics/ai-elements/message";
import generatedProps from "@/registry/optics/dist/ai-elements/message.json";
import componentCode from "@/registry/optics/dist/ai-elements/message.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/message.tsx",
		code: componentCode,
	},
];

interface ResponseDraft {
	id: string;
	paragraphs: string[];
	plainText: string;
}

const RESPONSE_DRAFTS: ResponseDraft[] = [
	{
		id: "draft-union",
		paragraphs: [
			"Model tool execution as a discriminated union keyed by status so every branch carries only its valid payload.",
			"Pair the union with an exhaustive switch in your UI renderer to catch missing states at compile time.",
		],
		plainText:
			"Model tool execution as a discriminated union keyed by status so every branch carries only its valid payload. Pair the union with an exhaustive switch in your UI renderer to catch missing states at compile time.",
	},
	{
		id: "draft-reducer",
		paragraphs: [
			"Keep tool transitions inside a pure reducer that maps each streaming event directly to the next state variant.",
			"This avoids scattered boolean flags in JSX and makes retry and approval transitions trivial to unit test.",
		],
		plainText:
			"Keep tool transitions inside a pure reducer that maps each streaming event directly to the next state variant. This avoids scattered boolean flags in JSX and makes retry and approval transitions trivial to unit test.",
	},
];

type FeedbackChoice = "up" | "down";

function MessageDemo() {
	const [branchIndex, setBranchIndex] = useState(0);
	const [feedbackByDraft, setFeedbackByDraft] = useState<
		Record<number, FeedbackChoice | undefined>
	>({});

	const activeDraft = RESPONSE_DRAFTS[branchIndex] ?? RESPONSE_DRAFTS[0];
	const currentFeedback = feedbackByDraft[branchIndex];

	function handleFeedback(choice: FeedbackChoice) {
		setFeedbackByDraft((prev) => ({
			...prev,
			[branchIndex]: prev[branchIndex] === choice ? undefined : choice,
		}));
	}

	return (
		<div className="flex w-full max-w-lg flex-col gap-5">
			<AIMessage from="user">
				<AIMessageContent header="You">
					How should we model agent tool states so transitions stay type-safe?
				</AIMessageContent>
			</AIMessage>

			<AIMessage from="assistant">
				<AIMessageContent header="Optics Assistant">
					<AIMessageBranch branch={branchIndex} onBranchChange={setBranchIndex}>
						{RESPONSE_DRAFTS.map((draft) => (
							<div key={draft.id} className="space-y-2 text-sm leading-relaxed">
								{draft.paragraphs.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						))}
						<AIMessageBranchPrevious />
						<AIMessageBranchPage />
						<AIMessageBranchNext />
						<AIMessageActions className="ml-auto">
							<AIMessageCopyButton value={activeDraft.plainText} />
							<AIMessageAction
								tooltip={currentFeedback === "up" ? "Marked helpful" : "Helpful"}
								label="Thumbs up"
								aria-pressed={currentFeedback === "up"}
								className={
									currentFeedback === "up" ? "text-emerald-600 dark:text-emerald-400" : undefined
								}
								onClick={() => handleFeedback("up")}
							>
								<ThumbsUpIcon />
							</AIMessageAction>
							<AIMessageAction
								tooltip={currentFeedback === "down" ? "Marked not helpful" : "Not helpful"}
								label="Thumbs down"
								aria-pressed={currentFeedback === "down"}
								className={currentFeedback === "down" ? "text-destructive" : undefined}
								onClick={() => handleFeedback("down")}
							>
								<ThumbsDownIcon />
							</AIMessageAction>
						</AIMessageActions>
					</AIMessageBranch>
				</AIMessageContent>
			</AIMessage>
		</div>
	);
}

MessageDemo.displayName = "MessageDemo";

const demoImportsAndSetup = `import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import {
	AIMessage,
	AIMessageAction,
	AIMessageActions,
	AIMessageBranch,
	AIMessageBranchNext,
	AIMessageBranchPage,
	AIMessageBranchPrevious,
	AIMessageContent,
	AIMessageCopyButton,
} from "@/components/optics/ai-elements/message";

interface ResponseDraft {
	id: string;
	paragraphs: string[];
	plainText: string;
}

const RESPONSE_DRAFTS: ResponseDraft[] = [
	{
		id: "draft-union",
		paragraphs: [
			"Model tool execution as a discriminated union keyed by status so every branch carries only its valid payload.",
			"Pair the union with an exhaustive switch in your UI renderer to catch missing states at compile time.",
		],
		plainText:
			"Model tool execution as a discriminated union keyed by status so every branch carries only its valid payload. Pair the union with an exhaustive switch in your UI renderer to catch missing states at compile time.",
	},
	{
		id: "draft-reducer",
		paragraphs: [
			"Keep tool transitions inside a pure reducer that maps each streaming event directly to the next state variant.",
			"This avoids scattered boolean flags in JSX and makes retry and approval transitions trivial to unit test.",
		],
		plainText:
			"Keep tool transitions inside a pure reducer that maps each streaming event directly to the next state variant. This avoids scattered boolean flags in JSX and makes retry and approval transitions trivial to unit test.",
	},
];

type FeedbackChoice = "up" | "down";

function MessageDemo() {
	const [branchIndex, setBranchIndex] = useState(0);
	const [feedbackByDraft, setFeedbackByDraft] = useState<
		Record<number, FeedbackChoice | undefined>
	>({});

	const activeDraft = RESPONSE_DRAFTS[branchIndex] ?? RESPONSE_DRAFTS[0];
	const currentFeedback = feedbackByDraft[branchIndex];

	function handleFeedback(choice: FeedbackChoice) {
		setFeedbackByDraft((prev) => ({
			...prev,
			[branchIndex]: prev[branchIndex] === choice ? undefined : choice,
		}));
	}

	return (
		<div className="flex w-full max-w-lg flex-col gap-5">
			<AIMessage from="user">
				<AIMessageContent header="You">
					How should we model agent tool states so transitions stay type-safe?
				</AIMessageContent>
			</AIMessage>

			<AIMessage from="assistant">
				<AIMessageContent header="Optics Assistant">
					<AIMessageBranch branch={branchIndex} onBranchChange={setBranchIndex}>
						{RESPONSE_DRAFTS.map((draft) => (
							<div key={draft.id} className="space-y-2 text-sm leading-relaxed">
								{draft.paragraphs.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						))}
						<AIMessageBranchPrevious />
						<AIMessageBranchPage />
						<AIMessageBranchNext />
						<AIMessageActions className="ml-auto">
							<AIMessageCopyButton value={activeDraft.plainText} />
							<AIMessageAction
								tooltip={currentFeedback === "up" ? "Marked helpful" : "Helpful"}
								label="Thumbs up"
								aria-pressed={currentFeedback === "up"}
								className={
									currentFeedback === "up" ? "text-emerald-600 dark:text-emerald-400" : undefined
								}
								onClick={() => handleFeedback("up")}
							>
								<ThumbsUpIcon />
							</AIMessageAction>
							<AIMessageAction
								tooltip={currentFeedback === "down" ? "Marked not helpful" : "Not helpful"}
								label="Thumbs down"
								aria-pressed={currentFeedback === "down"}
								className={currentFeedback === "down" ? "text-destructive" : undefined}
								onClick={() => handleFeedback("down")}
							>
								<ThumbsDownIcon />
							</AIMessageAction>
						</AIMessageActions>
					</AIMessageBranch>
				</AIMessageContent>
			</AIMessage>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Message",
		description:
			"Turn container supporting message branching, copy controls, actions, and role alignment.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/message",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <MessageDemo />,
		imports: demoImportsAndSetup,
		filename: "message.tsx",
	},
	installation: {
		componentName: "ai-message",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
