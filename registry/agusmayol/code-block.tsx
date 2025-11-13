"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationHighlight,
	transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { CheckIcon, CopyIcon, Loader2 } from "lucide-react";
import type {
	ComponentProps,
	HTMLAttributes,
	ReactElement,
	ReactNode,
} from "react";
import {
	cloneElement,
	createContext,
	useContext,
	useEffect,
	useState,
	useLayoutEffect,
	useRef,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import type { IconType } from "react-icons";
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
import {
	type BundledLanguage,
	type CodeOptionsMultipleThemes,
	codeToHtml,
} from "shiki";
import { Button } from "@/registry/agusmayol/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "@/registry/agusmayol/sonner";
import { cn } from "@/lib/utils";

export type { BundledLanguage } from "shiki";

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
	"[&_code]:overflow-x-auto",
	"[&_code]:bg-transparent",
	"[&_.line]:px-4",
	"[&_.line]:w-full",
	"[&_.line]:relative",
);

const highlight = (
	html: string,
	language?: BundledLanguage,
	themes?: CodeOptionsMultipleThemes["themes"],
) =>
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

type CodeBlockData = {
	language: string;
	filename: string;
	code: string;
};

type CodeBlockContextType = {
	value: string | undefined;
	onValueChange: ((value: string) => void) | undefined;
	data: CodeBlockData[];
};

const CodeBlockContext = createContext<CodeBlockContextType>({
	value: undefined,
	onValueChange: undefined,
	data: [],
});

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
	data: CodeBlockData[];
};

export const CodeBlock = ({
	value: controlledValue,
	onValueChange: controlledOnValueChange,
	defaultValue,
	className,
	data,
	...props
}: CodeBlockProps) => {
	const [value, onValueChange] = useControllableState({
		defaultProp: defaultValue ?? "",
		prop: controlledValue,
		onChange: controlledOnValueChange,
	});

	return (
		<CodeBlockContext.Provider value={{ value, onValueChange, data }}>
			<div
				className={cn("size-full overflow-hidden rounded-md border", className)}
				{...props}
			/>
		</CodeBlockContext.Provider>
	);
};

export type CodeBlockHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CodeBlockHeader = ({
	className,
	...props
}: CodeBlockHeaderProps) => (
	<div
		className={cn(
			"flex flex-row items-center border-b bg-secondary p-1",
			className,
		)}
		{...props}
	/>
);

export type CodeBlockFilesProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	"children"
> & {
	children: (item: CodeBlockData) => ReactNode;
};

