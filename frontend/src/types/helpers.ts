import type { create_in_transition } from 'svelte/internal';

/**
 * Typescript helper to quickly get a svelte component's props' types.
 */
export type SvelteProps<T> = T extends Svelte2TsxComponent<infer U> ? U : never;

/**
 * Get values in a manner similar to `keyof`.
 */
export type ValueOf<T> = T[keyof T];

export type TransitionProp = Parameters<typeof create_in_transition>[1];
