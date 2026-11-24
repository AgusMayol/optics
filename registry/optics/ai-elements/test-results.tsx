"use client";

import * as React from "react";
import { CheckIcon, CircleDashedIcon, FileCodeIcon, FlaskConicalIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import {
	Trace,
	TraceCollapsible,
	TraceCollapsibleContent,
	TraceCollapsibleTrigger,
	TraceDescription,
	TraceIcon,
	TraceLine,
	TraceTitle,
} from "@/registry/optics/trace";

export type TestStatus = "passed" | "failed" | "skipped";

export type TestResultsSummaryData = {
	passed: number;
	failed: number;
	skipped?: number;
	duration?: string;
};

const TestResultsContext = React.createContext<TestResultsSummaryData | undefined>(undefined);

export type TestResultsProps = React.ComponentProps<"div"> & {
	summary?: TestResultsSummaryData;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

function TestResults({
	summary,
	defaultOpen,
	open,
	onOpenChange,
	className = "",
	children,
	...props
}: TestResultsProps) {
	const initialOpen = defaultOpen ?? Boolean(summary && summary.failed > 0);
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
	const isControlled = open !== undefined;
	const resolvedOpen = isControlled ? open : uncontrolledOpen;

	const handleOpenChange: NonNullable<
		React.ComponentProps<typeof TraceCollapsible>["onOpenChange"]
	> = (nextOpen, eventDetails) => {
		onOpenChange?.(nextOpen);
		if (!isControlled && !eventDetails.isCanceled) {
			setUncontrolledOpen(nextOpen);
		}
	};

	return (
		<TestResultsContext.Provider value={summary}>
			<Trace data-slot="test-results" className={className} {...props}>
				<TraceCollapsible
					open={resolvedOpen}
					defaultOpen={initialOpen}
					onOpenChange={handleOpenChange}
				>
					{children}
				</TraceCollapsible>
			</Trace>
		</TestResultsContext.Provider>
	);
}

export type TestResultsHeaderProps = React.ComponentProps<typeof TraceCollapsibleTrigger>;

function TestResultsHeader({ className = "", children, ...props }: TestResultsHeaderProps) {
	const summary = React.useContext(TestResultsContext);
	const hasFailures = Boolean(summary && summary.failed > 0);

	return (
		<TraceCollapsibleTrigger data-slot="test-results-header" className={className} {...props}>
			<TraceLine status={hasFailures ? "error" : undefined}>
				<TraceIcon>
					<FlaskConicalIcon />
				</TraceIcon>
				{children ?? <TestResultsSummary />}
			</TraceLine>
		</TraceCollapsibleTrigger>
	);
}

export type TestResultsSummaryProps = React.ComponentProps<typeof TraceTitle> & {
	summary?: TestResultsSummaryData;
};

function TestResultsSummary({
	summary,
	className = "",
	children,
	...props
}: TestResultsSummaryProps) {
	const ctxSummary = React.useContext(TestResultsContext);
	const resolvedSummary = summary ?? ctxSummary;

	if (children !== undefined) {
		return (
			<TraceTitle data-slot="test-results-summary" className={className} {...props}>
				{children}
			</TraceTitle>
		);
	}

	if (!resolvedSummary) {
		return (
			<TraceTitle data-slot="test-results-summary" className={className} {...props}>
				Test results
			</TraceTitle>
		);
	}

	const total = resolvedSummary.passed + resolvedSummary.failed + (resolvedSummary.skipped ?? 0);

	return (
		<>
			<TraceTitle data-slot="test-results-summary" className={className} {...props}>
				Ran {total} {total === 1 ? "test" : "tests"}
			</TraceTitle>
			{resolvedSummary.passed > 0 ? (
				<Badge variant="secondary" className="shrink-0 tabular-nums">
					{resolvedSummary.passed} passed
				</Badge>
			) : null}
			{resolvedSummary.failed > 0 ? (
				<Badge variant="destructive" className="shrink-0 tabular-nums">
					{resolvedSummary.failed} failed
				</Badge>
			) : null}
			{resolvedSummary.skipped && resolvedSummary.skipped > 0 ? (
				<Badge variant="outline" className="shrink-0 tabular-nums">
					{resolvedSummary.skipped} skipped
				</Badge>
			) : null}
			{resolvedSummary.duration ? (
				<TraceDescription>{resolvedSummary.duration}</TraceDescription>
			) : null}
		</>
	);
}

export type TestResultsContentProps = React.ComponentProps<typeof TraceCollapsibleContent>;

function TestResultsContent({ className = "", children, ...props }: TestResultsContentProps) {
	return (
		<TraceCollapsibleContent
			data-slot="test-results-content"
			keepMounted
			className={className}
			{...props}
		>
			<Trace>{children}</Trace>
		</TraceCollapsibleContent>
	);
}

function getTestTraceStatus(status: TestStatus): "error" | "pending" | undefined {
	if (status === "failed") return "error";
	if (status === "skipped") return "pending";
	return undefined;
}

function TestStatusBadge({ status }: { status: TestStatus }) {
	if (status === "failed") {
		return (
			<Badge variant="destructive" className="shrink-0">
				failed
			</Badge>
		);
	}
	if (status === "skipped") {
		return (
			<Badge variant="outline" className="shrink-0">
				skipped
			</Badge>
		);
	}
	return (
		<Badge variant="secondary" className="shrink-0">
			passed
		</Badge>
	);
}

export type TestSuiteProps = React.ComponentProps<"div"> & {
	name: string;
	status: TestStatus;
	duration?: string;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

function TestSuite({
	name,
	status,
	duration,
	defaultOpen,
	open,
	onOpenChange,
	className = "",
	children,
	...props
}: TestSuiteProps) {
	const initialOpen = defaultOpen ?? status === "failed";
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
	const isControlled = open !== undefined;
	const resolvedOpen = isControlled ? open : uncontrolledOpen;

	const handleOpenChange: NonNullable<
		React.ComponentProps<typeof TraceCollapsible>["onOpenChange"]
	> = (nextOpen, eventDetails) => {
		onOpenChange?.(nextOpen);
		if (!isControlled && !eventDetails.isCanceled) {
			setUncontrolledOpen(nextOpen);
		}
	};

	return (
		<TraceCollapsible
			data-slot="test-suite"
			open={resolvedOpen}
			defaultOpen={initialOpen}
			onOpenChange={handleOpenChange}
			className={className}
			{...props}
		>
			<TraceCollapsibleTrigger>
				<TraceLine status={getTestTraceStatus(status)}>
					<TraceIcon>
						<FileCodeIcon />
					</TraceIcon>
					<TraceTitle>{name}</TraceTitle>
					<TestStatusBadge status={status} />
					{duration ? <TraceDescription>{duration}</TraceDescription> : null}
				</TraceLine>
			</TraceCollapsibleTrigger>
			<TraceCollapsibleContent keepMounted>
				<Trace>{children}</Trace>
			</TraceCollapsibleContent>
		</TraceCollapsible>
	);
}

export type TestCaseProps = React.ComponentProps<"div"> & {
	name: string;
	status: TestStatus;
	duration?: string;
};

function TestCaseIcon({ status }: { status: TestStatus }) {
	if (status === "failed") {
		return <XIcon />;
	}
	if (status === "skipped") {
		return <CircleDashedIcon />;
	}
	return <CheckIcon />;
}

function TestCase({ name, status, duration, className = "", children, ...props }: TestCaseProps) {
	const hasDetails =
		children !== undefined && children !== null && children !== false && children !== "";
	const lineContent = (
		<>
			<TraceIcon>
				<TestCaseIcon status={status} />
			</TraceIcon>
			<TraceTitle>{name}</TraceTitle>
			{status === "skipped" ? (
				<Badge variant="outline" className="shrink-0">
					skipped
				</Badge>
			) : null}
			{duration ? <TraceDescription>{duration}</TraceDescription> : null}
		</>
	);

	if (hasDetails) {
		return (
			<TraceCollapsible defaultOpen={status === "failed"} className={className} {...props}>
				<TraceCollapsibleTrigger>
					<TraceLine data-slot="test-case" status={getTestTraceStatus(status)}>
						{lineContent}
					</TraceLine>
				</TraceCollapsibleTrigger>
				<TraceCollapsibleContent keepMounted>{children}</TraceCollapsibleContent>
			</TraceCollapsible>
		);
	}

	return (
		<TraceLine
			data-slot="test-case"
			status={getTestTraceStatus(status)}
			className={className}
			{...props}
		>
			{lineContent}
		</TraceLine>
	);
}

export type TestErrorProps = React.ComponentProps<"div"> & {
	message?: string;
	stack?: string;
};

function formatTestError(message?: string, stack?: string): string {
	if (message && stack) {
		return stack.startsWith(message) ? stack : `${message}\n\n${stack}`;
	}
	return message ?? stack ?? "";
}

function TestError({ message, stack, className = "", children, ...props }: TestErrorProps) {
	const formatted = formatTestError(message, stack);

	if (children === undefined && !formatted) {
		return null;
	}

	return (
		<div data-slot="test-error" className={cn("min-w-0", className)} {...props}>
			<pre className="max-h-64 overflow-x-auto rounded-lg border bg-muted/50 p-3 font-mono text-xs leading-relaxed text-destructive">
				{children ?? formatted}
			</pre>
		</div>
	);
}

TestResults.displayName = "TestResults";
TestResultsHeader.displayName = "TestResultsHeader";
TestResultsSummary.displayName = "TestResultsSummary";
TestResultsContent.displayName = "TestResultsContent";
TestSuite.displayName = "TestSuite";
TestCase.displayName = "TestCase";
TestError.displayName = "TestError";

export {
	TestResults,
	TestResultsHeader,
	TestResultsSummary,
	TestResultsContent,
	TestSuite,
	TestCase,
	TestError,
};
