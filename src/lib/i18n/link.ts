import { page } from '$app/stores';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import { derived } from 'svelte/store';
import type { Locale } from './constants';
import { delocalizeCurrent, localize } from './href';

/**
 * Internationalized link attributes builder. Inspired by melt-ui's builders approach.
 */
export const i18nlink = derived(page, ($page) => {
	return <H extends string>(href: H, locale: Locale = $page.data.locale) => {
		const localized = localize(href, locale);
		const current = $page.url.pathname === localized || undefined;
		return {
			'href': localized,
			'hreflang': locale,
			'data-current': current,
			// Add more attributes if relevant.
		} satisfies Partial<HTMLAnchorAttributes>;
	};
});

/**
 * Derived store to compose href string that switches locale while staying on the current page.
 */
export const i18nswitch = derived(
	[delocalizeCurrent, i18nlink],
	([$delocalizedCurrent, $i18nlink]) => {
		return (locale: Locale) => $i18nlink($delocalizedCurrent, locale);
	}
);
