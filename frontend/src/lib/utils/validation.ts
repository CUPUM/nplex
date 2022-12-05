import {
	createCircle,
	getCircleCenter,
	getCircleRadius,
	isCircle,
} from 'mapbox-gl-draw-geodesic/dist/mapbox-gl-draw-geodesic';
import { z } from 'zod';
import { isObject } from './object';

/**
 * Regroup here various methods, schema, and runtime-accessible data shapes relevant to VALIDATE
 * and/or FORMAT/TRANSFORM user inputs.
 *
 * The favored library to base validation off of is Zod: https://zod.dev/
 *
 * Since the data is validated bidirectionally, i.e --> DB and DB --> CLIENT, schemas should be
 * prefixed with 'db' when they target data ORIGINATING from the db, aka data returned by a db
 * query.
 */

/**
 * Since we are often checking against types generated from the PG DB's schemas, we need a helper to
 * guard the creation of runtime zod schemas.
 *
 * Read: https://github.com/colinhacks/zod/issues/372#issuecomment-826380330.
 */
export const schemaForType =
	<T>() =>
	<S extends z.ZodType<T, any, any>>(arg: S) => {
		return arg;
	};

/**
 * Utility to validate a given point's coords in [lng, lat]
 */
export const pointCoordsSchema = z.tuple([z.number(), z.number()]);

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
 * POSTGIS-specific geometry validation and formatting.
 * (https://postgis.net/workshops/postgis-intro/geometries.html)
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

/**
 * User-input project location schema.
 *
 * Z.ZodType< Pick<Database['public']['Tables']['projects']['Row'], 'location_geometry' |
 * 'location_radius'>>
 */
export const projectLocationSchema = z
	.object({
		properties: z
			.object({
				circleRadius: z.number(),
			})
			.passthrough(),
		geometry: z
			.object({
				coordinates: z.array(z.array(pointCoordsSchema)),
				type: z.literal('Polygon'),
			})
			.passthrough(),
	})
	.transform((d) => {
		if (isCircle(d)) {
			const c = getCircleCenter(d);
			const r = getCircleRadius(d) * 1000;
			return {
				location_geometry: `POINT(${c[1]} ${c[0]})`,
				location_radius: r,
			};
		}
		return { location_geometry: null, location_radius: null };
	});

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
