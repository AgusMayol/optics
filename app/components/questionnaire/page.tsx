"use client";
import * as React from "react";
import type { ManualFile } from "@/components/installation-guide";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/questionnaire.json";
import componentCode from "@/registry/optics/dist/questionnaire.tsx.txt";
import {
	Questionnaire,
	QuestionnaireActions,
	QuestionnaireChoice,
	QuestionnaireChoiceDescription,
	QuestionnaireChoices,
	QuestionnaireDescription,
	QuestionnaireError,
	QuestionnaireInput,
	QuestionnaireItem,
	QuestionnaireNext,
	QuestionnairePrevious,
	QuestionnaireProgress,
	QuestionnaireSkip,
	QuestionnaireSubmit,
	QuestionnaireTitle,
} from "@/registry/optics/questionnaire";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/questionnaire.tsx",
		code: componentCode,
	},
];

interface SubmittedAnswers {
	role: string;
	features: string[];
	workspace: string;
}

function getFormValue(formData: FormData, key: string): string {
	const value = formData.get(key);
	return typeof value === "string" && value.trim().length > 0 ? value : "Skipped";
}

function QuestionnaireDemo() {
	const [submitted, setSubmitted] = React.useState<SubmittedAnswers | null>(null);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const features = formData
			.getAll("features")
			.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0);

		setSubmitted({
			role: getFormValue(formData, "role"),
			features,
			workspace: getFormValue(formData, "workspace"),
		});
	}

	return (
		<div className="w-full max-w-md rounded-xl border bg-card p-6">
			{submitted ? (
				<div className="flex flex-col gap-4">
					<div className="space-y-1">
						<h3 className="text-base font-medium">Responses submitted</h3>
						<p className="text-sm text-muted-foreground">
							Review your selections below or reset the questionnaire.
						</p>
					</div>
					<dl className="grid gap-2 rounded-lg border bg-muted/40 p-3 text-sm">
						<div className="flex items-center justify-between gap-4">
							<dt className="text-muted-foreground">Role</dt>
							<dd className="font-medium capitalize">{submitted.role}</dd>
						</div>
						<div className="flex items-center justify-between gap-4">
							<dt className="text-muted-foreground">Focus areas</dt>
							<dd className="text-right font-medium">
								{submitted.features.length > 0 ? submitted.features.join(", ") : "Skipped"}
							</dd>
						</div>
						<div className="flex items-center justify-between gap-4">
							<dt className="text-muted-foreground">Workspace</dt>
							<dd className="font-medium">{submitted.workspace}</dd>
						</div>
					</dl>
					<Button
						type="button"
						variant="outline"
						className="self-end"
						onClick={() => setSubmitted(null)}
					>
						Reset
					</Button>
				</div>
			) : (
				<Questionnaire shortcuts="letters" onSubmit={handleSubmit}>
					<QuestionnaireProgress />

					<QuestionnaireItem name="role" required>
						<QuestionnaireTitle>What best describes your role?</QuestionnaireTitle>
						<QuestionnaireDescription>
							Select the option that fits your day-to-day work.
						</QuestionnaireDescription>
						<QuestionnaireChoices>
							<QuestionnaireChoice value="developer">
								Developer
								<QuestionnaireChoiceDescription>
									Building web apps and component libraries.
								</QuestionnaireChoiceDescription>
							</QuestionnaireChoice>
							<QuestionnaireChoice value="designer">
								Designer
								<QuestionnaireChoiceDescription>
									Crafting interfaces, tokens, and user flows.
								</QuestionnaireChoiceDescription>
							</QuestionnaireChoice>
							<QuestionnaireChoice value="product">
								Product Lead
								<QuestionnaireChoiceDescription>
									Defining roadmaps and shipping features.
								</QuestionnaireChoiceDescription>
							</QuestionnaireChoice>
						</QuestionnaireChoices>
						<QuestionnaireError />
					</QuestionnaireItem>

					<QuestionnaireItem name="features" multiple>
						<QuestionnaireTitle>Which areas interest you most?</QuestionnaireTitle>
						<QuestionnaireDescription>
							Choose one or more options, or skip to continue.
						</QuestionnaireDescription>
						<QuestionnaireChoices>
							<QuestionnaireChoice value="components">UI Components</QuestionnaireChoice>
							<QuestionnaireChoice value="accessibility">
								Accessibility &amp; Keyboard
							</QuestionnaireChoice>
							<QuestionnaireChoice value="theming">Design Tokens &amp; Theming</QuestionnaireChoice>
						</QuestionnaireChoices>
						<QuestionnaireError />
					</QuestionnaireItem>

					<QuestionnaireItem name="workspace" required>
						<QuestionnaireTitle>Name your workspace</QuestionnaireTitle>
						<QuestionnaireDescription>
							This will be used to initialize your starter config.
						</QuestionnaireDescription>
						<QuestionnaireInput placeholder="e.g. Acme Design System" />
						<QuestionnaireError>Enter a workspace name to submit.</QuestionnaireError>
					</QuestionnaireItem>

					<QuestionnaireActions>
						<QuestionnairePrevious />
						<QuestionnaireSkip />
						<QuestionnaireNext />
						<QuestionnaireSubmit />
					</QuestionnaireActions>
				</Questionnaire>
			)}
		</div>
	);
}

QuestionnaireDemo.displayName = "QuestionnaireDemo";

