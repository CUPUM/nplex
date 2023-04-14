import { writable } from 'svelte/store';

export const PROJECTS_FILTERS_W = 350;
export const PROJECTS_LIST_W = 350;

export const projectsFiltersOpened = writable(false);
export const projectsListOpened = writable(true);
