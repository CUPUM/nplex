import { page } from '$app/stores';
import { writable } from 'svelte/store';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SETOUTS, SETOUT_DEFAULT, type Setout } from './constants';

/**
 * A store to help manage different types of layouts. Types of setouts can be applied by load
 * functions and modified client-side, for example on scroll.
 *
 * @see {@link SETOUTS}
 */
export const setout = (function () {
	/**
	 * Last value set by upstream page.data update (load function).
	 */
	let last = SETOUT_DEFAULT;

	const store = writable<Setout>(SETOUT_DEFAULT, function start(_set) {
		let key: string | null;

		const unsub = page.subscribe((p) => {
			if (key == null || p.route.id !== key) {
				_set(p.data.setout);
				last = p.data.setout;
			}
			key = p.route.id;
			return function stop() {
				unsub();
			};
		});
	});

	/**
	 * Set to the last given page.data value.
	 */
	function reset() {
		store.set(last);
	}

	return {
		...store,
		reset,
	};
})();
