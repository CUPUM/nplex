import {
	CURSOR,
	DRAW_ACTIVE_STATES,
	DRAW_EVENTS,
	DRAW_MODES,
	GEOJSON_GEOMETRY_TYPE,
	GEOJSON_TYPES,
} from '$utils/enums';
import type MapboxDraw from '@mapbox/mapbox-gl-draw';
import { bearing, circle, distance, type Position } from '@turf/turf';
import { type DisplayGeoJSON } from './common';

export const DRAW_CIRCLE_FLAG = 'isCircle';
export const DRAW_CIRCLE_PROPERTIES = {
	Center: 'center',
	Radius: 'radius',
	MaxRadius: 'maxRadius',
	ShowRadius: 'showRadius',
	Steps: 'steps',
	HandleBearing: 'handleBearing',
} as const;
const DEFAULT_GROUP = 'circles';
const DEFAULT_RADIUS = 1000;
const DEFAULT_STEPS = 32;
const DEFAULT_HANDLE_BEARING = 45;
const DEFAULT_SHOW_RADIUS = true;
const UNITS = 'meters';
const META = {
	Circle: 'circle',
};
// const VERTEX_POSITION = {
// 	Center: 0,
// 	Handle: 1,
// };

type DrawCircleState = {
	maxRadius?: number;
	defaultRadius: number;
	maxCount?: number;
	group: string | number;
	steps: number;
	// radiusFeature?: MapboxDraw.DrawLineString & {
	// 	properties: { isCircleRadius: true };
	// };
	feature?: MapboxDraw.DrawPolygon & {
		properties: {
			createdAt: number;
			[DRAW_CIRCLE_FLAG]: true;
			[DRAW_CIRCLE_PROPERTIES.Center]: Position;
			[DRAW_CIRCLE_PROPERTIES.Radius]: number;
			[DRAW_CIRCLE_PROPERTIES.MaxRadius]?: number;
			[DRAW_CIRCLE_PROPERTIES.ShowRadius]: boolean;
			[DRAW_CIRCLE_PROPERTIES.Steps]: number;
			[DRAW_CIRCLE_PROPERTIES.HandleBearing]: number;
		};
	};
	showRadius: boolean;
};

type DrawCircleOptions = {
	/**
	 * Maximum amount of circles that can be added to the map using this mode.
	 */
	maxCount: DrawCircleState['maxCount'];
	/**
	 * Maximum circle radius in meters.
	 */
	maxRadius?: DrawCircleState['maxRadius'];
	/**
	 * Default circle radius in meters.
	 */
	defaultRadius?: DrawCircleState['defaultRadius'];
	/**
	 * The group to which applies the maxCount constraint.
	 */
	group?: DrawCircleState['group'];
	/**
	 * Steps of the rasterized circle.
	 */
	steps?: DrawCircleState['steps'];
	/**
	 * Show the circle's radius line?
	 */
	showRadius?: DrawCircleState['showRadius'];
};

type DrawCircleMode = MapboxDraw.DrawCustomMode<DrawCircleState, DrawCircleOptions>;

type DrawCircleThis = MapboxDraw.DrawCustomModeThis & DrawCircleMode;

/**
 * Exposed method to create a circle draw feature.
 */
export function createCircle(
	center: Position,
	radius: number,
	opts?: {
		maxRadius?: DrawCircleOptions['maxRadius'];
		steps?: DrawCircleOptions['steps'];
		showRadius?: DrawCircleOptions['showRadius'];
		handleBearing?: number;
	}
) {
	const steps = opts?.steps ?? DEFAULT_STEPS;
	const showRadius = opts?.showRadius ?? DEFAULT_SHOW_RADIUS;
	const handleBearing = opts?.handleBearing ?? DEFAULT_HANDLE_BEARING;
	const circleGeojson = {
		type: GEOJSON_TYPES.Feature,
		properties: {
			createdAt: Date.now(),
			[DRAW_CIRCLE_FLAG]: true,
			center,
			radius,
			maxRadius: opts?.maxRadius,
			showRadius,
			steps,
			handleBearing,
		} satisfies NonNullable<DrawCircleState['feature']>['properties'],
		geometry: {
			type: GEOJSON_GEOMETRY_TYPE.Polygon,
			coordinates: circle(center, radius, { steps, units: UNITS }).geometry.coordinates,
		},
	};
	return circleGeojson;
}

/**
 * Create the circle feature and add it to draw context.
 */
function addCircle(ctx: DrawCircleThis, state: DrawCircleState, center: Position, radius?: number) {
	// Clear previously appended circles if they exceed max count within group.
	// to do...

	// Create new circle polygon feature
	const circleGeojson = createCircle(center, radius ?? DEFAULT_RADIUS, {
		maxRadius: state.maxRadius,
		showRadius: state.showRadius,
		steps: state.steps,
		handleBearing: DEFAULT_HANDLE_BEARING,
	});
	const circleFeature = ctx.newFeature(circleGeojson);
	ctx.addFeature(circleFeature);
	state.feature = circleFeature as any;
}

