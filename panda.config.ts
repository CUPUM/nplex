import { defineConfig, defineGlobalStyles, type PropertyConfig } from '@pandacss/dev';
import { BREAKPOINTS } from './src/lib/breakpoints/constants';
import { SETOUTS } from './src/lib/setout/constants';
import { buttonRecipe, segmentedButtonRecipe } from './style-recipes/button';
import { inputGroupRecipe, inputRecipe } from './style-recipes/input';
import { switchGroupRecipe } from './style-recipes/switch-group';

function transparentize<T>(
	value: T,
	{ token }: Parameters<NonNullable<PropertyConfig['transform']>>[1]
) {
	if (!value || typeof value !== 'string') {
		return value;
	}
	const [colorString, alphaString] = value.split('/');
	if (!colorString || !alphaString) {
		// console.info('Property value is not properly formatted for transparentization.');
		return value;
	}
	const colorValue = token(`colors.${colorString}`);
	const alphaToken = token(`opacity.${alphaString}`);
	const alphaValue = `${parseFloat(alphaToken ?? alphaString) * 100}%`;
	return `color-mix(in srgb, ${colorValue} ${alphaValue}, transparent)`;
}

function snakeToCamel(str: string, prefix?: string) {
	const parts = str.toLowerCase().split('_');
	if (prefix) {
		parts.unshift(prefix);
	}
	return parts
		.map((word, i) => {
			if (!i) {
				return word;
			}
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join('');
}

const globalCss = defineGlobalStyles({
	html: {
		'fontSize': '.9em',
		'fontFamily': 'main',
		'overflowX': 'hidden',
		'backgroundColor': 'bg',
		'color': 'neutral.700',
		'accentColor': 'primary.500',
		'fontWeight': '400',
		'transitionProperty': 'all',
		'transitionDuration': 'fast',
		'transitionTimingFunction': 'ease-out',
		'&[data-mode=dark]': {
			color: 'neutral.300',
		},
	},
	body: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100svh',
	},
	button: {
		color: 'currentcolor',
	},
});

export default defineConfig({
	outdir: 'styled-system',
	preflight: true,
	include: ['./src/**/*.{js,ts,svelte,md,mdx,svx}'],
	exclude: [],
	presets: [],
	shorthands: false,
	conditions: {
		extend: {
			light: '[data-mode=light]&, [data-mode=light] &',
			dark: '[data-mode=dark]&, [data-mode=dark] &',
			compact: '&:is(.compact, [data-compact]), .compact &, [data-compact] &',
			active: '&:is(:active, [data-active], [data-state=active])',
			hoverOrFocusVisible: '&:is(:hover, [data-hover], :focus-visible, [data-focus-visible])',
			current: '&:is([aria-current=page], [aria-current=step], [data-current])',
			notCurrent: '&:not([aria-current=page], [aria-current=step], [data-current])',
			hidden: '&:is([hidden], [data-hidden])',
			notHidden: '&:not([hidden], [data-hidden])',
			groupOpen: '.group:is([open], [data-open], [data-state="open"]) &',
			...Object.fromEntries(
				Object.keys(SETOUTS).map((s) => [
					snakeToCamel(s, 'setout'),
					`[data-setout=${SETOUTS[s]}] &`,
				])
			),
		},
	},
	theme: {
		extend: {
			breakpoints: {
				...Object.fromEntries(
					Object.keys(BREAKPOINTS).map((bp) => [snakeToCamel(bp), `${BREAKPOINTS[bp]}px`])
				),
			},
			tokens: {
				sizes: {
					navbar: {
						description: 'Height of root navbar, useful to position sticky sub-layout elements',
						value: '72px',
					},
					outline: {
						description: 'Base outline width for focus rings and other semantic outlines.',
						value: '3px',
					},
					content: {
						main: {
							description: '',
							value: '1200px',
						},
						md: {
							description: '',
							value: '760px',
						},
						sm: {
							description: '',
							value: '420px',
						},
					},
					dashboard: {
						navbar: {
							description: 'Size (width on large screens) of the dashboard layout navbar.',
							value: '175px',
						},
					},
					border: {
						base: { value: '1.5px' },
					},
				},
				spacing: {
					navbar: {
						value: '{sizes.navbar}',
					},
					dashboard: {
						navbar: {
							value: '{sizes.dashboard.navbar}',
						},
					},
				},
				fonts: {
					main: { value: 'Outfit, sans-serif' },
					misc: { value: 'Fraunces, serif' },
					mono: { value: 'Martian Mono, serif' },
				},
				colors: {
					neutral: {
						50: { value: 'hsl(30, 10%, 96%)' },
						100: { value: 'hsl(30, 9%, 92%)' },
						200: { value: 'hsl(30, 8%, 87%)' },
						300: { value: 'hsl(34, 7%, 81%)' },
						400: { value: 'hsl(34, 6%, 72%)' },
						500: { value: 'hsl(35, 5%, 45%)' },
						600: { value: 'hsl(33, 6%, 23%)' },
						700: { value: 'hsl(30, 7%, 18%)' },
						800: { value: 'hsl(32, 8%, 14%)' },
						900: { value: 'hsl(34, 9%, 11%)' },
						950: { value: 'hsl(30, 10%, 7%)' },
					},
					primary: {
						50: { value: 'hsl(162, 81%, 96%)' },
						100: { value: 'hsl(161, 80%, 90%)' },
						200: { value: 'hsl(160, 76%, 80%)' },
						300: { value: 'hsl(159, 72%, 67%)' },
						400: { value: 'hsl(158, 65%, 52%)' },
						500: { value: 'hsl(157, 88%, 39%)' },
						600: { value: 'hsl(156, 95%, 30%)' },
						700: { value: 'hsl(155, 95%, 23%)' },
						800: { value: 'hsl(154, 93%, 17%)' },
						900: { value: 'hsl(153, 91%, 12%)' },
						950: { value: 'hsl(152, 91%, 8%)' },
					},
					secondary: {
						50: { value: 'hsl(39, 75%, 90%)' },
						100: { value: 'hsl(39, 74%, 84%)' },
						200: { value: 'hsl(38, 73%, 77%)' },
						300: { value: 'hsl(37, 72%, 70%)' },
						400: { value: 'hsl(37, 73%, 62%)' },
						500: { value: 'hsl(38, 70%, 54%)' },
						600: { value: 'hsl(39, 69%, 45%)' },
						700: { value: 'hsl(38, 68%, 39%)' },
						800: { value: 'hsl(37, 67%, 30%)' },
						900: { value: 'hsl(36, 66%, 21%)' },
						950: { value: 'hsl(35, 65%, 12%)' },
					},
				},
				radii: {
					'2xs': { value: '6px' },
					'xs': { value: '8px' },
					'sm': { value: '12px' },
					'md': { value: '16px' },
					'lg': { value: '21px' },
					'xl': { value: '28px' },
					'2xl': { value: '36px' },
					'3xl': { value: '48px' },
					'full': { value: '9999px' },
					'base': {
						value: '{radii.md}',
					},
				},
				shadows: {
					'xs': { value: '0 1px 2px -1px rgb(0, 0, 0, 0.05)' },
					'sm': { value: '0 3px 3px -2px rgb(0, 0, 0, 0.1), 0 1px 2px -1px rgb(0, 0, 0, 0.025)' },
					'md': { value: '0 5px 8px -3px rgb(0, 0, 0, 0.1), 0 2px 4px -2px rgb(0, 0, 0, 0.05)' },
					'lg': { value: '0 10px 16px -4px rgb(0, 0, 0, 0.1), 0 4px 6px -4px rgb(0, 0, 0, 0.1)' },
					'xl': { value: '0 16px 24px -10px rgb(0, 0, 0, 0.1), 0 8px 10px -6px rgb(0, 0, 0, 0.1)' },
					'2xl': { value: '0 24px 48px -16px rgb(0, 0, 0, 0.25)' },
				},
				easings: {
					'ease-expo': { value: 'cubic-bezier(0.87, 0, 0.13, 1)' },
					'ease-in-expo': { value: 'cubic-bezier(0.7, 0, 0.84, 0)' },
					'ease-out-expo': { value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
				},
				opacity: {
					dim: { value: '0.75' },
					dimmer: { value: '0.4' },
				},
				borders: {
					base: {
						value:
							'{sizes.border.base} solid color-mix(in srgb, {colors.neutral.500} 25%, transparent)',
					},
				},
				durations: {
					'fast': { value: '125ms' },
					'medium': { value: '250ms' },
					'slow': { value: '350ms' },
					'xslow': { value: '500ms' },
					'2xslow': { value: '750' },
					'3xslow': { value: '1250' },
				},
				animations: {
					press: {
						value: 'press {durations.fast} ease-out',
					},
				},
			},
			semanticTokens: {
				sizes: {
					block: {
						description:
							'Base block size (relative) for inputs & various elements.Use of "em" allows for sizing relative to element font-size.',
						value: {
							base: '3.5em',
							_compact: '2.75em',
						},
					},
				},
				spacing: {
					inset: {
						value: {
							base: '6px',
							_compact: '1px',
						},
					},
					blockpad: {
						value: {
							base: '1.25em',
							_compact: '1.1em',
						},
					},
				},
				colors: {
					bg: {
						value: {
							_light: '{colors.neutral.100}',
							_dark: '{colors.neutral.900}',
						},
					},
					success: {
						// value: '{colors.lime}',
						50: { value: 'hsl(89, 86%, 88%)' },
						100: { value: 'hsl(89, 84%, 83%)' },
						200: { value: 'hsl(89, 72%, 75%)' },
						300: { value: 'hsl(89, 68%, 64%)' },
						400: { value: 'hsl(89, 68%, 52%)' },
						500: { value: 'hsl(89, 75%, 43%)' },
						600: { value: 'hsl(89, 78%, 35%)' },
						700: { value: 'hsl(89, 79%, 30%)' },
						800: { value: 'hsl(89, 80%, 24%)' },
						900: { value: 'hsl(89, 83%, 18%)' },
						950: { value: 'hsl(89, 82%, 12%)' },
					},
					error: {
						// value: '{colors.red}',
						50: { value: 'hsl(8, 84%, 84%)' },
						100: { value: 'hsl(8, 79%, 78%)' },
						200: { value: 'hsl(8, 78%, 69%)' },
						300: { value: 'hsl(8, 78%, 63%)' },
						400: { value: 'hsl(8, 79%, 58%)' },
						500: { value: 'hsl(8, 80%, 54%)' },
						600: { value: 'hsl(8, 80%, 50%)' },
						700: { value: 'hsl(8, 82%, 44%)' },
						800: { value: 'hsl(8, 84%, 37%)' },
						900: { value: 'hsl(8, 86%, 29%)' },
						950: { value: 'hsl(8, 89%, 20%)' },
					},
				},
			},
			keyframes: {
				press: {
					'0%': {
						scale: '1',
					},
					'25%': {
						scale: '0.96',
					},
					'100%': {
						scale: '1',
					},
				},
			},
		},
		slotRecipes: {
			button: buttonRecipe,
			segmentedButton: segmentedButtonRecipe,
			inputGroup: inputGroupRecipe,
			switchGroup: switchGroupRecipe,
		},
		recipes: {
			input: inputRecipe,
		},
	},
	utilities: {
		extend: {
			color: {
				property: 'color',
				transform: (value, args) => {
					return {
						color: transparentize(value, args),
					};
				},
			},
			backgroundColor: {
				property: 'backgroundColor',
				transform: (value, args) => {
					return {
						backgroundColor: transparentize(value, args),
					};
				},
			},
			background: {
				property: 'background',
				transform: (value, args) => {
					return {
						background: transparentize(value, args),
					};
				},
			},
			borderColor: {
				property: 'borderColor',
				transform: (value, args) => {
					return {
						borderColor: transparentize(value, args),
					};
				},
			},
			outlineColor: {
				property: 'outlineColor',
				transform: (value, args) => {
					return {
						outlineColor: transparentize(value, args),
					};
				},
			},
		},
	},
	globalCss,
	// strictTokens: true,
});
