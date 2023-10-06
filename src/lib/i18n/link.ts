import { page } from '$app/stores';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import { derived } from 'svelte/store';
import type { Locale } from './constants';
import { delocalizeCurrent, localize } from './href';

/**
 * Internationalized link attributes builder. Also tracks if the href corresponds to the client's
 * current page.
 */
export const link = derived(page, ($page) => {
	return <H extends string>(href: H, locale: Locale | false = $page.data.locale) => {
		const _href = locale ? localize(href, locale) : href;
		const current = $page.url.pathname === _href || undefined;
		return {
			'href': _href,
			'hreflang': locale || undefined,
			'data-current': current,
			'aria-current': current && 'page',
			// Add more attributes if relevant.
		} satisfies Partial<HTMLAnchorAttributes>;
	};
});

/**
 * Derived store to compose href string that switches locale while staying on the current page.
 */
export const i18nswitch = derived([delocalizeCurrent, link], ([$delocalizedCurrent, $link]) => {
	return (locale: Locale) => $link($delocalizedCurrent, locale);
});
