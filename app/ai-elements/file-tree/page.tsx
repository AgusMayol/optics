"use client";
import { useState } from "react";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import { FileTree, FileTreeFile, FileTreeFolder } from "@/registry/optics/ai-elements/file-tree";
import generatedProps from "@/registry/optics/dist/ai-elements/file-tree.json";
import componentCode from "@/registry/optics/dist/ai-elements/file-tree.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/file-tree.tsx",
		code: componentCode,
	},
];

function FileTreeDemo() {
	const [selectedPath, setSelectedPath] = useState("app/ai-elements/file-tree/page.tsx");

	return (
		<div className="flex w-full max-w-md flex-col gap-3">
			<FileTree selectedPath={selectedPath} onSelectPath={setSelectedPath}>
				<FileTreeFolder name="app" defaultOpen>
					<FileTreeFolder name="ai-elements" defaultOpen>
						<FileTreeFile name="page.tsx" status="added" />
						<FileTreeFile name="layout.tsx" status="modified" />
						<FileTreeFolder name="file-tree" defaultOpen>
							<FileTreeFile name="page.tsx" status="added" />
						</FileTreeFolder>
					</FileTreeFolder>
					<FileTreeFile name="layout-content.tsx" status="modified" />
				</FileTreeFolder>
				<FileTreeFolder name="registry/optics" path="registry/optics" defaultOpen>
					<FileTreeFolder name="ai-elements" defaultOpen>
						<FileTreeFile name="file-tree.tsx" status="added" />
						<FileTreeFile name="model-selector.tsx" status="modified" />
						<FileTreeFile name="legacy-prompt.tsx" status="deleted" />
					</FileTreeFolder>
				</FileTreeFolder>
				<FileTreeFile name="registry.json" status="modified" />
			</FileTree>

			<div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2 text-xs">
				<span className="shrink-0 text-muted-foreground">Selected file</span>
				<code className="truncate font-mono text-foreground">{selectedPath}</code>
			</div>
		</div>
	);
}

FileTreeDemo.displayName = "FileTreeDemo";

const demoImportsAndSetup = `import { useState } from "react";
import { FileTree, FileTreeFile, FileTreeFolder } from "@/components/optics/ai-elements/file-tree";

function FileTreeDemo() {
	const [selectedPath, setSelectedPath] = useState("app/ai-elements/file-tree/page.tsx");

	return (
		<div className="flex w-full max-w-md flex-col gap-3">
			<FileTree selectedPath={selectedPath} onSelectPath={setSelectedPath}>
				<FileTreeFolder name="app" defaultOpen>
					<FileTreeFolder name="ai-elements" defaultOpen>
						<FileTreeFile name="page.tsx" status="added" />
						<FileTreeFile name="layout.tsx" status="modified" />
						<FileTreeFolder name="file-tree" defaultOpen>
							<FileTreeFile name="page.tsx" status="added" />
						</FileTreeFolder>
					</FileTreeFolder>
					<FileTreeFile name="layout-content.tsx" status="modified" />
				</FileTreeFolder>
				<FileTreeFolder name="registry/optics" path="registry/optics" defaultOpen>
					<FileTreeFolder name="ai-elements" defaultOpen>
						<FileTreeFile name="file-tree.tsx" status="added" />
						<FileTreeFile name="model-selector.tsx" status="modified" />
						<FileTreeFile name="legacy-prompt.tsx" status="deleted" />
					</FileTreeFolder>
				</FileTreeFolder>
				<FileTreeFile name="registry.json" status="modified" />
			</FileTree>

			<div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2 text-xs">
				<span className="shrink-0 text-muted-foreground">Selected file</span>
				<code className="truncate font-mono text-foreground">{selectedPath}</code>
			</div>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "File Tree",
		description: "Collapsible folder tree showing modified, added, and deleted workspace files.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/file-tree",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <FileTreeDemo />,
		imports: demoImportsAndSetup,
		filename: "file-tree.tsx",
	},
	installation: {
		componentName: "ai-file-tree",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
