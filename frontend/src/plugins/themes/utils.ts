import { colord } from 'colord';
import { flatten } from '../../lib/utils/object';

/**
 * Dictates the shape of exhaustive color theme definitions.
 */
export type Theme = {
	[neutral in 'bg' | 'fg']: {
		[shade in '000' | '100' | '300' | '500' | '700' | '900']: string;
	};
} & {
	[color in 'primary' | 'secondary' | 'success' | 'error']: {
		[shade in '100' | '300' | '500' | '700' | '900']: string;
	};
};

/**
 * Generate fadeable rgb components for a color.
 */
export function fade(color: string) {
	const { r, g, b } = colord(color).toRgb();
	return `${r}, ${g}, ${b}`;
}

/**
 * Compose css custom properties.
 */
export function vars(
	object: object,
	format: (k: string, v: string | number) => [k: string, v: string | number]
) {
	return flatten(object)
		.map(([keys, val]) => {
			const [k, v] = format(keys.join('-'), val);
			return `--${k}: ${v}`;
		})
		.join('; ');
}

/**
 * Get or compose a theme's class name with the plugin's established format.
 */
export function themeClass<T extends string>(name: T) {
	return `ui-theme-${name.toLowerCase() as Lowercase<T>}` as const;
}

/**
 * Pattern for matching theme classes in a className attribute.
 */
export const themeClassPattern = new RegExp(/\bui-theme-.+?\b/, 'gi');

/**
 * Create an enum-like dictionary to retrieve theme class names. The themes argument must be an `as
 * const` object.
 */
export function themeClasses<T extends Record<string, Theme>>(themes: T) {
	const names = Object.keys(themes);
	const classes = names.map((t) => [t, themeClass(t)]);
	return Object.fromEntries(classes) as Record<
		Extract<keyof T, string>,
		ReturnType<typeof themeClass<Extract<keyof T, string>>>
	>;
}

/**
 * Create an enum-like object to retrieve theme names (i.e. themes' record keys). The themes
 * argument must be an `as const` object.
 */
export function themeNames<T extends Record<string, Theme>>(themes: T) {
	const names = Object.keys(themes);
	return Object.fromEntries(names.map((n) => [n, n])) as Record<
		Extract<keyof T, string>,
		Extract<keyof T, string>
	>;
}
