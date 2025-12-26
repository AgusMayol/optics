#!/usr/bin/env node
/**
 * Script to sync .jsx, .ts, .js files to .txt automatically
 * Fixes imports based on registry.json
 * Run: bun scripts/sync-source-files.js
 */

import {
	readFileSync,
	writeFileSync,
	existsSync,
	readdirSync,
	statSync,
	mkdirSync,
} from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const registryPath = join(__dirname, "..", "registry", "optics");
const distPath = join(registryPath, "dist");
const registryJsonPath = join(__dirname, "..", "registry.json");

// File extensions to process
const EXTENSIONS = [".jsx", ".js", ".mdc"];

// Load registry.json
const registry = JSON.parse(readFileSync(registryJsonPath, "utf-8"));

/**
 * Creates a map of source-to-target paths based on registry.json
 * Returns: { "registry/optics/...": "components/optics/..." }
 */
function createPathMap() {
	const pathMap = new Map();
	const nameToPathMap = new Map();

	for (const item of registry.items) {
		for (const file of item.files) {
			const sourcePath = file.path;
			const targetPath = file.target;

			// Mapear ruta completa
			pathMap.set(sourcePath, targetPath);

			// Extraer nombre del componente (sin extensión)
			const sourceName = sourcePath
				.replace("registry/optics/", "")
				.replace(/\.(jsx|js|ts|tsx)$/, "");
			const targetName = targetPath.replace(/\.(jsx|js|ts|tsx)$/, "");

			// Mapear nombre a ruta de destino (sin extensión)
			nameToPathMap.set(sourceName, targetName);

			// También mapear rutas relativas sin extensión
			pathMap.set(sourceName, targetName);
		}
	}

	return { pathMap, nameToPathMap };
}

/**
 * Converts a target path to an import path with @/
 */
function targetToImportPath(targetPath) {
	// Remover extensión
	const withoutExt = targetPath.replace(/\.(jsx|js|ts|tsx)$/, "");
	// Convertir a ruta de importación
	return `@/${withoutExt}`;
}

/**
 * Fixes imports in the file content
 */
function fixImports(content, sourceFilePath) {
	const { pathMap, nameToPathMap } = createPathMap();

	// Pattern to find imports from @/registry/optics/...
	const importPattern =
		/@\/registry\/optics\/([a-zA-Z0-9\-_\/]+)(?:\.(jsx|js|ts|tsx))?/g;

	return content.replace(importPattern, (match, importPath, ext) => {
		// Remove extension if present in the path
		const pathWithoutExt = importPath.replace(/\.(jsx|js|ts|tsx)$/, "");

		// Try full registry path first
		const fullRegistryPath = `registry/optics/${importPath}`;
		if (pathMap.has(fullRegistryPath)) {
			const targetPath = pathMap.get(fullRegistryPath);
			return targetToImportPath(targetPath);
		}

		// Fallback to name map (for simple components like "accordion-primitive")
		if (nameToPathMap.has(pathWithoutExt)) {
			const targetPath = nameToPathMap.get(pathWithoutExt);
			return targetToImportPath(targetPath);
		}

		// If no direct mapping, build destination path based on structure
		// Example: registry/optics/lib/utils -> lib/utils
		if (pathWithoutExt.startsWith("lib/")) {
			return `@/${pathWithoutExt}`;
		}
		if (pathWithoutExt.startsWith("hooks/")) {
			return `@/${pathWithoutExt}`;
		}
		if (pathWithoutExt.startsWith("helpers/")) {
			return `@/components/optics/${pathWithoutExt}`;
		}

		// For components at the optics root, point to components/optics
		// Example: registry/optics/accordion -> components/optics/accordion
		return `@/components/optics/${pathWithoutExt}`;
	});
}

function getAllSourceFiles(dir) {
	const files = [];
	const items = readdirSync(dir);

	for (const item of items) {
		const fullPath = join(dir, item);
		const stat = statSync(fullPath);

		if (stat.isDirectory()) {
			// Include all directories except those starting with a dot
			if (!item.startsWith(".")) {
				files.push(...getAllSourceFiles(fullPath));
			}
		} else {
			// Include .jsx, .ts, .js, .mdc except .source.jsx and .txt
			const ext = EXTENSIONS.find((ext) => item.endsWith(ext));
			if (ext && !item.endsWith(".source.jsx") && !item.endsWith(".txt")) {
				files.push(fullPath);
			}
		}
	}

	return files;
}

const sourceFiles = getAllSourceFiles(registryPath);

console.log(`[sync] Found ${sourceFiles.length} source file(s)`);

let syncedCount = 0;

for (const sourceFile of sourceFiles) {
	// Get relative path from registry/optics
	const relativePath = relative(registryPath, sourceFile);
	const relativeDir = dirname(relativePath);

	// Create dist directory preserving structure
	const distDir = join(distPath, relativeDir);
	if (!existsSync(distDir)) {
		mkdirSync(distDir, { recursive: true });
	}

	// Generate .txt file name in dist preserving the original extension
	const txtFile = join(distDir, `${relativePath.split("/").pop()}.txt`);
	const originalContent = readFileSync(sourceFile, "utf-8");

	// Fix imports
	const fixedContent = fixImports(originalContent, sourceFile);

	// Create/update only if missing or content differs
	if (!existsSync(txtFile) || readFileSync(txtFile, "utf-8") !== fixedContent) {
		writeFileSync(txtFile, fixedContent, "utf-8");
		const relativeSourcePath = relativePath;
		const relativeTxtPath = relative(distPath, txtFile);
		console.log(
			`[sync] Updated ${relativeSourcePath} -> dist/${relativeTxtPath}`,
		);
		syncedCount++;
	}
}

console.log(`[sync] Completed - ${syncedCount} file(s) updated`);
