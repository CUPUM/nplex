import adapter from '@sveltejs/adapter-vercel';
import autoprefixer from 'autoprefixer';
import sveltePreprocess from 'svelte-preprocess';
import { cssModules, linearPreprocess } from 'svelte-preprocess-cssmodules';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: linearPreprocess([
		sveltePreprocess({
			typescript: true,
			scss: {
				includePaths: ['src/lib/styles'],
				prependData: "@use 'utils/breakpoint.scss'; @use 'utils/color.scss' as * ;",
			},
			postcss: {
				plugins: [autoprefixer()],
			},
		}),
		cssModules({
			mode: 'mixed',
		}),
	]),
	kit: {
		adapter: adapter(),
		env: {
			publicPrefix: 'PUBLIC',
			dir: '..',
		},
		alias: {
			$actions: 'src/lib/actions',
			$routes: 'src/routes',
			$components: 'src/lib/components',
			$static: 'static',
			$stores: 'src/lib/stores',
			$styles: 'src/lib/styles',
			$transitions: 'src/lib/transitions',
			$types: 'src/lib/types',
			$utils: 'src/lib/utils',
			$plugins: 'src/plugins',
			// Houdini
			// '~': path.resolve('./src'),
			$houdini: './$houdini',
		},
		files: {
			hooks: {
				server: 'src/hooks/server',
				client: 'src/hooks/client',
			},
		},
	},
	compilerOptions: {
		// Only applies to prod.
		cssHash: ({ hash, css /* name, filename */ }) => `nplex-${hash(css)}`,
	},
};

export default config;
