"use client";

import { useControlledState } from "@/registry/optics/hooks/use-controlled-state";
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationHighlight,
	transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { CheckIcon, CopyIcon, Loader2 } from "lucide-react";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	useLayoutEffect,
	useRef,
} from "react";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import { motion, AnimatePresence } from "motion/react";
import {
	SiAstro,
	SiBiome,
	SiBower,
	SiBun,
	SiC,
	SiCircleci,
	SiCoffeescript,
	SiCplusplus,
	SiCss3,
	SiCssmodules,
	SiDart,
	SiDocker,
	SiDocusaurus,
	SiDotenv,
	SiEditorconfig,
	SiEslint,
	SiGatsby,
	SiGitignoredotio,
	SiGnubash,
	SiGo,
	SiGraphql,
	SiGrunt,
	SiGulp,
	SiHandlebarsdotjs,
	SiHtml5,
	SiJavascript,
	SiJest,
	SiJson,
	SiLess,
	SiMarkdown,
	SiMdx,
	SiMintlify,
	SiMocha,
	SiMysql,
	SiNextdotjs,
	SiPerl,
	SiPhp,
	SiPostcss,
	SiPrettier,
	SiPrisma,
	SiPug,
	SiPython,
	SiR,
	SiReact,
	SiReadme,
	SiRedis,
	SiRemix,
	SiRive,
	SiRollupdotjs,
	SiRuby,
	SiSanity,
	SiSass,
	SiScala,
	SiSentry,
	SiShadcnui,
	SiStorybook,
	SiStylelint,
	SiSublimetext,
	SiSvelte,
	SiSvg,
	SiSwift,
	SiTailwindcss,
	SiToml,
	SiTypescript,
	SiVercel,
	SiVite,
	SiVuedotjs,
	SiWebassembly,
} from "react-icons/si";
import { codeToHtml } from "shiki";
import { Button } from "@/registry/optics/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/optics/select";
import { toast } from "@/registry/optics/sonner";
import { ScrollArea, ScrollBar } from "@/registry/optics/scroll-area";
import { cn } from "@/registry/optics/lib/utils";

const filenameIconMap = {
	".env": SiDotenv,
	"*.astro": SiAstro,
	"biome.json": SiBiome,
	".bowerrc": SiBower,
	"bun.lockb": SiBun,
	"*.c": SiC,
	"*.cpp": SiCplusplus,
	".circleci/config.yml": SiCircleci,
	"*.coffee": SiCoffeescript,
	"*.module.css": SiCssmodules,
	"*.css": SiCss3,
	"*.dart": SiDart,
	Dockerfile: SiDocker,
	"docusaurus.config.js": SiDocusaurus,
	".editorconfig": SiEditorconfig,
	".eslintrc": SiEslint,
	"eslint.config.*": SiEslint,
	"gatsby-config.*": SiGatsby,
	".gitignore": SiGitignoredotio,
	"*.go": SiGo,
	"*.graphql": SiGraphql,
	"*.sh": SiGnubash,
	"Gruntfile.*": SiGrunt,
	"gulpfile.*": SiGulp,
	"*.hbs": SiHandlebarsdotjs,
	"*.html": SiHtml5,
	"*.js": SiJavascript,
	"*.json": SiJson,
	"*.test.js": SiJest,
	"*.less": SiLess,
	"*.md": SiMarkdown,
	"*.mdx": SiMdx,
	"mintlify.json": SiMintlify,
	"mocha.opts": SiMocha,
	"*.mustache": SiHandlebarsdotjs,
	"*.sql": SiMysql,
	"next.config.*": SiNextdotjs,
	"*.pl": SiPerl,
	"*.php": SiPhp,
	"postcss.config.*": SiPostcss,
	"prettier.config.*": SiPrettier,
	"*.prisma": SiPrisma,
	"*.pug": SiPug,
	"*.py": SiPython,
	"*.r": SiR,
	"*.rb": SiRuby,
	"*.jsx": SiReact,
	"*.tsx": SiReact,
	"readme.md": SiReadme,
	"*.rdb": SiRedis,
	"remix.config.*": SiRemix,
	"*.riv": SiRive,
	"rollup.config.*": SiRollupdotjs,
	"sanity.config.*": SiSanity,
	"*.sass": SiSass,
	"*.scss": SiSass,
	"*.sc": SiScala,
	"*.scala": SiScala,
	"sentry.client.config.*": SiSentry,
	"components.json": SiShadcnui,
	"storybook.config.*": SiStorybook,
	"stylelint.config.*": SiStylelint,
	".sublime-settings": SiSublimetext,
	"*.svelte": SiSvelte,
	"*.svg": SiSvg,
	"*.swift": SiSwift,
	"tailwind.config.*": SiTailwindcss,
	"*.toml": SiToml,
	"*.ts": SiTypescript,
	"vercel.json": SiVercel,
	"vite.config.*": SiVite,
	"*.vue": SiVuedotjs,
	"*.wasm": SiWebassembly,
};

