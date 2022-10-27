// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import icons from './plugins/icons';
import styles from './plugins/styles';

const config: UserConfig = {
	server: {
		port: process.env.PORT ? +process.env.PORT : 3000,
	},
	plugins: [icons(), styles(), sveltekit()],
	define: {
		__VITE_DEV_APP_VERSION__: JSON.stringify(Date.now().toString()),
	},
};

export default config;
