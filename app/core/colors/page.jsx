"use client";
import { cn } from "@/lib/utils";

import { useIsMobile } from "@/hooks/use-mobile";
import { tailwindColors } from "@/lib/tailwind-colors";
import { Card } from "@/registry/optics/card";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
} from "@/registry/optics/code-snippet";
import { GridContainer, GridItem, GridRow } from "@/registry/optics/grid";
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/optics/select";
import { Separator } from "@/registry/optics/separator";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/registry/optics/input-group";
import { ButtonGroup, ButtonGroupText } from "@/registry/optics/button-group";
import { toast } from "@/registry/optics/sonner";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/registry/optics/tooltip";
import {
	useState,
	useMemo,
	useCallback,
	useDeferredValue,
	useTransition,
	useRef,
} from "react";
import { ArrowDown } from "lucide-react";
import { HexColorPicker } from "react-colorful";

// Helper function to copy text to clipboard
const copyToClipboard = async (text) => {
	if (
		typeof navigator !== "undefined" &&
		navigator.clipboard &&
		typeof navigator.clipboard.writeText === "function"
	) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// Fallback to execCommand
		}
	}

	// Fallback: use execCommand
	try {
		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.style.position = "fixed";
		textarea.style.opacity = "0";
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
		return true;
	} catch {
		return false;
	}
};

// Color conversion utilities (moved outside component for performance)
const hexToRgb = (hex) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
			}
		: null;
};

const rgbToHsl = (r, g, b) => {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
				break;
			case g:
				h = ((b - r) / d + 2) / 6;
				break;
			case b:
				h = ((r - g) / d + 4) / 6;
				break;
		}
	}

	const hueDegrees = h * 360;
	const roundedHue = Math.round(hueDegrees);
	const validHue = roundedHue % 360;

	return {
		h: validHue,
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
};

const hslToRgb = (h, s, l) => {
	h /= 360;
	s /= 100;
	l /= 100;
	let r, g, b;

	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255),
	};
};

const rgbToOklch = (r, g, b) => {
	const linearR = r / 255;
	const linearG = g / 255;
	const linearB = b / 255;

	const x = 0.4124564 * linearR + 0.3575761 * linearG + 0.1804375 * linearB;
	const y = 0.2126729 * linearR + 0.7151522 * linearG + 0.072175 * linearB;
	const z = 0.0193339 * linearR + 0.119192 * linearG + 0.9503041 * linearB;

	const fx = x > 0.008856 ? Math.cbrt(x) : 7.787 * x + 16 / 116;
	const fy = y > 0.008856 ? Math.cbrt(y) : 7.787 * y + 16 / 116;
	const fz = z > 0.008856 ? Math.cbrt(z) : 7.787 * z + 16 / 116;

	const l = 116 * fy - 16;
	const a = 500 * (fx - fy);
	const bLab = 200 * (fy - fz);

	const lOk = l / 100;
	const aOk = a / 100;
	const bOk = bLab / 100;

	const c = Math.sqrt(aOk * aOk + bOk * bOk);
	const h = Math.atan2(bOk, aOk) * (180 / Math.PI);
	const hNormalized = h < 0 ? h + 360 : h;

	return {
		l: Number(lOk.toFixed(2)),
		c: Number(c.toFixed(2)),
		h: Number(hNormalized.toFixed(0)),
	};
};

const oklchToRgb = (l, c, h) => {
	const hRad = (h * Math.PI) / 180;
	const a = c * Math.cos(hRad);
	const b = c * Math.sin(hRad);

	const lLab = l * 100;
	const aLab = a * 100;
	const bLab = b * 100;

	const fy = (lLab + 16) / 116;
	const fx = aLab / 500 + fy;
	const fz = fy - bLab / 200;

	const x = fx > 0.206897 ? fx * fx * fx : (fx - 16 / 116) / 7.787;
	const y = fy > 0.206897 ? fy * fy * fy : (fy - 16 / 116) / 7.787;
	const z = fz > 0.206897 ? fz * fz * fz : (fz - 16 / 116) / 7.787;

	const linearR = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
	const linearG = -0.969266 * x + 1.8760108 * y + 0.041556 * z;
	const linearB = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;

	const gamma = (val) => {
		if (val <= 0.0031308) {
			return 12.92 * val;
		}
		return 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
	};

	return {
		r: Math.round(Math.max(0, Math.min(255, gamma(linearR) * 255))),
		g: Math.round(Math.max(0, Math.min(255, gamma(linearG) * 255))),
		b: Math.round(Math.max(0, Math.min(255, gamma(linearB) * 255))),
	};
};

