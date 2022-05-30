import { browser } from '$app/env';
import { writable } from 'svelte/store';

const threshold = 100;

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
}

export const mainScroll = (function () {
	const { subscribe, update } = writable<ScrollData>({ y: 0, delta: 0, up: false, down: false });

	function updateStore(e: Event) {
		const el = e.target as HTMLBodyElement;
		update((prev) => {
			let delta = prev.delta + el.scrollTop - prev.y;
			let up = prev.up;
			let down = prev.down;
			if (delta > threshold) {
				up = false;
				down = true;
				delta = 0;
			} else if (delta < -1 * threshold) {
				up = true;
				down = false;
				delta = 0;
			}
			return {
				y: el.scrollTop,
				delta,
				up,
				down,
			};
		});
	}

	if (browser) {
		document.body.addEventListener('scroll', updateStore);
	}

	return {
		subscribe,
	};
})();
