import { sourceLanguageTag } from '$i18n/runtime';
import { guideMetadataSchema } from '$lib/crud/validation/content';

export const prerender = 'auto';

export const load = async (event) => {
	const md = await import(
		`$content/guides/${event.params.guide}/${event.params.lang ?? sourceLanguageTag}.mdx`
	);
	const metadata = guideMetadataSchema.parse(md.metadata || {});
	return {
		...metadata,
		content: md.default,
	};
};
