import { defineSlotRecipe } from '@pandacss/dev';

export const buttonRecipe = defineSlotRecipe({
	className: 'button',
	description: 'Base button styling',
	slots: ['root', 'icon', 'loading'],
	base: {
		root: {
			userSelect: 'none',
			cursor: 'pointer',
			lineHeight: '1.2',
			position: 'relative',
			display: 'inline-flex',
			flexDirection: 'row',
			alignItems: 'center',
			gap: '0.75em',
			fontWeight: '450',
			paddingBlock: '0',
			paddingInline: 'blockpad',
			height: 'block',
			minWidth: 'block',
			borderRadius: 'base',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			transitionDuration: 'fast',
			transitionProperty: 'all',
			transitionTimingFunction: 'ease-out',
			_hover: {
				transitionDuration: '0s',
			},
			_focusVisible: {
				transitionDuration: '0s',
			},
			_disabled: {
				pointerEvents: 'none',
			},
			_loading: {},
			_selected: {},
		},
		icon: {
			strokeWidth: '2',
			strokeLinecap: 'square',
			strokeLinejoin: 'round',
			opacity: '.5',
			scale: '1',
			flex: 'none',
			width: '1.25em',
			transitionProperty: 'opacity, scale',
			transitionDuration: 'medium',
			transitionTimingFunction: 'ease-out',
		},
		loading: {},
	},
	variants: {
		special: {
			danger: {},
		},
		align: {
			start: {
				root: {
					justifyContent: 'flex-start',
				},
			},
			center: {
				root: {
					justifyContent: 'center',
				},
			},
			end: {
				root: {
					justifyContent: 'flex-end',
				},
			},
			spread: {
				root: {
					justifyContent: 'space-between',
				},
			},
		},
		shape: {
			round: {
				root: {
					borderRadius: 'full',
				},
			},
			square: {},
		},
		type: {
			default: {
				root: {
					color: 'neutral.800',
					backgroundColor: 'neutral.500/.25',
					_dark: {
						color: 'neutral.200',
					},
					_hover: {
						color: 'neutral.950',
						backgroundColor: 'neutral.400/.25',
						_dark: {
							color: 'neutral.50',
							backgroundColor: 'neutral.600/.25',
						},
					},
					_focusVisible: {
						color: 'neutral.950',
						backgroundColor: 'neutral.600/.25',
						_dark: {
							color: 'neutral.50',
							backgroundColor: 'neutral.400/.25',
						},
					},
				},
			},
			outlined: {
				root: {
					color: 'neutral.800',
					border: 'base',
					_dark: {
						color: 'neutral.200',
					},
					_hover: {
						color: 'neutral.950',
						backgroundColor: 'neutral.600/.25',
						borderColor: 'transparent',
						_dark: {
							color: 'neutral.50',
						},
					},
					_focusVisible: {
						color: 'neutral.950',
						backgroundColor: 'neutral.400/.25',
						borderColor: 'transparent',
						_dark: {
							color: 'neutral.50',
						},
					},
					_loading: {
						color: 'neutral.800/.5',
						_dark: {
							color: 'neutral.200/.5',
						},
					},
				},
				loading: {
					color: 'neutral.800',
					_dark: {
						color: 'neutral.200',
					},
				},
			},
			ghost: {
				root: {},
			},
			link: {
				root: {
					fontWeight: '425',
					color: 'neutral.800',
					textDecoration: 'underline',
					textUnderlineOffset: '.25em',
					textDecorationThickness: '.125em',
					textDecorationColor: 'transparent',
					textDecorationSkipInk: 'none',
					textDecorationLine: 'underline',
					_dark: {
						color: 'neutral.200',
					},
					_hover: {
						color: 'primary.600',
						textDecorationColor: 'currentcolor',
						textUnderlineOffset: '.5em',
						_dark: {
							color: 'primary.400',
						},
					},
					_focusVisible: {
						color: 'primary.600',
						textDecorationColor: 'currentcolor',
						textUnderlineOffset: '.5em',
						_dark: {
							color: 'primary.400',
						},
					},
				},
				icon: {},
			},
			cta: {
				root: {
					color: 'neutral.100',
					backgroundColor: 'primary.950',
					_dark: {
						color: 'neutral.800',
						backgroundColor: 'primary.500',
					},
					_hover: {
						color: 'neutral.50',
						backgroundColor: 'primary.800',
						_dark: {
							color: 'neutral.900',
							backgroundColor: 'primary.400',
						},
					},
					_focusVisible: {
						color: 'neutral.50',
						backgroundColor: 'primary.800',
						_dark: {
							color: 'neutral.900',
							backgroundColor: 'primary.400',
						},
					},
					_loading: {
						color: 'primary.700',
						backgroundColor: 'primary.900',
						_dark: {
							color: 'primary.800',
							backgroundColor: 'primary.600',
						},
					},
				},
				icon: {},
				loading: {
					_loading: {
						color: 'primary.50',
						_dark: {
							color: 'primary.950',
						},
					},
				},
			},
		},
	},
	defaultVariants: {
		align: 'center',
		type: 'default',
	},
	compoundVariants: [
		{
			shape: ['round', 'square'],
			css: {
				root: {
					padding: '0',
					justifyContent: 'center',
					aspectRatio: '1',
				},
				icon: {
					width: '1.35em',
					opacity: '1',
				},
			},
		},
		// {special: 'danger', type: },
		{
			special: 'danger',
			type: ['default', 'ghost', 'link', 'outlined'],
			css: {
				root: {
					color: 'error.700',
					_dark: {
						color: 'error.300',
					},
					_hoverOrFocusVisible: {
						color: 'error.800',
						backgroundColor: 'error.400/.1',
						_dark: {
							color: 'error.200',
						},
					},
				},
			},
		},
	],
});

export const segmentedButtonRecipe = defineSlotRecipe({
	slots: ['root', 'button', 'icon', 'loading'],
	className: 'segemented-button',
	base: {},
	variants: {},
	defaultVariants: {},
	// compoundVariants: {}
});
