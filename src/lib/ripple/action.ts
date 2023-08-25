import type { ComponentProps } from 'svelte';
import Ripple from './ripple.svelte';

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
