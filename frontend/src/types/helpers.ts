import type { create_in_transition } from 'svelte/internal';
import type { Readable, Writable } from 'svelte/store';

/**
 * Get values in a manner similar to `keyof`.
 */
export type ValueOf<T> = T[keyof T];

export type TransitionProp = Parameters<typeof create_in_transition>[1];

/**
 * Access the value-type of a store. Useful for typing function arguments.
 */
export type StoreValue<T> = T extends Writable<infer V> | Readable<infer V> ? V : never;
