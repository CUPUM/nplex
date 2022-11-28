import { writable, type Writable } from 'svelte/store';

/**
 * Which category is currently loading, if navigating, Default to null;
 */
export const loadingCategory: Writable<NonNullable<App.PageData['category']> | null> =
	writable(null);
