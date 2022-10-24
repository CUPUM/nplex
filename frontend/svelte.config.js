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
				guides: 'src/lib/components/mdsvex/guide-articles/layout.svelte',
			},
		}),
		sveltePreprocess({
			typescript: true,
			scss: {
				prependData: `@use './src/lib/styles/mixins.scss';`,
			},
			postcss: true,
		}),
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
			$types: 'src/lib/types',
			$actions: 'src/lib/actions',
			$components: 'src/lib/components',
			$stores: 'src/lib/stores',
			$styles: 'src/lib/styles',
			$transitions: 'src/lib/transitions',
			$routes: 'src/routes',
			$utils: 'src/lib/utils',
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
