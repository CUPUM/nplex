import node from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: [
		preprocess({
			scss: {
				prependData: `@use './src/styles/mixins.scss';`,
			},
		}),
		mdsvex({
			extensions: ['.md', '.svx', '.mdx'],
		}),
		preprocess({
			scss: true,
			postcss: true,
		}),
	],
	kit: {
		adapter: node(),
		alias: {
			$types: 'src/types',
			$actions: 'src/actions',
			$components: 'src/components',
			$stores: 'src/stores',
			$styles: 'src/styles',
			$transitions: 'src/transitions',
			$routes: 'src/routes',
			$utils: 'src/utils',
		},
	},
	compilerOptions: {
		// Only applies to prod.
		cssHash: ({ hash, css /* name, filename */ }) => `nplex-${hash(css)}`,
	},
};

export default config;
