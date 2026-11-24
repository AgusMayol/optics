"use client";

import { CircleCheckIcon, CircleDotIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Queue,
	QueueItem,
	QueueItemAction,
	QueueItemActions,
	QueueItemContent,
	QueueItemDescription,
	QueueItemIndicator,
	QueueList,
	QueueSection,
	QueueSectionContent,
	QueueSectionTrigger,
} from "@/registry/optics/ai-elements/queue";
import { Button } from "@/registry/optics/button";
import { Checkbox } from "@/registry/optics/checkbox";
import generatedProps from "@/registry/optics/dist/ai-elements/queue.json";
import componentCode from "@/registry/optics/dist/ai-elements/queue.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/queue.tsx",
		code: componentCode,
	},
];

interface QueueTask {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	status?: "running" | "pending";
}

const INITIAL_TASKS: QueueTask[] = [
	{
		id: "task-1",
		title: "Verify component exports and props JSON",
		description: "Confirm generated prop metadata aligns with public TSX exports.",
		completed: false,
		status: "running",
	},
	{
		id: "task-2",
		title: "Run typecheck across docs routes",
		description: "Validate strict TypeScript compilation before formatting.",
		completed: false,
		status: "pending",
	},
	{
		id: "task-3",
		title: "Collect source snippets for manual install",
		description: "Read registry source text files for each AI element.",
		completed: true,
	},
	{
		id: "task-4",
		title: "Audit sidebar navigation links",
		description: "Ensure route slugs match entries in layout navigation.",
		completed: true,
	},
];

function QueueDemo() {
	const [tasks, setTasks] = useState<QueueTask[]>(INITIAL_TASKS);

	const remainingTasks = tasks.filter((task) => !task.completed);
	const completedTasks = tasks.filter((task) => task.completed);

	function handleToggleTask(id: string) {
		setTasks((current) =>
			current.map((task) =>
				task.id === id
					? {
							...task,
							completed: !task.completed,
							status: task.completed ? "pending" : undefined,
						}
					: task,
			),
		);
	}

	function handleRemoveTask(id: string) {
		setTasks((current) => current.filter((task) => task.id !== id));
	}

	function handleClearCompleted() {
		setTasks((current) => current.filter((task) => !task.completed));
	}

	function handleReset() {
		setTasks(INITIAL_TASKS);
	}

	return (
		<div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-card p-4">
			<Queue>
				<QueueSection defaultOpen>
					<QueueSectionTrigger
						label="Remaining"
						count={remainingTasks.length}
						icon={<CircleDotIcon />}
					/>
					<QueueSectionContent>
						<QueueList>
							{remainingTasks.length > 0 ? (
								remainingTasks.map((task) => (
									<QueueItem key={task.id} completed={task.completed} status={task.status}>
										<QueueItemIndicator />
										<QueueItemContent>{task.title}</QueueItemContent>
										<QueueItemActions>
											<Checkbox
												checked={task.completed}
												onCheckedChange={() => handleToggleTask(task.id)}
												aria-label={`Mark "${task.title}" complete`}
											/>
											<QueueItemAction
												aria-label={`Remove ${task.title}`}
												onClick={() => handleRemoveTask(task.id)}
											>
												<Trash2Icon />
											</QueueItemAction>
										</QueueItemActions>
										<QueueItemDescription>{task.description}</QueueItemDescription>
									</QueueItem>
								))
							) : (
								<p className="text-xs text-muted-foreground">No remaining tasks.</p>
							)}
						</QueueList>
					</QueueSectionContent>
				</QueueSection>

				<QueueSection defaultOpen>
					<QueueSectionTrigger
						label="Completed"
						count={completedTasks.length}
						icon={<CircleCheckIcon />}
					/>
					<QueueSectionContent>
						<QueueList>
							{completedTasks.length > 0 ? (
								completedTasks.map((task) => (
									<QueueItem key={task.id} completed={task.completed}>
										<QueueItemIndicator />
										<QueueItemContent>{task.title}</QueueItemContent>
										<QueueItemActions>
											<Checkbox
												checked={task.completed}
												onCheckedChange={() => handleToggleTask(task.id)}
												aria-label={`Mark "${task.title}" incomplete`}
											/>
											<QueueItemAction
												aria-label={`Remove ${task.title}`}
												onClick={() => handleRemoveTask(task.id)}
											>
												<Trash2Icon />
											</QueueItemAction>
										</QueueItemActions>
										<QueueItemDescription>{task.description}</QueueItemDescription>
									</QueueItem>
								))
							) : (
								<p className="text-xs text-muted-foreground">No completed tasks.</p>
							)}
						</QueueList>
					</QueueSectionContent>
				</QueueSection>
			</Queue>

			<div className="flex items-center justify-between gap-2 border-t pt-3">
				<Button type="button" variant="ghost" size="xs" onClick={handleReset}>
					Reset tasks
				</Button>
				<Button
					type="button"
					variant="outline"
					size="xs"
					disabled={completedTasks.length === 0}
					onClick={handleClearCompleted}
				>
					Clear completed
				</Button>
			</div>
		</div>
	);
}

QueueDemo.displayName = "QueueDemo";

