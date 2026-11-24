#!/usr/bin/env bun
/**
 * Script to extract props from TypeScript/JavaScript React components
 * Generates JSON files with prop info for PropsTable
 * Run: bun scripts/extract-props.ts
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, sep as pathSeparator } from "node:path";
import { fileURLToPath } from "node:url";
import {
	Node,
	type ParameterDeclaration,
	Project,
	type SourceFile,
	type Symbol as TsMorphSymbol,
	type Type,
} from "ts-morph";

interface ExtractedProp {
	name: string;
	type: string;
	defaultValue?: string;
	required: boolean;
	description?: string;
}

interface ComponentPropsEntry {
	component: string;
	props: ExtractedProp[];
}

interface BaseUIPackageJson {
	types?: string;
	exports?: Record<
		string,
		{
			default?: { types?: string };
			require?: { types?: string };
		}
	>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const require = createRequire(import.meta.url);

const genericPropNames = new Set([
	"className",
	"children",
	"style",
	"id",
	"title",
	"role",
	"tabIndex",
	"ref",
	"key",
	"as",
	"autoFocus",
	"autoComplete",
	"autoCapitalize",
	"autoCorrect",
	"autoSave",
	"defaultValue",
	"defaultChecked",
	"checked",
	"value",
	"name",
	"type",
	"placeholder",
	"required",
	"disabled",
	"readOnly",
	"multiple",
	"pattern",
	"min",
	"max",
	"step",
	"minLength",
	"maxLength",
	"form",
	"list",
	"inputMode",
	"size",
	"accept",
	"capture",
	"src",
	"alt",
	"height",
	"width",
	"draggable",
	"contentEditable",
	"suppressContentEditableWarning",
	"suppressHydrationWarning",
	"itemProp",
	"itemScope",
	"itemType",
	"itemID",
	"itemRef",
	"dangerouslySetInnerHTML",
	"onBlur",
	"onChange",
	"onFocus",
	"onInput",
	"onInvalid",
	"onReset",
	"onSubmit",
	"onClick",
	"onDoubleClick",
	"onMouseDown",
	"onMouseEnter",
	"onMouseLeave",
	"onMouseMove",
	"onMouseOut",
	"onMouseOver",
	"onMouseUp",
	"onKeyDown",
	"onKeyPress",
	"onKeyUp",
	"onContextMenu",
	"onSelect",
	"onTouchCancel",
	"onTouchEnd",
	"onTouchMove",
	"onTouchStart",
	"onDrag",
	"onDragEnd",
	"onDragEnter",
	"onDragExit",
	"onDragLeave",
	"onDragOver",
	"onDragStart",
	"onDrop",
	"onScroll",
	"onWheel",
]);

function isGenericProp(name = ""): boolean {
	if (!name) return false;
	if (genericPropNames.has(name)) return true;
	if (name.startsWith("aria-") || name.startsWith("data-")) return true;
	return false;
}

const project = new Project({
	tsConfigFilePath: join(rootDir, "tsconfig.json"),
});

const baseUISourceCache = new Map<string, SourceFile>();
const baseUIPropsCache = new Map<string, ExtractedProp[]>();
const baseUIPackageJsonPath = require.resolve("@base-ui/react/package.json", {
	paths: [rootDir],
});
const baseUIPackage = JSON.parse(readFileSync(baseUIPackageJsonPath, "utf-8")) as BaseUIPackageJson;
const baseUIDir = dirname(baseUIPackageJsonPath);

function simplifyType(type: string): string {
	if (!type || type === "unknown") return "unknown";

	let simplified = type
		.replace(/\s*\|\s*undefined/g, "")
		.replace(/\s*\|\s*null/g, "")
		.replace(/\s*undefined\s*\|\s*/g, "")
		.replace(/\s*null\s*\|\s*/g, "")
		.replace(/\s+/g, " ")
		.trim();

	if (!simplified) {
		simplified = type.replace(/\s+/g, " ").trim();
	}

	return simplified;
}

