const light = {
	base: {
		'000': 'hsl(80, 20%, 100%)',
		100: 'hsl(80, 20%, 98%)',
		300: 'hsl(95, 18%, 95%)',
		500: 'hsl(110, 15%, 93%)',
		700: 'hsl(125, 12%, 90%)',
		900: 'hsl(140, 11%, 86%)',
	},
	contrast: {
		100: 'hsl(95, 23%, 29%)',
		300: 'hsl(96, 21%, 24%)',
		500: 'hsl(97,19%, 19%)',
		700: 'hsl(98,16%, 14%)',
		900: 'hsl(99, 14%, 9%)',
		1000: 'hsl(90, 0%, 0%)',
	},
	primary: {
		100: 'hsl(157, 55%, 72%)',
		300: 'hsl(156, 55%, 63%)',
		500: 'hsl(155, 55%, 49%)',
		700: 'hsl(157, 68%, 39%)',
		900: 'hsl(158, 76%, 30%)',
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
		'000': 'hsl(204, 10%, 0%)',
		100: 'hsl(203, 10%, 10%)',
		300: 'hsl(202,11%, 13%)',
		500: 'hsl(201,12%, 16%)',
		700: 'hsl(200, 13%, 19%)',
		900: 'hsl(199, 14%, 23%)',
	},
	contrast: {
		100: 'hsl(140, 9%, 86%)',
		300: 'hsl(125, 10%, 90%)',
		500: 'hsl(110, 12%, 93%)',
		700: 'hsl(95, 16%, 95%)',
		900: 'hsl(80, 20%, 98%)',
		1000: 'hsl(0, 0%, 100%)',
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

const grid = 2;

/**
 * App sizing chart. Unitless values, converted to pixels for css vars.
 */
export const sizes = {
	x4small: 3 * grid,
	x3small: 4 * grid,
	x2small: 5 * grid,
	xsmall: 6 * grid,
	small: 7 * grid,
	medium: 8 * grid,
	large: 10 * grid,
	xlarge: 14 * grid,
	x2large: 20 * grid,
	x3large: 28 * grid,
	x4large: 38 * grid,
};

export const ratios = {
	radius: 1,
	height: 3,
};
