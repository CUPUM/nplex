import Loading from '$lib/components/Loading.svelte';
import type { ComponentProps } from 'svelte';
import { derived, get, writable } from 'svelte/store';

export function loading(
	node: HTMLElement,
	options?: ComponentProps<Loading> & {
		loading: boolean;
	}
) {
	let comp: Loading | undefined = new Loading({
		target: node,
		props: options,
	});
	return {
		update(args) {
			if (comp && !args.loading) {
				comp.$destroy();
				comp = undefined;
			} else if (!comp && args.loading) {
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
	init = false,
	...props
}: {
	init?: boolean;
} & ComponentProps<Loading> = {}) {
	const state = writable(init);

	const element = derived(state, ($state) => {
		return {
			'data-loading': $state || undefined,
		};
	});

	function action(node: HTMLElement) {
		const a = loading(node, { ...props, loading: get(state) });
		const unsub = state.subscribe((v) => {
			a.update({ ...props, loading: v });
		});
		return {
			destroy() {
				unsub();
				a.destroy();
			},
		} satisfies SvelteActionReturnType;
	}

	return {
		state,
		element,
		action,
	};
}
