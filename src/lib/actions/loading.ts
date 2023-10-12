import { browser } from '$app/environment';
import { navigating } from '$app/stores';
import Loading from '$lib/components/Loading.svelte';
import { outroAndDestroy } from '$lib/utils/outro-and-destroy';
import { onDestroy, type ComponentProps } from 'svelte';
import type { Action } from 'svelte/action';
import { derived, get, readable, writable, type Readable } from 'svelte/store';

/**
 * Apply a loading state to the host node through data attributes and insert/remove a loading
 * component accordingly.
 */
export const loading2: Action<
	HTMLElement,
	ComponentProps<Loading> & { state?: boolean; disable?: boolean }
> = (node: HTMLElement, { state, disable, ...props } = {}) => {
	let owner = false;
	let comp: Loading | undefined;
	if (state) {
		owner = true;
		node.setAttribute('data-loading', 'true');
		if (disable) {
			node.setAttribute('disabled', '');
			node.setAttribute('data-disabled', 'true');
		}
		new Loading({
			intro: true,
			target: node,
			props,
		});
	}
	return {
		update({ state, ...props }) {
			if (state) {
				owner = true;
				node.setAttribute('data-loading', 'true');
				if (disable) {
					node.setAttribute('disabled', '');
					node.setAttribute('data-disabled', 'true');
				}
			} else {
				if (owner) {
					node.removeAttribute('data-loading');
					node.removeAttribute('disabled');
					node.removeAttribute('data-disabled');
				}
			}
			if (comp) {
				if (state) {
					comp.$set(props);
				} else {
					// comp.$destroy();
					outroAndDestroy(comp);
					comp = undefined;
				}
			} else if (!comp && state) {
				comp = new Loading({
					intro: true,
					target: node,
					props,
				});
			}
		},
		destroy() {
			if (comp) {
				// We do not use outroAndDestroy here to avoid blocking navigations.
				comp.$destroy();
			}
		},
	};
};

/** Apply loading state based on if the host node is the current form submitter node. */
export const loadingSubmitter: Action<
	HTMLElement,
	ComponentProps<Loading> & { submitter?: Element | null }
> = (node, { submitter, ...props } = {}) => {
	const _loading = loading2(node, { ...props, state: submitter === node });
	return {
		update({ submitter, ...props }) {
			_loading?.update && _loading.update({ ...props, state: submitter === node });
		},
		destroy() {
			_loading?.destroy && _loading.destroy();
		},
	};
};

function getNodeFormaction(node: HTMLElement) {
	const actionAttr = node.getAttribute('formaction');
	if (actionAttr) {
		return actionAttr;
	}
	const formAttr = 'form' in node && node.form;
	return formAttr || undefined;
}

/**
 * Apply loading state based on weather the host node's related form action corresponds to the
 * current loading formaction.
 */
export const loadingFormaction: Action<
	HTMLElement,
	ComponentProps<Loading> & { formaction?: string | null; disable?: boolean }
> = (node, { formaction, ...props } = {}) => {
	const nodeaction = getNodeFormaction(node);
	const _loading = loading2(node, { ...props, state: nodeaction === formaction });
	return {
		update({ formaction, ...props }) {
			const nodeaction = getNodeFormaction(node);
			_loading?.update && _loading.update({ ...props, state: nodeaction === formaction });
		},
		destroy() {
			_loading?.destroy && _loading.destroy();
		},
	};
};

/**
 * Apply loading state based on if the current router destination corresponds to the anchor's href.
 * Default matcher simply checks for pathname equality.
 */
export const loadingLink: Action<
	HTMLAnchorElement,
	ComponentProps<Loading> & { disable?: boolean; matcher?: (url: URL) => boolean }
> = (node, { matcher = (url) => url.pathname === node.href, ...props } = {}) => {
	const _matcher = writable(matcher);
	const isto = browser
		? derived([navigating, _matcher], ([$n, $matcher]) => {
				if (!$n?.to) {
					return false;
				}
				return $matcher($n.to.url);
		  })
		: readable(false);
	const _loading = loading2(node, { ...props, state: get(isto) });
	const unsub = isto.subscribe((v) => {
		_loading?.update && _loading.update({ ...props, state: v });
	});
	return {
		update({ matcher, ...props }) {
			if (matcher && matcher !== get(_matcher)) {
				_matcher.set(matcher);
			} else {
				_loading?.update && _loading.update({ ...props, state: get(isto) });
			}
		},
		destroy() {
			unsub();
			_loading?.destroy && _loading.destroy();
		},
	};
};

