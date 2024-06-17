import { availableLanguageTags, sourceLanguageTag } from '$i18n/runtime';
import { z } from 'zod';

export const prerender = true;

export function entries() {
	return availableLanguageTags.map((lang) => ({ lang }));
}

const metadataSchema = z.object({
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
