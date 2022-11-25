/**
 * Helpers accessible to client code (without fs import)
 */

/**
 * Dictates the shape of exhaustive color theme definitions.
 */
export type ContextTheme = {
	[neutral in 'bg' | 'fg']: {
		[shade in '000' | '100' | '300' | '500' | '700' | '900']: string;
	};
} & {
	[color in 'primary' | 'secondary' | 'success' | 'error']: {
		[shade in '100' | '300' | '500' | '700' | '900']: string;
	};
};

/**
 * JS function replicating the behavior of the custom sass col() util to compose the theme-agnostic
 * variable name with intellisense.
 */
export function col<
	C extends string & keyof ContextTheme,
	S extends string & keyof ContextTheme[C]
>(color: C, shade: S, alpha?: number) {
	if (alpha) {
		return `rgb(var(--rgb-${color}-${shade}), ${alpha})`;
	}
	return `var(--color-${color}-${shade})`;
}

/**
 * ! OUTSIDE THIS MODULE, USE THEME BOOK CREATOR FUNCITON INSTEAD !
 *
 * Function to compose a thematic context's class name.
 */
export function getThemeClass<T extends Record<string, ContextTheme>>(name: keyof T) {
	return `ui-context-${String(name)}`;
}

/**
 * Pattern for matching theme classes in a className attribute.
 */
export const themeClassPattern = new RegExp(/\bui-context-.+?\b/, 'gi');

/**
 * Create a dictionary to retrieve classnames of themes.
 */
export function createThemeBook<T extends Record<string, ContextTheme>>(themes: T) {
	return Object.fromEntries(Object.keys(themes).map((k) => [k, getThemeClass(k)])) as Record<
		keyof T,
		string
	>;
}
