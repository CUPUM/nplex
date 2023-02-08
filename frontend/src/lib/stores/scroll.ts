import { browser } from '$app/environment';
import type { KeyOfSet } from '$types/utils';
import { writable } from 'svelte/store';

const DIRECTION_THRESHOLD = 20;
const LOCK_ATTRIBUTE = 'data-lock-scroll';

/**
 * @param y Current vertical distance.
 * @param delta Corresponds to the distance scrolled since the last time threshold was reached in
 *   either the `up` or `down` direction.
 * @param up Set to true when the scroll delta reaches the threshold in the negative (upwards)
 *   direction.
 * @param down Set to true when the scroll delta reaches the threshold in the positive (downwards)
 *   direction.
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
	const { subscribe, update } = writable<ScrollData>({
		y: 0,
		delta: 0,
		up: false,
		down: false,
		locked: false,
	});
	let locks = new Set<Symbol | number | string>();

	function updateStore(e: Event) {
		update((prev) => {
			// if (locks.size || prev.locked) {
			// 	window.scrollTo(0, prev.y);
			// 	return { ...prev, locked: locks.size > 0 };
			// }
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

	function keyString(key: KeyOfSet<typeof locks>) {
		if (typeof key === 'symbol') {
			return key.toString();
		}
		return key + '';
	}

	function lock(key: KeyOfSet<typeof locks>) {
		locks.add(key);
		if (browser) {
			document.documentElement.setAttribute(LOCK_ATTRIBUTE, keyString(key));
		}
	}

	function unlock(key: KeyOfSet<typeof locks>) {
		locks.delete(key);
		if (browser) {
			if (locks.size) {
				const last = Array.from(locks).pop();
				if (last) {
					document.documentElement.setAttribute(LOCK_ATTRIBUTE, keyString(last));
				}
			} else {
				document.documentElement.removeAttribute(LOCK_ATTRIBUTE);
			}
		}
	}

	if (browser) {
		window.addEventListener('scroll', updateStore);
	}

	return {
		subscribe,
		lock,
		unlock,
	};
})();
