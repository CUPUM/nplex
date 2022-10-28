import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const DIRECTION_THRESHOLD = 20;
const LOCK_ATTRIBUTE = 'lock-scroll';

/**
 * @param y Current vertical distance.
 * @param delta Corresponds to the distance scrolled since the last time threshold was reached in either the `up` or
 *   `down` direction.
 * @param up Set to true when the scroll delta reaches the threshold in the negative (upwards) direction.
 * @param down Set to true when the scroll delta reaches the threshold in the positive (downwards) direction.
 */
interface ScrollData {
	y: number;
	delta: number;
	up: boolean;
	down: boolean;
	locked: boolean;
}

/**
 * Document's root element scroll information.
 */
export const rootScroll = (function () {
	const { subscribe, update } = writable<ScrollData>({ y: 0, delta: 0, up: false, down: false, locked: false });
	let locks = new Set();

	function updateStore(e: Event) {
		update((prev) => {
			if (locks.size || prev.locked) {
				window.scrollTo(0, prev.y);
				return { ...prev, locked: locks.size > 0 };
			}
			let delta = prev.delta + window.scrollY - prev.y;
			let up = prev.up;
			let down = prev.down;
			if (delta > DIRECTION_THRESHOLD) {
				up = false;
				down = true;
				delta = 0;
			} else if (delta < -1 * DIRECTION_THRESHOLD) {
				up = true;
				down = false;
				delta = 0;
			}
			return {
				y: window.scrollY,
				delta,
				up,
				down,
				locked: prev.locked,
			};
		});
	}

	function lock(key: any) {
		locks.add(key);
		document.documentElement.setAttribute(LOCK_ATTRIBUTE, '');
	}

	function unlock(key: any) {
		if (!locks.size) return;
		locks.delete(key);
		if (!locks.size) {
			document.documentElement.removeAttribute(LOCK_ATTRIBUTE);
		}
	}

	if (browser) {
		// Using the body as the scroll element instead of window to allow fullscreen  fixed elements to block scroll.
		window.addEventListener('scroll', updateStore);
	}

	return {
		subscribe,
		lock,
		unlock,
	};
})();
