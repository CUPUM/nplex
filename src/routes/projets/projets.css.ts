import { colors, sizes } from '$styles/vars.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const projectsPanes = style({
	paddingBlock: sizes.md,
	paddingInline: sizes.lg,
	width: '100%',
	height: '100%',
	minHeight: '600px',
	flex: 1,
	display: 'flex',
	flexDirection: 'row',
});

const gap = 8;

globalStyle(`${projectsPanes} > *`, {
	transition: 'margin-inline .1s ease-out',
	boxShadow: '0px 30px 75px -50px rgba(0, 0, 0, .2)',
	borderRadius: sizes.xxxl
});
globalStyle(`${projectsPanes} > *:not(:last-child)`, {
	marginRight: gap
});
globalStyle(`${projectsPanes} > *:not(:first-child)`, {
	marginLeft: gap
});

export const projectContent = style({
	position: 'relative',
});