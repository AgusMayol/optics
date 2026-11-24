"use client";

import { useControlledState } from "@/registry/optics/hooks/use-controlled-state";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";
import { useCallback, useEffect, useState, forwardRef } from "react";
import { cn } from "@/registry/optics/lib/utils";

export type ThemeSwitcherValue = "system" | "light" | "dark";

const themes: ReadonlyArray<{
	key: ThemeSwitcherValue;
	icon: LucideIcon;
	label: string;
}> = [
	{
		key: "system",
		icon: Monitor,
		label: "System theme",
	},
	{
		key: "light",
		icon: Sun,
		label: "Light theme",
	},
	{
		key: "dark",
		icon: Moon,
		label: "Dark theme",
	},
];

export interface ThemeSwitcherProps extends Omit<
	React.ComponentPropsWithoutRef<"div">,
	"value" | "defaultValue" | "onChange"
> {
	value?: ThemeSwitcherValue;
	onChange?: (theme: ThemeSwitcherValue) => void;
	defaultValue?: ThemeSwitcherValue;
}

export const ThemeSwitcher = forwardRef<HTMLDivElement, ThemeSwitcherProps>(
	(
		{ value = undefined, onChange = undefined, defaultValue = "system", className = "", ...props },
		ref,
	) => {
		const [theme, setTheme] = useControlledState<ThemeSwitcherValue>({
			defaultValue: defaultValue,
			value: value,
			onChange,
		});
		const [mounted, setMounted] = useState(false);

		const handleThemeClick = useCallback(
			(themeKey: ThemeSwitcherValue) => {
				setTheme(themeKey);
			},
			[setTheme],
		);

		useEffect(() => {
			setMounted(true);
		}, []);

		if (!mounted) {
			return null;
		}

		return (
			<div
				ref={ref}
				className={cn(
					"relative isolate flex h-8 rounded-full squircle-none bg-background p-1 ring-1 ring-border",
					className,
				)}
				{...props}
			>
				{themes.map(({ key, icon: Icon, label }) => {
					const isActive = theme === key;

					return (
						<button
							aria-label={label}
							className="relative h-6 w-6 rounded-full squircle-none"
							key={key}
							onClick={() => handleThemeClick(key)}
							type="button"
						>
							{isActive && (
								<motion.div
									className="absolute inset-0 rounded-full squircle-none bg-secondary"
									layoutId="activeTheme"
									transition={{ type: "spring", duration: 0.5 }}
								/>
							)}
							<Icon
								className={cn(
									"relative z-10 m-auto h-4 w-4",
									isActive ? "text-foreground" : "text-muted-foreground",
								)}
							/>
						</button>
					);
				})}
			</div>
		);
	},
);

ThemeSwitcher.displayName = "ThemeSwitcher";
