import { sourceLanguageTag } from '$i18n/runtime';
import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { LANG_PARAM, LOCALE_DEFAULT, LOCALE_PARAM } from './constants';
import { isLang, isLocale } from './validation';

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

export function getEventLang<E extends RequestEvent | LoadEvent>(event: E) {
	const param = event.params[LANG_PARAM];
	if (param && isLang(param)) {
		return param;
	}
	return sourceLanguageTag;
}
