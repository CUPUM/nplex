import node from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: sveltePreprocess({
		typescript: true,
		scss: true,
		postcss: true,
	}),
	kit: {
		adapter: node(),
		env: {
			publicPrefix: 'PUBLIC',
			dir: '..',
		},
		alias: {
			$actions: 'src/lib/actions',
			$components: 'src/lib/components',
			$routes: 'src/routes',
			$static: 'static',
			$stores: 'src/lib/stores',
			$styles: 'src/lib/styles',
			$transitions: 'src/lib/transitions',
			$types: 'src/lib/types',
			$utils: 'src/lib/utils',
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
