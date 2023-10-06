import { page } from '$app/stores';
import { derived } from 'svelte/store';
import { SETOUT_DEFAULT } from './constants';

/**
 * A contextual store to help manage different types of layouts. Types of setouts can be applied by
 * load functions and modified client-side, for example on scroll.
 */
export const setout = derived(page, ($page) => {
	return $page.data.setout ?? SETOUT_DEFAULT;
});

// function createSetout() {
// 	/**
// 	 * Last value set by upstream page.data update (load function).
// 	 */
// 	const last = SETOUT_DEFAULT;

// 	const dataSetout = derived(page, ($page) => {
// 		return $page.data?.setout ?? undefined;
// 	});

// 	const store = writable<Setout | undefined>(undefined, function start(_set) {
// 		const unsub = dataSetout.subscribe((v) => {
// 			_set(v);
// 			return function stop() {
// 				unsub();
// 			};
// 		});
// 	});

// 	/**
// 	 * Set to the last given page.data value.
// 	 */
// 	function reset() {
// 		store.set(last);
// 	}

// 	return {
// 		...store,
// 		reset,
// 	};
// }

// export const setout = createSetout();
