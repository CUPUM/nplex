import Loading from '$lib/components/Loading.svelte';
import type { ComponentProps } from 'svelte';
import { derived, get, writable, type Readable } from 'svelte/store';

export function loading(
	node: HTMLElement,
	options?: ComponentProps<Loading> & {
		state: boolean;
	}
) {
	let comp: Loading | undefined = new Loading({
		target: node,
		props: options,
	});
	return {
		update(args) {
			if (comp && !args.state) {
				comp.$destroy();
				comp = undefined;
			} else if (!comp && args.state) {
				comp = new Loading({
					target: node,
					props: args,
				});
			}
		},
		destroy() {
			comp && comp.$destroy();
		},
	} satisfies SvelteActionReturnType;
}

/**
 * Builder to add conditional loading state to element. Appends an instance of Loading.svelte to the
 * host and sets [data-lodaing] correspondingly.
 */
export function createLoading({
	state = false,
	...props
}: {
	state?: boolean | Readable<boolean> | Readable<boolean>[];
} & ComponentProps<Loading> = {}) {
	const aggregatedState = Array.isArray(state)
		? derived(state, ($state) => {
				return $state.every((s) => s);
		  })
		: state;

	const init = typeof aggregatedState === 'boolean' ? aggregatedState : get(aggregatedState);

	const _state = writable(init);

	const unsubCreate =
		typeof aggregatedState === 'boolean'
			? undefined
			: aggregatedState.subscribe((v) => {
					_state.set(v);
			  });

	const element = derived(_state, ($state) => {
		return {
			'data-loading': $state || undefined,
		};
	});

	function action(node: HTMLElement) {
		const a = loading(node, { ...props, state: get(_state) });
		const unsub = _state.subscribe((v) => {
			a.update({ ...props, loading: v });
		});
		return {
			destroy() {
				unsub();
				unsubCreate && unsubCreate();
				a.destroy();
			},
		} satisfies SvelteActionReturnType;
	}

	return {
		state: _state,
		element,
		action,
	};
}
