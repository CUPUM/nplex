import { KEY } from '$utils/enums';
import type MapboxDraw from '@mapbox/mapbox-gl-draw';
import type { Position } from '@turf/turf';

declare global {
	namespace mapboxgl {
		export interface Map {
			_draw_points?: {
				features: {
					[group: string | number]: MapboxDraw.DrawPoint[];
				};
			};
		}
	}
}

const DEFAULT_GROUP = 'points';

type DrawPointsState = {
	maxCount?: number;
	group: number | string;
};

type DrawPointsOptions = {
	points?: Position[];
	maxCount?: DrawPointsState['maxCount'];
	group?: DrawPointsState['group'];
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

export const DrawPointsMode: MapboxDraw.DrawCustomMode<DrawPointsState, DrawPointsOptions> = {
	onSetup({ points = [[-73.65, 45.55]], maxCount = undefined, group = DEFAULT_GROUP }) {
		// Init _draw_points prop on map.
		if (!this.map._draw_points) {
			this.map._draw_points = {
				features: {},
			};
		}
		// Init group's features array if not already existing.
		if (!this.map._draw_points.features[group]) {
			this.map._draw_points.features[group] = [];
		}
		const prevFeatures = this.map._draw_points.features[group];
		// Adjusting previously added group's points to the current max.
		if (maxCount) {
			const prevExceeding = prevFeatures.splice(0, Math.max(0, prevFeatures.length - maxCount));
			prevExceeding.forEach((f) => {
				this.deleteFeature(String(f.id));
			});
		}
		// Append new points if not over max.
		points.every((coord, i) => {
			if (maxCount && i + prevFeatures.length >= maxCount) {
				return false;
			}
			const point = this.newFeature(createPoint(coord)) as MapboxDraw.DrawPoint;
			prevFeatures.push(point);
			this.addFeature(point);
			return true;
		});
		return {
			maxCount,
			group,
		};
	},

	onClick(state, e) {
		const newPoint = this.newFeature(createPoint(e.lngLat.toArray())) as MapboxDraw.DrawPoint;
		const group = this.map._draw_points!.features[state.group];
		if (state.maxCount && group.length && group.length >= state.maxCount) {
			const remove = group.shift();
			if (remove && remove.id != null) {
				this.deleteFeature(String(remove.id));
			}
		}
		group.push(newPoint);
		this.addFeature(newPoint);
	},

	onKeyDown(state, e) {
		if (e.key === KEY.Escape) {
			return this.changeMode('simple_select');
		}
	},

	toDisplayFeatures(state, geojson, display) {
		display(geojson);
	},
};
