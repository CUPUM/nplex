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
		rootMargin = '-50% 0% 0% 0%',
		threshold = 0,
	}: AutoHashOptions = {}
) {
	function updateHash(entries: IntersectionObserverEntry[]) {
		if (hash) {
			if (entries[0].isIntersecting) {
				location.hash = hash;
			} else if (location.hash.slice(1) === hash && clearOnLeave) {
				console.log('should clear!');
				location.hash = '';
			}
		}
	}
	const observer = new IntersectionObserver(updateHash, {
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
