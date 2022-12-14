import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';

interface AutoHashOptions extends IntersectionObserverInit {
	/**
	 * String to use as the hash. Defaults to the host element's id.
	 */
	hash?: string;
	/**
	 * Should the hash be cleared when the intersection observer detect the host element is leaving?
	 */
	clearOnLeave?: boolean;
}

/**
 * Update the client url's hash automatically when the host element enters into view.
 *
 * @param node Host element, must have an `id` attribute.
 * @param options Intersection observer options.
 */
export function autoHash(
	element: HTMLElement,
	{
		hash = element.id,
		clearOnLeave = true,
		root = null,
		rootMargin = '-50% -25% -50% -25%',
		threshold = 0,
	}: AutoHashOptions = {}
) {
	function check(entries: IntersectionObserverEntry[]) {
		const currentPage = get(page);
		for (const entry of entries) {
			if (entry.isIntersecting) {
				const to = new URL(currentPage.url);
				to.hash = hash;
				goto(to.toString(), { replaceState: true, noScroll: true });
			} else if (currentPage.url.hash === hash && clearOnLeave) {
				const to = new URL(currentPage.url);
				to.hash = '';
				goto(to.toString());
			}
		}
	}

	const observer = new IntersectionObserver(check, {
		root,
		rootMargin,
		threshold,
	});

	observer.observe(element);

	return {
		update(newOptions: AutoHashOptions) {
			// Handle options update.
		},
		destroy() {
			observer.unobserve(element);
		},
	};
}
