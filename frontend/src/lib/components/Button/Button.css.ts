import { style, styleVariants } from '@vanilla-extract/css';

// 'default' | 'nav' | 'nav-cta' | 'cta' | 'secondary' | 'ghost'

const buttonBase = style({
	cursor: 'pointer',
	position: 'relative',
	display: 'inline-grid',
	gridTemplateColumns:
		'[full-start leading-start]' +
		'auto' +
		'[leading-end main-start]' +
		'1fr' +
		'[main-end trailing-start]' +
		'auto' +
		'[trailing-end full-end]',
});

export const button = styleVariants({
	default: [buttonBase, {}],
});

const innerBase = style({});

export const leading = style({});

export const main = style({});

export const trailing = style({});
