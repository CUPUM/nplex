import { varBook } from '$utils/styles';
import { style } from '@vanilla-extract/css';

const svelteVars = varBook(['secondaryColor', 'thickness']);

export const icon = style({
	position: 'relative',
	display: 'inline-block',
	overflow: 'visible',
	height: '1em',
	aspectRatio: '1 / 1',
	margin: 0,
	padding: 0,
	// top: '0.125em',
	verticalAlign: 'middle',
});

export const svg = style({
	display: 'block',
	position: 'absolute',
	padding: 0,
	margin: 0,
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	overflow: 'visible',
});

export const path = style({
	fill: 'none',
	stroke: 'none',
	selectors: {
		'.secondary&': {
			color: svelteVars.secondaryColor,
		},
		'.fill&': {
			fill: 'currentColor',
		},
		'.stroke&': {
			stroke: 'currentColor',
			strokeWidth: svelteVars.thickness,
			strokeLinejoin: 'round',
			strokeLinecap: 'round',
		},
	},
});
