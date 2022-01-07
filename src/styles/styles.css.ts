import { createGlobalTheme, globalStyle, style } from '@vanilla-extract/css';

export const colors = createGlobalTheme(':root', {
	'vanilla-extract-test': 'red',
});

export const root = globalStyle(':root', {
	color: 'pink'
})