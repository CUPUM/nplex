import { splitText } from '$utils/splitText';
import { wrapNode } from '$utils/wrapNode';
import { intersection } from '../intersection';

type IntersectionOptions = Parameters<typeof intersection>[1];

export type RevealOptionsCss = string | ((i: number) => string);

interface RevealOptions extends IntersectionOptions {
	/**
	 * Stagger delay in ms, i.e. css transition delay applied cumulatively to units, starting at 0. Set to 0 to disable
	 * and skip splitText().
	 */
	stagger?: number;
	/**
	 * Use the intersection observer or listen to options state update.
	 */
	useIntersection?: boolean;
	/**
	 * If using intersection, should the intersection observer events be used to update the reveal state when the
	 * element leaves the viewport, allowing for reveal to re-run on subsequent enter?
	 */
	once?: boolean;
	/**
	 * If not using intersection, this property will be used as the trigger.
	 */
	reveal?: boolean;
	/**
	 * Transition duration.
	 */
	duration?: number;
	/**
	 * Global transition delay in ms, i.e. constant offset applied to stagger's value.
	 */
	delay?: number;
	/**
	 * Style applied to unit nodes when not entered.
	 */
	css?: RevealOptionsCss;
	/**
	 * Css transition easing.
	 */
	easing?: string;
	/**
	 * Style applied to segment nodes (aka wrapping, masking or grouping nodes).
	 */
	segmentCss?: string;
}

/**
 * Directive to transition an element on viewport intersection, without removing / inserting it from the DOM.
 */
export function reveal(
	element: HTMLElement,
	{
		root,
		rootMargin,
		threshold,
		stagger = 20,
		useIntersection = true,
		once = true,
		reveal = undefined,
		duration = 300,
		delay = 0,
		css = 'opacity: 0; transform: translateY(10px);',
		easing = 'ease-in-out',
		segmentCss = '',
	}: RevealOptions = {}
): SvelteActionReturnType {
	const _style = getComputedStyle(element);

	// element.style.position = _style.position === 'static' ? 'relative' : _style.position;

	let unitNodes: HTMLElement[];
	let segmentNodes: HTMLElement[];

	if (stagger) {
		({ unitNodes, segmentNodes } = splitText(element));
		console.log(unitNodes);
	} else {
		wrapNode(element);
	}

	const intersect = intersection(element, { root, rootMargin, threshold });

	function composeCSSTransition(i: number) {
		return `transition: all ${duration}ms ${i * stagger}ms ${easing};`;
	}

	// Pre-processing the css transition strings for each unitNode.
	let transitions: string[] = [];
	for (let i = 0; i < unitNodes.length; i++) {
		transitions.push(composeCSSTransition(i));
	}

	function handleEnter() {
		for (let i = 0; i < unitNodes.length; i++) {
			// requestAnimationFrame(() => {
			unitNodes[i].style.cssText = transitions[i];
			// });
		}
	}

	function handleLeave(init?: boolean) {
		for (let i = 0; i < unitNodes.length; i++) {
			// requestAnimationFrame(() => {
			unitNodes[i].style.cssText = (init ? '' : transitions[i]) + css;
			// });
		}
	}

	function initNodes() {
		// To do: init mask styles.
		handleLeave(true);
	}

	// Initializing:
	if (useIntersection) {
		initNodes();
		element.addEventListener('enter', handleEnter);
		if (!once) element.addEventListener('leave', () => handleLeave());
	} else {
		if (!reveal) {
			initNodes();
		}
	}

	return {
		update(newOptions) {
			console.log(newOptions);
			// Handle update locally and pass to intersect.update();
		},
		destroy() {
			intersect.destroy();
			element.removeEventListener('enter', handleEnter);
			element.removeEventListener('leave', () => handleLeave());
		},
	};
}
