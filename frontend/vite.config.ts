import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import icons from './plugins/icons';
import themes from './plugins/themes';

const config: UserConfig = {
	server: {
		port: process.env.PORT ? +process.env.PORT : 3000,
	},
	plugins: [icons(), themes(), sveltekit()],
};

export default config;
