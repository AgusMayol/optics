"use client";
import { ComponentConfig } from "../layout";
import { useState } from "react";
import {
	Dialog,
	DialogPopup,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/optics/dialog";
import { Button } from "@/registry/optics/button";
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";

import componentCode from "@/registry/optics/dist/dialog.jsx.txt";
import generatedProps from "@/registry/optics/dist/dialog.json";

const componentFiles = [
	{
		path: "@/components/optics/dialog.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<Dialog>
		<DialogTrigger
			render={
				<Button variant="raised">
					Edit Profile
				</Button>
			}
		/>
		<DialogPopup>
			<DialogHeader>
				<DialogTitle>Edit profile</DialogTitle>
				<DialogDescription>
					Make changes to your profile here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-right">
						Name
					</Label>
					<Input
						id="name"
						defaultValue="Pedro Duarte"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="username" className="text-right">
						Username
					</Label>
					<Input
						id="username"
						defaultValue="@peduarte"
						className="col-span-3"
					/>
				</div>
			</div>
			<DialogFooter>
				<Button type="submit" variant="default">
					Save changes
				</Button>
			</DialogFooter>
		</DialogPopup>
	</Dialog>
);

const componentConfig = {
	header: {
		title: "Dialog",
		description:
			"A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
		href: "https://ui.shadcn.com/docs/components/dialog",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogPopup, DialogTitle, DialogTrigger } from "@/components/optics/dialog";
import { Button } from "@/components/optics/button";
import { Input } from "@/components/optics/input";
import { Label } from "@/components/optics/label";`,
		filename: "dialog.jsx",
	},
	installation: {
		componentName: "dialog",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
