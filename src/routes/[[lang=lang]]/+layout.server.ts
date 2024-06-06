import { getEventLang } from '$lib/i18n/event';
import { PRESENTATION_DEFAULT } from '$lib/presentation/constants';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async (event) => {
	const lang = getEventLang(event);

	return {
		lang,
		user: event.locals.user,
		presentation: PRESENTATION_DEFAULT,
	};
});
