// @ts-ignore:next-line
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { THEMES } from './src/lib/utils/themes';
import icons from './src/plugins/icons';
import themes from './src/plugins/themes';

const config: UserConfig = {
	server: {
		port: process.env.PORT ? +process.env.PORT : 3000,
	},
	plugins: [icons(), themes(THEMES), sveltekit()],
};

export default config;
