import { sourceLanguageTag } from '$i18n/runtime';
import { z } from 'zod';

export const prerender = true;

const metadataSchema = z.object({
	title: z.string(),
});

export const load = async (event) => {
	const md = await import(`./${event.params.lang ?? sourceLanguageTag}.mdx`);
	const metadata = metadataSchema.parse(md.metadata || {});
	return {
		...metadata,
		content: md.default,
	};
};