function validateTypeSyntax(type: string): boolean {
	if (!type) return false;

	let parens = 0;
	let braces = 0;
	let brackets = 0;
	let inString = false;
	let stringChar = "";

	for (let i = 0; i < type.length; i++) {
		const char = type[i];
		const prev = i > 0 ? type[i - 1] : "";

		if ((char === '"' || char === "'") && prev !== "\\") {
			if (!inString) {
				inString = true;
				stringChar = char;
			} else if (char === stringChar) {
				inString = false;
				stringChar = "";
			}
		}

		if (!inString) {
			if (char === "(") parens++;
			if (char === ")") parens--;
			if (char === "{") braces++;
			if (char === "}") braces--;
			if (char === "[") brackets++;
			if (char === "]") brackets--;
		}
	}

	if (parens < 0) {
		parens = 0;
	}

	return parens === 0 && braces === 0 && brackets === 0;
}

function shortenLongType(type: string): string {
	if (!type) return type;

	if (!validateTypeSyntax(type)) {
		type = type.replace(/\)+$/, "");
		if (type.includes("(() => Element") && !type.includes(")")) {
			return "() => Element";
		}
		if (type.includes("SelectValueType<Value, Multiple>") && !type.includes(")")) {
			return "(value: SelectValueType) => void";
		}
	}

	if (type.includes("React.ReactElement<unknown")) {
		return "React.ReactElement";
	}

	if (type.includes("HTMLElement") && type.includes("ShadowRoot") && type.includes("RefObject")) {
		return "HTMLElement | RefObject<HTMLElement>";
	}

	if (type.includes("RefObject<HTMLElement | ShadowRoot>")) {
		return "RefObject<HTMLElement>";
	}

	if (type.includes("HTMLElement | ShadowRoot | React.RefObject")) {
		return "HTMLElement | RefObject<HTMLElement>";
	}

	if (type.length < 70) return type;

	if (type.includes("boolean | void | HTMLElement)")) {
		return "boolean | HTMLElement";
	}

	if (type.includes("=>")) {
		if (type.endsWith("...")) {
			const returnMatch = type.match(/=>\s*(\w+)/);
			const returnType = returnMatch ? returnMatch[1] : "void";
			return `(...args) => ${returnType}`;
		}

		const match = type.match(/\(([^)]*)\)\s*=>\s*(\w+)/);
		if (match) {
			const params = match[1];
			const returnType = match[2];
			if (params.length > 30 || type.length > 60) {
				return `(...args) => ${returnType}`;
			}
			return `(${params}) => ${returnType}`;
		}

		const simpleMatch = type.match(/(\([^)]*\))\s*=>\s*(\w+)/);
		if (simpleMatch) {
			return `${simpleMatch[1]} => ${simpleMatch[2]}`;
		}

		const returnMatch = type.match(/=>\s*(\w+)/);
		const returnType = returnMatch ? returnMatch[1] : "void";
		return `(...args) => ${returnType}`;
	}

	if (type.includes("Record<") && type.includes("readonly")) {
		return "Array<{label, value}> | Record<string, ReactNode>";
	}

	if (type.includes("|")) {
		const parts = type.split("|").map((p) => p.trim());
		const relevantParts = parts
			.filter((p) => !p.includes("node_modules") && !p.includes("import(") && p.length < 60)
			.map((p) => {
				if (p.includes("React.RefObject")) {
					return "RefObject<HTMLElement>";
				}
				if (p.includes("React.ReactElement<unknown")) {
					return "React.ReactElement";
				}
				if (p.includes("Record<") && p.includes("readonly")) {
					return "Array<{label, value}>";
				}
				return p;
			})
			.slice(0, 3);

		if (relevantParts.length > 0) {
			return relevantParts.join(" | ");
		}
		const firstSimple = parts.find((p) => p.length < 40 && !p.includes("<"));
		if (firstSimple) return firstSimple;
	}

	if (type.includes("&") && type.length > 70) {
		const parts = type.split("&").map((p) => p.trim());
		const simplePart =
			parts.find(
				(p) => !p.includes("ComponentProps") && !p.includes("Primitive") && p.length < 50,
			) || parts[0];

		if (simplePart && simplePart.length < 60) {
			return `${simplePart} & ...`;
		}
		const firstPart = parts[0].trim();
		if (firstPart.length > 60) {
			return `${firstPart.substring(0, 57)}...`;
		}
		return `${firstPart} & ...`;
	}

	if (type.length > 70) {
		if (type.includes("=>")) {
			const funcMatch = type.match(/(\([^)]*\))\s*=>\s*(\w+)/);
			if (funcMatch && funcMatch[1].length > 40) {
				return `(...args) => ${funcMatch[2] || "void"}`;
			}
		}

		const truncatePoints = [",", "|", "&", " "];
		for (const point of truncatePoints) {
			const index = type.lastIndexOf(point, 60);
			if (index > 20) {
				return `${type.substring(0, index)}...`;
			}
		}
		return `${type.substring(0, 60)}...`;
	}

	return type;
}

