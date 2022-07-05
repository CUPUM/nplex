import type { create_in_transition } from 'svelte/internal';
import type { Readable, Writable } from 'svelte/store';
/**
 * Typescript helper to quickly get a svelte component's props' types.
 */
export type SvelteProps<T> = T extends Svelte2TsxComponent<infer U> ? U : never;

/**
 * Get values in a manner similar to `keyof`.
 */
export type ValueOf<T> = T[keyof T];

export type TransitionProp = Parameters<typeof create_in_transition>[1];

/**
 * Access the value-type of a store. Useful for typing function arguments.
 */
export type StoreValue<T> = T extends Writable<infer V> | Readable<infer V> ? V : never;
