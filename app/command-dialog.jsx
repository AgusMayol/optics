"use client";

import * as React from "react";
import {
	ArrowDown,
	ArrowUp,
	Bot,
	Calculator,
	Calendar,
	Circle,
	CircleDashed,
	CreditCard,
	FileText,
	Folder,
	Settings,
	Smile,
	User,
} from "lucide-react";
import { Button } from "@/registry/optics/button";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/registry/optics/command";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { DialogFooter } from "@/registry/optics/dialog";
import { Kbd } from "@/registry/optics/kbd";
import { ChevronDown, ChevronUp } from "lucide-react";

export function CommandDialogComponent({ links, className }) {
	const [open, setOpen] = React.useState(false);
	const router = useRouter();

	return (
		<>
			<Button
				className={cn(
					"text-muted-foreground text-xs justify-between pr-1.5 gap-2",
					open && "!scale-[0.97] !ring-[3px] !ring-ring/25", //Se queda apretado el botón cuando el dialog está abierto
					className,
				)}
				variant="raised"
				size="lg"
				onClick={() => setOpen(true)}
			>
				<span className="items-center text-xs pr-2 ">Search the site ...</span>{" "}
				<Kbd
					useHotkey
					hotkey="cmd+J"
					onHotkeyPress={() => setOpen(true)}
					className=""
					variant="legacy"
				>
					⌘ J
				</Kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen} className="w-full">
				<CommandInput className="" placeholder="Search the site..." />
				<CommandList className="bg-background py-2">
					<CommandEmpty>No results found. Please try again.</CommandEmpty>
					{links.map((link, index) => (
						<React.Fragment key={link.name}>
							<CommandGroup
								heading={link.name}
								// className={cn("pb-6", index > 0 && "mt-6")}
							>
								{link.items.map(
									(item) =>
										!item.disabled && (
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
												) : link.name === "Collections" ? (
													<Folder />
												) : link.name === "Components" ? (
													<CircleDashed />
												) : (
													<Bot />
												)}

												<span>{item.name}</span>
											</CommandItem>
										),
								)}
							</CommandGroup>
						</React.Fragment>
					))}
				</CommandList>
				<DialogFooter className="bg-background flex items-center justify-between! border-t p-2! sm:mx-0">
					<Button
						className="text-muted-foreground text-xs pl-0.25 disabled:opacity-100"
						variant="ghost"
						size="lg"
						disabled
					>
						<Kbd
							useHotkey
							hotkey="ArrowUp"
							onHotkeyPress={() => setOpen(false)}
							className="mt-1 shadow-none aspect-square size-7"
						>
							<ArrowUp className="size-3!" />
						</Kbd>
						<Kbd
							useHotkey
							hotkey="ArrowDown"
							onHotkeyPress={() => setOpen(false)}
							className="mt-1 shadow-none aspect-square size-7"
						>
							<ArrowDown className="size-3!" />
						</Kbd>{" "}
						Navigate
					</Button>
					<Button
						className="text-muted-foreground text-xs pr-0.25"
						variant="ghost"
						size="lg"
						onClick={() => setOpen(false)}
					>
						Go to page{" "}
						<Kbd
							useHotkey
							hotkey="Enter"
							onHotkeyPress={() => setOpen(false)}
							className="aspect-auto mt-1 shadow-none"
						>
							&#9166; Enter
						</Kbd>
					</Button>
				</DialogFooter>
			</CommandDialog>
		</>
	);
}
