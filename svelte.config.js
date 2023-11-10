import { preprocessMeltUI } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import sequence from 'svelte-sequential-preprocessor';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx', '.mdx'],
			remarkPlugins: [remarkToc],
			rehypePlugins: [rehypeSlug],
		}),
		preprocessMeltUI(),
	]),
	extensions: ['.svelte', '.svx', '.mdx'],
	kit: {
		adapter: adapter(),
	},
	compilerOptions: {
		cssHash: (styles) => `nplex-${styles.hash(styles.css)}`, // Only applies to prod.
	},
};

export default config;
