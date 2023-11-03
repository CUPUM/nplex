import { derived, get, type Updater, type Writable } from 'svelte/store';
import type { FormPath } from 'sveltekit-superforms';
import { fieldProxy } from 'sveltekit-superforms/client';
import type { FormPathType } from 'sveltekit-superforms/dist/stringPath';

/**
 * Sync a store with a form value with customizable to and from transformations.
 *
 * Useful to provide controlled store to melt components.
 */
export function customProxy<T extends Record<string, unknown>, F extends FormPath<T>, V>(
	form: Writable<T>,
	path: F,
	{
		to,
		from,
	}: {
		to: (value: FormPathType<T, F>) => V;
		from: (value: V) => FormPathType<T, F>;
	}
) {
	const proxied = fieldProxy(form, path);
	const transformed = derived(proxied, (v) => to(v));
	const set = (v: V) => {
		proxied.set(from(v));
	};
	const update = (u: Updater<V>) => {
		const v = get(transformed);
		u(v);
	};
	return {
		...proxied,
		set,
		update,
		subscribe: transformed.subscribe,
	};
}
