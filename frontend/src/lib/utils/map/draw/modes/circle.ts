import {
	CURSOR,
	DRAW_ACTIVE_STATES,
	DRAW_EVENTS,
	DRAW_META_PROPERTY,
	DRAW_MODES,
	DRAW_SOURCES,
	GEOJSON_GEOMETRY_TYPE,
	GEOJSON_TYPES,
	KEY,
} from '$utils/enums';
import type { DrawCustomMode, DrawCustomModeThis } from '@mapbox/mapbox-gl-draw';
import { bearing, circle, destination, distance, type Position, type Units } from '@turf/turf';
import type { AnyRecord } from 'dns';
import { createVertex } from './common';

declare global {
	namespace MapboxDraw {
		export interface DrawCustomModeThis {
			_ctx: {
				options: MapboxDraw.MapboxDrawOptions;
				store: {
					isDirty: boolean;
					sources: {
						[DRAW_SOURCES.Hot]: GeoJSON.Feature[];
						[DRAW_SOURCES.Cold]: GeoJSON.Feature[];
					};
					_changedFeatureIds: {
						_items: AnyRecord;
						_length: number;
						_nums: AnyRecord;
					};
					_featureIds: {
						_items: AnyRecord;
						_length: number;
						_nums: AnyRecord;
					};
				};
				selectedPaths: [];
			};
		}
	}
}

const CIRCLE_PROPERTIES = {
	FLAG: 'isCircle',
	CENTER: 'circleCenter',
	RADIUS: 'circleRadius',
	HANDLE_BEARING: 'circleHandleBearing',
} as const;
const CIRCLE_GEOMETRY_TYPE = GEOJSON_GEOMETRY_TYPE.Polygon;

const DEFAULT_BEARING = 45;
const DEFAULT_RADIUS = 1_000;
const DEFAULT_STEPS = 32;
const DEFAULT_UNITS: Units = 'meters';

interface CircleFeature {
	type: typeof GEOJSON_TYPES.Feature;
	properties: {
		[name: string]: any;
		[CIRCLE_PROPERTIES.FLAG]: true;
		[CIRCLE_PROPERTIES.RADIUS]: number;
		[CIRCLE_PROPERTIES.CENTER]: Position;
		[CIRCLE_PROPERTIES.HANDLE_BEARING]: number;
	};
	geometry: {
		type: typeof GEOJSON_GEOMETRY_TYPE.Polygon;
		coordinates: [[Position, Position, Position, Position]];
	};
}

interface DrawCircleState {}

interface DrawCircleOptions {
	steps?: number;
	maxRadius?: number;
}

export function createDrawCircle(
	/**
	 * LngLat coordinates.
	 */
	center: Position,
	/**
	 * Radus in meters.
	 */
	radius: number,
	/**
	 * Additional feature properties.
	 */
	properties?: { [name: string]: any }
) {
	if (radius <= 0) {
		console.error('Radius cannot be 0.');
		radius = Number.EPSILON;
	}
	return {
		type: GEOJSON_TYPES.Feature,
		properties: {
			...properties,
			[CIRCLE_PROPERTIES.FLAG]: true,
			[CIRCLE_PROPERTIES.RADIUS]: radius,
			[CIRCLE_PROPERTIES.CENTER]: center,
			[CIRCLE_PROPERTIES.HANDLE_BEARING]: DEFAULT_BEARING,
		},
		geometry: {
			type: GEOJSON_GEOMETRY_TYPE.Polygon,
			coordinates: [[center, center, center, center]], // valid polygon needs 3 vertices... > why!?
		},
	} satisfies CircleFeature;
}

export function isCircle(
	geojson: GeoJSON.GeoJSON,
	display: boolean = false
): geojson is CircleFeature {
	return (
		'geometry' in geojson &&
		geojson.properties?.[display ? 'user_' : '' + CIRCLE_PROPERTIES.FLAG] &&
		geojson.properties?.[display ? 'user_' : '' + CIRCLE_PROPERTIES.RADIUS] > 0 &&
		geojson.properties?.[display ? 'user_' : '' + CIRCLE_PROPERTIES.CENTER]
	);
	// throw new AssertionError('Geojson is not a circle');
}

