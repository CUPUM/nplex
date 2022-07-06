import { sveltekit } from '@sveltejs/kit/vite';
import generateCssVarsPlugin from './plugins/dist/generateCssVars.js';
import generateIconsPlugin from './plugins/dist/generateIcons.js';

/**
 * @type {import('vite').UserConfig}
 */
const config = {
	server: {
		/**
		 * Look for env-defined port (most-likely Heroku's auto-attributed port), else use default.
		 */
		port: process.env.PORT || 3000,
	},
	plugins: [generateIconsPlugin(), generateCssVarsPlugin(), sveltekit()],
	/**
	 * Prefix required for ENV vars to be exposed (https://vitejs.dev/config/#envdir).
	 */
	envPrefix: 'PUBLIC',
};

export default config;
