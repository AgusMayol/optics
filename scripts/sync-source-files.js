#!/usr/bin/env node
/**
 * Script para sincronizar archivos .jsx, .ts, .js con .txt automáticamente
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

// Extensiones de archivos a procesar
const EXTENSIONS = [".jsx", ".ts", ".js"];

function getAllSourceFiles(dir) {
	const files = [];
	const items = readdirSync(dir);

	for (const item of items) {
		const fullPath = join(dir, item);
		const stat = statSync(fullPath);

		if (stat.isDirectory()) {
			// Incluir todos los directorios excepto los que empiezan con punto
			if (!item.startsWith(".")) {
				files.push(...getAllSourceFiles(fullPath));
			}
		} else {
			// Incluir archivos .jsx, .ts, .js excepto .source.jsx y .txt
			const ext = EXTENSIONS.find((ext) => item.endsWith(ext));
			if (
				ext &&
				!item.endsWith(".source.jsx") &&
				!item.endsWith(".txt")
			) {
				files.push(fullPath);
			}
		}
	}

	return files;
}

const sourceFiles = getAllSourceFiles(registryPath);

console.log(`Encontrados ${sourceFiles.length} archivos fuente`);

let syncedCount = 0;

for (const sourceFile of sourceFiles) {
	// Generar el nombre del archivo .txt manteniendo la extensión original
	const txtFile = `${sourceFile}.txt`;
	const content = readFileSync(sourceFile, "utf-8");

	// Solo crear/actualizar si no existe o si el contenido es diferente
	if (!existsSync(txtFile) || readFileSync(txtFile, "utf-8") !== content) {
		writeFileSync(txtFile, content, "utf-8");
		const relativePath = sourceFile.replace(registryPath + "/", "");
		const relativeTxtPath = txtFile.replace(registryPath + "/", "");
		console.log(
			`✓ Sincronizado: ${relativePath} -> ${relativeTxtPath}`,
		);
		syncedCount++;
	}
}

console.log(`✅ Sincronización completada (${syncedCount} archivos actualizados)`);
