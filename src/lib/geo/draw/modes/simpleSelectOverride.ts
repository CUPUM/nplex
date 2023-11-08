import MapboxDraw from '@mapbox/mapbox-gl-draw';

/**
 * Overriding: https://github.com/mapbox/mapbox-gl-draw/blob/main/src/modes/simple_select.js.
 */
export const DrawSimpleSelectMode: MapboxDraw.DrawCustomMode = {
	...MapboxDraw.modes.simple_select,

	// toDisplayFeatures(state, geojson, display) {
	// 	if (isCircle(geojson)) {
	// 		toDisplayCircleFeatures(geojson, this._ctx)?.forEach(display);
	// 	} else {
	// 		display(geojson);
	// 	}
	// },
};
