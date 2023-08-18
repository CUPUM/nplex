import type { Writable } from 'svelte/store';

export type ValueOfWritable<W extends Writable<unknown>> = W extends Writable<infer T> ? T : never;
