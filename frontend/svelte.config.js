import node from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import generateCssVarsPlugin from './plugins/dist/generateCssVars.js';
import generateIconsPlugin from './plugins/dist/generateIcons.js';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	preprocess: preprocess({
		scss: true,
		postcss: true,
	}),
	extensions: ['.svelte'],
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
		vite: {
			server: {
				/**
				 * Look for env-defined port (most-likely Heroku's auto-attributed port), else use default.
				 */
				port: process.env.PORT || 3000,
			},
			plugins: [generateIconsPlugin(), generateCssVarsPlugin()],
			/**
			 * Prefix required for ENV vars to be exposed (https://vitejs.dev/config/#envdir).
			 */
			envPrefix: 'PUBLIC',
		},
	},
	compilerOptions: {
		/**
		 * Only applied in prod.
		 */
		cssHash: ({ hash, css /* name, filename */ }) => `nplex-${hash(css)}`,
	},
};

export default config;