export function isCircleGeometry(
	geometry: GeoJSON.Geometry
): geometry is CircleFeature['geometry'] & { properties: CircleFeature['properties'] } {
	return (
		geometry.type === CIRCLE_GEOMETRY_TYPE &&
		'properties' in geometry &&
		(geometry.properties as any)[CIRCLE_PROPERTIES.FLAG] &&
		(geometry.properties as any)[CIRCLE_PROPERTIES.RADIUS] > 0 &&
		(geometry.properties as any)[CIRCLE_PROPERTIES.CENTER]
	);
}

export function getCircleCenter(geojson: GeoJSON.GeoJSON) {
	if (!isCircle(geojson)) {
		throw new Error('Given geojson is not a circle.');
	}
	// return geojson.properties[CIRCLE_PROPERTIES.CENTER];
	return geojson.geometry.coordinates[0][0];
}

export function setCircleCenter(geojson: GeoJSON.GeoJSON, center: Position) {
	if (!isCircle(geojson)) {
		throw new Error('GeoJSON is not a circle');
	}
	geojson.geometry.coordinates = [[center, center, center, center]];
}

export function getCircleRadius(geojson: GeoJSON.GeoJSON) {
	if (!isCircle(geojson)) {
		throw new Error('GeoJSON is not a circle');
	}
	return geojson.properties[CIRCLE_PROPERTIES.RADIUS];
}

export function setCircleRadius(geojson: GeoJSON.GeoJSON, radius: number) {
	if (!isCircle(geojson)) {
		throw new Error('GeoJSON is not a circle');
	}
	if (radius <= 0) {
		console.error('Radius must be greater than 0.');
		radius = Number.EPSILON;
	}
	geojson.properties[CIRCLE_PROPERTIES.RADIUS] = radius;
}

/**
 * Prepare the display features of a drawn circle to omit polygon circumference points and add
 * handles.
 */
export function toDisplayCircleFeatures(geojson: GeoJSON.GeoJSON, ctx: DrawCustomModeThis['_ctx']) {
	const properties = geojson.properties;
	const type = geojson.geometry.type;
	const coordinates = 'coordinates' in geojson.geometry ? geojson.geometry.coordinates : null;
	const featureId = properties.parent || properties.id;
	const feature = ctx.store.get(featureId);
	if (type === GEOJSON_GEOMETRY_TYPE.Point) {
		if (isCircle(feature)) {
			// Hide circle points.
			return [];
		} else if (properties.meta === DRAW_META_PROPERTY.Midpoint) {
			console.log('Need to process midpoint.');
			//   return processMidpoint(); // calculate geodesic midpoint
		} else {
			// Pass point as is
			return [geojson];
		}
	} else if (type === GEOJSON_GEOMETRY_TYPE.Polygon) {
		if (isCircle(feature)) {
			return processCircle();
		} else {
			console.log('Need to process polygon.');
			// return processPolygon(); // calculate geodesic polygon
		}
	} else if (type.indexOf('Multi') === 0) {
		console.log('Need to process multi-geometry.');
		// return processMultiGeometry();
	}
	function isSelectedPath(path: string) {
		if (!ctx.selectedPaths) {
			return false;
		}
		return ctx.selectedPaths.indexOf(path) !== -1;
	}
	function processCircle() {
		const featureGeojson = feature.toGeoJSON();
		const center = getCircleCenter(featureGeojson);
		const radius = getCircleRadius(featureGeojson);
		const handleBearing = feature[CIRCLE_PROPERTIES.HANDLE_BEARING] ?? DEFAULT_BEARING;
		const baseCircle = circle(center, radius, {
			steps: DEFAULT_STEPS,
			units: DEFAULT_UNITS,
		});
		// transformRotate(baseCircle, handleBearing, { pivot: center, mutate: true });
		geojson.geometry.coordinates = baseCircle.geometry.coordinates;
		// Handles / visible vertices.
		if (properties.active === DRAW_ACTIVE_STATES.Active) {
			const handle = destination(center, radius, handleBearing, { units: DEFAULT_UNITS }).geometry
				.coordinates;
			const vertices = [handle, center].map((point, i) => {
				return createVertex(properties.id, point, `0.${i}`, isSelectedPath(`0.${i}`));
			});
			// Draw a radius line?
			// To do...
			return [geojson, ...vertices];
		} else {
			return [geojson];
		}
	}
	return [geojson];
}

