import node from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';
import { cssModules, linearPreprocess } from 'svelte-preprocess-cssmodules';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: linearPreprocess([
		sveltePreprocess({
			typescript: true,
			scss: {
				includePaths: ['src/lib/styles'],
				prependData: "@import 'utils.scss';",
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
			$actions: 'src/lib/actions',
			$routes: 'src/routes',
			$components: 'src/lib/components',
			$static: 'static',
			$stores: 'src/lib/stores',
			$styles: 'src/lib/styles',
			$transitions: 'src/lib/transitions',
			$types: 'src/lib/types',
			$utils: 'src/lib/utils',
			$plugins: 'src/plugins',
		},
		files: {
			hooks: {
				server: 'src/hooks/server',
				client: 'src/hooks/client',
			},
		},
	},
	compilerOptions: {
		// Only applies to prod.
		cssHash: ({ hash, css /* name, filename */ }) => `nplex-${hash(css)}`,
	},
};

export default config;
