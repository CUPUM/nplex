import { navigating } from '$app/stores';
import { LOCALE_PARAM } from '$lib/i18n/constants';
import { resolvePath } from '@sveltejs/kit';
import { derived } from 'svelte/store';

/**
 * Create a readable that tracks if the navigation destination corresponds to a given (un-localized)
 * location.
 *
 * Should also work with external locations, i.e. locations pointing outside the app.
 */
export function createLoadingLocation(
	/**
	 * Un-localized location.
	 */
	location: URL | string,
	{
		strict = false,
	}: {
		/**
		 * Should the equality check be strict? I.e., should the pathname matching be implemented with
		 * '=== ...' or a simple 'startsWith(...)?
		 */
		strict?: boolean;
	} = {}
) {
	return derived(navigating, ($nav) => {
		if (!$nav?.to) {
			return false;
		}
		const to = $nav.to.route.id
			? resolvePath($nav.to.route.id, { ...$nav.to.params, [LOCALE_PARAM]: undefined })
			: $nav.to.url.href;
		const target =
			location instanceof URL ? ($nav.to.route.id ? location.pathname : location.href) : location;
		if (strict) {
			return to === target;
		}
		return to.startsWith(target);
	});
}
