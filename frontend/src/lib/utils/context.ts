import { getContext, setContext } from 'svelte';

/**
 * Allows defining a context setter and its corresponding getter for easier type-matching.
 */
export function defineContext<T>(key: any) {
	function setter(context: T) {
		return setContext<T>(key, context);
	}
	function getter() {
		return getContext<T>(key);
	}
	return [getter, setter] as [getter: typeof getter, setter: typeof setter];
}
