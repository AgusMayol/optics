export default function proxy() {}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|_vercel|favicon.ico|sitemap.xml|robots.txt|manifest.json|images/.*).*)",
	],
};
