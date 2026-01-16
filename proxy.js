export default function proxy() {
}

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas EXCEPTO las que empiezan con:
     * - api (si no quieres middleware en API routes)
     * - _next/static (archivos estáticos de JS/CSS - VISTO EN TUS LOGS)
     * - _next/image (API de optimización de imágenes)
     * - _vercel (rutas internas de Vercel como insights - VISTO EN TUS LOGS)
     * - favicon.ico, sitemap.xml, robots.txt (archivos raíz comunes)
     * - images (tu carpeta de imágenes públicas - VISTO EN TUS LOGS)
     */
    '/((?!api|_next/static|_next/image|_vercel|favicon.ico|sitemap.xml|robots.txt|manifest.json|images/.*).*)',
  ],
}