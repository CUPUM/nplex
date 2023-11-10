import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { docMetadataSchema } from '../schema';

export const load = async (event) => {
	try {
		console.log(event.params.doc);
		const doc = await import(/* @vite-ignore */ `/src/docs/${event.params.doc}.mdx`);
		const metadata = docMetadataSchema.safeParse(doc.metadata);
		if (!metadata.success) {
			console.error(metadata.error);
			throw new Error('Missing metadata in markdown frontmatter.');
		}
		return {
			content: doc.default,
			meta: metadata.data,
		};
	} catch (e) {
		throw error(STATUS_CODES.NOT_FOUND);
	}
};
