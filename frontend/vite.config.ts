// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
// import { themes } from './src/lib/utils/themes';
import icons from './src/plugins/icons';
// import styles from './src/plugins/styles';

const config: UserConfig = {
	server: {
		port: process.env.PORT ? +process.env.PORT : 3000,
	},
	plugins: [
		icons(),
		// styles({
		// 	themes,
		// 	file: resolve('src', 'lib', 'styles', 'themes.scss'),
		// }),
		sveltekit(),
	],
	define: {
		__VITE_DEV_APP_VERSION__: JSON.stringify(Date.now().toString()),
	},
};

export default config;
