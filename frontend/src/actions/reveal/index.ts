import { splitText, type SplitTextOptions } from '$utils/splitText';
import { camelCaseToKebabCase } from '$utils/strings';
import { intersection } from '../intersection';

type IntersectionOptions = Parameters<typeof intersection>[1];

type RevealCSS = Partial<
	Pick<
		CSSStyleDeclaration,
		| 'opacity'
		| 'color'
		| 'backgroundColor'
		| 'background'
		| 'clipPath'
		| 'perspective'
		| 'perspectiveOrigin'
		| 'transform'
	>
>;

type RevealWrapCSS = Partial<Pick<RevealCSS, 'clipPath' | 'perspective' | 'perspectiveOrigin' | 'transform'>>;

// type RevealCSSTransition = Pick<
// 	CSSStyleDeclaration,
// 	'transitionDelay' | 'transitionDuration' | 'transitionProperty' | 'transitionTimingFunction'
// >;

export interface RevealOptions extends IntersectionOptions {
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
	 * Node splitter delimiter string or regex.
	 */
	splitDelimiter?: SplitTextOptions['delimiter'];
	/**
	 * Global transition delay in ms, i.e. constant offset applied to stagger's value.
	 */
	delay?: number;
	/**
	 * Global transition delay in ms, i.e. constant offset applied to stagger's value.
	 */
	delayOut?: RevealOptions['delay'];
	/**
	 * Transition duration.
	 */
	duration?: number | ((index: number) => number);
	/**
	 * Transition out duration.
	 */
	durationOut?: RevealOptions['duration'];
	/**
	 * Stagger delay in ms, i.e. css transition delay applied cumulatively to units, starting at 0. Set to 0 to disable
	 * and skip splitText().
	 */
	stagger?: number | ((index: number) => number);
	/**
	 * Stagger delay in ms, i.e. css transition delay applied cumulatively to units, starting at 0. Set to 0 to disable
	 * and skip splitText().
	 */
	staggerOut?: RevealOptions['stagger'];
	/**
	 * Css transition easing for content nodes.
	 */
	easing?: string | ((index: number) => string);
	/**
	 * Css out transition easing for content nodes.
	 */
	easingOut?: RevealOptions['easing'];
	/**
	 * Styles applied to unit nodes when unentered. Will be animated towards the default (empty) styles.
	 */
	start?: RevealCSS | ((index: number) => RevealCSS);
	wrapDelay?: RevealOptions['delay'];
	wrapDelayOut?: RevealOptions['delay'];
	wrapDuration?: RevealOptions['duration'];
	wrapDurationOut?: RevealOptions['duration'];
	wrapEasing?: RevealOptions['easing'];
	wrapEasingOut?: RevealOptions['easing'];
	wrapStagger?: RevealOptions['stagger'];
	wrapStaggerOut?: RevealOptions['stagger'];
	wrapStart?: RevealWrapCSS | ((index: number) => RevealWrapCSS);
	wrapEnd?: RevealOptions['wrapStart'];
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
		useIntersection = true,
		once = true,
		show = undefined,
		splitDelimiter = undefined,
		delay = 0,
		delayOut = delay,
		duration = 300,
		durationOut = duration,
		stagger = 10,
		staggerOut = stagger,
		easing = 'cubic-bezier(0.2, 0, 0.2, 1)',
		easingOut = easing,
		start = { opacity: '0' },
		wrapDelay = delay,
		wrapDelayOut = delayOut,
		wrapDuration = duration,
		wrapDurationOut = durationOut,
		wrapEasing = easing,
		wrapEasingOut = easingOut,
		wrapStagger = stagger,
		wrapStaggerOut = staggerOut,
		wrapStart = undefined,
		wrapEnd = wrapStart,
	}: RevealOptions = {}
): SvelteActionReturnType {
	const _style = getComputedStyle(element);
	element.setAttribute('reveal-host', '');
	element.style.position = _style.position === 'static' || '' ? 'relative' : _style.position;
	element.style.display = _style.position === 'inline' || '' ? 'inline-block' : _style.position;
	element.style.perspective = _style.perspective === 'none' ? '800px' : _style.perspective;

	let nodes: HTMLElement[];
	let intersector: ReturnType<typeof intersection>;

	// Split and wrap segments only if staggering.
	if (stagger || staggerOut) {
		nodes = splitText(element, { delimiter: splitDelimiter });
	} else {
		nodes = [element];
	}

	// Pre-processing the css transition strings for each unitNode.
	const { transitions, wrapTransitions } = composeStyles(nodes, show, {
		delay,
		delayOut,
		duration,
		durationOut,
		stagger,
		staggerOut,
		easing,
		easingOut,
		start,
		wrapEasing,
		wrapEasingOut,
		wrapDelay,
		wrapDelayOut,
		wrapDuration,
		wrapDurationOut,
		wrapStagger,
		wrapStaggerOut,
		wrapStart,
		wrapEnd,
	});

	function handleEnter() {
		for (let i = 0; i < nodes.length; i++) {
			requestAnimationFrame(() => {
				Object.assign(nodes[i].style, transitions[i].in);
				Object.assign(wrapTransitions[i].node.style, wrapTransitions[i].in);
			});
		}
	}

	function handleLeave() {
		for (let i = 0; i < nodes.length; i++) {
			requestAnimationFrame(() => {
				Object.assign(nodes[i].style, transitions[i].out);
				Object.assign(wrapTransitions[i].node.style, wrapTransitions[i].out);
			});
		}
	}

	// Initialize intersection observer.
	if (useIntersection && show === undefined) {
		intersector = intersection(element, { root, rootMargin, threshold });
		element.addEventListener('enter', handleEnter, { once });
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
 * Function to pre-compose css strings for segment nodes.
 */
function composeStyles(
	nodes: HTMLElement[],
	initialState: boolean,
	opts: Pick<
		RevealOptions,
		| 'delay'
		| 'delayOut'
		| 'duration'
		| 'durationOut'
		| 'stagger'
		| 'staggerOut'
		| 'easing'
		| 'easingOut'
		| 'start'
		| 'wrapEasing'
		| 'wrapEasingOut'
		| 'wrapDelay'
		| 'wrapDelayOut'
		| 'wrapDuration'
		| 'wrapDurationOut'
		| 'wrapStagger'
		| 'wrapStaggerOut'
		| 'wrapStart'
		| 'wrapEnd'
	>
) {
	const transitions: {
		in: Record<string, string>;
		out: Record<string, string>;
	}[] = [];
	const wrapTransitions: {
		node: HTMLElement;
		in: Record<string, string>;
		out: Record<string, string>;
	}[] = [];

	const _transitionKeys = Object.keys(typeof opts.start === 'function' ? opts.start(0) : opts.start);
	const _transitionProperties = _transitionKeys.map((k) => camelCaseToKebabCase(k)).join(',');
	const _styleReset = _transitionKeys.reduce((reset, k) => ({ ...reset, [k]: 'initial' }), {});
	const _wrapTransitionKeys = Object.keys(
		(typeof opts.wrapStart === 'function' ? opts.wrapStart(0) : opts.wrapStart) || {}
	);
	const _wrapTransitionProperties = _wrapTransitionKeys.map((k) => camelCaseToKebabCase(k)).join(',');
	const _wrapStyleReset = _wrapTransitionKeys.reduce((reset, k) => ({ ...reset, [k]: 'initial' }), {});

	for (let i = 0; i < nodes.length; i++) {
		// Composing and setting style strings for content nodes.
		const _base = { transformStyle: 'preserve-3d', display: 'inline-block' };
		const _styleStart = typeof opts.start === 'function' ? opts.start(i) : opts.start;
		const _in = composeTransition(i, _transitionProperties, {
			delay: opts.delay,
			duration: opts.duration,
			easing: opts.easing,
			stagger: opts.stagger,
		});
		const _out = composeTransition(i, _transitionProperties, {
			delay: opts.delayOut,
			duration: opts.durationOut,
			easing: opts.easingOut,
			stagger: opts.staggerOut,
		});

		// Composing clip style strings for wrap nodes if the nodes are result of a split, or for the node itself if not split.
		const _wrapNode = nodes.length > 1 ? (nodes[i].parentNode as HTMLElement) : nodes[i];
		let _wrapStyleStart = {};
		let _wrapStyleEnd = {};
		let _wrapIn = {};
		let _wrapOut = {};
		if (opts.wrapStart || opts.wrapEnd) {
			_wrapStyleStart = typeof opts.wrapStart === 'function' ? opts.wrapStart(i) : opts.wrapStart;
			_wrapStyleEnd = typeof opts.wrapEnd === 'function' ? opts.wrapEnd(i) : opts.wrapEnd;
			_wrapIn = composeTransition(i, _wrapTransitionProperties, {
				delay: opts.wrapDelay,
				duration: opts.wrapDuration,
				easing: opts.wrapEasing,
				stagger: opts.wrapStagger,
			});
			_wrapOut = composeTransition(i, _wrapTransitionProperties, {
				delay: opts.wrapDelayOut,
				duration: opts.wrapDurationOut,
				easing: opts.wrapEasingOut,
				stagger: opts.wrapStaggerOut,
			});
		}

		// Pushing to respective transitions arrays
		transitions.push({
			in: { ..._base, ..._styleReset, ..._in },
			out: { ..._base, ..._styleStart, ..._out },
		});
		wrapTransitions.push({
			node: _wrapNode,
			in: { ..._base, ..._wrapStyleReset, ..._wrapStyleEnd, ..._wrapIn },
			out: { ..._base, ..._wrapStyleStart, ..._wrapOut },
		});

		// Initialize node stylings without transitions
		if (!initialState) {
			Object.assign(nodes[i].style, { ..._base, ..._styleStart });
			if (opts.wrapStart) {
				Object.assign(_wrapNode.style, { ..._base, ..._wrapStyleStart });
			}
		} else {
			if (opts.wrapEnd) {
				Object.assign(_wrapNode.style, { ..._base, ..._wrapStyleEnd });
			}
		}
	}

	return { transitions, wrapTransitions };
}

function composeTransition(
	index: number,
	transitionProperties: string,
	transitionOptions: Pick<RevealOptions, 'delay' | 'duration' | 'easing' | 'stagger'>
) {
	return {
		transitionProperty: transitionProperties,
		transitionDuration: `${
			typeof transitionOptions.duration === 'function'
				? transitionOptions.duration(index)
				: transitionOptions.duration
		}ms`,
		transitionDelay: `${
			transitionOptions.delay +
			index *
				(typeof transitionOptions.stagger === 'function'
					? transitionOptions.stagger(index)
					: transitionOptions.stagger)
		}ms`,
		transitionTimingFunction:
			typeof transitionOptions.easing === 'function' ? transitionOptions.easing(index) : transitionOptions.easing,
	};
}

/**
 * Because the CSSStyleDeclaration interface doesnt allow us to create new style declarations using new...(), we must
 * handle regular objects ourselves and their conversion to a "style.cssText"-alike string.
 */
function objectToCSSText(styleObject: Record<string, string>) {
	return (
		Object.entries(styleObject)
			.map(([k, v]) => `${camelCaseToKebabCase(k)}: ${v}`)
			.join('; ') + '; '
	);
}
