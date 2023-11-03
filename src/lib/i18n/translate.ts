import { page } from '$app/stores';
import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { derived, type Readable } from 'svelte/store';
import { LOCALE_DEFAULT, type Locale, type LocaleDefault } from './constants';
import { getEventLocale } from './event';

type Translations<T> = Record<LocaleDefault, T> & Record<Locale, T & object>;

// /**
//  * To do: fix typing.
//  */
// type Dictionnary<T = unknown> = Record<string | number | symbol, T>;

// /**
//  * To do: fix typing.
//  */
// type Dictionnaries<D extends Dictionnary> = {
// 	[K in keyof D]: D[K] extends Locale
// 		? Translations<D[K]>
// 		: D[K] extends Dictionnary
// 		? Dictionnaries<D[K]>
// 		: never;
// };

/**
 * Get dictionnary by locale key, fall back to default locale if not available.
 */
function safeGetLocaleDictionnary<T>(
	translations: Translations<T>,
	locale: Locale | null | undefined
) {
	return translations[locale ?? LOCALE_DEFAULT] ?? translations[LOCALE_DEFAULT];
}

/**
 * Create a reactive formatting function that derives the given translations' dictionnary from
 * $page.data.locale.
 */
function createDerivedTranslations<T>(translations: Translations<T>) {
	return derived(page, ($page) => {
		return safeGetLocaleDictionnary(translations, $page.data.locale);
	});
}

/**
 * Utility function to automatically access the contextually (reactive in `.svelte` files and static
 * in load functions) accurate translation in a series of language-specific homomorphic
 * dictionnaries. Defined dictionnary messages can be namespaced at will and then accessed through
 * their dot-notation path. Translations are either:
 *
 * - In component environements (.svelte files): a store derived from detected
 *   $page.params[localeParam];
 * - A translation object in server or universal environment;
 *
 * Note that the `& object` in the second record type of the intersection prevents further inference
 * of `T` and instead allows the default locale's dictionnary to serve as the source of truth.
 *
 * @example Const t = createTranslation(translationsObject) ... <h1>{$t('header.title')}</h1>
 *
 * @warning Ugly function overloading is only way to narrow generic type in returned value.
 * @see https://github.com/microsoft/TypeScript/issues/33014
 */
export function createTranslations<T>(translations: Translations<T>): Readable<T>;
export function createTranslations<T, C extends RequestEvent | ServerLoadEvent | LoadEvent>(
	translations: Translations<T>,
	context: C
): T;
export function createTranslations<T, C extends RequestEvent | ServerLoadEvent | LoadEvent>(
	/**
	 * Dictionnaries for each locales, must abide by the shape of the default locale's dictionnary.
	 */
	translations: Translations<T>,
	/**
	 * Context establishing the locale to use.
	 */
	context?: C
) {
	if (context && typeof context === 'object') {
		// If in a server event environement.
		if ('locals' in context) {
			return translations[context.locals.locale];
		}
		// If in universal environment.
		if ('params' in context) {
			const locale = getEventLocale(context);
			return translations[locale];
		}
	}
	// Else, if in client environnement.
	return createDerivedTranslations(translations);
}

export function eventCreateTranslations(event: RequestEvent | ServerLoadEvent | LoadEvent) {
	/**
	 * Event-localized translations dictionnary.
	 *
	 * @see {@link createTranslations}
	 */
	return function eventTranslations<T>(translations: Translations<T>) {
		return createTranslations(translations, event);
	};
}

/**
 * Simple typed helper to define locale-isomorphic translations dictionnary without creating new
 * stores or anything.
 */
export function defineTranslations<T>(translations: Translations<T>) {
	return translations;
}
