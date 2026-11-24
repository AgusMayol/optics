#!/usr/bin/env bun
/**
 * Script to sync .tsx, .ts, .mdc files to .txt automatically
 * Fixes imports based on registry.json
 * Run: bun scripts/sync-source-files.ts
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

interface RegistryFile {
	path: string;
	type: string;
	target: string;
}

interface RegistryItem {
	name: string;
	files: RegistryFile[];
}

interface Registry {
	items: RegistryItem[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const registryPath = join(__dirname, "..", "registry", "optics");
const distPath = join(registryPath, "dist");
const registryJsonPath = join(__dirname, "..", "registry.json");

const EXTENSIONS = [".tsx", ".ts", ".mdc"];

const registry = JSON.parse(readFileSync(registryJsonPath, "utf-8")) as Registry;

function createPathMap() {
	const pathMap = new Map<string, string>();
	const nameToPathMap = new Map<string, string>();

	for (const item of registry.items) {
		for (const file of item.files) {
			const sourcePath = file.path;
			const targetPath = file.target;

			pathMap.set(sourcePath, targetPath);

			const sourceName = sourcePath
				.replace("registry/optics/", "")
				.replace(/\.(jsx|js|ts|tsx)$/, "");
			const targetName = targetPath.replace(/\.(jsx|js|ts|tsx)$/, "");

			nameToPathMap.set(sourceName, targetName);
			pathMap.set(sourceName, targetName);
		}
	}

	return { pathMap, nameToPathMap };
}

function targetToImportPath(targetPath: string): string {
	const withoutExt = targetPath.replace(/\.(jsx|js|ts|tsx)$/, "");
	return `@/${withoutExt}`;
}

function fixImports(content: string): string {
	const { pathMap, nameToPathMap } = createPathMap();

	const importPattern = /@\/registry\/optics\/([a-zA-Z0-9\-_/]+)(?:\.(jsx|js|ts|tsx))?/g;

	return content.replace(importPattern, (_match, importPath: string) => {
		const pathWithoutExt = importPath.replace(/\.(jsx|js|ts|tsx)$/, "");

		const fullRegistryPath = `registry/optics/${importPath}`;
		const mappedFullPath = pathMap.get(fullRegistryPath);
		if (mappedFullPath) {
			return targetToImportPath(mappedFullPath);
		}

		const mappedTarget = nameToPathMap.get(pathWithoutExt);
		if (mappedTarget) {
			return targetToImportPath(mappedTarget);
		}

		if (pathWithoutExt.startsWith("lib/")) {
			return `@/${pathWithoutExt}`;
		}
		if (pathWithoutExt.startsWith("hooks/")) {
			return `@/${pathWithoutExt}`;
		}
		if (pathWithoutExt.startsWith("helpers/")) {
			return `@/components/optics/${pathWithoutExt}`;
		}

		return `@/components/optics/${pathWithoutExt}`;
	});
}

function getAllSourceFiles(dir: string): string[] {
	const files: string[] = [];
	const items = readdirSync(dir);

	for (const item of items) {
		const fullPath = join(dir, item);
		const stat = statSync(fullPath);

		if (stat.isDirectory()) {
			if (!item.startsWith(".") && item !== "dist") {
				files.push(...getAllSourceFiles(fullPath));
			}
		} else {
			const ext = EXTENSIONS.find((candidate) => item.endsWith(candidate));
			if (
				ext &&
				!item.endsWith(".source.jsx") &&
				!item.endsWith(".source.tsx") &&
				!item.endsWith(".txt")
			) {
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
	const relativePath = relative(registryPath, sourceFile);
	const relativeDir = dirname(relativePath);

	const distDir = join(distPath, relativeDir);
	if (!existsSync(distDir)) {
		mkdirSync(distDir, { recursive: true });
	}

	const filename = relativePath.split("/").pop();
	if (!filename) continue;
	const txtFile = join(distDir, `${filename}.txt`);
	const originalContent = readFileSync(sourceFile, "utf-8");

	const fixedContent = fixImports(originalContent);

	if (!existsSync(txtFile) || readFileSync(txtFile, "utf-8") !== fixedContent) {
		writeFileSync(txtFile, fixedContent, "utf-8");
		const relativeTxtPath = relative(distPath, txtFile);
		console.log(`[sync] Updated ${relativePath} -> dist/${relativeTxtPath}`);
		syncedCount++;
	}
}

console.log(`[sync] Completed - ${syncedCount} file(s) updated`);
