import Tooltip from '$components/primitives/Tooltip.svelte';
import type { SvelteProps } from '$types/types';
import { outroAndDestroy } from '$utils/helpers/components';
import type { SvelteComponent } from 'svelte';

/**
 * Interface extending the Tooltip component's props.
 */
interface TooltipOptions extends SvelteProps<Tooltip> {
	disabled?: boolean;
}

/**
 * Action to attach a tooltip to a given element.
 */
export function tooltip(element: HTMLElement, options: TooltipOptions) {
	let tooltip: SvelteComponent;
	let title = element.getAttribute('title');
	let message = options.message || title || '';
	/**
	 * Making sure the host element is not statically positionned.
	 */
	const hostStyle = getComputedStyle(element);
	if (hostStyle.position === 'static') {
		element.style.position = 'relative';
	}
	/**
	 * In case a message is set but the host element has no title attribute, apply message to title attribute for
	 * accessibility reasons.
	 */
	if (!title && options.message) {
		title = message;
		element.setAttribute('title', title);
	}

	function show() {
		if (options.disabled !== true) {
			if (title) {
				/**
				 * Temporarily unset the title attribute to avoid conflicting native tooltip while hover.
				 */
				element.removeAttribute('title');
			}
			tooltip = new Tooltip({
				target: element,
				intro: true,
				props: {
					...options,
				},
			});
		}
	}

	function hide() {
		if (title) {
			/**
			 * Re-instate the title attribute.
			 */
			element.setAttribute('title', title);
		}
		if (tooltip) {
			outroAndDestroy(tooltip);
		}
	}

	element.addEventListener('mouseenter', show);
	element.addEventListener('mouseleave', hide);

	return {
		update(newOptions: TooltipOptions) {
			options = { ...options, ...newOptions };
		},
		destroy() {
			element.removeEventListener('mouseover', show);
			element.removeEventListener('mouseleave', hide);
			hide();
		},
	};
}
