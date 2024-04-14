import { ARRANGEMENTS } from '$lib/arrangement/constants';
import { getDocs, getIndexes } from './utils';

export const load = async (event) => {
	const docs = getDocs();
	const indexes = getIndexes();
	return {
		docs,
		indexes,
		mode: event.locals.mode,
		setout: event.locals.setArrangement(ARRANGEMENTS.FULL_WIDTH),
	};
};
