"use client";

import * as React from "react";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Bubble, BubbleContent } from "@/registry/optics/bubble";
import { Button, type ButtonProps } from "@/registry/optics/button";
import { Message, MessageContent, MessageFooter, MessageHeader } from "@/registry/optics/message";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/optics/tooltip";

export type AIMessageFrom = "user" | "assistant";

interface AIMessageContextValue {
	from: AIMessageFrom;
}

const AIMessageContext = React.createContext<AIMessageContextValue>({
	from: "assistant",
});

export interface AIMessageProps extends Omit<React.ComponentProps<typeof Message>, "align"> {
	from: AIMessageFrom;
	align?: "start" | "end";
}

function AIMessage({ from, align, className = "", ...props }: AIMessageProps) {
	const resolvedAlign = align ?? (from === "user" ? "end" : "start");

	return (
		<AIMessageContext.Provider value={{ from }}>
			<Message
				data-slot="ai-message"
				data-from={from}
				align={resolvedAlign}
				className={cn(className)}
				{...props}
			/>
		</AIMessageContext.Provider>
	);
}

export interface AIMessageContentProps extends React.ComponentProps<typeof MessageContent> {
	header?: React.ReactNode;
	bubbleVariant?: React.ComponentProps<typeof Bubble>["variant"];
}

function AIMessageContent({
	header,
	bubbleVariant = "muted",
	className = "",
	children,
	...props
}: AIMessageContentProps) {
	const { from } = React.useContext(AIMessageContext);

	return (
		<MessageContent data-slot="ai-message-content" className={cn("gap-2", className)} {...props}>
			{header !== undefined && (
				<MessageHeader className={from === "assistant" ? "px-0" : undefined}>
					{header}
				</MessageHeader>
			)}
			{from === "user" ? (
				<Bubble align="end" variant={bubbleVariant}>
					<BubbleContent>{children}</BubbleContent>
				</Bubble>
			) : (
				children
			)}
		</MessageContent>
	);
}

export type AIMessageActionsProps = React.ComponentProps<typeof MessageFooter>;

function AIMessageActions({ className = "", ...props }: AIMessageActionsProps) {
	const { from } = React.useContext(AIMessageContext);

	return (
		<MessageFooter
			data-slot="ai-message-actions"
			className={cn("gap-1", from === "assistant" && "px-0", className)}
			{...props}
		/>
	);
}

export interface AIMessageActionProps extends ButtonProps {
	tooltip?: string;
	label?: string;
}

function AIMessageAction({
	tooltip,
	label,
	variant = "ghost",
	size = "icon-sm",
	type = "button",
	className = "",
	children,
	...props
}: AIMessageActionProps) {
	const resolvedTooltip = tooltip ?? label;
	const ariaLabel = props["aria-label"] ?? label ?? tooltip;

	const button = (
		<Button
			data-slot="ai-message-action"
			type={type}
			variant={variant}
			size={size}
			aria-label={ariaLabel}
			className={className}
			{...props}
		>
			{children}
		</Button>
	);

	if (resolvedTooltip === undefined) {
		return button;
	}

	return (
		<Tooltip>
			<TooltipTrigger render={button} />
			<TooltipContent>{resolvedTooltip}</TooltipContent>
		</Tooltip>
	);
}

interface AIMessageBranchContextValue {
	currentBranch: number;
	totalBranches: number;
	goToPrevious: () => void;
	goToNext: () => void;
	goToBranch: (index: number) => void;
}

const AIMessageBranchContext = React.createContext<AIMessageBranchContextValue>({
	currentBranch: 0,
	totalBranches: 0,
	goToPrevious: () => {},
	goToNext: () => {},
	goToBranch: () => {},
});

export interface AIMessageBranchProps extends React.ComponentProps<"div"> {
	defaultBranch?: number;
	branch?: number;
	onBranchChange?: (branchIndex: number) => void;
}

function isBranchControlElement(node: React.ReactNode): boolean {
	return (
		React.isValidElement(node) &&
		(node.type === AIMessageBranchPrevious ||
			node.type === AIMessageBranchNext ||
			node.type === AIMessageBranchPage ||
			node.type === AIMessageActions)
	);
}

function AIMessageBranch({
	defaultBranch = 0,
	branch,
	onBranchChange,
	className = "",
	children,
	...props
}: AIMessageBranchProps) {
	const [uncontrolledBranch, setUncontrolledBranch] = React.useState(defaultBranch);

	const nodes = React.Children.toArray(children);
	const branches: React.ReactNode[] = [];
	const controls: React.ReactNode[] = [];

	for (const node of nodes) {
		if (isBranchControlElement(node)) {
			controls.push(node);
		} else {
			branches.push(node);
		}
	}

	const totalBranches = branches.length;
	const isControlled = branch !== undefined;
	const rawBranch = isControlled ? branch : uncontrolledBranch;
	const currentBranch = totalBranches > 0 ? Math.min(Math.max(rawBranch, 0), totalBranches - 1) : 0;

	const goToBranch = React.useCallback(
		(nextIndex: number) => {
			if (totalBranches <= 0) {
				return;
			}
			const normalized = ((nextIndex % totalBranches) + totalBranches) % totalBranches;
			if (!isControlled) {
				setUncontrolledBranch(normalized);
			}
			onBranchChange?.(normalized);
		},
		[isControlled, onBranchChange, totalBranches],
	);

	const goToPrevious = React.useCallback(() => {
		goToBranch(currentBranch - 1);
	}, [currentBranch, goToBranch]);

	const goToNext = React.useCallback(() => {
		goToBranch(currentBranch + 1);
	}, [currentBranch, goToBranch]);

	return (
		<AIMessageBranchContext.Provider
			value={{
				currentBranch,
				totalBranches,
				goToPrevious,
				goToNext,
				goToBranch,
			}}
		>
			<div
				data-slot="ai-message-branch"
				className={cn("flex w-full min-w-0 flex-col gap-2", className)}
				{...props}
			>
				{branches.map((branchNode, index) => (
					<div
						key={
							React.isValidElement(branchNode) && branchNode.key !== null ? branchNode.key : index
						}
						hidden={index !== currentBranch}
						className={index === currentBranch ? "min-w-0" : "hidden"}
					>
						{branchNode}
					</div>
				))}
				{controls.length > 0 && <div className="flex items-center gap-1">{controls}</div>}
			</div>
		</AIMessageBranchContext.Provider>
	);
}

