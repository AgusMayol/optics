"use client";
import { useElementHeight } from "@/hooks/use-element-height";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Button } from "@/registry/optics/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
				installed: false,
				disabled: true,
			},
			{
				name: "Next.js Configuration",
				href: "/collections/nextjs-configuration",
				installed: false,
				disabled: true,
			},
			{
				name: "Biome Configuration",
				href: "/collections/biome",
				installed: false,
				disabled: true,
			},
			{
				name: "Tailwind Variables",
				href: "/resources/tailwind-variables",
				installed: false,
				disabled: true,
			},
			{
				name: "Gitignore File",
				href: "/collections/gitignore",
				installed: false,
				disabled: true,
			},
			{
				name: "Hooks",
				href: "/collections/hooks",
				installed: false,
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
				own: false,
				custom: true,
			},
			{
				name: "Alert",
				href: "/components/alert",
				own: false,
			},
			{
				name: "Alert Dialog",
				href: "/components/alert-dialog",
				own: false,
				custom: true,
			},
			{
				name: "Aspect Ratio",
				href: "/components/aspect-ratio",
				own: false,
			},
			{
				name: "Avatar",
				href: "/components/avatar",
				own: false,
				custom: true,
			},
			{
				name: "Badge",
				href: "/components/badge",
				own: false,
				custom: true,
			},
			{
				name: "Breadcrumb",
				href: "/components/breadcrumb",
				own: false,
				custom: false,
			},
			{
				name: "Button",
				href: "/components/button",
				own: false,
				custom: true,
			},
			{
				name: "Button Group",
				href: "/components/button-group",
				own: false,
				custom: false,
			},
			{
				name: "Calendar",
				href: "/components/calendar",
				own: false,
				installed: true,
			},
			{
				name: "Card",
				href: "/components/card",
				own: false,
				custom: true,
			},
			{
				name: "Carousel",
				href: "/components/carousel",
				own: false,
				installed: true,
			},
			{
				name: "Checkbox",
				href: "/components/checkbox",
				own: false,
			},
			{
				name: "Code Block",
				href: "/components/code-block",
				own: true,
			},
			{
				name: "Code Snippet",
				href: "/components/code-snippet",
				own: true,
			},
			{
				name: "Collapsible",
				href: "/components/collapsible",
				own: false,
				installed: true,
			},
			{
				name: "Command",
				href: "/components/command",
				own: false,
				installed: true,
			},
			{
				name: "Context Menu",
				href: "/components/context-menu",
				own: false,
			},
			{
				name: "Data Table",
				href: "/components/data-table",
				own: false,
			},
			{
				name: "Date Picker",
				href: "/components/date-picker",
				own: false,
			},
			{
				name: "Dialog",
				href: "/components/dialog",
				own: false,
				installed: true,
			},
			{
				name: "Drawer",
				href: "/components/drawer",
				own: false,
				installed: true,
			},
			{
				name: "Dropdown Menu",
				href: "/components/dropdown-menu",
				own: false,
			},
			{
				name: "Emoji Picker",
				href: "/components/emoji-picker",
				own: true,
			},
			{
				name: "Empty State",
				href: "/components/empty-state",
				own: false,
				custom: false,
			},
			{
				name: "Feedback",
				href: "/components/feedback",
				own: true,
			},
			{
				name: "Field",
				href: "/components/field",
				own: false,
				custom: false,
			},
			{
				name: "Form",
				href: "/components/form",
				own: false,
				installed: true,
			},
			{
				name: "Grid",
				href: "/components/grid",
				own: true,
			},
			{
				name: "Guided Tour",
				href: "/components/guided-tour",
				own: true,
			},
			{
				name: "Hover Card",
				href: "/components/hover-card",
				own: false,
				installed: true,
			},
			{
				name: "Input",
				href: "/components/input",
				own: false,
				custom: true,
			},
			{
				name: "Input Group",
				href: "/components/input-group",
				own: false,
				custom: true,
			},
			{
				name: "Input OTP",
				href: "/components/input-otp",
				own: false,
				custom: false,
				installed: true,
			},
			{
				name: "Item",
				href: "/components/item",
				own: false,
				custom: true,
			},
			{
				name: "Kbd",
				href: "/components/kbd",
				own: false,
			},
			{
				name: "Label",
				href: "/components/label",
				own: false,
			},
			{
				name: "Menubar",
				href: "/components/menubar",
				own: false,
				installed: true,
			},
			{
				name: "Multi Select",
				href: "/components/multi-select",
				own: true,
				custom: false,
			},
			{
				name: "Navigation Menu",
				href: "/components/navigation-menu",
				own: false,
				installed: true,
			},
			{
				name: "Pagination",
				href: "/components/pagination",
				own: false,
				installed: true,
			},
			{
				name: "Popover",
				href: "/components/popover",
				own: false,
			},
			{
				name: "Progress",
				href: "/components/progress",
				own: false,
				installed: true,
			},
			{
				name: "Radio Group",
				href: "/components/radio-group",
				own: false,
				installed: true,
			},
			{
				name: "Resizable",
				href: "/components/resizable",
				own: false,
				installed: true,
			},
			{
				name: "Scroll Area",
				href: "/components/scroll-area",
				own: false,
			},
			{
				name: "Select",
				href: "/components/select",
				own: false,
			},
			{
				name: "Separator",
				href: "/components/separator",
				own: false,
				custom: true,
			},
			{
				name: "Sheet",
				href: "/components/sheet",
				own: false,
				custom: true,
			},
			{
				name: "Show More",
				href: "/components/show-more",
				own: true,
			},
			{
				name: "Skeleton",
				href: "/components/skeleton",
				own: false,
				installed: true,
			},
			{
				name: "Slider",
				href: "/components/slider",
				own: false,
			},
			{
				name: "Sonner",
				href: "/components/sonner",
				own: false,
				custom: true,
			},
			{
				name: "Spinner",
				href: "/components/spinner",
				own: true,
			},
			{
				name: "Star Rating",
				href: "/components/star-rating",
				own: true,
			},
			{
				name: "Switch",
				href: "/components/switch",
				own: false,
				custom: true,
			},
			{
				name: "Table",
				href: "/components/table",
				own: false,
				installed: true,
			},
			{
				name: "Tabs",
				href: "/components/tabs",
				own: false,
				custom: true,
			},
			{
				name: "Textarea",
				href: "/components/textarea",
				own: false,
				custom: true,
			},
			{
				name: "Theme Switcher",
				href: "/components/theme-switcher",
				own: true,
			},
			{
				name: "Timezone",
				href: "/components/timezone",
				own: true,
			},
			{
				name: "Toggle",
				href: "/components/toggle",
				own: false,
				installed: true,
			},
			{
				name: "Toggle Group",
				href: "/components/toggle-group",
				own: false,
				installed: true,
			},
			{
				name: "Tooltip",
				href: "/components/tooltip",
				own: false,
				custom: true,
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
				<p className="text-xs text-muted-foreground/80">
					Made from 🇦🇷 by{" "}
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
							href="https://github.com/optics/optics"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
							<ArrowUpRight size={16} className="-ml-2" />
						</Link>
					</Button>
					.
				</p>
			</footer>
		</div>
	);
}
