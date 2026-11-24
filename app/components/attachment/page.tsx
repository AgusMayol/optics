"use client";
import { Download, FileText, Loader2, Upload, X } from "lucide-react";
import type { ManualFile } from "@/components/installation-guide";
import {
	Attachment,
	AttachmentAction,
	AttachmentActions,
	AttachmentContent,
	AttachmentDescription,
	AttachmentGroup,
	AttachmentMedia,
	AttachmentTitle,
	AttachmentTrigger,
} from "@/registry/optics/attachment";
import generatedProps from "@/registry/optics/dist/attachment.json";
import componentCode from "@/registry/optics/dist/attachment.tsx.txt";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/attachment.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<AttachmentGroup className="w-full max-w-2xl">
		<Attachment orientation="horizontal">
			<AttachmentMedia variant="icon">
				<FileText />
			</AttachmentMedia>
			<AttachmentContent>
				<AttachmentTitle>Quarterly Report.pdf</AttachmentTitle>
				<AttachmentDescription>2.4 MB</AttachmentDescription>
			</AttachmentContent>
			<AttachmentActions>
				<AttachmentAction aria-label="Download attachment">
					<Download />
				</AttachmentAction>
				<AttachmentAction aria-label="Remove attachment">
					<X />
				</AttachmentAction>
			</AttachmentActions>
		</Attachment>

		<Attachment orientation="horizontal" state="uploading">
			<AttachmentMedia variant="icon">
				<Loader2 className="animate-spin" />
			</AttachmentMedia>
			<AttachmentContent>
				<AttachmentTitle>design-system.fig</AttachmentTitle>
				<AttachmentDescription>Uploading · 64%</AttachmentDescription>
			</AttachmentContent>
			<AttachmentActions>
				<AttachmentAction aria-label="Cancel upload">
					<X />
				</AttachmentAction>
			</AttachmentActions>
		</Attachment>

		<Attachment orientation="horizontal" state="idle">
			<AttachmentTrigger aria-label="Add attachment" />
			<AttachmentMedia variant="icon">
				<Upload />
			</AttachmentMedia>
			<AttachmentContent>
				<AttachmentTitle>Add attachment</AttachmentTitle>
				<AttachmentDescription>Up to 10 MB</AttachmentDescription>
			</AttachmentContent>
		</Attachment>
	</AttachmentGroup>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Attachment",
		description:
			"Displays uploaded files, media previews, and actions in horizontal or vertical layouts.",
		href: "https://ui.shadcn.com/docs/components/attachment",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "@/components/optics/attachment";
import { Download, FileText, Loader2, Upload, X } from "lucide-react";`,
		filename: "attachment.tsx",
	},
	installation: {
		componentName: "attachment",
		dependencies: "@base-ui/react class-variance-authority",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
