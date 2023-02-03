import { KEY } from '$utils/enums';
import type MapboxDraw from '@mapbox/mapbox-gl-draw';
import type { Position } from '@turf/turf';

type MultiPointState = {
	pointFeatures: MapboxDraw.DrawPoint[];
	max?: number;
};

type MultiPointOptions = {
	points?: Position[];
	max?: number;
};

function createPoint(coordinates: Position): GeoJSON.Feature<GeoJSON.Point> {
	return {
		type: 'Feature',
		properties: {
			created_at: Date.now(),
		},
		geometry: {
			type: 'Point',
			coordinates: coordinates,
		},
	};
}

export const MultiPointMode: MapboxDraw.DrawCustomMode<MultiPointState, MultiPointOptions> = {
	onSetup({ points = [[-73.65, 45.55]], max = undefined }) {
		// Initializing points passed in options.
		const state: MultiPointState = {
			pointFeatures: [],
			max,
		};
		points.every((coord, i) => {
			if (max && i > max) {
				return false;
			}
			const point = this.newFeature(createPoint(coord)) as MapboxDraw.DrawPoint;
			state.pointFeatures.push(point);
			this.addFeature(point);
			return true;
		});
		return state;
	},

	onClick(state, e) {
		console.log(e);
		const newPoint = this.newFeature(createPoint(e.lngLat.toArray())) as MapboxDraw.DrawPoint;
		const count = state.pointFeatures.length;
		if (state.max && count && count >= state.max) {
			const remove = state.pointFeatures.shift();
			if (remove && remove.id != null) {
				this.deleteFeature(String(remove.id));
			}
		}
		state.pointFeatures.push(newPoint);
		this.addFeature(newPoint);
	},

	onKeyUp(state, e) {
		console.log('KEYUP!');
		if (e.key === KEY.Escape) {
			return this.changeMode('simple_select');
		}
	},

	toDisplayFeatures(state, geojson, display) {
		display(geojson);
	},
};
