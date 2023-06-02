import vercel from '@sveltejs/adapter-vercel';
import autoprefixer from 'autoprefixer';
import sveltePreprocess from 'svelte-preprocess';

/**
 * @type {import('@sveltejs/kit').Config}
 */
export default {
	extensions: ['.svelte'],
	preprocess: [
		sveltePreprocess({
			typescript: true,
			scss: {
				includePaths: ['src/lib/styles'],
				prependData: "@use 'utils' as *;",
			},
			postcss: {
				plugins: [autoprefixer()],
			},
		}),
	],
	kit: {
		adapter: vercel(),
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
			$motion: 'src/lib/motion',
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
			preloadStrategy: 'modulepreload',
		},
	},
	compilerOptions: {
		cssHash: (styles) => `nplex-${styles.hash(styles.css)}`, // Only applies to prod.
	},
};
