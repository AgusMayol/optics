"use client";

import * as React from "react";
import {
	ArrowUpIcon,
	FileTextIcon,
	ImageIcon,
	Loader2Icon,
	PlusIcon,
	SquareIcon,
	XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
	Attachment,
	AttachmentAction,
	AttachmentActions,
	AttachmentContent,
	AttachmentDescription,
	AttachmentGroup,
	AttachmentMedia,
	AttachmentTitle,
} from "@/registry/optics/attachment";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupTextarea,
} from "@/registry/optics/input-group";

export type PromptInputStatus = "ready" | "submitted" | "streaming" | "error";

interface PromptInputAttachmentEntry {
	id: string;
	file: File;
}

interface PromptInputContextValue {
	text: string;
	setText: (value: string) => void;
	attachments: PromptInputAttachmentEntry[];
	addFiles: (files: File[]) => void;
	removeFile: (index: number) => void;
	clearFiles: () => void;
	openFileDialog: () => void;
	status: PromptInputStatus;
	disabled: boolean;
}

const PromptInputContext = React.createContext<PromptInputContextValue | null>(null);

function formatFileSize(bytes: number): string {
	if (bytes < 1024) {
		return `${bytes} B`;
	}
	const kilobytes = bytes / 1024;
	if (kilobytes < 1024) {
		return `${kilobytes.toFixed(1)} KB`;
	}
	return `${(kilobytes / 1024).toFixed(1)} MB`;
}

function createAttachmentId(): string {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
		return crypto.randomUUID();
	}
	return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export type PromptInputProps = Omit<React.ComponentProps<"form">, "onSubmit"> & {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	files?: File[];
	onFilesChange?: (files: File[]) => void;
	onSubmitMessage?: (text: string, files: File[]) => void;
	onSubmit?: React.ComponentProps<"form">["onSubmit"];
	accept?: string;
	multiple?: boolean;
	status?: PromptInputStatus;
	disabled?: boolean;
	inputGroupClassName?: string;
};

