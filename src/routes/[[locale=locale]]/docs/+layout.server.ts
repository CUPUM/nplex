import { SETOUTS } from '$lib/setout/constants';
import { docImportSchema, type DocMetadata } from './schema';

type Doc = DocMetadata & { slug: string; type: string };

async function getDocs() {
	const docs: Record<string, Doc[]> = {};
	const paths = import.meta.glob('/src/docs/**/*.mdx', { eager: true });
	for (const path in paths) {
		const doc = docImportSchema.safeParse(paths[path]);
		if (!doc.success) {
			continue;
		}
		const tail = path.replace('/src/docs/', '');
		const split = tail.split('/');
		if (split.length !== 2) {
			continue;
		}
		const type = split[0];
		const slug = tail.split('.')[0];
		if (!docs[type]) {
			docs[type] = [];
		}
		docs[type].push({
			...doc.data.metadata,
			slug,
			type,
		});
	}
	return docs;
}

export const load = async (event) => {
	const docs = getDocs();
	// const components = import.meta.glob('/src')
	return {
		docs,
		setout: event.locals.setSetout(SETOUTS.FULL_WIDTH),
	};
};
