"use client";
import { ComponentConfig } from "../layout";
import { useState } from "react";
import { Button } from "@/registry/optics/button";
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/registry/optics/drawer";

import componentCode from "@/registry/optics/dist/drawer.jsx.txt";
import generatedProps from "@/registry/optics/dist/drawer.json";

const componentFiles = [
	{
		path: "@/components/optics/drawer.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<Drawer>
		<DrawerTrigger render={<Button variant="raised">Open Drawer</Button>} />
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>Are you absolutely sure?</DrawerTitle>
				<DrawerDescription>This action cannot be undone.</DrawerDescription>
			</DrawerHeader>
			<div className="p-4 pb-0">
				<div className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" placeholder="name@example.com" />
					</div>
				</div>
			</div>
			<DrawerFooter>
				<Button>Submit</Button>
				<DrawerClose render={<Button variant="raised">Cancel</Button>} />
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
);

const componentConfig = {
	header: {
		title: "Drawer",
		description: "A drawer component built on top of Vaul.",
		href: "https://ui.shadcn.com/docs/components/drawer",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/optics/drawer";
import { Button } from "@/components/optics/button";
import { Input } from "@/components/optics/input";
import { Label } from "@/components/optics/label";`,
		filename: "drawer.jsx",
	},
	installation: {
		componentName: "drawer",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
