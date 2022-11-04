import { getContext } from 'svelte';

type Enum = string | number | symbol;

/**
 * Utility type to enforce defining a type that implements the passed context's enum keys.
 */
export type IContext<E extends Enum, C extends Record<E, unknown>> = C;

/**
 * //
 */
// export function setTypedContext<C, K>(key: K keyof C, value: C[K]) {
// 	setContext
// }

/**
 * Utility to get a typed context by its key.
 *
 * Since partial generic inference is not yet a part of typescript
 * (https://github.com/microsoft/TypeScript/issues/10571), we have to create stepped inference sites.
 *
 * Read: https://github.com/danvk/effective-typescript/issues/22.
 *
 * A common workaround is to decompose the type inference into multiple stages.
 */
export function getTypedContext<I extends IContext<Enum, Record<Enum, unknown>>>() {
	return <K extends keyof I>(k: K) => getContext<I[K]>(k);
}
