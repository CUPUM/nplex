/**
 * @typedef {`${'rgb' | 'hsl'}(${string})` | `#${string}`} Color
 *
 * @typedef {'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'} Size
 *
 * @typedef {Object} Config
 * @property {string[]} modes
 * @property {{
 * 	[P in 'primary' | 'secondary' | 'light' | 'dark' | 'error' | 'success' | string]?: {
 * 		100: Color;
 * 		200: Color;
 * 		300: Color;
 * 		400: Color;
 * 		500: Color;
 * 		600: Color;
 * 		700: Color;
 * 		800: Color;
 * 		900: Color;
 * 	};
 * }} colors
 * @property {{
 * 	[F in 'main' | 'misc' | 'secondary' | 'mono' | 'sans' | string]?: string;
 * }} fonts
 * @property {number} rootFontSize Root font size in px.
 * @property {{
 * 	[S in Size]?: `${number}rem`;
 * }} sizes Root-based sizes.
 * @property {{
 * 	[S in Size]?: `${number}em`;
 * }} spacings Em-based sizes.
 * @property {{
 * 	[S in Size]?: `${number}${'rem' | 'px'}`;
 * }} radiuses Absolute radius sizes.
 */

/**
 * @type {Required<Config>}
 */
const config = {
	rootFontSize: 16,
	modes: ['light', 'dark'],
	fonts: {
		main: 'Outfit, sans-serif',
		mono: 'JetBrains Mono, monospace',
	},
	colors: {
		light: {
			100: 'hsl(61, 20%, 97%)',
			200: 'hsl(61, 20%, 97%)',
			300: 'hsl(62, 18%, 94%)',
			400: 'hsl(62, 18%, 94%)',
			500: 'hsl(63, 15%, 90%)',
			600: 'hsl(63, 15%, 90%)',
			700: 'hsl(64, 12%, 85%)',
			800: 'hsl(64, 12%, 85%)',
			900: 'hsl(65, 11%, 79%)',
		},
		dark: {
			100: 'hsl(141, 7%, 24%)',
			200: 'hsl(141, 7%, 24%)',
			300: 'hsl(142, 8%, 18%)',
			400: 'hsl(142, 8%, 18%)',
			500: 'hsl(143, 9%, 12%)',
			600: 'hsl(143, 9%, 12%)',
			700: 'hsl(144, 10%, 8%)',
			800: 'hsl(144, 10%, 8%)',
			900: 'hsl(145, 0%, 4%)',
		},
		primary: {
			100: 'hsl(145, 31%, 54%)',
			200: 'hsl(145, 31%, 54%)',
			300: 'hsl(146, 32%, 48%)',
			400: 'hsl(146, 32%, 48%)',
			500: 'hsl(147, 33%, 40%)',
			600: 'hsl(147, 33%, 40%)',
			700: 'hsl(148, 34%, 30%)',
			800: 'hsl(148, 34%, 30%)',
			900: 'hsl(149, 35%, 18%)',
		},
		secondary: {
			100: 'hsl(221, 84%, 80%)',
			200: 'hsl(221, 84%, 80%)',
			300: 'hsl(223, 81%, 74%)',
			400: 'hsl(223, 81%, 74%)',
			500: 'hsl(225, 75%, 68%)',
			600: 'hsl(225, 75%, 68%)',
			700: 'hsl(227, 72%, 62%)',
			800: 'hsl(227, 72%, 62%)',
			900: 'hsl(229, 64%, 54%)',
		},
		success: {
			100: 'hsl(83, 65%, 76%)',
			200: 'hsl(83, 65%, 76%)',
			300: 'hsl(83, 68%, 56%)',
			400: 'hsl(83, 68%, 56%)',
			500: 'hsl(83, 72%, 40%)',
			600: 'hsl(83, 72%, 40%)',
			700: 'hsl(83, 68%, 38%)',
			800: 'hsl(83, 68%, 38%)',
			900: 'hsl(83, 65%, 30%)',
		},
		error: {
			100: 'hsl(10, 70%, 78%)',
			200: 'hsl(10, 70%, 78%)',
			300: 'hsl(9, 75%, 62%)',
			400: 'hsl(9, 75%, 62%)',
			500: 'hsl(8, 80%, 54%)',
			600: 'hsl(8, 80%, 54%)',
			700: 'hsl(7, 85%, 40%)',
			800: 'hsl(7, 85%, 40%)',
			900: 'hsl(6, 90%, 30%)',
		},
	},
	sizes: {
		'2xs': '.5rem',
		'xs': '.65rem',
		'sm': '.8rem',
		'md': '1rem',
		'lg': '1.25rem',
		'xl': '1.5rem',
		'2xl': '2rem',
		'3xl': '2.75rem',
		'4xl': '3.75rem',
		'5xl': '5.5rem',
	},
	spacings: {
		'3xs': '.25em',
		'2xs': '.5em',
		'xs': '.75em',
		'sm': '1em',
		'md': '1.25em',
		'lg': '1.75em',
		'xl': '2.25em',
		'2xl': '2.75em',
		'3xl': '3.5em',
		'4xl': '5em',
		'5xl': '7em',
	},
	radiuses: {
		'2xs': '6px',
		'xs': '8px',
		'sm': '12px',
		'md': '16px',
		'lg': '24px',
		'xl': '32px',
		'2xl': '48px',
		'3xl': '72px',
	},
};

export default config;
