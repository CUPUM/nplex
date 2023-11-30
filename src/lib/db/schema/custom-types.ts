import { availableLanguageTags, type AvailableLanguageTag } from '$i18n/runtime';
import { USER_ROLE_DEFAULT, type AuthProvider, type UserRole } from '$lib/auth/constants';
import { isAuthProvider, isUserRole } from '$lib/auth/validation';
import { isAvailableLang } from '$lib/i18n/validation';
import { GEOMETRY_TYPES, SRIDS, type SRID } from '$lib/utils/constants';
import type { Coordinate } from '$lib/utils/gis';
import { customType } from 'drizzle-orm/pg-core';
import type { ReadonlyTuple } from 'type-fest';
import { z } from 'zod';
import { SQL_LANGUAGES } from '../constants';
import type { InferColumnType } from '../sql.server';

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
 *
 * @see {@link AuthProvider}
 */
export const authProvider = customType<{ data: AuthProvider }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		// return value as AvailableLanguageTag;
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
 * Implements postgres identity column.
 *
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
 * AvailableLanguageTag code custom type.
 *
 * @see {@link AvailableLanguageTag}
 */
export const lang = customType<{ data: AvailableLanguageTag; driverData: string }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		if (isAvailableLang(value)) {
			return value;
		}
		throw new Error(`Value returned by database driver (${value}) is not a valid lang`);
	},
	toDriver(value) {
		if (isAvailableLang(value)) {
			return value;
		}
		throw new Error(`Tried to input wrong value for AvailableLanguageTag (${value}).`);
	},
});
export type AnyLangColumn = InferColumnType<typeof lang>;

/**
 * Translation's language is stored a language tags (locales), but Postgres text-related functions
 * expect a full language name. Use this sql switch to retrieve a lang column's corresponding
 * language name.
 */
function language(languageTag: string) {
	const cases = availableLanguageTags.map(
		(tag) => `when ${languageTag} = '${tag}' then '${SQL_LANGUAGES[tag]}'::regconfig`
	);
	return `(case ${cases.join(' ')} end)`;
}

/**
 * Tsvector type for generated columns used notably for fuzzy string search.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/issues/247
 */
export const tsvector = customType<{
	data: string;
	config: {
		// sources: () => AnyColumn[];
		// language: PgLanguage | SQL<PgLanguage> | (() => AnyLangColumn);
		sources: string[];
		lang: string;
		weighted?: boolean;
	};
}>({
	dataType(config) {
		if (config) {
			const pglang = language(config.lang);
			if (config.weighted) {
				const weighted = config.sources.map((input, index) => {
					const weight = String.fromCharCode(index + 65);
					return `setweight(to_tsvector(${pglang}, coalesce(${input}, '')), '${weight}')`;
				});
				return `tsvector generated always as (${weighted.join(' || ')}) stored`;
			} else {
				const source = config.sources.join(" || ' ' || ");
				return `tsvector generated always as (to_tsvector(${pglang}, ${source})) stored`;
			}
		} else {
			return `tsvector`;
		}
	},
});

/**
 * Generic range zod schema.
 */
export function rangeSchema({
	min,
	max,
	ordered = true,
}: {
	min?: number;
	max?: number;
	/**
	 * Should min and max order be forced?
	 */
	ordered?: boolean;
} = {}) {
	const boundSchema =
		min != null && max != null
			? z.number().min(min).max(max)
			: min != null
			  ? z.number().min(min)
			  : max != null
			    ? z.number().max(max)
			    : z.number();
	return z.union([
		z.tuple([boundSchema, boundSchema]).refine(
			(v) => {
				if (ordered) {
					return v[0] <= v[1];
				}
				return true;
			},
			{ message: 'Min/max members of an ordered range need to be in increasing order.' }
		),
		z.tuple([z.null(), z.null()]),
	]);
}

export type IntRangeData = z.infer<ReturnType<typeof rangeSchema>>;

/**
 * Implements postgres int4 / int8 range type.
 *
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 *
 * @todo Add multiranges if needed.
 */
export const intrange = customType<{
	data: IntRangeData;
	driverData: string;
	config: { size: 4 | 8 };
}>({
	dataType(config) {
		return `int${config?.size ?? 4}range`;
	},
	fromDriver(value) {
		if (value === 'empty') {
			return [null, null];
		}
		const matches = value.match(/(?<nums>(\d*\.?\d* *, *\d*\.?\d*))/);
		if (!matches?.groups) {
			throw new Error('Expected range string, got wrongly formatted data.');
		}
		const range = matches.groups['nums'].split(',').map((num) => Number(num));
		return [range[0], range[1]];
	},
	toDriver(value) {
		if (value[0] == null && value[1] == null) {
			return 'empty';
		}
		// Using canonical form of included lower bound and excluded upper bound.
		// See https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DISCRETE
		return `[${value[0]},${value[1]})`;
		// const diff = value[0] == null || value[1] == null ? 0 : value[1] - value[0];
		// return `[${value[0] ?? value[1]},${value[1] ?? value[0]}${diff ? ')' : ']'}`;
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
 *
 * @see https://www.postgresql.org/docs/current/cube.html
 */
export const cube = customType<{ data: Cube<3>; driverData: number[] }>({
	dataType() {
		return 'extensions.cube';
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
