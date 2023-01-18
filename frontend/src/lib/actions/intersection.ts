import type { ValueOf } from 'ts-essentials';

export const INTERSECTION_EVENT = {
	enter: 'enter',
	leave: 'leave',
} as const;

export type IntersectionEventName = ValueOf<typeof INTERSECTION_EVENT>;

const DEFAULT_OPTIONS = {
	root: null,
	rootMargin: '-50% 0px -50%',
	threshold: 0,
	events: INTERSECTION_EVENT,
};

/**
 * Action to observe an element's intersection with the viewport.
 */
export function intersection(
	element: HTMLElement,
	options?: IntersectionObserverInit & { events?: { enter: string; leave: string } }
) {
	const defaultedOptions = { ...DEFAULT_OPTIONS, ...options };
	console.log(defaultedOptions);
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.dispatchEvent(
						new CustomEvent(defaultedOptions.events.enter, { detail: entry })
					);
				} else {
					entry.target.dispatchEvent(
						new CustomEvent(defaultedOptions.events.leave, { detail: entry })
					);
				}
			}
		},
		{
			root: defaultedOptions.root,
			rootMargin: defaultedOptions.rootMargin,
			threshold: defaultedOptions.threshold,
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
