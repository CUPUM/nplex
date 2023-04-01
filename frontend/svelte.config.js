import adapter from '@sveltejs/adapter-vercel';
import autoprefixer from 'autoprefixer';
import sveltePreprocess from 'svelte-preprocess';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: ['.svelte'],
	preprocess: sveltePreprocess({
		typescript: true,
		scss: {
			includePaths: ['src/lib/styles'],
			prependData: "@use 'utils' as *;",
		},
		postcss: {
			plugins: [autoprefixer()],
		},
	}),
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
		},
		files: {
			hooks: {
				server: 'src/hooks/server',
				client: 'src/hooks/client',
			},
		},
		output: {
			preloadStrategy: 'modulepreload', // 'preload-mjs', // Soon to be not relevant: https://kit.svelte.dev/docs/configuration
		},
	},
	compilerOptions: {
		// Only applies to prod.
		cssHash: ({ hash, css /* name, filename */ }) => `nplex-${hash(css)}`,
	},
};

export default config;
