import { getEventLocale } from '$lib/i18n/event.js';

export async function load(event) {
	return {
		locale: getEventLocale(event),
		mode: event.data.mode,
		user: event.data.user,
	} satisfies App.PageData;
}
