import { getContext, setContext } from 'svelte';

/**
 * Allows defining correspondingly typed context setter context getter.
 */
export function defineContext<T>(key: unknown) {
	function set(context: T) {
		return setContext<T>(key, context);
	}
	function get() {
		return getContext<T>(key);
	}
	return [get, set] as const as [getter: typeof get, setter: typeof set];
}
