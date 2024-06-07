import { z } from 'zod';

const prerender = true;

const metadataSchema = z.object({
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
