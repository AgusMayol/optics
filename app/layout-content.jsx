"use client";
import { useElementHeight } from "@/hooks/use-element-height";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Button } from "@/registry/optics/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export const links = [
	{
		name: "Core",
		items: [
			{
				name: "Introduction",
				href: "/",
			},
			{
				name: "Installation",
				href: "/installation",
			},
			{
				name: "Typography",
				href: "/core/typography",
			},
			{
				name: "Iconography",
				href: "/core/iconography",
			},
			{
				name: "Materials",
				href: "/core/materials",
			},
			{
				name: "Colors",
				href: "/core/colors",
			},
		],
	},
	{
		name: "Resources",
		items: [
			{
				name: "Web Interface Guidelines",
				href: "https://vercel.com/design/guidelines",
			},
			{
				name: "SEO & Metadata",
				href: "/resources/seo-metadata",
			},
			{
				name: "Performance",
				href: "/resources/performance",
			},
			{
				name: "Accesibility",
				href: "/resources/accesibility",
			},
			{
				name: "Animations",
				href: "/resources/animations",
			},
			{
				name: "Security",
				href: "/resources/security",
			},
		],
	},
	{
		name: "Collections",
		items: [
			{
				name: "Cursor Rules & MCPs",
				href: "/collections/cursor-rules",
			},
			{
				name: "Next.js Configuration",
				href: "/collections/nextjs-configuration",
				disabled: true,
			},
			{
				name: "Biome Configuration",
				href: "/collections/biome",
				disabled: true,
			},
			{
				name: "Tailwind Variables",
				href: "/resources/tailwind-variables",
				disabled: true,
			},
			{
				name: "Gitignore File",
				href: "/collections/gitignore",
				disabled: true,
			},
			{
				name: "Hooks",
				href: "/collections/hooks",
				disabled: true,
			},
		],
	},
	{
		name: "Components",
		items: [
			{
				name: "Accordion",
				href: "/components/accordion",
			},
			{
				name: "Alert",
				href: "/components/alert",
			},
			{
				name: "Alert Dialog",
				href: "/components/alert-dialog",
			},
			{
				name: "Aspect Ratio",
				href: "/components/aspect-ratio",
			},
			{
				name: "Avatar",
				href: "/components/avatar",
			},
			{
				name: "Badge",
				href: "/components/badge",
			},
			{
				name: "Breadcrumb",
				href: "/components/breadcrumb",
			},
			{
				name: "Button",
				href: "/components/button",
			},
			{
				name: "Button Group",
				href: "/components/button-group",
			},
			{
				name: "Calendar",
				href: "/components/calendar",
			},
			{
				name: "Card",
				href: "/components/card",
			},
			{
				name: "Carousel",
				href: "/components/carousel",
			},
			{
				name: "Checkbox",
				href: "/components/checkbox",
			},
			{
				name: "Code Block",
				href: "/components/code-block",
			},
			{
				name: "Code Snippet",
				href: "/components/code-snippet",
			},
			{
				name: "Collapsible",
				href: "/components/collapsible",
			},
			{
				name: "Command",
				href: "/components/command",
			},
			{
				name: "Context Menu",
				href: "/components/context-menu",
			},
			{
				name: "Data Table",
				href: "/components/data-table",
			},
			{
				name: "Date Picker",
				href: "/components/date-picker",
			},
			{
				name: "Dialog",
				href: "/components/dialog",
			},
			{
				name: "Drawer",
				href: "/components/drawer",
			},
			{
				name: "Dropdown Menu",
				href: "/components/dropdown-menu",
			},
			{
				name: "Empty",
				href: "/components/empty",
			},
			{
				name: "Field",
				href: "/components/field",
			},
			{
				name: "Form",
				href: "/components/form",
			},
			{
				name: "Grid",
				href: "/components/grid",
			},
			{
				name: "Guided Tour",
				href: "/components/guided-tour",
			},
			{
				name: "Hover Card",
				href: "/components/hover-card",
			},
			{
				name: "Input",
				href: "/components/input",
			},
			{
				name: "Input Group",
				href: "/components/input-group",
			},
			{
				name: "Input OTP",
				href: "/components/input-otp",
			},
			{
				name: "Item",
				href: "/components/item",
			},
			{
				name: "Kbd",
				href: "/components/kbd",
			},
			{
				name: "Label",
				href: "/components/label",
			},
			{
				name: "Menubar",
				href: "/components/menubar",
			},
			{
				name: "Multi Select",
				href: "/components/multi-select",
			},
			{
				name: "Navigation Menu",
				href: "/components/navigation-menu",
			},
			{
				name: "Pagination",
				href: "/components/pagination",
			},
			{
				name: "Popover",
				href: "/components/popover",
			},
			{
				name: "Progress",
				href: "/components/progress",
			},
			{
				name: "Radio Group",
				href: "/components/radio-group",
			},
			{
				name: "Resizable",
				href: "/components/resizable",
			},
			{
				name: "Scroll Area",
				href: "/components/scroll-area",
			},
			{
				name: "Select",
				href: "/components/select",
			},
			{
				name: "Separator",
				href: "/components/separator",
			},
			{
				name: "Sheet",
				href: "/components/sheet",
			},
			{
				name: "Show More",
				href: "/components/show-more",
			},
			{
				name: "Skeleton",
				href: "/components/skeleton",
			},
			{
				name: "Slider",
				href: "/components/slider",
			},
			{
				name: "Sonner",
				href: "/components/sonner",
			},
			{
				name: "Spinner",
				href: "/components/spinner",
			},
			{
				name: "Star Rating",
				href: "/components/star-rating",
			},
			{
				name: "Switch",
				href: "/components/switch",
			},
			{
				name: "Table",
				href: "/components/table",
			},
			{
				name: "Tabs",
				href: "/components/tabs",
			},
			{
				name: "Textarea",
				href: "/components/textarea",
			},
			{
				name: "Theme Switcher",
				href: "/components/theme-switcher",
			},
			{
				name: "Timezone",
				href: "/components/timezone",
			},
			{
				name: "Toggle",
				href: "/components/toggle",
			},
			{
				name: "Toggle Group",
				href: "/components/toggle-group",
			},
			{
				name: "Tooltip",
				href: "/components/tooltip",
			},
		],
	},
	{
		name: "",
		items: [
			{
				name: "MCP Server",
				href: "/mcp-server",
				logo: "/images/mcp.svg",
			},
			{
				name: "llms.txt",
				href: "https://optics.agusmayol.com.ar/llms.txt",
			},
		],
	},
];

