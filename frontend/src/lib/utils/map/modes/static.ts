// From https://github.com/mapbox/mapbox-gl-draw-static-mode

import type { DrawCustomMode } from '@mapbox/mapbox-gl-draw';

export const DrawStaticMode: DrawCustomMode = {
	onSetup() {
		this.setActionableState({ trash: false, combineFeatures: false, uncombineFeatures: false });
		return {};
	},

	toDisplayFeatures(state, geojson, display) {
		display(geojson);
		// const displayGeodesic = (geojson) => {
		// 	const geodesicGeojson = createGeodesicGeojson(geojson, { ctx: this._ctx });
		// 	geodesicGeojson.forEach(display);
		// };
		// displayGeodesic(geojson);
	},
};
