export class Dialog {
	open = $state(false);
	modal = $state(true);
	closeOnClickoutside = $state(true);
	#pointerInside = $state(false);
	#node = $state<HTMLDialogElement>();

	constructor({
		open,
		modal,
		closeOnClickoutside,
	}: {
		open?: boolean;
		modal?: boolean;
		closeOnClickoutside?: boolean;
	} = {}) {
		if (open != null) this.open = open;
		if (modal != null) this.modal = modal;
		if (closeOnClickoutside != null) this.closeOnClickoutside = closeOnClickoutside;

		// Force-setting a data attribute to handle closing state while inner transitions block early unmounting.
		$effect.pre(() => {
			if (this.#node) {
				if (!this.open) {
					this.#node.setAttribute('data-closing', 'true');
				} else {
					this.#node.removeAttribute('data-closing');
				}
			}
		});

		// Handling both controlled rendering and native open/close behavior.
		$effect(() => {
			if (!this.#node) {
				return;
			}
			if (this.open) {
				if (this.modal) {
					this.#node.showModal();
				}
				this.#node.show();
			} else {
				this.#node.close();
			}
		});
	}

	#unsetNode() {
		this.#node = undefined;
	}

	#setPointerInside(value: boolean) {
		this.#pointerInside = value;
	}

	dialogAction = (node: HTMLDialogElement) => {
		this.#node = node;
		const dialog = this;
		return {
			destroy() {
				dialog.#unsetNode.call(dialog);
			},
		};
	};

	get triggerAttributes() {
		const dialog = this;
		return {
			'aria-haspopup': 'dialog' as const,
			onclick(e: MouseEvent) {
				dialog.open = !dialog.open;
			},
			get 'data-state'() {
				return dialog.open ? 'open' : 'closed';
			},
			get 'aria-expanded'() {
				return dialog.open;
			},
		};
	}

	get closeAttributes() {
		const dialog = this;
		return {
			onclick(e: MouseEvent) {
				dialog.open = false;
			},
		};
	}

	get dialogAttributes() {
		const dialog = this;
		return {
			onpointerdown(e: PointerEvent) {
				if (e.target !== e.currentTarget) {
					dialog.#setPointerInside.call(dialog, true);
				}
			},
			onpointerup(e: PointerEvent) {
				if (e.target !== e.currentTarget) {
					dialog.#setPointerInside.call(dialog, true);
				}
			},
			onclick(e: MouseEvent) {
				if (dialog.closeOnClickoutside) {
					if (!dialog.#pointerInside) {
						dialog.open = false;
					}
					dialog.#setPointerInside.call(dialog, false);
				}
			},
			onclose() {
				if (dialog.open) {
					dialog.open = false;
				}
			},
		};
	}
}