const demoImports = `import { CircleCheckIcon, CircleDotIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import {
	Queue,
	QueueItem,
	QueueItemAction,
	QueueItemActions,
	QueueItemContent,
	QueueItemDescription,
	QueueItemIndicator,
	QueueList,
	QueueSection,
	QueueSectionContent,
	QueueSectionTrigger,
} from "@/components/optics/ai-elements/queue";
import { Button } from "@/components/optics/button";
import { Checkbox } from "@/components/optics/checkbox";

interface QueueTask {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	status?: "running" | "pending";
}

const INITIAL_TASKS: QueueTask[] = [
	{
		id: "task-1",
		title: "Verify component exports and props JSON",
		description: "Confirm generated prop metadata aligns with public TSX exports.",
		completed: false,
		status: "running",
	},
	{
		id: "task-2",
		title: "Run typecheck across docs routes",
		description: "Validate strict TypeScript compilation before formatting.",
		completed: false,
		status: "pending",
	},
	{
		id: "task-3",
		title: "Collect source snippets for manual install",
		description: "Read registry source text files for each AI element.",
		completed: true,
	},
	{
		id: "task-4",
		title: "Audit sidebar navigation links",
		description: "Ensure route slugs match entries in layout navigation.",
		completed: true,
	},
];

function QueueDemo() {
	const [tasks, setTasks] = useState<QueueTask[]>(INITIAL_TASKS);

	const remainingTasks = tasks.filter((task) => !task.completed);
	const completedTasks = tasks.filter((task) => task.completed);

	function handleToggleTask(id: string) {
		setTasks((current) =>
			current.map((task) =>
				task.id === id
					? {
							...task,
							completed: !task.completed,
							status: task.completed ? "pending" : undefined,
						}
					: task,
			),
		);
	}

	function handleRemoveTask(id: string) {
		setTasks((current) => current.filter((task) => task.id !== id));
	}

	function handleClearCompleted() {
		setTasks((current) => current.filter((task) => !task.completed));
	}

	function handleReset() {
		setTasks(INITIAL_TASKS);
	}

	return (
		<div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-card p-4">
			<Queue>
				<QueueSection defaultOpen>
					<QueueSectionTrigger
						label="Remaining"
						count={remainingTasks.length}
						icon={<CircleDotIcon />}
					/>
					<QueueSectionContent>
						<QueueList>
							{remainingTasks.length > 0 ? (
								remainingTasks.map((task) => (
									<QueueItem key={task.id} completed={task.completed} status={task.status}>
										<QueueItemIndicator />
										<QueueItemContent>{task.title}</QueueItemContent>
										<QueueItemActions>
											<Checkbox
												checked={task.completed}
												onCheckedChange={() => handleToggleTask(task.id)}
												aria-label={\`Mark "\${task.title}" complete\`}
											/>
											<QueueItemAction
												aria-label={\`Remove \${task.title}\`}
												onClick={() => handleRemoveTask(task.id)}
											>
												<Trash2Icon />
											</QueueItemAction>
										</QueueItemActions>
										<QueueItemDescription>{task.description}</QueueItemDescription>
									</QueueItem>
								))
							) : (
								<p className="text-xs text-muted-foreground">No remaining tasks.</p>
							)}
						</QueueList>
					</QueueSectionContent>
				</QueueSection>

				<QueueSection defaultOpen>
					<QueueSectionTrigger
						label="Completed"
						count={completedTasks.length}
						icon={<CircleCheckIcon />}
					/>
					<QueueSectionContent>
						<QueueList>
							{completedTasks.length > 0 ? (
								completedTasks.map((task) => (
									<QueueItem key={task.id} completed={task.completed}>
										<QueueItemIndicator />
										<QueueItemContent>{task.title}</QueueItemContent>
										<QueueItemActions>
											<Checkbox
												checked={task.completed}
												onCheckedChange={() => handleToggleTask(task.id)}
												aria-label={\`Mark "\${task.title}" incomplete\`}
											/>
											<QueueItemAction
												aria-label={\`Remove \${task.title}\`}
												onClick={() => handleRemoveTask(task.id)}
											>
												<Trash2Icon />
											</QueueItemAction>
										</QueueItemActions>
										<QueueItemDescription>{task.description}</QueueItemDescription>
									</QueueItem>
								))
							) : (
								<p className="text-xs text-muted-foreground">No completed tasks.</p>
							)}
						</QueueList>
					</QueueSectionContent>
				</QueueSection>
			</Queue>

			<div className="flex items-center justify-between gap-2 border-t pt-3">
				<Button type="button" variant="ghost" size="xs" onClick={handleReset}>
					Reset tasks
				</Button>
				<Button
					type="button"
					variant="outline"
					size="xs"
					disabled={completedTasks.length === 0}
					onClick={handleClearCompleted}
				>
					Clear completed
				</Button>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Queue",
		description:
			"Agent task queue splitting pending and completed work into collapsible trace sections.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/queue",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <QueueDemo />,
		imports: demoImports,
		filename: "queue.tsx",
	},
	installation: {
		componentName: "ai-queue",
		dependencies: "lucide-react clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
