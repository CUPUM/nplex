import Ripple from '$lib/components/primitives/ripple.svelte';
import { mount, unmount, type ComponentProps } from 'svelte';

export function ripple(target: HTMLElement, options?: ComponentProps<Ripple>) {
	let props = $state(options);
	const comp = mount(Ripple, { target, props });
	return {
		update(args) {
			props = args;
		},
		destroy() {
			unmount(comp);
		},
	} satisfies SvelteActionReturnType;
}
