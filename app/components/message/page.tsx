"use client";
import type { ManualFile } from "@/components/installation-guide";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/optics/avatar";
import { Bubble, BubbleContent } from "@/registry/optics/bubble";
import generatedProps from "@/registry/optics/dist/message.json";
import componentCode from "@/registry/optics/dist/message.tsx.txt";
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from "@/registry/optics/message";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/message.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<MessageGroup className="w-full max-w-md">
		<Message align="start">
			<MessageAvatar>
				<Avatar className="ring-0">
					<AvatarImage src="/images/logo.svg" alt="Optics" />
					<AvatarFallback>OP</AvatarFallback>
				</Avatar>
			</MessageAvatar>
			<MessageContent>
				<MessageHeader>Optics Assistant</MessageHeader>
				<Bubble variant="muted">
					<BubbleContent>
						Here is the structured message layout with aligned avatar, header, and footer slots.
					</BubbleContent>
				</Bubble>
				<MessageFooter>10:42 AM</MessageFooter>
			</MessageContent>
		</Message>

		<Message align="end">
			<MessageAvatar>
				<Avatar className="ring-0">
					<AvatarFallback>AM</AvatarFallback>
				</Avatar>
			</MessageAvatar>
			<MessageContent>
				<MessageHeader>You</MessageHeader>
				<Bubble>
					<BubbleContent>
						Looks great! Everything aligns cleanly on both start and end sides.
					</BubbleContent>
				</Bubble>
				<MessageFooter>10:43 AM</MessageFooter>
			</MessageContent>
		</Message>
	</MessageGroup>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Message",
		description:
			"Structured chat message container with header, avatar, content, and footer slots.",
		href: "https://ui.shadcn.com/docs/components/message",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/optics/avatar";
import { Bubble, BubbleContent } from "@/components/optics/bubble";
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from "@/components/optics/message";`,
		filename: "message.tsx",
	},
	installation: {
		componentName: "message",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
