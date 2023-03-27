import { writable } from 'svelte/store';
import type { LayoutData } from './$types';

export const descriptors = writable<LayoutData['descriptors']>();

export const project = writable<LayoutData['project']>();
