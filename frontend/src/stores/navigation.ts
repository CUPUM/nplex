import type { Category } from 'src/types/categories';
import { writable, type Writable } from 'svelte/store';

/**
 * Which category is currently loading, if navigating, Default to null;
 */
export const loadingCategory: Writable<Category> = writable(null);
