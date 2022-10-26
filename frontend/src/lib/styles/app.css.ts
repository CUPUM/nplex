import { colors } from '$utils/colors';
import { walk } from '$utils/object';
import { px } from '$utils/styles';
import { createGlobalTheme, createTheme, createThemeContract } from '@vanilla-extract/css';
import { colord } from 'colord';

const GRID = 2;
const COLOR_MODEL = colors.light;

/**
 * General theming, aka non-switchable theme values.
 */
const general = createGlobalTheme(':root', {
	sizes: {
		x3small: px(4 * GRID),
		x2small: px(5 * GRID),
		xsmall: px(6 * GRID),
		small: px(7 * GRID),
		medium: px(8 * GRID),
		large: px(10 * GRID),
		xlarge: px(14 * GRID),
		x2large: px(20 * GRID),
		x3large: px(28 * GRID),
		x4large: px(38 * GRID),
	},
	ratios: {
		radius: '1',
		height: '3',
		inlinepad: '1.25',
	},
});

// /**
//  * Ratios theming.
//  *
//  * For things to work as expected, one of the ratios class must be applied to the body.
//  */

// const regularRatios = {
// 	radius: '1ex',
// 	height: '3ex',
// };

// const compactRatios: typeof regularRatios = {
// 	radius: '1ex',
// 	height: '3ex',
// };

// const ratiosContract = createThemeContract(regularRatios);

// const regular = createTheme(ratiosContract, regularRatios);

// const compact = createTheme(ratiosContract, compactRatios);

// /**
//  * Contextual classes to apply a certain ratio style.
//  */
// export const ratios = {
// 	regular,
// 	compact,
// };

/**
 * Colors theming.
 *
 * For things to work as expected, one of the themes class must be applied to the body.
 */

function fades(colors: typeof COLOR_MODEL): typeof COLOR_MODEL {
	return walk(colors, (k, v) => {
		const rgb = colord(v + '').toRgb();
		return [k, [rgb.r, rgb.g, rgb.b].join(' ')];
	});
}

const colorsContract = createThemeContract({ colors: COLOR_MODEL, fades: COLOR_MODEL });

const light = createTheme(colorsContract, {
	colors: colors.light,
	fades: fades(colors.light),
});

const dark = createTheme(colorsContract, {
	colors: colors.dark,
	fades: fades(colors.dark),
});

/**
 * Contextual classes to apply a certain color theme.
 */
export const themes = {
	light,
	dark,
};

/**
 * Agnostic theme variable getters.
 */

export const vars = {
	...general,
	// ratios: ratiosContract,
	...colorsContract,
};
