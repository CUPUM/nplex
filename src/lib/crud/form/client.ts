import type { ToastParameters, Toasts } from '$lib/builders/toasts.svelte';
import { readonly, writable } from 'svelte/store';
import type {
	Infer,
	SuperForm,
	SuperFormEvents,
	SuperValidated,
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
export function extendSuperForm<
	T extends Record<string, unknown> = Record<string, unknown>,
	M = App.Superforms.Message,
>({ enhance, ...superForm }: SuperForm<T, M>, { toasts = rootToasts }: { toasts?: Toasts } = {}) {
	let submitter = writable<HTMLElement | undefined>(undefined);
	let action = writable<URL | null>(null);

	// Dispatch toast if message has shape.
	superForm.message.subscribe((m) => {
		if (isToastParameters(m)) {
			toasts.add(m);
		}
	});

	function enhanceWithSubmitter(
		node: HTMLFormElement,
		events: SuperFormEvents<T, M> | undefined = {}
	) {
		// Tracking submitter before any superforms handling.
		function handleSubmit(e: SubmitEvent) {
			submitter.set(e.submitter ?? undefined);
		}
		node.addEventListener('submit', handleSubmit);

		// Adding enhanced form events tracking.
		const enhanced = enhance(node, {
			...events,
			async onSubmit(e) {
				console.log(e);
				submitter.set(e.submitter ?? undefined);
				action.set(e.action);
				if (events.onSubmit) {
					return events.onSubmit(e);
				}
			},
			async onResult(e) {
				submitter.set(undefined);
				action.set(null);
				if (events.onResult) {
					return events.onResult(e);
				}
			},
		});

		return {
			destroy() {
				node.removeEventListener('submit', handleSubmit);
				submitter.set(undefined);
				action.set(null);
				return enhanced.destroy();
			},
		};
	}

	return {
		...superForm,
		enhance: enhanceWithSubmitter,
		submitter: readonly(submitter),
		action: readonly(action),
	};
}

export type ExtendedSuperForm<
	T extends Record<string, unknown>,
	M = App.Superforms.Message,
> = ReturnType<typeof extendSuperForm<T, M>>;

export type SuperFormData<T extends SuperValidated<Infer<Record<string, unknown>>>> =
	T extends SuperValidated<infer U, infer M> ? SuperForm<U, M> : never;

export type ExtendedSuperFormData<T extends SuperValidated<Infer<Record<string, unknown>>>> =
	T extends SuperValidated<infer U, infer M> ? ExtendedSuperForm<U, M> : never;
