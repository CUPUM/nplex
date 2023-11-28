import { getEventLang, getEventLocale } from '$lib/i18n/event';

export const load = async (event) => {
	return {
		lang: getEventLang(event),
		locale: getEventLocale(event),
		mode: event.data.mode,
		user: event.data.user,
	} satisfies App.PageData;
};
