import { getEventLocale } from '$lib/i18n/event';

export async function load(event) {
	return {
		locale: getEventLocale(event),
		mode: event.data.mode,
		setout: event.data.setout,
		user: event.data.user,
	} satisfies App.PageData;
}
