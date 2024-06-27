import * as m from '$i18n/messages';
import type { ExtendedSuperForm } from '$lib/crud/form/client';
import type { SuperForm, TaintedFields } from 'sveltekit-superforms';
import { Dialog } from './dialog.svelte';

/**
 * Dialog builder that binds with a superForm.
 */
export class DialogForm<
	T extends Record<string, unknown>,
	M = App.Superforms.Message,
> extends Dialog {
	formOptions;
	tainted = $state<TaintedFields<T>>();
	isTainted: SuperForm<T>['isTainted'] | undefined = undefined;
	formTainted = $derived(
		this.isTainted && this.tainted && this.isTainted(this.tainted) ? true : false
	);

	constructor({
		closeOnSuccess = false,
		resetOnClose = true,
		form,
		...dialogOptions
	}: ConstructorParameters<typeof Dialog>[0] & {
		/**
		 * Close the dialog when a form result is successful (type === 'success').
		 */
		closeOnSuccess?: boolean;
		/**
		 * Reset the form when closing the dialog.
		 */
		resetOnClose?: boolean;
		/**
		 * @todo Type should allow SuperForm also, not just ExtendedSuperForm.
		 */
		form: ExtendedSuperForm<T, M>;
	}) {
		super({
			...dialogOptions,
			beforeClose(e) {
				if (form.options.taintedMessage && form.isTainted()) {
					if (typeof form.options.taintedMessage === 'string') {
						return confirm(form.options.taintedMessage);
					} else if (form.options.taintedMessage === true) {
						return confirm(m.confirm_unsaved_data());
					}
					// To do: handle tainted message function for async cases.
					// else if (form.options.taintedMessage) {}
				}
				return dialogOptions.beforeClose ? dialogOptions.beforeClose(e) : true;
			},
			onClose(e) {
				if (resetOnClose && form.isTainted()) {
					form.reset();
				}
			},
		});

		this.formOptions = form.options;
		this.isTainted = form.isTainted;
		form.tainted.subscribe((tainted) => {
			this.tainted = tainted;
		});

		if (closeOnSuccess) {
			form.options.onResult = (e) => {
				if (e.result.type === 'success') {
					super.close();
				}
				if (form.options.onResult) {
					form.options.onResult(e);
				}
			};
		}
	}

	get closeAttributes() {
		const _this = this;
		return {
			...super.closeAttributes,
			get 'data-danger'() {
				return _this.formTainted || undefined;
			},
		};
	}
}
