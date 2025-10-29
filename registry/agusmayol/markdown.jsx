import { cn } from "@/lib/utils";
import { Button } from "@/registry/agusmayol/button";
import { Textarea } from "@/registry/agusmayol/textarea";
import { ButtonGroup } from "@/registry/agusmayol/button-group";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MDXProvider } from "@mdx-js/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/registry/agusmayol/dropdown-menu";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Anchor,
	Bold,
	Circle,
	Code,
	Ellipsis,
	Italic,
	Link,
	List,
	ListCollapse,
	ListOrdered,
	Radical,
	Sparkle,
	Strikethrough,
	Underline,
	Type,
	Heading1,
	Heading2,
	Heading3,
	Quote,
	Table,
	Image,
	Minus,
	Plus,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
	Palette,
	GripVertical,
	Trash2,
	Copy,
	Check,
	ChevronDown,
	Eye,
	Edit3,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/agusmayol/select";
import { Separator } from "@/registry/agusmayol/separator";
import { useState, useRef, useEffect, useCallback } from "react";

// Command palette items for the slash menu
const commandItems = [
	{
		title: "Text",
		description: "Just start typing with plain text",
		icon: Type,
		command: () => "",
	},
	{
		title: "Heading 1",
		description: "Big section heading",
		icon: Heading1,
		command: () => "# ",
	},
	{
		title: "Heading 2",
		description: "Medium section heading",
		icon: Heading2,
		command: () => "## ",
	},
	{
		title: "Heading 3",
		description: "Small section heading",
		icon: Heading3,
		command: () => "### ",
	},
	{
		title: "Quote",
		description: "Capture a quote",
		icon: Quote,
		command: () => "> ",
	},
	{
		title: "Bullet List",
		description: "Create a simple bullet list",
		icon: List,
		command: () => "- ",
	},
	{
		title: "Numbered List",
		description: "Create a list with numbering",
		icon: ListOrdered,
		command: () => "1. ",
	},
	{
		title: "Code Block",
		description: "Create a code block",
		icon: Code,
		command: () => "```\n\n```",
	},
	{
		title: "Table",
		description: "Create a table",
		icon: Table,
		command: () =>
			"| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |",
	},
	{
		title: "Divider",
		description: "Add a horizontal divider",
		icon: Minus,
		command: () => "---\n",
	},
];

