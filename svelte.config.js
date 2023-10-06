import { preprocessMeltUI } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import sequence from 'svelte-sequential-preprocessor';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
	kit: {
		adapter: adapter(),
		alias: {
			'styled-system': './styled-system/*',
		},
		// typescript: {
		// 	config: (config) => {
		// 		// https://panda-css.com/docs/installation/svelte#troubleshooting
		// 		config.include.push('../styled-system');
		// 		return config;
		// 	},
		// },
	},
	compilerOptions: {
		cssHash: (styles) => `nplex-${styles.hash(styles.css)}`, // Only applies to prod.
	},
};

export default config;
