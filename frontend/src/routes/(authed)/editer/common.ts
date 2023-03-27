import { createDirtyStores } from '$utils/store';
import { writable } from 'svelte/store';

export const updating = writable(false);

export const { dirtyValues, isDirty } = createDirtyStores();
