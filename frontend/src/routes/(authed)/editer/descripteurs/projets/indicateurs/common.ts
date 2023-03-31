import { writable } from 'svelte/store';
import type { PageData } from './$types';

export const INDICATORS_KEY = 'indicators';
export const INDICATORS_KEY_NEW = 'new';
export const INDICATOR_TITLE_MAX = 150;
export const INDICATOR_LABEL_MAX = 135;

export const exemplarityCategories = writable<PageData['exemplarityCategories']>();
