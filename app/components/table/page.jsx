"use client";
import { ComponentConfig } from "../layout";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/optics/table";

import componentCode from "@/registry/optics/dist/table.jsx.txt";
import generatedProps from "@/registry/optics/dist/table.json";

const componentFiles = [
	{
		path: "@/components/optics/table.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "table.jsx",
		code: `import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/optics/table";

<Table className="w-full">
	<TableHeader>
		<TableRow>
			<TableHead>Name</TableHead>
			<TableHead>Status</TableHead>
			<TableHead>Role</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		<TableRow>
			<TableCell className="font-medium">John Doe</TableCell>
			<TableCell>Active</TableCell>
			<TableCell>Admin</TableCell>
		</TableRow>
		<TableRow>
			<TableCell className="font-medium">Jane Smith</TableCell>
			<TableCell>Active</TableCell>
			<TableCell>User</TableCell>
		</TableRow>
		<TableRow>
			<TableCell className="font-medium">Bob Johnson</TableCell>
			<TableCell>Inactive</TableCell>
			<TableCell>User</TableCell>
		</TableRow>
	</TableBody>
</Table>`,
	},
];



const demoComponent = (
	<Table className="w-full">
		<TableHeader>
			<TableRow>
				<TableHead>Name</TableHead>
				<TableHead>Status</TableHead>
				<TableHead>Role</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<TableRow>
				<TableCell className="font-medium">John Doe</TableCell>
				<TableCell>Active</TableCell>
				<TableCell>Admin</TableCell>
			</TableRow>
			<TableRow>
				<TableCell className="font-medium">Jane Smith</TableCell>
				<TableCell>Active</TableCell>
				<TableCell>User</TableCell>
			</TableRow>
			<TableRow>
				<TableCell className="font-medium">Bob Johnson</TableCell>
				<TableCell>Inactive</TableCell>
				<TableCell>User</TableCell>
			</TableRow>
		</TableBody>
	</Table>
);

const componentConfig = {
	header: {
		title: "Table",
		description:
			"Powerful table and datagrid built on top of the native table element.",
		href: "https://ui.shadcn.com/docs/components/table",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "table",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
