import { docImportSchema, globDocs } from '../utils';

export const load = async (event) => {
	const paths = globDocs();
	const doc = paths[`./${event.params.doc}.svx`];
	const parsed = docImportSchema.parse(doc);
	return {
		metadata: parsed.metadata,
		doc: parsed.default,
	};
};
