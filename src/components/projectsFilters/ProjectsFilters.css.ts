import { colors, sizes } from '$styles/vars.css';
import { style } from '@vanilla-extract/css';

export const filters = style({
	backgroundColor: colors.light[100],
	width: '400px',
	overflow: 'visible auto'
})