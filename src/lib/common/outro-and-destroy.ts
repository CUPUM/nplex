import type { SvelteComponent } from 'svelte';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore:next-line
import { check_outros, group_outros, transition_out } from 'svelte/internal';

/**
 * Workaround to ensure outro transitions get a chance to play.
 *
 * @see https://github.com/sveltejs/svelte/issues/4056
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