export function LayoutContent({ children }) {
	const [contentRef, contentHeight] = useElementHeight();

	return (
		<div className="w-full h-full lg:max-w-7xl mx-auto grid grid-cols-14 min-h-svh lg:px-4 lg:py-8 items-start">
			<Sidebar links={links} maxHeight={contentHeight} />
			<div
				ref={contentRef}
				className="w-full col-span-full lg:col-span-11 lg:border lg:border-l-0 lg:rounded-l-none lg:rounded-3xl flex flex-col flex-1 lg:bg-sidebar"
			>
				<Header links={links} />
				{children}
			</div>
			<footer className="col-span-full border-t lg:border-t-0 w-full flex items-center justify-end text-end py-3 px-4 lg:px-2">
				<p className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
					Made from
					<Image src="/images/AR.png" alt="Argentina" width={16} height={16} />
					by{" "}
					<Button
						variant="link"
						className="text-xs text-muted-foreground hover:text-primary transition-colors"
						asChild
					>
						<Link
							href="https://agusmayol.com.ar"
							target="_blank"
							rel="noopener noreferrer"
						>
							AgusMayol
							<ArrowUpRight size={16} className="-ml-2" />
						</Link>
					</Button>
					. The source code is available on{" "}
					<Button
						variant="link"
						className="text-xs text-muted-foreground hover:text-primary transition-colors"
						asChild
					>
						<Link
							href="https://github.com/agusmayol/optics"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
							<ArrowUpRight size={16} className="-ml-2" />
						</Link>
					</Button>
				</p>
			</footer>
		</div>
	);
}
