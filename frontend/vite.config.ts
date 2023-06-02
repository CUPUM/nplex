// @ts-ignore:next-line
import { sveltekit } from '@sveltejs/kit/vite';
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
	ssr: {
		// https://github.com/airjp73/remix-validated-form/issues/141
		// noExternal: ['zod-form-data'],
	},
};

export default config;
