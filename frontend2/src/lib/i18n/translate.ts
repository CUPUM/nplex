import type { ValueOfWritable } from '$lib/utils/types';
import { getContext, setContext } from 'svelte';
import { readonly, writable, type Readable } from 'svelte/store';
import type { Locale } from './locales';

const ctx_key = 'i18n-context-key';

/**
 * Utility function to create a translation context, allowing varying concatenated / nested locales.
 */
export function createTranslationContext(locale: Locale) {
	const translationContext = writable(locale);
	setContext(ctx_key, readonly(translationContext));
	return translationContext;
}

function getTranslationContext() {
	type ReadonlyTranslationContext = Readable<
		ValueOfWritable<ReturnType<typeof createTranslationContext>>
	>;
	return getContext<ReadonlyTranslationContext>(ctx_key);
}

/**
 * Utility funciton to instanciate a new translation store.
 *
 * @example
 * 	const t = createTranslation(translationsObject)
 * 	...
 * 	<h1>{$t('title')}</h1>
 */
export function createTranslation(translations: any) {
	return 0;
}
