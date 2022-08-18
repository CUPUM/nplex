// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import generateCssVarsPlugin from './plugins/generateCssVars';
import generateIconsPlugin from './plugins/generateIcons';

const config: UserConfig = {
	server: {
		/**
		 * Look for env-defined port (most-likely Heroku's auto-attributed port), else use default.
		 */
		port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
	},
	plugins: [generateIconsPlugin(), generateCssVarsPlugin(), sveltekit()],
	// /**
	//  * Getting env vars from the monorepo root.
	//  */
	// envDir: '..',
};

export default config;
