import type { ValueOf } from 'ts-essentials';

const DEFAULT_OPTIONS = { root: null, rootMargin: '-50% 0px -50%', threshold: 0 };

export const INTERSECTION_EVENT = {
	enter: 'enter',
	leave: 'leave',
} as const;

export type IntersectionEventName = ValueOf<typeof INTERSECTION_EVENT>;

/**
 * Action to observe an element's intersection with the viewport.
 */
export function intersection(element: HTMLElement, options?: IntersectionObserverInit) {
	const defaultedOptions = { ...DEFAULT_OPTIONS, ...options };
	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				entry.target.dispatchEvent(new CustomEvent(INTERSECTION_EVENT.enter, { detail: entry }));
			} else {
				entry.target.dispatchEvent(new CustomEvent(INTERSECTION_EVENT.leave, { detail: entry }));
			}
		}
	}, defaultedOptions);
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
