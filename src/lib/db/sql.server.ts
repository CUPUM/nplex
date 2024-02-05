import {
	availableLanguageTags,
	isAvailableLanguageTag,
	type AvailableLanguageTag,
} from '$i18n/runtime';
import { USER_ROLE_DEFAULT, type UserRole } from '$lib/auth/constants';
import { isUserRole } from '$lib/auth/validation';
import { GEOMETRY_TYPES, SRIDS, type SRID } from '$lib/utils/constants';
import type { Coordinate } from '$lib/utils/gis';
import {
	Column,
	SQL,
	Subquery,
	SubqueryConfig,
	Table,
	View,
	ViewBaseConfig,
	getTableColumns,
	is,
	sql,
	type AnyColumn,
	type AnyTable,
	type ColumnBuilderBase,
	type InferSelectModel,
	type TableConfig,
} from 'drizzle-orm';
import type { AnyMySqlSelect, MySqlSelect } from 'drizzle-orm/mysql-core';
import {
	PgTable,
	customType,
	getTableConfig,
	type AnyPgSelect,
	type PgSelect,
} from 'drizzle-orm/pg-core';
import type { AnySQLiteSelect, SQLiteSelect } from 'drizzle-orm/sqlite-core';
import type { SetNonNullable } from 'type-fest';
import { z } from 'zod';
import { NANOID_DEFAULT_LENGTH, SQL_LANGUAGES, type SQLLanguage } from './constants';

/**
 * Dialect agnostic select.
 *
 * @see PgSelect.
 * @see MySqlSelect
 * @see SQLiteSelect
 */
export type Select = Omit<PgSelect | MySqlSelect | SQLiteSelect, 'where'>;

/**
 * Dialect agnostic AnySelect.
 *
 * @see AnyPgSelect
 * @see AnyMySqlSelect
 * @see AnySQLiteSelect
 */
export type AnySelect = Omit<AnyPgSelect | AnyMySqlSelect | AnySQLiteSelect, 'where'>;

/**
 * Infer type of table column.
 */
export type InferColumnType<T extends (...config: never[]) => ColumnBuilderBase> = AnyColumn<
	Pick<ReturnType<T>['_'], 'data' | 'dataType'>
>;

/**
 * Infer SQL template or column data type.
 */
export type InferDataType<T extends Column | SQL | SQL.Aliased> = T extends Column
	? T['_']['notNull'] extends true
		? T['_']['dataType']
		: T['_']['dataType'] | null
	: T extends SQL<infer U>
		? U
		: T extends SQL.Aliased<infer U>
			? U
			: never;

/**
 * Empty record as SQL json.
 */
export const emptyJsonObject = sql<object>`'{}'::json`;

/**
 * Empty array as SQL json.
 */
export const emptyJsonArray = sql<[never]>`'[]'::json`;

/**
 * Empty SQL array (not json typed)
 */
export const emptyArray = sql<SQL<[]>>`{}`;

/**
 * SQL template boolean value.
 */
export function sqlBool<T extends boolean>(value: T) {
	return sql<T>`${value ? 'true' : 'false'}`;
}

/**
 * SQL template true value.
 */
export const sqlTrue = sqlBool(true);

/**
 * SQL template false value.
 */
export const sqlFalse = sqlBool(false);

/**
 * SQL template null value.
 */
export const sqlNull = sql<null>`null`;

/**
 * Translation's language is stored a language tags (locales), but Postgres text-related functions
 * expect a full language name. Use this sql switch to retrieve a lang column's corresponding
 * language name.
 */
export function sqlLang(languageTag: string) {
	const cases = availableLanguageTags.map(
		(tag) => `when ${languageTag} = '${tag}' then '${SQL_LANGUAGES[tag]}'::regconfig`
	);
	return `(case ${cases.join(' ')} end)`;
}

/**
 * SQL json_strip_nulls.
 */
export function jsonStripNulls<T>(json: SQL<T> | SQL.Aliased<T>) {
	return sql<SetNonNullable<T>>`json_strip_nulls(${json})`;
}

/**
 * SQL random function.
 */
export function random() {
	return sql<number>`random()`;
}

/**
 * Generate a nanoid using postgres-nanoid.
 *
 * @see https://discord.com/channels/1043890932593987624/1093946807911989369/1100459226087825571
 * @todo Stay up to date when default values will accept 'sql' without having to pass param to
 *   sql.raw()
 */
