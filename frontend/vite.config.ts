import { sveltekit } from '@sveltejs/kit/vite';
import autoprefixer from 'autoprefixer';
import type { UserConfig } from 'vite';
import { THEME_PALETTES } from './src/lib/utils/themes';
import icons from './src/plugins/icons';
import themes from './src/plugins/themes';

const port = process.env.PORT ? +process.env.PORT : 3000;

const config: UserConfig = {
	server: {
		port,
	},
	plugins: [icons(), themes(THEME_PALETTES), sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use '$styles/utils' as *;`,
			},
		},
		postcss: {
			plugins: [autoprefixer()],
		},
	},
};

export default config;
