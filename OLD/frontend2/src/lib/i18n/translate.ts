import { page } from '$app/stores';
import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { derived, type Readable } from 'svelte/store';
import {
	LOCALE_DEFAULT,
	PLURAL_THRESHOLDS,
	PLURAL_THRESHOLDS_DEFAULT,
	PLURAL_THRESHOLDS_NUMERABLE_ARR,
	type Locale,
	type LocaleDefault,
	type PluralThreshold,
	type PluralThresholdNumerable,
} from './constants';
import { getEventLocale } from './event';

export type PluralCount<T extends PluralThreshold = PluralThreshold> =
	| Extract<PluralThreshold, T>
	| number;

export type PluralFormats<T = string> = { [P in PluralCount]?: T };

/**
 * Create a message formatter that depends on a given count or count threshold.
 */
export function plural<T, F extends PluralFormats<T>, C extends keyof F | number>(
	formats: Readonly<F>,
	count: C,
	options?: { thresholds?: { [P in PluralThresholdNumerable]: number } }
) {
	if (typeof count === 'number') {
		// Handle number counts
		if (count in formats) {
			return formats[count];
		}
		if (count > 1) {
			// Handle number thresholds by corresponding string
			const numerable = PLURAL_THRESHOLDS_NUMERABLE_ARR.find((t) => {
				return t in formats && count <= (options?.thresholds?.[t] ?? PLURAL_THRESHOLDS_DEFAULT[t]);
			});
			return formats[numerable ?? PLURAL_THRESHOLDS.Many];
		}
	}
	// Handle string thresholds
	// else if (pluralizeThresholdSchema.safeParse(count).success) {
	// 	return formats[count as keyof F];
	// }
	return formats[count];
}

/**
 * Locale-aware number formatter.
 */
export function number<N extends number>(number: N, options?: Intl.NumberFormatOptions) {
	// Intl.NumberFormat
}

/**
 * Locale-aware date formatter.
 */
export function date<D extends Date | number>(date: D, options?: Intl.DateTimeFormatOptions) {
	// Intl.DateFormat
}

type MessageInterpolation = <A>(...args: A[]) => string | number;

type Message = string | number | MessageInterpolation;

// type Dictionnary<T> =

// type Translations<T extends Dictionnary> = Record<LocaleDefault, T> & Record<Locale, T & object>;

type Translations<T> = Record<LocaleDefault, T> & Record<Locale, T & object>;

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
function createDerivedTranslation<T>(translations: Translations<T>) {
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
 * @example
 * 	const t = createTranslation(translationsObject)
 * 	...
 * 	<h1>{$t('header.title')}</h1>
 *
 * @warning Ugly function overloading is only way to narrow generic type in returned value.
 */
export function createTranslation<T>(translations: Translations<T>): Readable<T>;
export function createTranslation<T, C extends RequestEvent | ServerLoadEvent | LoadEvent>(
	translations: Translations<T>,
	context: C
): T;
export function createTranslation<T, C extends RequestEvent | ServerLoadEvent | LoadEvent>(
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
	return createDerivedTranslation(translations);
}