export function generateNanoid({
	optimized = false,
	length = NANOID_DEFAULT_LENGTH,
	alphabet,
}: {
	optimized?: boolean;
	/**
	 * Defaults to @link NANOID_LENGTH_DEFAULT.
	 */
	length?: number;
	/**
	 * Defaults to '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	 */
	alphabet?: string;
} = {}) {
	const opts: (string | number)[] = [length];
	if (alphabet) {
		opts.push(`'${alphabet}'`);
	}
	return sql.raw(`"extensions"."nanoid${optimized ? '_optimized' : ''}"(${opts.join(',')})`);
	// return sql`extensions.nanoid${optimized ? '_optimized' : ''}(${opts.join(',')})`;
}

/**
 * Get excluded column values in conflict cases. Useful for onConflictDoUpdate's set.
 *
 * Function is overloaded to handle both full table and single column references.
 */
export function excluded<T extends AnyColumn>(columnOrTable: T): SQL<T>;
export function excluded<T extends AnyTable<TableConfig>, C = T['_']['columns']>(
	columnOrTable: T
): { [K in keyof C]: SQL<C[K]> };
export function excluded<T extends Column | Table>(columnOrTable: T) {
	if (columnOrTable instanceof Column) {
		return sql.raw(`excluded.${columnOrTable.name}`);
	}
	const cols = getTableColumns(columnOrTable);
	type C = typeof cols;
	return (Object.keys(cols) as (keyof C)[]).reduce(
		(acc, curr) => {
			acc[curr] = excluded(cols[curr]);
			return acc;
		},
		<{ [K in keyof C]: SQL<C[K]> }>{}
	);
}

/**
 * Aggregate sql values into an sql array.
 */
export function arrayAgg<T extends SQL | InferSelectModel<AnyTable<TableConfig>>>(raw: T) {
	return sql<(T extends SQL ? InferDataType<T>[] : T[]) | null>`array_agg(${raw})`;
}

/**
 * Since it is a json method, it should return an unwrapped (raw) type instead of an SQL wrapped
 * type.
 */
export function rowToJson<T extends AnyTable<TableConfig>>(row: T) {
	return sql<InferSelectModel<T> | null>`row_to_json(${row})`;
}

export function toTsvector(lang: SQLLanguage | AnyColumn, field: string) {
	return sql`to_tsvector(${field})`;
}

export function toTsquery(lang: SQLLanguage | AnyColumn, querytext: string) {
	return sql`to_tsquery(${querytext})`;
}

export function plaintoTsquery(lang: SQLLanguage | AnyColumn, querytext: string) {
	return sql`plainto_tsquery(${querytext})`;
}

// /**
//  * Test a text search query against a ts_vector value.
//  */
// export function ts(
// 	vector: SQLWrapper,
// 	queryString: string,
// 	{ plain = true }: { plain?: boolean } = {}
// ) {
// 	const query = plain ? plaintoTsquery(queryString) : toTsquery(queryString);
// 	return sql`${vector} @@ ${query}`;
// }

/**
 * Json_agg.
 */
export function jsonAgg<T extends Table | Column | Subquery | AnySelect>(
	selection: T,
	{ notNull = true }: { notNull?: boolean } = {}
): SQL<
	T extends Table
		? InferSelectModel<T>
		: T extends Column
			? InferDataType<T>[]
			: T extends Subquery
				? { [K in keyof T['_']['selectedFields']]: InferDataType<T['_']['selectedFields'][K]> }[]
				: T extends AnySelect
					? Awaited<T>
					: never
> {
	if (notNull) {
		return sql`json_agg(${selection}) filter (where ${selection} is not null)`;
	}
	return sql`json_agg(${selection})`;
}

/**
 * Build objects using `json_build_object(k1, v1, ...kn, vn). Since it is a json method, it should
 * return an object with unwrapped value types instead of SQL wrapped types.
 */
export function jsonBuildObject<T extends Record<string, AnyColumn | SQL>>(shape: T) {
	const chunks: SQL[] = [];
	Object.entries(shape).forEach(([key, value]) => {
		if (chunks.length > 0) {
			chunks.push(sql.raw(`,`));
		}
		chunks.push(sql.raw(`'${key}',`));
		chunks.push(sql`${value}`);
	});
	return sql<{ [K in keyof T]: InferDataType<T[K]> }>`json_build_object(${sql.join(chunks)})`;
}

