import { browser } from '$app/env';
import { readable, writable } from 'svelte/store';

/**
 * Svelte writable store wrapper to persist state into client's local storage.
 */
export function persistWritable<T>(key: string, ...args: Parameters<typeof writable<T>>) {
	if (!browser) return writable(...args);
	const local = localStorage.getItem(key);
	const init = local ? (JSON.parse(local) as T) : args[0];
	const store = writable(init, (set) => {
		const unsub = args[1] && args[1](set);
		const localUnsub = store.subscribe((v) => {
			localStorage.setItem(key, JSON.stringify(v));
		});
		function stop() {
			unsub && unsub();
			localUnsub();
		}
		return stop;
	});
	return store;
}

/**
 * Svelte readable store wrapper to persist state into client's local storage.
 */
export function persistReadable<T>(key: string, ...args: Parameters<typeof readable<T>>) {
	if (!browser) return readable(...args);
	const local = localStorage.getItem(key);
	const init = local ? (JSON.parse(local) as T) : args[0];
	const store = readable(init, (set) => {
		const unsub = args[1] && args[1](set);
		const localUnsub = store.subscribe((v) => {
			localStorage.setItem(key, JSON.stringify(v));
		});
		function stop() {
			unsub && unsub();
			localUnsub();
		}
		return stop;
	});
	return store;
}
