"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState, forwardRef } from "react";
import { cn } from '@/registry/optics/lib/utils';

const themes = [
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

export const ThemeSwitcher = forwardRef(
	({ value, onChange, defaultValue = "system", className, ...props }, ref) => {
		const [theme, setTheme] = useControllableState({
			defaultProp: defaultValue,
			prop: value,
			onChange,
		});
		const [mounted, setMounted] = useState(false);

		const handleThemeClick = useCallback(
			(themeKey) => {
				setTheme(themeKey);
			},
			[setTheme],
		);

		// Prevent hydration mismatch
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
