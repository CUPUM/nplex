import { browser } from '$app/env';
import { writable } from 'svelte/store';

/**
 * Global store to allow bg-color transitions on the site's body.
 */
export const backgroundColor = (function () {
	const root: HTMLElement = browser ? document.querySelector(':root') : undefined;
	const rootStyle = root ? getComputedStyle(root) : null;
	const defaultBackgroundColor = rootStyle?.backgroundColor || '';

	const { subscribe, set, update } = writable(defaultBackgroundColor);

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
			// root.style.backgroundColor = color;
			root.style.setProperty('--bg-color', color);
		}
	}

	return {
		subscribe,
		reset: (duration?: number) => setBackgroundColor(defaultBackgroundColor, duration),
		set: (color: string, duration?: number) => setBackgroundColor(color, duration),
	};
})();
