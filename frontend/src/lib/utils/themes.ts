import type { Themes } from 'plugins/styles';

/**
 * JS function replicating the behavior of the custom sass col() util to compose the theme-agnostic variable name with
 * intellisense.
 */
export function col<C extends string & keyof Themes[string], S extends string & keyof Themes[string][C]>(
	color: C,
	shade: S,
	alpha?: number
) {
	if (alpha) {
		return `rgb(var(--rgb-${color}-${shade}), ${alpha})`;
	}
	return `var(--color-${color}-${shade})`;
}

/**
 * App-specific color palettes.
 */
export const themes: Themes = {
	light: {
		bg: {
			'000': 'hsl(50, 20%, 100%)',
			100: 'hsl(52, 20%, 98%)',
			300: 'hsl(54, 18%, 94%)',
			500: 'hsl(56, 15%, 90%)',
			700: 'hsl(58, 12%, 86%)',
			900: 'hsl(60, 11%, 80%)',
		},
		fg: {
			'000': 'hsl(95, 20%, 0%)',
			100: 'hsl(90, 18%, 8%)',
			300: 'hsl(85, 16%, 12%)',
			500: 'hsl(80,14%, 16%)',
			700: 'hsl(75, 13%, 21%)',
			900: 'hsl(72, 12%, 25%)',
		},
		primary: {
			100: 'hsl(157, 55%, 72%)',
			300: 'hsl(156, 55%, 62%)',
			500: 'hsl(156, 53%, 50%)',
			700: 'hsl(157, 64%, 39%)',
			900: 'hsl(158, 71%, 30%)',
		},
		secondary: {
			100: 'hsl(243, 86%, 81%)',
			300: 'hsl(244, 83%, 77%)',
			500: 'hsl(245, 77%, 72%)',
			700: 'hsl(246, 74%, 66%)',
			900: 'hsl(247, 66%, 58%)',
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
	},
	dark: {
		bg: {
			'000': 'hsl(204, 20%, 0%)',
			100: 'hsl(203, 18%, 9%)',
			300: 'hsl(202,17%, 12%)',
			500: 'hsl(201,16%, 16%)',
			700: 'hsl(200, 15%, 18%)',
			900: 'hsl(199, 14%, 21%)',
		},
		fg: {
			'000': 'hsl(140, 9%, 86%)',
			100: 'hsl(125, 10%, 90%)',
			300: 'hsl(110, 12%, 93%)',
			500: 'hsl(95, 16%, 95%)',
			700: 'hsl(80, 20%, 98%)',
			900: 'hsl(0, 0%, 100%)',
		},
		primary: {
			100: 'hsl(158, 76%, 24%)',
			300: 'hsl(157, 68%, 33%)',
			500: 'hsl(155, 55%, 45%)',
			700: 'hsl(156, 55%, 55%)',
			900: 'hsl(157, 55%, 64%)',
		},
		secondary: {
			100: 'hsl(243, 86%, 81%)',
			300: 'hsl(244, 83%, 77%)',
			500: 'hsl(245, 77%, 72%)',
			700: 'hsl(246, 74%, 66%)',
			900: 'hsl(247, 66%, 58%)',
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
	},
} as const;
