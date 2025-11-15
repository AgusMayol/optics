"use client";

import * as React from "react";
import {
	Calculator,
	Calendar,
	Circle,
	CircleDashed,
	CreditCard,
	FileText,
	Settings,
	Smile,
	User,
} from "lucide-react";
import { Button } from "@/registry/agusmayol/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { DialogFooter } from "@/components/ui/dialog";

export function CommandDialogComponent({ links, className }) {
	const [open, setOpen] = React.useState(false);
	const router = useRouter();

	React.useEffect(() => {
		const down = (e) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<Button
				className={cn("text-muted-foreground text-xs", className)}
				variant="raised"
				size="sm"
				onClick={() => setOpen(true)}
			>
				Search the site ...{" "}
				<kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
					<span className="text-xs">⌘</span>J
				</kbd>
			</Button>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				className="w-full !max-w-xl"
			>
				<CommandInput placeholder="Search the site..." />
				<CommandList>
					<CommandEmpty>No results found. Please try again.</CommandEmpty>
					{links.map((link, index) => (
						<React.Fragment key={link.name}>
							<CommandGroup
								heading={link.name}
								// className={cn("pb-6", index > 0 && "mt-6")}
							>
								{link.items.map((item) => (
									<CommandItem
										key={item.name}
										className="cursor-pointer"
										onSelect={() => {
											setOpen(false);
											router.push(item.href);
										}}
									>
										{link.name === "Core" ? (
											<Circle />
										) : link.name === "Resources" ? (
											<FileText />
										) : (
											<CircleDashed />
										)}

										<span>{item.name}</span>
									</CommandItem>
								))}
							</CommandGroup>
						</React.Fragment>
					))}
				</CommandList>
				<DialogFooter className="bg-sidebar border-t p-2">
					<Button
						className="text-muted-foreground text-xs"
						variant="ghost"
						size="sm"
						onClick={() => setOpen(true)}
					>
						Go to page{" "}
						<kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
							<span className="text-xs">&#9166; Enter</span>
						</kbd>
					</Button>
				</DialogFooter>
			</CommandDialog>
		</>
	);
}
