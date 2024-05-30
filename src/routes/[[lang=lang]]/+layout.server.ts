import { getEventLang } from '$lib/i18n/event';
import { PRESENTATION_DEFAULT } from '$lib/presentation/constants';

export const load = async (event) => {
	const lang = getEventLang(event);

	return {
		lang,
		user: event.locals.user,
		presentation: PRESENTATION_DEFAULT,
	};
};
