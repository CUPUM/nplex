import postcssglobal from '@csstools/postcss-global-data';
import { paraglide } from '@inlang/paraglide-js-adapter-vite';
import { sveltekit } from '@sveltejs/kit/vite';
import examples from 'mdsvexamples/vite';
import mixins from 'postcss-mixins';
import presetenv from 'postcss-preset-env';
import { defineConfig } from 'vite';

const port = process.env.PORT ? +process.env.PORT : 3000;

export default defineConfig({
	server: {
		port,
	},
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/i18n',
		}),
		process.env.SKIP_MD ? undefined : examples,
	],
	css: {
		postcss: {
			plugins: [
				// See: https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media#modular-css-processing
				postcssglobal({
					files: ['./src/styles/utilities.css'],
				}),
				mixins({ mixinsFiles: '/src/styles/*.css' }),
				presetenv({
					stage: 2,
					features: {
						'cascade-layers': false, // This polyfill doesnt work properly with svelte-scoped styles as it can't analyze them.
						'nesting-rules': true,
						'custom-media-queries': true,
						'media-query-ranges': true,
						'color-mix': true,
						'custom-selectors': { preserve: false },
						'not-pseudo-class': true,
					},
				}),
			],
		},
	},
});
