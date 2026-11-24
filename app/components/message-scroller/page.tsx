"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { ManualFile } from "@/components/installation-guide";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/message-scroller.json";
import componentCode from "@/registry/optics/dist/message-scroller.tsx.txt";
import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "@/registry/optics/message-scroller";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/message-scroller.tsx",
		code: componentCode,
	},
];

interface DemoMessage {
	id: string;
	sender: "Assistant" | "You";
	text: string;
}

const initialMessages: DemoMessage[] = [
	{
		id: "msg-1",
		sender: "Assistant",
		text: "Welcome! Scroll up to reveal the scroll-to-latest control.",
	},
	{
		id: "msg-2",
		sender: "You",
		text: "How does sticky-to-bottom tracking work when new items arrive?",
	},
	{
		id: "msg-3",
		sender: "Assistant",
		text: "When you stay at the bottom with autoScroll enabled, new messages keep the viewport pinned.",
	},
	{
		id: "msg-4",
		sender: "You",
		text: "What happens if I scroll up to read earlier messages?",
	},
	{
		id: "msg-5",
		sender: "Assistant",
		text: "Auto-scrolling pauses automatically so your reading position stays fixed.",
	},
	{
		id: "msg-6",
		sender: "You",
		text: "And the floating button lets me jump right back down?",
	},
	{
		id: "msg-7",
		sender: "Assistant",
		text: "Yes. Click it anytime to smoothly scroll back to the latest message.",
	},
];

export default function Page() {
	const [messages, setMessages] = useState<DemoMessage[]>(initialMessages);

	function handleAddMessage() {
		setMessages((prev) => [
			...prev,
			{
				id: `msg-${prev.length + 1}`,
				sender: prev.length % 2 === 0 ? "Assistant" : "You",
				text:
					prev.length % 2 === 0
						? `Follow-up reply #${prev.length + 1} appended to the scroller.`
						: `New message #${prev.length + 1} added to test sticky scrolling.`,
			},
		]);
	}

	const demoComponent = (
		<div className="flex w-full max-w-md flex-col items-center gap-4">
			<MessageScrollerProvider autoScroll>
				<MessageScroller className="h-64 w-full max-w-md rounded-xl border bg-background">
					<MessageScrollerViewport>
						<MessageScrollerContent className="gap-3 p-4">
							{messages.map((message) => (
								<MessageScrollerItem
									key={message.id}
									messageId={message.id}
									className="flex flex-col"
								>
									<div
										className={
											message.sender === "You"
												? "max-w-[80%] self-end rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground"
												: "max-w-[80%] self-start rounded-xl bg-muted px-3 py-2 text-sm text-foreground"
										}
									>
										{message.text}
									</div>
								</MessageScrollerItem>
							))}
						</MessageScrollerContent>
					</MessageScrollerViewport>
					<MessageScrollerButton />
				</MessageScroller>
			</MessageScrollerProvider>
			<Button variant="outline" size="sm" onClick={handleAddMessage}>
				<Plus />
				Add message
			</Button>
		</div>
	);

	const componentConfig: ComponentConfigData = {
		header: {
			title: "Message Scroller",
			description:
				"Scrollable message viewport with sticky-to-bottom tracking and scroll-to-latest control.",
			href: "https://ui.shadcn.com/docs/components/message-scroller",
			hrefText: "shadcn/ui",
		},
		content: {
			children: demoComponent,
			imports: `import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/optics/button";
import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "@/components/optics/message-scroller";

const [messages, setMessages] = useState(initialMessages);

function handleAddMessage() {
	setMessages((prev) => [
		...prev,
		{
			id: \`msg-\${prev.length + 1}\`,
			sender: prev.length % 2 === 0 ? "Assistant" : "You",
			text: \`Message #\${prev.length + 1} added to test sticky scrolling.\`,
		},
	]);
}`,
			filename: "message-scroller.tsx",
		},
		installation: {
			componentName: "message-scroller",
			dependencies: "@shadcn/react lucide-react",
			manualFiles: componentFiles,
		},
		props: generatedProps,
	};

	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