function formatType(type: string): string {
	if (!type) return "unknown";

	let formatted = type.replace(/\s+/g, " ").replace(/\n/g, " ").trim();
	formatted = formatted.replace(/\s*&\s*/g, " & ");
	formatted = formatted.replace(/\s*\|\s*/g, " | ");
	formatted = simplifyType(formatted);

	if (!validateTypeSyntax(formatted)) {
		formatted = formatted.replace(/\)+$/, "");
	}

	formatted = shortenLongType(formatted);

	if (!validateTypeSyntax(formatted) && formatted.length > 50) {
		formatted = formatted.split("|")[0].split("&")[0].trim();
		if (formatted.length > 60) {
			formatted = `${formatted.substring(0, 57)}...`;
		}
	}

	return formatted;
}

function cleanDefaultValueText(rawText: string | undefined): string | undefined {
	if (!rawText) return undefined;
	const text = rawText.trim();
	if (!text) return undefined;

	if (
		(text.startsWith('"') && text.endsWith('"')) ||
		(text.startsWith("'") && text.endsWith("'"))
	) {
		const inner = text.slice(1, -1);
		return inner.length > 30 ? `${inner.substring(0, 27)}...` : inner;
	}
	if (text === "true" || text === "false" || text === "null") return text;
	if (/^-?\d+(\.\d+)?$/.test(text)) return text;
	if (text.startsWith("{")) return "{ ... }";
	return text.length > 30 ? `${text.substring(0, 27)}...` : text;
}

function extractDefaultValue(param: ParameterDeclaration): string | undefined {
	const initializer = param.getInitializer();
	if (!initializer) return undefined;
	return cleanDefaultValueText(initializer.getText());
}

function resolveBaseUITypesPath(moduleSpecifier: string): string | undefined {
	const subpath = moduleSpecifier.replace("@base-ui/react", ".");
	const exportEntry = baseUIPackage.exports?.[subpath];
	const typePath =
		exportEntry?.default?.types ||
		exportEntry?.require?.types ||
		(subpath === "." ? baseUIPackage.types : undefined);

	if (!typePath) return undefined;

	return join(baseUIDir, typePath);
}

function isReactDefaultPropDeclaration(declaration?: Node): boolean {
	if (!declaration) return false;
	const filePath = declaration.getSourceFile().getFilePath();
	return filePath.includes(`${pathSeparator}@types${pathSeparator}react`);
}

