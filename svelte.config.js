import { preprocessMeltUI } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sequence from 'svelte-sequential-preprocessor';

const md = ['.svx', '.mdx'];

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([
		vitePreprocess(),
		// mdsvex({
		// 	extensions: md,
		// 	remarkPlugins: [
		// 		// remarkToc,
		// 		[
		// 			mdsvexamples,
		// 			{
		// 				defaults: {
		// 					Wrapper: '/src/routes/[[lang=lang]]/docs/Preview.svelte',
		// 				},
		// 			},
		// 		],
		// 	],
		// 	rehypePlugins: [rehypeSlug],
		// }),
		preprocessMeltUI(),
	]),
	extensions: ['.svelte', ...md],
	kit: {
		adapter: adapter(),
		alias: {
			$i18n: 'src/i18n',
			$styles: 'src/styles',
		},
	},
	vitePlugin: {
		inspector: true,
	},
	compilerOptions: {
		cssHash: (styles) => `nplex-${styles.hash(styles.css)}`, // Only applies to prod.
	},
};

export default config;
