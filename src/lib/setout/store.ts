import { page } from '$app/stores';
import { derived, writable } from 'svelte/store';
import { SETOUT_DEFAULT, type Setout } from './constants';

/**
 * A contextual store to help manage different types of layouts. Types of setouts can be applied by
 * load functions and modified client-side, for example on scroll.
 */
function createSetout() {
	/**
	 * Last value set by upstream page.data update (load function).
	 */
	let last = SETOUT_DEFAULT;

	const dataSetout = derived(page, ($page) => {
		return $page.data.setout;
	});

	const store = writable<Setout>(SETOUT_DEFAULT, function start(_set) {
		// let key: string | null;

		const unsub = dataSetout.subscribe((p) => {
			// if (key == null || p.route.id !== key) {
			_set(p.data.setout);
			last = p.data.setout;
			// }
			// key = p.route.id;
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
}

export const setout = createSetout();
