"use client";
import { ComponentConfig } from "../layout";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@/registry/optics/item";
import { Button } from "@/registry/optics/button";
import { Mail, Star } from "lucide-react";

import componentCode from "@/registry/optics/dist/item.jsx.txt";
import generatedProps from "@/registry/optics/dist/item.json";

const componentFiles = [
	{
		path: "@/components/optics/item.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "item.jsx",
		code: `import {
	Item,
	ItemMedia,
	ItemContent,
	ItemTitle,
	ItemDescription,
	ItemActions,
} from "@/components/optics/item";
import { Button } from "@/components/optics/button";
import { Mail } from "lucide-react";

<Item>
	<ItemMedia variant="icon">
		<Mail />
	</ItemMedia>
	<ItemContent>
		<ItemTitle>New Message</ItemTitle>
		<ItemDescription>
			You have a new message from John Doe
		</ItemDescription>
	</ItemContent>
	<ItemActions>
		<Button size="sm">View</Button>
	</ItemActions>
</Item>`,
	},
];



const demoComponent = (
	<ItemGroup>
		<Item>
			<ItemMedia variant="icon">
				<Mail />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>New Message</ItemTitle>
				<ItemDescription>
					You have a new message from John Doe
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button size="sm">View</Button>
			</ItemActions>
		</Item>
		<ItemSeparator />
		<Item>
			<ItemMedia variant="icon">
				<Star />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>Featured Item</ItemTitle>
				<ItemDescription>
					This is a featured item with special content
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button size="sm" variant="secondary">
					Details
				</Button>
			</ItemActions>
		</Item>
	</ItemGroup>
);

const componentConfig = {
	header: {
		title: "Item",
		description:
			"A flexible list item component for building complex layouts with media, content, and actions.",
		href: undefined,
		hrefText: undefined,
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "item",
		dependencies: "@radix-ui/react-slot class-variance-authority",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
