import { loadingFormaction, loadingSubmitter } from '$lib/actions/loading';
import { derived, readonly, writable } from 'svelte/store';
import type { SuperValidated, UnwrapEffects, ZodValidation } from 'sveltekit-superforms';
import { superForm as _superForm, type FormOptions } from 'sveltekit-superforms/client';
import type { AnyZodObject } from 'zod';

/**
 * Extend superform's client-side function by additioanlly returning actions to handle loading state
 * on elements in relation to the form's submitter and the submitted form action.
 */
export function superForm<
	T extends ZodValidation<AnyZodObject> = ZodValidation<AnyZodObject>,
	M = unknown,
>(form: SuperValidated<T, M>, options?: FormOptions<UnwrapEffects<T>, M>) {
	const submitter = writable<HTMLElement | null | undefined>(undefined);
	const _loadingSubmitter = derived(submitter, ($s) => {
		return function (
			node: HTMLElement,
			props: Omit<Parameters<typeof loadingSubmitter>, 'submitter'>
		) {
			return loadingSubmitter(node, { ...props, submitter: $s });
		};
	});
	const formaction = writable<URL | undefined>(undefined);
	const _loadingFormaction = derived(formaction, ($fa) => {
		return function (
			node: HTMLElement,
			props: Omit<Parameters<typeof loadingFormaction>, 'formaction'>
		) {
			return loadingFormaction(node, { ...props, formaction: $fa });
		};
	});

	const sf = _superForm(form, {
		...options,
		onSubmit(input) {
			submitter.set(input.submitter);
			formaction.set(input.action);
			options?.onSubmit && options.onSubmit(input);
		},
		onResult(event) {
			submitter.set(undefined);
			formaction.set(undefined);
			options?.onResult && options.onResult(event);
		},
	});

	return {
		...sf,
		submitter: readonly(submitter),
		formaction: readonly(formaction),
		loading: {
			submitter: _loadingSubmitter,
			formaction: _loadingFormaction,
		},
	};
}
