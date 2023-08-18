import { getEventLocale } from '$lib/i18n/event';

export async function load(event) {
	// event.depends('i18n:locale');

	return {
		// Force dependency on event.params. Else if we just get event.locals.locale, the load function doesnt re-run.
		locale: getEventLocale(event),
		// theme: ,
	};
}