const lineNumberClassNames = cn(
	"[&_code]:[counter-reset:line]",
	"[&_code]:[counter-increment:line_0]",
	"[&_.line]:before:content-[counter(line)]",
	"[&_.line]:before:inline-block",
	"[&_.line]:before:[counter-increment:line]",
	"[&_.line]:before:w-4",
	"[&_.line]:before:mr-4",
	"[&_.line]:before:text-[13px]",
	"[&_.line]:before:text-right",
	"[&_.line]:before:text-muted-foreground/50",
	"[&_.line]:before:font-mono",
	"[&_.line]:before:select-none",
);

const darkModeClassNames = cn(
	"dark:[&_.shiki]:!text-[var(--shiki-dark)]",
	// "dark:[&_.shiki]:!bg-[var(--shiki-dark-bg)]",
	"dark:[&_.shiki]:![font-style:var(--shiki-dark-font-style)]",
	"dark:[&_.shiki]:![font-weight:var(--shiki-dark-font-weight)]",
	"dark:[&_.shiki]:![text-decoration:var(--shiki-dark-text-decoration)]",
	"dark:[&_.shiki_span]:!text-[var(--shiki-dark)]",
	"dark:[&_.shiki_span]:![font-style:var(--shiki-dark-font-style)]",
	"dark:[&_.shiki_span]:![font-weight:var(--shiki-dark-font-weight)]",
	"dark:[&_.shiki_span]:![text-decoration:var(--shiki-dark-text-decoration)]",
);

const lineHighlightClassNames = cn(
	"[&_.line.highlighted]:bg-blue-50",
	"[&_.line.highlighted]:after:bg-blue-500",
	"[&_.line.highlighted]:after:absolute",
	"[&_.line.highlighted]:after:left-0",
	"[&_.line.highlighted]:after:top-0",
	"[&_.line.highlighted]:after:bottom-0",
	"[&_.line.highlighted]:after:w-0.5",
	"dark:[&_.line.highlighted]:!bg-blue-500/10",
);

const lineDiffClassNames = cn(
	"[&_.line.diff]:after:absolute",
	"[&_.line.diff]:after:left-0",
	"[&_.line.diff]:after:top-0",
	"[&_.line.diff]:after:bottom-0",
	"[&_.line.diff]:after:w-0.5",
	"[&_.line.diff.add]:bg-emerald-50",
	"[&_.line.diff.add]:after:bg-emerald-500",
	"[&_.line.diff.remove]:bg-rose-50",
	"[&_.line.diff.remove]:after:bg-rose-500",
	"dark:[&_.line.diff.add]:!bg-emerald-500/10",
	"dark:[&_.line.diff.remove]:!bg-rose-500/10",
);

const lineFocusedClassNames = cn(
	"[&_code:has(.focused)_.line]:blur-[2px]",
	"[&_code:has(.focused)_.line.focused]:blur-none",
);

const wordHighlightClassNames = cn(
	"[&_.highlighted-word]:bg-blue-50",
	"dark:[&_.highlighted-word]:!bg-blue-500/10",
);

const codeBlockClassName = cn(
	"mt-0 bg-card text-sm",
	"[&_pre]:py-4",
	// "[&_.shiki]:!bg-[var(--shiki-bg)]",
	"[&_.shiki]:!bg-transparent",
	"[&_code]:w-full",
	"[&_code]:grid",
	"[&_code]:bg-transparent",
	"[&_code]:min-w-0",
	"[&_.line]:px-4",
	"[&_.line]:w-full",
	"[&_.line]:relative",
	"[&_.line]:min-w-0",
);

