"use client";
import * as React from "react";
import {
	EmojiPicker,
	EmojiPickerContent,
	EmojiPickerSearch,
} from "@/registry/agusmayol/emoji-picker";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/registry/agusmayol/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

import { Type, Smile, Paperclip, Mic } from "lucide-react";

export function MessageBox({ className, ...props }) {
	const [open, setOpen] = React.useState(false);
	return (
		<Alert className="w-full flex flex-col shadow-sm my-1.5 rounded-2xl space-y-2.5 border-gray-400">
			<Textarea
				className="w-full border-0 shadow-none focus-visible:ring-0 px-0 resize-none"
				placeholder="Añade una nota al cliente"
			/>

			<div className="w-full flex items-center justify-between">
				<div className="flex items-center justify-start gap-2">
					<Button variant="ghost" size="icon" className="h-7 w-7 -ml-1">
						<Type />
					</Button>
					<Popover modal={true} open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button variant="ghost" size="icon" className="h-7 w-7 -ml-1">
								<Smile />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-fit p-0">
							<EmojiPicker
								className="h-[326px] rounded-lg border shadow-md"
								onEmojiSelect={(emoji) => {}}
							>
								<EmojiPickerSearch />
								<EmojiPickerContent />
							</EmojiPicker>
						</PopoverContent>
					</Popover>
					<Button variant="ghost" size="icon" className="h-7 w-7 -ml-1">
						<Paperclip />
					</Button>
					<Button variant="ghost" size="icon" className="h-7 w-7 -ml-1">
						<Mic />
					</Button>
				</div>

				<div className="flex items-center justify-start gap-2">
					<Button variant="black">Enviar</Button>
				</div>
			</div>
		</Alert>
	);
}
