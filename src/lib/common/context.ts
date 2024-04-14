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
