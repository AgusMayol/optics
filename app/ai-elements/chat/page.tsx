"use client";
import { CheckIcon, MessageSquarePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Chat,
	ChatContent,
	ChatEmpty,
	ChatFooter,
	ChatScrollButton,
	ChatTurn,
	ChatViewport,
} from "@/registry/optics/ai-elements/chat";
import {
	AIMessage,
	AIMessageContent,
	type AIMessageFrom,
} from "@/registry/optics/ai-elements/message";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/chat.json";
import componentCode from "@/registry/optics/dist/ai-elements/chat.tsx.txt";
import { Trace, TraceDescription, TraceIcon, TraceLine, TraceTitle } from "@/registry/optics/trace";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/chat.tsx",
		code: componentCode,
	},
];

interface ChatEntry {
	id: string;
	from: AIMessageFrom;
	text: string;
	traceLabel?: string;
	traceDuration?: string;
}

const INITIAL_TURNS: ChatEntry[] = [
	{
		id: "turn-1",
		from: "user",
		text: "Can you inspect why the scroll position jumps when streaming finishes?",
	},
	{
		id: "turn-2",
		from: "assistant",
		traceLabel: "Inspected message-scroller.tsx",
		traceDuration: "180ms",
		text: "The viewport stays pinned whenever autoScroll is active and the user has not scrolled past the bottom threshold.",
	},
	{
		id: "turn-3",
		from: "user",
		text: "What happens if someone scrolls up to read an earlier tool output?",
	},
	{
		id: "turn-4",
		from: "assistant",
		traceLabel: "Checked scrollEdgeThreshold behavior",
		traceDuration: "120ms",
		text: "Sticky tracking pauses automatically so reading position stays fixed, and ChatScrollButton fades in to jump back down.",
	},
	{
		id: "turn-5",
		from: "user",
		text: "Does ChatTurn need scrollAnchor on every message?",
	},
	{
		id: "turn-6",
		from: "assistant",
		traceLabel: "Verified ChatTurn defaults",
		traceDuration: "95ms",
		text: "No, set scrollAnchor on prompt turns so users can snap to the start of a question while replies stream underneath.",
	},
];

const FOLLOW_UP_REPLIES: Omit<ChatEntry, "id">[] = [
	{
		from: "user",
		text: "Let's test appending another reply to verify sticky scrolling.",
	},
	{
		from: "assistant",
		traceLabel: "Streamed follow-up response",
		traceDuration: "240ms",
		text: "New assistant turns stay pinned to the bottom edge while the scroll-to-latest button remains ready if you scroll up.",
	},
	{
		from: "assistant",
		traceLabel: "Evaluated thread layout",
		traceDuration: "145ms",
		text: "All message items reserve intrinsic height via content-visibility so long agent threads stay responsive.",
	},
];

function ChatDemo() {
	const [turns, setTurns] = useState<ChatEntry[]>(INITIAL_TURNS);
	const [replyIndex, setReplyIndex] = useState(0);

	function handleSimulateReply() {
		const template = FOLLOW_UP_REPLIES[replyIndex % FOLLOW_UP_REPLIES.length];
		setTurns((prev) => [
			...prev,
			{
				...template,
				id: `turn-extra-${replyIndex + 1}`,
			},
		]);
		setReplyIndex((prev) => prev + 1);
	}

	function handleClearThread() {
		setTurns([]);
	}

	return (
		<Chat className="h-80 w-full max-w-lg rounded-xl border bg-background">
			<ChatViewport>
				{turns.length === 0 ? (
					<ChatEmpty
						title="Conversation cleared"
						description="Simulate a reply to start a fresh agent thread."
					/>
				) : (
					<ChatContent>
						{turns.map((turn) => (
							<ChatTurn key={turn.id} messageId={turn.id} scrollAnchor={turn.from === "user"}>
								<AIMessage from={turn.from}>
									<AIMessageContent header={turn.from === "assistant" ? "Assistant" : "You"}>
										{turn.traceLabel ? (
											<Trace>
												<TraceLine>
													<TraceIcon>
														<CheckIcon className="text-emerald-600 dark:text-emerald-400" />
													</TraceIcon>
													<TraceTitle>{turn.traceLabel}</TraceTitle>
													{turn.traceDuration ? (
														<TraceDescription>{turn.traceDuration}</TraceDescription>
													) : null}
												</TraceLine>
											</Trace>
										) : null}
										{turn.from === "assistant" ? (
											<p className="text-sm leading-relaxed text-foreground">{turn.text}</p>
										) : (
											turn.text
										)}
									</AIMessageContent>
								</AIMessage>
							</ChatTurn>
						))}
					</ChatContent>
				)}
			</ChatViewport>
			<ChatScrollButton />
			<ChatFooter className="flex items-center justify-between gap-2 border-t bg-background/95 pt-3 pb-3">
				<Button type="button" variant="outline" size="sm" onClick={handleSimulateReply}>
					<MessageSquarePlus />
					Simulate reply
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					disabled={turns.length === 0}
					onClick={handleClearThread}
				>
					<Trash2 />
					Clear thread
				</Button>
			</ChatFooter>
		</Chat>
	);
}