/**
 * Custom mapbox draw mode allowing users to draw circles by click-dragging. Derived from
 * mapbox-gl-draw-geodesic to include adequate typings and omit geodesy.
 */
export const DrawCircleMode: DrawCustomMode = {
	onSetup(options) {
		this.clearSelectedFeatures();
		this.map.doubleClickZoom.disable();
		this.map.dragPan.disable();
		this.updateUIClasses({ mouse: CURSOR.Crosshair });
		this.setActionableState({
			combineFeatures: false,
			uncombineFeatures: false,
			trash: false,
		});
		return {};
	},

	onMouseDown(state, e) {
		const center = e.lngLat.toArray();
		const circle = this.newFeature(createDrawCircle(center, Number.EPSILON));
		this.addFeature(circle);
		state.circle = circle;
	},

	onTouchStart(state, e) {
		this.onMouseDown!(state, e as any);
	},

	onDrag(state, e) {
		if (state.circle) {
			const geojson = state.circle.toGeoJSON();
			const center = getCircleCenter(geojson);
			const handle = [e.lngLat.lng, e.lngLat.lat];
			const radius = distance(center, handle, { units: DEFAULT_UNITS });
			const handleBearing = bearing(center, handle);
			state.circle.properties[CIRCLE_PROPERTIES.RADIUS] = radius;
			state.circle[CIRCLE_PROPERTIES.HANDLE_BEARING] = handleBearing;
			state.circle.changed();
		}
	},

	onTouchMove(state, e) {
		this.onDrag!(state, e as any);
	},

	onMouseUp(state, e) {
		this.map.fire(DRAW_EVENTS.Create, { features: [state.circle.toGeoJSON()] });
		return this.changeMode(DRAW_MODES.SimpleSelect, { featureIds: [state.circle.id] });
	},

	onTouchEnd(state, e) {
		this.onMouseUp!(state, e as any);
	},

	onKeyUp(state, e) {
		if (e.key === KEY.Escape) {
			// if (state.circle) {
			// 	const ids = this.getSelected().forEach(f => {
			// 		this.deleteFeature(f.id, { silent: true });
			// 	});
			// }
			this.changeMode(DRAW_MODES.SimpleSelect);
		} else if (e.key === KEY.Enter) {
			this.changeMode(DRAW_MODES.SimpleSelect, { featureIds: [state.circle.id] });
		}
	},

	onStop(state) {
		this.updateUIClasses({ mouse: null });
		this.map.doubleClickZoom.enable();
		this.map.dragPan.enable();
		this.activateUIButton();
	},

	onClick(state, e) {
		const center = e.lngLat.toArray();
		const circle = this.newFeature(createDrawCircle(center, DEFAULT_RADIUS));
		this.addFeature(circle);
	},

	onTap(state, e) {
		this.onClick!(state, e as any);
	},

	toDisplayFeatures(state, geojson, display) {
		if ('properties' in geojson && geojson.properties) {
			if (state.circle) {
				const isActivePolygon = geojson.properties.id === state.circle.id;
				geojson.properties.active = isActivePolygon
					? DRAW_ACTIVE_STATES.Active
					: DRAW_ACTIVE_STATES.Inactive;
			}
			toDisplayCircleFeatures(geojson, this._ctx).forEach(display);
		}
	},
};
