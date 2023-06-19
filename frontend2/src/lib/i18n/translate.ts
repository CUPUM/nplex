import { page } from '$app/stores';
import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { derived } from 'svelte/store';
import { LOCALE_PARAM_NAME, type Locale, type LocaleDefault } from './constants';
import { getEventLocale } from './handle';

/**
 * Derived store to compose locale-specific href strings.
 *
 * @example
 * 	<a hreflang={$page.data.locale} href={$thref('about')}>
 * 		...
 * 	</a>;
 * 	// or, for targeting specific locales
 * 	<a hreflang={'fr'} href={$thref('about', 'fr')}>
 * 		...
 * 	</a>;
 */
export const thref = derived(page, ($page) => {
	function localizeHref<H extends string>(href: H, locale: Locale = $page.data.locale) {
		const localeString: `/${Locale}` | '' = LOCALE_PARAM_NAME in $page.params ? `/${locale}` : '';
		return `${localeString}${href}` as const;
	}
	return localizeHref;
});

// export function getEventHref() {}

/**
 * Function to access a given translation object's message using dot notation and properly expecting
 * formatting parameters if needed.
 */
function createFormat<D extends unknown>(dictionnary: D extends object ? D : never) {
	// function format(messageKey: string, formatOptions?: any) {}
	return dictionnary;
}

/**
 * Create a reactive formatting function that derives the given translations' dictionnary from
 * $page.data.locale.
 */
function createReactiveFormat<T>(
	translations: Record<LocaleDefault, T> & Record<Locale, T & object>
) {
	return derived(page, ($page) => {
		return createFormat(translations[$page.data.locale]);
	});
}

/**
 * Utility function to automatically access the contextually accurate translation in a series of
 * language-specific homomorphic dictionnaries. Defined dictionnary messages can be namespaced at
 * will and then accessed through their dot-notation path. Translations are either:
 *
 * - A translation store when in browser environment (derived from detected
 *   $page.params[localeParam]);
 * - A translation object in server or universal environment;
 *
 * Note that the `& object` in the second record type of the intersection prevents further inference
 * of `T` and instead allows the default locale's dictionnary to serve as the source of truth.
 *
 * @example
 * 	const t = createTranslation(translationsObject)
 * 	...
 * 	<h1>{$t('header.title')}</h1>
 *
 * @warning Ugly function overloading is only way to narrow generic type in returned value.
 */
export function createTranslation<T>(
	translations: Record<LocaleDefault, T> & Record<Locale, T & object>
): ReturnType<typeof createReactiveFormat<T>>;
export function createTranslation<T, C extends RequestEvent | ServerLoadEvent | LoadEvent>(
	translations: Record<LocaleDefault, T> & Record<Locale, T & object>,
	context: C
): ReturnType<typeof createFormat<T>>;
export function createTranslation<T, C extends RequestEvent | ServerLoadEvent | LoadEvent>(
	/**
	 * Dictionnaries for each locales, must abide by the shape of the default locale's dictionnary.
	 */
	translations: Record<LocaleDefault, T> & Record<Locale, T & object>,
	/**
	 * Context establishing the locale to use.
	 */
	context?: C
): ReturnType<typeof createFormat<T>> {
	if (context && typeof context === 'object') {
		// If in a server event environement.
		if ('locals' in context) {
			return createFormat(translations[context.locals.locale]) as any;
		}
		// If in universal environment.
		if ('params' in context) {
			const lang = getEventLocale(context);
			return createFormat(translations[lang]) as any;
		}
	}
	// Else, if in client environnement.
	return createReactiveFormat(translations) as any;
}