ChatDemo.displayName = "ChatDemo";

const demoImportsAndSetup = `import { CheckIcon, MessageSquarePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
	Chat,
	ChatContent,
	ChatEmpty,
	ChatFooter,
	ChatScrollButton,
	ChatTurn,
	ChatViewport,
} from "@/components/optics/ai-elements/chat";
import { AIMessage, AIMessageContent, type AIMessageFrom } from "@/components/optics/ai-elements/message";
import { Button } from "@/components/optics/button";
import { Trace, TraceDescription, TraceIcon, TraceLine, TraceTitle } from "@/components/optics/trace";

interface ChatEntry {
	id: string;
	from: AIMessageFrom;
	text: string;
	traceLabel?: string;
	traceDuration?: string;
}

const INITIAL_TURNS: ChatEntry[] = [
	{
		id: "turn-1",
		from: "user",
		text: "Can you inspect why the scroll position jumps when streaming finishes?",
	},
	{
		id: "turn-2",
		from: "assistant",
		traceLabel: "Inspected message-scroller.tsx",
		traceDuration: "180ms",
		text: "The viewport stays pinned whenever autoScroll is active and the user has not scrolled past the bottom threshold.",
	},
	{
		id: "turn-3",
		from: "user",
		text: "What happens if someone scrolls up to read an earlier tool output?",
	},
	{
		id: "turn-4",
		from: "assistant",
		traceLabel: "Checked scrollEdgeThreshold behavior",
		traceDuration: "120ms",
		text: "Sticky tracking pauses automatically so reading position stays fixed, and ChatScrollButton fades in to jump back down.",
	},
];

const FOLLOW_UP_REPLIES: Omit<ChatEntry, "id">[] = [
	{
		from: "user",
		text: "Let's test appending another reply to verify sticky scrolling.",
	},
	{
		from: "assistant",
		traceLabel: "Streamed follow-up response",
		traceDuration: "240ms",
		text: "New assistant turns stay pinned to the bottom edge while the scroll-to-latest button remains ready if you scroll up.",
	},
];

function ChatDemo() {
	const [turns, setTurns] = useState<ChatEntry[]>(INITIAL_TURNS);
	const [replyIndex, setReplyIndex] = useState(0);

	function handleSimulateReply() {
		const template = FOLLOW_UP_REPLIES[replyIndex % FOLLOW_UP_REPLIES.length];
		setTurns((prev) => [
			...prev,
			{
				...template,
				id: \`turn-extra-\${replyIndex + 1}\`,
			},
		]);
		setReplyIndex((prev) => prev + 1);
	}

	function handleClearThread() {
		setTurns([]);
	}

	return (
		<Chat className="h-80 w-full max-w-lg rounded-xl border bg-background">
			<ChatViewport>
				{turns.length === 0 ? (
					<ChatEmpty
						title="Conversation cleared"
						description="Simulate a reply to start a fresh agent thread."
					/>
				) : (
					<ChatContent>
						{turns.map((turn) => (
							<ChatTurn key={turn.id} messageId={turn.id} scrollAnchor={turn.from === "user"}>
								<AIMessage from={turn.from}>
									<AIMessageContent header={turn.from === "assistant" ? "Assistant" : "You"}>
										{turn.traceLabel ? (
											<Trace>
												<TraceLine>
													<TraceIcon>
														<CheckIcon className="text-emerald-600 dark:text-emerald-400" />
													</TraceIcon>
													<TraceTitle>{turn.traceLabel}</TraceTitle>
													{turn.traceDuration ? (
														<TraceDescription>{turn.traceDuration}</TraceDescription>
													) : null}
												</TraceLine>
											</Trace>
										) : null}
										{turn.from === "assistant" ? (
											<p className="text-sm leading-relaxed text-foreground">{turn.text}</p>
										) : (
											turn.text
										)}
									</AIMessageContent>
								</AIMessage>
							</ChatTurn>
						))}
					</ChatContent>
				)}
			</ChatViewport>
			<ChatScrollButton />
			<ChatFooter className="flex items-center justify-between gap-2 border-t bg-background/95 pt-3 pb-3">
				<Button type="button" variant="outline" size="sm" onClick={handleSimulateReply}>
					<MessageSquarePlus />
					Simulate reply
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					disabled={turns.length === 0}
					onClick={handleClearThread}
				>
					<Trash2 />
					Clear thread
				</Button>
			</ChatFooter>
		</Chat>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Chat",
		description:
			"Scrollable agent conversation viewport backed by Message Scroller with sticky bottom tracking.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/chat",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <ChatDemo />,
		imports: demoImportsAndSetup,
		filename: "chat.tsx",
	},
	installation: {
		componentName: "ai-chat",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
