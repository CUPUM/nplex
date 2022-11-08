import { paramCase } from 'change-case';
import { intersection } from './intersection';

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

export interface RevealOptions extends IntersectionObserverInit {
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
	start?: RevealCSS;
	wrapDelay?: RevealOptions['delay'];
	wrapDelayOut?: RevealOptions['delay'];
	wrapDuration?: RevealOptions['duration'];
	wrapDurationOut?: RevealOptions['duration'];
	wrapEasing?: RevealOptions['easing'];
	wrapEasingOut?: RevealOptions['easing'];
	wrapStagger?: RevealOptions['stagger'];
	wrapStaggerOut?: RevealOptions['stagger'];
	wrapStart?: RevealWrapCSS;
	wrapEnd?: RevealOptions['wrapStart'];
}

/**
 * Directive to transition an element on viewport intersection, without removing / inserting it from the DOM.
 */
export function reveal(
	element: HTMLElement,
	{
		root,
		rootMargin = '-25% -25% -25% -25%',
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
		wrapStart = {},
		wrapEnd = wrapStart,
	}: RevealOptions = {}
): SvelteActionReturnType {
	const _ID = 'reveal-' + crypto.getRandomValues(new Uint32Array(1));

	const ATTRIBUTES = {
		CLASS: _ID,
		CLASS_INIT: _ID + '-init',
		CLASS_IN: _ID + '-in',
		CLASS_OUT: _ID + '-out',
		ATTR_UNIT_NODE: _ID + '-u',
		ATTR_WRAP_NODE: _ID + '-w',
		UNIT_KEYFRAMES_IN: _ID + '-u-keyframes-i',
		UNIT_KEYFRAMES_OUT: _ID + '-u-keyframes-o',
		UNIT_VAR_DELAY_IN: '--reveal-u-del-i',
		UNIT_VAR_DELAY_OUT: '--reveal-u-del-o',
		UNIT_VAR_DURATION_IN: '--reveal-u-dur-i',
		UNIT_VAR_DURATION_OUT: '--reveal-u-dur-o',
		UNIT_VAR_EASING_IN: '--reveal-u-eas-i',
		UNIT_VAR_EASING_OUT: '--reveal-u-eas-o',
		WRAP_KEYFRAMES_IN: _ID + '-w-keyframes-i',
		WRAP_KEYFRAMES_OUT: _ID + '-w-keyframes-o',
		WRAP_VAR_DELAY_IN: '--reveal-w-del-i',
		WRAP_VAR_DELAY_OUT: '--reveal-w-del-o',
		WRAP_VAR_DURATION_IN: '--reveal-w-dur-i',
		WRAP_VAR_DURATION_OUT: '--reveal-w-dur-o',
		WRAP_VAR_EASING_IN: '--reveal-w-eas-i',
		WRAP_VAR_EASING_OUT: '--reveal-w-eas-o',
	};

	const stylesheet = document.createElement('style');
	document.head.appendChild(stylesheet);

	element.classList.add(ATTRIBUTES.CLASS);

	const _style = getComputedStyle(element);
	element.style.position = _style.position === 'static' || '' ? 'relative' : _style.position;
	element.style.display = _style.position === 'inline' || '' ? 'inline-block' : _style.position;
	element.style.perspective = _style.perspective === 'none' ? '800px' : _style.perspective;

	stylesheet.textContent = `
		@keyframes ${ATTRIBUTES.UNIT_KEYFRAMES_IN} {
			from {${objectToCSSText(start)}}
			to {}
		}
		@keyframes ${ATTRIBUTES.UNIT_KEYFRAMES_OUT} {
			to {${objectToCSSText(start)}}
		}
		@keyframes ${ATTRIBUTES.WRAP_KEYFRAMES_IN} {
			from {${objectToCSSText(wrapStart)}}
			to {${objectToCSSText(wrapEnd)}}
		}
		@keyframes ${ATTRIBUTES.WRAP_KEYFRAMES_OUT} {
			to {${objectToCSSText(wrapStart)}}
		}
		.${ATTRIBUTES.CLASS} * {
			display: inline-block;
			position: relative;
			transform-style: preserve-3d;
		}
		[${ATTRIBUTES.ATTR_UNIT_NODE}] {
			display: inline-block;
		}
		[${ATTRIBUTES.ATTR_WRAP_NODE}] {
			display: inline-block;
		}
		.${ATTRIBUTES.CLASS}.${ATTRIBUTES.CLASS_INIT} [${ATTRIBUTES.ATTR_UNIT_NODE}] {
			${objectToCSSText(start)}
		}
		.${ATTRIBUTES.CLASS} [${ATTRIBUTES.ATTR_WRAP_NODE}] {
			${objectToCSSText(wrapEnd)}
		}
		.${ATTRIBUTES.CLASS}.${ATTRIBUTES.CLASS_INIT} [${ATTRIBUTES.ATTR_WRAP_NODE}] {
			${objectToCSSText(wrapStart)}
		}
		.${ATTRIBUTES.CLASS}.${ATTRIBUTES.CLASS_IN} [${ATTRIBUTES.ATTR_UNIT_NODE}] {
			animation-name: ${ATTRIBUTES.UNIT_KEYFRAMES_IN};
			animation-duration: var(${ATTRIBUTES.UNIT_VAR_DURATION_IN});
			animation-delay: calc(${delay}ms + var(${ATTRIBUTES.UNIT_VAR_DELAY_IN}));
			animation-timing-function: var(${ATTRIBUTES.UNIT_VAR_EASING_IN});
			animation-fill-mode: both;
			animation-direction: normal;
		}
		.${ATTRIBUTES.CLASS}.${ATTRIBUTES.CLASS_OUT} [${ATTRIBUTES.ATTR_UNIT_NODE}] {
			animation-name: ${ATTRIBUTES.UNIT_KEYFRAMES_OUT};
			animation-duration: var(${ATTRIBUTES.UNIT_VAR_DURATION_OUT});
			animation-delay: calc(${delayOut}ms + var(${ATTRIBUTES.UNIT_VAR_DELAY_OUT}));
			animation-timing-function: var(${ATTRIBUTES.UNIT_VAR_EASING_OUT});
			animation-fill-mode: both;
			animation-direction: normal;
		}
		.${ATTRIBUTES.CLASS}.${ATTRIBUTES.CLASS_OUT} [${ATTRIBUTES.ATTR_WRAP_NODE}] {
			animation-name: ${ATTRIBUTES.WRAP_KEYFRAMES_OUT};
			animation-duration: var(${ATTRIBUTES.WRAP_VAR_DURATION_OUT});
			animation-delay: calc(${delayOut}ms + var(${ATTRIBUTES.WRAP_VAR_DELAY_OUT}));
			animation-timing-function: var(${ATTRIBUTES.WRAP_VAR_EASING_OUT});
			animation-fill-mode: both;
			animation-direction: normal;
		}
		.${ATTRIBUTES.CLASS}.${ATTRIBUTES.CLASS_IN} [${ATTRIBUTES.ATTR_WRAP_NODE}] {
			animation-name: ${ATTRIBUTES.WRAP_KEYFRAMES_IN};
			animation-duration: var(${ATTRIBUTES.WRAP_VAR_DURATION_IN});
			animation-delay: calc(${delayOut}ms + var(${ATTRIBUTES.WRAP_VAR_DELAY_IN}));
			animation-timing-function: var(${ATTRIBUTES.WRAP_VAR_EASING_IN});
			animation-fill-mode: both;
			animation-direction: normal;
		}
	`;

	let nodes: HTMLElement[];
	let intersector: ReturnType<typeof intersection>;

	// Split and wrap segments only if staggering.
	if (stagger || staggerOut) {
		nodes = splitText(element, { delimiter: splitDelimiter });
	} else {
		nodes = [element];
	}
	nodes.forEach((node, i) => {
		node.setAttribute(ATTRIBUTES.ATTR_UNIT_NODE, '');
		node.style.cssText += composeRevealCssVars(
			i,
			{
				duration,
				durationOut,
				easing,
				easingOut,
				stagger,
				staggerOut,
			},
			{
				duration: ATTRIBUTES.UNIT_VAR_DURATION_IN,
				durationOut: ATTRIBUTES.UNIT_VAR_DURATION_OUT,
				easing: ATTRIBUTES.UNIT_VAR_EASING_IN,
				easingOut: ATTRIBUTES.UNIT_VAR_EASING_OUT,
				delay: ATTRIBUTES.UNIT_VAR_DELAY_IN,
				delayOut: ATTRIBUTES.UNIT_VAR_DELAY_OUT,
			}
		);
		if (node.parentElement) {
			node.parentElement.setAttribute(ATTRIBUTES.ATTR_WRAP_NODE, '');
			node.parentElement.style.cssText += composeRevealCssVars(
				i,
				{
					duration: wrapDuration,
					durationOut: wrapDurationOut,
					easing: wrapEasing,
					easingOut: wrapEasingOut,
					stagger: wrapStagger,
					staggerOut: wrapStaggerOut,
				},
				{
					duration: ATTRIBUTES.WRAP_VAR_DURATION_IN,
					durationOut: ATTRIBUTES.WRAP_VAR_DURATION_OUT,
					easing: ATTRIBUTES.WRAP_VAR_EASING_IN,
					easingOut: ATTRIBUTES.WRAP_VAR_EASING_OUT,
					delay: ATTRIBUTES.WRAP_VAR_DELAY_IN,
					delayOut: ATTRIBUTES.WRAP_VAR_DELAY_OUT,
				}
			);
		}
	});

	// Set initial styling
	if (!show) {
		element.classList.add(ATTRIBUTES.CLASS_INIT);
	}

	function handleEnter() {
		element.classList.remove(ATTRIBUTES.CLASS_INIT);
		element.classList.remove(ATTRIBUTES.CLASS_OUT);
		element.classList.add(ATTRIBUTES.CLASS_IN);
	}

	function handleLeave() {
		element.classList.remove(ATTRIBUTES.CLASS_IN);
		element.classList.add(ATTRIBUTES.CLASS_OUT);
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
			stylesheet.remove();
		},
	};
}

