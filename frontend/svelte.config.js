import node from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';
// import { scss, typescript } from 'svelte-preprocess';
import { cssModules, linearPreprocess } from 'svelte-preprocess-cssmodules';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: linearPreprocess([
		mdsvex({
			extensions: ['.md', '.svx', '.mdx'],
			layout: {
				guides: 'src/components/mdsvex/guide-articles/layout.svelte',
			},
		}),
		sveltePreprocess.typescript(),
		sveltePreprocess.scss({
			prependData: `@use './src/styles/mixins.scss';`,
		}),
		sveltePreprocess.postcss(),
		cssModules({
			mode: 'mixed',
		}),
	]),
	kit: {
		adapter: node(),
		env: {
			publicPrefix: 'PUBLIC',
			dir: '..',
		},
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
		files: {
			hooks: {
				server: 'src/hooks/index.server',
				client: 'src/hooks/index.client',
			},
		},
	},
	compilerOptions: {
		// Only applies to prod.
		cssHash: ({ hash, css /* name, filename */ }) => `nplex-${hash(css)}`,
	},
};

export default config;
