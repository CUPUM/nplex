import type { RevealOptions } from '$actions/reveal';

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
