"use client";
import { ComponentConfig } from "../layout";
import { Button } from "@/registry/optics/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/optics/card";
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";

import componentCode from "@/registry/optics/dist/tabs.tsx.txt";
import generatedProps from "@/registry/optics/dist/tabs.json";
import highlightCode from "@/registry/optics/dist/helpers/primitives/effects/highlight.tsx.txt";
import autoHeightCode from "@/registry/optics/dist/helpers/primitives/effects/auto-height.tsx.txt";
import slotCode from "@/registry/optics/dist/helpers/primitives/animate/slot.tsx.txt";
import controlledStateCode from "@/registry/optics/dist/hooks/use-controlled-state.tsx.txt";
import utilsCode from "@/registry/optics/dist/lib/utils.ts.txt";
import getStrictContextCode from "@/registry/optics/dist/lib/get-strict-context.tsx.txt";

const componentFiles = [
	{
		path: "@/components/optics/tabs.tsx",
		code: componentCode,
	},
	{
		path: "@/components/optics/helpers/primitives/effects/highlight.tsx",
		code: highlightCode,
	},
	{
		path: "@/components/optics/helpers/primitives/effects/auto-height.tsx",
		code: autoHeightCode,
	},
	{
		path: "@/components/optics/helpers/primitives/animate/slot.tsx",
		code: slotCode,
	},
	{
		path: "@/components/optics/hooks/use-controlled-state.tsx",
		code: controlledStateCode,
	},
	{
		path: "@/components/optics/lib/utils.ts",
		code: utilsCode,
	},
	{
		path: "@/components/optics/lib/get-strict-context.tsx",
		code: getStrictContextCode,
	},
];

const demoComponent = (
	<Tabs defaultValue="account" className="w-full max-w-sm">
		<TabsList variant="default">
			<TabsTrigger value="account">Account</TabsTrigger>
			<TabsTrigger value="password">Password</TabsTrigger>
		</TabsList>
		<Card className="shadow-none! py-0">
			<TabsContents className="py-4">
				<TabsContent value="account" className="flex flex-col gap-6">
					<CardHeader>
						<CardTitle>Account</CardTitle>
						<CardDescription>
							Make changes to your account here. Click save when you&apos;re
							done.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-6">
						<div className="grid gap-3">
							<Label htmlFor="tabs-demo-name">Name</Label>
							<Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save changes</Button>
					</CardFooter>
				</TabsContent>
				<TabsContent value="password" className="flex flex-col gap-6">
					<CardHeader>
						<CardTitle>Password</CardTitle>
						<CardDescription>
							Change your password here. After saving, you&apos;ll be logged
							out.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-6">
						<div className="grid gap-3">
							<Label htmlFor="tabs-demo-current">Current password</Label>
							<Input id="tabs-demo-current" type="password" />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="tabs-demo-new">New password</Label>
							<Input id="tabs-demo-new" type="password" />
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save password</Button>
					</CardFooter>
				</TabsContent>
			</TabsContents>
		</Card>
	</Tabs>
);

const componentConfig = {
	header: {
		title: "Tabs",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
		href: "https://animate-ui.com/docs/components/base/tabs",
		hrefText: "animate-ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "@/components/optics/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/optics/card";
import { Input } from "@/components/optics/input";
import { Label } from "@/components/optics/label";
import { Button } from "@/components/optics/button";`,
		filename: "tabs.tsx",
	},
	installation: {
		componentName: "tabs",
		dependencies: "@base-ui/react motion",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
