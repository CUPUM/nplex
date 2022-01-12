import preprocess from 'svelte-preprocess'
import path from 'path'
import node from '@sveltejs/adapter-node'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	extensions: [
		'.svelte'
	],
	kit: {
		target: 'body',
		adapter: node(),
		vite: {
			plugins: [
				vanillaExtractPlugin()
			],
			resolve: {
				alias: {
					$actions: path.resolve('src/actions'),
					$components: path.resolve('src/components'),
					$stores: path.resolve('src/stores'),
					$styles: path.resolve('src/styles'),
					$transitions: path.resolve('src/transitions'),
					$routes: path.resolve('src/routes'),
					$utils: path.resolve('src/utils'),
					$icons: path.resolve('static/icons')
				}
			},
			// Préfixes des variables .env à exposer ('' n'est pas valide, https://vitejs.dev/config/#envdir)
			envPrefix: 'EXPOSED',
		}
	},
	compilerOptions: {
		cssHash: ({hash, css, name, filename}) => `nplex-${hash(css)}`
	}
};

export default config;
