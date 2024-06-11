import { headingsMetadataSchema } from '$lib/markdown/validation';
import { z } from 'zod';

export const prerender = true;

const metadataSchema = headingsMetadataSchema.extend({
	title: z.string(),
});

export const load = async (event) => {
	const md = await import(`./${event.params.lang}.mdx`);
	const metadata = metadataSchema.parse(md.metadata || {});
	const content = md.default;
	return {
		...metadata,
		content,
	};
};
