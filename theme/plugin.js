import config from './config.js';

/**
 * Look for customized (partial) config to merge, else fall back to default config.
 *
 * @returns {import('./config').Config}
 */
function getConfig() {
	// Get config ?? default config
	// const userConfig = readFileSync()
	return config;
}

/**
 * Update generated theme assets using got got config.
 */
function updateTheme() {
	const config = getConfig();
	console.log('Updating themes assets');
	// Generate scss
	// Generate js typed utilities (types based on virtual module?)
}

/**
 * Vite plugin to generate theming utilities usable both in scss and js. The plugin composes
 * corresponding scss styles and js constants as well as prepends scss style blocks with the
 * appropriate imports to make various mixins and utilities available.
 *
 * Theming values can be customized by providing a `themes.config.js` config file in the root of
 * your project, alongside your vite config.
 *
 * @returns {import('vite').Plugin}
 */
function theme() {
	return {
		name: 'vite-plugin-theme',
		config(config) {
			console.log(import.meta.url);
			console.log('Config modified!');
			updateTheme();
			return {
				css: {
					preprocessorOptions: {
						// prepend utils imports
						// scss: {
						// 	additionalData: `@import '...';`
						// }
					},
				},
			};
		},
		buildStart() {
			console.log('Build start!');
			updateTheme();
		},
	};
}

export default theme;
