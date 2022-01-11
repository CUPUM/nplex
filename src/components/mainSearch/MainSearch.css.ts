import { sizes } from '$styles/vars.css';
import { style } from '@vanilla-extract/css';

export const exploreBar = style({
	display: 'flex',
	flexDirection: 'row',
	paddingBlock: 0,
	paddingInline: sizes.lg
});

export const searchBar = style({
	flex: 1,
	display: 'flex',
	flexDirection: 'row'
});
export const searchInput = style({
	backgroundColor: 'red',
	flex: 1,
});
export const filtersButton = style({
	backgroundColor: 'red'
});
export const searchButton = style({
	backgroundColor: 'white'
})

export const exploreNav = style({
	color: 'red',
	marginInline: sizes.sm,
	padding: sizes.sm
})

export const tokensBar = style({
	flex: 1
})