/**
 * Standardizing how the circle and its vertices/radius features are displayed.
 */
export function displayCircle(
	geojson: DisplayGeoJSON,
	display: (geojson: GeoJSON.GeoJSON) => void
) {
	type Properties = NonNullable<DrawCircleState['feature']>['properties'];
	const center = geojson.properties![
		`user_${DRAW_CIRCLE_PROPERTIES.Center}`
	] as Properties['center'];
	const radius = geojson.properties![
		`user_${DRAW_CIRCLE_PROPERTIES.Radius}`
	] as Properties['radius'];
	const showRadius = geojson.properties![
		`user_${DRAW_CIRCLE_PROPERTIES.ShowRadius}`
	] as Properties['showRadius'];
	const handleBearing = geojson.properties![
		`user_${DRAW_CIRCLE_PROPERTIES.HandleBearing}`
	] as Properties['handleBearing'];

	// // Display center vertex
	// const centerVertex = createVertex(
	// 	geojson.properties!.id,
	// 	center,
	// 	,
	// 	false
	// );
	// display(centerVertex);
	// // Display handle vertex
	// const handleVertex = createVertex(
	// 	state.radiusFeature.id,
	// 	handle,
	// 	`${VERTEX_POSITION.Handle}`,
	// 	true
	// );
	display(handleVertex);
	// Display radius line
	display(geojson);
}

/**
 * Custom mapbox draw mode allowing users to draw circles by click-dragging.
 */
export const DrawCircleMode: MapboxDraw.DrawCustomMode<DrawCircleState, DrawCircleOptions> = {
	onSetup(options) {
		this.clearSelectedFeatures();
		this.map.doubleClickZoom.disable();
		this.map.dragPan.disable();
		this.updateUIClasses({ mouse: CURSOR.Crosshair });
		this.setActionableState({ trash: true, combineFeatures: false, uncombineFeatures: false });
		return {
			maxRadius: options.maxRadius,
			defaultRadius: options.defaultRadius ?? DEFAULT_RADIUS,
			maxCount: options.maxCount,
			group: options.group ?? DEFAULT_GROUP,
			steps: options.steps ?? DEFAULT_STEPS,
			showRadius: options.showRadius ?? DEFAULT_SHOW_RADIUS,
		};
	},

	onMouseDown(state, e) {
		// console.log('mousedown');
		this.clearSelectedFeatures();
		const center = e.lngLat.toArray();
		addCircle(this, state, center, Number.EPSILON);
	},

	onTouchStart(state, e) {
		// console.log('touch start');
		this.onMouseDown!(state, e as any);
	},

	onDrag(state, e) {
		// console.log('drag');
		if (!state.feature) {
			return;
		}
		const center = state.feature.properties.center;
		const handle = e.lngLat.toArray();
		state.feature.properties.handleBearing = bearing(center, handle);
		state.feature.properties.radius = distance(center, handle, { units: UNITS });
		if (
			state.feature.properties.maxRadius &&
			state.feature.properties.radius > state.feature.properties.maxRadius
		) {
			state.feature.properties.radius = state.feature.properties.maxRadius;
		}
		// Update circle polygon.
		const circleCoords = circle(center, state.feature.properties.radius, {
			units: UNITS,
			steps: state.feature.properties.steps,
		}).geometry.coordinates;
		state.feature.incomingCoords(circleCoords);
	},

	onTouchMove(state, e) {
		this.onDrag!(state, e as any);
	},

	onMouseUp(state, e) {
		// console.log('mouseup');
		this.changeMode(DRAW_MODES.SimpleSelect);
		this.map.fire(DRAW_EVENTS.ModeChange, { features: this.getSelected() });
	},

	onTouchEnd(state, e) {
		this.onMouseUp!(state, e as any);
	},

	onClick(state, e) {
		// console.log('click');
		const center = e.lngLat.toArray();
		addCircle(this, state, center);
	},

	onTap(state, e) {
		this.onClick!(state, e as any);
	},

	toDisplayFeatures(state, geojson: DisplayGeoJSON, display) {
		if (!state.feature) {
			return display(geojson);
		}
		const isActive = geojson.properties?.id === state.feature?.id;
		geojson.properties!.active = isActive ? DRAW_ACTIVE_STATES.Active : DRAW_ACTIVE_STATES.Inactive;
		if (!isActive) {
			return display(geojson);
		}
		displayCircle(geojson, display);
	},
};

export function createSupplementaryPointsForCircle(geojson: DisplayGeoJSON) {}
