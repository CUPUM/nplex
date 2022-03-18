import { writable } from 'svelte/store';

export const authModal = writable<Boolean>(false);

export const authEmail = writable<String>('');

export const authPassword = writable<String>('');
