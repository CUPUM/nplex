import Ripple from '$lib/components/Ripple.svelte';
import type { ComponentProps } from 'svelte';

export function ripple(node: HTMLElement, options?: ComponentProps<Ripple>) {
	const comp = new Ripple({
		target: node,
		props: options,
	});
	return {
		update(args) {
			comp.$set(args);
		},
		destroy() {
			comp.$destroy();
		},
	} satisfies SvelteActionReturnType;
}
