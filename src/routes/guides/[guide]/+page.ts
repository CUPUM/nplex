import { languageTag } from '$i18n/runtime';
import { guideMetadataSchema } from '$lib/crud/validation/content';

export const prerender = 'auto';

export const load = async (event) => {
	const md = await import(`$content/guides/${event.params.guide}/${languageTag()}.mdx`);
	const metadata = guideMetadataSchema.parse(md.metadata || {});
	return {
		...metadata,
		content: md.default,
	};
};
