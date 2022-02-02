import type { TooltipOptions } from 'src/types/tooltip';
import type { SvelteComponent } from 'svelte';
import { check_outros, group_outros, transition_out } from 'svelte/internal';
import Tooltip from '$components/primitives/Tooltip.svelte';

// Workaround for https://github.com/sveltejs/svelte/issues/4056
function outroAndDestroy(instance: SvelteComponent) {
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

export function tooltip(element: HTMLElement, opts?: TooltipOptions): { destroy } {
	let tooltip: SvelteComponent;
	const title = element.getAttribute('title');

	function mouseenter() {
		if (title) {
			element.removeAttribute('title');
		}
		tooltip = new Tooltip({
			target: document.body,
			intro: true,
			props: {
				// Probablement une utilisation erronnée du nullish coalesc
				message: opts?.message ?? title ?? null
			}
		});
	}

	function mouseleave() {
		if (title) {
			element.setAttribute('title', title);
		}
		outroAndDestroy(tooltip);
	}

	element.addEventListener('mouseenter', mouseenter);
	element.addEventListener('mouseleave', mouseleave);

	return {
		destroy() {
			element.removeEventListener('mouseover', mouseenter);
			element.removeEventListener('mouseleave', mouseleave);
		}
	};
}
