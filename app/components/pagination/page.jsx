"use client";
import { ComponentConfig } from "../layout";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/registry/optics/pagination";

import componentCode from "@/registry/optics/dist/pagination.jsx.txt";
import generatedProps from "@/registry/optics/dist/pagination.json";

const componentFiles = [
	{
		path: "@/components/optics/pagination.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "pagination.jsx",
		code: `import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/optics/pagination";

<Pagination>
	<PaginationContent>
		<PaginationItem>
			<PaginationPrevious href="#" />
		</PaginationItem>
		<PaginationItem>
			<PaginationLink href="#">1</PaginationLink>
		</PaginationItem>
		<PaginationItem>
			<PaginationLink href="#" isActive variant="raised">2</PaginationLink>
		</PaginationItem>
		<PaginationItem>
			<PaginationLink href="#">3</PaginationLink>
		</PaginationItem>
		<PaginationItem>
			<PaginationNext href="#" />
		</PaginationItem>
	</PaginationContent>
</Pagination>`,
	},
];



const demoComponent = (
	<Pagination>
		<PaginationContent>
			<PaginationItem>
				<PaginationPrevious href="#" />
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#">1</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#" isActive variant="raised">
					2
				</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#">3</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationNext href="#" />
			</PaginationItem>
		</PaginationContent>
	</Pagination>
);

const componentConfig = {
	header: {
		title: "Pagination",
		description:
			"Pagination with page navigation, next/previous buttons, and page numbers.",
		href: "https://ui.shadcn.com/docs/components/pagination",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "pagination",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
