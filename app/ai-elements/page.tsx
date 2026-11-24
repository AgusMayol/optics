"use client";
import { ArrowRight } from "lucide-react";
import { ForesightLink as Link } from "@/components/link";
import { Separator } from "@/registry/optics/separator";

interface AiElementEntry {
	name: string;
	href: string;
	description: string;
}

const AI_ELEMENTS: AiElementEntry[] = [
	{
		name: "Chain of Thought",
		href: "/ai-elements/chain-of-thought",
		description: "A summary that expands into the steps an agent took.",
	},
	{
		name: "Chat",
		href: "/ai-elements/chat",
		description: "The thread. Message Scroller keeps your place while the reply streams.",
	},
	{
		name: "Checkpoint",
		href: "/ai-elements/checkpoint",
		description: "A point in the conversation you can return to.",
	},
	{
		name: "Confirmation",
		href: "/ai-elements/confirmation",
		description: "A prompt to approve or deny a tool before it runs.",
	},
	{
		name: "Context",
		href: "/ai-elements/context",
		description: "How much of the context window the conversation has used.",
	},
	{
		name: "File Tree",
		href: "/ai-elements/file-tree",
		description: "The files the agent changed, as a folder tree.",
	},
	{
		name: "Inline Citation",
		href: "/ai-elements/inline-citation",
		description: "A source in the sentence that opens on hover.",
	},
	{
		name: "Message",
		href: "/ai-elements/message",
		description: "One turn. The person's message, and the agent's reply with its actions.",
	},
	{
		name: "Model Selector",
		href: "/ai-elements/model-selector",
		description:
			"Two menus. One picks the model the agent runs, the other picks how hard it thinks.",
	},
	{
		name: "Plan",
		href: "/ai-elements/plan",
		description: "The steps the agent plans to take, and how far it has got.",
	},
	{
		name: "Prompt Input",
		href: "/ai-elements/prompt-input",
		description: "A message field with attachments and a send button.",
	},
	{
		name: "Queue",
		href: "/ai-elements/queue",
		description: "The agent's todo list, split into what is left and what is done.",
	},
	{
		name: "Reasoning",
		href: "/ai-elements/reasoning",
		description: "The agent's thinking as it streams.",
	},
	{
		name: "Sources",
		href: "/ai-elements/sources",
		description: "The links the agent used for a reply.",
	},
	{
		name: "Stack Trace",
		href: "/ai-elements/stack-trace",
		description: "A failed tool call and its stack frames.",
	},
	{
		name: "Subagent",
		href: "/ai-elements/subagent",
		description: "A subagent run, with its tool calls and result.",
	},
	{
		name: "Suggestion",
		href: "/ai-elements/suggestion",
		description: "A short prompt you can send to the agent in one click.",
	},
	{
		name: "Task",
		href: "/ai-elements/task",
		description: "The steps the agent takes, as it takes them.",
	},
	{
		name: "Terminal",
		href: "/ai-elements/terminal",
		description: "A command the agent runs, with its output as it streams.",
	},
	{
		name: "Test Results",
		href: "/ai-elements/test-results",
		description: "A test run by the agent, with its suites and failures.",
	},
	{
		name: "Tool",
		href: "/ai-elements/tool",
		description: "A tool call the agent makes, from input to output.",
	},
];

export default function Page() {
	return (
		<div className="flex flex-col flex-1 gap-8 bg-background">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-32 tracking-tight! truncate">AI Elements</h1>
				<p className="text-muted-foreground text-20 font-normal! text-pretty">
					Patterns for agentic interfaces built from Optics and Base UI components. Copy-ready
					blocks for traces, threads, approvals, and tool outputs.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col gap-6 p-6 lg:p-12 pt-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{AI_ELEMENTS.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="group flex flex-col justify-between gap-2 rounded-xl border bg-card p-5 text-card-foreground transition-colors hover:bg-muted/50"
						>
							<div className="flex items-center justify-between gap-2">
								<h2 className="text-sm font-medium">{item.name}</h2>
								<ArrowRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
							</div>
							<p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
						</Link>
					))}
				</div>

				<div className="mt-2 text-center text-sm text-muted-foreground">
					<p>Showing {AI_ELEMENTS.length} AI elements</p>
				</div>
			</div>
		</div>
	);
}
