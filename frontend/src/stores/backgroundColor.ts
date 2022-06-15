import { browser } from '$app/env';
import { writable } from 'svelte/store';

/**
 * Global store to allow bg-color transitions on the site's body.
 */
export const backgroundColor = (function () {
	const defaultColor = 'white';
	const { subscribe, set, update } = writable(defaultColor);

	let root: HTMLElement = undefined;

	if (browser) {
		root = document.querySelector(':root');
	}

	function setBackgroundColor(color: string) {
		if (root) {
			root.style.backgroundColor = color;
		}
	}

	setBackgroundColor(defaultColor);

	return {
		subscribe,
		reset: () => setBackgroundColor(defaultColor),
		set: setBackgroundColor,
	};
})();