const demoImportsAndSetup = `import * as React from "react";
import { Button } from "@/components/optics/button";
import {
	Questionnaire,
	QuestionnaireActions,
	QuestionnaireChoice,
	QuestionnaireChoiceDescription,
	QuestionnaireChoices,
	QuestionnaireDescription,
	QuestionnaireError,
	QuestionnaireInput,
	QuestionnaireItem,
	QuestionnaireNext,
	QuestionnairePrevious,
	QuestionnaireProgress,
	QuestionnaireSkip,
	QuestionnaireSubmit,
	QuestionnaireTitle,
} from "@/components/optics/questionnaire";

interface SubmittedAnswers {
	role: string;
	features: string[];
	workspace: string;
}

function getFormValue(formData: FormData, key: string): string {
	const value = formData.get(key);
	return typeof value === "string" && value.trim().length > 0 ? value : "Skipped";
}

function QuestionnaireDemo() {
	const [submitted, setSubmitted] = React.useState<SubmittedAnswers | null>(null);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const features = formData
			.getAll("features")
			.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0);

		setSubmitted({
			role: getFormValue(formData, "role"),
			features,
			workspace: getFormValue(formData, "workspace"),
		});
	}

	return (
		<div className="w-full max-w-md rounded-xl border bg-card p-6">
			{submitted ? (
				<div className="flex flex-col gap-4">
					<div className="space-y-1">
						<h3 className="text-base font-medium">Responses submitted</h3>
						<p className="text-sm text-muted-foreground">
							Review your selections below or reset the questionnaire.
						</p>
					</div>
					<dl className="grid gap-2 rounded-lg border bg-muted/40 p-3 text-sm">
						<div className="flex items-center justify-between gap-4">
							<dt className="text-muted-foreground">Role</dt>
							<dd className="font-medium capitalize">{submitted.role}</dd>
						</div>
						<div className="flex items-center justify-between gap-4">
							<dt className="text-muted-foreground">Focus areas</dt>
							<dd className="text-right font-medium">
								{submitted.features.length > 0 ? submitted.features.join(", ") : "Skipped"}
							</dd>
						</div>
						<div className="flex items-center justify-between gap-4">
							<dt className="text-muted-foreground">Workspace</dt>
							<dd className="font-medium">{submitted.workspace}</dd>
						</div>
					</dl>
					<Button
						type="button"
						variant="outline"
						className="self-end"
						onClick={() => setSubmitted(null)}
					>
						Reset
					</Button>
				</div>
			) : (
				<Questionnaire shortcuts="letters" onSubmit={handleSubmit}>
					<QuestionnaireProgress />

					<QuestionnaireItem name="role" required>
						<QuestionnaireTitle>What best describes your role?</QuestionnaireTitle>
						<QuestionnaireDescription>
							Select the option that fits your day-to-day work.
						</QuestionnaireDescription>
						<QuestionnaireChoices>
							<QuestionnaireChoice value="developer">
								Developer
								<QuestionnaireChoiceDescription>
									Building web apps and component libraries.
								</QuestionnaireChoiceDescription>
							</QuestionnaireChoice>
							<QuestionnaireChoice value="designer">
								Designer
								<QuestionnaireChoiceDescription>
									Crafting interfaces, tokens, and user flows.
								</QuestionnaireChoiceDescription>
							</QuestionnaireChoice>
							<QuestionnaireChoice value="product">
								Product Lead
								<QuestionnaireChoiceDescription>
									Defining roadmaps and shipping features.
								</QuestionnaireChoiceDescription>
							</QuestionnaireChoice>
						</QuestionnaireChoices>
						<QuestionnaireError />
					</QuestionnaireItem>

					<QuestionnaireItem name="features" multiple>
						<QuestionnaireTitle>Which areas interest you most?</QuestionnaireTitle>
						<QuestionnaireDescription>
							Choose one or more options, or skip to continue.
						</QuestionnaireDescription>
						<QuestionnaireChoices>
							<QuestionnaireChoice value="components">UI Components</QuestionnaireChoice>
							<QuestionnaireChoice value="accessibility">
								Accessibility &amp; Keyboard
							</QuestionnaireChoice>
							<QuestionnaireChoice value="theming">Design Tokens &amp; Theming</QuestionnaireChoice>
						</QuestionnaireChoices>
						<QuestionnaireError />
					</QuestionnaireItem>

					<QuestionnaireItem name="workspace" required>
						<QuestionnaireTitle>Name your workspace</QuestionnaireTitle>
						<QuestionnaireDescription>
							This will be used to initialize your starter config.
						</QuestionnaireDescription>
						<QuestionnaireInput placeholder="e.g. Acme Design System" />
						<QuestionnaireError>Enter a workspace name to submit.</QuestionnaireError>
					</QuestionnaireItem>

					<QuestionnaireActions>
						<QuestionnairePrevious />
						<QuestionnaireSkip />
						<QuestionnaireNext />
						<QuestionnaireSubmit />
					</QuestionnaireActions>
				</Questionnaire>
			)}
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Questionnaire",
		description: "Multi-step guided form and quiz flow with progress bar, choices, and validation.",
		href: "https://ui.shadcn.com/docs/components/questionnaire",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <QuestionnaireDemo />,
		imports: demoImportsAndSetup,
		filename: "questionnaire.tsx",
	},
	installation: {
		componentName: "questionnaire",
		dependencies: "@shadcn/react lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
