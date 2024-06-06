export class Dialog {
	modal = $state(true);
	closeOnClickoutside = $state(true);
	#beforeClose;
	#open = $state(false);
	#pointerInside = $state(false);
	#node = $state<HTMLDialogElement>();

	constructor({
		open,
		modal,
		closeOnClickoutside,
		beforeClose,
	}: {
		open?: boolean;
		modal?: boolean;
		closeOnClickoutside?: boolean;
		beforeClose?: (e?: Event) => boolean;
	} = {}) {
		if (open != null) this.open = open;
		if (modal != null) this.modal = modal;
		if (closeOnClickoutside != null) this.closeOnClickoutside = closeOnClickoutside;
		this.#beforeClose = beforeClose;
		this.close.bind(this);
		this.#setPointerInside.bind(this);

		// Force-setting a data attribute to handle closing state while inner transitions block early unmounting.
		$effect.pre(() => {
			if (this.#node) {
				if (!this.#open) {
					this.#node.setAttribute('data-closing', 'true');
				} else {
					this.#node.removeAttribute('data-closing');
				}
			}
		});
	}

	get open() {
		return this.#open;
	}

	set open(state: boolean) {
		if (state) {
			if (this.modal) {
				this.#node?.showModal();
			} else {
				this.#node?.show();
			}
			this.#open = state;
		} else {
			this.close();
		}
	}

	close(e?: Event) {
		const proceed = this.#beforeClose ? this.#beforeClose(e) : true;
		if (!proceed) {
			return;
		}
		this.#open = false;
	}

	#unsetNode() {
		this.#node = undefined;
	}

	#setPointerInside(value: boolean) {
		this.#pointerInside = value;
	}

	dialogAction = (node: HTMLDialogElement) => {
		this.#node = node;
		const _this = this;
		if (this.open) {
			if (this.modal) {
				this.#node?.showModal();
			} else {
				this.#node?.show();
			}
		}
		return {
			destroy() {
				_this.#unsetNode();
			},
		};
	};

	get dialogAttributes() {
		const _this = this;
		return {
			onpointerdown(e: PointerEvent) {
				if (e.target !== e.currentTarget) {
					_this.#setPointerInside(true);
				}
			},
			onpointerup(e: PointerEvent) {
				if (e.target !== e.currentTarget) {
					_this.#setPointerInside(true);
				}
			},
			onclick(e: MouseEvent) {
				if (_this.closeOnClickoutside) {
					if (!_this.#pointerInside) {
						_this.close(e);
					}
					_this.#setPointerInside(false);
				}
			},
			oncancel(e: Event) {
				e.preventDefault();
				_this.close(e);
			},
			onclose(e: Event) {
				if (_this.open && !e.defaultPrevented) {
					_this.close(e);
				}
			},
		};
	}

	get triggerAttributes() {
		const _this = this;
		return {
			'aria-haspopup': 'dialog' as const,
			onclick(e: MouseEvent) {
				const next = !_this.open;
				if (!next) {
					_this.close(e);
				} else {
					_this.open = next;
				}
			},
			get 'data-state'() {
				return _this.open ? 'open' : 'closed';
			},
			get 'aria-expanded'() {
				return _this.open;
			},
		};
	}

	get closeAttributes() {
		const _this = this;
		return {
			onclick(e: MouseEvent) {
				if (!e.defaultPrevented) {
					_this.close(e);
				}
			},
		};
	}
}