export type AIMessageBranchPreviousProps = ButtonProps;

function AIMessageBranchPrevious({
	variant = "ghost",
	size = "icon-sm",
	type = "button",
	disabled,
	onClick,
	children,
	...props
}: AIMessageBranchPreviousProps) {
	const { totalBranches, goToPrevious } = React.useContext(AIMessageBranchContext);

	return (
		<Button
			data-slot="ai-message-branch-previous"
			type={type}
			variant={variant}
			size={size}
			disabled={disabled ?? totalBranches <= 1}
			aria-label={props["aria-label"] ?? "Previous branch"}
			onClick={(event) => {
				onClick?.(event);
				if (!event.defaultPrevented) {
					goToPrevious();
				}
			}}
			{...props}
		>
			{children ?? <ChevronLeftIcon />}
		</Button>
	);
}

export type AIMessageBranchNextProps = ButtonProps;

function AIMessageBranchNext({
	variant = "ghost",
	size = "icon-sm",
	type = "button",
	disabled,
	onClick,
	children,
	...props
}: AIMessageBranchNextProps) {
	const { totalBranches, goToNext } = React.useContext(AIMessageBranchContext);

	return (
		<Button
			data-slot="ai-message-branch-next"
			type={type}
			variant={variant}
			size={size}
			disabled={disabled ?? totalBranches <= 1}
			aria-label={props["aria-label"] ?? "Next branch"}
			onClick={(event) => {
				onClick?.(event);
				if (!event.defaultPrevented) {
					goToNext();
				}
			}}
			{...props}
		>
			{children ?? <ChevronRightIcon />}
		</Button>
	);
}

export type AIMessageBranchPageProps = React.ComponentProps<"span">;

function AIMessageBranchPage({ className = "", children, ...props }: AIMessageBranchPageProps) {
	const { currentBranch, totalBranches } = React.useContext(AIMessageBranchContext);

	return (
		<span
			data-slot="ai-message-branch-page"
			className={cn("px-1 text-xs font-medium text-muted-foreground tabular-nums", className)}
			{...props}
		>
			{children ?? (totalBranches > 0 ? `${currentBranch + 1} of ${totalBranches}` : "0 of 0")}
		</span>
	);
}

export interface AIMessageCopyButtonProps extends Omit<
	AIMessageActionProps,
	"value" | "onCopy" | "onError"
> {
	value: string;
	timeout?: number;
	onCopy?: () => void;
	onError?: (error: Error) => void;
}

function AIMessageCopyButton({
	value,
	timeout = 2000,
	onCopy,
	onError,
	onClick,
	tooltip,
	label,
	children,
	...props
}: AIMessageCopyButtonProps) {
	const [copied, setCopied] = React.useState(false);

	React.useEffect(() => {
		if (!copied) {
			return;
		}
		const timer = setTimeout(() => setCopied(false), timeout);
		return () => clearTimeout(timer);
	}, [copied, timeout]);

	const handleClick: NonNullable<AIMessageCopyButtonProps["onClick"]> = async (event) => {
		onClick?.(event);
		if (event.defaultPrevented || typeof window === "undefined" || !value) {
			return;
		}
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			onCopy?.();
		} catch (error) {
			onError?.(error instanceof Error ? error : new Error(String(error)));
		}
	};

	const resolvedLabel = copied ? "Copied" : (label ?? tooltip ?? "Copy");
	const resolvedTooltip = copied ? "Copied" : (tooltip ?? label ?? "Copy");

	return (
		<AIMessageAction
			data-slot="ai-message-copy-button"
			tooltip={resolvedTooltip}
			label={resolvedLabel}
			onClick={handleClick}
			{...props}
		>
			{children ?? (copied ? <CheckIcon /> : <CopyIcon />)}
		</AIMessageAction>
	);
}

AIMessage.displayName = "AIMessage";
AIMessageContent.displayName = "AIMessageContent";
AIMessageActions.displayName = "AIMessageActions";
AIMessageAction.displayName = "AIMessageAction";
AIMessageBranch.displayName = "AIMessageBranch";
AIMessageBranchPrevious.displayName = "AIMessageBranchPrevious";
AIMessageBranchNext.displayName = "AIMessageBranchNext";
AIMessageBranchPage.displayName = "AIMessageBranchPage";
AIMessageCopyButton.displayName = "AIMessageCopyButton";

export {
	AIMessage,
	AIMessageContent,
	AIMessageActions,
	AIMessageAction,
	AIMessageBranch,
	AIMessageBranchPrevious,
	AIMessageBranchNext,
	AIMessageBranchPage,
	AIMessageCopyButton,
};