const highlight = (html, language, themes) =>
	codeToHtml(html, {
		lang: language ?? "typescript",
		themes: themes ?? {
			light: "github-light",
			dark: "github-dark-default",
		},
		transformers: [
			transformerNotationDiff({
				matchAlgorithm: "v3",
			}),
			transformerNotationHighlight({
				matchAlgorithm: "v3",
			}),
			transformerNotationWordHighlight({
				matchAlgorithm: "v3",
			}),
			transformerNotationFocus({
				matchAlgorithm: "v3",
			}),
			transformerNotationErrorLevel({
				matchAlgorithm: "v3",
			}),
		],
	});

const CodeBlockContext = createContext({
	value: undefined,
	onValueChange: undefined,
	data: [],
});

export const CodeBlock = ({
	value: controlledValue = undefined,
	onValueChange: controlledOnValueChange = undefined,
	defaultValue = "",
	className = "",
	data = [],
	...props
}) => {
	const [value, onValueChange] = useControlledState({
		defaultValue: defaultValue ?? "",
		value: controlledValue,
		onChange: controlledOnValueChange,
	});

	return (
		<CodeBlockContext.Provider value={{ value, onValueChange, data }}>
			<div
				className={cn("w-full overflow-hidden rounded-md border", className)}
				{...props}
			/>
		</CodeBlockContext.Provider>
	);
};

export const CodeBlockHeader = ({ className = "", ...props }) => (
	<div
		className={cn(
			"flex flex-row items-center border-b bg-secondary p-1",
			className,
		)}
		{...props}
	/>
);

export const CodeBlockFiles = ({
	className = "",
	children = null,
	...props
}) => {
	const { data } = useContext(CodeBlockContext);

	return (
		<div
			className={cn("flex grow flex-row items-center gap-2", className)}
			{...props}
		>
			{data.map(children)}
		</div>
	);
};

export const CodeBlockFilename = ({
	className = "",
	icon = undefined,
	value = undefined,
	children = null,
	...props
}) => {
	const { value: activeValue } = useContext(CodeBlockContext);
	const defaultIcon = Object.entries(filenameIconMap).find(([pattern]) => {
		const regex = new RegExp(
			`^${pattern.replace(/\\/g, "\\\\").replace(/\./g, "\\.").replace(/\*/g, ".*")}$`,
		);
		return regex.test(children);
	})?.[1];
	const Icon = icon ?? defaultIcon;

	if (value !== activeValue) {
		return null;
	}

	return (
		<div
			className="flex items-center gap-2 bg-secondary px-4 py-1.5 text-muted-foreground text-xs"
			{...props}
		>
			{Icon && <Icon className="h-4 w-4 shrink-0" />}
			<span className="flex-1 truncate">{children}</span>
		</div>
	);
};

export const CodeBlockSelect = (props = {}) => {
	const { value, onValueChange } = useContext(CodeBlockContext);

	return <Select onValueChange={onValueChange} value={value} {...props} />;
};

export const CodeBlockSelectTrigger = ({ className = "", ...props }) => (
	<SelectTrigger
		className={cn(
			"w-fit border-none text-muted-foreground text-xs shadow-none",
			className,
		)}
		{...props}
	/>
);

export const CodeBlockSelectValue = (props = {}) => <SelectValue {...props} />;

export const CodeBlockSelectContent = ({
	children = null,
	className = "",
	...props
}) => {
	const { data } = useContext(CodeBlockContext);

	return (
		<SelectContent className={cn("w-[calc(100%+2rem)]", className)} {...props}>
			{data.map(children)}
		</SelectContent>
	);
};

export const CodeBlockSelectItem = ({ className = "", ...props }) => (
	<SelectItem className={cn("text-sm", className)} {...props} />
);

