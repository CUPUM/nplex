const postcss = require('postcss');
const colors = require('./colors.cjs');

/**
 * Helper to invoke CSS custom properties without having to prepend double-dash
 * @param varName String corresponding to the CSS custom property's name without the leading double-dash
 * @returns CSS Custom property `var(--[...])` call
 */
exports.get = (varName) => {
	return `var(--${varName})`;
}


/**
 * Helper to access a defined theme font
 * @param fontLevel fontLevel
 * @returns CSS custom property of the font-family definition
 */
exports.font = (fontLevel) => {
	return `var(--font-${fontLevel})`;
}


/**
 * @param colorString HEX or RGB string defining a color
 * @returns A string of the color decomposed into its R, G, and B components
 */
const decompose = (colorString) => {
	/* rgb */
	const rgb = colorString.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
	if (rgb) {
		return rgb.slice(1).join(', ');
	}
	/* hex */
	const normal = colorString.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
	if (normal) {
		return normal.slice(1).map(e => parseInt(e, 16)).join(', ');
	}
	const shorthand = colorString.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
	if (shorthand) {
		return shorthand.slice(1).map(e => 0x11 * parseInt(e, 16)).join(', ');
	}
	throw new Error('Provided color string does not match valid formats');
}
exports.decompose = decompose;


/**
 * Generating the CSS custom properties of the colors as two versions:
 * 1: --rgb-[colorname]: decomposed R, G, and B values for alpha manipulation
 * 2: --[colorname]: rgb string ready for direct use
 */
// ??? Utiliser une règle "@" dans :root de app.postcss???
// const rootRule = postcss.rule({ selector: 'body' });
// rootRule.append('--test-postcss: red');
// postcss.append(rootRule);

// Object.entries(colors).forEach(([ck, cv]) => {
// 	Object.entries(cv).forEach(([lk, lv]) => {
// 		// console.log(`--rgb-${ck}${lk}: ${decompose(lv)}`);
// 	});
// });


/**
 * Takes an unflagged css custom property (i.e.: name without the leading double-dash) holding rgb values
 * and returns the corresponding appropriate rgb(a) declaration, enabling the use of alpha with theme colors.
 * @param colorName String corresponding to the css custom property, without the leading dashes
 * @param alpha Float (0 to 1) or percentage string (with percent symbol) corresponding to the desired alpha level
 * @returns String of format `rgba(var(--[colorName]), [alpha])`
 */
exports.color = (colorName, alpha) => {
	return `rgb(var(--${colorName})${alpha === undefined ? '' : ', ' + alpha})`;
}
