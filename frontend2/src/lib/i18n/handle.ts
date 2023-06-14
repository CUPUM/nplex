import { enhance } from '$app/forms';
import { STATUS_CODE } from '$lib/utils/status';
import { fail, type Action, type Handle, type RequestEvent } from '@sveltejs/kit';
import { LOCALE_DEFAULT, isLocale, type Locale } from './locales';

// const LOCALE_COOKIE_NAME = 'locale';
// const LOCALE_COOKIE_MAXAGE = 34_560_000; // 400 days, maximum allowed
const LOCALE_PARAM_NAME = 'locale';

export const LOCALE_INPUT_NAME = 'locale';

/**
 * Parse an event's request metadata and try to identify a valid locale.
 */
function getEventLocale<E extends RequestEvent>(event: E) {
	// const cookie = event.cookies.get(LOCALE_COOKIE_NAME);
	// if (isLocale(cookie)) {
	// 	return cookie;
	// }
	// if (cookie) {
	// 	event.cookies.delete(LOCALE_COOKIE_NAME);
	// }
	const param = event.params[LOCALE_PARAM_NAME];
	if (isLocale(param)) {
		return param;
	}
	return LOCALE_DEFAULT;
	// const headers = event.request.headers.get('Accept-Language')?.split(',');
	// if (headers) {
	// 	const header = headers.find((l): l is Locale => {
	// 		return isLocale(l);
	// 	});
	// 	if (header) {
	// 		return header;
	// 	}
	// }
	// return localeDefault;
}

/**
 * Sets event.locals.locale for downstream resolving and sets cookie.
 */
function setEventLocale<E extends RequestEvent>(event: E, locale: Locale) {
	// event.cookies.set(LOCALE_COOKIE_NAME, locale, { maxAge: LOCALE_COOKIE_MAXAGE, path: '/' });
	event.locals.locale = locale;
}

/**
 * Handle hook handler to manage i18n persistence. Checks for cookie, else falls back to browser
 * request header, else falls back to default app locale.
 */
export const handleLocale = (async ({ event, resolve }) => {
	const locale = getEventLocale(event);
	console.log('Handle locale: ', locale);
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
	if (!isLocale(input)) {
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
				isLocale(result.data)
			) {
				document.documentElement.setAttribute('lang', result.data);
			}
			// invalidateAll();
			update();
		};
	});
}) satisfies typeof enhance;
