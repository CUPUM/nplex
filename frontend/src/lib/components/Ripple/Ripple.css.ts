import { anim, varBook } from '$utils/styles';
import { keyframes, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

const svelteVars = varBook([
	'opacityStart',
	'opacityEnd',
	'opacityEasing',
	'opacityDuration',
	'opacityDelay',
	'spreadStart',
	'spreadEnd',
	'spreadEasing',
	'spreadDuration',
	'spreadDelay',
	'colorStart',
	'colorEnd',
	'colorEasing',
	'colorDuration',
	'colorDelay',
	'blur',
	'x',
	'y',
	'd',
]);

export const container = style({
	pointerEvents: 'none',
	position: 'absolute',
	top: '0',
	right: '0',
	bottom: '0',
	left: '0',
	borderRadius: 'inherit',
	overflow: 'hidden',
});

const spread = keyframes({
	from: {
		width: calc.multiply(svelteVars.d, svelteVars.spreadStart),
	},
	to: {
		width: calc.multiply(svelteVars.d, svelteVars.spreadEnd),
	},
});

const fade = keyframes({
	from: {
		opacity: svelteVars.opacityStart,
	},
	to: {
		opacity: svelteVars.opacityEnd,
	},
});

const color = keyframes({
	from: {
		backgroundColor: svelteVars.colorStart,
	},
	to: {
		backgroundColor: svelteVars.colorEnd,
	},
});

export const ripple = style({
	position: 'absolute',
	left: svelteVars.x,
	top: svelteVars.y,
	backgroundColor: svelteVars.colorStart,
	aspectRatio: '1 / 1',
	borderRadius: '50%',
	transform: 'translate(-50%, -50%)',
	filter: `blur(${svelteVars.blur})`,
	animation: anim(
		[svelteVars.opacityDuration, svelteVars.opacityEasing, svelteVars.opacityDelay, 1, fade, 'forwards'],
		[svelteVars.spreadDuration, svelteVars.spreadEasing, svelteVars.spreadDelay, 1, spread, 'forwards'],
		[svelteVars.colorDuration, svelteVars.colorEasing, svelteVars.colorDelay, 1, color, 'forwards']
	),
});
