import { globIndexes, indexImportSchema } from '../utils';

export const load = async (event) => {
	const paths = globIndexes();
	const index = paths[`./${event.params.section}/index.svx`];
	const parsed = indexImportSchema.parse(index);
	return {
		doc: parsed.default,
	};
};
