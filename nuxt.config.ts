import path from "path";
import fs from "fs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		// The private keys which are only available server-side
		apiSecret: "123",
		// Keys within public are also exposed client-side
		public: {
			apiBase: "/api",
		},
	},
	ssr: false,
	pages: true,

	experimental: {
		payloadExtraction: false,
	},
	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	// devServer: {
	// 	https: {
	// 		key: "./server.key",
	// 		cert: "./server.crt",
	// 	},
	// },

	modules: [
		"nuxt-icon",
		"nuxt-lodash",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
	],
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1, maximum-scale=1",
		},
	},
});
