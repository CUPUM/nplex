import type { SvelteComponent } from 'svelte';
import { check_outros, group_outros, transition_out } from 'svelte/internal';

/**
 * Helper function to make sure a programatically managed component plays the expected outro transition when being
 * destroyed. Workaround for https://github.com/sveltejs/svelte/issues/4056.
 */
export function outroAndDestroy(instance: SvelteComponent) {
	if (instance.$$.fragment && instance.$$.fragment.o) {
		group_outros();
		transition_out(instance.$$.fragment, 0, 0, () => {
			instance.$destroy();
		});
		check_outros();
	} else {
		instance.$destroy();
	}
}
