import { splitText } from '$utils/splitText';
import { intersection } from './intersection';

type IntersectionOptions = Parameters<typeof intersection>[1];

type RevealStyleParameter<T> = T | ((i: number) => T);

interface RevealOptions extends IntersectionOptions {
	visible?: boolean;
	hideOnLeave?: boolean;
	duration?: number;
	delay?: number;
	stagger?: number;
	opacity?: RevealStyleParameter<number>;
}

/**
 * Directive to transition an element on viewport intersection, without removing / inserting it from the DOM.
 */
export function reveal(
	element: HTMLElement,
	{ stagger = true, hideOnLeave = false, root, rootMargin, threshold }: RevealOptions = {}
): SvelteActionReturnType {
	splitText(element);

	const intersect = intersection(element, { root, rootMargin, threshold });

	function setUnitHiddenStyle() {}

	function clearUnitStyle() {}

	function handleEnter() {}

	function handleLeave() {}

	element.addEventListener('enter', handleEnter);
	element.addEventListener('leave', handleLeave);

	return {
		update(newOptions) {
			console.log(newOptions);
			// Handle update locally and pass to intersect.update();
		},
		destroy() {
			intersect.destroy();
			element.removeEventListener('enter', handleEnter);
			element.removeEventListener('leave', handleLeave);
		},
	};
}
