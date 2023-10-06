import { defineSlotRecipe } from '@pandacss/dev';

export const switchGroupRecipe = defineSlotRecipe({
	slots: ['root', 'trigger', 'thumb'],
	className: 'switch-group',
	base: {
		root: {
			'--switch-inset': '3px',
			'--switch-radius': 'radii.base',
			'--switch-size': 'sizes.block',
			'display': 'flex',
			'flexDirection': 'row',
			'justifyContent': 'flex-start',
			'alignItems': 'stretch',
			'height': 'block',
			'padding': 'var(--switch-inset)',
			'borderRadius': 'var(--switch-radius)',
			'fontWeight': '475',
		},
		trigger: {
			zIndex: '1',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			borderRadius: 'calc(var(--switch-radius) - var(--switch-inset))',
			cursor: 'pointer',
			position: 'relative',
			paddingInline: '1em',
			transitionProperty: 'all',
			transitionDuration: 'fast',
			transitionTimingFunction: 'ease-out',
			_disabled: {
				cursor: 'default',
			},
		},
		thumb: {
			position: 'absolute',
		},
	},
	variants: {
		shape: {
			rounded: {
				root: {
					'--switch-radius': 'radii.full',
				},
			},
		},
		type: {
			default: {
				root: {
					backgroundColor: 'neutral.500/.1',
					_dark: {
						backgroundColor: 'neutral.950/.5',
					},
				},
				trigger: {
					color: 'neutral.600',
					backgroundColor: 'neutral.500/0',
					_dark: {
						color: 'neutral.400',
					},
					_hoverOrFocusVisible: {
						color: 'neutral.900',
						backgroundColor: 'neutral.500/.05',
						_dark: {
							color: 'neutral.100',
						},
					},
					_active: {
						cursor: 'default',
						color: 'neutral.950',
						transitionDuration: 'slow',
						_dark: {
							color: 'neutral.900',
						},
					},
				},
				thumb: {
					inset: '0',
					zIndex: '-1',
					borderRadius: 'inherit',
					backgroundColor: 'white',
					_dark: {
						backgroundColor: 'neutral.300',
					},
				},
			},
		},
	},
	defaultVariants: {
		type: 'default',
	},
});
