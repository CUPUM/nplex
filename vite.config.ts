import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: process.env.PORT ? +process.env.PORT : 3000,
	},
	plugins: [
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/i18n/generated',
		}),
		sveltekit(),
		tailwindcss(),
		visualizer({
			emitFile: true,
			filename: 'stats.html',
		}),
	],
});
