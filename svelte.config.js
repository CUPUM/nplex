import { preprocessMeltUI } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sequence from 'svelte-sequential-preprocessor';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
	extensions: ['.svelte', '.markdoc'],
	kit: {
		adapter: adapter(),
		alias: {
			$i18n: 'src/lib/i18n/generated',
		},
	},
	compilerOptions: {
		// Only applies to prod.
		cssHash: (styles) => `nplex-${styles.hash(styles.css)}`,
	},
};

export default config;
