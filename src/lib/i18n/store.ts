import { page } from '$app/stores';
import { derived } from 'svelte/store';

/**
 * Narrowing reactivity scope.
 */
export const lang = derived(page, ($page) => $page.data.lang);
