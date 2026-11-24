"use client";
import type { ManualFile } from "@/components/installation-guide";
import generatedProps from "@/registry/optics/dist/pagination.json";
import componentCode from "@/registry/optics/dist/pagination.tsx.txt";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/registry/optics/pagination";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/pagination.tsx",
		code: componentCode,
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
				<PaginationLink href="#" isActive>
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

const componentConfig: ComponentConfigData = {
	header: {
		title: "Pagination",
		description: "Pagination with page navigation, next/previous buttons, and page numbers.",
		href: "https://ui.shadcn.com/docs/components/pagination",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/optics/pagination";`,
		filename: "pagination.tsx",
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
