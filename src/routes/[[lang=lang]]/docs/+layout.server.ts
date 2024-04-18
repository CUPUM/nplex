import { PRESENTATIONS } from '$lib/presentation/constants';
import { getDocs, getIndexes } from './utils';

export const load = async (event) => {
	const docs = getDocs();
	const indexes = getIndexes();
	return {
		docs,
		indexes,
		mode: event.locals.mode,
		setout: event.locals.setArrangement(PRESENTATIONS.FULL_WIDTH),
	};
};