// Toolbar Component
export function MarkdownToolbar({
	onFormat,
	onInsert,
	selectedText = "",
	className,
	...props
}) {
	const [showColorPicker, setShowColorPicker] = useState(false);

	const formatButtons = [
		{ icon: Bold, action: () => onFormat("bold"), tooltip: "Bold (Ctrl+B)" },
		{
			icon: Italic,
			action: () => onFormat("italic"),
			tooltip: "Italic (Ctrl+I)",
		},
		{
			icon: Underline,
			action: () => onFormat("underline"),
			tooltip: "Underline (Ctrl+U)",
		},
		{
			icon: Strikethrough,
			action: () => onFormat("strikethrough"),
			tooltip: "Strikethrough",
		},
		{ icon: Code, action: () => onFormat("code"), tooltip: "Code (Ctrl+`)" },
	];

	const insertButtons = [
		{ icon: Heading1, action: () => onInsert("h1"), tooltip: "Heading 1" },
		{ icon: Heading2, action: () => onInsert("h2"), tooltip: "Heading 2" },
		{ icon: Heading3, action: () => onInsert("h3"), tooltip: "Heading 3" },
		{ icon: Quote, action: () => onInsert("quote"), tooltip: "Quote" },
		{ icon: List, action: () => onInsert("bullet"), tooltip: "Bullet List" },
		{
			icon: ListOrdered,
			action: () => onInsert("numbered"),
			tooltip: "Numbered List",
		},
		{ icon: Table, action: () => onInsert("table"), tooltip: "Table" },
		{ icon: Link, action: () => onInsert("link"), tooltip: "Link" },
		{ icon: Image, action: () => onInsert("image"), tooltip: "Image" },
		{ icon: Minus, action: () => onInsert("divider"), tooltip: "Divider" },
	];

	return (
		<div
			className={cn(
				"flex items-center gap-2 p-3 border-b bg-gradient-to-r from-background to-muted/20 backdrop-blur-sm",
				className,
			)}
			{...props}
		>
			{/* Format Buttons */}
			<div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
				{formatButtons.map((button, index) => (
					<Button
						key={index}
						variant="ghost"
						size="sm"
						onClick={button.action}
						className="h-8 w-8 p-0 hover:bg-background/80 transition-all duration-200"
						title={button.tooltip}
					>
						<button.icon className="h-4 w-4" />
					</Button>
				))}
			</div>

			<Separator orientation="vertical" className="h-8 bg-border/50" />

			{/* Insert Buttons */}
			<div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
				{insertButtons.map((button, index) => (
					<Button
						key={index}
						variant="ghost"
						size="sm"
						onClick={button.action}
						className="h-8 w-8 p-0 hover:bg-background/80 transition-all duration-200"
						title={button.tooltip}
					>
						<button.icon className="h-4 w-4" />
					</Button>
				))}
			</div>

			<Separator orientation="vertical" className="h-8 bg-border/50" />

			{/* Alignment Buttons */}
			<div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => onInsert("align-left")}
					className="h-8 w-8 p-0 hover:bg-background/80 transition-all duration-200"
					title="Align Left"
				>
					<AlignLeft className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => onInsert("align-center")}
					className="h-8 w-8 p-0 hover:bg-background/80 transition-all duration-200"
					title="Align Center"
				>
					<AlignCenter className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => onInsert("align-right")}
					className="h-8 w-8 p-0 hover:bg-background/80 transition-all duration-200"
					title="Align Right"
				>
					<AlignRight className="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" className="h-8 bg-border/50" />

			{/* Color Picker */}
			<div className="bg-muted/50 rounded-lg p-1">
				<Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="h-8 w-8 p-0 hover:bg-background/80 transition-all duration-200"
							title="Text Color"
						>
							<Palette className="h-4 w-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-56 p-3 bg-background/95 backdrop-blur-sm border-border/50">
						<div className="space-y-2">
							<h4 className="text-sm font-medium">Text Color</h4>
							<div className="grid grid-cols-8 gap-1">
								{[
									"#000000",
									"#FF0000",
									"#00FF00",
									"#0000FF",
									"#FFFF00",
									"#FF00FF",
									"#00FFFF",
									"#FFA500",
									"#800080",
									"#008000",
									"#FFC0CB",
									"#A52A2A",
									"#808080",
									"#C0C0C0",
									"#FFA500",
									"#800000",
								].map((color) => (
									<button
										key={color}
										className="w-6 h-6 rounded-md border border-border/50 hover:scale-110 transition-transform duration-200 shadow-sm"
										style={{ backgroundColor: color }}
										onClick={() => {
											onFormat("color", color);
											setShowColorPicker(false);
										}}
									/>
								))}
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}

