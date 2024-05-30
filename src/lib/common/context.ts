import { getContext, setContext } from 'svelte';

/**
 * Allows defining adequately typed and corresponding context setter & context getter.
 *
 * @returns A tuple of [Context getter, Context setter];
 */
export function defineContext<T>(key: unknown) {
	function set(context: T) {
		return setContext<T>(key, context);
	}
	function get<R extends boolean>(required?: R): R extends true ? T : T | undefined {
		const ctx = getContext<T>(key);
		if (!ctx && required) {
			throw new Error(
				`No context found for key ${key}. Please make sure you are calling getContext inside a children of a component that uses setContext with that key.`
			);
		}
		return getContext<T>(key);
	}
	return [get, set] as const as [getter: typeof get, setter: typeof set];
}

/**
 * Helper to create a context allowing keeping track of a component's index in the scope of the
 * parent context setter. Useful for staggered transitions.
 */
export function defineChildIndexContext(key: unknown) {
	const [getChildIndex, setCtx] = defineContext<{ add: () => number; remove: () => void }>(key);
	function setChildIndex() {
		let index = 0; // Not using a store else updates are merged and all child end up with same index.
		setCtx({
			add: () => {
				return index++;
			},
			remove: () => {
				return index--;
			},
		});
	}
	return [getChildIndex, setChildIndex] as const;
}
