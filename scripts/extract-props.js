#!/usr/bin/env node
/**
 * Script para extraer props de componentes React TypeScript/JavaScript
 * Genera archivos JSON con información de props para PropsTable
 * Compatible con Turborepo (inputs/outputs definidos)
 * Ejecuta: bun scripts/extract-props.js
 */

import { Project } from "ts-morph";
import {
	readFileSync,
	writeFileSync,
	existsSync,
	mkdirSync,
	readdirSync,
} from "fs";
import { join, dirname, relative, sep as pathSeparator } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const require = createRequire(import.meta.url);

const genericPropNames = new Set([
	"className", // Siempre excluir className
	"children",
	"style",
	"id",
	"title",
	"role",
	"tabIndex",
	"ref",
	"key",
	// React / DOM defaults
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

function isGenericProp(name = "") {
	if (!name) return false;
	if (genericPropNames.has(name)) return true;
	if (name.startsWith("aria-") || name.startsWith("data-")) return true;
	return false;
}

const project = new Project({
	tsConfigFilePath: join(rootDir, "tsconfig.json"),
});

const baseUISourceCache = new Map();
const baseUIPropsCache = new Map();
const baseUIPackageJsonPath = require.resolve("@base-ui/react/package.json", {
	paths: [rootDir],
});
const baseUIPackage = JSON.parse(readFileSync(baseUIPackageJsonPath, "utf-8"));
const baseUIDir = dirname(baseUIPackageJsonPath);

function simplifyType(type) {
	if (!type || type === "unknown") return "unknown";

	// Remover undefined y null del tipo
	let simplified = type
		.replace(/\s*\|\s*undefined/g, "")
		.replace(/\s*\|\s*null/g, "")
		.replace(/\s*undefined\s*\|\s*/g, "")
		.replace(/\s*null\s*\|\s*/g, "")
		.replace(/\s+/g, " ")
		.trim();

	// Si quedó vacío o solo espacios, mantener el original pero limpio
	if (!simplified) {
		simplified = type.replace(/\s+/g, " ").trim();
	}

	return simplified;
}

function validateTypeSyntax(type) {
	if (!type) return false;

	// Contar paréntesis, llaves y corchetes
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

	// Si hay desbalance, intentar corregir
	if (parens < 0) {
		// Paréntesis extra al final, removerlos
		type = type.replace(/\)+$/, "");
		parens = 0;
	}

	return parens === 0 && braces === 0 && brackets === 0;
}

function shortenLongType(type) {
	if (!type) return type;

	// Validar sintaxis primero
	if (!validateTypeSyntax(type)) {
		// Si tiene paréntesis extra, removerlos
		type = type.replace(/\)+$/, "");
		// Si está incompleto, intentar completarlo o simplificar
		if (type.includes("(() => Element") && !type.includes(")")) {
			return "() => Element";
		}
		if (
			type.includes("SelectValueType<Value, Multiple>") &&
			!type.includes(")")
		) {
			return "(value: SelectValueType) => void";
		}
	}

	// Simplificar React.ReactElement muy complejo (SIEMPRE, sin importar longitud)
	if (type.includes("React.ReactElement<unknown")) {
		return "React.ReactElement";
	}

	// Simplificar RefObject complejo - cualquier variación (SIEMPRE)
	// Detectar el patrón completo y simplificarlo
	if (
		type.includes("HTMLElement") &&
		type.includes("ShadowRoot") &&
		type.includes("RefObject")
	) {
		// Simplificar a solo lo esencial
		return "HTMLElement | RefObject<HTMLElement>";
	}

	// También simplificar si solo tiene RefObject complejo
	if (type.includes("RefObject<HTMLElement | ShadowRoot>")) {
		return "RefObject<HTMLElement>";
	}

	// Simplificar cualquier tipo que contenga el patrón completo de container
	if (type.includes("HTMLElement | ShadowRoot | React.RefObject")) {
		return "HTMLElement | RefObject<HTMLElement>";
	}

	// Si el tipo es corto y ya está simplificado, retornar
	if (type.length < 70) return type;

	// Simplificar tipos con boolean | void | HTMLElement) mal formateado
	if (type.includes("boolean | void | HTMLElement)")) {
		return "boolean | HTMLElement";
	}

	// Si es un tipo de función muy largo, simplificarlo
	if (type.includes("=>")) {
		// Si el tipo está truncado (termina con ...), simplificar completamente
		if (type.endsWith("...")) {
			// Extraer el tipo de retorno si es posible
			const returnMatch = type.match(/=>\s*(\w+)/);
			const returnType = returnMatch ? returnMatch[1] : "void";
			return `(...args) => ${returnType}`;
		}

		const match = type.match(/\(([^)]*)\)\s*=>\s*(\w+)/);
		if (match) {
			const params = match[1];
			const returnType = match[2];
			// Si los parámetros son muy largos o el tipo completo es largo, simplificar
			if (params.length > 30 || type.length > 60) {
				return `(...args) => ${returnType}`;
			}
			return `(${params}) => ${returnType}`;
		}
		// Si no matchea bien, simplificar
		const simpleMatch = type.match(/(\([^)]*\))\s*=>\s*(\w+)/);
		if (simpleMatch) {
			return `${simpleMatch[1]} => ${simpleMatch[2]}`;
		}
		// Si no matchea nada pero tiene =>, simplificar completamente
		if (type.includes("=>")) {
			const returnMatch = type.match(/=>\s*(\w+)/);
			const returnType = returnMatch ? returnMatch[1] : "void";
			return `(...args) => ${returnType}`;
		}
	}

	// Simplificar Record/readonly complejos
	if (type.includes("Record<") && type.includes("readonly")) {
		return "Array<{label, value}> | Record<string, ReactNode>";
	}

	// Si es un union type muy largo, simplificar
	if (type.includes("|")) {
		const parts = type.split("|").map((p) => p.trim());
		// Filtrar y simplificar partes
		const relevantParts = parts
			.filter((p) => {
				return (
					!p.includes("node_modules") && !p.includes("import(") && p.length < 60
				);
			})
			.map((p) => {
				// Simplificar partes complejas
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
			.slice(0, 3); // Máximo 3 tipos

		if (relevantParts.length > 0) {
			return relevantParts.join(" | ");
		}
		// Si no hay partes relevantes, usar el primer tipo simple
		const firstSimple = parts.find((p) => p.length < 40 && !p.includes("<"));
		if (firstSimple) return firstSimple;
	}

	// Simplificar tipos con & (intersection types)
	if (type.includes("&") && type.length > 70) {
		// Para intersection types, simplificar a solo el tipo principal
		const parts = type.split("&").map((p) => p.trim());
		// Buscar el tipo más simple y relevante
		const simplePart =
			parts.find(
				(p) =>
					!p.includes("ComponentProps") &&
					!p.includes("Primitive") &&
					p.length < 50,
			) || parts[0];

		if (simplePart && simplePart.length < 60) {
			return simplePart + " & ...";
		}
		// Si no hay parte simple, truncar la primera
		const firstPart = parts[0].trim();
		if (firstPart.length > 60) {
			return firstPart.substring(0, 57) + "...";
		}
		return firstPart + " & ...";
	}

	// Si es muy largo y no es union, truncar inteligentemente
	if (type.length > 70) {
		// Para funciones, simplificar parámetros largos
		if (type.includes("=>")) {
			const funcMatch = type.match(/(\([^)]*\))\s*=>\s*(\w+)/);
			if (funcMatch && funcMatch[1].length > 40) {
				// Si los parámetros son muy largos, simplificar
				return `(...args) => ${funcMatch[2] || "void"}`;
			}
		}

		// Intentar truncar en un punto lógico
		const truncatePoints = [",", "|", "&", " "];
		for (const point of truncatePoints) {
			const index = type.lastIndexOf(point, 60);
			if (index > 20) {
				return type.substring(0, index) + "...";
			}
		}
		return type.substring(0, 60) + "...";
	}

	return type;
}