function hasFilePathInType(typeText = ""): boolean {
	if (!typeText) return false;
	return (
		typeText.includes("node_modules") ||
		/import\(["'][^"']*[\\/][^"']*["']\)/.test(typeText) ||
		/[A-Za-z]:\\/.test(typeText) ||
		/\/Users\//.test(typeText) ||
		/\/src\//.test(typeText) ||
		typeText.includes("\\")
	);
}

function isFromComponentOrBaseUI(declaration?: Node, onlyBaseUI = false): boolean {
	if (!declaration) return false;
	const filePath = declaration.getSourceFile().getFilePath();

	if (filePath.includes(`${pathSeparator}@base-ui${pathSeparator}react`)) {
		return true;
	}

	if (onlyBaseUI) {
		return false;
	}

	if (filePath.includes(`${pathSeparator}registry${pathSeparator}optics`)) {
		return true;
	}

	if (
		filePath.includes(`${pathSeparator}@types${pathSeparator}react`) ||
		filePath.includes(`${pathSeparator}node_modules${pathSeparator}@types`) ||
		filePath.includes(`${pathSeparator}lib${pathSeparator}dom`) ||
		filePath.includes(`${pathSeparator}lib${pathSeparator}es`)
	) {
		return false;
	}

	return false;
}

function extractSymbolDescription(symbol: TsMorphSymbol): string | undefined {
	try {
		const decls = symbol.getDeclarations();
		for (const decl of decls) {
			if (Node.isJSDocable(decl)) {
				const docs = decl.getJsDocs();
				if (docs.length > 0) {
					const comment = docs[0].getComment()?.toString().trim();
					if (comment) return comment;
				}
			}
		}
		const tags = symbol.getJsDocTags();
		if (tags.length > 0) {
			return tags[0]
				?.getText()
				.map((part) => part.text)
				.join("")
				.trim();
		}
	} catch {
		return undefined;
	}
	return undefined;
}

function extractPropsFromType(
	type: Type,
	{ onlyBaseUI = false }: { onlyBaseUI?: boolean } = {},
): ExtractedProp[] {
	return type.getProperties().reduce<ExtractedProp[]>((acc, symbol) => {
		const name = symbol.getName();
		const cleanName = name.replace(/\\n/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").trim();

		if (
			cleanName.includes("{") ||
			cleanName.includes("}") ||
			cleanName.includes("...") ||
			cleanName.startsWith("{") ||
			/^\{\s*className/.test(cleanName) ||
			(cleanName.includes("className") &&
				(cleanName.includes("props") || cleanName.includes("render"))) ||
			cleanName.length > 50
		) {
			return acc;
		}

		if (isGenericProp(name)) return acc;

		const declaration = symbol.getDeclarations()?.[0];

		if (
			!isFromComponentOrBaseUI(declaration, onlyBaseUI) &&
			!symbol.getDeclarations()?.some((dec) => isFromComponentOrBaseUI(dec, onlyBaseUI))
		) {
			return acc;
		}

		if (isReactDefaultPropDeclaration(declaration)) {
			return acc;
		}

		let typeText = declaration
			? formatType(symbol.getTypeAtLocation(declaration).getText())
			: "unknown";

		if (hasFilePathInType(typeText)) {
			return acc;
		}

		if (typeText.includes("SelectValueType<Value, Multiple>") && !typeText.includes(")")) {
			typeText = "(value: SelectValueType) => void";
		}
		if (typeText.includes("(() => Element") && !typeText.includes(")")) {
			typeText = "() => Element";
		}

		let cleanedTypeText = typeText.includes("node_modules/@base-ui/react") ? "—" : typeText;

		if (cleanedTypeText === "Payload") {
			cleanedTypeText = "object";
		} else if (cleanedTypeText === "ReactNode") {
			cleanedTypeText = "React.ReactNode";
		} else if (
			cleanedTypeText.endsWith("Props") &&
			cleanedTypeText.length < 30 &&
			cleanedTypeText.includes("Link")
		) {
			cleanedTypeText = "object";
		}

		const description = extractSymbolDescription(symbol);

		acc.push({
			name,
			type: cleanedTypeText || "",
			required: !symbol.isOptional(),
			description: description || undefined,
		});

		return acc;
	}, []);
}

function extractBaseUIProps(moduleSpecifier: string, exportedName: string): ExtractedProp[] {
	const cacheKey = `${moduleSpecifier}::${exportedName}`;
	const cached = baseUIPropsCache.get(cacheKey);
	if (cached) return cached;

	const typesPath = resolveBaseUITypesPath(moduleSpecifier);
	if (!typesPath || !existsSync(typesPath)) {
		baseUIPropsCache.set(cacheKey, []);
		return [];
	}

	const sourceFile = baseUISourceCache.get(typesPath) || project.addSourceFileAtPath(typesPath);
	baseUISourceCache.set(typesPath, sourceFile);

	const exported = sourceFile.getExportedDeclarations();
	const props: ExtractedProp[] = [];

	exported.forEach((declarations, name) => {
		if (!name.endsWith("Props")) return;

		declarations.forEach((declaration) => {
			const type = declaration.getType();
			props.push(...extractPropsFromType(type, { onlyBaseUI: true }));
		});
	});

	baseUIPropsCache.set(cacheKey, props);
	return props;
}

function getBaseUIImports(relativePath: string) {
	const fullPath = join(rootDir, relativePath);
	if (!existsSync(fullPath)) return [];

	const content = readFileSync(fullPath, "utf-8");
	const imports: Array<{ moduleSpecifier: string; exportedName: string }> = [];
	const importRegex = /import\s+{([^}]+)}\s+from\s+["'](@base-ui\/react[^"']*)["']/g;
	let match: RegExpExecArray | null;

	while ((match = importRegex.exec(content)) !== null) {
		const [, names, moduleSpecifier] = match;

		names
			.split(",")
			.map((n) => n.trim())
			.filter(Boolean)
			.forEach((entry) => {
				const [imported] = entry.split(/\s+as\s+/);
				if (imported) {
					imports.push({
						moduleSpecifier,
						exportedName: imported.trim(),
					});
				}
			});
	}

	return imports;
}

function mergeProps(
	localProps: ExtractedProp[] = [],
	externalProps: ExtractedProp[] = [],
): ExtractedProp[] {
	const merged = new Map<string, ExtractedProp>();

	localProps.forEach((prop) => {
		const cleanName = prop.name.replace(/\s+/g, " ").replace(/\\n/g, " ").trim();
		if (
			cleanName.includes("{") ||
			cleanName.includes("}") ||
			cleanName.includes("...") ||
			(cleanName.includes("className") &&
				(cleanName.includes("props") || cleanName.includes("render"))) ||
			cleanName.startsWith("{") ||
			/^\{\s*className/.test(cleanName)
		) {
			return;
		}

		if (prop.type && prop.type !== "unknown" && !isGenericProp(prop.name)) {
			merged.set(prop.name, prop);
		}
	});

	externalProps.forEach((prop) => {
		const existing = merged.get(prop.name);
		if (!existing && prop.type && prop.type !== "unknown" && !isGenericProp(prop.name)) {
			merged.set(prop.name, prop);
		} else if (existing && !existing.description && prop.description) {
			merged.set(prop.name, { ...existing, description: prop.description });
		}
	});

	return Array.from(merged.values());
}

function getComponentParameters(
	sourceFile: SourceFile,
	componentName: string,
): ParameterDeclaration[] {
	const fn = sourceFile.getFunction(componentName);
	if (fn) {
		return fn.getParameters();
	}

	const varDecl = sourceFile.getVariableDeclaration(componentName);
	if (!varDecl) return [];

	const init = varDecl.getInitializer();
	if (!init) return [];

	if (Node.isArrowFunction(init) || Node.isFunctionExpression(init)) {
		return init.getParameters();
	}

	if (Node.isCallExpression(init)) {
		for (const arg of init.getArguments()) {
			if (Node.isArrowFunction(arg) || Node.isFunctionExpression(arg)) {
				return arg.getParameters();
			}
		}
	}

	return [];
}

function inferTypeFromDefault(defaultValue?: string): string {
	if (!defaultValue) return "unknown";
	if (defaultValue === "true" || defaultValue === "false") return "boolean";
	if (defaultValue === "null") return "React.ReactNode";
	if (/^-?\d+(\.\d+)?$/.test(defaultValue)) return "number";
	if (defaultValue.startsWith("{")) return "object";
	return "string";
}

function extractComponentPropsTS(
	filePath: string,
	componentNames: string[],
): ComponentPropsEntry[] {
	const fullPath = join(rootDir, filePath);

	if (!existsSync(fullPath)) {
		console.warn(`File not found: ${fullPath}`);
		return [];
	}

	const sourceFile = project.getSourceFile(fullPath) || project.addSourceFileAtPath(fullPath);
	const results: ComponentPropsEntry[] = [];

	componentNames.forEach((componentName) => {
		const parameters = getComponentParameters(sourceFile, componentName);
		if (parameters.length === 0) {
			results.push({
				component: `<${componentName} />`,
				props: [],
			});
			return;
		}

		const propsMap = new Map<string, ExtractedProp>();
		const firstParam = parameters[0];
		const firstParamType = firstParam?.getType();

		if (firstParam && Node.isObjectBindingPattern(firstParam.getNameNode())) {
			const bindingPattern = firstParam.getNameNode();
			if (Node.isObjectBindingPattern(bindingPattern)) {
				for (const element of bindingPattern.getElements()) {
					if (element.getDotDotDotToken()) continue;
					const propName = (element.getPropertyNameNode() ?? element.getNameNode()).getText();
					if (!propName || isGenericProp(propName)) continue;

					const rawDefault = element.getInitializer()?.getText();
					const defaultValue = cleanDefaultValueText(rawDefault);

					let typeText = "unknown";
					const propSymbol = firstParamType?.getProperty(propName);
					if (propSymbol) {
						const dec = propSymbol.getDeclarations()?.[0] ?? element;
						typeText = formatType(propSymbol.getTypeAtLocation(dec).getText());
					} else {
						typeText = formatType(element.getType().getText());
					}

					if (hasFilePathInType(typeText)) {
						typeText = "unknown";
					}
					if (typeText === "unknown" || typeText === "any") {
						const inferred = inferTypeFromDefault(defaultValue);
						if (inferred !== "unknown") typeText = inferred;
					}

					const isOptional = Boolean(propSymbol?.isOptional()) || rawDefault !== undefined;
					const description = propSymbol ? extractSymbolDescription(propSymbol) : undefined;

					propsMap.set(propName, {
						name: propName,
						type: typeText,
						defaultValue: defaultValue ? `(default: ${defaultValue})` : undefined,
						required: !isOptional,
						description,
					});
				}
			}
		}

		if (firstParamType) {
			const typeProps = extractPropsFromType(firstParamType, {
				onlyBaseUI: false,
			});
			for (const prop of typeProps) {
				if (isGenericProp(prop.name)) continue;
				const existing = propsMap.get(prop.name);
				if (!existing) {
					propsMap.set(prop.name, prop);
				} else {
					propsMap.set(prop.name, {
						...prop,
						defaultValue: existing.defaultValue ?? prop.defaultValue,
						required: existing.defaultValue ? false : prop.required,
						description: existing.description ?? prop.description,
					});
				}
			}
		}

		if (
			firstParam &&
			!Node.isObjectBindingPattern(firstParam.getNameNode()) &&
			parameters.length > 0
		) {
			parameters.forEach((param) => {
				const name = param.getName();
				if (param.isRestParameter() || name === "props" || isGenericProp(name)) {
					return;
				}
				const typeNode = param.getTypeNode();
				const rawType = typeNode ? typeNode.getText() : param.getType().getText();
				const type = formatType(rawType);
				if (hasFilePathInType(type)) return;
				const defaultValue = extractDefaultValue(param);
				const isOptional = param.hasQuestionToken() || defaultValue !== undefined;

				propsMap.set(name, {
					name,
					type: type || "unknown",
					defaultValue: defaultValue ? `(default: ${defaultValue})` : undefined,
					required: !isOptional,
				});
			});
		}

		const filteredProps = Array.from(propsMap.values()).filter((prop) => !isGenericProp(prop.name));

		results.push({
			component: `<${componentName} />`,
			props: filteredProps,
		});
	});

	return results;
}

function extractComponentPropsJS(
	filePath: string,
	componentNames: string[],
): ComponentPropsEntry[] {
	const fullPath = join(rootDir, filePath);

	if (!existsSync(fullPath)) {
		return [];
	}

	const content = readFileSync(fullPath, "utf-8");
	const results: ComponentPropsEntry[] = [];

	componentNames.forEach((componentName) => {
		const functionStartRegex = new RegExp(
			`(?:export\\s+)?function\\s+${componentName}\\s*\\(`,
			"s",
		);
		const startMatch = content.match(functionStartRegex);

		if (!startMatch || startMatch.index === undefined) {
			return;
		}

		const startPos = startMatch.index + startMatch[0].length;
		let paramsText = "";
		let depth = 0;
		let inString = false;
		let stringChar = "";
		let i = startPos;

		while (i < content.length) {
			const char = content[i];
			const prevChar = i > 0 ? content[i - 1] : "";

			if ((char === '"' || char === "'") && prevChar !== "\\") {
				if (!inString) {
					inString = true;
					stringChar = char;
				} else if (char === stringChar) {
					inString = false;
					stringChar = "";
				}
			}

			if (inString) {
				paramsText += char;
				i++;
				continue;
			}

			paramsText += char;

			if (char === "(") {
				depth++;
			} else if (char === ")") {
				depth--;
				if (depth < 0) {
					break;
				}
			}

			i++;
		}

		paramsText = paramsText.trim();
		const props: ExtractedProp[] = [];

		if (paramsText === "props" || paramsText.startsWith("...")) {
			return;
		}

		let paramsContent = "";
		if (paramsText.startsWith("{")) {
			let braceDepth = 0;
			let inStr = false;
			let strChar = "";
			let startFound = false;

			for (let j = 0; j < paramsText.length; j++) {
				const char = paramsText[j];
				const prev = j > 0 ? paramsText[j - 1] : "";

				if ((char === '"' || char === "'") && prev !== "\\") {
					if (!inStr) {
						inStr = true;
						strChar = char;
					} else if (char === strChar) {
						inStr = false;
						strChar = "";
					}
				}

				if (!inStr) {
					if (char === "{") {
						braceDepth++;
						if (braceDepth === 1) {
							startFound = true;
							continue;
						}
					}
					if (char === "}") {
						braceDepth--;
						if (braceDepth === 0 && startFound) {
							break;
						}
					}
				}

				if (startFound && braceDepth > 0) {
					paramsContent += char;
				}
			}
		}

		if (paramsContent) {
			const params: string[] = [];
			let currentParam = "";
			let braceDepth = 0;
			let parenDepth = 0;
			let inStr = false;
			let strChar = "";

			for (let j = 0; j < paramsContent.length; j++) {
				const char = paramsContent[j];
				const prevChar = j > 0 ? paramsContent[j - 1] : "";

				if ((char === '"' || char === "'") && prevChar !== "\\") {
					if (!inStr) {
						inStr = true;
						strChar = char;
					} else if (char === strChar) {
						inStr = false;
						strChar = "";
					}
				}

				if (!inStr) {
					if (char === "{") braceDepth++;
					if (char === "}") braceDepth--;
					if (char === "(") parenDepth++;
					if (char === ")") parenDepth--;
					if (char === "," && braceDepth === 0 && parenDepth === 0) {
						params.push(currentParam.trim());
						currentParam = "";
						continue;
					}
				}

				currentParam += char;
			}
			if (currentParam.trim()) {
				params.push(currentParam.trim());
			}

			params
				.filter((p) => p && !p.startsWith("..."))
				.forEach((param) => {
					const trimmedParam = param.trim();
					let equalsIndex = -1;
					let inStr = false;
					let strChar = "";

					for (let j = 0; j < trimmedParam.length; j++) {
						const c = trimmedParam[j];
						const prev = j > 0 ? trimmedParam[j - 1] : "";

						if ((c === '"' || c === "'") && prev !== "\\") {
							if (!inStr) {
								inStr = true;
								strChar = c;
							} else if (c === strChar) {
								inStr = false;
								strChar = "";
							}
						}

						if (!inStr && c === "=" && equalsIndex === -1) {
							equalsIndex = j;
							break;
						}
					}

					let name: string;
					let defaultValue: string | undefined;
					if (equalsIndex > 0) {
						name = trimmedParam.substring(0, equalsIndex).trim();
						if (name.startsWith("{")) {
							name = name.substring(1).trim();
						}
						name = name.replace(/\}+$/, "").trim();
						const defaultValueText = trimmedParam.substring(equalsIndex + 1).trim();
						defaultValue = defaultValueText;
					} else {
						name = trimmedParam;
						defaultValue = undefined;
					}

					name = name.split(/\s+/)[0].split(":")[0].trim();
					name = name.replace(/^\{+/, "").replace(/\}+$/, "").trim();

					if (isGenericProp(name)) {
						return;
					}

					const cleanDefaultValue = cleanDefaultValueText(defaultValue);
					let type = inferTypeFromDefault(defaultValue);
					if (type === "unknown") {
						type = "any";
					}

					props.push({
						name,
						type,
						defaultValue: cleanDefaultValue ? `(default: ${cleanDefaultValue})` : undefined,
						required: !cleanDefaultValue,
					});
				});
		}

		const filteredProps = props.filter((prop) => !isGenericProp(prop.name));
		results.push({
			component: `<${componentName} />`,
			props: filteredProps,
		});
	});

	return results;
}

function getExportedComponents(filePath: string): string[] {
	const fullPath = join(rootDir, filePath);

	if (!existsSync(fullPath)) {
		return [];
	}

	const content = readFileSync(fullPath, "utf-8");
	const components: string[] = [];

	const exportRegex = /export\s+(?:function\s+(\w+)|const\s+(\w+)\s*=|{\s*([^}]+)\s*})/g;
	let match: RegExpExecArray | null;

	const namedExportMatch = content.match(/export\s*{\s*([^}]+)\s*}/);
	if (namedExportMatch) {
		const exports = namedExportMatch[1]
			.split(",")
			.map((e) => e.trim().split(/\s+as\s+/)[0])
			.filter((e) => e && !e.startsWith("type") && !e.startsWith("interface"));
		components.push(...exports);
	}

	while ((match = exportRegex.exec(content)) !== null) {
		if (match[1]) components.push(match[1]);
		if (match[2]) components.push(match[2]);
	}

	return [...new Set(components.filter((c) => /^[A-Z]/.test(c)))];
}

function generatePropsForComponent(
	componentName: string,
	componentPath: string,
	componentNames: string[],
): void {
	const propsData =
		componentPath.endsWith(".tsx") || componentPath.endsWith(".ts")
			? extractComponentPropsTS(componentPath, componentNames)
			: extractComponentPropsJS(componentPath, componentNames);

	const baseUIImports = getBaseUIImports(componentPath);
	const baseUIProps = baseUIImports.flatMap(({ moduleSpecifier, exportedName }) =>
		extractBaseUIProps(moduleSpecifier, exportedName),
	);

	let mergedResults = propsData.map((item) => ({
		...item,
		props: mergeProps(item.props, baseUIProps).filter((prop) => !isGenericProp(prop.name)),
	}));

	if (mergedResults.length === 0 && baseUIProps.length > 0) {
		mergedResults = [
			{
				component: `<${componentNames[0] || componentName} />`,
				props: mergeProps([], baseUIProps).filter((prop) => !isGenericProp(prop.name)),
			},
		];
	}

	if (mergedResults.length === 0) {
		return;
	}

	const fullSourcePath = join(rootDir, componentPath);
	const sourceDir = dirname(fullSourcePath);
	const sourceFileName = (componentPath.split("/").pop() ?? componentName).replace(
		/\.(jsx|tsx|js|ts)$/,
		"",
	);

	const relativePath = relative(join(rootDir, "registry", "optics"), sourceDir);
	const distDir = join(rootDir, "registry", "optics", "dist", relativePath);
	if (!existsSync(distDir)) {
		mkdirSync(distDir, { recursive: true });
	}

	const outputPath = join(distDir, `${sourceFileName}.json`);

	const finalResults = mergedResults.reduce<ComponentPropsEntry[]>((acc, item) => {
		const filteredProps = item.props.filter((prop) => !isGenericProp(prop.name));

		if (filteredProps.length > 0) {
			acc.push({
				component: item.component,
				props: filteredProps,
			});
		}

		return acc;
	}, []);

	writeFileSync(outputPath, JSON.stringify(finalResults, null, 2), "utf-8");
	console.log(`[props] Generated ${outputPath}`);
}

function getAllSourceFiles(dir: string, fileList: string[] = []): string[] {
	const files = readdirSync(dir, { withFileTypes: true });

	files.forEach((file) => {
		const filePath = join(dir, file.name);

		if (file.isDirectory()) {
			if (!file.name.startsWith(".") && file.name !== "node_modules" && file.name !== "dist") {
				getAllSourceFiles(filePath, fileList);
			}
		} else if (file.isFile()) {
			if (
				/\.(jsx|js|tsx|ts)$/.test(file.name) &&
				!file.name.endsWith(".txt") &&
				!file.name.endsWith(".json")
			) {
				fileList.push(filePath);
			}
		}
	});

	return fileList;
}

function scanAndExtractAllComponents(): void {
	const registryDir = join(rootDir, "registry", "optics");

	if (!existsSync(registryDir)) {
		console.warn(`[props] Registry directory not found: ${registryDir}`);
		return;
	}

	const sourceFiles = getAllSourceFiles(registryDir);
	let generatedCount = 0;
	let skippedCount = 0;

	sourceFiles.forEach((fullPath) => {
		const relativePath = relative(rootDir, fullPath);
		const componentsToExtract = getExportedComponents(relativePath);

		if (componentsToExtract.length === 0) {
			skippedCount++;
			return;
		}

		const fileName = relativePath.replace("registry/optics/", "").replace(/\.(jsx|js|tsx|ts)$/, "");

		try {
			generatePropsForComponent(fileName, relativePath, componentsToExtract);
			generatedCount++;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			console.error(`[props] Error processing ${relativePath}:`, message);
		}
	});

	console.log("\n[props] Extraction complete");
	console.log(`   Generated: ${generatedCount} file(s)`);
	if (skippedCount > 0) {
		console.log(`   Skipped: ${skippedCount} file(s) (no components exported)`);
	}
}

scanAndExtractAllComponents();
