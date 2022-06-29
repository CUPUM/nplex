import { browser } from '$app/env';
import { writable } from 'svelte/store';

/**
 * Global store to allow bg-color transitions on the site's body.
 */
export const backgroundColor = (function () {
	const defaultColor = browser
		? window.getComputedStyle(document.querySelector(':root') as HTMLElement).backgroundColor
		: '';

	const { subscribe, set, update } = writable(defaultColor);

	let root: HTMLElement = undefined;
	// const _transition = getComputedStyle(root).transition;

	if (browser) {
		root = document.querySelector(':root');
	}

	function setBackgroundColor(color: string, duration?: number) {
		if (root) {
			if (!isNaN(duration)) {
				/**
				 * Handling cases where a custom duration is passed, making sure to unset the appended transition
				 * property after completion.
				 */
				function resetTransition(e: TransitionEvent) {
					root.style.transition = '';
					root.removeEventListener('transitionend', resetTransition);
					root.removeEventListener('transitioncancel', resetTransition);
				}
				root.style.transition = `background-color ${duration}ms ease-in-out`;
				root.addEventListener('transitionend', resetTransition);
				root.addEventListener('transitioncancel', resetTransition);
			}
			root.style.backgroundColor = color;
		}
	}

	setBackgroundColor(defaultColor);

	return {
		subscribe,
		reset: (duration?: number) => setBackgroundColor(defaultColor, duration),
		set: (color: string, duration?: number) => setBackgroundColor(color, duration),
	};
})();
