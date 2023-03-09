import { writable, type Readable, type Updater, type Writable } from 'svelte/store';

/**
 * In certain situations (ex.: stores required for context reactivity), we should be able to derive
 * stores from local variables to pass a readonly and reactive value to children.
 *
 * To allow finetuning of where we expose the write methods of our store, this helper returns 2
 * methods, a subscribe and a set (akin to react's way)
 */
export function writeReadable<T>(
	...args: Parameters<typeof writable<T>>
): [readable: Readable<T>, store: Writable<T>] {
	const store = writable(...args);
	return [{ subscribe: store.subscribe }, store];
}

/**
 * Writable store with a chronological cumulative memory of keyed values.
 *
 * ! Do not use for frequently updated values !
 */
export function writableLedger<T>(init: T, fallback?: T) {
	const store = writable<T | undefined>(init);
	/**
	 * First-in-last-out log of applied theme. Allows returning to previous value and prevents
	 * bindings from canceling one-another when reset/unset.
	 */
	const ledger = new Map<any, T | undefined>();
	function set(key: any, value: T | undefined) {
		ledger.set(key, value);
		store.set(value);
	}
	function unset(key: any) {
		if (ledger.has(key)) {
			ledger.delete(key);
			store.set(ledger.size ? [...ledger][ledger.size - 1][1] : fallback);
		}
	}
	function update(key: any, updater: Updater<T | undefined>) {
		store.update((prev) => {
			const next = updater(prev);
			ledger.set(key, next);
			return updater(next);
		});
	}
	return {
		subscribe: store.subscribe,
		set,
		update,
		unset,
	};
}

export type WritableLedger<T> = ReturnType<typeof writableLedger<T>>;
