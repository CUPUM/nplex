import {
	GEOJSON_GEOMETRY_TYPE,
	GEOJSON_TYPES,
	MAP_DRAW_ACTIVE_STATES,
	MAP_DRAW_META_PROPERTY,
} from '$utils/enums';
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
			meta: MAP_DRAW_META_PROPERTY.Vertex,
			parent: parentId,
			coord_path: path,
			active: selected ? MAP_DRAW_ACTIVE_STATES.Active : MAP_DRAW_ACTIVE_STATES.Inactive,
		},
		geometry: {
			type: GEOJSON_GEOMETRY_TYPE.Point,
			coordinates,
		},
	};
}
