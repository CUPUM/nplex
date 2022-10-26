/**
 * Keeping colors in a standalone module for usability out of `css`(`css.ts`) scopes, in plain script.
 */

const light = {
	base: {
		100: 'hsl(80, 20%, 98%)',
		300: 'hsl(95, 18%, 95%)',
		500: 'hsl(110, 15%, 93%)',
		700: 'hsl(125, 12%, 90%)',
		900: 'hsl(140, 11%, 86%)',
	},
	contrast: {
		100: 'hsl(49, 5%, 35%)',
		300: 'hsl(50, 6%, 29%)',
		500: 'hsl(51,7%, 21%)',
		700: 'hsl(52,8%, 15%)',
		900: 'hsl(53, 9%, 10%)',
	},
	primary: {
		100: 'hsl(157, 48%, 72%)',
		300: 'hsl(156, 50%, 63%)',
		500: 'hsl(155, 54%, 50%)',
		700: 'hsl(157, 66%, 42%)',
		900: 'hsl(158, 79%, 33%)',
	},
	secondary: {
		100: 'hsl(23, 86%, 81%)',
		300: 'hsl(22, 83%, 77%)',
		500: 'hsl(21, 77%, 72%)',
		700: 'hsl(20, 74%, 66%)',
		900: 'hsl(19, 66%, 58%)',
	},
	success: {
		100: 'hsl(83, 71%, 74%)',
		300: 'hsl(83, 72%, 68%)',
		500: 'hsl(83, 73%, 60%)',
		700: 'hsl(83, 74%, 49%)',
		900: 'hsl(83, 80%, 44%)',
	},
	error: {
		100: 'hsl(2, 90%, 78%)',
		300: 'hsl(3, 88%, 72%)',
		500: 'hsl(3, 84%, 66%)',
		700: 'hsl(4, 76%, 59%)',
		900: 'hsl(5, 66%, 50%)',
	},
};

const dark: typeof light = {
	base: {
		100: 'hsl(49, 5%, 35%)',
		300: 'hsl(50, 6%, 29%)',
		500: 'hsl(51,7%, 21%)',
		700: 'hsl(52,8%, 15%)',
		900: 'hsl(53, 9%, 10%)',
	},
	contrast: {
		100: 'hsl(80, 20%, 98%)',
		300: 'hsl(95, 16%, 95%)',
		500: 'hsl(110, 12%, 93%)',
		700: 'hsl(125, 10%, 90%)',
		900: 'hsl(140, 9%, 86%)',
	},
	primary: {
		100: 'hsl(23, 86%, 81%)',
		300: 'hsl(22, 83%, 77%)',
		500: 'hsl(21, 77%, 72%)',
		700: 'hsl(20, 74%, 66%)',
		900: 'hsl(19, 66%, 58%)',
	},
	secondary: {
		100: 'hsl(157, 48%, 72%)',
		300: 'hsl(156, 50%, 63%)',
		500: 'hsl(155, 54%, 50%)',
		700: 'hsl(157, 66%, 42%)',
		900: 'hsl(158, 79%, 33%)',
	},
	success: {
		100: 'hsl(83, 71%, 74%)',
		300: 'hsl(83, 72%, 68%)',
		500: 'hsl(83, 73%, 60%)',
		700: 'hsl(83, 74%, 49%)',
		900: 'hsl(83, 80%, 44%)',
	},
	error: {
		100: 'hsl(2, 90%, 78%)',
		300: 'hsl(3, 88%, 72%)',
		500: 'hsl(3, 84%, 66%)',
		700: 'hsl(4, 76%, 59%)',
		900: 'hsl(5, 66%, 50%)',
	},
};

/**
 * App color theme:
 *
 * - `primary` is the main accent color;
 * - `secondary` is destined for miscellaneous use of secondary importance such as highlights, notification badges, etc.;
 * - `base` provides a background/base palette;
 * - `contrast` provides a foreground tones palette mostly used for text and other content forefronting;
 * - `success` is a semantic color used to highlight or indicate successful operations or events;
 * - `error` is a semantic color used to highlight or indicate erronous operations, warnings, etc.
 */
export const colors = {
	light,
	dark,
} as const;
