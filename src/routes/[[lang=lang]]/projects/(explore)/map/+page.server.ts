import { PRESENTATIONS } from '$lib/presentation/constants';
import { setEventPresentation } from '$lib/presentation/event';

export const load = async (event) => {
	return {
		...setEventPresentation(event, PRESENTATIONS.FULL_SCREEN),
	};
};
