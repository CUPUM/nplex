import { PRESENTATION_DEFAULT } from '$lib/presentation/constants';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async (event) => {
	return {
		user: event.locals.user,
		presentation: PRESENTATION_DEFAULT,
	};
});
