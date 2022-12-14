import type { ValueOf } from 'ts-essentials';

/**
 * Global observers pool, to facilitate reuse and cleanup.
 */
const observers: IntersectionObserver[] = [];

const defaultOptions = { root: null, rootMargin: '-50% 0px -50%', threshold: 0 };

export const INTERSECTION_EVENT_NAME = {
	enter: 'enter',
	leave: 'leave',
} as const;

export type IntersectionEventName = ValueOf<typeof INTERSECTION_EVENT_NAME>;

/**
 * Action to observe an element's intersection with the viewport.
 */
export function intersection(element: HTMLElement, options?: IntersectionObserverInit) {
	const defaultedOptions = { ...defaultOptions, ...options };
	const observer = setObserver(defaultedOptions);
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

/**
 * Establishing the requested observer by first attempting to find an existing one with equivalent
 * settings.
 */
function setObserver(options: IntersectionObserverInit) {
	const observerIdx = observers.findIndex(
		(observer) =>
			observer.root == options.root &&
			observer.rootMargin == options.rootMargin &&
			observer.thresholds == options.threshold
	);
	if (observerIdx > -1) return observers[observerIdx];
	const newObserver = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				entry.target.dispatchEvent(new CustomEvent(INTERSECTION_EVENT_NAME.enter));
			} else {
				entry.target.dispatchEvent(new CustomEvent(INTERSECTION_EVENT_NAME.leave));
			}
		}
	}, options);
	observers.push(newObserver);
	return newObserver;
}