export const CodeBlockCopyButton = ({
	render = undefined,
	onCopy = undefined,
	onError = undefined,
	timeout = 2000,
	className = "",
	variant = "outline",
	size = "icon",
	...props
}) => {
	const [isCopied, setIsCopied] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { data, value } = useContext(CodeBlockContext);
	const code = data.find((item) => item.filename === value)?.code;

	const copyToClipboard = async () => {
		if (isLoading) return;

		setIsLoading(true);

		if (typeof window === "undefined") {
			onError?.(new Error("Window is not available"));
			setIsLoading(false);
			return;
		}

		if (typeof navigator === "undefined") {
			onError?.(new Error("Navigator is not available"));
			setIsLoading(false);
			return;
		}

		if (!code) {
			onError?.(new Error("No code to copy"));
			setIsLoading(false);
			return;
		}

		if (navigator?.clipboard?.writeText) {
			try {
				await navigator.clipboard.writeText(code);
				setIsCopied(true);
				onCopy?.();

				setTimeout(() => setIsCopied(false), timeout);
				setIsLoading(false);
				return;
			} catch (error) {
				// fallthrough to fallback
			}
		}

		try {
			const textArea = document.createElement("textarea");
			textArea.value = code;
			textArea.style.position = "fixed";
			textArea.style.left = "-999999px";
			textArea.style.top = "-999999px";
			textArea.style.opacity = "0";
			textArea.setAttribute("readonly", "");
			document.body.appendChild(textArea);

			textArea.select();
			textArea.setSelectionRange(0, 99999);

			const successful = document.execCommand("copy");
			document.body.removeChild(textArea);

			if (successful) {
				setIsCopied(true);
				onCopy?.();

				setTimeout(() => setIsCopied(false), timeout);
			} else {
				throw new Error("execCommand('copy') returned false");
			}
		} catch (fallbackError) {
			toast({
				type: "error",
				title: "Copy Failed",
				description:
					"Unable to copy code to clipboard. Please try manually selecting and copying the text.",
				duration: 4000,
			});

			onError?.(fallbackError);
		} finally {
			setIsLoading(false);
		}
	};

	const buttonContent = (
		<>
			<div className="relative">
				<div
					className={cn(
						"absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out will-change-[transform,opacity,filter]",
						isCopied
							? "scale-100 opacity-100 blur-0"
							: "blur-xs scale-[0.25] opacity-0",
					)}
				>
					<CheckIcon className="text-muted-foreground" size={14} />
				</div>
				<div
					className={cn(
						"absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out will-change-[transform,opacity,filter]",
						isLoading
							? "scale-100 opacity-100 blur-0"
							: "blur-xs scale-[0.25] opacity-0",
					)}
				>
					<Loader2 className="text-muted-foreground animate-spin" size={14} />
				</div>
				<div
					className={cn(
						"transition-[transform, opacity, filter] duration-300 ease-in-out will-change-[transform,opacity,filter]",
						isCopied || isLoading
							? "blur-xs scale-[0.25] opacity-0"
							: "scale-100 opacity-100 blur-0",
					)}
				>
					<CopyIcon className="text-muted-foreground" size={14} />
				</div>
			</div>
			<span className="sr-only">Copy to clipboard</span>
		</>
	);

	const defaultProps = {
		role: "button",
		"aria-label": isCopied ? "Copied!" : "Copy to clipboard",
		disabled: isLoading,
		className: cn("shrink-0 z-50 pointer-events-auto selection-all", className),
		onClick: copyToClipboard,
		variant,
		size,
		children: buttonContent,
	};

	if (render) {
		const element = useRender({
			defaultTagName: "button",
			render:
				typeof render === "function"
					? (props, state) => {
							const mergedProps = mergeProps("button", defaultProps, props);
							return render(mergedProps, { isCopied, isLoading, ...state });
						}
					: render,
			props: mergeProps("button", defaultProps, props),
			state: {
				isCopied,
				isLoading,
			},
		});
		return element;
	}

	return <Button {...defaultProps} {...props} />;
};

const CodeBlockFallback = ({ children = null, ...props } = {}) => (
	<div {...props}>
		<pre className="w-full">
			<code>
				{children
					?.toString()
					.split("\n")
					.map((line, i) => (
						<span className="line" key={i}>
							{line}
						</span>
					))}
			</code>
		</pre>
	</div>
);

export const CodeBlockBody = ({ children = null, ...props }) => {
	const { data } = useContext(CodeBlockContext);

	return <div {...props}>{data.map(children)}</div>;
};

