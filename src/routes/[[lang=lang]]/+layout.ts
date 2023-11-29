import { getEventLang } from '$lib/i18n/event';

export const load = async (event) => {
	return {
		lang: getEventLang(event),
		mode: event.data.mode,
		user: event.data.user,
	};
};
