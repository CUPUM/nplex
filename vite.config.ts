import { sveltekit } from '@sveltejs/kit/vite';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';

const port = process.env.PORT ? +process.env.PORT : 3000;

export default defineConfig({
	server: {
		port,
	},
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import '$lib/media/breakpoints.scss';`,
			},
		},
		postcss: {
			plugins: [autoprefixer()],
		},
	},
});
