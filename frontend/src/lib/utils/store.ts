import { writable, type Readable, type Writable } from 'svelte/store';

/**
 * In certain situations (ex.: stores required for context reactivity), we should be able to derive stores from local
 * variables to pass a readonly and reactive value to children.
 *
 * To allow finetuning of where we expose the write methods of our store, this helper returns 2 methods, a subscribe and
 * a set (akin to react's way)
 */
export function writeReadable<T>(...args: Parameters<typeof writable<T>>): [store: Writable<T>, readable: Readable<T>] {
	const store = writable(...args);

	return [store, store.subscribe as unknown as Readable<T>];
}

const [s, r] = writeReadable('ADAS');
