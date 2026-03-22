import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
	? `https://www.${process.env.NEXT_PUBLIC_DOMAIN}`
	: "https://www.optics.agusmayol.com.ar";

/**
 * Rutas que el desarrollador desea excluir manualmente.
 * @type {string[]}
 */
const EXCLUDED_PATHS: string[] = [
	// "/ejemplo-de-ruta-a-excluir",
];

/**
 * Explora el directorio 'app' para encontrar todas las rutas (archivos page.tsx o page.ts).
 * Excluye automáticamente carpetas internas (_folder) y rutas de API (api/).
 * Maneja correctamente los Grupos de Rutas (folder).
 *
 * @param {string} dir - Directorio actual a explorar.
 * @param {string} baseDir - Ruta acumulada para la URL.
 * @returns {string[]} Lista de rutas encontradas.
 */
function getAppRoutes(dir: string, baseDir = ""): string[] {
	let routes: string[] = [];
	if (!fs.existsSync(dir)) return routes;

	const items = fs.readdirSync(dir, { withFileTypes: true });

	for (const item of items) {
		const fullPath = path.join(dir, item.name);

		if (item.isDirectory()) {
			// Ignorar carpetas internas de Next.js (_components, etc) y endpoints de API
			if (item.name.startsWith("_") || item.name === "api") continue;

			// Los Grupos de Rutas (carpetas entre paréntesis como (marketing)) no aparecen en la URL
			const isRouteGroup = item.name.startsWith("(") && item.name.endsWith(")");
			const nextBaseDir = isRouteGroup
				? baseDir
				: path.join(baseDir, item.name);

			routes = routes.concat(getAppRoutes(fullPath, nextBaseDir));
		} else if (item.name === "page.tsx" || item.name === "page.ts") {
			// Convertir la ruta del sistema de archivos en una ruta de URL normalizada
			const normalizedPath = baseDir.replace(/\\/g, "/");
			const routePath = normalizedPath === "" ? "/" : `/${normalizedPath}`;

			if (!EXCLUDED_PATHS.includes(routePath)) {
				routes.push(routePath);
			}
		}
	}

	return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
	// Obtenemos la ruta absoluta de la carpeta 'app'
	const appDir = path.join(process.cwd(), "app");

	// Obtenemos todas las rutas de forma programática crawling el sistema de archivos
	const allPaths = getAppRoutes(appDir);

	// Eliminar duplicados y ordenar para un sitemap más limpio
	const uniquePaths = [...new Set(allPaths)].sort((a: string, b: string) => {
		// El home siempre primero, luego alfabéticamente
		if (a === "/") return -1;
		if (b === "/") return 1;
		return a.localeCompare(b);
	});

	const lastModified = new Date().toISOString();

	return uniquePaths.map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified,
		changeFrequency: "weekly",
		priority: route === "/" ? 1.0 : 0.8,
	}));
}
