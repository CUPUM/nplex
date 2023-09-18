type IntersectionOptions = IntersectionObserverInit;

export const INTERSECTION_EVENT = {
	Enter: 'intersection.enter',
	Leave: 'intersection.leave',
} as const;

const INTERSECTION_PROP = {
	Enter: `on:${INTERSECTION_EVENT.Enter}`,
	Leave: `on:${INTERSECTION_EVENT.Leave}`,
} as const;

interface IntersectionEvent {
	entry: IntersectionObserverEntry;
}

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace svelteHTML {
		interface HTMLAttributes {
			[INTERSECTION_PROP.Enter]?: (event?: CustomEvent<IntersectionEvent>) => unknown;
			[INTERSECTION_PROP.Leave]?: (event?: CustomEvent<IntersectionEvent>) => unknown;
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
		update() {
			// Handle updated options. Tricky if shared observers...
		},
		destroy() {
			observer.unobserve(element);
		},
	};
}
