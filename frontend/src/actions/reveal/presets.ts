import type { RevealCssFn } from '.';

export const unfold: RevealCssFn = (i: number) => {
	const rand = Math.floor(Math.random() * 4);
	const axis = rand === 0 || rand === 2 ? 'X' : 'Y';
	console.log(rand, axis);
	const angle = rand === 0 || rand === 1 ? 90 : -90;
	const origin = rand === 0 ? 'left' : rand === 1 ? 'top' : rand === 2 ? 'right' : 'bottom';

	// return `opacity: 0; transform: rotate${axis}(${angle}deg); transform-origin: ${origin}`;
	return `opacity: 0; transform: rotateY(90deg); transform-origin: center left;`;
};
