import { page } from '$app/stores';
import type { Page } from '@sveltejs/kit';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import { derived } from 'svelte/store';
import type { Locale } from './constants';
import { delocalizeCurrent, localize } from './href';

/**
 * Extracted link deriving logic for use in custom builders (e.g.: loadableLink).
 */
export function deriveLink($page: Page) {
	return <H extends string>(
		/**
		 * Unlocalized href, i.e. path without root [locale] segment.
		 */
		href: H,
		/**
		 * Customizable locale, if should differ from current client's locale. Setting to false will
		 * prevent any automatic localization.
		 */
		locale: Locale | false = $page.data.locale
	) => {
		const _href = locale ? localize(href, locale) : href;
		const [path, hash] = _href.split('#');
		const currentPage = $page.url.pathname === path || undefined;
		const currentHash = currentPage && '#' + hash === $page.url.hash;
		return {
			'href': _href,
			'hreflang': locale || undefined,
			'data-current': currentHash ? 'step' : currentPage ? 'page' : undefined,
			'aria-current': currentHash ? 'step' : currentPage ? 'page' : undefined,
			// Add more attributes if relevant.
		} satisfies Partial<HTMLAnchorAttributes>;
	};
}

/**
 * Internationalized link attributes builder. Also tracks if the href corresponds to the client's
 * current page.
 *
 * @example <a {...$link('/about')}>About</a>
 *
 * Becomes <a href="..." hreflang="..." data-current="..." .../>
 */
export const link = derived(page, deriveLink);

/**
 * Derived store to compose href string that switches locale while staying on the current page.
 */
export const i18nswitch = derived([delocalizeCurrent, link], ([$delocalizedCurrent, $link]) => {
	return (locale: Locale) => $link($delocalizedCurrent, locale);
});
