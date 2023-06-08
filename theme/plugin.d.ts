export default theme;
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
declare function theme(): import('vite').Plugin;
//# sourceMappingURL=plugin.d.ts.map