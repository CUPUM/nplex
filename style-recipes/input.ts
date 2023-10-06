import { defineRecipe, defineSlotRecipe } from '@pandacss/dev';

export const inputRecipe = defineRecipe({
	className: 'input',
	base: {
		'--inset': '3px',
		'paddingInline': 'padding.inline.base',
		'height': 'block.base',
		'minWidth': 'block.base',
		'borderRadius': 'base',
		'textOverflow': 'e',
		'transitionProperty': 'all',
		'transitionDuration': 'fast',
		'transitionTimingFunction': 'ease-out',
		'lineHeight': '1.5em',
		'paddingBlock': '2rem',
		'&:not(texarea)': {
			paddingBlock: '0',
			lineHeight: '1',
			color: 'red',
		},
		'_hover': {
			transitionDuration: '0s',
		},
		'_focus': {
			transitionDuration: '0s',
		},
		'_disabled': {},
		'_loading': {},
	},
	variants: {
		type: {
			default: {
				color: 'neutral.700',
				backgroundColor: 'neutral.500/.1',
				border: 'base',
				borderColor: 'transparent',
				_dark: {
					color: 'neutral.300',
				},
				_hover: {
					borderColor: 'neutral.900/.1',
					_dark: {
						borderColor: 'neutral.100/.1',
					},
				},
				_focus: {},
				_disabled: {},
			},
			outlined: {
				color: 'neutral.700',
				backgroundColor: 'transparent',
				border: 'base',
				_dark: {
					color: 'neutral.300',
				},
				_hover: {
					borderColor: 'neutral.500/.5',
				},
				_focus: {},
				_disabled: {},
			},
		},
	},
	defaultVariants: {
		type: 'default',
	},
});

export const inputGroupRecipe = defineSlotRecipe({
	slots: ['root', 'input', 'button'],
	className: 'input-group',
	base: {
		root: {},
		button: {},
	},
	variants: {
		type: {
			default: {
				root: {},
			},
		},
	},
});
