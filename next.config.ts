import type { NextConfig } from "next";
import createWithVercelToolbar from "@vercel/toolbar/plugins/next";

const nextConfig: NextConfig = {
	htmlLimitedBots: /.*/,
	reactCompiler: true,
	reactStrictMode: true,
	experimental: {
		viewTransition: true,
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
	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production"
				? {
						exclude: ["error", "warn"],
					}
				: false,
	},
};

const withVercelToolbar = createWithVercelToolbar();
export default withVercelToolbar(nextConfig);
