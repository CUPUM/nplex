import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: vercel(),
		env: {
			dir: '..',
		},
	},
	compilerOptions: {
		cssHash: (styles) => `nplex-${styles.hash(styles.css)}`, // Only applies to prod.
	},
};

export default config;