export default function Page() {
	const isMobile = useIsMobile();
	const colors = [
		{
			name: "Neutral",
			colors: [
				"bg-neutral-50",
				"bg-neutral-100",
				"bg-neutral-200",
				"bg-neutral-300",
				"bg-neutral-400",
				"bg-neutral-500",
				"bg-neutral-600",
				"bg-neutral-700",
				"bg-neutral-800",
				"bg-neutral-900",
				"bg-neutral-950",
			],
		},
		{
			name: "Stone",
			colors: [
				"bg-stone-50",
				"bg-stone-100",
				"bg-stone-200",
				"bg-stone-300",
				"bg-stone-400",
				"bg-stone-500",
				"bg-stone-600",
				"bg-stone-700",
				"bg-stone-800",
				"bg-stone-900",
				"bg-stone-950",
			],
		},
		{
			name: "Zinc",
			colors: [
				"bg-zinc-50",
				"bg-zinc-100",
				"bg-zinc-200",
				"bg-zinc-300",
				"bg-zinc-400",
				"bg-zinc-500",
				"bg-zinc-600",
				"bg-zinc-700",
				"bg-zinc-800",
				"bg-zinc-900",
				"bg-zinc-950",
			],
		},
		{
			name: "Slate",
			colors: [
				"bg-slate-50",
				"bg-slate-100",
				"bg-slate-200",
				"bg-slate-300",
				"bg-slate-400",
				"bg-slate-500",
				"bg-slate-600",
				"bg-slate-700",
				"bg-slate-800",
				"bg-slate-900",
				"bg-slate-950",
			],
		},
		{
			name: "Gray",
			colors: [
				"bg-gray-50",
				"bg-gray-100",
				"bg-gray-200",
				"bg-gray-300",
				"bg-gray-400",
				"bg-gray-500",
				"bg-gray-600",
				"bg-gray-700",
				"bg-gray-800",
				"bg-gray-900",
				"bg-gray-950",
			],
		},
		{
			name: "Red",
			colors: [
				"bg-red-50",
				"bg-red-100",
				"bg-red-200",
				"bg-red-300",
				"bg-red-400",
				"bg-red-500",
				"bg-red-600",
				"bg-red-700",
				"bg-red-800",
				"bg-red-900",
				"bg-red-950",
			],
		},
		{
			name: "Orange",
			colors: [
				"bg-orange-50",
				"bg-orange-100",
				"bg-orange-200",
				"bg-orange-300",
				"bg-orange-400",
				"bg-orange-500",
				"bg-orange-600",
				"bg-orange-700",
				"bg-orange-800",
				"bg-orange-900",
				"bg-orange-950",
			],
		},
		{
			name: "Amber",
			colors: [
				"bg-amber-50",
				"bg-amber-100",
				"bg-amber-200",
				"bg-amber-300",
				"bg-amber-400",
				"bg-amber-500",
				"bg-amber-600",
				"bg-amber-700",
				"bg-amber-800",
				"bg-amber-900",
				"bg-amber-950",
			],
		},
		{
			name: "Yellow",
			colors: [
				"bg-yellow-50",
				"bg-yellow-100",
				"bg-yellow-200",
				"bg-yellow-300",
				"bg-yellow-400",
				"bg-yellow-500",
				"bg-yellow-600",
				"bg-yellow-700",
				"bg-yellow-800",
				"bg-yellow-900",
				"bg-yellow-950",
			],
		},
		{
			name: "Lime",
			colors: [
				"bg-lime-50",
				"bg-lime-100",
				"bg-lime-200",
				"bg-lime-300",
				"bg-lime-400",
				"bg-lime-500",
				"bg-lime-600",
				"bg-lime-700",
				"bg-lime-800",
				"bg-lime-900",
				"bg-lime-950",
			],
		},
		{
			name: "Green",
			colors: [
				"bg-green-50",
				"bg-green-100",
				"bg-green-200",
				"bg-green-300",
				"bg-green-400",
				"bg-green-500",
				"bg-green-600",
				"bg-green-700",
				"bg-green-800",
				"bg-green-900",
				"bg-green-950",
			],
		},
		{
			name: "Emerald",
			colors: [
				"bg-emerald-50",
				"bg-emerald-100",
				"bg-emerald-200",
				"bg-emerald-300",
				"bg-emerald-400",
				"bg-emerald-500",
				"bg-emerald-600",
				"bg-emerald-700",
				"bg-emerald-800",
				"bg-emerald-900",
				"bg-emerald-950",
			],
		},
		{
			name: "Teal",
			colors: [
				"bg-teal-50",
				"bg-teal-100",
				"bg-teal-200",
				"bg-teal-300",
				"bg-teal-400",
				"bg-teal-500",
				"bg-teal-600",
				"bg-teal-700",
				"bg-teal-800",
				"bg-teal-900",
				"bg-teal-950",
			],
		},
		{
			name: "Cyan",
			colors: [
				"bg-cyan-50",
				"bg-cyan-100",
				"bg-cyan-200",
				"bg-cyan-300",
				"bg-cyan-400",
				"bg-cyan-500",
				"bg-cyan-600",
				"bg-cyan-700",
				"bg-cyan-800",
				"bg-cyan-900",
				"bg-cyan-950",
			],
		},
		{
			name: "Sky",
			colors: [
				"bg-sky-50",
				"bg-sky-100",
				"bg-sky-200",
				"bg-sky-300",
				"bg-sky-400",
				"bg-sky-500",
				"bg-sky-600",
				"bg-sky-700",
				"bg-sky-800",
				"bg-sky-900",
				"bg-sky-950",
			],
		},
		{
			name: "Blue",
			colors: [
				"bg-blue-50",
				"bg-blue-100",
				"bg-blue-200",
				"bg-blue-300",
				"bg-blue-400",
				"bg-blue-500",
				"bg-blue-600",
				"bg-blue-700",
				"bg-blue-800",
				"bg-blue-900",
				"bg-blue-950",
			],
		},
		{
			name: "Indigo",
			colors: [
				"bg-indigo-50",
				"bg-indigo-100",
				"bg-indigo-200",
				"bg-indigo-300",
				"bg-indigo-400",
				"bg-indigo-500",
				"bg-indigo-600",
				"bg-indigo-700",
				"bg-indigo-800",
				"bg-indigo-900",
				"bg-indigo-950",
			],
		},
		{
			name: "Violet",
			colors: [
				"bg-violet-50",
				"bg-violet-100",
				"bg-violet-200",
				"bg-violet-300",
				"bg-violet-400",
				"bg-violet-500",
				"bg-violet-600",
				"bg-violet-700",
				"bg-violet-800",
				"bg-violet-900",
				"bg-violet-950",
			],
		},
		{
			name: "Purple",
			colors: [
				"bg-purple-50",
				"bg-purple-100",
				"bg-purple-200",
				"bg-purple-300",
				"bg-purple-400",
				"bg-purple-500",
				"bg-purple-600",
				"bg-purple-700",
				"bg-purple-800",
				"bg-purple-900",
				"bg-purple-950",
			],
		},
		{
			name: "Fuchsia",
			colors: [
				"bg-fuchsia-50",
				"bg-fuchsia-100",
				"bg-fuchsia-200",
				"bg-fuchsia-300",
				"bg-fuchsia-400",
				"bg-fuchsia-500",
				"bg-fuchsia-600",
				"bg-fuchsia-700",
				"bg-fuchsia-800",
				"bg-fuchsia-900",
				"bg-fuchsia-950",
			],
		},
		{
			name: "Pink",
			colors: [
				"bg-pink-50",
				"bg-pink-100",
				"bg-pink-200",
				"bg-pink-300",
				"bg-pink-400",
				"bg-pink-500",
				"bg-pink-600",
				"bg-pink-700",
				"bg-pink-800",
				"bg-pink-900",
				"bg-pink-950",
			],
		},
		{
			name: "Rose",
			colors: [
				"bg-rose-50",
				"bg-rose-100",
				"bg-rose-200",
				"bg-rose-300",
				"bg-rose-400",
				"bg-rose-500",
				"bg-rose-600",
				"bg-rose-700",
				"bg-rose-800",
				"bg-rose-900",
				"bg-rose-950",
			],
		},
	];

	// Color conversion function using real Tailwind values
	const getColorValue = (colorClass, format) => {
		if (format === "classname") {
			return colorClass;
		}

		const colorData = tailwindColors[colorClass];
		if (!colorData) return colorClass; // fallback to class name

		return colorData[format] || colorClass;
	};

	const [selectedFormat, setSelectedFormat] = useState("classname");

	// Color converter states (unified)
	const [inputColorValue, setInputColorValue] = useState("#74ACDF");
	const [outputColorFormat, setOutputColorFormat] = useState("rgb");
	const [isPending, startTransition] = useTransition();

	// Defer expensive parsing operations
	const deferredInputColor = useDeferredValue(inputColorValue);

	// Detect color format automatically (optimized with early returns)
	const detectColorFormat = useCallback((colorString) => {
		if (!colorString || typeof colorString !== "string") return null;

		const trimmed = colorString.trim();
		if (!trimmed) return null;

		// Fast path: Check hex format first (most common)
		if (/^#?[0-9A-Fa-f]{6}$/.test(trimmed)) return "hex";

		// Check rgb format
		if (
			trimmed.startsWith("rgb(") &&
			/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(trimmed)
		)
			return "rgb";

		// Check hsl format
		if (
			trimmed.startsWith("hsl(") &&
			/^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/i.test(trimmed)
		)
			return "hsl";

		// Check oklch format
		if (
			trimmed.startsWith("oklch(") &&
			/^oklch\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\)$/i.test(trimmed)
		)
			return "oklch";

		return null;
	}, []);

	// Simple cache to avoid re-parsing the same value (using ref to persist across renders)
	const parseCacheRef = useRef(new Map());

	const parseColor = useCallback(
		(colorString) => {
			if (!colorString) return null;

			const cache = parseCacheRef.current;

			// Check cache first
			const cached = cache.get(colorString);
			if (cached !== undefined) return cached;

			const format = detectColorFormat(colorString);
			if (!format) {
				cache.set(colorString, null);
				return null;
			}

			try {
				let result = null;
				switch (format) {
					case "hex": {
						const hex = colorString.replace("#", "").trim();
						if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
							cache.set(colorString, null);
							return null;
						}
						result = hexToRgb(`#${hex}`);
						break;
					}
					case "rgb": {
						const match = colorString.match(
							/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,
						);
						if (!match) {
							cache.set(colorString, null);
							return null;
						}
						result = {
							r: Math.max(0, Math.min(255, parseInt(match[1], 10))),
							g: Math.max(0, Math.min(255, parseInt(match[2], 10))),
							b: Math.max(0, Math.min(255, parseInt(match[3], 10))),
						};
						break;
					}
					case "hsl": {
						const match = colorString.match(
							/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i,
						);
						if (!match) {
							cache.set(colorString, null);
							return null;
						}
						const hsl = {
							h: Math.max(0, Math.min(360, parseInt(match[1], 10))),
							s: Math.max(0, Math.min(100, parseInt(match[2], 10))),
							l: Math.max(0, Math.min(100, parseInt(match[3], 10))),
						};
						result = hslToRgb(hsl.h, hsl.s, hsl.l);
						break;
					}
					case "oklch": {
						const match = colorString.match(
							/oklch\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/i,
						);
						if (!match) {
							cache.set(colorString, null);
							return null;
						}
						const oklch = {
							l: Math.max(0, Math.min(1, parseFloat(match[1]))),
							c: Math.max(0, parseFloat(match[2])),
							h: parseFloat(match[3]),
						};
						result = oklchToRgb(oklch.l, oklch.c, oklch.h);
						break;
					}
					default:
						cache.set(colorString, null);
						return null;
				}

				// Cache result (limit cache size to prevent memory issues)
				if (cache.size > 50) {
					const firstKey = cache.keys().next().value;
					cache.delete(firstKey);
				}
				cache.set(colorString, result);
				return result;
			} catch {
				cache.set(colorString, null);
				return null;
			}
		},
		[detectColorFormat],
	);

	const formatColor = useCallback((rgb, format) => {
		if (!rgb) return "";

		switch (format) {
			case "hex":
				return `#${[rgb.r, rgb.g, rgb.b]
					.map((x) => {
						const hex = x.toString(16);
						return hex.length === 1 ? "0" + hex : hex;
					})
					.join("")}`;
			case "rgb":
				return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
			case "hsl": {
				const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
				return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
			}
			case "oklch": {
				const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);
				return `oklch(${oklch.l}, ${oklch.c}, ${oklch.h})`;
			}
			default:
				return "";
		}
	}, []);

	// Get RGB from input color (using deferred value for performance)
	const inputRgb = useMemo(() => {
		return parseColor(deferredInputColor);
	}, [deferredInputColor, parseColor]);

	// Convert input color value to hex (for color picker) - use immediate value for picker
	const inputColorHex = useMemo(() => {
		// For hex values, use immediate value for instant feedback
		if (/^#?[0-9A-Fa-f]{6}$/i.test(inputColorValue.trim())) {
			const hex = inputColorValue.replace("#", "").trim();
			return `#${hex}`;
		}
		// For other formats, use parsed RGB
		if (!inputRgb) return "#74ACDF";
		return formatColor(inputRgb, "hex");
	}, [inputColorValue, inputRgb, formatColor]);

	// Convert input color value to output format
	const convertedColor = useMemo(() => {
		if (!inputRgb) return "";
		return formatColor(inputRgb, outputColorFormat);
	}, [inputRgb, outputColorFormat, formatColor]);

	// Optimized handlers
	const handleColorPickerChange = useCallback((hex) => {
		// react-colorful provides hex directly
		setInputColorValue(hex);
	}, []);

	const handleInputChange = useCallback(
		(e) => {
			const value = e.target.value;
			// Use transition for text input to avoid blocking UI
			startTransition(() => {
				setInputColorValue(value);
			});
		},
		[startTransition],
	);

	return (
		<TooltipProvider delayDuration={400} skipDelayDuration={0} shared={true}>
			<main className="flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
				<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
						Colors
					</h1>
					<p className="text-muted-foreground text-base lg:text-xl">
						The complete Tailwind color palette in HEX, RGB, HSL, CSS variables,
						and classes. Ready to copy and paste into your project.
					</p>
				</div>

				<Separator decoration />

				{/* Color Picker Section */}
				<div className="flex flex-col gap-6 p-6 lg:p-12 pt-4">
					<div className="flex flex-col gap-4">
						<h2 className="text-2xl font-bold tracking-tight">Color Picker</h2>
						<p className="text-muted-foreground text-sm">
							Select a color and choose the format you want to see it in.
						</p>
					</div>

					<div className="flex flex-col lg:flex-row lg:items-center justify-start gap-12">
						<div className="w-full flex items-center justify-center lg:items-start gap-6 flex-wrap">
							<div className="relative p-4 rounded-lg border border-border bg-card">
								<HexColorPicker
									color={inputColorHex}
									onChange={handleColorPickerChange}
									className="!w-40 !h-40"
								/>
							</div>
						</div>

						<div className="grid grid-cols-[auto_1fr] grid-rows-3 gap-4">
							<Label
								htmlFor="input-color"
								className="text-sm font-medium min-w-[80px]"
							>
								Input:
							</Label>
							<InputGroup>
								<InputGroupInput
									id="input-color"
									type="text"
									value={inputColorValue}
									onChange={handleInputChange}
									placeholder=""
									className="flex-1"
								/>
								<InputGroupAddon align="inline-end" className="pr-0.25">
									<InputGroupText>
										<SnippetCopyButton
											size="icon-sm"
											className="rounded-sm"
											value={inputColorValue}
										/>
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>

							<div className="col-start-2 w-full flex items-center justify-center">
								<ButtonGroup>
									<ButtonGroupText
										size="icon"
										variant="outline"
										className="p-0 text-center flex items-center justify-center text-muted-foreground hover:bg-background dark:bg-input/30 dark:hover:bg-input/30"
									>
										<ArrowDown />
									</ButtonGroupText>
									<Select
										value={outputColorFormat}
										onValueChange={setOutputColorFormat}
									>
										<SelectTrigger className="w-[120px]" animation="colors">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="hex">HEX</SelectItem>
											<SelectItem value="rgb">RGB</SelectItem>
											<SelectItem value="hsl">HSL</SelectItem>
											<SelectItem value="oklch">OKLCH</SelectItem>
										</SelectContent>
									</Select>
								</ButtonGroup>
							</div>

							<Label
								htmlFor="output-color"
								className="text-sm font-medium min-w-[80px]"
							>
								Output:
							</Label>
							<div className="flex-1 flex gap-2">
								<InputGroup>
									<InputGroupInput
										id="input-color"
										type="text"
										value={convertedColor}
										placeholder=""
										className="flex-1"
										readOnly
									/>
									<InputGroupAddon align="inline-end" className="pr-0.25">
										<InputGroupText>
											<SnippetCopyButton
												size="icon-sm"
												className="rounded-sm"
												value={convertedColor}
											/>
										</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</div>
						</div>
					</div>
				</div>

				<Separator decoration />

				<div className="flex flex-col items-end justify-start gap-4 p-6 lg:p-12 pt-4">
					<Select value={selectedFormat} onValueChange={setSelectedFormat}>
						<SelectTrigger className="w-[180px]" variant="raised">
							<SelectValue placeholder="Format" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="classname">classname</SelectItem>
							<SelectItem value="hex">hex</SelectItem>
							<SelectItem value="rgb">rgb</SelectItem>
							<SelectItem value="hsl">hsl</SelectItem>
							<SelectItem value="oklch">oklch</SelectItem>
							<SelectItem value="var">var</SelectItem>
						</SelectContent>
					</Select>

					<GridContainer
						cols={isMobile ? 11 : 13}
						rows={isMobile ? 22 : 23}
						border={true}
						className="border-r w-full"
					>
						{!isMobile && (
							<GridRow>
								<GridItem span={2} decorationTopLeft></GridItem>
								<GridItem className="text-xs font-semibold">50</GridItem>
								<GridItem className="text-xs font-semibold">100</GridItem>
								<GridItem className="text-xs font-semibold">200</GridItem>
								<GridItem className="text-xs font-semibold">300</GridItem>
								<GridItem className="text-xs font-semibold">400</GridItem>
								<GridItem className="text-xs font-semibold">500</GridItem>
								<GridItem className="text-xs font-semibold">600</GridItem>
								<GridItem className="text-xs font-semibold">700</GridItem>
								<GridItem className="text-xs font-semibold">800</GridItem>
								<GridItem className="text-xs font-semibold">900</GridItem>
								<GridItem className="text-xs font-semibold !border-r-0">
									950
								</GridItem>
							</GridRow>
						)}
						{colors.map((color) => (
							<GridRow
								key={color.name}
								className="not-last:h-[calc(100%-1px)] min-h-0"
							>
								{!isMobile && (
									<GridItem span={2} className="text-xs font-semibold">
										{color.name}
									</GridItem>
								)}

								{color.colors.map((colorClass) => {
									const displayValue = getColorValue(
										colorClass,
										selectedFormat,
									);

									const handleColorClick = async () => {
										await copyToClipboard(displayValue);
										toast({
											toastId: "success-copy-color-to-clipboard",
											type: "success",
											title: "Copied to clipboard!",
										});
									};

									return (
										<Tooltip key={colorClass}>
											<TooltipTrigger asChild>
												<GridItem
													decorationBottomRight={colorClass === "bg-rose-950"}
													className="!border-r-0 cursor-pointer aspect-square !min-h-0 min-w-0 p-0.5 sm:p-1"
													onClick={handleColorClick}
												>
													<Card
														className={cn(
															"w-full h-full aspect-square rounded-sm md:rounded-md border-0 transition-all duration-200 hover:scale-105 hover:shadow-lg p-0",
															colorClass,
														)}
													/>
												</GridItem>
											</TooltipTrigger>
											<TooltipContent className="px-0 pl-2 py-0">
												<Snippet className="w-full z-[99999] flex items-center justify-center bg-transparent border-0 px-0">
													<SnippetHeader className="w-full gap-2 flex items-center justify-center bg-transparent border-0">
														<span className="text-xs font-mono">
															{displayValue}
														</span>

														<SnippetCopyButton value={displayValue} />
													</SnippetHeader>
													<SnippetTabsContent value={colorClass}>
														{displayValue}
													</SnippetTabsContent>
												</Snippet>
											</TooltipContent>
										</Tooltip>
									);
								})}
							</GridRow>
						))}
					</GridContainer>
				</div>
			</main>
		</TooltipProvider>
	);
}
