import { page } from '$app/stores';
import { resolvePath } from '@sveltejs/kit';
import { derived } from 'svelte/store';
import { LOCALE_DEFAULT, LOCALE_PARAM_NAME, type Locale } from './constants';

/**
 * Create a localizer for un-localized hrefs.
 */
function localize<R>(route: R, locale: Locale) {
	// This is where the locale segment persistence is determined.
	// As it is, the locale param is prepended whenever the href points to a non-default-locale.
	// This could be fine-tuned to, for example, account for user's preferences.
	// const localeParam = locale === LOCALE_DEFAULT ? ('' as const) : (`/${locale}` as const);
	// return `${localeParam}${href}` as const;
	return resolvePath(`/[[${LOCALE_PARAM_NAME}]]${route}`, {
		[LOCALE_PARAM_NAME]: locale === LOCALE_DEFAULT ? '' : locale,
	});
}

/**
 * Derived store to compose locale-specific url strings.
 */
export const lhref = derived(page, ($page) => {
	return <H extends string>(href: H, locale: Locale = $page.data.locale) => {
		return localize(href, locale);
	};
});

/**
 * Derived store to compose href string that switches locale while staying on the current page.
 */
export const lswitch = derived(page, ($page) => {
	return (locale: Locale) => {
		let tail = $page.url.href.replace($page.url.origin, '');
		const p = $page.params[LOCALE_PARAM_NAME];
		if (p) {
			tail.replace(`/${p}`, '');
		}
		return localize(tail, locale);
	};
});
