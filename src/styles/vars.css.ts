import { createGlobalTheme } from '@vanilla-extract/css';

export const fonts = createGlobalTheme(':root', {
	main: '"Be Vietnam Pro", sans-serif',
	misc: '"Urbanist", sans-serif'
});

export const sizes = createGlobalTheme(':root', {
	xxs: '8px',
	xs: '10px',
	sm: '12px',
	md: '15px',
	lg: '19px',
	xl: '23px',
	xxl: '29px',
	xxxl: '37px',
});

export const colors = createGlobalTheme(':root', {
	primary: {
		100: 'rgb(228, 255, 94)',
		300: 'rgb(191, 246, 50)',
		500: 'rgb(149, 222, 19)',
		700: 'rgb(109, 179, 4)',
		900: 'rgb(74, 128, 0)'
	},
	secondary: {
		100: 'rgb(143, 239, 215)',
		300: 'rgb(118, 229, 209)',
		500: 'rgb(14, 221, 193)',
		700: 'rgb(12, 167, 149)',
		900: 'rgb(8, 120, 109)'
	},
	light: {
		100: 'hsl(150, 20%, 100%)',
		300: 'hsl(150, 25%, 95%)',
		500: 'hsl(150, 30%, 92%)',
		700: 'hsl(150, 35%, 89%)',
		900: 'hsl(150, 40%, 85%)',
	},
	dark: {
		100: 'hsl(230, 17%, 14%)',
		300: 'hsl(214, 14%, 20%)',
		500: 'hsl(194, 9%, 29%)',
		700: 'hsl(191, 8%, 40%)',
		900: 'hsl(195, 6%, 51%)'
	},
	success: {
		100: 'rgb(93, 238, 56)',
		500: 'rgb(93, 238, 56)',
		900: 'rgb(93, 238, 56)'
	},
	error: {
		100: 'rgb(255,20,20)',
		500: 'rgb(255,20,20)',
		900: 'rgb(255,20,20)'
	},
	warning: {
		100: 'rgb(245,220,70)',
		500: 'rgb(245,200,50)',
		900: 'rgb(225,180,30)'
	}
});