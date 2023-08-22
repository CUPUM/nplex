import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { LOCALE_DEFAULT, LOCALE_PARAM } from './constants';
import { isLocale } from './validation';

/**
 * Parse an event's request metadata and try to extract a valid locale.
 */
export function getEventLocale<E extends RequestEvent | ServerLoadEvent | LoadEvent>(event: E) {
	const param = event.params[LOCALE_PARAM];
	if (param && isLocale(param)) {
		return param;
	}
	return LOCALE_DEFAULT;
}
