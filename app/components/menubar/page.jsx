"use client";
import { ComponentConfig } from "../layout";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/registry/optics/menubar";

import componentCode from "@/registry/optics/dist/menubar.jsx.txt";
import generatedProps from "@/registry/optics/dist/menubar.json";

const componentFiles = [
	{
		path: "@/components/optics/menubar.jsx",
		code: componentCode,
	},
];



const demoComponent = (
	<Menubar>
		<MenubarMenu>
			<MenubarTrigger>File</MenubarTrigger>
			<MenubarContent>
				<MenubarItem>
					New Tab <MenubarShortcut>⌘T</MenubarShortcut>
				</MenubarItem>
				<MenubarItem>
					New Window <MenubarShortcut>⌘N</MenubarShortcut>
				</MenubarItem>
				<MenubarItem disabled>New Incognito Window</MenubarItem>
				<MenubarSeparator />
				<MenubarSub>
					<MenubarSubTrigger>Share</MenubarSubTrigger>
					<MenubarSubContent>
						<MenubarItem>Email link</MenubarItem>
						<MenubarItem>Messages</MenubarItem>
						<MenubarItem>Notes</MenubarItem>
					</MenubarSubContent>
				</MenubarSub>
				<MenubarSeparator />
				<MenubarItem>
					Print... <MenubarShortcut>⌘P</MenubarShortcut>
				</MenubarItem>
			</MenubarContent>
		</MenubarMenu>
		<MenubarMenu>
			<MenubarTrigger>Edit</MenubarTrigger>
			<MenubarContent>
				<MenubarItem>
					Undo <MenubarShortcut>⌘Z</MenubarShortcut>
				</MenubarItem>
				<MenubarItem>
					Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
				</MenubarItem>
				<MenubarSeparator />
				<MenubarSub>
					<MenubarSubTrigger>Find</MenubarSubTrigger>
					<MenubarSubContent>
						<MenubarItem>Search the web</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Find...</MenubarItem>
						<MenubarItem>Find Next</MenubarItem>
						<MenubarItem>Find Previous</MenubarItem>
					</MenubarSubContent>
				</MenubarSub>
				<MenubarSeparator />
				<MenubarItem>Cut</MenubarItem>
				<MenubarItem>Copy</MenubarItem>
				<MenubarItem>Paste</MenubarItem>
			</MenubarContent>
		</MenubarMenu>
		<MenubarMenu>
			<MenubarTrigger>View</MenubarTrigger>
			<MenubarContent>
				<MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
				<MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
				<MenubarSeparator />
				<MenubarItem inset>
					Reload <MenubarShortcut>⌘R</MenubarShortcut>
				</MenubarItem>
				<MenubarItem disabled inset>
					Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
				</MenubarItem>
				<MenubarSeparator />
				<MenubarItem inset>Toggle Fullscreen</MenubarItem>
				<MenubarSeparator />
				<MenubarItem inset>Hide Sidebar</MenubarItem>
			</MenubarContent>
		</MenubarMenu>
		<MenubarMenu>
			<MenubarTrigger>Profiles</MenubarTrigger>
			<MenubarContent>
				<MenubarRadioGroup value="benoit">
					<MenubarRadioItem value="andy">Andy</MenubarRadioItem>
					<MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
					<MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
				</MenubarRadioGroup>
				<MenubarSeparator />
				<MenubarItem inset>Edit...</MenubarItem>
				<MenubarSeparator />
				<MenubarItem inset>Add Profile...</MenubarItem>
			</MenubarContent>
		</MenubarMenu>
	</Menubar>
);

const componentConfig = {
	header: {
		title: "Menubar",
		description:
			"Displays a menu bar that can be used to create a native application menu.",
		href: "https://ui.shadcn.com/docs/components/menubar",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/optics/menubar";`,
		filename: "menubar.jsx",
	},
	installation: {
		componentName: "menubar",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
