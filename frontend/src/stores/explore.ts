import { writable } from 'svelte/store';

/**
 * Global states for the explore pages.
 */

/**
 * Should the explored category be resetable, keeping the swithc button enabled to allow going back to its index.
 */
export const categoryIsResetable = writable<boolean>(false);
