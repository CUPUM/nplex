import { DRAW_ACTIVE_STATES, GEOJSON_GEOMETRY_TYPE } from '$utils/enums';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { createSupplementaryPointsForCircle, DRAW_CIRCLE_FLAG } from './circle';
import { createSupplementaryPoints, moveFeatures, type DisplayGeoJSON } from './common';

type DrawSimpleSelectState = {
	dragMoving: boolean;
};

type SimpleSelect = MapboxDraw.DrawCustomMode & {
	dragMove: MapboxDraw.DrawCustomMode['onDrag'];
	fireActionable: () => void;
};

/**
 * Overriding: https://github.com/mapbox/mapbox-gl-draw/blob/main/src/modes/simple_select.js.
 */
export const DrawSimpleSelectMode: MapboxDraw.DrawCustomMode<DrawSimpleSelectState> & {
	dragMove: SimpleSelect['dragMove'];
} = {
	...(MapboxDraw.modes.simple_select as SimpleSelect),

	dragMove(state, e) {
		// From source.
		state.dragMoving = true;
		e.originalEvent.stopPropagation();
		const delta = {
			lng: e.lngLat.lng - state.dragMoveLocation.lng,
			lat: e.lngLat.lat - state.dragMoveLocation.lat,
		};
		moveFeatures(this.getSelected(), delta);

		// Override:
		// Apply the drag move translation to lnglat data in properties
		this.getSelected().forEach((feature) => {
			// Update center property.
			if (feature.properties?.center) {
				feature.properties.center[0] += delta.lng;
				feature.properties.center[1] += delta.lat;
			}
			// Add as necessary.
		});

		// From source.
		state.dragMoveLocation = e.lngLat;
	},

	onMouseMove(state, e) {
		// Update circle handle at intersection of circumference and center->mousepos bearing.
	},

	toDisplayFeatures(state, geojson: DisplayGeoJSON, display) {
		// From source.
		geojson.properties.active = this.isSelected(geojson.properties.id)
			? DRAW_ACTIVE_STATES.Active
			: DRAW_ACTIVE_STATES.Inactive;
		display(geojson);
		this.fireActionable();
		if (
			geojson.properties.active !== DRAW_ACTIVE_STATES.Active ||
			geojson.geometry.type === GEOJSON_GEOMETRY_TYPE.Point
		) {
			return;
		}

		// Override:
		let supplementaryPoints = [];
		if (geojson.properties?.[`user_${DRAW_CIRCLE_FLAG}`]) {
			createSupplementaryPointsForCircle(geojson);
		} else {
			createSupplementaryPoints(geojson);
		}
		supplementaryPoints.forEach(display);
	},
};