export const CodeBlockFiles = ({
	className,
	children,
	...props
}: CodeBlockFilesProps) => {
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

export type CodeBlockFilenameProps = HTMLAttributes<HTMLDivElement> & {
	icon?: IconType;
	value?: string;
};

export const CodeBlockFilename = ({
	className,
	icon,
	value,
	children,
	...props
}: CodeBlockFilenameProps) => {
	const { value: activeValue } = useContext(CodeBlockContext);
	const defaultIcon = Object.entries(filenameIconMap).find(([pattern]) => {
		const regex = new RegExp(
			`^${pattern.replace(/\\/g, "\\\\").replace(/\./g, "\\.").replace(/\*/g, ".*")}$`,
		);
		return regex.test(children as string);
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

export type CodeBlockSelectProps = ComponentProps<typeof Select>;

export const CodeBlockSelect = (props: CodeBlockSelectProps) => {
	const { value, onValueChange } = useContext(CodeBlockContext);

	return <Select onValueChange={onValueChange} value={value} {...props} />;
};

export type CodeBlockSelectTriggerProps = ComponentProps<typeof SelectTrigger>;

export const CodeBlockSelectTrigger = ({
	className,
	...props
}: CodeBlockSelectTriggerProps) => (
	<SelectTrigger
		className={cn(
			"w-fit border-none text-muted-foreground text-xs shadow-none",
			className,
		)}
		{...props}
	/>
);

export type CodeBlockSelectValueProps = ComponentProps<typeof SelectValue>;

export const CodeBlockSelectValue = (props: CodeBlockSelectValueProps) => (
	<SelectValue {...props} />
);

export type CodeBlockSelectContentProps = Omit<
	ComponentProps<typeof SelectContent>,
	"children"
> & {
	children: (item: CodeBlockData) => ReactNode;
};

export const CodeBlockSelectContent = ({
	children,
	className,
	...props
}: CodeBlockSelectContentProps) => {
	const { data } = useContext(CodeBlockContext);

	return (
		<SelectContent className={className} {...props}>
			{data.map(children)}
		</SelectContent>
	);
};

export type CodeBlockSelectItemProps = ComponentProps<typeof SelectItem>;

export const CodeBlockSelectItem = ({
	className,
	...props
}: CodeBlockSelectItemProps) => (
	<SelectItem className={cn("text-sm", className)} {...props} />
);

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
	onCopy?: () => void;
	onError?: (error: Error) => void;
	timeout?: number;
};

export const CodeBlockCopyButton = ({
	asChild,
	onCopy,
	onError,
	timeout = 2000,
	children,
	className,
	variant = "outline",
	size = "icon",
	...props
}: CodeBlockCopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { data, value } = useContext(CodeBlockContext);
	const code = data.find((item) => item.filename === value)?.code;

	const copyToClipboard = async () => {
		if (isLoading) return; // Prevent multiple clicks

		setIsLoading(true);

		// Check if we're in a browser environment
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

		// Try modern Clipboard API first if available
		if (navigator?.clipboard?.writeText) {
			try {
				await navigator.clipboard.writeText(code);
				setIsCopied(true);
				onCopy?.();

				setTimeout(() => setIsCopied(false), timeout);
				setIsLoading(false);
				return;
			} catch (error) {
				// Modern API failed, will try fallback
			}
		}

		// Fallback method using document.execCommand
		try {
			const textArea = document.createElement("textarea");
			textArea.value = code;
			textArea.style.position = "fixed";
			textArea.style.left = "-999999px";
			textArea.style.top = "-999999px";
			textArea.style.opacity = "0";
			textArea.setAttribute("readonly", "");
			document.body.appendChild(textArea);

			// Select the text
			textArea.select();
			textArea.setSelectionRange(0, 99999); // For mobile devices

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
			// Show error toast
			toast({
				type: "error",
				title: "Copy Failed",
				description:
					"Unable to copy code to clipboard. Please try manually selecting and copying the text.",
				duration: 4000,
			});

			onError?.(fallbackError as Error);
		} finally {
			setIsLoading(false);
		}
	};

	if (asChild) {
		return cloneElement(children as ReactElement, {
			// @ts-expect-error - we know this is a button
			onClick: copyToClipboard,
		});
	}

	const Icon = isLoading ? Loader2 : isCopied ? CheckIcon : CopyIcon;

	return (
		<Button
			role="button"
			aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
			disabled={isLoading}
			className={cn(
				"shrink-0 z-50 pointer-events-auto selection-all",
				className,
			)}
			onClick={copyToClipboard}
			variant={variant}
			size={size}
			{...props}
		>
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
		</Button>
	);
};

type CodeBlockFallbackProps = HTMLAttributes<HTMLDivElement>;

const CodeBlockFallback = ({ children, ...props }: CodeBlockFallbackProps) => (
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

export type CodeBlockBodyProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	"children"
> & {
	children: (item: CodeBlockData) => ReactNode;
};

export const CodeBlockBody = ({ children, ...props }: CodeBlockBodyProps) => {
	const { data } = useContext(CodeBlockContext);

	return <div {...props}>{data.map(children)}</div>;
};

export type CodeBlockItemProps = HTMLAttributes<HTMLDivElement> & {
	value: string;
	lineNumbers?: boolean;
};

export const CodeBlockItem = ({
	children,
	lineNumbers = true,
	className,
	value,
	...props
}: CodeBlockItemProps) => {
	const { value: activeValue } = useContext(CodeBlockContext);

	if (value !== activeValue) {
		return null;
	}

	return (
		<div
			className={cn(
				codeBlockClassName,
				lineHighlightClassNames,
				lineDiffClassNames,
				lineFocusedClassNames,
				wordHighlightClassNames,
				darkModeClassNames,
				lineNumbers && lineNumberClassNames,
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export type CodeBlockContentProps = HTMLAttributes<HTMLDivElement> & {
	themes?: CodeOptionsMultipleThemes["themes"];
	language?: BundledLanguage;
	syntaxHighlighting?: boolean;
	children: string;
};

export const CodeBlockContent = ({
	children,
	themes,
	language,
	syntaxHighlighting = true,
	...props
}: CodeBlockContentProps) => {
	const [html, setHtml] = useState<string | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [fullHeight, setFullHeight] = useState<number | null>(null);
	const codeLines = (children as string).split("\n");
	const hasMoreThan10Lines = codeLines.length > 10;
	const measureRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!syntaxHighlighting) {
			return;
		}

		highlight(children as string, language, themes)
			.then(setHtml)
			// biome-ignore lint/suspicious/noConsole: "it's fine"
			.catch(console.error);
	}, [children, themes, syntaxHighlighting, language]);

	// Measure the full height of the content
	useLayoutEffect(() => {
		if (!measureRef.current) return;

		const measureHeight = () => {
			if (measureRef.current) {
				const height = measureRef.current.getBoundingClientRect().height;
				setFullHeight(height);
			}
		};

		// Measure after a short delay to ensure content is rendered
		const timeoutId = setTimeout(measureHeight, 0);

		// Also measure when content changes
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

	// Calculate approximate height for 10 lines (24px per line)
	const collapsedHeight = 240;

	const transition = {
		type: "spring" as const,
		stiffness: 200,
		damping: 25,
	};

	return (
		<div className="relative" {...props}>
			{/* Hidden element to measure full height */}
			<div
				ref={measureRef}
				className="invisible pointer-events-none absolute -z-50 w-full"
				style={{ visibility: "hidden" }}
			>
				{!(syntaxHighlighting && html) ? (
					<CodeBlockFallback>{children}</CodeBlockFallback>
				) : (
					<div
						// biome-ignore lint/security/noDangerouslySetInnerHtml: "Kinda how Shiki works"
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				)}
			</div>
			<motion.div
				className="relative"
				style={{ overflow: "hidden" }}
				animate={{
					height:
						hasMoreThan10Lines && !isExpanded
							? collapsedHeight
							: fullHeight || "auto",
				}}
				transition={transition}
			>
				<div ref={contentRef}>
					{!(syntaxHighlighting && html) ? (
						<CodeBlockFallback>{children}</CodeBlockFallback>
					) : (
						<div
							// biome-ignore lint/security/noDangerouslySetInnerHtml: "Kinda how Shiki works"
							dangerouslySetInnerHTML={{ __html: html }}
						/>
					)}
				</div>
				<AnimatePresence>
					{hasMoreThan10Lines && !isExpanded && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-gradient-to-t from-card via-card/95 to-transparent pb-4 pt-12"
						>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsExpanded(true)}
								className="z-10 text-muted-foreground hover:bg-transparent hover:text-foreground transition-colors duration-500 ease-in-out"
							>
								Expand
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};
