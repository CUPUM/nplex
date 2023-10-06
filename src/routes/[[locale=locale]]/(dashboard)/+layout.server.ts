import { SETOUTS } from '$lib/setout/constants';

export const load = async (event) => {
	return {
		setout: event.locals.setSetout(SETOUTS.FULL_WIDTH),
	};
};
