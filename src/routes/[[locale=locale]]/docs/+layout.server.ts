import { SETOUTS } from '$lib/setout/constants';
import { getDocs } from './utils';

export const load = async (event) => {
	const docs = getDocs();
	return {
		docs,
		setout: event.locals.setSetout(SETOUTS.FULL_WIDTH),
	};
};