function formatType(type) {
	if (!type) return "unknown";

	let formatted = type.replace(/\s+/g, " ").replace(/\n/g, " ").trim();

	// Limpiar tipos complejos
	formatted = formatted.replace(/\s*&\s*/g, " & ");
	formatted = formatted.replace(/\s*\|\s*/g, " | ");

	// Simplificar (remover undefined/null)
	formatted = simplifyType(formatted);

	// Validar y corregir sintaxis
	if (!validateTypeSyntax(formatted)) {
		// Intentar corregir problemas comunes
		formatted = formatted.replace(/\)+$/, ""); // Remover paréntesis extra al final
	}

	// Acortar tipos muy largos
	formatted = shortenLongType(formatted);

	// Validar final
	if (!validateTypeSyntax(formatted) && formatted.length > 50) {
		// Si sigue siendo inválido y largo, simplificar más
		formatted = formatted.split("|")[0].split("&")[0].trim();
		if (formatted.length > 60) {
			formatted = formatted.substring(0, 57) + "...";
		}
	}

	return formatted;
}

function extractDefaultValue(param) {
	const initializer = param.getInitializer();
	if (!initializer) return undefined;

	const text = initializer.getText();

	// Extraer valores por defecto
	if (text === "true" || text === "false") return text;
	if (text.startsWith('"') || text.startsWith("'")) {
		return text.slice(1, -1);
	}
	if (/^\d+$/.test(text)) return text;
	if (text.startsWith("{") && text.includes("type:")) {
		// Objeto con type (ej: { type: "spring", stiffness: 150 })
		return text;
	}

	return text;
}

function resolveBaseUITypesPath(moduleSpecifier) {
	const subpath = moduleSpecifier.replace("@base-ui/react", ".");
	const exportEntry = baseUIPackage.exports?.[subpath];
	const typePath =
		exportEntry?.default?.types ||
		exportEntry?.require?.types ||
		(subpath === "." ? baseUIPackage.types : undefined);

	if (!typePath) return undefined;

	return join(baseUIDir, typePath);
}

