"use client";
import { ComponentConfig } from "../layout";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/registry/optics/command";
import {
	Calculator,
	Calendar,
	CreditCard,
	Settings,
	Smile,
	User,
} from "lucide-react";

import componentCode from "@/registry/optics/dist/command.jsx.txt";
import generatedProps from "@/registry/optics/dist/command.json";

const componentFiles = [
	{
		path: "@/components/optics/command.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "command.jsx",
		code: `import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/optics/command";
import { Calendar, Smile, User, CreditCard, Settings, Calculator } from "lucide-react";

<Command className="rounded-lg border shadow-md max-w-md">
	<CommandInput placeholder="Type a command or search..." />
	<CommandList>
		<CommandEmpty>No results found.</CommandEmpty>
		<CommandGroup heading="Suggestions">
			<CommandItem>
				<Calendar className="mr-2 h-4 w-4" />
				<span>Calendar</span>
			</CommandItem>
			<CommandItem>
				<Smile className="mr-2 h-4 w-4" />
				<span>Search Emoji</span>
			</CommandItem>
			<CommandItem>
				<Calculator className="mr-2 h-4 w-4" />
				<span>Calculator</span>
			</CommandItem>
		</CommandGroup>
		<CommandSeparator />
		<CommandGroup heading="Settings">
			<CommandItem>
				<User className="mr-2 h-4 w-4" />
				<span>Profile</span>
				<CommandShortcut>⌘P</CommandShortcut>
			</CommandItem>
			<CommandItem>
				<CreditCard className="mr-2 h-4 w-4" />
				<span>Billing</span>
				<CommandShortcut>⌘B</CommandShortcut>
			</CommandItem>
			<CommandItem>
				<Settings className="mr-2 h-4 w-4" />
				<span>Settings</span>
				<CommandShortcut>⌘S</CommandShortcut>
			</CommandItem>
		</CommandGroup>
	</CommandList>
</Command>`,
	},
];



const demoComponent = (
	<Command className="rounded-lg border shadow-md max-w-md">
		<CommandInput placeholder="Type a command or search..." />
		<CommandList>
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandGroup heading="Suggestions">
				<CommandItem>
					<Calendar className="mr-2 h-4 w-4" />
					<span>Calendar</span>
				</CommandItem>
				<CommandItem>
					<Smile className="mr-2 h-4 w-4" />
					<span>Search Emoji</span>
				</CommandItem>
				<CommandItem>
					<Calculator className="mr-2 h-4 w-4" />
					<span>Calculator</span>
				</CommandItem>
			</CommandGroup>
			<CommandSeparator />
			<CommandGroup heading="Settings">
				<CommandItem>
					<User className="mr-2 h-4 w-4" />
					<span>Profile</span>
					<CommandShortcut>⌘P</CommandShortcut>
				</CommandItem>
				<CommandItem>
					<CreditCard className="mr-2 h-4 w-4" />
					<span>Billing</span>
					<CommandShortcut>⌘B</CommandShortcut>
				</CommandItem>
				<CommandItem>
					<Settings className="mr-2 h-4 w-4" />
					<span>Settings</span>
					<CommandShortcut>⌘S</CommandShortcut>
				</CommandItem>
			</CommandGroup>
		</CommandList>
	</Command>
);

const componentConfig = {
	header: {
		title: "Command",
		description: "Fast, composable, unstyled command menu for React.",
		href: "https://ui.shadcn.com/docs/components/command",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "command",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}
