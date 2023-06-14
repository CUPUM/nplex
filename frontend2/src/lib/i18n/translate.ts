import { page } from '$app/stores';
import type { Page, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { derived, type Readable } from 'svelte/store';
import { LOCALE_DEFAULT, isLocale, type Locale } from './locales';

const LOCALE_CTX_KEY = 'locale-context-key';

// /**
//  * Utility function to create a translation context, allowing varying / isolated langs.
//  */
// export function createLocaleContext(locale: Locale) {
// 	const localeContext = writable(locale);
// 	setContext(LOCALE_CTX_KEY, readonly(localeContext));
// 	return localeContext;
// }

// function getLocaleContext() {
// 	return getContext<Readable<ValueOfWritable<ReturnType<typeof createLocaleContext>>>>(
// 		LOCALE_CTX_KEY
// 	);
// }

// // /**
// //  * Pluralisable translation.
// //  */
// // type Translation<A extends string | number> =
// // 	| TranslationBase<A>
// // 	| { zero?: TranslationBase<A>; one?: TranslationBase<A>; many?: TranslationBase<A> };

// // /**
// //  * Dictionnary of expected locale translations.
// //  */
// // type Dictionnary<A extends string | number, T extends Translation<A>> = {
// // 	[L in Locale]: T;
// // };

// type Translation = string;

// type TranslationInterpolator<A extends string | number> = (...args: A[]) => Translation;

// /**
//  * Define interpolation for potentially plural translations.
//  */
// function pluralisable<
// 	A extends {
// 		/**
// 		 * Zero item.
// 		 */
// 		zero: string;
// 		/**
// 		 * One item.
// 		 */
// 		one: string;
// 		/**
// 		 * Strictly two items.
// 		 */
// 		two: string;
// 		/**
// 		 * 1 (or 2 if 'two' is defined) to the manyThreshold defined in options, if many is also
// 		 * defined.
// 		 */
// 		few: string;
// 		/**
// 		 * ManyThreshold (if few is also defined) to infinite.
// 		 */
// 		many: string;
// 	},
// 	P extends { [L in Locale]: A }
// >(agreements: P, options: { count: number; manyThreshold: 10 }) {}

// // function orderable<O extends any>(positions: O) {
// // 	return;
// // }

/**
 * Utility function to instanciate either:
 *
 * - A new translation store when in browser env.
 * - A translation object in server env.
 *
 * @example
 * 	const t = createTranslation(translationsObject)
 * 	...
 * 	<h1>{$t('title')}</h1>
 */
export function createTranslation<
	MessageKey extends string,
	Dictionnary extends { [K in MessageKey]: string },
	Translations extends {
		[L in Locale]: Dictionnary;
	}
>(
	translations: Translations,
	/**
	 * Context establishing the locale to use.
	 */
	context: Readable<Page> | ServerLoadEvent | RequestEvent = page
) {
	// If in a server event environement.
	if ('locals' in context) {
		return translations[context.locals.locale];
	}
	// Else, if in client environnement.
	return derived(context, ($context) => {
		let locale = typeof $context === 'string' ? $context : $context.data.locale;
		if (!isLocale(locale)) {
			console.error(
				`Invalid locale passed to translation store. Defaulted to fallback locale (${LOCALE_DEFAULT}).`
			);
			locale = LOCALE_DEFAULT;
		}
		if (translations[locale] == null) {
			console.error('No translation found.');
			return 'Missing translation';
		}
		return translations[locale];
	});
}
