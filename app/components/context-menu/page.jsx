"use client";
import { ComponentConfig } from "../layout";
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/registry/optics/context-menu";

import componentCode from "@/registry/optics/dist/context-menu.jsx.txt";
import generatedProps from "@/registry/optics/dist/context-menu.json";

const componentFiles = [
	{
		path: "@/components/optics/context-menu.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "context-menu.jsx",
		code: `import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/components/optics/context-menu";

<ContextMenu>
	<ContextMenuTrigger>
		<div className="bg-muted rounded-lg p-8 border border-dashed flex items-center justify-center">
			<p className="text-muted-foreground text-sm select-none">
				Right click here to see the context menu
			</p>
		</div>
	</ContextMenuTrigger>
	<ContextMenuContent className="w-52">
		<ContextMenuItem inset>
			Back
			<ContextMenuShortcut>⌘[</ContextMenuShortcut>
		</ContextMenuItem>
		<ContextMenuItem inset disabled>
			Forward
			<ContextMenuShortcut>⌘]</ContextMenuShortcut>
		</ContextMenuItem>
		<ContextMenuItem inset>
			Reload
			<ContextMenuShortcut>⌘R</ContextMenuShortcut>
		</ContextMenuItem>
		<ContextMenuSub>
			<ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
			<ContextMenuSubContent className="w-44">
				<ContextMenuItem>Save Page...</ContextMenuItem>
				<ContextMenuItem>Create Shortcut...</ContextMenuItem>
				<ContextMenuItem>Name Window...</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem>Developer Tools</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem variant="destructive">Delete</ContextMenuItem>
			</ContextMenuSubContent>
		</ContextMenuSub>
		<ContextMenuSeparator />
		<ContextMenuCheckboxItem checked>
			Show Bookmarks
		</ContextMenuCheckboxItem>
		<ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
		<ContextMenuSeparator />
		<ContextMenuRadioGroup value="pedro">
			<ContextMenuLabel inset>People</ContextMenuLabel>
			<ContextMenuRadioItem value="pedro">
				Pedro Duarte
			</ContextMenuRadioItem>
			<ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
		</ContextMenuRadioGroup>
	</ContextMenuContent>
</ContextMenu>`,
	},
];



const demoComponent = (
	<ContextMenu>
		<ContextMenuTrigger>
			<div className="bg-muted rounded-lg p-8 border border-dashed flex items-center justify-center">
				<p className="text-muted-foreground text-sm select-none">
					Right click here to see the context menu
				</p>
			</div>
		</ContextMenuTrigger>
		<ContextMenuContent className="w-52">
			<ContextMenuItem inset>
				Back
				<ContextMenuShortcut>⌘[</ContextMenuShortcut>
			</ContextMenuItem>
			<ContextMenuItem inset disabled>
				Forward
				<ContextMenuShortcut>⌘]</ContextMenuShortcut>
			</ContextMenuItem>
			<ContextMenuItem inset>
				Reload
				<ContextMenuShortcut>⌘R</ContextMenuShortcut>
			</ContextMenuItem>
			<ContextMenuSub>
				<ContextMenuSubTrigger inset>
					More Tools
				</ContextMenuSubTrigger>
				<ContextMenuSubContent className="w-44">
					<ContextMenuItem>Save Page...</ContextMenuItem>
					<ContextMenuItem>Create Shortcut...</ContextMenuItem>
					<ContextMenuItem>Name Window...</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem>Developer Tools</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem variant="destructive">
						Delete
					</ContextMenuItem>
				</ContextMenuSubContent>
			</ContextMenuSub>
			<ContextMenuSeparator />
			<ContextMenuCheckboxItem checked>
				Show Bookmarks
			</ContextMenuCheckboxItem>
			<ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
			<ContextMenuSeparator />
			<ContextMenuRadioGroup value="pedro">
				<ContextMenuLabel inset>People</ContextMenuLabel>
				<ContextMenuRadioItem value="pedro">
					Pedro Duarte
				</ContextMenuRadioItem>
				<ContextMenuRadioItem value="colm">
					Colm Tuite
				</ContextMenuRadioItem>
			</ContextMenuRadioGroup>
		</ContextMenuContent>
	</ContextMenu>
);

const componentConfig = {
	header: {
		title: "Context Menu",
		description:
			"Displays a menu to the user triggered by right-clicking or long-pressing.",
		href: "https://ui.shadcn.com/docs/components/context-menu",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "context-menu",
		dependencies: "@base-ui/react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
