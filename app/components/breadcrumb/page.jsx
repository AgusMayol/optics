"use client";
import { ComponentConfig } from "../layout";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/optics/breadcrumb";
import { Slash } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/dist/breadcrumb.jsx.txt";
import generatedProps from "@/registry/optics/dist/breadcrumb.json";

const componentFiles = [
	{
		path: "@/components/optics/breadcrumb.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "breadcrumb.jsx",
		code: `import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/optics/breadcrumb";
import Link from "next/link";

<Breadcrumb>
	<BreadcrumbList>
		<BreadcrumbItem>
			<BreadcrumbLink nativeButton={false} render={<Link href="/">Home</Link>} />
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbLink nativeButton={false} render={<Link href="/components">Components</Link>} />
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
		</BreadcrumbItem>
	</BreadcrumbList>
</Breadcrumb>`,
	},
];

const demoComponent = (
	<div className="flex flex-col items-center justify-center gap-4">
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink render={<Link href="/">Home</Link>} />
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink
						render={<Link href="/components">Components</Link>}
					/>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>

		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink render={<Link href="/">Home</Link>} />
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<Slash />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbEllipsis />
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<Slash />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Current</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	</div>
);

const componentConfig = {
	header: {
		title: "Breadcrumb",
		description:
			"Displays the path to the current resource using a hierarchy of links.",
		href: "https://ui.shadcn.com/docs/components/breadcrumb",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "breadcrumb",
		dependencies: "@radix-ui/react-slot lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
