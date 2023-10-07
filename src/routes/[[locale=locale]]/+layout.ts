import { getEventLocale } from '$lib/i18n/event';

export async function load(event) {
	return {
		locale: getEventLocale(event),
		mode: event.data.mode,
		user: event.data.user,
	} satisfies App.PageData;
}
