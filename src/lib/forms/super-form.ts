import * as m from '$i18n/messages';
import {
	createLoadable,
	createLoadableFormaction,
	createLoadableSubmitter,
} from '$lib/builders/loading';
import { TOAST_TYPES } from '$lib/components/Toast.svelte';
import { addToast } from '$lib/components/ToastsOutlet.svelte';
import { debounce } from '$lib/utils/throttle-debounce';
import { createDialog, type CreateDialogProps } from '@melt-ui/svelte';
import { onDestroy } from 'svelte';
import { derived, get, readable, readonly, writable } from 'svelte/store';
import {
	superForm as originalSuperForm,
	type FormOptions,
	type Infer,
	type SuperValidated,
} from 'sveltekit-superforms';

/**
 * Extend superform's client-side function by additioanlly returning actions to handle loading state
 * on elements in relation to the form's submitter and the submitted form action.
 */
export function superForm<
	T extends Infer<Record<string, unknown>> = Infer<Record<string, unknown>>,
	M extends App.Superforms.Message = App.Superforms.Message,
>(form: SuperValidated<T, M>, options?: FormOptions<T, M>) {
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

	const instance = originalSuperForm(form, {
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
			options?.onUpdated && options.onUpdated(event);
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
	 * Debounced global form tainted state check.
	 */
	const formTainted = readable(instance.isTainted(), (set) => {
		const checkTainted = debounce(() => {
			set(instance.isTainted());
		}, 100);
		const unsub = instance.form.subscribe(checkTainted);
		return () => {
			unsub();
			checkTainted.cancel();
		};
	});

	/**
	 * Attribute records for validation feedback states.
	 */
	const states = derived(instance.errors, ($errors) => {
		type FormKey = keyof T;
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
		...instance,
		formTainted,
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
	T extends Infer<Record<string, unknown>> = Infer<Record<string, unknown>>,
	M extends App.Superforms.Message = App.Superforms.Message,
> = ReturnType<typeof superForm<T, M>>;

/**
 * Creates a superform to embed in a dialog window. Aims to prevent dataloss or unwarranted tainted
 * messages by using the dialog's state rather than navigation events to prompt for user
 * confirmation and to reset the form's data.
 */
export function superFormDialog<
	T extends Infer<Record<string, unknown>> = Infer<Record<string, unknown>>,
	M extends App.Superforms.Message = App.Superforms.Message,
>(
	form: SuperValidated<T, M>,
	{
		closeOnSuccess = false,
		taintedMessage,
		...options
	}: FormOptions<T, M> & CreateDialogProps & { closeOnSuccess?: boolean }
) {
	/**
	 * Controlled state.
	 */
	const open = options.open ?? writable(options.defaultOpen ?? false);

	/**
	 * Saved last successful submission for 1-back reset.
	 *
	 * @see https://github.com/ciscoheat/sveltekit-superforms/issues/105
	 */
	let saved: SuperValidated<T, M>['data'] | undefined;

	// Superform with base augmented behaviors
	const instance = superForm(form, {
		taintedMessage,
		...options,
		onUpdated(event) {
			if (!event.form.valid && !event.form.errors) {
				saved = structuredClone(event.form.data);
			}
		},
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
			if (
				taintedMessage !== false &&
				taintedMessage !== null &&
				!state.next &&
				get(instance.tainted)
			) {
				const confirmed = confirm(
					typeof taintedMessage === 'string' ? taintedMessage : m.confirm_unsaved_data()
				);
				if (confirmed) {
					if (saved) {
						instance.form.set(saved, { taint: 'untaint-all' });
					} else {
						instance.reset();
					}
				}
				return !confirmed;
			}
			return options?.onOpenChange ? options.onOpenChange(state) : state.next;
		},
	});

	return {
		...instance,
		...dialog,
		states: {
			...dialog.states,
			fields: instance.states,
		},
		elements: {
			...dialog.elements,
			...instance.elements,
		},
	};
}

export type SuperFormDialog<
	T extends Infer<Record<string, unknown>> = Infer<Record<string, unknown>>,
	M extends App.Superforms.Message = App.Superforms.Message,
> = ReturnType<typeof superFormDialog<T, M>>;
