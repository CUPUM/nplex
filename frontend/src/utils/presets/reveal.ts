import type { RevealOptions } from '$actions/reveal';

export const unfold = (i: number) => {
	const rand = Math.floor(Math.random() * 4);
	const axis = rand === 0 || rand === 2 ? 'X' : 'Y';
	console.log(rand, axis);
	const angle = rand === 0 || rand === 1 ? 90 : -90;
	const origin = rand === 0 ? 'left' : rand === 1 ? 'top' : rand === 2 ? 'right' : 'bottom';

	// return `opacity: 0; transform: rotate${axis}(${angle}deg); transform-origin: ${origin}`;
	return `opacity: 0; transform: rotateY(90deg); transform-origin: center left;`;
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