// OLD VERSION. DEPRECATE.

export function loading(
	node: HTMLElement,
	options?: ComponentProps<Loading> & {
		state: boolean;
	}
) {
	let comp: Loading | undefined;
	const { state, ...props } = options ?? {};
	if (state) {
		new Loading({
			intro: true,
			target: node,
			props,
		});
	}

	return {
		update(args: typeof options) {
			const { state, ...props } = args ?? {};
			if (comp && !state) {
				// comp.$destroy();
				outroAndDestroy(comp);
				comp = undefined;
			} else if (!comp && state) {
				comp = new Loading({
					intro: true,
					target: node,
					props,
				});
			}
		},
		destroy() {
			if (comp) {
				outroAndDestroy(comp);
				// We do not use outroAndDestroy here to avoid blocking navigations.
				// comp.$destroy();
			}
		},
	} satisfies SvelteActionReturnType;
}

/**
 * Builder to add conditional loading state to element. Appends an instance of Loading.svelte to the
 * host and sets [data-lodaing] correspondingly.
 */
export function createLoading({
	state = false,
	disable = true,
	...props
}: {
	state?: boolean | Readable<boolean> | Readable<boolean>[];
	disable?: boolean;
} & ComponentProps<Loading> = {}) {
	const optionsState = Array.isArray(state)
		? derived(state, ($state) => {
				return $state.every((s) => s);
		  })
		: state;

	const _state = writable(typeof optionsState === 'boolean' ? optionsState : get(optionsState));

	const unsubOptionsState =
		typeof optionsState === 'boolean'
			? undefined
			: optionsState.subscribe((v) => {
					_state.set(v);
			  });

	const element = derived(_state, ($state) => {
		return {
			'data-loading': $state || undefined,
			'data-disabled': (disable && $state) || undefined,
			'disabled': (disable && $state) || undefined,
		};
	});

	function action(node: HTMLElement) {
		const loadingAction = loading(node, { ...props, state: get(_state) });
		const unsub = _state.subscribe((state) => {
			loadingAction.update({ ...props, state });
		});
		return {
			destroy() {
				unsub();
				loadingAction.destroy();
			},
		} satisfies SvelteActionReturnType;
	}

	onDestroy(() => {
		unsubOptionsState && unsubOptionsState();
	});

	return {
		state: _state,
		element,
		action,
	};
}

export function createFormActionLoading() {
	const input = writable<null | { action: URL; formElement: HTMLFormElement }>(null);

	const element = derived<
		typeof input,
		<A extends string | undefined>(
			formaction?: A,
			disable?: boolean
		) => {
			'data-loading': true | undefined;
			'data-disabled': true | undefined;
			'disabled': true | undefined;
			'formaction': A extends string ? A : undefined;
		}
	>(input, ($current) => {
		return function loadingElement(
			/**
			 * The formaction to compare. Undefined means the form's action attribute value should be
			 * used.
			 */
			formaction?: string,
			/** Should the element be disabled when submitting? */
			disable = true
		) {
			const refaction =
				formaction ?? ($current && $current.formElement.getAttribute('action')) ?? '';
			const state = $current?.action.search === refaction;
			return {
				'data-loading': state || undefined,
				'data-disabled': (disable && state) || undefined,
				'disabled': (disable && state) || undefined,
				'formaction': formaction ?? undefined,
			};
		};
	});

	function loadingAction(
		node: HTMLElement,
		/**
		 * The formaction to compare the current aciton to. If none is given, element's formaction
		 * attribute value will be used.
		 */
		formaction?: string
	) {
		const loadingAction = loading(node);
		const unsub = input.subscribe((current) => {
			const refaction =
				formaction ??
				node.getAttribute('formaction') ??
				current?.formElement.getAttribute('action') ??
				'';
			loadingAction.update({ state: current?.action.search === refaction });
			return {
				destroy() {
					unsub();
					loadingAction.destroy();
				},
			} satisfies SvelteActionReturnType;
		});
	}

	return {
		state: { input },
		element,
		action: {
			loading: loadingAction,
		},
	};
}
