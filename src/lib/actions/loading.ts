import Loading from '$lib/components/Loading.svelte';
import { outroAndDestroy } from '$lib/utils/outro-and-destroy';
import { onDestroy, type ComponentProps } from 'svelte';
import { derived, get, writable, type Readable } from 'svelte/store';

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
			if (comp && !args?.state) {
				// comp.$destroy();
				outroAndDestroy(comp);
				comp = undefined;
			} else if (!comp && args?.state) {
				comp = new Loading({
					intro: true,
					target: node,
					props: args,
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