function composeRevealCssVars(
	index: number,
	transitionOptions: Pick<
		RevealOptions,
		'duration' | 'durationOut' | 'easing' | 'easingOut' | 'stagger' | 'staggerOut'
	>,
	keys: { duration: string; durationOut: string; delay: string; delayOut: string; easing: string; easingOut: string }
) {
	return (
		`${keys.duration}: ${
			typeof transitionOptions.duration === 'function'
				? transitionOptions.duration(index)
				: transitionOptions.duration
		}ms;` +
		`${keys.durationOut}: ${
			typeof transitionOptions.durationOut === 'function'
				? transitionOptions.durationOut(index)
				: transitionOptions.durationOut
		}ms;` +
		`${keys.delay}: ${
			index *
			(typeof transitionOptions.stagger === 'function'
				? transitionOptions.stagger(index)
				: transitionOptions.stagger ?? 0)
		}ms;` +
		`${keys.delayOut}: ${
			index *
			(typeof transitionOptions.staggerOut === 'function'
				? transitionOptions.staggerOut(index)
				: transitionOptions.staggerOut ?? 0)
		}ms;` +
		`${keys.easing}: ${
			typeof transitionOptions.easing === 'function' ? transitionOptions.easing(index) : transitionOptions.easing
		};` +
		`${keys.easingOut}: ${
			typeof transitionOptions.easingOut === 'function'
				? transitionOptions.easingOut(index)
				: transitionOptions.easingOut
		};`
	);
}

