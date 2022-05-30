import { expoOut } from 'svelte/easing';

/**
 * Fly, scale, and/or fade transition combined with appropriate slide transition with `overflow: visible` for smooth
 * insertion without clipping content.
 */
export function insert(
	el: Element,
	{
		delay = 0,
		duration = 350,
		scale = 1,
		skew = 0,
		x = 0,
		y = 0,
		opacity = 1,
		width = false,
		height = true,
		easing = expoOut,
	}
) {
	const _style = getComputedStyle(el);
	/**
	 * Detached target styles.
	 */
	const _opacity = +_style.opacity;
	const _width = parseFloat(_style.width);
	const _max_width = parseFloat(_style.maxWidth);
	const _height = parseFloat(_style.height);
	const _max_height = parseFloat(_style.maxHeight);
	const _padding_top = parseFloat(_style.paddingTop);
	const _padding_right = parseFloat(_style.paddingRight);
	const _padding_bottom = parseFloat(_style.paddingBottom);
	const _padding_left = parseFloat(_style.paddingLeft);
	const _margin_top = parseFloat(_style.marginTop);
	const _margin_right = parseFloat(_style.marginRight);
	const _margin_bottom = parseFloat(_style.marginBottom);
	const _margin_left = parseFloat(_style.marginLeft);
	const _border_top_width = parseFloat(_style.borderLeftWidth);
	const _border_right_width = parseFloat(_style.borderRightWidth);
	const _border_bottom_width = parseFloat(_style.borderBottomWidth);
	const _border_left_width = parseFloat(_style.borderLeftWidth);
	const _overflow = _style.overflow;
	const _transform = _style.transform;

	/**
	 * Opacity difference.
	 */
	const d_opacity = _opacity - opacity;

	return {
		delay,
		duration,
		easing,
		css: (t, u) =>
			`overflow: ${t < 1 ? 'visible' : _overflow};` +
			`opacity: ${_opacity - d_opacity * u};` +
			`width: ${width ? t * _width : _width}px;` +
			`max-width: ${width ? t * _max_width : _max_width}px;` +
			`height: ${height ? t * _height : _height}px;` +
			`max-height: ${height ? t * _max_height : _max_height}px;` +
			`padding-top: ${height ? t * _padding_top : _padding_top}px;` +
			`padding-right: ${width ? t * _padding_right : _padding_right}px;` +
			`padding-bottom: ${height ? t * _padding_bottom : _padding_bottom}px;` +
			`padding-left: ${width ? t * _padding_left : _padding_left}px;` +
			`margin-top: ${height ? t * _margin_top : _margin_top}px;` +
			`margin-right: ${width ? t * _margin_right : _margin_right}px;` +
			`margin-bottom: ${height ? t * _margin_bottom : _margin_bottom}px;` +
			`margin-left: ${width ? t * _margin_left : _margin_left}px;` +
			`border-top-width: ${height ? t * _border_top_width : _border_top_width}px;` +
			`border-right-width: ${width ? t * _border_right_width : _border_right_width}px;` +
			`border-bottom-width: ${height ? t * _border_bottom_width : _border_bottom_width}px;` +
			`border-left-width: ${width ? t * _border_left_width : _border_left_width}px;` +
			`transform: ${_transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);`,
	};
}
