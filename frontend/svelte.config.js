import preprocess from 'svelte-preprocess';
import path from 'path';
import node from '@sveltejs/adapter-node';
import fg from 'fast-glob';
import { execSync } from 'child_process';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),
	extensions: ['.svelte'],
	kit: {
		adapter: node(),
		vite: {
			plugins: [
				{
					name: 'generator-scripts-build',
					apply: 'build',
					async buildStart() {
						try {
							const scriptFiles = await fg('scripts/*.ts');
							scriptFiles.forEach((script) => {
								console.log(`Generating asset from ${script}`);
								execSync(`esmo ${script}`);
							});
						}
						catch (error) {
							console.error(
								'Error occured while trying to run generator scripts from vite plugin.',
								error
							);
						}
					}
				},
				{
					/**
					 * Hook called during dev to configure vite's server (does not apply to build/prod)
					 */
					name: 'generator-scripts-dev',
					apply: 'serve',
					configureServer(server) {
						const listener = async (abspath) => {
							const utils = ['colors.ts', 'sizes.ts'];
							/**
							 * Associate additionnal files to the respective script they should trigger when modified
							 */
							// const associations = new Map([
							// 	['colors.ts', 'script to execute...']
							// ])
							if (abspath.startsWith(path.resolve('scripts'))) {
								console.log(`Generating asset from ${abspath.replace(path.resolve('.'), '')}...`);
								execSync(`esmo ${abspath}`);
							}
							if (
								abspath.startsWith(path.resolve('src', 'utils', 'icons')) &&
								path.extname(abspath).toLocaleLowerCase() === '.svg'
							) {
								console.log(`Generating icons definition from changed svg source...`);
								execSync(`esmo ${path.resolve('scripts', 'ICONS.ts')}`);
							}
							if (
								utils
									.map((filename) => path.resolve('src', 'utils', filename))
									.includes(abspath)
							) {
								console.log(`Generating CSS vars definitions from changed ts source...`);
								execSync(`esmo ${path.resolve('scripts', 'CSS_VARS.ts')}`);
							}
						};
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
					$icons: path.resolve('static/icons'),
					$apitypes: path.resolve('.svelte-kit/types/src/routes/api')
				}
			},
			// Préfixes des variables .env à exposer ('' n'est pas valide, https://vitejs.dev/config/#envdir)
			envPrefix: 'EXPOSED'
		}
	},
	compilerOptions: {
		cssHash: ({ hash, css, /* name, filename */ }) => `nplex-${hash(css)}`
	}
};

export default config;
