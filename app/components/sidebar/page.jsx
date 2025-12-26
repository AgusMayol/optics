"use client";
import { ComponentConfig } from "../layout";
import {
	SidebarProvider,
	Sidebar,
	SidebarTrigger,
	SidebarHeader,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarFooter,
	SidebarSeparator,
	SidebarInset,
} from "@/registry/optics/sidebar";
import { Button } from "@/registry/optics/button";
import { Input } from "@/registry/optics/input";
import { Home, Inbox, Settings2, Users } from "lucide-react";

import componentCode from "@/registry/optics/dist/sidebar.jsx.txt";
import generatedProps from "@/registry/optics/dist/sidebar.json";

const componentFiles = [
	{
		path: "@/components/optics/sidebar.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="w-full rounded-xl border bg-background">
		<SidebarProvider defaultOpen className="rounded-xl">
			<div className="w-full flex min-h-[320px] rounded-xl!">
				<Sidebar
					collapsible="icon"
					variant="sidebar"
					className="static inset-auto w-full h-full rounded-xl!"
				>
					<SidebarHeader className="gap-3 rounded-t-xl!">
						<div className="flex items-center justify-between">
							<span className="text-sm font-semibold truncate">Project</span>
							<SidebarTrigger className="h-7 w-7" />
						</div>
						<Input placeholder="Search" className="h-8 text-xs" />
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>General</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton>
											<Home className="size-4" />
											Home
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton>
											<Inbox className="size-4" />
											Inbox
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton>
											<Users className="size-4" />
											Teams
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						<SidebarSeparator />
						<SidebarGroup>
							<SidebarGroupLabel>Settings</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton>
											<Settings2 className="size-4" />
											Preferences
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>
						<Button variant="outline" size="sm" className="w-full truncate">
							Upgrade
						</Button>
					</SidebarFooter>
				</Sidebar>
				<SidebarInset className="bg-muted/40 p-4">
					<div className="w-full flex h-full flex-col gap-4 rounded-lg border bg-background p-4">
						<div className="flex items-center justify-between">
							<h3 className="text-sm font-semibold">Dashboard</h3>
							<SidebarTrigger className="h-7 w-7" />
						</div>
						<p className="text-sm text-muted-foreground">
							Main content goes here. Toggle the sidebar to see the layout
							adjust.
						</p>
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	</div>
);

const componentConfig = {
	header: {
		title: "Sidebar",
		description:
			"Responsive sidebar layout with collapsible variants and keyboard toggle.",
		href: "https://ui.shadcn.com",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		filename: "sidebar.jsx",
		imports: `import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarInset,
} from "@/components/optics/sidebar";
import { Input } from "@/components/optics/input";
import { Button } from "@/components/optics/button";
import { Home, Inbox, Settings2, Users } from "lucide-react";`,
	},
	installation: {
		componentName: "sidebar",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
