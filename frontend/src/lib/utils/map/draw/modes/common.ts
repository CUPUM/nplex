import {
	DRAW_ACTIVE_STATES,
	DRAW_META_PROPERTY,
	GEOJSON_GEOMETRY_TYPE,
	GEOJSON_TYPES,
} from '$utils/enums';
import type MapboxDraw from '@mapbox/mapbox-gl-draw';
import type { Position } from '@turf/turf';

export type DisplayGeoJSON = GeoJSON.Feature<
	Exclude<GeoJSON.Geometry, GeoJSON.GeometryCollection>,
	NonNullable<GeoJSON.GeoJsonProperties>
>;

// Common helpers and essential things from mapbox draw source that are sadly not exposed in the package.

export const LAT_MIN = -90;
export const LAT_RENDERED_MIN = -85;
export const LAT_MAX = 90;
export const LAT_RENDERED_MAX = 85;
export const LNG_MIN = -270;
export const LNG_MAX = 270;

/**
 * https://github.com/mapbox/mapbox-gl-draw/blob/main/src/lib/create_vertex.js.
 */
export function createVertex(
	/**
	 * Parent feature's id.
	 */
	parentId: string | number,
	/**
	 * LngLat coords of vertex.
	 */
	coordinates: Position,
	/**
	 * Dot-separated numbers indicating exactly where the point exists within its parent feature's
	 * coordinates.
	 */
	path: string,
	/**
	 * Is the vertex currently selected?
	 */
	selected: boolean
) {
	return {
		type: GEOJSON_TYPES.Feature,
		properties: {
			meta: DRAW_META_PROPERTY.Vertex,
			parent: parentId,
			coord_path: path,
			active: selected ? DRAW_ACTIVE_STATES.Active : DRAW_ACTIVE_STATES.Inactive,
		},
		geometry: {
			type: GEOJSON_GEOMETRY_TYPE.Point,
			coordinates,
		},
	};
}

/**
 * https://github.com/mapbox/mapbox-gl-draw/blob/main/src/lib/move_features.js.
 */
export function moveFeatures(features: MapboxDraw.DrawFeature[], delta) {
	const constrainedDelta = constrainFeatureMovement(
		features.map((feature) => feature.toGeoJSON()),
		delta
	);

	features.forEach((feature) => {
		const currentCoordinates = feature.getCoordinates();

		const moveCoordinate = (coord) => {
			const point = {
				lng: coord[0] + constrainedDelta.lng,
				lat: coord[1] + constrainedDelta.lat,
			};
			return [point.lng, point.lat];
		};
		const moveRing = (ring) => ring.map((coord) => moveCoordinate(coord));
		const moveMultiPolygon = (multi) => multi.map((ring) => moveRing(ring));

		let nextCoordinates;
		if (feature.type === GEOJSON_GEOMETRY_TYPE.Point) {
			nextCoordinates = moveCoordinate(currentCoordinates);
		} else if (
			feature.type === GEOJSON_GEOMETRY_TYPE.LineString ||
			feature.type === GEOJSON_GEOMETRY_TYPE.MultiPoint
		) {
			nextCoordinates = currentCoordinates.map(moveCoordinate);
		} else if (
			feature.type === GEOJSON_GEOMETRY_TYPE.Polygon ||
			feature.type === GEOJSON_GEOMETRY_TYPE.MultiLineString
		) {
			nextCoordinates = currentCoordinates.map(moveRing);
		} else if (feature.type === GEOJSON_GEOMETRY_TYPE.MultiPolygon) {
			nextCoordinates = currentCoordinates.map(moveMultiPolygon);
		}

		feature.incomingCoords(nextCoordinates);
	});
}

/**
 * Ensure that we do not drag north-south far enough for.
 *
 * - Any part of any feature to exceed the poles.
 * - Any feature to be completely lost in the space between the projection's edge and the poles, such
 *   that it couldn't be re-selected and moved back.
 */
export function constrainFeatureMovement(geojsonFeatures, delta) {
	// "inner edge" = a feature's latitude closest to the equator
	let northInnerEdge = LAT_MIN;
	let southInnerEdge = LAT_MAX;
	// "outer edge" = a feature's latitude furthest from the equator
	let northOuterEdge = LAT_MIN;
	let southOuterEdge = LAT_MAX;

	let westEdge = LNG_MAX;
	let eastEdge = LNG_MIN;

	geojsonFeatures.forEach((feature) => {
		const bounds = extent(feature);
		const featureSouthEdge = bounds[1];
		const featureNorthEdge = bounds[3];
		const featureWestEdge = bounds[0];
		const featureEastEdge = bounds[2];
		if (featureSouthEdge > northInnerEdge) northInnerEdge = featureSouthEdge;
		if (featureNorthEdge < southInnerEdge) southInnerEdge = featureNorthEdge;
		if (featureNorthEdge > northOuterEdge) northOuterEdge = featureNorthEdge;
		if (featureSouthEdge < southOuterEdge) southOuterEdge = featureSouthEdge;
		if (featureWestEdge < westEdge) westEdge = featureWestEdge;
		if (featureEastEdge > eastEdge) eastEdge = featureEastEdge;
	});

	// These changes are not mutually exclusive: we might hit the inner
	// edge but also have hit the outer edge and therefore need
	// another readjustment
	const constrainedDelta = delta;
	if (northInnerEdge + constrainedDelta.lat > LAT_RENDERED_MAX) {
		constrainedDelta.lat = LAT_RENDERED_MAX - northInnerEdge;
	}
	if (northOuterEdge + constrainedDelta.lat > LAT_MAX) {
		constrainedDelta.lat = LAT_MAX - northOuterEdge;
	}
	if (southInnerEdge + constrainedDelta.lat < LAT_RENDERED_MIN) {
		constrainedDelta.lat = LAT_RENDERED_MIN - southInnerEdge;
	}
	if (southOuterEdge + constrainedDelta.lat < LAT_MIN) {
		constrainedDelta.lat = LAT_MIN - southOuterEdge;
	}
	if (westEdge + constrainedDelta.lng <= LNG_MIN) {
		constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
	}
	if (eastEdge + constrainedDelta.lng >= LNG_MAX) {
		constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
	}

	return constrainedDelta;
}

