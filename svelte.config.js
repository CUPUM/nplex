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
			rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
			remarkPlugins: [remarkHeadings],
		}),
	],
	kit: {
		adapter: adapter(),
		alias: {
			$i18n: 'src/lib/i18n/generated',
			$content: 'src/content',
		},
	},
	compilerOptions: {
		cssHash: (styles) => `nplex-${styles.hash(styles.css)}`, // Only applies to prod.
	},
};

export default config;

/**
 * Scoping component styles to a predefined layer to control cascade ordering.
 *
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
