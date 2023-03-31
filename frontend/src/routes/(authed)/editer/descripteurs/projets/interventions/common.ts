import { writable } from 'svelte/store';
import type { PageData } from './$types';

export const types = writable<PageData['types']>();
export const interventions = writable<PageData['interventions']>();

export const INTERVENTION_TITLE_MIN = 1;
export const INTERVENTION_TITLE_MAX = 75;
export const INTERVENTION_DESCRIPTION_MAX = 500;
