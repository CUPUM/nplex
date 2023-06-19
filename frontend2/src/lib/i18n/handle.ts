import { enhance } from '$app/forms';
import { STATUS_CODE } from '$lib/utils/status';
import {
	fail,
	type Action,
	type Handle,
	type LoadEvent,
	type RequestEvent,
	type ServerLoadEvent,
} from '@sveltejs/kit';
import {
	LOCALE_COOKIE_NAME,
	LOCALE_DEFAULT,
	LOCALE_INPUT_NAME,
	LOCALE_PARAM_NAME,
	type Locale,
} from './constants';
import { isSupportedLocale } from './validation';

/**
 * Finds the first valid locale among request's headers by passing through in order of preference,
 * if any.
 */
function getAcceptLanguageLocale(event: RequestEvent) {
	const headers = event.request.headers.get('Accept-Language')?.split(',');
	if (headers) {
		const header = headers.find((l): l is Locale => {
			return isSupportedLocale(l);
		});
		if (header) {
			return header;
		}
	}
	return null;
}

/**
 * Parses event cookies to look for defined locale and returns valid locale if any is found.
 * Alternatively, deletes cookie if invalid locale is found.
 */
function getCookieLocale(event: RequestEvent) {
	const cookie = event.cookies.get(LOCALE_COOKIE_NAME);
	if (isSupportedLocale(cookie)) {
		return cookie;
	}
	if (cookie) {
		event.cookies.delete(LOCALE_COOKIE_NAME);
	}
	return null;
}

/**
 * Parse an event's request metadata and try to identify a valid locale.
 */
export function getEventLocale<E extends RequestEvent | ServerLoadEvent | LoadEvent>(event: E) {
	const param = event.params[LOCALE_PARAM_NAME];
	if (isSupportedLocale(param)) {
		return param;
	}
	return LOCALE_DEFAULT;
	// return getAcceptLanguageLocale(event) ?? LOCALE_DEFAULT;
}

/**
 * Sets event.locals.locale for downstream resolving and sets cookie.
 */
function setEventLocale<E extends RequestEvent | ServerLoadEvent>(event: E, locale: Locale) {
	// event.cookies.set(LOCALE_COOKIE_NAME, locale, { maxAge: LOCALE_COOKIE_MAXAGE, path: '/' });
	event.locals.locale = locale;
}

/**
 * Handle hook handler to manage i18n persistence. Checks for cookie, else falls back to browser
 * request header, else falls back to default app locale.
 */
export const handleLocale = (async ({ event, resolve }) => {
	const locale = getEventLocale(event);
	setEventLocale(event, locale);
	// Set html lang attribute using event.locals to account for possible different value
	// set by downstream action resolve.
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%lang%', event.locals.locale);
		},
	});
	return res;
}) satisfies Handle;

/**
 * Form action handler for allowing users to customize their locale setting.
 */
export const actionLocale = (async (event) => {
	const formData = await event.request.formData();
	const input = formData.get(LOCALE_INPUT_NAME)?.toString();
	if (!isSupportedLocale(input)) {
		return fail(STATUS_CODE.BAD_REQUEST);
	}
	setEventLocale(event, input);
	return event.locals.locale;
}) satisfies Action;

/**
 * Update root element lang attribute without requiring navigation.
 */
export const enhanceLocale = ((form) => {
	return enhance(form, async (event) => {
		return async ({ result, update }) => {
			// Keep synchronised with actionLocale's results.
			if (
				result.type === 'success' &&
				result.data &&
				typeof result.data === 'string' &&
				isSupportedLocale(result.data)
			) {
				document.documentElement.setAttribute('lang', result.data);
			}
			// invalidateAll();
			update();
		};
	});
}) satisfies typeof enhance;
