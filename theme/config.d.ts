export default config;
export type Color = `${'rgb' | 'hsl'}(${string})` | `#${string}`;
export type Size = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
export type Config = {
    modes: string[];
    colors: {
        [x: string]: {
            100: Color;
            200: Color;
            300: Color;
            400: Color;
            500: Color;
            600: Color;
            700: Color;
            800: Color;
            900: Color;
        } | undefined;
    };
    fonts: {
        [x: string]: string | undefined;
    };
    /**
     * Root font size in px.
     */
    rootFontSize: number;
    /**
     * Root-based sizes.
     */
    sizes: {
        "3xs"?: `${number}rem` | undefined;
        "2xs"?: `${number}rem` | undefined;
        xs?: `${number}rem` | undefined;
        sm?: `${number}rem` | undefined;
        md?: `${number}rem` | undefined;
        lg?: `${number}rem` | undefined;
        xl?: `${number}rem` | undefined;
        "2xl"?: `${number}rem` | undefined;
        "3xl"?: `${number}rem` | undefined;
        "4xl"?: `${number}rem` | undefined;
        "5xl"?: `${number}rem` | undefined;
    };
    /**
     * Em-based sizes.
     */
    spacings: {
        "3xs"?: `${number}em` | undefined;
        "2xs"?: `${number}em` | undefined;
        xs?: `${number}em` | undefined;
        sm?: `${number}em` | undefined;
        md?: `${number}em` | undefined;
        lg?: `${number}em` | undefined;
        xl?: `${number}em` | undefined;
        "2xl"?: `${number}em` | undefined;
        "3xl"?: `${number}em` | undefined;
        "4xl"?: `${number}em` | undefined;
        "5xl"?: `${number}em` | undefined;
    };
    /**
     * Absolute radius sizes.
     */
    radiuses: {
        "3xs"?: `${number}rem` | `${number}px` | undefined;
        "2xs"?: `${number}rem` | `${number}px` | undefined;
        xs?: `${number}rem` | `${number}px` | undefined;
        sm?: `${number}rem` | `${number}px` | undefined;
        md?: `${number}rem` | `${number}px` | undefined;
        lg?: `${number}rem` | `${number}px` | undefined;
        xl?: `${number}rem` | `${number}px` | undefined;
        "2xl"?: `${number}rem` | `${number}px` | undefined;
        "3xl"?: `${number}rem` | `${number}px` | undefined;
        "4xl"?: `${number}rem` | `${number}px` | undefined;
        "5xl"?: `${number}rem` | `${number}px` | undefined;
    };
};
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
declare const config: Required<Config>;
//# sourceMappingURL=config.d.ts.map