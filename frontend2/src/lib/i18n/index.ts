// import { fail, type Handle, type LoadEvent, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
// import type { ValueOf } from 'type-fest';

// /**
//  * Create project-wide utilities for i18n concerns.
//  */
// export function createI18n<
// 	Locale extends string,
// 	Locales extends Record<string, Locale>,
// 	I18nOptions extends {
// 		locales: Locales;
// 		localeDefault: ValueOf<Locales> & string;
// 		localeParam: string;
// 		// noParam?: 'use-default' | 'use-headers';
// 	}
// >(options: I18nOptions) {
// 	const localesArray = Object.values(options.locales);

// 	function isValidLocale(maybeLocale?: string): maybeLocale is Locale {
// 		if (maybeLocale == null) {
// 			return false;
// 		}
// 		return localesArray.indexOf(maybeLocale as any) > -1;
// 	}

// 	/**
// 	 * Parse an event's request metadata and try to identify a valid locale.
// 	 */
// 	function getEventLocale<E extends RequestEvent | LoadEvent | ServerLoadEvent>(event: E) {
// 		const param = event.params[options.localeParam];
// 		if (isValidLocale(param)) {
// 			return param;
// 		}
// 		return options.localeDefault;
// 		// return getAcceptLanguageLocale(event) ?? LOCALE_DEFAULT;
// 	}

// 	/**
// 	 * Sets event.locals.locale for downstream resolving and sets cookie.
// 	 */
// 	function setEventLocale<E extends RequestEvent | ServerLoadEvent>(event: E, locale: Locale) {
// 		// event.cookies.set(LOCALE_COOKIE_NAME, locale, { maxAge: LOCALE_COOKIE_MAXAGE, path: '/' });
// 		event.locals.locale = locale as any;
// 	}

// 	/**
// 	 * Handle hook handler to manage i18n persistence. Checks for cookie, else falls back to browser
// 	 * request header, else falls back to default app locale.
// 	 */
// 	const handleLocale = (async ({ event, resolve }) => {
// 		const locale = getEventLocale(event);
// 		setEventLocale(event, locale);
// 		// Set html lang attribute using event.locals to account for possible different value
// 		// set by downstream action resolve.
// 		const res = resolve(event, {
// 			transformPageChunk(input) {
// 				return input.html.replace('%lang%', event.locals.locale);
// 			},
// 		});
// 		return res;
// 	}) satisfies Handle;

// 	/**
//  * Form action handler for allowing users to customize their locale setting.
//  */
// const actionLocale = (async (event) => {
// 	const formData = await event.request.formData();
// 	const input = formData.get(LOCALE_INPUT_NAME)?.toString();
// 	if (!isValidLocale(input)) {
// 		return fail(STATUS_CODE.BAD_REQUEST);
// 	}
// 	setEventLocale(event, input);
// 	return event.locals.locale;
// }) satisfies Action;

// /**
//  * Update root element lang attribute without requiring navigation.
//  */
// const enhanceLocale = ((form) => {
// 	return enhance(form, async (event) => {
// 		return async ({ result, update }) => {
// 			// Keep synchronised with actionLocale's results.
// 			if (
// 				result.type === 'success' &&
// 				result.data &&
// 				typeof result.data === 'string' &&
// 				isLocale(result.data)
// 			) {
// 				document.documentElement.setAttribute('lang', result.data);
// 			}
// 			// invalidateAll();
// 			update();
// 		};
// 	});
// }) satisfies typeof enhance;

// 	function createTranslation<T>() {
// 		return '';
// 	}

// 	return {
// 		/**
// 		 * Enum-like valid project locales.
// 		 */
// 		locales: options.locales,
// 		/**
// 		 * Configured default or fallback locale.
// 		 */
// 		localeDefault: options.localeDefault,
// 		localesArray,
// 		isValidLocale,
// 		createTranslation,
// 	} as const;
// }

// const i18n = createI18n({
// 	locales: {
// 		french: 'fr',
// 		english: 'en',
// 	},
// 	localeDefault: 'fr',
// });
