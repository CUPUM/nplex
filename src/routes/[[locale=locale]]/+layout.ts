import { getEventLocale } from '$lib/i18n/event.js';

export async function load(event) {
	const locale = getEventLocale(event);

	return {
		locale,
	};
}
