import { writable } from 'svelte/store';
import type { PageData } from './$types';

export const exemplarityCategories = writable<PageData['exemplarityCategories']>();
