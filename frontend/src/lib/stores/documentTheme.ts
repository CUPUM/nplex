import { browser } from '$app/environment';
import { Theme } from '$utils/enums';
import { writable } from 'svelte/store';
import type { ValueOf } from 'ts-essentials';

function switchTheme(theme: 'light' | 'dark') {
	if (browser) {
		document.documentElement.classList.remove('theme-light');
		document.documentElement.classList.remove('theme-dark');
		document.documentElement.classList.add('theme-' + theme);
	}
}

/**
 * Global store to manage theme class applied to root element.
 */
export const documentTheme = (function () {
	const doc: HTMLElement | null = browser ? document.querySelector(':root') : null;
	const classes = Object.values(Theme);
	const init: ValueOf<typeof Theme> = [...(doc?.classList?.values() ?? [])].reduce(
		(acc, curr) => (classes.indexOf(curr as any) > -1 ? curr : acc),
		Theme.light
	) as ValueOf<typeof Theme>;

	const { subscribe, update } = writable(init);

	function set(theme: ValueOf<typeof Theme>) {
		update((prev) => {
			if (doc) {
				doc.classList.replace(prev, theme);
			}
			return theme;
		});
	}

	function reset() {
		set(init);
	}

	return {
		subscribe,
		reset,
		set,
	};
})();