export const CodeBlockItem = ({
	children = null,
	lineNumbers = true,
	className = "",
	value = undefined,
	...props
}) => {
	const { value: activeValue } = useContext(CodeBlockContext);

	if (value !== activeValue) {
		return null;
	}

	return (
		// ScrollArea viene de un .jsx, no hay tipos
		<ScrollArea
			maskColor="from-sidebar"
			className={cn(
				codeBlockClassName,
				lineHighlightClassNames,
				lineDiffClassNames,
				lineFocusedClassNames,
				wordHighlightClassNames,
				darkModeClassNames,
				lineNumbers && lineNumberClassNames,
				"min-w-0",
				className,
			)}
			viewportClassName="[&_code]:min-w-full overflow-x-auto [&_code]:max-w-full"
			{...props}
		>
			{children}
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};

export const CodeBlockContent = ({
	children = "",
	themes = undefined,
	language = undefined,
	syntaxHighlighting = true,
	...props
}) => {
	const [html, setHtml] = useState(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [fullHeight, setFullHeight] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const codeLines = children.split("\n");
	const hasMoreThan10Lines = codeLines.length > 10;
	const measureRef = useRef(null);
	const contentRef = useRef(null);

	useEffect(() => {
		if (!syntaxHighlighting) {
			return;
		}

		highlight(children, language, themes)
			.then(setHtml)
			// biome-ignore lint/suspicious/noConsole: "it's fine"
			.catch(console.error);
	}, [children, themes, syntaxHighlighting, language]);

	useLayoutEffect(() => {
		if (!measureRef.current) return;

		const measureHeight = () => {
			if (measureRef.current) {
				const height = measureRef.current.getBoundingClientRect().height;
				setFullHeight(height);
				setIsReady(true);
			}
		};

		const timeoutId = setTimeout(measureHeight, 0);

		const resizeObserver = new ResizeObserver(() => {
			measureHeight();
		});

		if (measureRef.current) {
			resizeObserver.observe(measureRef.current);
		}

		return () => {
			clearTimeout(timeoutId);
			resizeObserver.disconnect();
		};
	}, [html, children, syntaxHighlighting]);

	const collapsedHeight = 240;

	const transition = {
		type: "spring",
		stiffness: 200,
		damping: 25,
	};

	const shouldCollapse =
		hasMoreThan10Lines && (fullHeight ? fullHeight > collapsedHeight : true);
	const targetHeight = !isReady
		? collapsedHeight
		: shouldCollapse && !isExpanded
			? collapsedHeight
			: fullHeight || "auto";
	const shouldShowExpand = isReady && shouldCollapse && !isExpanded;
	const motionTransition = isReady ? transition : { duration: 0 };

	return (
		<div className="relative w-full flex flex-col min-h-0 min-w-0" {...props}>
			<div
				ref={measureRef}
				className="invisible pointer-events-none absolute -z-50 w-full"
				style={{ visibility: "hidden" }}
			>
				{!(syntaxHighlighting && html) ? (
					<CodeBlockFallback>{children}</CodeBlockFallback>
				) : (
					<div
						// Shiki
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				)}
			</div>
			<motion.div
				className="relative overflow-hidden w-full min-h-0 min-w-0"
				style={{ maxHeight: "100%" }}
				animate={{ height: targetHeight }}
				transition={motionTransition}
			>
				<ScrollArea
					maskColor="from-sidebar"
					className="w-full min-w-0"
					viewportClassName="[&_code]:min-w-full overflow-x-auto [&_code]:max-w-full"
				>
					<div ref={contentRef}>
						{!(syntaxHighlighting && html) ? (
							<CodeBlockFallback>{children}</CodeBlockFallback>
						) : (
							<div
								// Shiki
								dangerouslySetInnerHTML={{ __html: html }}
							/>
						)}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</motion.div>
			<AnimatePresence>
				{shouldShowExpand && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-gradient-to-t from-card via-card/95 to-transparent pb-4 pt-12 pointer-events-none z-30"
						style={{ width: "100%" }}
					>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsExpanded(true)}
							className="z-10 text-muted-foreground hover:bg-transparent hover:text-foreground transition-colors duration-500 ease-in-out pointer-events-auto"
						>
							Expand
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
