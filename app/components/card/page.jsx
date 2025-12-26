"use client";
import { ComponentConfig } from "../layout";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/optics/card";
import { Button } from "@/registry/optics/button";
import { Bell } from "lucide-react";

import componentCode from "@/registry/optics/dist/card.jsx.txt";
import generatedProps from "@/registry/optics/dist/card.json";

const componentFiles = [
	{
		path: "@/components/optics/card.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex items-stretch justify-center gap-4">
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>You have 3 unread messages.</CardDescription>
				<CardAction>
					<Button size="icon-sm" variant="ghost">
						<Bell />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="text-sm">
					This is a sample card with header, content, and footer sections.
				</p>
			</CardContent>
			<CardFooter>
				<Button className="w-full">Mark all as read</Button>
			</CardFooter>
		</Card>

		<Card className="w-[350px]" decorations>
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>You have 3 unread messages.</CardDescription>
				<CardAction>
					<Button size="icon-sm" variant="ghost">
						<Bell />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="text-sm">
					This is a sample card with header, content, and footer sections.
				</p>
			</CardContent>
			<CardFooter background className="justify-end">
				<Button size="lg">Mark all as read</Button>
			</CardFooter>
		</Card>
	</div>
);

const componentConfig = {
	header: {
		title: "Card",
		description: "Displays a card with header, content, and footer.",
		href: "https://ui.shadcn.com/docs/components/card",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/optics/card";
import { Button } from "@/components/optics/button";
import { Bell } from "lucide-react";`,
		filename: "card.jsx",
	},
	installation: {
		componentName: "card",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
