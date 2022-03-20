import { writable } from 'svelte/store';

export const authModal = writable<Boolean>(false);
