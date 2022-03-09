import type { SvelteComponent } from 'svelte';
import { outroAndDestroy } from '$utils/helpers/components';
import type { SvelteProps } from '$utils/helpers/types';
import Tooltip from '$components/primitives/Tooltip.svelte';

interface TooltipOptions extends SvelteProps<Tooltip> {
	enabled: boolean;
}

/**
 * Action to attach a tooltip to a given element.
 */
export function tooltip(element: HTMLElement, {
	message = undefined,
	position = undefined,
	distance = undefined,
	enabled = true
}: TooltipOptions) {

	let tooltip: SvelteComponent;
	let title = element.getAttribute('title');

	message = message || title || undefined;
	if (!title && message) {
		title = message;
		element.setAttribute('title', title);
	}

	function mouseenter() {
		if (enabled) {
			if (title) {
				element.removeAttribute('title');
			}
			tooltip = new Tooltip({
				target: element,
				intro: true,
				props: {
					message,
					position,
					distance
				}
			});
		}
	}

	function mouseleave() {
		if (title) {
			element.setAttribute('title', title);
		}
		if (tooltip) {
			outroAndDestroy(tooltip);
		}
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
