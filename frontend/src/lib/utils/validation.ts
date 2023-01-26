import { createCircle } from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
import { z } from 'zod';
import { isObject } from './object';

/**
 * Utility to validate a given point's coords in [lng, lat]
 */
export const pointCoordinatesSchema = z.tuple([z.number(), z.number()]);

/**
 * Generic Geojson geometry validation.
 *
 * - Point: POINT | ST_Point.
 * - LineString: LINESTRING | ST_LineString.
 * - Polygon: POLYGON | ST_Polygon.
 * - MultiPoint: MULTIPOINT | ST_MultiPoint.
 * - MultiLineString: MULTILINESTRING | ST_MultiLineString.
 * - MultiPolygon: MULTIPOLYGON | ST_MultiPolygon.
 * - GeometryCollection: GEOMETRYCOLLECTION | ST_GeometryCollection.
 * - CircularString: CIRCULARSTRING | ST_CircularString.
 * - CompoundCurve: COMPOUNDCURVE | ST_CompoundCurve.
 * - CurvePolygon: CURVEPOLYGON | ST_CurvePolygon.
 * - MultiCurve: MULTICURVE | ST_MultiCurve.
 * - MultiSurface: MULTISURFACE | ST_MultiSurface.
 * - PolyhedralSurface: POLYHEDRALSURFACE | ST_PolyhedralSurface.
 * - Triangle: TRIANGLE | ST_Triangle.
 * - Tin: TIN | ST_Tin.
 */
export const geometrySchema = z.preprocess(
	(geom) => {
		if (isObject(geom) && 'type' in geom) {
			geom.type = geom.type.toLowerCase();
		}
		return geom;
	},
	z.union([
		z.object({
			type: z.literal('point'),
			coordinates: pointCoordinatesSchema,
		}),
		z.object({
			type: z.literal('linestring'),
			coordinates: z.array(pointCoordinatesSchema),
		}),
		z.object({
			type: z.literal('polygon'),
			coordinates: z.array(z.array(pointCoordinatesSchema)),
		}),
		z.object({
			type: z.literal('multipoint'),
			coordinates: z.array(pointCoordinatesSchema),
		}),
		z.object({
			type: z.literal('multilinestring'),
			coordinates: z.array(z.array(pointCoordinatesSchema)),
		}),
		z.object({
			type: z.literal('multipolygon'),
			coordinates: z.array(z.array(pointCoordinatesSchema)),
		}),
		// ... add as necessary
	])
);

/**
 * DB-compliant schema of project locations.
 */
export const dbProjectLocationSchema = z
	.object({
		location_geometry: geometrySchema,
		location_radius: z.number(),
	})
	.transform((d) => {
		if (d.location_geometry.type === 'point') {
			const c = d.location_geometry.coordinates.reverse();
			return createCircle(c, d.location_radius / 1000);
		}
		return null;
	});