function extractInterfaceProps(sourceFile, interfaceName) {
	const iface = sourceFile.getInterface(interfaceName);
	if (!iface) return [];

	return extractPropsFromType(iface.getType());
}

function isFromBaseUIDeclaration(declaration) {
	if (!declaration) return false;
	const filePath = declaration.getSourceFile().getFilePath();
	return filePath.includes(`${pathSeparator}@base-ui${pathSeparator}react`);
}

function isReactDefaultPropDeclaration(declaration) {
	if (!declaration) return false;
	const filePath = declaration.getSourceFile().getFilePath();
	return filePath.includes(`${pathSeparator}@types${pathSeparator}react`);
}

function hasFilePathInType(typeText = "") {
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

function isFromComponentOrBaseUI(declaration, onlyBaseUI = false) {
	if (!declaration) return false;
	const filePath = declaration.getSourceFile().getFilePath();

	// Si es de base-ui, siempre incluirlo
	if (filePath.includes(`${pathSeparator}@base-ui${pathSeparator}react`)) {
		return true;
	}

	// Si solo queremos base-ui, no incluir otros
	if (onlyBaseUI) {
		return false;
	}

	// Si es del proyecto (registry/optics), incluirlo
	if (filePath.includes(`${pathSeparator}registry${pathSeparator}optics`)) {
		return true;
	}

	// Excluir tipos de React, DOM, node_modules genéricos
	if (
		filePath.includes(`${pathSeparator}@types${pathSeparator}react`) ||
		filePath.includes(`${pathSeparator}node_modules${pathSeparator}@types`) ||
		filePath.includes(`${pathSeparator}lib${pathSeparator}dom`) ||
		filePath.includes(`${pathSeparator}lib${pathSeparator}es`)
	) {
		return false;
	}

	// Por defecto, si no podemos determinar, excluir para ser conservador
	return false;
}

function extractPropsFromType(type, { onlyBaseUI = false } = {}) {
	return type.getProperties().reduce((acc, symbol) => {
		const name = symbol.getName();

		// Filtrar nombres que son destructuring completo
		// Normalizar saltos de línea (tanto \n reales como literales \\n)
		const cleanName = name
			.replace(/\\n/g, " ")
			.replace(/\n/g, " ")
			.replace(/\s+/g, " ")
			.trim();

		// Detectar destructuring completo de varias formas
		if (
			cleanName.includes("{") ||
			cleanName.includes("}") ||
			cleanName.includes("...") ||
			cleanName.startsWith("{") ||
			/^\{\s*className/.test(cleanName) || // Empieza con { className
			(cleanName.includes("className") &&
				(cleanName.includes("props") || cleanName.includes("render"))) ||
			cleanName.length > 50 // Nombres muy largos probablemente son destructuring
		) {
			return acc;
		}

		if (isGenericProp(name)) return acc;

		const declaration = symbol.getDeclarations()?.[0];

		// Filtrar props que no son del componente ni de base-ui
		if (
			!isFromComponentOrBaseUI(declaration, onlyBaseUI) &&
			!symbol
				.getDeclarations()
				?.some((dec) => isFromComponentOrBaseUI(dec, onlyBaseUI))
		) {
			return acc;
		}

		if (isReactDefaultPropDeclaration(declaration)) {
			return acc;
		}

		let typeText = declaration
			? formatType(symbol.getTypeAtLocation(declaration).getText())
			: "unknown";

		// Si el tipo tiene rutas, no incluirlo
		if (hasFilePathInType(typeText)) {
			return acc;
		}

		// Validar y corregir tipos incompletos
		if (
			typeText.includes("SelectValueType<Value, Multiple>") &&
			!typeText.includes(")")
		) {
			typeText = "(value: SelectValueType) => void";
		}
		if (typeText.includes("(() => Element") && !typeText.includes(")")) {
			typeText = "() => Element";
		}

		// Ocultar tipos con rutas absolutas de node_modules para mantener legible
		let cleanedTypeText = typeText.includes("node_modules/@base-ui/react")
			? "—"
			: typeText;

		// Expandir tipos genéricos comunes sin contexto
		if (cleanedTypeText === "Payload") {
			cleanedTypeText = "object";
		} else if (cleanedTypeText === "ReactNode") {
			cleanedTypeText = "React.ReactNode";
		} else if (
			cleanedTypeText.endsWith("Props") &&
			cleanedTypeText.length < 30
		) {
			// Tipos como PaginationLinkProps - simplificar a object si es muy genérico
			if (cleanedTypeText.includes("Link")) {
				cleanedTypeText = "object";
			} else {
				cleanedTypeText = cleanedTypeText;
			}
		}

		let description = undefined;
		try {
			const jsDocs = symbol.getJsDocs?.() || [];
			if (jsDocs.length > 0) {
				description = jsDocs[0].getComment()?.toString().trim();
			} else {
				const tags = symbol.getJsDocTags?.() || [];
				const first = tags[0];
				description = first?.getComment?.()?.toString().trim();
			}
		} catch (e) {
			// Ignore docs extraction errors
		}

		// Verificar nuevamente antes de agregar (por si el nombre cambió)
		const finalCleanName = name
			.replace(/\\n/g, " ")
			.replace(/\n/g, " ")
			.replace(/\s+/g, " ")
			.trim();

		if (
			finalCleanName.includes("{") ||
			finalCleanName.includes("}") ||
			finalCleanName.includes("...") ||
			finalCleanName.startsWith("{") ||
			/^\{\s*className/.test(finalCleanName) ||
			(finalCleanName.includes("className") &&
				(finalCleanName.includes("props") ||
					finalCleanName.includes("render"))) ||
			finalCleanName.length > 50
		) {
			return acc;
		}

		acc.push({
			name,
			type: cleanedTypeText || "",
			required: !symbol.isOptional(),
			description: description || undefined,
		});

		return acc;
	}, []);
}

function extractBaseUIProps(moduleSpecifier, exportedName) {
	const cacheKey = `${moduleSpecifier}::${exportedName}`;
	if (baseUIPropsCache.has(cacheKey)) return baseUIPropsCache.get(cacheKey);

	const typesPath = resolveBaseUITypesPath(moduleSpecifier);
	if (!typesPath || !existsSync(typesPath)) {
		baseUIPropsCache.set(cacheKey, []);
		return [];
	}

	const sourceFile =
		baseUISourceCache.get(typesPath) || project.addSourceFileAtPath(typesPath);
	baseUISourceCache.set(typesPath, sourceFile);

	const exported = sourceFile.getExportedDeclarations();
	const props = [];

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

function getBaseUIImports(relativePath) {
	const fullPath = join(rootDir, relativePath);
	if (!existsSync(fullPath)) return [];

	const content = readFileSync(fullPath, "utf-8");
	const imports = [];
	const importRegex =
		/import\s+{([^}]+)}\s+from\s+["'](@base-ui\/react[^"']*)["']/g;
	let match;

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

function mergeProps(localProps = [], externalProps = []) {
	const merged = new Map();

	// Filtrar props locales que sean válidas (no unknown, no genéricas)
	localProps.forEach((prop) => {
		// Filtrar nombres que son destructuring completo
		const cleanName = prop.name
			.replace(/\s+/g, " ")
			.replace(/\\n/g, " ")
			.trim();
		if (
			cleanName.includes("{") ||
			cleanName.includes("}") ||
			cleanName.includes("...") ||
			(cleanName.includes("className") &&
				(cleanName.includes("props") || cleanName.includes("render"))) ||
			cleanName.startsWith("{") ||
			cleanName.match(/^\{\s*className/)
		) {
			return;
		}

		// Incluir props con tipo "any" también (pueden ser válidas en JS)
		if (prop.type && prop.type !== "unknown" && !isGenericProp(prop.name)) {
			merged.set(prop.name, prop);
		}
	});

	// Agregar props externas (base-ui) solo si no existen ya
	externalProps.forEach((prop) => {
		// Filtrar props genéricas también en las externas
		if (
			!merged.has(prop.name) &&
			prop.type &&
			prop.type !== "unknown" &&
			!isGenericProp(prop.name)
		) {
			merged.set(prop.name, prop);
		}
	});

	return Array.from(merged.values());
}

function extractComponentPropsTS(filePath, componentNames) {
	const fullPath = join(rootDir, filePath);

	if (!existsSync(fullPath)) {
		console.warn(`File not found: ${fullPath}`);
		return [];
	}

	const sourceFile = project.getSourceFile(fullPath);
	if (!sourceFile) {
		return [];
	}

	const results = [];

	componentNames.forEach((componentName) => {
		const component = sourceFile.getFunction(componentName);
		if (!component) {
			return;
		}

		const props = [];
		const parameters = component.getParameters();

		parameters.forEach((param) => {
			const name = param.getName();

			// Saltar props que son spread (...props)
			if (param.hasDotDotDotToken()) {
				return;
			}

			if (name === "props") {
				const initializerText = param
					.getInitializer()
					?.getText()
					.replace(/\s+/g, "");
				if (initializerText === "{}") {
					return;
				}
			}

			// Filtrar nombres que son destructuring completo (puede estar en múltiples líneas)
			const cleanName = name.replace(/\s+/g, " ").replace(/\\n/g, " ").trim();
			if (
				cleanName.includes("{") ||
				cleanName.includes("}") ||
				cleanName.includes("...") ||
				(cleanName.includes("className") &&
					(cleanName.includes("props") || cleanName.includes("render"))) ||
				cleanName.startsWith("{") ||
				cleanName.match(/^\{\s*className/)
			) {
				return;
			}

			if (isGenericProp(name)) {
				return;
			}

			const typeNode = param.getTypeNode();
			let type = "unknown";

			if (typeNode) {
				type = formatType(typeNode.getText());
			} else {
				// Intentar inferir del tipo de la función
				const paramType = param.getType();
				if (paramType) {
					type = formatType(paramType.getText());
				}
			}

			// Si el tipo tiene rutas, no incluirlo
			if (hasFilePathInType(type)) {
				return;
			}

			// Si el tipo es unknown, intentar inferirlo mejor
			if (type === "unknown") {
				// No excluir, dejar que se intente inferir más adelante
			}

			// Verificar que la declaración sea del componente o base-ui
			const paramSymbol = param.getSymbol();
			if (paramSymbol) {
				const declarations = paramSymbol.getDeclarations();
				if (
					declarations &&
					declarations.length > 0 &&
					!declarations.some((dec) => isFromComponentOrBaseUI(dec, false))
				) {
					// Si no es del componente ni de base-ui, verificar si es de React
					const isReactProp = declarations.some((dec) =>
						isReactDefaultPropDeclaration(dec),
					);
					if (isReactProp) {
						return;
					}
				}
			}

			const defaultValue = extractDefaultValue(param);
			const isOptional = param.hasQuestionToken() || defaultValue !== undefined;

			// Extraer descripción de JSDoc si existe
			// Los parámetros no tienen JSDoc directo, se obtiene del símbolo
			let description = undefined;
			try {
				const symbol = param.getSymbol();
				if (symbol) {
					const jsDoc = symbol
						.getJsDocTags()
						.find((tag) => tag.getName() === "param");
					if (jsDoc) {
						description = jsDoc.getComment()?.toString().trim();
					}
				}
			} catch (e) {
				// Ignorar errores al obtener JSDoc
			}

			props.push({
				name,
				type: type || "unknown",
				defaultValue: defaultValue ? `(default: ${defaultValue})` : undefined,
				required: !isOptional && !defaultValue,
				description: description || undefined,
			});
		});

		// Filtrar props genéricas antes de agregar al resultado
		const filteredProps = props.filter((prop) => !isGenericProp(prop.name));

		// Siempre agregar el componente si lo encontramos, incluso si no tiene props
		results.push({
			component: `<${componentName} />`,
			props: filteredProps,
		});
	});

	return results;
}

function extractComponentPropsJS(filePath, componentNames) {
	const fullPath = join(rootDir, filePath);

	if (!existsSync(fullPath)) {
		return [];
	}

	const content = readFileSync(fullPath, "utf-8");
	const results = [];

	componentNames.forEach((componentName) => {
		// Buscar la función del componente usando un parser más robusto
		// Primero encontrar el inicio de la función
		const functionStartRegex = new RegExp(
			`(?:export\\s+)?function\\s+${componentName}\\s*\\(`,
			"s",
		);
		const startMatch = content.match(functionStartRegex);

		if (!startMatch) {
			return;
		}

		// Encontrar la posición del inicio de los parámetros
		const startPos = startMatch.index + startMatch[0].length;

		// Parsear los parámetros manualmente, respetando strings y paréntesis anidados
		let paramsText = "";
		let depth = 0;
		let inString = false;
		let stringChar = "";
		let i = startPos;

		while (i < content.length) {
			const char = content[i];
			const prevChar = i > 0 ? content[i - 1] : "";

			// Manejar strings PRIMERO - esto es crítico
			if ((char === '"' || char === "'") && prevChar !== "\\") {
				if (!inString) {
					inString = true;
					stringChar = char;
				} else if (char === stringChar) {
					inString = false;
					stringChar = "";
				}
			}

			// Si estamos dentro de un string, agregar el carácter sin procesar
			if (inString) {
				paramsText += char;
				i++;
				continue;
			}

			// Agregar el carácter solo si no estamos en un string
			paramsText += char;

			// Contar paréntesis solo fuera de strings
			if (char === "(") {
				depth++;
			} else if (char === ")") {
				depth--;
				if (depth < 0) {
					// Encontramos el cierre de los parámetros
					break;
				}
			}

			i++;
		}

		paramsText = paramsText.trim();
		const props = [];

		// Si solo tiene "props" sin destructuring, no podemos extraer información
		if (paramsText === "props" || paramsText.startsWith("...")) {
			return;
		}

		// Extraer parámetros con destructuring - parsear manualmente para respetar strings
		let paramsContent = "";
		if (paramsText.startsWith("{")) {
			let braceDepth = 0;
			let inStr = false;
			let strChar = "";
			let startFound = false;

			for (let i = 0; i < paramsText.length; i++) {
				const char = paramsText[i];
				const prev = i > 0 ? paramsText[i - 1] : "";

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
							continue; // No incluir la llave de apertura
						}
					}
					if (char === "}") {
						braceDepth--;
						if (braceDepth === 0 && startFound) {
							break; // Encontramos el cierre
						}
					}
				}

				if (startFound && braceDepth > 0) {
					paramsContent += char;
				}
			}
		}

		if (paramsContent) {
			// Dividir por comas, pero respetar objetos anidados, strings, y paréntesis
			const params = [];
			let currentParam = "";
			let depth = 0;
			let parenDepth = 0;
			let inString = false;
			let stringChar = "";

			for (let i = 0; i < paramsContent.length; i++) {
				const char = paramsContent[i];
				const prevChar = i > 0 ? paramsContent[i - 1] : "";

				if ((char === '"' || char === "'") && prevChar !== "\\") {
					if (!inString) {
						inString = true;
						stringChar = char;
					} else if (char === stringChar) {
						inString = false;
						stringChar = "";
					}
				}

				if (!inString) {
					if (char === "{") depth++;
					if (char === "}") depth--;
					if (char === "(") parenDepth++;
					if (char === ")") parenDepth--;
					if (char === "," && depth === 0 && parenDepth === 0) {
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
					// Extraer nombre y valor por defecto
					// Manejar casos como: name = value, name, name: alias
					// Mejorar regex para capturar correctamente el nombre antes del =
					const trimmedParam = param.trim();

					// Buscar el primer = que no esté dentro de un string
					let equalsIndex = -1;
					let inStr = false;
					let strChar = "";

					for (let i = 0; i < trimmedParam.length; i++) {
						const c = trimmedParam[i];
						const prev = i > 0 ? trimmedParam[i - 1] : "";

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
							equalsIndex = i;
							break;
						}
					}

					let name, defaultValue;
					if (equalsIndex > 0) {
						name = trimmedParam.substring(0, equalsIndex).trim();
						// Remover llaves de apertura si el nombre empieza con {
						if (name.startsWith("{")) {
							name = name.substring(1).trim();
						}
						// Remover llaves de cierre si quedan
						name = name.replace(/\}+$/, "").trim();
						// Capturar el valor por defecto completo, respetando strings
						let defaultValueText = trimmedParam
							.substring(equalsIndex + 1)
							.trim();

						// Si el valor por defecto es un string, asegurarse de capturarlo completo
						if (
							defaultValueText.startsWith('"') ||
							defaultValueText.startsWith("'")
						) {
							const quoteChar = defaultValueText[0];
							// Buscar el cierre del string, respetando escapes
							let stringEnd = -1;

							for (let j = 1; j < defaultValueText.length; j++) {
								const char = defaultValueText[j];
								const prevChar = j > 0 ? defaultValueText[j - 1] : "";

								// Si encontramos la comilla de cierre y no está escapada
								if (char === quoteChar && prevChar !== "\\") {
									stringEnd = j;
									break;
								}
							}

							if (stringEnd > 0) {
								// Capturar el string completo incluyendo las comillas
								defaultValue = defaultValueText.substring(0, stringEnd + 1);
							} else {
								// String incompleto (puede ser que se cortó en el parsing anterior)
								// Intentar encontrar el cierre en el resto del texto
								defaultValue = defaultValueText;
							}
						} else {
							defaultValue = defaultValueText;
						}
					} else {
						name = trimmedParam;
						defaultValue = undefined;
					}

					// Limpiar el nombre (remover espacios, alias, etc.)
					name = name.split(/\s+/)[0].split(":")[0].trim();

					// Remover llaves de apertura/cierre si quedan
					name = name.replace(/^\{+/, "").replace(/\}+$/, "").trim();

					// Filtrar props genéricas PRIMERO (className, children, etc.)
					if (isGenericProp(name)) {
						return;
					}

					// Filtrar nombres que son destructuring completo (no son props reales)
					const cleanName = name
						.replace(/\s+/g, " ")
						.replace(/\\n/g, " ")
						.trim();
					if (
						cleanName.includes("{") ||
						cleanName.includes("}") ||
						cleanName.includes("...") ||
						(cleanName.includes("className") &&
							(cleanName.includes("props") || cleanName.includes("render"))) ||
						cleanName.startsWith("{") ||
						cleanName.match(/^\{\s*className/)
					) {
						return;
					}

					// Limpiar el valor por defecto - extraer solo el valor básico
					let cleanDefaultValue = undefined;
					if (defaultValue) {
						// Manejar strings con funciones CSS complejas
						let stringValue = defaultValue;
						let inString = false;
						let stringChar = "";
						let stringStart = -1;

						// Encontrar el string completo (puede tener paréntesis dentro)
						for (let i = 0; i < defaultValue.length; i++) {
							const c = defaultValue[i];
							const prev = i > 0 ? defaultValue[i - 1] : "";

							if ((c === '"' || c === "'") && prev !== "\\") {
								if (!inString) {
									inString = true;
									stringChar = c;
									stringStart = i;
								} else if (c === stringChar) {
									// Encontramos el cierre del string
									stringValue = defaultValue.substring(stringStart + 1, i);
									break;
								}
							}
						}

						// Si es un string, extraer el contenido
						if (
							(defaultValue.startsWith('"') && defaultValue.endsWith('"')) ||
							(defaultValue.startsWith("'") && defaultValue.endsWith("'"))
						) {
							cleanDefaultValue = stringValue;
							// Si es muy largo, truncar
							if (cleanDefaultValue.length > 30) {
								cleanDefaultValue = cleanDefaultValue.substring(0, 27) + "...";
							}
						} else if (defaultValue === "true" || defaultValue === "false") {
							cleanDefaultValue = defaultValue;
						} else if (/^-?\d+$/.test(defaultValue)) {
							cleanDefaultValue = defaultValue;
						} else if (defaultValue === "null") {
							cleanDefaultValue = "null";
						} else if (defaultValue.startsWith("{")) {
							// Para objetos, solo mostrar que hay un objeto
							cleanDefaultValue = "{ ... }";
						} else {
							// Para otros casos complejos, truncar
							cleanDefaultValue =
								defaultValue.length > 30
									? defaultValue.substring(0, 27) + "..."
									: defaultValue;
						}
					}

					// Intentar inferir tipo básico del valor por defecto
					let type = "unknown";
					if (cleanDefaultValue) {
						if (cleanDefaultValue === "true" || cleanDefaultValue === "false") {
							type = "boolean";
						} else if (
							cleanDefaultValue.startsWith('"') ||
							cleanDefaultValue.startsWith("'") ||
							(defaultValue &&
								(defaultValue.startsWith('"') || defaultValue.startsWith("'")))
						) {
							type = "string";
						} else if (/^-?\d+$/.test(cleanDefaultValue)) {
							type = "number";
						} else if (
							cleanDefaultValue === "null" ||
							(defaultValue && defaultValue === "null")
						) {
							type = "ReactNode";
						} else if (
							cleanDefaultValue.startsWith("{") ||
							(defaultValue && defaultValue.startsWith("{"))
						) {
							type = "object";
						}
					}

					// Si no pudimos inferir el tipo, intentar usar ts-morph si está disponible
					if (type === "unknown") {
						// Intentar leer el archivo con ts-morph para obtener tipos
						try {
							const sourceFile = project.getSourceFile(fullPath);
							if (sourceFile) {
								const component = sourceFile.getFunction(componentName);
								if (component) {
									const params = component.getParameters();
									const param = params.find((p) => {
										const paramName = p.getName();
										// Puede ser un parámetro destructured
										return paramName === name || paramName === "props";
									});
									if (param) {
										const typeNode = param.getTypeNode();
										if (typeNode) {
											const inferredType = formatType(typeNode.getText());
											if (inferredType && inferredType !== "unknown") {
												type = inferredType;
											}
										} else {
											const paramType = param.getType();
											if (paramType) {
												const inferredType = formatType(paramType.getText());
												if (inferredType && inferredType !== "unknown") {
													type = inferredType;
												}
											}
										}
									}
								}
							}
						} catch (e) {
							// Ignorar errores
						}
					}

					// Si sigue siendo unknown pero tenemos un valor por defecto, inferir del valor
					if (type === "unknown" && cleanDefaultValue) {
						// Inferir del valor por defecto
						if (cleanDefaultValue === "true" || cleanDefaultValue === "false") {
							type = "boolean";
						} else if (
							typeof cleanDefaultValue === "string" &&
							cleanDefaultValue.length > 0
						) {
							type = "string";
						} else if (!isNaN(Number(cleanDefaultValue))) {
							type = "number";
						}
					}

					// Si sigue siendo unknown, intentar inferir del nombre de la prop
					if (type === "unknown") {
						// Algunas convenciones comunes
						if (name.toLowerCase().includes("color")) {
							type = "string";
						} else if (
							name.toLowerCase().includes("show") ||
							name.toLowerCase().includes("is")
						) {
							type = "boolean";
						} else if (
							name.toLowerCase().includes("count") ||
							name.toLowerCase().includes("size")
						) {
							type = "number";
						}
					}

					// Si aún es unknown, usar un tipo genérico pero incluirlo
					if (type === "unknown") {
						type = "any";
					}

					// Última verificación: filtrar props genéricas antes de agregar
					if (isGenericProp(name)) {
						return;
					}

					props.push({
						name,
						type,
						defaultValue: cleanDefaultValue
							? `(default: ${cleanDefaultValue})`
							: undefined,
						required: !cleanDefaultValue,
					});
				});
		} else {
			// Parámetros simples (sin destructuring)
			const params = paramsText
				.split(",")
				.map((p) => p.trim())
				.filter((p) => p && !p.startsWith("..."));

			params.forEach((param) => {
				if (/^props\s*=\s*\{\s*\}$/i.test(param)) {
					return;
				}

				if (isGenericProp(param)) {
					return;
				}

				props.push({
					name: param,
					type: "unknown",
					required: true,
				});
			});
		}

		// Filtrar props genéricas antes de agregar al resultado
		const filteredProps = props.filter((prop) => !isGenericProp(prop.name));

		// Siempre agregar el componente si lo encontramos, incluso si no tiene props
		results.push({
			component: `<${componentName} />`,
			props: filteredProps,
		});
	});

	return results;
}

function getExportedComponents(filePath) {
	const fullPath = join(rootDir, filePath);

	if (!existsSync(fullPath)) {
		return [];
	}

	const content = readFileSync(fullPath, "utf-8");
	const components = [];

	// Buscar export statements
	const exportRegex =
		/export\s+(?:function\s+(\w+)|const\s+(\w+)\s*=|{\s*([^}]+)\s*})/g;
	let match;

	// Buscar exports nombrados
	const namedExportMatch = content.match(/export\s*{\s*([^}]+)\s*}/);
	if (namedExportMatch) {
		const exports = namedExportMatch[1]
			.split(",")
			.map((e) => e.trim().split(/\s+as\s+/)[0])
			.filter((e) => e && !e.startsWith("type") && !e.startsWith("interface"));
		components.push(...exports);
	}

	// Buscar funciones exportadas directamente
	while ((match = exportRegex.exec(content)) !== null) {
		if (match[1]) components.push(match[1]);
		if (match[2]) components.push(match[2]);
	}

	// Filtrar componentes que empiezan con mayúscula (convención React)
	return [...new Set(components.filter((c) => /^[A-Z]/.test(c)))];
}

function generatePropsForComponent(
	componentName,
	componentPath,
	componentNames,
) {
	// Intentar extraer props según el tipo de archivo
	let propsData = [];
	if (componentPath.endsWith(".tsx") || componentPath.endsWith(".ts")) {
		propsData = extractComponentPropsTS(componentPath, componentNames);
	} else {
		propsData = extractComponentPropsJS(componentPath, componentNames);
	}

	const baseUIImports = getBaseUIImports(componentPath);
	const baseUIProps = baseUIImports.flatMap(
		({ moduleSpecifier, exportedName }) =>
			extractBaseUIProps(moduleSpecifier, exportedName),
	);

	let mergedResults = propsData.map((item) => ({
		...item,
		props: mergeProps(item.props, baseUIProps).filter(
			(prop) => !isGenericProp(prop.name),
		),
	}));

	if (mergedResults.length === 0 && baseUIProps.length > 0) {
		mergedResults = [
			{
				component: `<${componentNames[0] || componentName} />`,
				props: mergeProps([], baseUIProps).filter(
					(prop) => !isGenericProp(prop.name),
				),
			},
		];
	}

	if (mergedResults.length === 0) {
		return;
	}

	// Generar el JSON en registry/optics/dist manteniendo la estructura de directorios
	const fullSourcePath = join(rootDir, componentPath);
	const sourceDir = dirname(fullSourcePath);
	const sourceFileName = componentPath
		.split("/")
		.pop()
		.replace(/\.(jsx|tsx|js|ts)$/, "");

	// Obtener la ruta relativa desde registry/optics
	const relativePath = relative(join(rootDir, "registry", "optics"), sourceDir);

	// Crear directorio dist si no existe
	const distDir = join(rootDir, "registry", "optics", "dist", relativePath);
	if (!existsSync(distDir)) {
		mkdirSync(distDir, { recursive: true });
	}

	const outputPath = join(distDir, `${sourceFileName}.json`);

	// Filtrar props genéricas en el resultado final antes de escribir
	const finalResults = mergedResults.reduce((acc, item) => {
		const filteredProps = item.props.filter(
			(prop) => !isGenericProp(prop.name),
		);

		// Solo agregar el componente si tiene propiedades reales para mostrar
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

/**
 * Obtiene todos los archivos fuente recursivamente desde un directorio
 */
function getAllSourceFiles(dir, fileList = []) {
	const files = readdirSync(dir, { withFileTypes: true });

	files.forEach((file) => {
		const filePath = join(dir, file.name);

		if (file.isDirectory()) {
			// Excluir node_modules y otros directorios no relevantes
			if (!file.name.startsWith(".") && file.name !== "node_modules") {
				getAllSourceFiles(filePath, fileList);
			}
		} else if (file.isFile()) {
			// Solo incluir archivos fuente (jsx, js, tsx, ts) excluyendo .txt y .json
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

/**
 * Escanea todos los archivos fuente en registry/optics/ y genera props
 */
function scanAndExtractAllComponents() {
	const registryDir = join(rootDir, "registry", "optics");

	if (!existsSync(registryDir)) {
		console.warn(`[props] Registry directory not found: ${registryDir}`);
		return;
	}

	const sourceFiles = getAllSourceFiles(registryDir);
	let generatedCount = 0;
	let skippedCount = 0;

	sourceFiles.forEach((fullPath) => {
		// Obtener ruta relativa desde rootDir
		const relativePath = relative(rootDir, fullPath);

		// Detectar componentes exportados automáticamente
		const componentsToExtract = getExportedComponents(relativePath);

		if (componentsToExtract.length === 0) {
			skippedCount++;
			return;
		}

		// Extraer el nombre del componente desde la ruta
		// ej: registry/optics/button.jsx -> button
		const fileName = relativePath
			.replace("registry/optics/", "")
			.replace(/\.(jsx|js|tsx|ts)$/, "");

		try {
			generatePropsForComponent(fileName, relativePath, componentsToExtract);
			generatedCount++;
		} catch (error) {
			console.error(`[props] Error processing ${relativePath}:`, error.message);
		}
	});

	console.log(`\n[props] Extraction complete`);
	console.log(`   Generated: ${generatedCount} file(s)`);
	if (skippedCount > 0) {
		console.log(`   Skipped: ${skippedCount} file(s) (no components exported)`);
	}
}

// Ejecutar escaneo automático
scanAndExtractAllComponents();
