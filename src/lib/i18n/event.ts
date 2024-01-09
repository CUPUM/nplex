import { isAvailableLanguageTag, sourceLanguageTag } from '$i18n/runtime';
import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';

/**
 * Consistently retrieve an event's lang to ensure symmetrical percolation across SSR and client.
 */
export function getEventLang<E extends RequestEvent | LoadEvent | ServerLoadEvent>(event: E) {
	if (isAvailableLanguageTag(event.params.lang)) {
		return event.params.lang;
	}
	return sourceLanguageTag;
}