function PromptInput({
	className = "",
	inputGroupClassName = "",
	value,
	defaultValue = "",
	onValueChange,
	files: filesProp,
	onFilesChange,
	onSubmitMessage,
	onSubmit,
	accept,
	multiple = true,
	status = "ready",
	disabled = false,
	children,
	...props
}: PromptInputProps) {
	const [internalText, setInternalText] = React.useState(defaultValue);
	const [internalAttachments, setInternalAttachments] = React.useState<
		PromptInputAttachmentEntry[]
	>([]);
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const isTextControlled = value !== undefined;
	const text = isTextControlled ? value : internalText;

	const isFilesControlled = filesProp !== undefined;
	const attachments = React.useMemo<PromptInputAttachmentEntry[]>(
		() =>
			isFilesControlled
				? filesProp.map((file, index) => ({
						id: `${file.name}-${file.size}-${file.lastModified}-${index}`,
						file,
					}))
				: internalAttachments,
		[filesProp, internalAttachments, isFilesControlled],
	);

	const setText = React.useCallback(
		(nextText: string) => {
			if (!isTextControlled) {
				setInternalText(nextText);
			}
			onValueChange?.(nextText);
		},
		[isTextControlled, onValueChange],
	);

	const addFiles = React.useCallback(
		(incoming: File[]) => {
			if (incoming.length === 0) {
				return;
			}
			if (isFilesControlled) {
				onFilesChange?.([...filesProp, ...incoming]);
				return;
			}
			const nextEntries = incoming.map((file) => ({
				id: createAttachmentId(),
				file,
			}));
			setInternalAttachments((current) => {
				const updated = [...current, ...nextEntries];
				onFilesChange?.(updated.map((entry) => entry.file));
				return updated;
			});
		},
		[filesProp, isFilesControlled, onFilesChange],
	);

	const removeFile = React.useCallback(
		(index: number) => {
			if (isFilesControlled) {
				onFilesChange?.(filesProp.filter((_, itemIndex) => itemIndex !== index));
				return;
			}
			setInternalAttachments((current) => {
				const updated = current.filter((_, itemIndex) => itemIndex !== index);
				onFilesChange?.(updated.map((entry) => entry.file));
				return updated;
			});
		},
		[filesProp, isFilesControlled, onFilesChange],
	);

	const clearFiles = React.useCallback(() => {
		if (isFilesControlled) {
			onFilesChange?.([]);
			return;
		}
		setInternalAttachments([]);
		onFilesChange?.([]);
	}, [isFilesControlled, onFilesChange]);

	const openFileDialog = React.useCallback(() => {
		if (disabled) {
			return;
		}
		fileInputRef.current?.click();
	}, [disabled]);

	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selected = event.target.files;
		if (!selected || selected.length === 0) {
			return;
		}
		addFiles(Array.from(selected));
		event.target.value = "";
	};

	const handleFormSubmit = (
		event: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0],
	) => {
		onSubmit?.(event);
		if (event.defaultPrevented) {
			return;
		}
		event.preventDefault();
		if (disabled) {
			return;
		}

		const textareaElement = event.currentTarget.querySelector<HTMLTextAreaElement>("textarea");
		const submittedText = isTextControlled ? text : (textareaElement?.value ?? text);
		const submittedFiles = attachments.map((entry) => entry.file);

		if (submittedText.trim().length === 0 && submittedFiles.length === 0) {
			return;
		}

		onSubmitMessage?.(submittedText, submittedFiles);

		if (!isTextControlled) {
			setInternalText("");
			onValueChange?.("");
		}
		if (!isFilesControlled) {
			setInternalAttachments([]);
			onFilesChange?.([]);
		}
	};

	const contextValue = React.useMemo<PromptInputContextValue>(
		() => ({
			text,
			setText,
			attachments,
			addFiles,
			removeFile,
			clearFiles,
			openFileDialog,
			status,
			disabled,
		}),
		[
			text,
			setText,
			attachments,
			addFiles,
			removeFile,
			clearFiles,
			openFileDialog,
			status,
			disabled,
		],
	);

	return (
		<PromptInputContext.Provider value={contextValue}>
			<form
				data-slot="prompt-input"
				onSubmit={handleFormSubmit}
				className={cn("w-full min-w-0", className)}
				{...props}
			>
				<input
					ref={fileInputRef}
					type="file"
					multiple={multiple}
					accept={accept}
					disabled={disabled}
					tabIndex={-1}
					aria-hidden="true"
					className="sr-only"
					onChange={handleFileInputChange}
				/>
				<InputGroup className={cn("w-full", inputGroupClassName)}>{children}</InputGroup>
			</form>
		</PromptInputContext.Provider>
	);
}

export type PromptInputTextareaProps = React.ComponentProps<typeof InputGroupTextarea> & {
	submitOnEnter?: boolean;
};

function PromptInputTextarea({
	className = "",
	value,
	onChange,
	onKeyDown,
	disabled,
	submitOnEnter = true,
	...props
}: PromptInputTextareaProps) {
	const context = React.useContext(PromptInputContext);
	const isControlled = value !== undefined;
	const resolvedDisabled = disabled ?? context?.disabled ?? false;

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (!isControlled && context) {
			context.setText(event.target.value);
		}
		onChange?.(event);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		onKeyDown?.(event);
		if (event.defaultPrevented || !submitOnEnter) {
			return;
		}
		if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
			event.preventDefault();
			event.currentTarget.form?.requestSubmit();
		}
	};

	return (
		<InputGroupTextarea
			data-slot="prompt-input-textarea"
			value={isControlled ? value : (context?.text ?? undefined)}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			disabled={resolvedDisabled}
			className={cn("p-3", className)}
			{...props}
		/>
	);
}

