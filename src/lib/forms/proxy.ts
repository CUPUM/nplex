import { get, writable, type Writable } from 'svelte/store';
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
		/**
		 * Transformer to convert the value from its form shape to the custom shape.
		 */
		to,
		/**
		 * Transformer to convert the custom shaped store's value to the form's value.
		 */
		from,
	}: {
		to: (value: FormPathType<T, F>) => V;
		from: (value: V) => FormPathType<T, F>;
	}
) {
	const proxied = fieldProxy(form, path);
	const init = to(get(proxied));
	const transformed = writable<V>(init);
	proxied.subscribe((v) => {
		transformed.set(to(v));
	});
	transformed.subscribe((v) => {
		proxied.set(from(v));
	});
	return transformed;
}
