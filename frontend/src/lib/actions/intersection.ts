interface IntersectionOptions extends IntersectionObserverInit {}

export const INTERSECTION_EVENT = {
	Enter: 'intersection.enter',
	Leave: 'intersection.leave',
} as const;

interface IntersectionEvent {
	entry: IntersectionObserverEntry;
}

declare global {
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:intersection.enter'?: (event?: CustomEvent<IntersectionEvent>) => unknown;
			'on:intersection.leave'?: (event?: CustomEvent<IntersectionEvent>) => unknown;
		}
	}
}

/**
 * Action to observe an element's intersection with the viewport.
 */
export function intersection(
	element: HTMLElement,
	{ root = null, rootMargin = '-50% 0px -50%', threshold = 0 }: IntersectionOptions = {}
) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.dispatchEvent(
						new CustomEvent(INTERSECTION_EVENT.Enter, {
							detail: { entry } satisfies IntersectionEvent,
						})
					);
				} else {
					entry.target.dispatchEvent(
						new CustomEvent(INTERSECTION_EVENT.Leave, {
							detail: { entry } satisfies IntersectionEvent,
						})
					);
				}
			}
		},
		{
			root,
			rootMargin,
			threshold,
		}
	);
	observer.observe(element);
	return {
		update(newOptions: IntersectionObserverInit) {
			// Handle updated options. Tricky if shared observers...
		},
		destroy() {
			observer.unobserve(element);
		},
	};
}
