import type { ExtendedSuperForm } from '$lib/crud/form/client';
import type { SuperForm } from 'sveltekit-superforms';
import { Dialog } from './dialog.svelte';

export class DialogForm<T extends Record<string, unknown>> extends Dialog {
	dirty = $state();

	constructor({
		closeOnSuccess = false,
		form,
		...dialogOptions
	}: ConstructorParameters<typeof Dialog>[0] & {
		closeOnSuccess?: boolean;
		form: ExtendedSuperForm<T> | SuperForm<T>;
	}) {
		super(dialogOptions);

		if (closeOnSuccess) {
		}
	}

	set open(state: boolean) {}

	get closeAttributes() {
		return {
			...super.closeAttributes,
			'data-danger': undefined,
		};
	}
}
