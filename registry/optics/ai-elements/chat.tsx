"use client";

import type * as React from "react";
import { MessageCircleDashedIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/optics/empty";
import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "@/registry/optics/message-scroller";

export type ChatProps = React.ComponentProps<typeof MessageScroller> &
	Pick<
		React.ComponentProps<typeof MessageScrollerProvider>,
		| "autoScroll"
		| "defaultScrollPosition"
		| "scrollEdgeThreshold"
		| "scrollPreviousItemPeek"
		| "scrollMargin"
	>;

function Chat({
	autoScroll = true,
	defaultScrollPosition = "end",
	scrollEdgeThreshold,
	scrollPreviousItemPeek,
	scrollMargin,
	className = "",
	children,
	...props
}: ChatProps) {
	return (
		<MessageScrollerProvider
			autoScroll={autoScroll}
			defaultScrollPosition={defaultScrollPosition}
			scrollEdgeThreshold={scrollEdgeThreshold}
			scrollPreviousItemPeek={scrollPreviousItemPeek}
			scrollMargin={scrollMargin}
		>
			<MessageScroller
				data-slot="chat"
				className={cn("flex size-full min-h-0 flex-col", className)}
				{...props}
			>
				{children}
			</MessageScroller>
		</MessageScrollerProvider>
	);
}

export type ChatViewportProps = React.ComponentProps<typeof MessageScrollerViewport>;

function ChatViewport({ className = "", ...props }: ChatViewportProps) {
	return (
		<MessageScrollerViewport
			data-slot="chat-viewport"
			className={cn("h-auto min-h-0 flex-1", className)}
			{...props}
		/>
	);
}

export type ChatContentProps = React.ComponentProps<typeof MessageScrollerContent>;

function ChatContent({ className = "", ...props }: ChatContentProps) {
	return (
		<MessageScrollerContent data-slot="chat-content" className={cn("p-4", className)} {...props} />
	);
}

export type ChatTurnProps = React.ComponentProps<typeof MessageScrollerItem>;

function ChatTurn({ className = "", scrollAnchor = false, ...props }: ChatTurnProps) {
	return (
		<MessageScrollerItem
			data-slot="chat-turn"
			scrollAnchor={scrollAnchor}
			className={cn(className)}
			{...props}
		/>
	);
}

export type ChatEmptyProps = Omit<React.ComponentProps<typeof Empty>, "title"> & {
	icon?: React.ReactNode;
	title?: React.ReactNode;
	description?: React.ReactNode;
};

function ChatEmpty({
	className = "",
	icon,
	title,
	description,
	children,
	...props
}: ChatEmptyProps) {
	const hasHeaderProps = icon !== undefined || title !== undefined || description !== undefined;

	if (children !== undefined && !hasHeaderProps) {
		return (
			<Empty data-slot="chat-empty" className={cn("h-full min-h-full", className)} {...props}>
				{children}
			</Empty>
		);
	}

	const resolvedIcon = icon === undefined ? <MessageCircleDashedIcon /> : icon;
	const resolvedTitle = title === undefined ? "No messages yet" : title;
	const resolvedDescription =
		description === undefined ? "Start a conversation to see messages here." : description;

	return (
		<Empty data-slot="chat-empty" className={cn("h-full min-h-full", className)} {...props}>
			<EmptyHeader>
				{resolvedIcon && <EmptyMedia variant="icon">{resolvedIcon}</EmptyMedia>}
				{resolvedTitle && <EmptyTitle>{resolvedTitle}</EmptyTitle>}
				{resolvedDescription && <EmptyDescription>{resolvedDescription}</EmptyDescription>}
			</EmptyHeader>
			{children}
		</Empty>
	);
}

export type ChatFooterProps = React.ComponentProps<"div">;

function ChatFooter({ className = "", ...props }: ChatFooterProps) {
	return (
		<div
			data-slot="chat-footer"
			className={cn("relative z-10 shrink-0 px-4 pt-2 pb-4", className)}
			{...props}
		/>
	);
}

export type ChatScrollButtonProps = React.ComponentProps<typeof MessageScrollerButton>;

function ChatScrollButton({ className = "", direction = "end", ...props }: ChatScrollButtonProps) {
	if (direction === "start") {
		return (
			<MessageScrollerButton
				data-slot="chat-scroll-button"
				direction={direction}
				className={cn(className)}
				{...props}
			/>
		);
	}

	return (
		<div data-slot="chat-scroll-button-anchor" className="relative z-20 h-0 w-full shrink-0">
			<MessageScrollerButton
				data-slot="chat-scroll-button"
				direction={direction}
				className={cn(className)}
				{...props}
			/>
		</div>
	);
}

Chat.displayName = "Chat";
ChatViewport.displayName = "ChatViewport";
ChatContent.displayName = "ChatContent";
ChatTurn.displayName = "ChatTurn";
ChatEmpty.displayName = "ChatEmpty";
ChatFooter.displayName = "ChatFooter";
ChatScrollButton.displayName = "ChatScrollButton";

export { Chat, ChatViewport, ChatContent, ChatTurn, ChatEmpty, ChatFooter, ChatScrollButton };
