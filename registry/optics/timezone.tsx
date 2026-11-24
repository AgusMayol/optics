"use client";

import * as React from "react";
import ms from "ms";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/registry/optics/tooltip";
import { Button } from "@/registry/optics/button";
import { cn } from "@/registry/optics/lib/utils";

const ONE_SECOND = ms("1s");
const ONE_MINUTE = ms("1m");
const ONE_HOUR = ms("1h");
const ONE_DAY = ms("1d");

type CopiedButtonType = "user" | "utc" | "relative";

export type TimezoneProps = Omit<
	React.ComponentProps<typeof TooltipContent>,
	"children" | "render"
> & {
	timestamp?: number | string | Date;
	render?: React.ComponentProps<typeof TooltipTrigger>["render"] | null;
};

function Timezone({
	timestamp = Date.now(),
	render = null,
	className = "",
	side = "top",
	sideOffset = 4,
	...props
}: TimezoneProps) {
	const [userTimezone, setUserTimezone] = React.useState<string | null>(null);
	const [formattedUserTime, setFormattedUserTime] = React.useState("");
	const [formattedUtcTime, setFormattedUtcTime] = React.useState("");
	const [relativeTime, setRelativeTime] = React.useState("");
	const [isOpen, setIsOpen] = React.useState(false);
	const [copiedButton, setCopiedButton] = React.useState<CopiedButtonType | null>(null);
	const [isExiting, setIsExiting] = React.useState(false);
	const exitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
	const resetTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	const utcFormatter = React.useMemo(
		() =>
			new Intl.DateTimeFormat("en-US", {
				timeZone: "UTC",
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			}),
		[],
	);

	const userFormatter = React.useMemo(
		() =>
			userTimezone
				? new Intl.DateTimeFormat("en-US", {
						timeZone: userTimezone,
						year: "numeric",
						month: "short",
						day: "numeric",
						hour: "numeric",
						minute: "2-digit",
						second: "2-digit",
						hour12: true,
					})
				: null,
		[userTimezone],
	);

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			setUserTimezone(timeZone);
		}
	}, []);

	const updateTimeValues = React.useCallback(() => {
		if (!timestamp || !userTimezone || !userFormatter) return;

		let date: Date;
		if (typeof timestamp === "string") {
			date = new Date(timestamp);
		} else if (typeof timestamp === "number") {
			date = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
		} else {
			date = new Date(timestamp);
		}

		if (isNaN(date.getTime())) {
			setFormattedUserTime("Invalid date");
			setFormattedUtcTime("Invalid date");
			setRelativeTime("Invalid date");
			return;
		}

		setFormattedUtcTime(utcFormatter.format(date));
		setFormattedUserTime(userFormatter.format(date));

		const now = new Date();
		const diffInMs = date.getTime() - now.getTime();
		const absDiffInMs = Math.abs(diffInMs);
		const isPast = diffInMs < 0;
		const direction = isPast ? "ago" : "in";

		let relative: string;

		if (absDiffInMs < ONE_HOUR) {
			const minutes = Math.floor(absDiffInMs / ONE_MINUTE);
			const remainingMs = absDiffInMs % ONE_MINUTE;
			const seconds = Math.floor(remainingMs / ONE_SECOND);

			if (seconds > 0 && minutes > 0) {
				const minutesStr = ms(minutes * ONE_MINUTE, { long: true });
				const secondsStr = ms(seconds * ONE_SECOND, { long: true });
				relative = `${minutesStr} ${secondsStr} ${direction}`;
			} else if (minutes > 0) {
				relative = `${ms(minutes * ONE_MINUTE, { long: true })} ${direction}`;
			} else {
				relative = `${ms(absDiffInMs, { long: true })} ${direction}`;
			}
		} else if (absDiffInMs < ONE_DAY) {
			const hours = Math.floor(absDiffInMs / ONE_HOUR);
			const remainingMs = absDiffInMs % ONE_HOUR;
			const minutes = Math.floor(remainingMs / ONE_MINUTE);

			if (minutes > 0) {
				const hoursStr = ms(hours * ONE_HOUR, { long: true });
				const minutesStr = ms(minutes * ONE_MINUTE, { long: true });
				relative = `${hoursStr} ${minutesStr} ${direction}`;
			} else {
				relative = `${ms(hours * ONE_HOUR, { long: true })} ${direction}`;
			}
		} else {
			relative = `${ms(absDiffInMs, { long: true })} ${direction}`;
		}

		setRelativeTime(relative);
	}, [timestamp, userTimezone, userFormatter, utcFormatter]);

	React.useEffect(() => {
		updateTimeValues();
	}, [updateTimeValues]);

	React.useEffect(() => {
		if (!isOpen) return;

		updateTimeValues();

		const interval = setInterval(() => {
			updateTimeValues();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [isOpen, updateTimeValues]);

	const clearCopyTimers = React.useCallback(() => {
		if (exitTimeoutRef.current) {
			clearTimeout(exitTimeoutRef.current);
			exitTimeoutRef.current = null;
		}
		if (resetTimeoutRef.current) {
			clearTimeout(resetTimeoutRef.current);
			resetTimeoutRef.current = null;
		}
	}, []);

	const copyToClipboard = React.useCallback(
		async (text: string, buttonId: CopiedButtonType) => {
			if (!text || text === "—" || text === "Invalid date" || text === "Loading...") {
				return;
			}

			try {
				await navigator.clipboard.writeText(text);
				clearCopyTimers();
				setIsExiting(false);
				setCopiedButton(buttonId);
				exitTimeoutRef.current = setTimeout(() => {
					setIsExiting(true);
					resetTimeoutRef.current = setTimeout(() => {
						setCopiedButton(null);
						setIsExiting(false);
					}, 300);
				}, 1500);
			} catch (err) {
				console.error("Error al copiar al portapapeles:", err);
			}
		},
		[clearCopyTimers],
	);

	React.useEffect(() => {
		return () => {
			clearCopyTimers();
		};
	}, [clearCopyTimers]);

	return (
		<Tooltip open={isOpen} onOpenChange={setIsOpen}>
			<TooltipTrigger render={render ?? undefined} />
			<TooltipContent
				className={cn("w-full max-w-none min-w-sm h-full hover:bg-background", className, "p-1")}
				side={side}
				sideOffset={sideOffset}
				{...props}
			>
				<div className="w-full flex flex-col gap-0.5 py-0 ">
					<Button
						variant="ghost"
						size="sm"
						className="font-normal"
						animation="colors"
						onClick={() => copyToClipboard(formattedUserTime, "user")}
					>
						<div className="w-full flex text-center justify-start gap-2 text-xs">
							<div className="text-start text-muted-foreground w-40">
								{userTimezone || "Loading..."}
							</div>
							<p
								className={cn(
									"tabular-nums font-mono transition-all duration-300 text-foreground",
									copiedButton === "user"
										? isExiting
											? "opacity-0 scale-95"
											: "opacity-100 scale-100 animate-in fade-in-0 zoom-in-95"
										: "opacity-100 scale-100",
								)}
							>
								{copiedButton === "user" ? "Copied!" : formattedUserTime || "—"}
							</p>
						</div>
					</Button>

					<Button
						variant="ghost"
						size="sm"
						className="font-normal"
						animation="colors"
						onClick={() => copyToClipboard(formattedUtcTime, "utc")}
					>
						<div className="w-full flex text-center justify-start gap-2 text-xs">
							<div className="text-start text-muted-foreground w-40">UTC</div>
							<p
								className={cn(
									"tabular-nums font-mono transition-all duration-300 text-foreground",
									copiedButton === "utc"
										? isExiting
											? "opacity-0 scale-95"
											: "opacity-100 scale-100 animate-in fade-in-0 zoom-in-95"
										: "opacity-100 scale-100",
								)}
							>
								{copiedButton === "utc" ? "Copied!" : formattedUtcTime || "—"}
							</p>
						</div>
					</Button>

					<Button
						variant="ghost"
						size="sm"
						className="font-normal z-10"
						animation="colors"
						onClick={() => copyToClipboard(relativeTime, "relative")}
					>
						<div className="w-full flex text-center justify-start gap-2 text-xs">
							<div className="text-start text-muted-foreground w-40">Relative</div>
							<p
								className={cn(
									"tabular-nums font-mono transition-all duration-300 text-foreground",
									copiedButton === "relative"
										? isExiting
											? "opacity-0 scale-95"
											: "opacity-100 scale-100 animate-in fade-in-0 zoom-in-95"
										: "opacity-100 scale-100",
								)}
							>
								{copiedButton === "relative" ? "Copied!" : relativeTime || "—"}
							</p>
						</div>
					</Button>
				</div>
			</TooltipContent>
		</Tooltip>
	);
}

Timezone.displayName = "Timezone";

export { Timezone };
