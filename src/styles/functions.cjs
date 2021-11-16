exports.get = function(varName) {
	return `var(--${varName})`;
}


exports.font = function(fontLevel) {
	return `var(--font-${fontLevel})`;
}


/**
 * Takes an unflagged css custom property (i.e.: name without the leading double-dash) holding rgb values
 * and returns the corresponding appropriate rgb declaration.
 * @param colorName String corresponding to the css custom property, without the leading dashes
 * @returns String of format `rgb(var(--[colorName]))`
 */
exports.color = function (colorName) {
	return `rgb(var(--${colorName}))`;
}


/**
 * Takes an unflagged css custom property (i.e.: name without the leading double-dash) holding rgb values
 * and returns the corresponding appropriate rgba declaration, thus enabling the use of alpha with theme colors.
 * @param colorName String corresponding to the css custom property, without the leading dashes
 * @param alpha Float (0 to 1) or percentage string (with percent symbol) corresponding to the desired alpha level
 * @returns String of format `rgba(var(--[colorName]), [alpha])`
 */
exports.fade = function(colorName, alpha) {
	return `rgba(var(--${colorName}), ${alpha})`;
}
