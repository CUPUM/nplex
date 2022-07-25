import { splitText } from '$utils/splitText';
import { intersection } from '../intersection';

type IntersectionOptions = Parameters<typeof intersection>[1];

export type RevealCssFn = (i: number) => string;

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
	show?: boolean;
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
	css?: string | RevealCssFn;
	/**
	 * Css transition easing.
	 */
	easing?: string;
	easingOut?: string;
	/**
	 * Should masking nodes clip their content node?
	 */
	clip?: string;
	/**
	 * Clip value for when transition complete, i.e.: when content is shown.
	 */
	clipEnd?: string;
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
		stagger = 10,
		useIntersection = true,
		once = true,
		show = undefined,
		duration = 300,
		delay = 0,
		css = 'opacity: 0;',
		easing = 'cubic-bezier(0.5, 0, 0.5, 1)',
		easingOut = easing,
		clip = undefined,
		clipEnd = clip,
	}: RevealOptions = {}
): SvelteActionReturnType {
	const _style = getComputedStyle(element);
	element.style.position = _style.position === 'static' || '' ? 'relative' : _style.position;
	// element.style.perspective = '200px';

	let nodes: HTMLElement[];
	let intersector: ReturnType<typeof intersection>;
	let styles: string[] = [];
	let transitions_in: string[] = [];
	let transitions_out: string[] = [];

	if (stagger) {
		nodes = splitText(element);
	} else {
		nodes = [element];
	}

	// Pre-processing the css transition strings for each unitNode.
	for (let i = 0; i < nodes.length; i++) {
		const o_style = nodes[i].style.cssText;
		const composed = composeCSS(i, duration, delay, stagger, easing, easingOut, css);
		styles.push(composed.style);
		transitions_in.push(o_style + composed.transition_in);
		transitions_out.push(o_style + composed.transition_out);
		// Initializing node styles, without transitions.
		if (!show) {
			nodes[i].style.cssText += composed.style;
			if (clipEnd) {
				(stagger ? nodes[i].parentElement : nodes[i]).style.clipPath = `inset(${clipEnd})`;
			}
		} else {
			if (clip) (stagger ? nodes[i].parentElement : nodes[i]).style.clipPath = `inset(${clip})`;
		}
	}

	function handleEnter() {
		for (let i = 0; i < nodes.length; i++) {
			requestAnimationFrame(() => {
				nodes[i].style.cssText = transitions_in[i];
				if (clipEnd) {
					if (stagger) {
						nodes[i].parentElement.style.cssText = transitions_in[i] + `clip-path: inset(${clipEnd})`;
					} else {
						nodes[i].style.clipPath = `inset(${clipEnd})`;
					}
				}
			});
		}
	}

	function handleLeave() {
		for (let i = 0; i < nodes.length; i++) {
			requestAnimationFrame(() => {
				nodes[i].style.cssText = transitions_out[i] + styles[i];
				if (clip) {
					if (stagger) {
						nodes[i].parentElement.style.cssText = transitions_out[i] + `clip-path: inset(${clip})`;
					} else {
						nodes[i].style.clipPath = `inset(${clip})`;
					}
				}
			});
		}
	}

	// Initialize intersection observer.
	if (useIntersection && show === undefined) {
		intersector = intersection(element, { root, rootMargin, threshold });
		element.addEventListener('enter', handleEnter);
		if (!once) element.addEventListener('leave', handleLeave);
	}

	return {
		update(newParams) {
			if (!useIntersection || show !== undefined) {
				if (newParams.show) {
					handleEnter();
				} else if (newParams.show === false) {
					handleLeave();
				}
			}
		},
		destroy() {
			intersector?.destroy();
			element.removeEventListener('enter', handleEnter);
			element.removeEventListener('leave', handleLeave);
		},
	};
}

/**
 * Function to pre-compose css strings.
 */
function composeCSS(
	i: number,
	duration: number,
	delay: number,
	stagger: number,
	easing: string,
	easingOut: string,
	css: RevealOptions['css']
) {
	const style = typeof css === 'function' ? css(i) : css;
	const transition_in = `transition: all ${duration}ms ${delay + i * stagger}ms ${easing};`;
	const transition_out = `transition: all ${duration}ms ${delay + i * stagger}ms ${easingOut};`;
	return { style, transition_in, transition_out };
}
