import { loadingFormaction, loadingSubmitter } from '$lib/actions/loading';
import { TOAST_TYPES } from '$lib/components/Toast.svelte';
import { addToast } from '$lib/components/ToastsOutlet.svelte';
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
	M extends App.PageData['flash'] = App.PageData['flash'],
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
		async onSubmit(input) {
			submitter.set(input.submitter);
			formaction.set(input.action);
			options?.onSubmit && (await options.onSubmit(input));
		},
		async onResult(event) {
			submitter.set(undefined);
			formaction.set(undefined);
			options?.onResult && (await options.onResult(event));
		},
		onUpdated(event) {
			if (event.form.message) {
				event.form.message.forEach(({ closeDelay, ...data }) => {
					console.log('Should dispatch');
					data.type = event.form.valid ? TOAST_TYPES.SUCCESS : TOAST_TYPES.ERROR;
					addToast({
						closeDelay,
						data,
					});
				});
			}
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

export type SuperForm<
	T extends ZodValidation<AnyZodObject> = ZodValidation<AnyZodObject>,
	M extends App.PageData['flash'] = App.PageData['flash'],
> = ReturnType<typeof superForm<T, M>>;

/**
 * Create a superform embeded in a dialog window. This helper allows preventing dataloss or
 * unwarranted tainted messages by using the dialog's state rather than navigation events to prompt
 * for user confirmation and to reset the form's data.
 */
export function superFormDialog<
	T extends ZodValidation<AnyZodObject> = ZodValidation<AnyZodObject>,
	M extends App.PageData['flash'] = App.PageData['flash'],
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

export type SuperFormDialog<
	T extends ZodValidation<AnyZodObject> = ZodValidation<AnyZodObject>,
	M extends App.PageData['flash'] = App.PageData['flash'],
> = ReturnType<typeof superFormDialog<T, M>>;
