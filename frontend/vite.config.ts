// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import generateCssVarsPlugin from './plugins/generateCssVars';
import generateIconsPlugin from './plugins/generateIcons';

const config: UserConfig = {
	server: {
		port: process.env.PORT ? +process.env.PORT : 3000,
	},
	plugins: [generateIconsPlugin(), generateCssVarsPlugin(), sveltekit()],
	define: {
		__VITE_DEV_APP_VERSION__: JSON.stringify(Date.now().toString()),
	},
};

export default config;
