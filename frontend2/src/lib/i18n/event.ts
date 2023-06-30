import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { LOCALE_DEFAULT, LOCALE_PARAM_NAME, type Locale } from './constants';
import { localeSchema } from './validation';

/**
 * Parse an event's request metadata and try to identify a valid locale.
 */
export function getEventLocale<E extends RequestEvent | ServerLoadEvent | LoadEvent>(event: E) {
	const param = event.params[LOCALE_PARAM_NAME];
	return localeSchema.catch(LOCALE_DEFAULT).parse(param) as Locale;
}
