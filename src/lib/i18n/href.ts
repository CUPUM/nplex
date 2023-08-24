import { page } from '$app/stores';
import { resolvePath } from '@sveltejs/kit';
import { derived } from 'svelte/store';
import { LOCALE_DEFAULT, LOCALE_PARAM, type Locale } from './constants';

/**
 * Create a localizer for un-localized in-app hrefs.
 */
export function localize<H extends string>(href: H, locale: Locale) {
	// This is where the locale segment persistence is determined.
	// As it is, the locale param is prepended whenever the href points to a non-default-locale.
	// This could be fine-tuned to, for example, account for user's preferences in localstorage / cookies / page.data.
	return resolvePath(`/[[${LOCALE_PARAM}]]${href}`, {
		[LOCALE_PARAM]: locale === LOCALE_DEFAULT ? '' : locale,
	});
}

/**
 * Remove the locale segment form the current route url.
 */
export const delocalizeCurrent = derived(page, ($page) => {
	let tail = $page.url.href.replace($page.url.origin, '');
	const p = $page.params[LOCALE_PARAM];
	if (p) {
		tail = tail.replace(`/${p}`, '');
	}
	return tail;
});

/**
 * Derived store to compose locale-specific url strings.
 */
export const i18nhref = derived(page, ($page) => {
	return <H extends string>(href: H, locale: Locale = $page.data.locale) => {
		return localize(href, locale);
	};
});
