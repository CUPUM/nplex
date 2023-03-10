import { browser } from '$app/environment';
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars';
import { writable } from 'svelte/store';

OverlayScrollbars.plugin(ClickScrollPlugin);

const DIRECTION_THRESHOLD = 20;
const SCROLL_LOCK_ATTRIBUTE = 'data-scroll-lock';

export type ScrollLockKey = {} | Symbol | number | string;

interface ScrollData {
	/**
	 * Current vertical distance.
	 */
	y: number;
	/**
	 * Corresponds to the distance scrolled since the last time threshold was reached in either the
	 * `up` or `down` direction.
	 */
	delta: number;
	/**
	 * Set to true when the scroll delta reaches the threshold in the negative (upwards) direction.
	 */
	up: boolean;
	/**
	 * Set to true when the scroll delta reaches the threshold in the positive (downwards) direction.
	 */
	down: boolean;
	/**
	 * Is scrolling currently locked on the root element?
	 */
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

	let rootScrollLock: ReturnType<typeof scrollLock>;
	let os: OverlayScrollbars;

	function init() {
		if (browser) {
			rootScrollLock = scrollLock(document.documentElement);
			os = OverlayScrollbars(document.body, {
				showNativeOverlaidScrollbars: true,
				paddingAbsolute: false,
				scrollbars: {
					theme: 'nplex-scroll-theme',
					visibility: 'auto',
					autoHide: 'move',
					autoHideDelay: 1500,
					dragScroll: true,
					clickScroll: true,
					pointers: ['mouse', 'touch', 'pen'],
				},
			});
		}
	}

	function handleScroll(e: Event) {
		update((prev) => {
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

	function lock(key: ScrollLockKey) {
		if (!rootScrollLock) {
			return;
		}
		const locked = rootScrollLock.lock(key);
		update((v) => {
			if (locked && !v.locked) {
				os.options({ overflow: { x: 'hidden', y: 'hidden' } });
			}
			return {
				...v,
				locked,
			};
		});
	}

	function unlock(key: ScrollLockKey) {
		if (!rootScrollLock) {
			return;
		}
		const locked = rootScrollLock.unlock(key);
		update((v) => {
			if (!locked && v.locked) {
				os.options({ overflow: { x: 'scroll', y: 'scroll' } });
			}
			return {
				...v,
				locked,
			};
		});
	}

	function unlockAll() {
		if (!rootScrollLock) {
			return;
		}
		const locked = rootScrollLock.unlockAll();
		update((v) => {
			if (!locked && v.locked) {
				os.options({ overflow: { x: 'scroll', y: 'scroll' } });
			}
			return {
				...v,
				locked,
			};
		});
	}

	if (browser) {
		window.addEventListener('scroll', handleScroll);
	}

	return {
		init,
		subscribe,
		lock,
		unlock,
		unlockAll,
	};
})();

/**
 * Keeping a map of valid string attributes and their corresponding js key. Allows for easier unique
 * key use (enables symbols and objects).
 */
function scrollLock(element: HTMLElement) {
	const locks = new Map<ScrollLockKey, string>();

	function stringKey(key: ScrollLockKey) {
		if (typeof key === 'string') {
			return key;
		}
		if (typeof key === 'number') {
			return key.toString();
		}
		if (typeof key === 'symbol') {
			return (key.description ?? 'symbol') + '';
		}
		return 'key';
	}

	function lock(key: ScrollLockKey) {
		const attr = stringKey(key);
		locks.set(key, attr);
		element.setAttribute(SCROLL_LOCK_ATTRIBUTE, attr);
		return locks.size > 0;
	}

	function unlock(key: ScrollLockKey) {
		locks.delete(key);
		if (locks.size) {
			const last = Array.from(locks.values()).pop();
			element.setAttribute(SCROLL_LOCK_ATTRIBUTE, last ?? '');
		} else {
			element.removeAttribute(SCROLL_LOCK_ATTRIBUTE);
		}
		return locks.size > 0;
	}

	function unlockAll() {
		locks.clear();
		element.removeAttribute(SCROLL_LOCK_ATTRIBUTE);
		return locks.size > 0;
	}

	return {
		lock,
		unlock,
		unlockAll,
	};
}