// Main Markdown Editor Component
export function MarkdownEditor({
	content = "",
	onChange,
	placeholder = "Type '/' for commands...",
	showToolbar = true,
	className,
	...props
}) {
	const [value, setValue] = useState(content);
	const [showCommandPalette, setShowCommandPalette] = useState(false);
	const [commandPosition, setCommandPosition] = useState({ top: 0, left: 0 });
	const [selectedRange, setSelectedRange] = useState({ start: 0, end: 0 });
	const [showBubbleMenu, setShowBubbleMenu] = useState(false);
	const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0 });
	const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
	const textareaRef = useRef(null);
	const commandRef = useRef(null);

	// Update value when content prop changes
	useEffect(() => {
		setValue(content);
	}, [content]);

	// Handle text changes
	const handleTextChange = (e) => {
		const newValue = e.target.value;
		setValue(newValue);
		onChange?.(newValue);
	};

	// Get cursor position in pixels with better accuracy
	const getCursorPosition = (textarea, position) => {
		const rect = textarea.getBoundingClientRect();
		const textBeforeCursor = value.substring(0, position);
		const lines = textBeforeCursor.split("\n");
		const currentLine = lines.length - 1;
		const lineHeight = 24; // More accurate line height
		const charWidth = 9; // More accurate character width for monospace
		const currentLineText = lines[currentLine] || "";
		const charPosition = currentLineText.length;

		// Calculate position relative to viewport
		const scrollTop = textarea.scrollTop;
		const scrollLeft = textarea.scrollLeft;

		return {
			top: rect.top + currentLine * lineHeight + 30 - scrollTop,
			left: rect.left + charPosition * charWidth + 15 - scrollLeft,
		};
	};

	// Handle key down events
	const handleKeyDown = (e) => {
		const textarea = e.target;
		const cursorPos = textarea.selectionStart;
		const textBeforeCursor = value.substring(0, cursorPos);
		const lastLine = textBeforeCursor.split("\n").pop();

		// Handle keyboard shortcuts
		if (e.ctrlKey || e.metaKey) {
			switch (e.key.toLowerCase()) {
				case "b":
					e.preventDefault();
					formatText("bold");
					return;
				case "i":
					e.preventDefault();
					formatText("italic");
					return;
				case "u":
					e.preventDefault();
					formatText("underline");
					return;
				case "`":
					e.preventDefault();
					formatText("code");
					return;
			}
		}

		// Show command palette when typing '/'
		if (e.key === "/" && lastLine === "") {
			e.preventDefault();
			const pos = getCursorPosition(textarea, cursorPos);
			setCommandPosition(pos);
			setShowCommandPalette(true);
		}

		// Hide command palette on escape
		if (e.key === "Escape") {
			setShowCommandPalette(false);
			setShowBubbleMenu(false);
		}

		// Handle selection changes for bubble menu
		if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Shift") {
			setTimeout(() => {
				const start = textarea.selectionStart;
				const end = textarea.selectionEnd;
				if (start !== end) {
					setSelectedRange({ start, end });
					showBubbleMenuAtSelection();
				} else {
					setShowBubbleMenu(false);
				}
			}, 0);
		}
	};

	// Handle selection changes
	const handleSelectionChange = () => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		setSelectedRange({ start, end });

		if (start !== end) {
			showBubbleMenuAtSelection();
		} else {
			setShowBubbleMenu(false);
		}
	};

	// Show bubble menu at selection
	const showBubbleMenuAtSelection = () => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;

		// Calculate position based on selection (middle of selection)
		const middlePos = Math.floor((start + end) / 2);
		const pos = getCursorPosition(textarea, middlePos);

		setBubblePosition({
			top: pos.top - 50,
			left: pos.left,
		});
		setShowBubbleMenu(true);
	};

	// Apply command from palette
	const applyCommand = (command) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const cursorPosition = textarea.selectionStart;
		const textBeforeCursor = value.substring(0, cursorPosition);
		const textAfterCursor = value.substring(cursorPosition);

		// Remove the '/' and apply the command
		const newText = textBeforeCursor.slice(0, -1) + command() + textAfterCursor;
		setValue(newText);
		onChange?.(newText);

		// Set cursor position after the command
		setTimeout(() => {
			const newCursorPos = cursorPosition - 1 + command().length;
			textarea.setSelectionRange(newCursorPos, newCursorPos);
			textarea.focus();
		}, 0);

		setShowCommandPalette(false);
	};

	// Format selected text
	const formatText = (format, color = null) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const start = selectedRange.start;
		const end = selectedRange.end;
		const selectedText = value.substring(start, end);

		let formattedText = selectedText;
		let newStart = start;
		let newEnd = end;

		switch (format) {
			case "bold":
				formattedText = `**${selectedText}**`;
				newStart = start + 2;
				newEnd = end + 2;
				break;
			case "italic":
				formattedText = `*${selectedText}*`;
				newStart = start + 1;
				newEnd = end + 1;
				break;
			case "underline":
				formattedText = `<u>${selectedText}</u>`;
				newStart = start + 3;
				newEnd = end + 3;
				break;
			case "code":
				formattedText = `\`${selectedText}\``;
				newStart = start + 1;
				newEnd = end + 1;
				break;
			case "strikethrough":
				formattedText = `~~${selectedText}~~`;
				newStart = start + 2;
				newEnd = end + 2;
				break;
			case "color":
				formattedText = `<span style="color: ${color}">${selectedText}</span>`;
				newStart = start + 25 + color.length;
				newEnd = end + 25 + color.length;
				break;
		}

		const newValue =
			value.substring(0, start) + formattedText + value.substring(end);
		setValue(newValue);
		onChange?.(newValue);

		// Set selection to the formatted text
		setTimeout(() => {
			textarea.setSelectionRange(newStart, newEnd);
			textarea.focus();
		}, 0);

		setShowBubbleMenu(false);
	};

	// Insert content at cursor position
	const insertContent = (type) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const cursorPos = textarea.selectionStart;
		const textBeforeCursor = value.substring(0, cursorPos);
		const textAfterCursor = value.substring(cursorPos);

		let insertText = "";
		let newCursorPos = cursorPos;

		switch (type) {
			case "h1":
				insertText = "# ";
				newCursorPos = cursorPos + 2;
				break;
			case "h2":
				insertText = "## ";
				newCursorPos = cursorPos + 3;
				break;
			case "h3":
				insertText = "### ";
				newCursorPos = cursorPos + 4;
				break;
			case "quote":
				insertText = "> ";
				newCursorPos = cursorPos + 2;
				break;
			case "bullet":
				insertText = "- ";
				newCursorPos = cursorPos + 2;
				break;
			case "numbered":
				insertText = "1. ";
				newCursorPos = cursorPos + 3;
				break;
			case "table":
				insertText =
					"| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |";
				newCursorPos = cursorPos + insertText.length;
				break;
			case "link":
				insertText = "[Link Text](https://example.com)";
				newCursorPos = cursorPos + 12; // Position after "Link Text"
				break;
			case "image":
				insertText = "![Alt Text](https://example.com/image.jpg)";
				newCursorPos = cursorPos + 10; // Position after "Alt Text"
				break;
			case "divider":
				insertText = "\n---\n";
				newCursorPos = cursorPos + insertText.length;
				break;
		}

		const newValue = textBeforeCursor + insertText + textAfterCursor;
		setValue(newValue);
		onChange?.(newValue);

		// Set cursor position
		setTimeout(() => {
			textarea.setSelectionRange(newCursorPos, newCursorPos);
			textarea.focus();
		}, 0);
	};

	// Handle click outside to close menus
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (commandRef.current && !commandRef.current.contains(event.target)) {
				setShowCommandPalette(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			className={cn(
				"relative w-full border rounded-lg overflow-hidden",
				className,
			)}
			{...props}
		>
			{/* Toolbar */}
			{showToolbar && (
				<MarkdownToolbar
					onFormat={formatText}
					onInsert={insertContent}
					selectedText={value.substring(selectedRange.start, selectedRange.end)}
				/>
			)}

			{/* Editor */}
			<Textarea
				ref={textareaRef}
				value={value}
				onChange={handleTextChange}
				onKeyDown={handleKeyDown}
				onSelect={handleSelectionChange}
				onMouseUp={handleSelectionChange}
				placeholder={placeholder}
				className="min-h-[400px] resize-none border-0 focus:ring-0 focus:ring-offset-0 p-4 text-base leading-relaxed"
			/>

			{/* Command Palette */}
			{showCommandPalette && (
				<div
					ref={commandRef}
					className="absolute z-50 bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-2xl p-3 w-80 animate-in fade-in-0 zoom-in-95 duration-200"
					style={{
						top: commandPosition.top,
						left: commandPosition.left,
					}}
				>
					<Command>
						<CommandInput 
							placeholder="Search commands..." 
							className="border-0 focus:ring-0 bg-transparent"
						/>
						<CommandList>
							<CommandEmpty>No commands found.</CommandEmpty>
							<CommandGroup>
								{commandItems.map((item) => (
									<CommandItem
										key={item.title}
										onSelect={() => applyCommand(item.command)}
										className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors"
									>
										<div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted/50">
											<item.icon className="h-4 w-4" />
										</div>
										<div>
											<div className="font-medium text-sm">{item.title}</div>
											<div className="text-xs text-muted-foreground">
												{item.description}
											</div>
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</div>
			)}

			{/* Bubble Menu */}
			{showBubbleMenu && (
				<div
					className="absolute z-50 bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-2xl p-2 animate-in fade-in-0 zoom-in-95 duration-200"
					style={{
						top: bubblePosition.top,
						left: bubblePosition.left,
					}}
				>
					<div className="flex items-center gap-1">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => formatText("bold")}
							className="h-9 w-9 p-0 hover:bg-muted/50 transition-colors"
							title="Bold"
						>
							<Bold className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => formatText("italic")}
							className="h-9 w-9 p-0 hover:bg-muted/50 transition-colors"
							title="Italic"
						>
							<Italic className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => formatText("code")}
							className="h-9 w-9 p-0 hover:bg-muted/50 transition-colors"
							title="Code"
						>
							<Code className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => formatText("strikethrough")}
							className="h-9 w-9 p-0 hover:bg-muted/50 transition-colors"
							title="Strikethrough"
						>
							<Strikethrough className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

// Enhanced Markdown Viewer with Vercel blog-style rendering
export function MarkdownViewer({ content, className, ...props }) {
	return (
		<div
			className={cn(
				"prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight",
				className,
			)}
			{...props}
		>
			<MDXProvider
				components={{
					// Custom components for MDX
					Callout: ({ children, type = "info" }) => (
						<div className={`p-4 rounded-lg border-l-4 mb-6 ${
							type === "warning" ? "bg-yellow-50 border-yellow-400 dark:bg-yellow-900/20" :
							type === "error" ? "bg-red-50 border-red-400 dark:bg-red-900/20" :
							type === "success" ? "bg-green-50 border-green-400 dark:bg-green-900/20" :
							"bg-blue-50 border-blue-400 dark:bg-blue-900/20"
						}`}>
							{children}
						</div>
					),
					CodeBlock: ({ children, language, title }) => (
						<div className="my-6 rounded-lg overflow-hidden border border-border/50">
							{title && (
								<div className="px-4 py-2 bg-muted/50 border-b border-border/50 text-sm font-medium">
									{title}
								</div>
							)}
							<SyntaxHighlighter
								style={oneDark}
								language={language}
								PreTag="div"
								className="text-sm"
							>
								{children}
							</SyntaxHighlighter>
						</div>
					),
				}}
			>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					skipHtml={false}
					components={{
						h1: ({ children }) => (
							<h1 className="text-4xl font-bold tracking-tight mb-8 mt-12 first:mt-0 text-foreground">
								{children}
							</h1>
						),
						h2: ({ children }) => (
							<h2 className="text-3xl font-bold tracking-tight mb-6 mt-10 text-foreground">
								{children}
							</h2>
						),
						h3: ({ children }) => (
							<h3 className="text-2xl font-bold tracking-tight mb-4 mt-8 text-foreground">
								{children}
							</h3>
						),
						h4: ({ children }) => (
							<h4 className="text-xl font-bold tracking-tight mb-3 mt-6 text-foreground">
								{children}
							</h4>
						),
						h5: ({ children }) => (
							<h5 className="text-lg font-bold tracking-tight mb-2 mt-4 text-foreground">
								{children}
							</h5>
						),
						h6: ({ children }) => (
							<h6 className="text-base font-bold tracking-tight mb-2 mt-3 text-foreground">
								{children}
							</h6>
						),
						p: ({ children }) => (
							<p className="text-lg leading-7 mb-6 text-foreground/90">
								{children}
							</p>
						),
						ul: ({ children }) => (
							<ul className="list-disc list-outside text-lg leading-7 mb-6 space-y-2 ml-6 text-foreground/90">
								{children}
							</ul>
						),
						ol: ({ children }) => (
							<ol className="list-decimal list-outside text-lg leading-7 mb-6 space-y-2 ml-6 text-foreground/90">
								{children}
							</ol>
						),
						li: ({ children }) => (
							<li className="text-lg leading-7">
								{children}
							</li>
						),
						blockquote: ({ children }) => (
							<blockquote className="border-l-4 border-primary/60 pl-6 italic text-lg leading-7 mb-6 bg-muted/30 py-4 rounded-r-lg text-foreground/80">
								{children}
							</blockquote>
						),
						code({ node, inline, className, children, ...props }) {
							const match = /language-(\w+)/.exec(className || "");
							return !inline && match ? (
								<div className="my-8 rounded-xl overflow-hidden border border-border/50 shadow-sm">
									<SyntaxHighlighter
										style={oneDark}
										language={match[1]}
										PreTag="div"
										className="text-sm leading-relaxed"
										{...props}
									>
										{String(children).replace(/\n$/, "")}
									</SyntaxHighlighter>
								</div>
							) : (
								<code
									className="bg-muted/80 px-2 py-1 rounded-md text-sm font-mono text-foreground border border-border/30"
									{...props}
								>
									{children}
								</code>
							);
						},
						pre: ({ children }) => (
							<pre className="bg-muted/80 p-6 rounded-xl overflow-x-auto mb-6 text-sm leading-relaxed border border-border/30">
								{children}
							</pre>
						),
						a: ({ children, href }) => (
							<a
								href={href}
								className="text-primary hover:text-primary/80 font-medium transition-colors underline decoration-primary/30 hover:decoration-primary/60"
								target="_blank"
								rel="noopener noreferrer"
							>
								{children}
							</a>
						),
						strong: ({ children }) => (
							<strong className="font-semibold text-foreground">{children}</strong>
						),
						em: ({ children }) => (
							<em className="italic text-foreground/90">{children}</em>
						),
						hr: () => <hr className="border-border/50 my-12 border-t" />,
						table: ({ children }) => (
							<div className="overflow-x-auto mb-8 rounded-lg border border-border/50">
								<table className="w-full border-collapse">
									{children}
								</table>
							</div>
						),
						thead: ({ children }) => (
							<thead className="bg-muted/50">{children}</thead>
						),
						tbody: ({ children }) => (
							<tbody className="bg-background">{children}</tbody>
						),
						tr: ({ children }) => (
							<tr className="border-b border-border/30 hover:bg-muted/30 transition-colors">
								{children}
							</tr>
						),
						th: ({ children }) => (
							<th className="px-6 py-4 text-left font-semibold text-foreground text-sm">
								{children}
							</th>
						),
						td: ({ children }) => (
							<td className="px-6 py-4 text-foreground/90 text-sm">
								{children}
							</td>
						),
						Button: ({ children }) => (
							<Button className="px-6 py-4 text-foreground/90 text-sm">
								{children}
							</Button>
						),
						// Task lists
						input: ({ type, checked, ...props }) => {
							if (type === "checkbox") {
								return (
									<input
										type="checkbox"
										checked={checked}
										className="mr-3 accent-primary scale-110"
										{...props}
									/>
								);
							}
							return <input type={type} {...props} />;
						},
		}}
	>
		{content}
			</ReactMarkdown>
			</MDXProvider>
		</div>
	);
}

// Real-time Preview Component
export function MarkdownPreview({ content, className, ...props }) {
	return (
		<div className={cn("w-full", className)} {...props}>
			<div className="border rounded-lg bg-background">
				<div className="p-3 border-b bg-muted/30 text-sm font-medium flex items-center gap-2">
					<Eye className="h-4 w-4" />
					Preview
				</div>
				<div className="p-6 min-h-[400px] overflow-auto">
					<MarkdownViewer content={content} />
				</div>
			</div>
		</div>
	);
}

// Split View Component
export function MarkdownSplitView({
	content,
	onChange,
	placeholder = "Type '/' for commands...",
	className,
	...props
}) {
	return (
		<div
			className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4", className)}
			{...props}
		>
			<div className="border rounded-lg bg-background">
				<div className="p-3 border-b bg-muted/30 text-sm font-medium flex items-center gap-2">
					<Edit3 className="h-4 w-4" />
					Editor
				</div>
				<MarkdownEditor
					content={content}
					onChange={onChange}
					placeholder={placeholder}
					showToolbar={true}
					className="border-0 rounded-none"
				/>
			</div>
			<MarkdownPreview content={content} />
		</div>
	);
}

// Legacy components for backward compatibility
export function MarkdownEditorFloatingBar({ className, ...props }) {
	return (
		<div
			className={cn(
				"absolute top-0 left-auto w-full flex items-center justify-center pt-2",
				className,
			)}
			{...props}
		>
			<div
				className={cn(
					className,
					"bg-background p-1 py-2 border rounded-lg shadow-lg",
				)}
			>
				<ButtonGroup className="first:ml-1.5 last:mr-1.5">
					<ButtonGroup>
						<Button variant="ghost" size="icon" aria-label="AI Assistant">
							<Sparkle className="fill-foreground text-background stroke-[0.5px]" />
						</Button>
					</ButtonGroup>
					<ButtonGroup className="py-0.5">
						<Separator orientation="vertical" />
					</ButtonGroup>
					<ButtonGroup>
						<Select>
							<SelectTrigger className="w-[120px] text-xs" variant="ghost">
								<SelectValue placeholder="Text" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Turn into</SelectLabel>
									{commandItems.map((item) => (
										<SelectItem key={item.title} value={item.title}>
											{item.title}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</ButtonGroup>
					<ButtonGroup className="py-0.5">
						<Separator orientation="vertical" />
					</ButtonGroup>
					<ButtonGroup>
						<ButtonGroup>
							<Button variant="ghost" size="icon" aria-label="Bold">
								<Bold />
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant="ghost" size="icon" aria-label="Italic">
								<Italic />
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant="ghost" size="icon" aria-label="Underline">
								<Underline />
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant="ghost" size="icon" aria-label="Strikethrough">
								<Strikethrough />
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant="ghost" size="icon" aria-label="Code">
								<Code />
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant="ghost" size="icon" aria-label="Link">
								<Link />
							</Button>
						</ButtonGroup>
					</ButtonGroup>
					<ButtonGroup className="py-0.5">
						<Separator orientation="vertical" />
					</ButtonGroup>
					<ButtonGroup>
						<Button variant="ghost" size="icon" aria-label="Color">
							<Palette className="h-4 w-4" />
						</Button>
					</ButtonGroup>
					<ButtonGroup className="py-0.5">
						<Separator orientation="vertical" />
					</ButtonGroup>
					<ButtonGroup>
						<ButtonGroup>
							<Button variant="ghost" size="icon" aria-label="Bullet List">
								<List />
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant="ghost" size="icon" aria-label="Numbered List">
								<ListOrdered />
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant="ghost" size="icon" aria-label="Task List">
								<ListCollapse />
							</Button>
						</ButtonGroup>
					</ButtonGroup>
					<ButtonGroup className="py-0.5">
						<Separator orientation="vertical" />
					</ButtonGroup>
					<ButtonGroup>
						<Button variant="ghost" size="icon" aria-label="More Options">
							<Ellipsis />
						</Button>
					</ButtonGroup>
				</ButtonGroup>
			</div>
		</div>
	);
}
