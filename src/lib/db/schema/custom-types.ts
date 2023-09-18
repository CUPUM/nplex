import { USER_ROLE_DEFAULT, type AuthProvider, type UserRole } from '$lib/auth/constants';
import { isAuthProvider, isUserRole } from '$lib/auth/validation';
import type { Locale } from '$lib/i18n/constants';
import { isLocale } from '$lib/i18n/validation';
import type { LineString, Point, Polygon } from '@turf/turf';
import { customType } from 'drizzle-orm/pg-core';

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

/**
 * Var char with nanoid defaults.
 */
export const nanoid = customType<{
	data: string;
	config: { length?: number };
	driver: string;
	driverData: string;
}>({
	dataType({ length = 21 } = {}) {
		return `varchar(${length})`;
	},
	fromDriver(value) {
		return value;
	},
	toDriver(value) {
		return value;
	},
});

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
export const locale = customType<{ data: Locale }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		// return value as Locale;
		if (isLocale(value)) {
			return value;
		}
		throw new Error(`Value returned by database driver (${value}) is not a valid locale`);
	},
	toDriver(value) {
		return value;
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

/**
 * Implements postgis geometry type.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/issues/671
 * @see https://github.com/drizzle-team/drizzle-orm/issues/337#issuecomment-1600854417.
 */
export const geometry = customType<{
	data: Point | LineString | Polygon;
	driverData: string;
}>({
	dataType() {
		return 'geometry';
	},
	// toDriver(value: GeoJsonType): string {
	// 	if (!value) {
	// 		return 'null';
	// 	}
	// 	// parse geoJson
	// 	const geom = wkx.Geometry.parseGeoJSON(value);
	// 	const bufWithSrid = Buffer.alloc(4);
	// 	bufWithSrid.writeUInt32LE(4326, 0);
	// 	const finalBuffer = Buffer.concat([bufWithSrid, geom.toWkb()]);
	// 	return sql`UNHEX(${finalBuffer.toString('hex')})`;
	// },
	// fromDriver(value: string): GeoJsonType {
	// 	const buffer = Buffer.from(value.slice(4), 'binary');
	// 	const geom = wkx.Geometry.parse(buffer);
	// 	const geoJson = geom.toGeoJSON();
	// 	return geoJson as GeoJsonType;
	// },
});
