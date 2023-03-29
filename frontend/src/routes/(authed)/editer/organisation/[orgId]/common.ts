import { writable } from 'svelte/store';
import type { PageData } from './$types';

export const organisation = writable<PageData['organisation']>();
