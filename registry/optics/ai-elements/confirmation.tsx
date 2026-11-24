"use client";

import * as React from "react";
import { CheckCircle2Icon, ShieldAlertIcon, XCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { Trace, TraceDescription, TraceIcon, TraceLine, TraceTitle } from "@/registry/optics/trace";

export type ConfirmationState = "approval-requested" | "approved" | "rejected";

export type ConfirmationApproval = {
	id: string;
	approved?: boolean;
	reason?: string;
};

type ConfirmationContextValue = {
	state: ConfirmationState;
	approval?: ConfirmationApproval;
};

const ConfirmationContext = React.createContext<ConfirmationContextValue | null>(null);

function useConfirmationContext(): ConfirmationContextValue {
	const context = React.useContext(ConfirmationContext);
	if (!context) {
		throw new Error("Confirmation subcomponents must be used within <Confirmation />.");
	}
	return context;
}

export type ConfirmationProps = React.ComponentProps<typeof Trace> & {
	state: ConfirmationState;
	approval?: ConfirmationApproval;
};

function Confirmation({ className = "", state, approval, children, ...props }: ConfirmationProps) {
	const value = React.useMemo(() => ({ state, approval }), [state, approval]);

	return (
		<ConfirmationContext.Provider value={value}>
			<Trace
				data-slot="confirmation"
				data-state={state}
				className={cn(
					"rounded-lg border p-3 transition-colors data-[state=approval-requested]:border-border data-[state=approval-requested]:bg-card data-[state=approved]:border-border/60 data-[state=approved]:bg-muted/30 data-[state=rejected]:border-destructive/30 data-[state=rejected]:bg-destructive/5",
					className,
				)}
				{...props}
			>
				{children}
			</Trace>
		</ConfirmationContext.Provider>
	);
}

export type ConfirmationTitleProps = Omit<React.ComponentProps<typeof TraceLine>, "status"> & {
	icon?: React.ReactNode;
	description?: React.ReactNode;
	badge?: React.ReactNode;
};

function renderStateIcon(state: ConfirmationState) {
	switch (state) {
		case "approval-requested":
			return <ShieldAlertIcon className="text-amber-600 dark:text-amber-400" />;
		case "approved":
			return <CheckCircle2Icon className="text-emerald-600 dark:text-emerald-400" />;
		case "rejected":
			return <XCircleIcon />;
	}
}

function renderStateBadge(state: ConfirmationState) {
	switch (state) {
		case "approval-requested":
			return <Badge variant="outline">Approval required</Badge>;
		case "approved":
			return <Badge variant="secondary">Approved</Badge>;
		case "rejected":
			return <Badge variant="destructive">Rejected</Badge>;
	}
}

function ConfirmationTitle({
	className = "",
	icon,
	description,
	badge,
	children,
	...props
}: ConfirmationTitleProps) {
	const { state } = useConfirmationContext();
	const resolvedIcon = icon === undefined ? renderStateIcon(state) : icon;
	const resolvedBadge = badge === undefined ? renderStateBadge(state) : badge;

	return (
		<TraceLine
			status={state === "rejected" ? "error" : undefined}
			className={cn("w-full text-foreground", className)}
			{...props}
		>
			{resolvedIcon && <TraceIcon>{resolvedIcon}</TraceIcon>}
			<TraceTitle className="flex-1">{children}</TraceTitle>
			{description !== undefined && <TraceDescription>{description}</TraceDescription>}
			{resolvedBadge}
		</TraceLine>
	);
}

export type ConfirmationRequestProps = {
	children?: React.ReactNode;
};

function ConfirmationRequest({ children = null }: ConfirmationRequestProps) {
	const { state } = useConfirmationContext();
	if (state !== "approval-requested") {
		return null;
	}
	return <>{children}</>;
}

export type ConfirmationAcceptedProps = {
	children?: React.ReactNode;
};

function ConfirmationAccepted({ children = null }: ConfirmationAcceptedProps) {
	const { state } = useConfirmationContext();
	if (state !== "approved") {
		return null;
	}
	return <>{children}</>;
}

export type ConfirmationRejectedProps = {
	children?: React.ReactNode;
};

function ConfirmationRejected({ children = null }: ConfirmationRejectedProps) {
	const { state } = useConfirmationContext();
	if (state !== "rejected") {
		return null;
	}
	return <>{children}</>;
}

export type ConfirmationActionsProps = React.ComponentProps<"div">;

function ConfirmationActions({ className = "", ...props }: ConfirmationActionsProps) {
	const { state } = useConfirmationContext();
	if (state !== "approval-requested") {
		return null;
	}

	return (
		<div
			data-slot="confirmation-actions"
			className={cn("flex flex-wrap items-center justify-end gap-2 pt-1", className)}
			{...props}
		/>
	);
}

export type ConfirmationActionProps = React.ComponentProps<typeof Button> & {
	intent?: "approve" | "deny";
};

function ConfirmationAction({
	className = "",
	size = "sm",
	variant,
	intent,
	type = "button",
	...props
}: ConfirmationActionProps) {
	const resolvedVariant = variant ?? (intent === "deny" ? "outline" : "default");

	return (
		<Button
			data-slot="confirmation-action"
			type={type}
			size={size}
			variant={resolvedVariant}
			className={cn(className)}
			{...props}
		/>
	);
}

Confirmation.displayName = "Confirmation";
ConfirmationTitle.displayName = "ConfirmationTitle";
ConfirmationRequest.displayName = "ConfirmationRequest";
ConfirmationAccepted.displayName = "ConfirmationAccepted";
ConfirmationRejected.displayName = "ConfirmationRejected";
ConfirmationActions.displayName = "ConfirmationActions";
ConfirmationAction.displayName = "ConfirmationAction";

export {
	Confirmation,
	ConfirmationTitle,
	ConfirmationRequest,
	ConfirmationAccepted,
	ConfirmationRejected,
	ConfirmationActions,
	ConfirmationAction,
};