/**
 * https://github.com/mapbox/mapbox-gl-draw/blob/main/src/lib/create_midpoint.js.
 */
export function createMidpoint(parent, startVertex, endVertex) {
	const startCoord = startVertex.geometry.coordinates;
	const endCoord = endVertex.geometry.coordinates;

	// If a coordinate exceeds the projection, we can't calculate a midpoint,
	// so run away
	if (
		startCoord[1] > LAT_RENDERED_MAX ||
		startCoord[1] < LAT_RENDERED_MIN ||
		endCoord[1] > LAT_RENDERED_MAX ||
		endCoord[1] < LAT_RENDERED_MIN
	) {
		return null;
	}

	const mid = {
		lng: (startCoord[0] + endCoord[0]) / 2,
		lat: (startCoord[1] + endCoord[1]) / 2,
	};

	return {
		type: GEOJSON_TYPES.Feature,
		properties: {
			meta: DRAW_META_PROPERTY.Midpoint,
			parent,
			lng: mid.lng,
			lat: mid.lat,
			coord_path: endVertex.properties.coord_path,
		},
		geometry: {
			type: GEOJSON_GEOMETRY_TYPE.Point,
			coordinates: [mid.lng, mid.lat],
		},
	};
}

/**
 * https://github.com/mapbox/mapbox-gl-draw/blob/main/src/lib/create_supplementary_points.js.
 */
export function createSupplementaryPoints(geojson: DisplayGeoJSON, options = {}, basePath = null) {
	const { type, coordinates } = geojson.geometry;
	const featureId = geojson.properties && geojson.properties.id;

	let supplementaryPoints = [];

	if (type === GEOJSON_GEOMETRY_TYPE.Point) {
		// For points, just create a vertex
		supplementaryPoints.push(
			createVertex(featureId, coordinates, basePath, isSelectedPath(basePath))
		);
	} else if (type === GEOJSON_GEOMETRY_TYPE.Polygon) {
		// Cycle through a Polygon's rings and
		// process each line
		coordinates.forEach((line, lineIndex) => {
			processLine(line, basePath !== null ? `${basePath}.${lineIndex}` : String(lineIndex));
		});
	} else if (type === GEOJSON_GEOMETRY_TYPE.LineString) {
		processLine(coordinates, basePath);
	} else if (type.indexOf(GEOJSON_GEOMETRY_TYPE.MultiPREFIX) === 0) {
		processMultiGeometry();
	}

	function processLine(line, lineBasePath) {
		let firstPointString = '';
		let lastVertex = null;
		line.forEach((point, pointIndex) => {
			const pointPath =
				lineBasePath !== undefined && lineBasePath !== null
					? `${lineBasePath}.${pointIndex}`
					: String(pointIndex);
			const vertex = createVertex(featureId, point, pointPath, isSelectedPath(pointPath));

			// If we're creating midpoints, check if there was a
			// vertex before this one. If so, add a midpoint
			// between that vertex and this one.
			if (options.midpoints && lastVertex) {
				const midpoint = createMidpoint(featureId, lastVertex, vertex);
				if (midpoint) {
					supplementaryPoints.push(midpoint);
				}
			}
			lastVertex = vertex;

			// A Polygon line's last point is the same as the first point. If we're on the last
			// point, we want to draw a midpoint before it but not another vertex on it
			// (since we already a vertex there, from the first point).
			const stringifiedPoint = JSON.stringify(point);
			if (firstPointString !== stringifiedPoint) {
				supplementaryPoints.push(vertex);
			}
			if (pointIndex === 0) {
				firstPointString = stringifiedPoint;
			}
		});
	}

	function isSelectedPath(path) {
		if (!options.selectedPaths) return false;
		return options.selectedPaths.indexOf(path) !== -1;
	}

	// Split a multi-geometry into constituent
	// geometries, and accumulate the supplementary points
	// for each of those constituents
	function processMultiGeometry() {
		const subType = type.replace(GEOJSON_GEOMETRY_TYPE.MultiPREFIX, '');
		coordinates.forEach((subCoordinates, index) => {
			const subFeature = {
				type: GEOJSON_GEOMETRY_TYPE.FEATURE,
				properties: geojson.properties,
				geometry: {
					type: subType,
					coordinates: subCoordinates,
				},
			};
			supplementaryPoints = supplementaryPoints.concat(
				createSupplementaryPoints(subFeature, options, index)
			);
		});
	}

	return supplementaryPoints;
}
