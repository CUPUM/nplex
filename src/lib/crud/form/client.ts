import { readonly, writable } from 'svelte/store';
import type { SuperForm, SuperFormEvents } from 'sveltekit-superforms/client';

/**
 * Add a store to track the current form's submitter element and action key.
 *
 * @todo Update to runes ONLY once superform updates to runes.
 */
export function extendSuperForm<
	T extends Record<string, unknown> = Record<string, unknown>,
	M = App.Superforms.Message,
>({ enhance, ...superForm }: SuperForm<T, M>) {
	let submitter = writable<HTMLElement | null>(null);
	let action = writable<URL | null>(null);

	function enhanceWithSubmitter(el: HTMLFormElement, events?: SuperFormEvents<T, M> | undefined) {
		const enhanced = enhance(el, {
			...events,
			onSubmit(e) {
				submitter.set(e.submitter);
				action.set(e.action);
				if (events?.onSubmit) {
					return events.onSubmit(e);
				}
			},
			onResult(e) {
				submitter.set(null);
				action.set(null);
				if (events?.onResult) {
					return events.onResult(e);
				}
			},
		});

		return {
			destroy() {
				submitter.set(null);
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
