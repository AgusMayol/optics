#!/usr/bin/env node
/**
 * Script para sincronizar archivos .jsx con .jsx.txt automáticamente
 * Ejecuta: bun scripts/sync-source-files.js
 */

import {
	readFileSync,
	writeFileSync,
	existsSync,
	readdirSync,
	statSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const registryPath = join(__dirname, "..", "registry", "optics");

function getAllJsxFiles(dir) {
	const files = [];
	const items = readdirSync(dir);

	for (const item of items) {
		const fullPath = join(dir, item);
		const stat = statSync(fullPath);

		if (stat.isDirectory()) {
			// Incluir todos los directorios excepto los que empiezan con punto
			if (!item.startsWith(".")) {
				files.push(...getAllJsxFiles(fullPath));
			}
		} else if (item.endsWith(".jsx") && !item.endsWith(".source.jsx")) {
			// Incluir todos los archivos .jsx excepto .source.jsx
			// Incluir helpers, primitives, y todos los demás
			files.push(fullPath);
		}
	}

	return files;
}

const jsxFiles = getAllJsxFiles(registryPath);

console.log(`Encontrados ${jsxFiles.length} archivos .jsx`);

for (const jsxFile of jsxFiles) {
	const sourceFile = jsxFile.replace(".jsx", ".jsx.txt");
	const content = readFileSync(jsxFile, "utf-8");

	// Solo crear/actualizar si no existe o si el contenido es diferente
	if (
		!existsSync(sourceFile) ||
		readFileSync(sourceFile, "utf-8") !== content
	) {
		writeFileSync(sourceFile, content, "utf-8");
		console.log(
			`✓ Sincronizado: ${jsxFile.split("/").pop()} -> ${sourceFile.split("/").pop()}`,
		);
	}
}

console.log("✅ Sincronización completada");
