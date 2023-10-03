import { USER_ROLE_DEFAULT, type AuthProvider, type UserRole } from '$lib/auth/constants';
import { isAuthProvider, isUserRole } from '$lib/auth/validation';
import type { Locale } from '$lib/i18n/constants';
import { isLocale } from '$lib/i18n/validation';
import { GEOMETRY_TYPES, SRIDS, type SRID } from '$lib/utils/constants';
import type { Coordinate } from '$lib/utils/gis';
import { customType } from 'drizzle-orm/pg-core';
import type { ReadonlyTuple } from 'type-fest';

/**
 * Implementing our own db-level role type in sync with UserRole in lieu of using a pgEnum to avoid
 * futur complications regarding updatability.
 */
export const userRole = customType<{ data: UserRole }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		// return value as UserRole;
		if (isUserRole(value)) {
			return value;
		}
		// Fallback to lowest role in case of mismatch.
		return USER_ROLE_DEFAULT;
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Auth provider custom type.
 */
export const authProvider = customType<{ data: AuthProvider }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		// return value as Locale;
		if (isAuthProvider(value)) {
			return value;
		}
		throw new Error(`Value returned by database driver (${value}) is not a valid auth provider`);
	},
	toDriver(value) {
		return value;
	},
});

// /**
//  * Var char with nanoid defaults.
//  */
// export const nanoid = customType<{
// 	data: string;
// 	config: { length?: number };
// 	driver: string;
// 	driverData: string;
// }>({
// 	dataType({ length = 21 } = {}) {
// 		return `varchar(${length})`;
// 	},
// 	fromDriver(value) {
// 		return value;
// 	},
// 	toDriver(value) {
// 		return value;
// 	},
// });

/**
 * @see https://github.com/drizzle-team/drizzle-orm/issues/295
 */
export const identity = customType<{
	data: number;
	driver: number;
	driverData: number;
	notNull: true;
	default: true;
}>({
	dataType() {
		return 'INTEGER GENERATED ALWAYS AS IDENTITY';
	},
});

/**
 * Locale code custom type.
 */
export const locale = customType<{ data: Locale; driverData: string }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		if (isLocale(value)) {
			return value;
		}
		throw new Error(`Value returned by database driver (${value}) is not a valid locale`);
	},
	toDriver(value) {
		if (isLocale(value)) {
			return value;
		}
		throw new Error(`Tried to input wrong value for Locale (${value}).`);
	},
});

/**
 * Implements postgres int4 / int8 range type.
 *
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 *
 * @todo Add multiranges if needed.
 */
export const intrange = customType<{ data: [number, number]; config: { size: 4 | 8 } }>({
	dataType(config) {
		return `int${config?.size ?? 4}`;
	},
	fromDriver(value) {
		return value as [number, number];
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Implements postgres numeric range.
 *
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 *
 * @todo Add multiranges if needed.
 */
export const numrange = customType<{ data: [number, number] }>({
	dataType() {
		return 'numrange';
	},
	fromDriver(value) {
		return value as [number, number];
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Implements postgres date range.
 *
 * @see https://orm.drizzle.team/docs/custom-types Timestamp for reference.
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 *
 * @todo Add multiranges if needed.
 */
export const tsrange = customType<{ data: [Date, Date]; config: { withTimezone: boolean } }>({
	dataType(config) {
		return `ts${config?.withTimezone ? 'tz' : ''}range`;
	},
	fromDriver(value) {
		return value as [Date, Date];
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Implements postgres date range.
 *
 * @see https://orm.drizzle.team/docs/custom-types Timestamp for reference.
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 *
 * @todo Add multiranges if needed.
 */
export const daterange = customType<{ data: [Date, Date] }>({
	dataType() {
		return 'daterange';
	},
	fromDriver(value) {
		return value as [Date, Date];
	},
	toDriver(value) {
		return value;
	},
});

type Cube<L extends number> = L extends 1
	? number
	: L extends 2
	? [x: number, y: number]
	: L extends 3
	? [x: number, y: number, z: number]
	: ReadonlyTuple<number, L>;

/**
 * Implements cube extension type for 3d vectors.
 */
export const cube = customType<{ data: Cube<3>; driverData: number[] }>({
	dataType() {
		return 'cube';
	},
	fromDriver(value) {
		if (value.length !== 3) {
			throw new Error(
				'Expected a cube value, but value is not a properly dimensioned array of numbers.'
			);
		}
		return [value[0], value[1], value[2]];
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Implements postgis point geometry type.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/issues/671
 * @see https://github.com/drizzle-team/drizzle-orm/issues/337#issuecomment-1600854417.
 */
export const point = <C extends { srid?: SRID; z?: boolean; m?: boolean }, N extends string>(
	name: N,
	config?: C
) => {
	const extraDimensions = `${config?.z ? 'Z' : ''}${config?.m ? 'M' : ''}`;
	return customType<{
		data: { type: typeof GEOMETRY_TYPES.Point; coordinates: Coordinate<C> };
		driverData: string;
		config: C;
	}>({
		dataType(config) {
			return `extensions.geometry(Point${extraDimensions},${config?.srid ?? SRIDS.WGS84})`;
		},
		toDriver(value) {
			const zd = config?.z ? `,${config.z}` : '';
			const md = config?.m ? `,${config.m}` : '';
			return `Point${extraDimensions}(${value.coordinates[0]},${value.coordinates[1]}${zd}${md})`;
		},
		fromDriver(value) {
			const matches = value.match(
				/POINT(?<z>Z?)(?<m>M?)\((?<coordinateString>(\d+(?:\.\d*)?,? *?)*)\)/
			);
			if (!matches?.groups) {
				throw new Error(`Point geometry value (${value}) does not match the expected pattern.`);
			}
			const { z, m, coordinateString } = matches.groups;
			if ((config?.z && !z) || (config?.m && !m)) {
				throw new Error(
					`Missing dimension(s) expected according to Point column config. Value has ${JSON.stringify(
						{
							z: !!config?.z,
							m: !!config?.m,
						}
					)} but column is supposed to be typed ${JSON.stringify({ z, m })}.`
				);
			}
			const coordinates = coordinateString
				.split(',')
				.map((d) => parseFloat(d.trim())) as Coordinate<C>;
			return { type: GEOMETRY_TYPES.Point, coordinates };
		},
	})(name, config);
};
