const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
	? `https://www.${process.env.NEXT_PUBLIC_DOMAIN}`
	: "https://www.optics.agusmayol.com.ar";

// Nota:
// - Next.js App Router generará automáticamente /sitemap.xml a partir de este archivo.
// - Ajusta NEXT_PUBLIC_SITE_URL en tus variables de entorno al dominio real (por ejemplo, https://optics.agusmayol.com.ar).

/** @returns {import("next").MetadataRoute.Sitemap} */
export default function sitemap() {
	const staticPaths = [
		"/",
		"/installation",
		"/resources/accesibility",
		"/resources/animations",
		"/resources/cursor-rules",
		"/resources/performance",
		"/resources/security",
		"/resources/seo-metadata",
		"/core/colors",
		"/core/iconography",
		"/core/layout",
		"/core/materials",
		"/core/typography",
	];

	const componentSlugs = [
		"accordion",
		"alert",
		"alert-dialog",
		"aspect-ratio",
		"avatar",
		"badge",
		"breadcrumb",
		"button",
		"button-group",
		"calendar",
		"card",
		"carousel",
		"checkbox",
		"code-block",
		"code-snippet",
		"collapsible",
		"command",
		"context-menu",
		"data-table",
		"date-picker",
		"dialog",
		"drawer",
		"dropdown-menu",
		"empty-state",
		"feedback",
		"field",
		"form",
		"grid",
		"guided-tour",
		"hover-card",
		"input",
		"input-group",
		"input-otp",
		"item",
		"kbd",
		"label",
		"menubar",
		"multi-select",
		"navigation-menu",
		"pagination",
		"popover",
		"progress",
		"radio-group",
		"resizable",
		"scroll-area",
		"select",
		"separator",
		"sheet",
		"show-more",
		"skeleton",
		"slider",
		"sonner",
		"spinner",
		"star-rating",
		"switch",
		"table",
		"tabs",
		"textarea",
		"theme-switcher",
		"timezone",
		"toggle",
		"toggle-group",
		"tooltip",
	];

	const allPaths = [
		...staticPaths,
		...componentSlugs.map((slug) => `/components/${slug}`),
	];

	const lastModified = new Date().toISOString();

	return allPaths.map((path) => ({
		url: `${baseUrl}${path}`,
		lastModified,
		changeFrequency: "weekly",
		priority: path === "/" ? 1.0 : 0.8,
	}));
}
