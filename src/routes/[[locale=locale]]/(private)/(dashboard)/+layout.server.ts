import { SETOUTS } from '$lib/setout/constants';

export const load = async (event) => {
	return {
		setout: SETOUTS.FULL_WIDTH,
	};
};
