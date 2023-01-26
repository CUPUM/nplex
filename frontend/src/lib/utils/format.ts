import type { Arrify, PgRange } from '$types/utils';
import type { ValueOf } from 'ts-essentials';
import { z } from 'zod';
import { browserDb } from './database';
import { BRACKETS, type STORAGE_BUCKETS } from './enums';

//
// International format helpers (currencies, dates, etc.).
//

/**
 * CAD currency formatter.
 */
export const cadformatter = new Intl.NumberFormat('fr-CA', {
	style: 'currency',
	currency: 'CAD',
	currencyDisplay: 'narrowSymbol',
	maximumFractionDigits: 0,
});

//
// Postgres, PostGIS, and PostgREST format helpers.
// For more information, refer to https://postgrest.org/en/stable/how-tos/working-with-postgresql-data-types.html
//

/**
 * Format a given GeoJSON geometry to a PostGIS-compatible geometry.
 *
 * - ('Point', 'POINT(0 0)')
 * - ('Linestring', 'LINESTRING(0 0, 1 1, 2 1, 2 2)')
 * - ('Polygon', 'POLYGON((0 0, 1 0, 1 1, 0 1, 0 0))')
 * - ('PolygonWithHole', 'POLYGON((0 0, 10 0, 10 10, 0 10, 0 0),(1 1, 1 2, 2 2, 2 1, 1 1))')
 * - ('Collection', 'GEOMETRYCOLLECTION(POINT(2 0),POLYGON((0 0, 1 0, 1 1, 0 1, 0 0)))')
 */
export function toPgGeom(geometry: GeoJSON.Geometry) {
	console.log(geometry);
	const feature = z.object({});
}

// /**
//  * POSTGIS-specific geometry validation and formatting.
//  * (https://postgis.net/workshops/postgis-intro/geometries.html)
//  *
//  * Native shapes expected by POSTGIS and returned by this validator are:
//  *

//  */
// export const postgisGeometrySchema = geometrySchema.transform((geom) => {
// 	switch (geom.type) {
// 		case 'point':
// 			return `POINT(${geom.coordinates[1]} ${geom.coordinates[0]})`;
// 		case 'linestring':
// 			return ``;
// 		case 'polygon':
// 			return ``;
// 	}
// });

/**
 * Parses a PostGIS Geometry stringified response from PostGREST into a GeoJSON Feature object.
 */
export function fromPgGeom(
	geometry: string,
	/**
	 * Properties to optionally insert into the Feature's definition.
	 */
	properties?: Record<string, any>
) {
	return '';
}

/**
 * Translate a javascript array to a postgres compliant array string.
 */
export function toPgArr<T extends readonly unknown[] | unknown[]>(
	/**
	 * Source array.
	 */
	array: T,
	opts?: {
		/**
		 * Determines if the array should be formatted as a text representation (`{"a","b","c",...}`
		 * instead of regular array (`(a,b,c)`)
		 */
		text?: boolean;
		brackets?: keyof typeof BRACKETS;
	}
) {
	// if (opts?.text) {
	// 	return `{${array.map((item) => '"' + item + '"').join(',')}}`;
	// }
	const bracketPair = BRACKETS[opts?.brackets ?? (opts?.text ? 'curly' : 'parenthesis')];
	const arrString = opts?.text ? array.map((item) => `"${item}"`).join(',') : array.join(',');
	return `${bracketPair.start}${arrString}${bracketPair.end}` as const;
}

/**
 * Counter-part to pgarr, useful to parse array strings from postgrest responses into actual js
 * arrays.
 */
export function fromPgArr(pgArr: string): string[] {
	return pgArr.slice(1, -1).split(',');
}

/**
 * Synctatic sugar wrapper for toArr expecting a two-member number tuple or null.
 */
export function toPgRange<T extends [number, number] | null>(range: T) {
	if (!range) {
		return null;
	}
	return toPgArr(range, { brackets: 'square' }) as PgRange;
}

/**
 * Parse a range stringified value from PostgREST and return a two-number tuple.
 */
export function fromPgRange<T extends 'empty' | null | undefined | string>(
	pgRange: T,
	fallback: [number, number] = [0, 0]
): [number, number] {
	if (!pgRange || pgRange === 'empty') {
		return fallback;
	}
	const arr = fromPgArr(pgRange)
		.map((n) => Number(n))
		.slice(0, 2);
	if (arr.length < 2) {
		console.error('Extracted array does not have 2 members, expected for ranges.');
	}
	return [arr[0] ?? fallback[0], arr[1] ?? fallback[1]];
}

/**
 * Make a value always an array, i.e. wrap non-array inputs in an array.
 */
export function alwaysArr<T>(arr: T) {
	type AlwaysArr = NonNullable<T>;
	if (arr == null) return <Arrify<AlwaysArr>>[];
	return Array.isArray(arr) ? <Arrify<AlwaysArr>>arr : <Arrify<AlwaysArr>>[arr];
}

/**
 * Takes a Postgres cube string and returns a CSS-ready hsl color string.
 */
export function pgCubeToHsl(pgCube: string): `hsl(${number},${number}%,${number}%)` | '' {
	try {
		const comps = fromPgArr(pgCube).map((n) => Number(n));
		if (comps.length !== 3) {
			throw new Error(`Extracted array has ${comps.length} members instead 3.`);
		}
		return `hsl(${comps[0]},${comps[1]}%,${comps[2]}%)`;
	} catch (error) {
		console.error(error);
		return '';
	}
}

/**
 * Takes desired page range, page size, and returns tuple of start and end to be used with range
 * selector of db client.
 *
 * @param page Zero-based desired page, i.e. pagination start at index 0.
 */
export function pagination(page: number, size: number): [start: number, end: number] {
	const start = page * size;
	const end = start + size;
	return [start, end];
}

/**
 * Reduce inline verbosity of getting storage assets' public URL.
 */
export function publicurl(bucket: ValueOf<typeof STORAGE_BUCKETS>, name?: string | null) {
	if (!name) {
		return '';
	}
	return browserDb.storage.from(bucket).getPublicUrl(name).data.publicUrl;
}

/**
 * Helper to format a project gallery's colors as a flat array.
 */
export function projectcolors(gallery?: ProjectGalleryItem | ProjectGalleryItem[] | null) {
	if (!gallery) {
		return '';
	}
	if (!Array.isArray(gallery)) {
		gallery = [gallery];
	}
	return gallery.reduce((acc, curr) => {
		if (curr.color_dominant_hsl) {
			acc.push('hsl' + curr.color_dominant_hsl);
		}
		if (curr.color_mean_hsl) {
			acc.push('hsl' + curr.color_mean_hsl);
		}
		return acc;
	}, [] as string[]);
}
type ProjectGalleryItem = Partial<App.Database['public']['Tables']['projects_images']['Row']>;
