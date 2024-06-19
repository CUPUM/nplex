import type { ToastParameters, Toasts } from '$lib/builders/toasts.svelte';
import { readonly, writable } from 'svelte/store';
import {
	superForm,
	type Infer,
	type SuperForm,
	type SuperValidated,
} from 'sveltekit-superforms/client';
import { toasts as rootToasts } from '../../../routes/[[lang=lang]]/toasts-provider.svelte';

function isToastParameters(
	maybeToastParameters: unknown
): maybeToastParameters is ToastParameters<string> {
	if (typeof maybeToastParameters === 'object' && maybeToastParameters !== null) {
		if (
			'content' in maybeToastParameters &&
			typeof maybeToastParameters.content === 'object' &&
			maybeToastParameters.content !== null
		) {
			if (
				'body' in maybeToastParameters.content &&
				typeof maybeToastParameters.content.body === 'string'
			) {
				return true;
			}
		}
	}
	return false;
}

/**
 * Add a store to track the current form's submitter element and action key.
 *
 * @todo Update to runes ONLY once superform updates to runes.
 */
export function extendedSuperForm<
	T extends Record<string, unknown> = Record<string, unknown>,
	M = App.Superforms.Message,
>(
	form: Parameters<typeof superForm<T, M>>[0],
	{
		toasts = rootToasts,
		onSubmit,
		onResult,
		...formOptions
	}: Parameters<typeof superForm<T, M>>[1] & { toasts?: Toasts } = {}
) {
	let submitter = writable<HTMLElement | undefined>(undefined);
	let action = writable<URL | null>(null);

	const baseForm = superForm(form, {
		...formOptions,
		onSubmit(e) {
			submitter.set(e.submitter ?? undefined);
			action.set(e.action);
			if (onSubmit) {
				return onSubmit(e);
			}
		},
		onResult(e) {
			submitter.set(undefined);
			action.set(null);
			if (onResult) {
				return onResult(e);
			}
		},
	});

	// Dispatch toast if message has shape.
	baseForm.message.subscribe((m) => {
		if (isToastParameters(m)) {
			toasts.add(m);
		}
	});

	return {
		...baseForm,
		submitter: readonly(submitter),
		action: readonly(action),
	};
}

export type ExtendedSuperForm<
	T extends Record<string, unknown>,
	M = App.Superforms.Message,
> = ReturnType<typeof extendedSuperForm<T, M>>;

export type SuperFormData<T extends SuperValidated<Infer<Record<string, unknown>>>> =
	T extends SuperValidated<infer U, infer M> ? SuperForm<U, M> : never;

export type ExtendedSuperFormData<T extends SuperValidated<Infer<Record<string, unknown>>>> =
	T extends SuperValidated<infer U, infer M> ? ExtendedSuperForm<U, M> : never;
