import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Deprecate in favor of new implementation that uses a target class or css var.
// Toggling the said class or the var's value would act as the reset.

/**
 * Global store to allow bg-color transitions on the site's body.
 */
export const backgroundColor = (function () {
	const root: HTMLElement | undefined = browser ? document.documentElement ?? undefined : undefined;

	const { subscribe, set, update } = writable<string | null>(null);

	function setBg(color: string | null, duration?: number) {
		set(color);
		if (root) {
			if (duration && !isNaN(duration)) {
				/**
				 * Handling cases where a custom duration is passed, making sure to unset the appended
				 * transition property after completion.
				 */
				function resetTransition(e: TransitionEvent) {
					if (root) {
						root.style.transition = '';
						root.removeEventListener('transitionend', resetTransition);
						root.removeEventListener('transitioncancel', resetTransition);
					}
				}
				root.style.transition = `background-color ${duration}ms ease-in-out`;
				root.addEventListener('transitionend', resetTransition);
				root.addEventListener('transitioncancel', resetTransition);
			}
			// root.style.backgroundColor = color;
			root.style.setProperty('--bg', color);
		}
	}

	return {
		subscribe,
		reset: (duration?: number) => setBg(null, duration),
		set: (color: string, duration?: number) => setBg(color, duration),
	};
})();
