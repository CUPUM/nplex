import preprocess from 'svelte-preprocess';
import path from 'path';
import node from '@sveltejs/adapter-node';
import fg from 'fast-glob';
import { execSync } from 'child_process';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	extensions: ['.svelte'],
	kit: {
		target: 'body',
		adapter: node(),
		vite: {
			plugins: [
				{
					name: 'generator-scripts',
					async buildStart() {
						try {
							const scriptFiles = await fg('scripts/*.ts');
							scriptFiles.forEach(script => {
								execSync(`esmo ${script}`);
							});
						}
						catch (error) {
							console.error('Error occured while trying to run generator scripts from vite plugin.', error);
						}
					},
					configureServer(server) {
						const listener = async (abspath) => {
							if (abspath.startsWith(path.resolve('scripts'))) {
								execSync(`esmo ${abspath}`);
							}
						}
						server.watcher.on('add', listener);
						server.watcher.on('change', listener);
					}
				}
			],
			resolve: {
				alias: {
					$actions: path.resolve('src/actions'),
					$components: path.resolve('src/components'),
					$stores: path.resolve('src/stores'),
					$styles: path.resolve('src/styles'),
					$transitions: path.resolve('src/transitions'),
					$routes: path.resolve('src/routes'),
					$utils: path.resolve('src/utils'),
					$icons: path.resolve('static/icons')
				}
			},
			// Préfixes des variables .env à exposer ('' n'est pas valide, https://vitejs.dev/config/#envdir)
			envPrefix: 'EXPOSED'
		}
	},
	compilerOptions: {
		cssHash: ({ hash, css, name, filename }) => `nplex-${hash(css)}`
	}
};

export default config;
