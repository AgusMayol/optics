"use client";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Confirmation,
	ConfirmationAccepted,
	ConfirmationAction,
	ConfirmationActions,
	ConfirmationRejected,
	ConfirmationRequest,
	ConfirmationTitle,
	type ConfirmationState,
} from "@/registry/optics/ai-elements/confirmation";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/ai-elements/confirmation.json";
import componentCode from "@/registry/optics/dist/ai-elements/confirmation.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/confirmation.tsx",
		code: componentCode,
	},
];

function ConfirmationDemo() {
	const [state, setState] = useState<ConfirmationState>("approval-requested");

	const approval = {
		id: "approval-clean-cache",
		approved: state === "approved" ? true : state === "rejected" ? false : undefined,
	};

	return (
		<div className="flex w-full max-w-lg flex-col gap-4">
			<Confirmation state={state} approval={approval}>
				<ConfirmationTitle description=".next/cache">Clear build cache</ConfirmationTitle>
				<ConfirmationRequest>
					<p className="pl-6 text-xs leading-relaxed text-muted-foreground">
						Removes compiled cache entries from{" "}
						<code className="font-mono text-foreground">.next/cache</code> before running a clean
						production build.
					</p>
				</ConfirmationRequest>
				<ConfirmationAccepted>
					<p className="pl-6 text-xs leading-relaxed text-muted-foreground">
						Tool execution approved. Clearing cached build artifacts and starting compilation.
					</p>
				</ConfirmationAccepted>
				<ConfirmationRejected>
					<p className="pl-6 text-xs leading-relaxed text-destructive">
						Tool execution denied. Existing build cache files were left untouched.
					</p>
				</ConfirmationRejected>
				<ConfirmationActions>
					<ConfirmationAction intent="deny" onClick={() => setState("rejected")}>
						Deny
					</ConfirmationAction>
					<ConfirmationAction intent="approve" onClick={() => setState("approved")}>
						Approve
					</ConfirmationAction>
				</ConfirmationActions>
			</Confirmation>
			<div className="flex items-center justify-end">
				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={state === "approval-requested"}
					onClick={() => setState("approval-requested")}
				>
					<RotateCcw />
					Reset
				</Button>
			</div>
		</div>
	);
}

ConfirmationDemo.displayName = "ConfirmationDemo";

const demoImportsAndSetup = `import { RotateCcw } from "lucide-react";
import { useState } from "react";
import {
	Confirmation,
	ConfirmationAccepted,
	ConfirmationAction,
	ConfirmationActions,
	ConfirmationRejected,
	ConfirmationRequest,
	ConfirmationTitle,
	type ConfirmationState,
} from "@/components/optics/ai-elements/confirmation";
import { Button } from "@/components/optics/button";

function ConfirmationDemo() {
	const [state, setState] = useState<ConfirmationState>("approval-requested");

	const approval = {
		id: "approval-clean-cache",
		approved: state === "approved" ? true : state === "rejected" ? false : undefined,
	};

	return (
		<div className="flex w-full max-w-lg flex-col gap-4">
			<Confirmation state={state} approval={approval}>
				<ConfirmationTitle description=".next/cache">Clear build cache</ConfirmationTitle>
				<ConfirmationRequest>
					<p className="pl-6 text-xs leading-relaxed text-muted-foreground">
						Removes compiled cache entries from <code className="font-mono text-foreground">.next/cache</code>{" "}
						before running a clean production build.
					</p>
				</ConfirmationRequest>
				<ConfirmationAccepted>
					<p className="pl-6 text-xs leading-relaxed text-muted-foreground">
						Tool execution approved. Clearing cached build artifacts and starting compilation.
					</p>
				</ConfirmationAccepted>
				<ConfirmationRejected>
					<p className="pl-6 text-xs leading-relaxed text-destructive">
						Tool execution denied. Existing build cache files were left untouched.
					</p>
				</ConfirmationRejected>
				<ConfirmationActions>
					<ConfirmationAction intent="deny" onClick={() => setState("rejected")}>
						Deny
					</ConfirmationAction>
					<ConfirmationAction intent="approve" onClick={() => setState("approved")}>
						Approve
					</ConfirmationAction>
				</ConfirmationActions>
			</Confirmation>
			<div className="flex items-center justify-end">
				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={state === "approval-requested"}
					onClick={() => setState("approval-requested")}
				>
					<RotateCcw />
					Reset
				</Button>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Confirmation",
		description:
			"Approval request prompt displaying pending, approved, and rejected tool execution states.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/confirmation",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <ConfirmationDemo />,
		imports: demoImportsAndSetup,
		filename: "confirmation.tsx",
	},
	installation: {
		componentName: "ai-confirmation",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
