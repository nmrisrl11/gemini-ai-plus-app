import fs from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		{
			name: "dev-download-redirect",
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					if (req.url === "/download") {
						res.statusCode = 307;
						res.setHeader(
							"Location",
							"https://download-ai-plus-portal.nmrisrl.dev/latest/Gemini-AI-Plus-Portal-latest.exe",
						);
						res.end();
						return;
					}
					next();
				});
			},
		},
		{
			name: "generate-404-html",
			closeBundle() {
				const distDir = path.resolve(import.meta.dirname, "./dist");
				const indexPath = path.join(distDir, "index.html");
				const notFoundPath = path.join(distDir, "404.html");
				if (fs.existsSync(indexPath)) {
					fs.copyFileSync(indexPath, notFoundPath);
				}
			},
		},
	],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
		},
	},
	build: {
		chunkSizeWarningLimit: 600,
		rolldownOptions: {
			output: {
				codeSplitting: {
					groups: [
						{
							name: "vendor-react",
							test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
							priority: 30,
						},
						{
							name: "vendor-three",
							test: /node_modules[\\/]three[\\/]/,
							priority: 25,
						},
						{
							name: "vendor-ui",
							test: /node_modules[\\/](radix-ui|@radix-ui|lucide-react|class-variance-authority|cn)[\\/]/,
							priority: 20,
						},
					],
				},
			},
		},
	},
});
