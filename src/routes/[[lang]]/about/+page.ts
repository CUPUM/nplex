import { languageTag } from '$i18n/runtime';
import { aboutMetadataSchema } from '$lib/crud/validation/content';

// export const prerender = 'auto';

export const load = async (event) => {
	console.log(event);
	const md = await import(`$content/about/${languageTag()}.mdx`);
	const metadata = aboutMetadataSchema.parse(md.metadata || {});
	return {
		...metadata,
		content: md.default,
	};
};