export type PromptInputToolbarProps = Omit<React.ComponentProps<typeof InputGroupAddon>, "align">;

function PromptInputToolbar({ className = "", children, ...props }: PromptInputToolbarProps) {
	return (
		<InputGroupAddon
			data-slot="prompt-input-toolbar"
			align="block-end"
			className={cn("justify-between gap-1", className)}
			{...props}
		>
			{children}
		</InputGroupAddon>
	);
}

export type PromptInputToolsProps = React.ComponentProps<"div">;

function PromptInputTools({ className = "", ...props }: PromptInputToolsProps) {
	return (
		<div
			data-slot="prompt-input-tools"
			className={cn("flex min-w-0 items-center gap-1", className)}
			{...props}
		/>
	);
}

export type PromptInputAttachmentsProps = Omit<
	React.ComponentProps<typeof InputGroupAddon>,
	"align" | "children"
> & {
	children?: React.ReactNode | ((file: File, index: number) => React.ReactNode);
};

function PromptInputAttachments({
	className = "",
	children,
	...props
}: PromptInputAttachmentsProps) {
	const context = React.useContext(PromptInputContext);
	const attachments = context?.attachments ?? [];

	if (typeof children === "function") {
		if (attachments.length === 0) {
			return null;
		}
		return (
			<InputGroupAddon
				data-slot="prompt-input-attachments"
				align="block-start"
				className={cn("w-full min-w-0", className)}
				{...props}
			>
				<AttachmentGroup className="w-full">
					{attachments.map((entry, index) => children(entry.file, index))}
				</AttachmentGroup>
			</InputGroupAddon>
		);
	}

	if (children !== undefined) {
		return (
			<InputGroupAddon
				data-slot="prompt-input-attachments"
				align="block-start"
				className={cn("w-full min-w-0", className)}
				{...props}
			>
				<AttachmentGroup className="w-full">{children}</AttachmentGroup>
			</InputGroupAddon>
		);
	}

	if (attachments.length === 0) {
		return null;
	}

	return (
		<InputGroupAddon
			data-slot="prompt-input-attachments"
			align="block-start"
			className={cn("w-full min-w-0", className)}
			{...props}
		>
			<AttachmentGroup className="w-full">
				{attachments.map((entry, index) => (
					<Attachment key={entry.id} size="sm">
						<AttachmentMedia>
							{entry.file.type.startsWith("image/") ? <ImageIcon /> : <FileTextIcon />}
						</AttachmentMedia>
						<AttachmentContent>
							<AttachmentTitle>{entry.file.name}</AttachmentTitle>
							<AttachmentDescription>{formatFileSize(entry.file.size)}</AttachmentDescription>
						</AttachmentContent>
						<AttachmentActions>
							<AttachmentAction
								type="button"
								aria-label={`Remove ${entry.file.name}`}
								onClick={() => context?.removeFile(index)}
							>
								<XIcon />
							</AttachmentAction>
						</AttachmentActions>
					</Attachment>
				))}
			</AttachmentGroup>
		</InputGroupAddon>
	);
}

export type PromptInputAttachButtonProps = React.ComponentProps<typeof InputGroupButton> & {
	accept?: string;
	multiple?: boolean;
	onFilesSelected?: (files: File[]) => void;
};

