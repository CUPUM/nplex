import { paraglide } from '@inlang/paraglide-js-adapter-vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: process.env.PORT ? +process.env.PORT : 3000,
	},
	plugins: [
		sveltekit(),
		tailwindcss(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/i18n/generated',
		}),
	],
});