/**
 * Aggregate sql values into a json object.
 */
export function jsonAggBuildObject<T extends Record<string, AnyColumn | SQL | SQL.Aliased>>(
	shape: T
): SQL<
	{
		[K in keyof T]: InferDataType<T[K]> extends never ? T : InferDataType<T[K]>;
	}[]
> {
	const chunks: SQL[] = [];
	Object.entries(shape).forEach(([key, value]) => {
		if (chunks.length > 0) {
			chunks.push(sql.raw(`,`));
		}
		chunks.push(sql.raw(`'${key}',`));
		chunks.push(sql`${value}`);
	});
	return sql`coalesce(json_agg(distinct jsonb_build_object(${sql.join(chunks)})), '[]')`;
}

/**
 * Build object using `json_object_agg`. Since it is a json method, it should return an unwrapped
 * type instead of an SQL wrapped type.
 */
export function jsonObjectAgg<
	K extends AnyColumn,
	V extends SQL | AnyTable<TableConfig>,
	TK extends string | number = null extends InferDataType<K>
		? never
		: InferDataType<K> extends string | number
			? InferDataType<K>
			: never,
	TV = V extends AnyTable<TableConfig>
		? InferSelectModel<V>
		: V extends SQL
			? InferDataType<V>
			: never,
>(key: K, value: V) {
	return sql<Record<TK, TV>>`json_object_agg(${key}, ${value})`;
}

/**
 * SQL coalesce.
 *
 * @see https://www.typescriptlang.org/play?#code/C4TwDgpgBAcg9sGBXANigPAFShAHsCAOwBMBnKJQga0LgHdCBtAXQD4oBeKAbwCgoBURgGkoAS0JRCSALYAjCACcoAMihUIIOADMomZgC49I5jnxEyU1CigB+KRABuSqEcwmA3LwC+X3tsoAY2AxOElAuABDFAhSQIh0ADUzAhJyShp6JjYACgA6AsdopFijRIBKHl4ASFBIPU4hArzE0zxUywltF2x7bCNCJyUvATroAGFG7kYASXFJDS1dbDVpeSVDYxm28zSrNDsHZ2U3WeZffigxqAAxRvHGRZ0oceYRqAjCUmAobTEUAiKCDERpFFAlUh5P4ApQ5RycdjwgCEXGkaHK7yBwCQikkOWhgOBeRihAA5sAABaHAlKYGMAAMpgG1kqkXINy83l4vGumFiwHQAEEUhZ0tRaAwWOwuIxmoKdh1yF0eod+kdhtzPt8oJFFIoAIyNRholAAGigAFlIpS8opIiQ4DIcpV2HkAKyHADkwrBJU9OvIWp+zLQzF4QZ1eoATEaTearTa7Q6nS6oO6vT7ihB-WyPmFtUZvbRKS5fdmA3mvsAw9dxoauHzvugxs9dQbWDzwBMYw3+c2u63ox3w-mfgRvvW89FYvEcnHLdaKbb7cRHc6oK6PfZvVAyznA6PXPsUBioAB6M-HqAAHygO73I6rV35PanMTiEDn1nji+XyfXm4ZruWb7pWBZ3oKxYUqWIEVkGp4XhBwHguWt5Fgg0HKHuQA
 * @todo Figure out mapped array typing to exclude exclusively null array members.
 */
export function coalesce<T extends SQL[]>(...values: T) {
	return sql.join([
		sql.raw('coalesce('),
		sql.join(
			values.map((v) => sql`${v}`),
			sql.raw(', ')
		),
		sql.raw(')'),
	]) as CoalesceSQL<T>;
}
type RemoveNull<T> = T extends null ? never : T;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CoalesceSQL<T extends unknown[], N extends boolean = true, R = never> = T extends [
	infer H,
	...infer T,
]
	? CoalesceSQL<
			T,
			H extends SQL | SQL.Aliased ? (null extends InferDataType<H> ? true : false) : never,
			R | RemoveNull<H extends SQL | SQL.Aliased ? InferDataType<H> : never>
		>
	: N extends true
		? SQL<R | null>
		: SQL<R>;

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
 * Ci-text postgres column type.
 *
 * @see https://www.postgresql.org/docs/current/citext.html
 */
