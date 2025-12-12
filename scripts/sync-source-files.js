#!/usr/bin/env node
/**
 * Script para sincronizar archivos .jsx, .ts, .js con .txt automáticamente
 * Corrige las importaciones según registry.json
 * Ejecuta: bun scripts/sync-source-files.js
 */

import {
	readFileSync,
	writeFileSync,
	existsSync,
	readdirSync,
	statSync,
} from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const registryPath = join(__dirname, "..", "registry", "optics");
const registryJsonPath = join(__dirname, "..", "registry.json");

// Extensiones de archivos a procesar
const EXTENSIONS = [".jsx", ".js", ".mdc"];

// Cargar registry.json
const registry = JSON.parse(readFileSync(registryJsonPath, "utf-8"));

/**
 * Crea un mapa de rutas de origen a destino basado en registry.json
 * Retorna: { "registry/optics/...": "components/optics/..." }
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
 * Convierte una ruta de destino a una ruta de importación con @/
 */
function targetToImportPath(targetPath) {
	// Remover extensión
	const withoutExt = targetPath.replace(/\.(jsx|js|ts|tsx)$/, "");
	// Convertir a ruta de importación
	return `@/${withoutExt}`;
}

/**
 * Corrige las importaciones en el contenido del archivo
 */
function fixImports(content, sourceFilePath) {
	const { pathMap, nameToPathMap } = createPathMap();

	// Patrón para encontrar imports de @/registry/optics/...
	const importPattern =
		/@\/registry\/optics\/([a-zA-Z0-9\-_\/]+)(?:\.(jsx|js|ts|tsx))?/g;

	return content.replace(importPattern, (match, importPath, ext) => {
		// Remover extensión si existe en el path
		const pathWithoutExt = importPath.replace(/\.(jsx|js|ts|tsx)$/, "");

		// Buscar ruta completa en el mapa primero
		const fullRegistryPath = `registry/optics/${importPath}`;
		if (pathMap.has(fullRegistryPath)) {
			const targetPath = pathMap.get(fullRegistryPath);
			return targetToImportPath(targetPath);
		}

		// Buscar en el mapa de nombres (para componentes simples como "accordion-primitive")
		if (nameToPathMap.has(pathWithoutExt)) {
			const targetPath = nameToPathMap.get(pathWithoutExt);
			return targetToImportPath(targetPath);
		}

		// Si no se encuentra mapeo directo, construir la ruta de destino basándose en la estructura
		// Por ejemplo: registry/optics/lib/utils -> lib/utils
		if (pathWithoutExt.startsWith("lib/")) {
			return `@/${pathWithoutExt}`;
		}
		if (pathWithoutExt.startsWith("hooks/")) {
			return `@/${pathWithoutExt}`;
		}
		if (pathWithoutExt.startsWith("helpers/")) {
			return `@/components/optics/${pathWithoutExt}`;
		}

		// Para componentes en la raíz de optics, cambiar a components/optics
		// Por ejemplo: registry/optics/accordion -> components/optics/accordion
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
			// Incluir todos los directorios excepto los que empiezan con punto
			if (!item.startsWith(".")) {
				files.push(...getAllSourceFiles(fullPath));
			}
		} else {
			// Incluir archivos .jsx, .ts, .js, .mdc excepto .source.jsx y .txt
			const ext = EXTENSIONS.find((ext) => item.endsWith(ext));
			if (ext && !item.endsWith(".source.jsx") && !item.endsWith(".txt")) {
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
	const originalContent = readFileSync(sourceFile, "utf-8");

	// Corregir importaciones
	const fixedContent = fixImports(originalContent, sourceFile);

	// Solo crear/actualizar si no existe o si el contenido es diferente
	if (!existsSync(txtFile) || readFileSync(txtFile, "utf-8") !== fixedContent) {
		writeFileSync(txtFile, fixedContent, "utf-8");
		const relativePath = sourceFile.replace(registryPath + "/", "");
		const relativeTxtPath = txtFile.replace(registryPath + "/", "");
		console.log(`✓ Sincronizado: ${relativePath} -> ${relativeTxtPath}`);
		syncedCount++;
	}
}

console.log(
	`✅ Sincronización completada (${syncedCount} archivos actualizados)`,
);
