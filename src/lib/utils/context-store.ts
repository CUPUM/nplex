import { getContext, hasContext, setContext } from 'svelte';
import { readable, writable } from 'svelte/store';

/**
 * Context coordinator for any type of store that should be context-scoped instead of singletons.
 * Heavily inspired by react's context & provider pattern.
 *
 * @see https://dev.to/jdgamble555/the-correct-way-to-use-stores-in-sveltekit-3h6i.
 */
export const useContextStore = <T, A>(name: string, fn: (value?: A) => T, defaultValue?: A) => {
	if (hasContext(name)) {
		return getContext<T>(name);
	}
	const _value = fn(defaultValue);
	setContext(name, _value);
	return _value;
};

/**
 * Writable context store.
 */
export const useWritable = <T>(name: string, value: T) => useContextStore(name, writable, value);

/**
 * Readable context store.
 */
export const useReadable = <T>(name: string, value: T) => useContextStore(name, readable, value);
