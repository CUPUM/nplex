import * as m from '$i18n/messages';
import {
	createLoadable,
	createLoadableFormaction,
	createLoadableSubmitter,
} from '$lib/builders/loading';
import { TOAST_TYPES } from '$lib/components/Toast.svelte';
import { addToast } from '$lib/components/ToastsOutlet.svelte';
import { createDialog, type CreateDialogProps } from '@melt-ui/svelte';
import { onDestroy } from 'svelte';
import { derived, get, readonly, writable } from 'svelte/store';
import type { SuperValidated, UnwrapEffects, ZodValidation } from 'sveltekit-superforms';
import { superForm as _superForm, type FormOptions } from 'sveltekit-superforms/client';
import type { AnyZodObject, z } from 'zod';

/**
 * Extend superform's client-side function by additioanlly returning actions to handle loading state
 * on elements in relation to the form's submitter and the submitted form action.
 */
export function superForm<
	T extends ZodValidation<AnyZodObject> = ZodValidation<AnyZodObject>,
	M extends App.Superforms.Message = App.Superforms.Message,
>(form: SuperValidated<T, M>, options?: FormOptions<UnwrapEffects<T>, M>) {
	const loading = createLoadable({ disable: true });
	const submitter = writable<HTMLElement | undefined>(undefined);
	const loadableSubmitter = createLoadableSubmitter({ disable: true });
	const unsubSubmitter = submitter.subscribe((value) => {
		loadableSubmitter.submitter.set(value);
	});
	const formaction = writable<URL | undefined>(undefined);
	const loadableFormaction = createLoadableFormaction({ disable: true });
	const unsubFormaction = formaction.subscribe((value) => {
		loadableFormaction.formaction.set(value);
	});

	const sf = _superForm(form, {
		...options,
		async onSubmit(input) {
			loading.state.set(true);
			submitter.set(input.submitter ?? undefined);
			formaction.set(input.action);
			options?.onSubmit && (await options.onSubmit(input));
		},
		async onResult(event) {
			loading.state.set(false);
			submitter.set(undefined);
			formaction.set(undefined);
			options?.onResult && (await options.onResult(event));
		},
		onUpdated(event) {
			if (event.form.message) {
				const { closeDelay, ...data } = event.form.message;
				data.type = event.form.valid ? TOAST_TYPES.SUCCESS : TOAST_TYPES.ERROR;
				addToast({
					closeDelay,
					data,
				});
			}
		},
	});

	/**
	 * Attribute records for validation feedback states.
	 */
	const states = derived(sf.errors, ($errors) => {
		type FormKey = keyof z.infer<T>;
		return (Object.keys($errors) as FormKey[]).reduce(
			(acc, curr) => {
				acc[curr] = {
					'aria-invalid': $errors[curr] ? true : undefined,
					'data-invalid': $errors[curr] ? true : undefined,
				};
				return acc;
			},
			{} as Record<FormKey, { 'aria-invalid'?: boolean; 'data-invalid'?: boolean }>
		);
	});

	onDestroy(() => {
		unsubSubmitter && unsubSubmitter();
		unsubFormaction && unsubFormaction();
	});

	return {
		...sf,
		submitter: readonly(submitter),
		formaction: readonly(formaction),
		states,
		elements: {
			submitter: loadableSubmitter.elements,
			formaction: loadableFormaction.elements,
			loading: loading.elements,
		},
	};
}

export type SuperForm<
	T extends ZodValidation<AnyZodObject> = ZodValidation<AnyZodObject>,
	M extends App.Superforms.Message = App.Superforms.Message,
> = ReturnType<typeof superForm<T, M>>;

/**
 * Create a superform embeded in a dialog window. This helper allows preventing dataloss or
 * unwarranted tainted messages by using the dialog's state rather than navigation events to prompt
 * for user confirmation and to reset the form's data.
 */
export function superFormDialog<
	T extends ZodValidation<AnyZodObject> = ZodValidation<AnyZodObject>,
	M extends App.Superforms.Message = App.Superforms.Message,
>(
	form: SuperValidated<T, M>,
	{
		closeOnSuccess = false,
		taintedMessage = m.confirm_unsaved_data(),
		...options
	}: FormOptions<UnwrapEffects<T>, M> & CreateDialogProps & { closeOnSuccess?: boolean }
) {
	// Controlled state
	const open = options.open ?? writable(options.defaultOpen ?? false);

	// Superform with base augmented behaviors
	const superform = superForm(form, {
		taintedMessage,
		...options,
		onResult(event) {
			options.onResult && options.onResult(event);
			if (event.result.type === 'success') {
				if (closeOnSuccess) {
					open.set(false);
				}
			}
		},
	});

	// Dialog instance with augmented behaviors linked to superform
	const dialog = createDialog({
		...options,
		open,
		onOpenChange(state) {
			if (taintedMessage && !state.next && get(superform.tainted)) {
				const confirmed = confirm(taintedMessage);
				if (confirmed) {
					superform.reset();
				}
				return !confirmed;
			}
			return options?.onOpenChange ? options.onOpenChange(state) : state.next;
		},
	});

	return {
		...superform,
		...dialog,
		elements: {
			...dialog.elements,
			...superform.elements,
			// close,
		},
	};
}

export type SuperFormDialog<
	T extends ZodValidation<AnyZodObject> = ZodValidation<AnyZodObject>,
	M extends App.Superforms.Message = App.Superforms.Message,
> = ReturnType<typeof superFormDialog<T, M>>;