export const citext = customType<{ data: string }>({
	dataType() {
		return 'citext';
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
		if (isAvailableLanguageTag(value)) {
			return value;
		}
		throw new Error(`Value returned by database driver (${value}) is not a valid lang`);
	},
	toDriver(value) {
		if (isAvailableLanguageTag(value)) {
			return value;
		}
		throw new Error(`Tried to input wrong value for AvailableLanguageTag (${value}).`);
	},
});

/**
 * Tsvector type for generated columns used notably for fuzzy string search.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/issues/247
 */
export const tsvector = customType<{
	data: string;
	configRequired: true;
	config: {
		// sources: () => AnyColumn[];
		// language: PgLanguage | SQL<PgLanguage> | (() => AnyLangColumn);
		sources: string[];
		lang: string;
		weighted?: boolean;
	};
}>({
	dataType(config) {
		const langString = sqlLang(config.lang);
		if (config.weighted) {
			const weighted = config.sources.map((input, index) => {
				const weight = String.fromCharCode(index + 65);
				return `setweight(to_tsvector(${langString}, coalesce(${input}, '')), '${weight}')`;
			});
			return `tsvector generated always as (${weighted.join(' || ')}) stored`;
		} else {
			const source = config.sources.join(" || ' ' || ");
			return `tsvector generated always as (to_tsvector(${langString}, ${source})) stored`;
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
	 *
	 * @default true
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

/**
 * Implements postgres int4 / int8 range type.
 *
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 *
 * @todo Add multiranges if needed.
 */
export const intrange = customType<{
	data: z.infer<ReturnType<typeof rangeSchema>>;
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
 * Implements postgres timestamp range.
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
 * Implements cube extension type for 3d vectors.
 *
 * @see https://www.postgresql.org/docs/current/cube.html
 */
export const cube = customType<{ data: [x: number, y: number, z: number]; driverData: number[] }>({
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

/**
 * Updated version of drizzle-orm's getTableName with config to allow preprending table's schema
 * name for cross-schema relations.
 */
export function getTableName<T extends PgTable>(
	table: T,
	{
		withSchema = true,
		quotes = true,
	}: {
		withSchema?: boolean;
		quotes?: boolean;
	} = {}
) {
	const tableConfig = getTableConfig(table);
	const q = quotes ? '"' : '';
	return `${withSchema ? `${q}${tableConfig.schema}${q}.` : ''}${q}${tableConfig.name}${q}`;
}

/**
 * Should replace `getTableColumns` to allow for more input versatility.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/pull/1789
 */
export function getColumns<T extends Table | View | Subquery | AnySelect>(
	table: T
): T extends Table
	? T['_']['columns']
	: T extends View
		? T['_']['selectedFields']
		: T extends Subquery
			? T['_']['selectedFields']
			: T extends AnySelect
				? T['_']['selectedFields']
				: never {
	return is(table, Table)
		? // eslint-disable-next-line @typescript-eslint/no-explicit-any
			(table as any)[(Table as any).Symbol.Columns]
		: is(table, View)
			? // eslint-disable-next-line @typescript-eslint/no-explicit-any
				(table as any)[ViewBaseConfig].selectedFields
			: is(table, Subquery)
				? // eslint-disable-next-line @typescript-eslint/no-explicit-any
					(table as any)[SubqueryConfig].selection
				: // eslint-disable-next-line @typescript-eslint/no-explicit-any
					(table as any)._.selectedFields;
}

export function getNameOrAlias<T extends Table | View | Subquery | AnySelect>(
	table: T
): T extends Table
	? T['_']['name']
	: T extends View
		? T['_']['name']
		: T extends Subquery
			? T['_']['alias']
			: T extends AnySelect
				? T['_']['tableName']
				: never {
	return is(table, Table)
		? // eslint-disable-next-line @typescript-eslint/no-explicit-any
			(table as any)[(Table as any).Symbol.Name]
		: is(table, View)
			? // eslint-disable-next-line @typescript-eslint/no-explicit-any
				(table as any)[ViewBaseConfig].name
			: is(table, Subquery)
				? // eslint-disable-next-line @typescript-eslint/no-explicit-any
					(table as any)[SubqueryConfig].alias
				: // eslint-disable-next-line @typescript-eslint/no-explicit-any
					(table as any).tableName;
}
