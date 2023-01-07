import { browser, version } from '$app/environment';
import { readable, writable } from 'svelte/store';
import { ES6JSON } from './json';

interface Persisted<T> {
	/**
	 * Persisted value.
	 */
	value: T;
	/**
	 * App version at the moment of saving into local storage. Saving the version ensures we can
	 * easily reset stored values to avoid conflicts between persisted value structures and the
	 * shipped app's expectation.
	 */
	_v: string;
}

/**
 * Helper function to persist a value on client's local storage using svelte's reactive statement
 * syntax ($: persistValue());
 *
 * @param key Locals storage key to persist the value to.
 */
export function persistValue<T>(key: string, value: T) {
	if (!browser) return;
	// To do: check version to clear if persisted is not up to date.
	localStorage.setItem(key, JSON.stringify(<Persisted<T>>{ value, _v: version }, ES6JSON.replacer));
}

/**
 * Get a value potentially stored in the client's local storage, and return fallback value if not
 * found.
 */
export function getPersistedValue<T>(key: string, fallback: T) {
	if (!browser) return fallback;
	const local = localStorage.getItem(key);
	if (!local) return fallback;
	const { _v, value }: Persisted<T> = JSON.parse(local, ES6JSON.reviver);
	return _v === version ? value : fallback;
}

/**
 * Svelte writable store wrapper to persist state into client's local storage.
 */
export function persistWritable<T>(key: string, ...args: Parameters<typeof writable<T>>) {
	if (!browser) return writable(...args);
	const init = getPersistedValue(key, args[0]);
	const store = writable(init, (set) => {
		const unsub = args[1] && args[1](set);
		const localUnsub = store.subscribe((newValue) => {
			persistValue(key, newValue);
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
	const init = getPersistedValue(key, args[0]);
	const store = readable(init, (set) => {
		const unsub = args[1] && args[1](set);
		const localUnsub = store.subscribe((newValue) => {
			persistValue(key, newValue);
		});
		function stop() {
			unsub && unsub();
			localUnsub();
		}
		return stop;
	});
	return store;
}
