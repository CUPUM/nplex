import { browser } from '$app/environment';
import { derived, readable, type Readable, type Subscriber } from 'svelte/store';

/**
 * Keep in sync with breakpoints defined in /styles/utils/mixins.scss.
 */
const BREAKPOINTS = {
	mobile: 'screen and (max-width: 640px)',
	tablet: 'screen and (max-width: 1024px)',
	laptop: 'screen and (max-width: 1200px)',
	desktop: 'screen and (min-width: 1201px)',
};

const setupMq = (mediaQuery: string) => (set: Subscriber<boolean>) => {
	const query = browser ? window.matchMedia(mediaQuery) : undefined;
	function handleChange(e: MediaQueryList | MediaQueryListEvent) {
		set(e.matches);
	}
	function stop() {
		query?.removeEventListener('change', handleChange);
	}
	query?.addEventListener('change', handleChange);
	if (query) handleChange(query);
	return stop;
};

/**
 * Media query for js-side logic.
 *
 * Credits:
 *
 * @see https://github.com/pearofducks/svelte-match-media
 */
export const media = (function () {
	const qs = Object.entries(BREAKPOINTS).reduce<{
		[k in keyof typeof BREAKPOINTS]: Readable<boolean>;
	}>(
		(acc, [queryName, queryString]) => (
			((acc as any)[queryName] = readable(false, setupMq(queryString))), acc
		),
		{} as any
	);
	return derived(Object.values(qs), ($queryStores) =>
		$queryStores.reduce<{ [k in keyof typeof BREAKPOINTS]: boolean }>(
			(acc, q, i) => (((acc as any)[Object.keys(qs)[i]] = q), acc),
			{} as any
		)
	);
})();
