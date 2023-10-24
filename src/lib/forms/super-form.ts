import { loadingFormaction, loadingSubmitter } from '$lib/actions/loading';
import { createDialog, type CreateDialogProps } from '@melt-ui/svelte';
import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
import { derived, get, readonly, writable } from 'svelte/store';
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

/**
 * Create a superform embeded in a dialog window. This helper allows preventing dataloss or
 * unwarranted tainted messages by using the dialog's state rather than navigation events to prompt
 * for user confirmation and to reset the form's data.
 */
export function superFormDialog<
	T extends ZodValidation<AnyZodObject> = ZodValidation<AnyZodObject>,
	M = unknown,
>(form: SuperValidated<T, M>, options?: FormOptions<UnwrapEffects<T>, M> & CreateDialogProps) {
	const superform = superForm(form, options);
	// Prompt for confirmation.
	const onOpenChange: ChangeFn<boolean> = (state) => {
		if (!state.next && get(superform.tainted)) {
			const confirmed = confirm('Are you certain?');
			if (confirmed) {
				superform.reset();
			}
			return !confirmed;
		}
		return options?.onOpenChange ? options.onOpenChange(state) : state.next;
	};
	const dialog = createDialog({ ...options, onOpenChange });
	return {
		...superform,
		...dialog,
		// elements: {
		// 	...dialog.elements,
		// 	close,
		// },
	};
}
