"use client";
import { ComponentConfig } from "../layout";
import { DataTable } from "@/registry/optics/data-table";

import componentCode from "@/registry/optics/dist/data-table.jsx.txt";
import generatedProps from "@/registry/optics/dist/data-table.json";

const componentFiles = [
	{
		path: "@/components/optics/data-table.jsx",
		code: componentCode,
	},
];

const paymentData = [
	{
		id: "m5gr84i9",
		amount: 316,
		status: "success",
		email: "ken99@example.com",
	},
	{
		id: "3u1reuv4",
		amount: 242,
		status: "success",
		email: "Abe45@example.com",
	},
	{
		id: "derv1ws0",
		amount: 837,
		status: "processing",
		email: "Monserrat44@example.com",
	},
];

const columns = [
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "amount",
		header: "Amount",
	},
];

const code = [
	{
		language: "jsx",
		filename: "data-table.jsx",
		code: `import { DataTable } from "@/components/optics/data-table";
import { ColumnDef } from "@tanstack/react-table";

const columns = [
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
];

const data = [
	{
		email: "ken99@example.com",
		status: "success",
	},
];

<DataTable columns={columns} data={data} />`,
	},
];


const demoComponent = <DataTable columns={columns} data={paymentData} />;

const componentConfig = {
	header: {
		title: "Data Table",
		description:
			"Powerful data table built with TanStack Table for sorting, filtering, and pagination.",
		href: "https://ui.shadcn.com/docs/components/data-table",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "data-table",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
