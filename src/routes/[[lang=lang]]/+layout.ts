import { getEventLang } from '$lib/i18n/event';

export const load = async (event) => {
	const lang = getEventLang(event);
	return {
		lang,
		mode: event.data.mode,
		user: event.data.user,
	};
};
