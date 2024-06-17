import { availableLanguageTags, sourceLanguageTag } from '$i18n/runtime';
import { headingsMetadataSchema } from '$lib/markdown/validation';
import { z } from 'zod';

export const prerender = true;

export function entries() {
	return availableLanguageTags.map((lang) => ({ lang }));
}

const metadataSchema = headingsMetadataSchema.extend({
	title: z.string(),
});

export const load = async (event) => {
	const md = await import(`./${event.params.lang ?? sourceLanguageTag}.mdx`);
	const metadata = metadataSchema.parse(md.metadata || {});
	const content = md.default;
	return {
		...metadata,
		content,
	};
};
