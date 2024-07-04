import { sourceLanguageTag } from '$i18n/runtime';
import { aboutMetadataSchema } from '$lib/crud/validation/content';

export const prerender = 'auto';

export const load = async (event) => {
	const md = await import(`$content/about/${event.params.lang ?? sourceLanguageTag}.mdx`);
	const metadata = aboutMetadataSchema.parse(md.metadata || {});
	return {
		...metadata,
		content: md.default,
	};
};
