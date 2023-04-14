import { cubicOut } from 'svelte/easing';

type ClipTransitionParams = {
	delay?: number;
	duration?: number;
	easing?: SvelteTransitionConfig['easing'];
	opacity?: number;
	shape: 'circle' | 'inset' | 'ellipse' | 'polygon';
	start: `${number}${'px' | '%'}`[];
	// atStart?: ClipTransitionParams['start'];
	end: ClipTransitionParams['start'];
	// atEnd?: ClipTransitionParams['start'];
};

/**
 * Transition to insert host element with clipping path.
 */
export function clip(
	node: HTMLElement,
	{ delay = 0, duration = 400, easing = cubicOut, opacity = 1, shape, start, end }: ClipTransitionParams
): SvelteTransitionConfig {
	const _s = getComputedStyle(node);
	const _o = +_s.opacity;
	const d_o = opacity - _o;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			return `
				opacity: 1;
				clip-path: ${shape}(${''});
			`;
		},
	};
}
