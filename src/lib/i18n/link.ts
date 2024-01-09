import { page } from '$app/stores';
import { availableLanguageTags, sourceLanguageTag, type AvailableLanguageTag } from '$i18n/runtime';
import type { Page } from '@sveltejs/kit';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import { derived } from 'svelte/store';

/**
 * Remove an app-oriented href's lang param.
 */
export function removeLang<H extends string>(href: H) {
	const [_, maybeLang, ...rest] = href.split('/');
	if (availableLanguageTags.includes(maybeLang as AvailableLanguageTag)) {
		return `/${rest.join('/')}`;
	}
	return href;
}

/**
 * Apply a lang param to an app-oriented href.
 *
 * **Attention**: If a lang param is included in the passed location string, it will be replaced.
 */
export function useLang<H extends string>(
	/**
	 * Route location agnostic of lang segment.
	 */
	href: H,
	/**
	 * Custom lang to apply when wishing to target a lang different than the current one.
	 */
	lang: AvailableLanguageTag
) {
	const noLang = removeLang(href);
	if (lang === sourceLanguageTag) {
		return noLang;
	}
	return `/${lang}${href}`;
}

/**
 * Internationalized link attributes builder. Also tracks if the href corresponds to the client's
 * current page.
 *
 * @example <a {...$link('/about')}>About</a>
 *
 * Becomes <a href="..." hreflang="..." aria-current="..." .../>
 */
export const link = derived(page, ($p) => {
	return <H extends string>(
		/**
		 * Location string agnostic of lang segment.
		 */
		href: H,
		{
			lang = $p.data.lang,
			current = (p, h) => (p.url.pathname === h ? 'page' : undefined),
		}: {
			/**
			 * Customizable locale, if should differ from current client's locale. Setting to false will
			 * prevent any automatic localization.
			 */
			lang?: AvailableLanguageTag;
			/**
			 * Comparison strategy used to determine if the constructed link is current page or not.
			 */
			current?: (page: Page, href: H) => 'page' | 'step' | undefined;
		} = {}
	) => {
		const _href = useLang(href, lang);
		const _current = current($p, href);
		return {
			'href': _href,
			'hreflang': lang || undefined,
			'data-current': _current,
			'aria-current': _current,
			// Add more attributes if relevant.
		} satisfies Partial<HTMLAnchorAttributes>;
	};
});

/**
 * Get the current href string without lang param.
 */
export const noLang = derived(page, ($page) => {
	return removeLang($page.url.href.replace($page.url.origin, ''));
});

/**
 * Derived store to compose href string that switches locale while staying on the current page.
 */
export const langSwitch = derived([noLang, link], ([$noLang, $link]) => {
	return (lang: AvailableLanguageTag) => $link($noLang, { lang });
});
