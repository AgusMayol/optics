export default function proxy() {}

export const config = {
	matcher: [
		/*
		 * Coincide con todas las rutas EXCEPTO las que empiezan con:
		 * - api (API routes)
		 * - _next/static (archivos estáticos de JS/CSS)
		 * - _next/image (API de optimización de imágenes)
		 * - _vercel (rutas internas de Vercel como insights)
		 * - favicon.ico, sitemap.xml, robots.txt (archivos raíz comunes)
		 * - images (carpeta de imágenes públicas)
		 */
		"/((?!api|_next/static|_next/image|_vercel|favicon.ico|sitemap.xml|robots.txt|manifest.json|images/.*).*)",
	],
};
