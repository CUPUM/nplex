import { globalStyle } from '@vanilla-extract/css';
import { colors, fonts, sizes } from './vars.css';

export const root = globalStyle(':root', {
	width: '100%',
	height: '100%',
	backgroundColor: colors.light[500],
	padding: 0,
	margin: 0,
	fontFamily: fonts.main,
	color: colors.dark[500],
	fontSize: sizes.md,
	fontWeight: '400'
});

export const body = globalStyle('body', {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	height: '100%',
	padding: 0,
	margin: 0,
	overflow: 'hidden auto',
});

export const all = globalStyle('*', {
	textRendering: 'optimizeLegibility',
	boxSizing: 'border-box',
});