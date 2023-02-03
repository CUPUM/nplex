import type { Arrify, PgRange } from '$types/utils';
import type { ValueOf } from 'ts-essentials';
import { browserDb } from './database/client';
import { BRACKETS, SRID, type STORAGE_BUCKETS } from './enums';

/**
 * CAD currency formatter.
 */
export const cadformatter = new Intl.NumberFormat('fr-CA', {
	style: 'currency',
	currency: 'CAD',
	currencyDisplay: 'narrowSymbol',
	maximumFractionDigits: 0,
});

/**
 * Postgres, PostGIS, and PostgREST format helpers. For more information, refer to
 * https://postgrest.org/en/stable/how-tos/working-with-postgresql-data-types.html.
 */

/**
 * Stringifies a GeoJSON Geometry object into well-known-text for PostGIS. Taken and adapted from:
 * https://github.com/benrei/wkt.
 */
export function toPgGeom(
	geometry: GeoJSON.Geometry,
	projection: SRID | null = SRID.WebMercator,
	thirdOrdinate: 'Z' | 'M' = 'Z'
): string {
	function point(p: GeoJSON.Position) {
		return p.join(' ');
	}
	function line(l: GeoJSON.Position[]) {
		return l.map(point).join(', ');
	}
	function lines(r: GeoJSON.Position[][]) {
		return r.map(line).map(wrap).join(', ');
	}
	function wrap(s: string) {
		return '(' + s + ')';
	}
	function ordinates(n: number) {
		switch (n) {
			case 2:
				return '';
			case 3:
				return thirdOrdinate;
			case 4:
				return thirdOrdinate + thirdOrdinate === 'Z' ? 'M' : 'Z';
			default:
				throw new Error(
					`Invalid coordinates size: given coordinate has ${n} dimensions. Max is 4.`
				);
		}
	}
	const srid = projection ? 'SRID=' + projection + ';' : '';
	let coordstr: string;
	let dimensions;
	switch (geometry.type) {
		case 'Point':
			coordstr = point(geometry.coordinates);
			dimensions = geometry.coordinates.length;
			break;
		case 'LineString':
			coordstr = line(geometry.coordinates);
			dimensions = geometry.coordinates[0].length;
			break;
		case 'Polygon':
			coordstr = lines(geometry.coordinates);
			dimensions = geometry.coordinates[0][0].length;
			break;
		case 'MultiPoint':
			coordstr = line(geometry.coordinates);
			dimensions = geometry.coordinates[0].length;
			break;
		case 'MultiLineString':
			coordstr = lines(geometry.coordinates);
			dimensions = geometry.coordinates[0][0].length;
			break;
		case 'MultiPolygon':
			coordstr = geometry.coordinates.map(lines).map(wrap).join(', ');
			dimensions = geometry.coordinates[0][0][0].length;
			break;
		case 'GeometryCollection':
			coordstr = geometry.geometries.map((geom) => toPgGeom(geom, null, thirdOrdinate)).join(', ');
			dimensions = 2;
			break;
		default:
			throw new Error(
				'Provided GeoJSON geometry object is not valid for conversion to PostGIS-ready WKT.'
			);
	}
	return `${srid}${geometry.type.toUpperCase()}${ordinates(dimensions)}(${coordstr})`;
}

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
export function projectColors(gallery?: ProjectGalleryItem | ProjectGalleryItem[] | null) {
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
