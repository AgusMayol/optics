import type { NextConfig } from "next";
import createWithVercelToolbar from "@vercel/toolbar/plugins/next";

const nextConfig: NextConfig = {
	htmlLimitedBots: /.*/,
	reactCompiler: true,
	reactStrictMode: true,
	experimental: {
		viewTransition: true,
		turbopackFileSystemCacheForDev: true,
		turbopackFileSystemCacheForBuild: true,
		optimizePackageImports: ["lucide-react"],
	},
	turbopack: {
		rules: {
			// Archivos .jsx.txt se cargan como texto plano usando raw-loader
			"{*.jsx.txt,*.js.txt,}": {
				loaders: ["raw-loader"],
				as: "*.js",
			},
			"{*.mdc.txt}": {
				loaders: ["raw-loader"],
				as: "*.js",
			},
		},
	},
	productionBrowserSourceMaps: false,
	enablePrerenderSourceMaps: false,
	poweredByHeader: false,
	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production"
				? {
						exclude: ["error", "warn"],
					}
				: false,
	},

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "github.com",
				pathname: "/*.png",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "X-Frame-Options", value: "SAMEORIGIN" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains",
					},
				],
			},
		];
	},
};

const withVercelToolbar = createWithVercelToolbar();
export default withVercelToolbar(nextConfig);
