import preprocess from 'svelte-preprocess'
import path from 'path'
import node from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),
	extensions: [
		'.svelte'
	],
	kit: {
		adapter: node(),
		vite: {
			// Préfixes des variables .env à exposer ('' n'est pas valide, https://vitejs.dev/config/#envdir)
			envPrefix: ['EXPOSED'],
			resolve: {
				alias: {
					$components: path.resolve('src/components'),
					$utils: path.resolve('src/utils'),
					$actions: path.resolve('src/actions'),
					$styles: path.resolve('src/styles'),
					$stores: path.resolve('src/stores'),
					$database: path.resolve('src/database'),
					$icons: path.resolve('static/icons')
				}
			}
		},
		target: 'body'
	}
};

export default config;