function PromptInputAttachButton({
	className = "",
	size = "icon-sm",
	variant = "outline",
	accept,
	multiple,
	onFilesSelected,
	onClick,
	disabled,
	children,
	...props
}: PromptInputAttachButtonProps) {
	const context = React.useContext(PromptInputContext);
	const localInputRef = React.useRef<HTMLInputElement>(null);
	const resolvedDisabled = disabled ?? context?.disabled ?? false;
	const needsLocalInput =
		!context || accept !== undefined || multiple !== undefined || onFilesSelected !== undefined;

	const handleButtonClick = (
		event: Parameters<NonNullable<React.ComponentProps<typeof InputGroupButton>["onClick"]>>[0],
	) => {
		onClick?.(event);
		if (event.defaultPrevented || resolvedDisabled) {
			return;
		}
		if (needsLocalInput) {
			localInputRef.current?.click();
			return;
		}
		context.openFileDialog();
	};

	const handleLocalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selected = event.target.files;
		if (!selected || selected.length === 0) {
			return;
		}
		const selectedFiles = Array.from(selected);
		context?.addFiles(selectedFiles);
		onFilesSelected?.(selectedFiles);
		event.target.value = "";
	};

	return (
		<>
			{needsLocalInput && (
				<input
					ref={localInputRef}
					type="file"
					multiple={multiple ?? true}
					accept={accept}
					disabled={resolvedDisabled}
					tabIndex={-1}
					aria-hidden="true"
					className="sr-only"
					onChange={handleLocalInputChange}
				/>
			)}
			<InputGroupButton
				data-slot="prompt-input-attach-button"
				type="button"
				size={size}
				variant={variant}
				disabled={resolvedDisabled}
				aria-label="Attach files"
				className={cn("rounded-full", className)}
				onClick={handleButtonClick}
				{...props}
			>
				{children ?? <PlusIcon />}
			</InputGroupButton>
		</>
	);
}

export type PromptInputSubmitProps = React.ComponentProps<typeof InputGroupButton> & {
	status?: PromptInputStatus;
	onStop?: () => void;
};

function PromptInputSubmit({
	className = "",
	size = "icon-sm",
	variant = "default",
	status: statusProp,
	onStop,
	onClick,
	type,
	disabled,
	children,
	...props
}: PromptInputSubmitProps) {
	const context = React.useContext(PromptInputContext);
	const resolvedStatus = statusProp ?? context?.status ?? "ready";
	const resolvedDisabled =
		disabled ?? ((context?.disabled ?? false) || resolvedStatus === "submitted");

	const resolvedType = type ?? (resolvedStatus === "streaming" && onStop ? "button" : "submit");

	const handleClick = (
		event: Parameters<NonNullable<React.ComponentProps<typeof InputGroupButton>["onClick"]>>[0],
	) => {
		onClick?.(event);
		if (event.defaultPrevented) {
			return;
		}
		if (resolvedStatus === "streaming") {
			onStop?.();
		}
	};

	let icon: React.ReactNode = <ArrowUpIcon />;
	let defaultAriaLabel = "Send";

	if (resolvedStatus === "submitted") {
		icon = <Loader2Icon className="animate-spin" />;
		defaultAriaLabel = "Sending";
	} else if (resolvedStatus === "streaming") {
		icon = <SquareIcon className="fill-current" />;
		defaultAriaLabel = "Stop";
	} else if (resolvedStatus === "error") {
		icon = <XIcon />;
		defaultAriaLabel = "Retry";
	}

	return (
		<InputGroupButton
			data-slot="prompt-input-submit"
			data-status={resolvedStatus}
			type={resolvedType}
			size={size}
			variant={variant}
			disabled={resolvedDisabled}
			aria-label={defaultAriaLabel}
			className={cn("rounded-full", className)}
			onClick={handleClick}
			{...props}
		>
			{children ?? icon}
		</InputGroupButton>
	);
}

PromptInput.displayName = "PromptInput";
PromptInputTextarea.displayName = "PromptInputTextarea";
PromptInputToolbar.displayName = "PromptInputToolbar";
PromptInputTools.displayName = "PromptInputTools";
PromptInputAttachments.displayName = "PromptInputAttachments";
PromptInputAttachButton.displayName = "PromptInputAttachButton";
PromptInputSubmit.displayName = "PromptInputSubmit";

export {
	PromptInput,
	PromptInputTextarea,
	PromptInputToolbar,
	PromptInputTools,
	PromptInputAttachments,
	PromptInputAttachButton,
	PromptInputSubmit,
};
