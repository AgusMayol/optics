"use client";

import * as React from "react";
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge, type BadgeProps } from "@/registry/optics/badge";
import { Button, type ButtonProps } from "@/registry/optics/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/optics/collapsible";

export type FileTreeStatus = "added" | "modified" | "deleted";

interface FileTreeContextValue {
	selectedPath: string | undefined;
	selectPath: (path: string) => void;
}

const FileTreeContext = React.createContext<FileTreeContextValue>({
	selectedPath: undefined,
	selectPath: () => {},
});

const FileTreePathContext = React.createContext<string>("");

const statusMeta: Record<FileTreeStatus, { code: string; label: string; className: string }> = {
	added: {
		code: "A",
		label: "Added",
		className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
	},
	modified: {
		code: "M",
		label: "Modified",
		className: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
	},
	deleted: {
		code: "D",
		label: "Deleted",
		className: "border-destructive/30 bg-destructive/10 text-destructive",
	},
};

export interface FileTreeStatusBadgeProps extends Omit<BadgeProps, "variant"> {
	status: FileTreeStatus;
	variant?: BadgeProps["variant"];
}

function FileTreeStatusBadge({
	status,
	variant = "outline",
	className = "",
	children,
	...props
}: FileTreeStatusBadgeProps) {
	const meta = statusMeta[status];

	return (
		<Badge
			data-slot="file-tree-status-badge"
			data-status={status}
			variant={variant}
			aria-label={meta.label}
			title={meta.label}
			className={cn(
				"ml-auto h-4 shrink-0 px-1.5 font-mono text-[0.625rem] leading-none",
				meta.className,
				className,
			)}
			{...props}
		>
			{children ?? meta.code}
		</Badge>
	);
}

export interface FileTreeProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
	selectedPath?: string;
	defaultSelectedPath?: string;
	onSelectPath?: (path: string) => void;
}

function FileTree({
	selectedPath,
	defaultSelectedPath,
	onSelectPath,
	className = "",
	children,
	...props
}: FileTreeProps) {
	const [uncontrolledSelectedPath, setUncontrolledSelectedPath] = React.useState<
		string | undefined
	>(defaultSelectedPath);
	const isControlled = selectedPath !== undefined;
	const resolvedSelectedPath = isControlled ? selectedPath : uncontrolledSelectedPath;

	const selectPath = React.useCallback(
		(path: string) => {
			if (!isControlled) {
				setUncontrolledSelectedPath(path);
			}
			onSelectPath?.(path);
		},
		[isControlled, onSelectPath],
	);

	return (
		<FileTreeContext.Provider value={{ selectedPath: resolvedSelectedPath, selectPath }}>
			<div
				data-slot="file-tree"
				role="tree"
				className={cn(
					"flex w-full min-w-0 flex-col gap-0.5 rounded-lg border bg-card p-1.5 text-sm text-card-foreground",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</FileTreeContext.Provider>
	);
}

export interface FileTreeFolderProps extends Omit<
	React.ComponentProps<typeof Collapsible>,
	"className" | "open" | "onOpenChange"
> {
	name: string;
	path?: string;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	status?: FileTreeStatus;
	icon?: React.ReactNode;
	className?: string;
}

function FileTreeFolder({
	name,
	path,
	defaultOpen = false,
	open,
	onOpenChange,
	status,
	icon,
	disabled = false,
	className = "",
	children,
	...props
}: FileTreeFolderProps) {
	const parentPath = React.useContext(FileTreePathContext);
	const resolvedPath = path ?? (parentPath ? `${parentPath}/${name}` : name);

	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
	const isControlled = open !== undefined;
	const resolvedOpen = isControlled ? open : uncontrolledOpen;

	const handleOpenChange: NonNullable<React.ComponentProps<typeof Collapsible>["onOpenChange"]> = (
		nextOpen,
		eventDetails,
	) => {
		if (!isControlled && !eventDetails.isCanceled) {
			setUncontrolledOpen(nextOpen);
		}
		onOpenChange?.(nextOpen);
	};

	return (
		<FileTreePathContext.Provider value={resolvedPath}>
			<Collapsible
				data-slot="file-tree-folder"
				open={resolvedOpen}
				defaultOpen={defaultOpen}
				onOpenChange={handleOpenChange}
				disabled={disabled}
				className={cn("flex w-full min-w-0 flex-col", className)}
				{...props}
			>
				<CollapsibleTrigger
					render={
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="h-7 w-full justify-start gap-1.5 px-2 font-normal text-foreground aria-expanded:bg-transparent aria-expanded:ring-0 aria-expanded:hover:bg-neutral-200 focus-visible:aria-expanded:ring-[2px] focus-visible:aria-expanded:ring-ring/30 dark:aria-expanded:hover:bg-accent"
						/>
					}
				>
					<ChevronRightIcon
						className={cn(
							"size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
							resolvedOpen && "rotate-90",
						)}
					/>
					{icon ??
						(resolvedOpen ? (
							<FolderOpenIcon className="size-3.5 shrink-0 text-muted-foreground" />
						) : (
							<FolderIcon className="size-3.5 shrink-0 text-muted-foreground" />
						))}
					<span
						className={cn(
							"min-w-0 truncate",
							status === "deleted" && "text-muted-foreground line-through",
						)}
					>
						{name}
					</span>
					{status !== undefined && <FileTreeStatusBadge status={status} />}
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div
						role="group"
						className="ml-3 flex flex-col gap-0.5 border-l border-border/60 pl-2 pt-0.5"
					>
						{children}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</FileTreePathContext.Provider>
	);
}

export interface FileTreeFileProps extends Omit<ButtonProps, "name" | "onSelect"> {
	name: string;
	path?: string;
	status?: FileTreeStatus;
	icon?: React.ReactNode;
	onSelect?: (path: string) => void;
}

function FileTreeFile({
	name,
	path,
	status,
	icon,
	onSelect,
	onClick,
	variant = "ghost",
	size = "sm",
	className = "",
	...props
}: FileTreeFileProps) {
	const { selectedPath, selectPath } = React.useContext(FileTreeContext);
	const parentPath = React.useContext(FileTreePathContext);
	const resolvedPath = path ?? (parentPath ? `${parentPath}/${name}` : name);
	const isSelected = selectedPath === resolvedPath;

	const handleClick: NonNullable<ButtonProps["onClick"]> = (event) => {
		onClick?.(event);
		if (!event.defaultPrevented) {
			selectPath(resolvedPath);
			onSelect?.(resolvedPath);
		}
	};

	return (
		<Button
			data-slot="file-tree-file"
			data-selected={isSelected ? "true" : undefined}
			type="button"
			variant={variant}
			size={size}
			aria-current={isSelected ? "true" : undefined}
			onClick={handleClick}
			className={cn(
				"h-7 w-full justify-start gap-1.5 px-2 pl-6 font-normal text-foreground",
				isSelected && "bg-accent text-accent-foreground hover:bg-accent",
				className,
			)}
			{...props}
		>
			{icon ?? <FileIcon className="size-3.5 shrink-0 text-muted-foreground" />}
			<span
				className={cn(
					"min-w-0 truncate",
					status === "deleted" && "text-muted-foreground line-through",
				)}
			>
				{name}
			</span>
			{status !== undefined && <FileTreeStatusBadge status={status} />}
		</Button>
	);
}

FileTree.displayName = "FileTree";
FileTreeFolder.displayName = "FileTreeFolder";
FileTreeFile.displayName = "FileTreeFile";
FileTreeStatusBadge.displayName = "FileTreeStatusBadge";

export { FileTree, FileTreeFolder, FileTreeFile, FileTreeStatusBadge };
