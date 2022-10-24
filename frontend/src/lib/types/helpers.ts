import type { create_in_transition } from 'svelte/internal';
import type { Readable, Writable } from 'svelte/store';

/**
 * Typescript natively has limited support for ES6 Maps. This type helper simplifies extracting a given map's keys type.
 */
export type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never;

/**
 * Typescript natively has limited support for ES6 Sets. This type helper simplifies extracting a given set's keys type.
 */
export type KeyOfSet<S extends Set<unknown>> = S extends Set<infer K> ? K : never;

/**
 * Get values in a manner similar to `keyof`.
 */
export type ValueOf<T> = T[keyof T];

/**
 * ! Veriy if this helper is deprecated: Svelte might've provided its own more recently. !
 *
 * Get the typeof a svelte transition's properties.
 */
export type TransitionProp = Parameters<typeof create_in_transition>[1];

/**
 * Access the value-type of a store. Useful for typing function arguments.
 */
export type StoreValue<T> = T extends Writable<infer V> | Readable<infer V> ? V : never;
