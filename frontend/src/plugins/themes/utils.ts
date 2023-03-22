type ShadeKey<T extends number | '000'> = T | `${T}`;

/**
 * Dictates the shape of exhaustive color theme definitions.
 */
export type Theme = {
	[neutral in 'bg' | 'fg']: {
		[shade in ShadeKey<'000' | 100 | 300 | 500 | 700 | 900>]: string;
	};
} & {
	[color in 'primary' | 'secondary' | 'success' | 'error' | 'notice']: {
		[shade in ShadeKey<100 | 300 | 500 | 700 | 900>]: string;
	};
};

/**
 * Create an enum-like object to retrieve theme names (i.e. themes' record keys). The themes
 * argument must be an `as const` object.
 */
export function themeNames<T extends Record<string, Theme>>(themes: T) {
	const names = Object.keys(themes);
	return Object.fromEntries(names.map((name) => [name, name])) as { [K in keyof T]: K };
}
