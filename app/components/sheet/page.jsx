"use client";
import { ComponentConfig } from "../layout";
import { Button } from "@/registry/optics/button";
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";
import {
	Sheet,
	SheetClose,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetPopup,
	SheetTitle,
	SheetTrigger,
} from "@/registry/optics/sheet";

import componentCode from "@/registry/optics/dist/sheet.jsx.txt";
import generatedProps from "@/registry/optics/dist/sheet.json";

const componentFiles = [
	{
		path: "@/components/optics/sheet.jsx",
		code: componentCode,
	},
];



const demoComponent = (
	<Sheet>
		<SheetTrigger
			render={
				<Button variant="raised" size="lg">
					Open Sheet
				</Button>
			}
		/>
		<SheetPopup variant="rounded">
			<SheetHeader>
				<SheetTitle>Edit profile</SheetTitle>
				<SheetDescription>
					Make changes to your profile here. Click save when you're done.
				</SheetDescription>
			</SheetHeader>
			<div className="grid gap-4 p-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-right">
						Name
					</Label>
					<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
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
			<SheetFooter>
				<SheetClose render={<Button type="submit">Save changes</Button>} />
			</SheetFooter>
		</SheetPopup>
	</Sheet>
);

const componentConfig = {
	header: {
		title: "Sheet",
		description:
			"Extends the Dialog component to display content that complements the main content of the screen.",
		href: "https://ui.shadcn.com/docs/components/sheet",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Button } from "@/components/optics/button";
import { Input } from "@/components/optics/input";
import { Label } from "@/components/optics/label";
import { Sheet, SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetPopup, SheetTitle, SheetTrigger } from "@/components/optics/sheet";`,
		filename: "sheet.jsx",
	},
	installation: {
		componentName: "sheet",
		dependencies: "@base-ui/react class-variance-authority",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
