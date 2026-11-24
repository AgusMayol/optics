import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
	? `https://www.${process.env.NEXT_PUBLIC_DOMAIN}`
	: "https://www.optics.agusmayol.com.ar";

const EXCLUDED_PATHS: string[] = [];

function getAppRoutes(dir: string, baseDir = ""): string[] {
	let routes: string[] = [];
	if (!fs.existsSync(dir)) return routes;

	const items = fs.readdirSync(dir, { withFileTypes: true });

	for (const item of items) {
		const fullPath = path.join(dir, item.name);

		if (item.isDirectory()) {
			if (item.name.startsWith("_") || item.name === "api") continue;

			const isRouteGroup = item.name.startsWith("(") && item.name.endsWith(")");
			const nextBaseDir = isRouteGroup ? baseDir : path.join(baseDir, item.name);

			routes = routes.concat(getAppRoutes(fullPath, nextBaseDir));
		} else if (item.name === "page.tsx" || item.name === "page.ts") {
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
	const appDir = path.join(process.cwd(), "app");
	const allPaths = getAppRoutes(appDir);

	const uniquePaths = [...new Set(allPaths)].sort((a, b) => {
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
