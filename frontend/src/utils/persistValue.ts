import { browser } from '$app/environment';

/**
 * Helper function to persist a value on client's local storage using svelte's reactive statement syntax ($:
 * persistValue());
 *
 * @param key Locals storage key to persist the value to.
 */
export function persistValue(key: string, value: any) {
	if (!browser) return;
	localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get a value potentially stored in the client's local storage, and return fallback value if not found.
 */
export function getPersistedValue(key: string, fallback: any) {
	if (!browser) return fallback;
	const local = localStorage.getItem(key);
	return local ? JSON.parse(local) : fallback;
}
