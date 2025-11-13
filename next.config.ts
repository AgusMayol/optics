import type { NextConfig } from "next";
import createWithVercelToolbar from "@vercel/toolbar/plugins/next";

const nextConfig: NextConfig = {
	htmlLimitedBots: /.*/,
	reactCompiler: true,
	reactStrictMode: true,
	experimental: {
		viewTransition: true,
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
