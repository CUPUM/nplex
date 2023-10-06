import { defineSlotRecipe } from '@pandacss/dev';

export const fieldset = defineSlotRecipe({
	slots: ['root', 'legend', 'item'],
	className: 'fieldset',
	description: 'Commonly labeled stack of input(s).',
	base: {
		root: {
			display: 'flex',
			flexDirection: 'column',
			gap: '0.5em',
		},
		legend: {
			display: 'flex',
			flexDirection: 'row',
			gap: '0.75em',
			alignItems: 'center',
			fontWeight: '400',
			fontSize: 'clamp(token(fontSizes.x-small), 0.5em, token(fontSizes.small))',
			paddingInline: '0.75em',
			opacity: '0.65',
			transitionProperty: 'all',
			transitionDuration: 'medium',
			transitionTimingFunction: 'token(easing)',
		},
		item: {},
	},
	variants: {
		type: {
			default: {},
			subtle: {
				root: {},
			},
		},
	},
	defaultVariants: {
		type: 'default',
	},
});
