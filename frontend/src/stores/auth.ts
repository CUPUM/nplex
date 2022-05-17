import { writable } from 'svelte/store';

export const signInModal = writable<Boolean>(false);
