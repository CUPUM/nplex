import Ripple from '$lib/components/primitives/ripple.svelte';
import { mount, type ComponentProps } from 'svelte';

export function ripple(node: HTMLElement, options?: ComponentProps<Ripple>) {
	const comp = mount(Ripple, { target: node, props: options });
	return {
		update(args) {
			comp.$set(args);
		},
		destroy() {
			comp.$destroy();
		},
	} satisfies SvelteActionReturnType;
}
