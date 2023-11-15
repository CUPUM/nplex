import { preprocessMeltUI } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import mdsvexamples from 'mdsvexamples';
import rehypeSlug from 'rehype-slug';
// import remarkToc from 'remark-toc';
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
		mdsvex({
			extensions: md,
			remarkPlugins: [
				// remarkToc,
				[
					mdsvexamples,
					{
						defaults: {
							Wrapper: '/src/routes/[[locale=locale]]/docs/Preview.svelte',
						},
					},
				],
			],
			rehypePlugins: [rehypeSlug],
		}),
		preprocessMeltUI(),
	]),
	extensions: ['.svelte', ...md],
	kit: {
		adapter: adapter(),
	},
	compilerOptions: {
		cssHash: (styles) => `nplex-${styles.hash(styles.css)}`, // Only applies to prod.
	},
};

export default config;
