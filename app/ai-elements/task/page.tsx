"use client";

import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Task,
	TaskContent,
	TaskItem,
	TaskItemFile,
	TaskTrigger,
} from "@/registry/optics/ai-elements/task";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/task.json";
import componentCode from "@/registry/optics/dist/ai-elements/task.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/task.tsx",
		code: componentCode,
	},
];

function TaskDemo() {
	const [completed, setCompleted] = useState(false);

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<div className="flex items-center justify-end">
				<Button
					type="button"
					size="xs"
					variant="outline"
					onClick={() => setCompleted((prev) => !prev)}
				>
					{completed ? "Reset to running" : "Complete remaining steps"}
				</Button>
			</div>

			<div className="rounded-xl border bg-background p-4">
				<Task defaultOpen>
					<TaskTrigger
						title={completed ? "Implemented API rate limiter" : "Implementing API rate limiter"}
						status={completed ? "completed" : "running"}
						count={4}
					/>
					<TaskContent>
						<TaskItem status="completed">
							Scanned middleware in <TaskItemFile>src/proxy.ts</TaskItemFile>
						</TaskItem>
						<TaskItem status="completed">
							Added token bucket store in <TaskItemFile>lib/rate-limit.ts</TaskItemFile>
						</TaskItem>
						<TaskItem status={completed ? "completed" : "running"}>
							{completed ? "Updated route handler in" : "Updating route handler in"}{" "}
							<TaskItemFile>app/api/chat/route.ts</TaskItemFile>
						</TaskItem>
						<TaskItem status={completed ? "completed" : "pending"}>
							{completed ? "Verified unit tests in" : "Verify unit tests in"}{" "}
							<TaskItemFile>rate-limit.test.ts</TaskItemFile>
						</TaskItem>
					</TaskContent>
				</Task>
			</div>
		</div>
	);
}

TaskDemo.displayName = "TaskDemo";

const demoImportsAndSetup = `import { useState } from "react";
import {
	Task,
	TaskContent,
	TaskItem,
	TaskItemFile,
	TaskTrigger,
} from "@/components/optics/ai-elements/task";
import { Button } from "@/components/optics/button";

function TaskDemo() {
	const [completed, setCompleted] = useState(false);

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			<div className="flex items-center justify-end">
				<Button
					type="button"
					size="xs"
					variant="outline"
					onClick={() => setCompleted((prev) => !prev)}
				>
					{completed ? "Reset to running" : "Complete remaining steps"}
				</Button>
			</div>

			<div className="rounded-xl border bg-background p-4">
				<Task defaultOpen>
					<TaskTrigger
						title={completed ? "Implemented API rate limiter" : "Implementing API rate limiter"}
						status={completed ? "completed" : "running"}
						count={4}
					/>
					<TaskContent>
						<TaskItem status="completed">
							Scanned middleware in <TaskItemFile>src/proxy.ts</TaskItemFile>
						</TaskItem>
						<TaskItem status="completed">
							Added token bucket store in <TaskItemFile>lib/rate-limit.ts</TaskItemFile>
						</TaskItem>
						<TaskItem status={completed ? "completed" : "running"}>
							{completed ? "Updated route handler in" : "Updating route handler in"}{" "}
							<TaskItemFile>app/api/chat/route.ts</TaskItemFile>
						</TaskItem>
						<TaskItem status={completed ? "completed" : "pending"}>
							{completed ? "Verified unit tests in" : "Verify unit tests in"}{" "}
							<TaskItemFile>rate-limit.test.ts</TaskItemFile>
						</TaskItem>
					</TaskContent>
				</Task>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Task",
		description: "Step-by-step agent activity tracker with status icons and affected file badges.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/task",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <TaskDemo />,
		imports: demoImportsAndSetup,
		filename: "task.tsx",
	},
	installation: {
		componentName: "ai-task",
		dependencies: "lucide-react clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
