"use client";

import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	TestCase,
	TestError,
	TestResults,
	TestResultsContent,
	TestResultsHeader,
	TestResultsSummary,
	type TestResultsSummaryData,
	TestSuite,
} from "@/registry/optics/ai-elements/test-results";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/test-results.json";
import componentCode from "@/registry/optics/dist/ai-elements/test-results.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/test-results.tsx",
		code: componentCode,
	},
];

type SuiteFilter = "all" | "failed";

const FAILURE_STACK = [
	"    at refreshSession (src/auth/session.ts:84:15)",
	"    at Object.<anonymous> (src/auth/session.test.ts:47:22)",
].join("\n");

function TestResultsDemo() {
	const [filter, setFilter] = useState<SuiteFilter>("all");
	const [hasFailure, setHasFailure] = useState(true);

	const summary: TestResultsSummaryData = hasFailure
		? { passed: 5, failed: 1, skipped: 1, duration: "296ms" }
		: { passed: 6, failed: 0, skipped: 1, duration: "284ms" };

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex flex-wrap items-center gap-1.5">
					<Button
						type="button"
						size="xs"
						variant={filter === "all" ? "default" : "outline"}
						onClick={() => setFilter("all")}
					>
						All suites
					</Button>
					<Button
						type="button"
						size="xs"
						variant={filter === "failed" ? "default" : "outline"}
						onClick={() => setFilter("failed")}
					>
						Failed only
					</Button>
				</div>
				<Button
					type="button"
					size="xs"
					variant="outline"
					onClick={() => setHasFailure((prev) => !prev)}
				>
					{hasFailure ? "Simulate fix" : "Trigger failure"}
				</Button>
			</div>

			<div className="rounded-xl border bg-background p-4">
				<TestResults summary={summary} defaultOpen>
					<TestResultsHeader>
						<TestResultsSummary />
					</TestResultsHeader>
					<TestResultsContent>
						{filter === "all" || hasFailure ? (
							<TestSuite
								name="auth/session.test.ts"
								status={hasFailure ? "failed" : "passed"}
								duration="184ms"
								defaultOpen
							>
								<TestCase name="issues signed JWT on login" status="passed" duration="42ms" />
								<TestCase
									name="refreshes expiring session cookie"
									status={hasFailure ? "failed" : "passed"}
									duration="98ms"
								>
									{hasFailure ? (
										<TestError
											message="AssertionError: expected 401 to equal 200"
											stack={FAILURE_STACK}
										/>
									) : null}
								</TestCase>
								<TestCase name="revokes token on logout" status="passed" duration="28ms" />
								<TestCase name="rotates legacy HMAC secret" status="skipped" duration="0ms" />
							</TestSuite>
						) : null}

						{filter === "all" ? (
							<TestSuite name="api/rate-limit.test.ts" status="passed" duration="112ms">
								<TestCase
									name="allows requests within burst limit"
									status="passed"
									duration="34ms"
								/>
								<TestCase
									name="returns retry-after header when throttled"
									status="passed"
									duration="46ms"
								/>
								<TestCase name="resets window counter after ttl" status="passed" duration="32ms" />
							</TestSuite>
						) : null}

						{filter === "failed" && !hasFailure ? (
							<p className="py-1 text-xs text-muted-foreground">
								All test suites passed with zero failures.
							</p>
						) : null}
					</TestResultsContent>
				</TestResults>
			</div>
		</div>
	);
}

TestResultsDemo.displayName = "TestResultsDemo";

const demoImportsAndSetup = `import { useState } from "react";
import {
	TestCase,
	TestError,
	TestResults,
	TestResultsContent,
	TestResultsHeader,
	TestResultsSummary,
	type TestResultsSummaryData,
	TestSuite,
} from "@/components/optics/ai-elements/test-results";
import { Button } from "@/components/optics/button";

type SuiteFilter = "all" | "failed";

const FAILURE_STACK = [
	"    at refreshSession (src/auth/session.ts:84:15)",
	"    at Object.<anonymous> (src/auth/session.test.ts:47:22)",
].join("\\n");

function TestResultsDemo() {
	const [filter, setFilter] = useState<SuiteFilter>("all");
	const [hasFailure, setHasFailure] = useState(true);

	const summary: TestResultsSummaryData = hasFailure
		? { passed: 5, failed: 1, skipped: 1, duration: "296ms" }
		: { passed: 6, failed: 0, skipped: 1, duration: "284ms" };

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex flex-wrap items-center gap-1.5">
					<Button
						type="button"
						size="xs"
						variant={filter === "all" ? "default" : "outline"}
						onClick={() => setFilter("all")}
					>
						All suites
					</Button>
					<Button
						type="button"
						size="xs"
						variant={filter === "failed" ? "default" : "outline"}
						onClick={() => setFilter("failed")}
					>
						Failed only
					</Button>
				</div>
				<Button
					type="button"
					size="xs"
					variant="outline"
					onClick={() => setHasFailure((prev) => !prev)}
				>
					{hasFailure ? "Simulate fix" : "Trigger failure"}
				</Button>
			</div>

			<div className="rounded-xl border bg-background p-4">
				<TestResults summary={summary} defaultOpen>
					<TestResultsHeader>
						<TestResultsSummary />
					</TestResultsHeader>
					<TestResultsContent>
						{filter === "all" || hasFailure ? (
							<TestSuite
								name="auth/session.test.ts"
								status={hasFailure ? "failed" : "passed"}
								duration="184ms"
								defaultOpen
							>
								<TestCase name="issues signed JWT on login" status="passed" duration="42ms" />
								<TestCase
									name="refreshes expiring session cookie"
									status={hasFailure ? "failed" : "passed"}
									duration="98ms"
								>
									{hasFailure ? (
										<TestError
											message="AssertionError: expected 401 to equal 200"
											stack={FAILURE_STACK}
										/>
									) : null}
								</TestCase>
								<TestCase name="revokes token on logout" status="passed" duration="28ms" />
								<TestCase name="rotates legacy HMAC secret" status="skipped" duration="0ms" />
							</TestSuite>
						) : null}

						{filter === "all" ? (
							<TestSuite name="api/rate-limit.test.ts" status="passed" duration="112ms">
								<TestCase
									name="allows requests within burst limit"
									status="passed"
									duration="34ms"
								/>
								<TestCase
									name="returns retry-after header when throttled"
									status="passed"
									duration="46ms"
								/>
								<TestCase name="resets window counter after ttl" status="passed" duration="32ms" />
							</TestSuite>
						) : null}

						{filter === "failed" && !hasFailure ? (
							<p className="py-1 text-xs text-muted-foreground">
								All test suites passed with zero failures.
							</p>
						) : null}
					</TestResultsContent>
				</TestResults>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Test Results",
		description:
			"Test execution summary with collapsible suites, individual test cases, and failure traces.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/test-results",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <TestResultsDemo />,
		imports: demoImportsAndSetup,
		filename: "test-results.tsx",
	},
	installation: {
		componentName: "ai-test-results",
		dependencies: "lucide-react clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