/**
 * Because the CSSStyleDeclaration interface doesnt allow us to create new style declarations using new...(), we must
 * handle regular objects ourselves and their conversion to a "style.cssText"-alike string.
 */
function objectToCSSText(styleObject: Record<string, string>) {
	if (!styleObject) return '';
	return (
		Object.entries(styleObject)
			.map(([k, v]) => `${paramCase(k)}: ${v}`)
			.join('; ') + '; '
	);
}

interface SplitTextOptions {
	delimiter?: string | RegExp;
}

/**
 * Parsing node tree recursively, splitting and wrapping content.
 */
function splitText(element: HTMLElement, { delimiter = '' }: SplitTextOptions = {}) {
	const nodes: HTMLElement[] = [];
	[...element.childNodes].forEach((cn) => {
		if (cn instanceof HTMLElement) {
			// cn.style.cssText += 'transform-style: preserve-3d; perspective: inherit;';
			nodes.push(...splitText(cn, { delimiter }));
		} else if (cn.nodeType === Node.TEXT_NODE) {
			const newNodes: Node[] = [];
			cn?.textContent?.split(/(\s)/).forEach((segment, i) => {
				if (!segment) return;
				if (segment === ' ') return newNodes.push(document.createTextNode(' '));
				const segmentNode = document.createElement('span');
				// segmentNode.setAttribute(SplitTextAttributes.Segment, '');
				newNodes.push(segmentNode);
				segment.split(delimiter).forEach((unit) => {
					const maskNode = document.createElement('span');
					// maskNode.style.cssText = 'position: relative; display: inline-block; transform-style: preserve-3d;';
					segmentNode.appendChild(maskNode);
					const contentNode = document.createElement('span');
					maskNode.appendChild(contentNode);
					// unitNode.setAttribute(SplitTextAttributes.Unit, '');
					contentNode.textContent = unit;
					// contentNode.style.cssText =
					// 	'position: relative; display: inline-block; transform-style: preserve-3d;';
					// unitNode.style.setProperty(SplitTextAttributes.CSSIndex, nUnits++ + '');
					nodes.push(contentNode);
				});
			});
			cn.textContent = '';
			cn.after(...newNodes);
		}
	});
	return nodes;
}

/**
 * Stagger preset for fly and rotateX effect.
 */
export const slipMask: RevealOptions = {
	stagger: (i) => 15 + 2 * i,
	duration: 1500,
	easing: 'cubic-bezier(0, .6, 0, 1)',
	easingOut: 'cubic-bezier(1, 0, 1, .4)',
	start: {
		transform: 'translateY(1em)',
		opacity: '0',
	},
	wrapStart: {
		clipPath: 'inset(-0.25em -0.25em 0.75em -0.25em)',
	},
	wrapEnd: {
		clipPath: 'inset(-0.25em -0.25em 0em -0.25em)',
	},
	splitDelimiter: ' ',
};

/**
 * Stagger preset for fly and rotateX effect.
 */
export const flyRotate: RevealOptions = {
	stagger: (i) => 15 + i * 2,
	duration: 2500,
	easing: 'cubic-bezier(.1, .5, 0, 1)',
	easingOut: 'cubic-bezier(1, 0, 1, .2)',
	start: {
		transform: 'translateY(1em) translateZ(-60px) rotateX(-80deg)',
		opacity: '0',
	},
	wrapStart: {
		// perspective: '100px',
		// clipPath: 'inset(-0.25em -0.25em 0.75em -0.25em)',
	},
	wrapEnd: {
		// perspective: '100px',
		// clipPath: 'inset(-0.25em -0.25em 0em -0.25em)',
	},
	splitDelimiter: ' ',
};
