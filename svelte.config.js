import adapter from '@sveltejs/adapter-vercel';
import remarkHeadings from '@sveltinio/remark-headings';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: ['.svelte', '.mdx'],
	preprocess: [
		csslayer(),
		mdsvex({
			extension: 'mdx',
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
			remarkPlugins: [remarkHeadings],
		}),
	],
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

/**
 * @see https://github.com/sveltejs/svelte/issues/11345
 */
function csslayer() {
	return {
		name: 'svelte-css-layer',
		style: ({ content }) => {
			return {
				code: `@layer components { ${content} }`,
			};
		},
	};
}
