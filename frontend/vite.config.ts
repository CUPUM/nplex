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
};

export default config;
