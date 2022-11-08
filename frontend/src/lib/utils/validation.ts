/**
 * Regroup here various methods, schema, and runtime-accessible data shapes relevant to VALIDATE and/or FORMAT/TRANSFORM
 * user inputs.
 *
 * The favored library to base validation off of is Zod: https://zod.dev/
 */

import { z } from 'zod';
import { isObject } from './object';

/**
 * Utility to validate a given point's coords in [lng, lat]
 */
export const pointCoordsSchema = z.tuple([z.number(), z.number()]);

export const lnglatToLatlng = pointCoordsSchema.transform(([lng, lat]) => [lat, lng]);

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
			coordinates: pointCoordsSchema,
		}),
		z.object({
			type: z.literal('linestring'),
			coordinates: z.array(pointCoordsSchema),
		}),
		z.object({
			type: z.literal('polygon'),
			coordinates: z.array(z.array(pointCoordsSchema)),
		}),
		z.object({
			type: z.literal('multipoint'),
			coordinates: z.array(pointCoordsSchema),
		}),
		z.object({
			type: z.literal('multilinestring'),
			coordinates: z.array(z.array(pointCoordsSchema)),
		}),
		z.object({
			type: z.literal('multipolygon'),
			coordinates: z.array(z.array(pointCoordsSchema)),
		}),
	])
);

/**
 * POSTGIS-specific geometry validation and formatting. (https://postgis.net/workshops/postgis-intro/geometries.html)
 *
 * Native shapes expected by POSTGIS and returned by this validator are:
 *
 * - ('Point', 'POINT(0 0)')
 * - ('Linestring', 'LINESTRING(0 0, 1 1, 2 1, 2 2)')
 * - ('Polygon', 'POLYGON((0 0, 1 0, 1 1, 0 1, 0 0))')
 * - ('PolygonWithHole', 'POLYGON((0 0, 10 0, 10 10, 0 10, 0 0),(1 1, 1 2, 2 2, 2 1, 1 1))')
 * - ('Collection', 'GEOMETRYCOLLECTION(POINT(2 0),POLYGON((0 0, 1 0, 1 1, 0 1, 0 0)))')
 */
export const postgisGeometrySchema = geometrySchema.transform((geom) => {
	switch (geom.type) {
		case 'point':
			return `POINT(${geom.coordinates[1]} ${geom.coordinates[0]})`;
		case 'linestring':
			return ``;
		case 'polygon':
			return ``;
	}
});
