import { browser } from '$app/environment';
import { page } from '$app/stores';
import { derived } from 'svelte/store';
import { SETOUT_DEFAULT } from './constants';

/**
 * A contextual store to help manage different types of layouts. Types of setouts can be applied by
 * load functions and modified client-side, for example on scroll.
 */
export const setout = derived(page, ($page) => {
	const v = $page.data.setout ?? SETOUT_DEFAULT;
	if (browser) {
		document.documentElement.setAttribute('data-setout', v);
	}
	return $page.data.setout ?? SETOUT_DEFAULT;
});
