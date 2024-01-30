import {
	Column,
	SQL,
	Table,
	getTableColumns,
	sql,
	type AnyColumn,
	type AnyTable,
	type ColumnBuilderBase,
	type InferColumnsDataTypes,
	type InferSelectModel,
	type TableConfig,
} from 'drizzle-orm';
import type { SetNonNullable } from 'type-fest';
import { NANOID_DEFAULT_LENGTH } from './constants';

/**
 * Single column variant of drizzle's InferColumnsDataTypes.
 *
 * @deprecated Move to utils.
 */
export type InferColumnDataType<T extends AnyColumn> = T['_']['notNull'] extends true
	? T['_']['data']
	: T['_']['data'] | null;

/**
 * Extract the generic type of an SQL type.
 *
 * @deprecated Move to utils.
 */
export type InferSQLDataType<T, Fallback = never> = T extends SQL<infer U> ? U : Fallback;

/**
 * Extract returned data type of SQL-originating json object.
 *
 * @deprecated Move to utils.
 */
export type InferRecordDataTypes<T extends Record<string, AnyColumn | SQL>> = {
	[K in keyof T]: T[K] extends SQL
		? InferSQLDataType<T[K]>
		: T[K] extends AnyColumn
			? InferColumnDataType<T[K]>
			: never;
};

export type InferColumnType<T extends (...config: never[]) => ColumnBuilderBase> = AnyColumn<
	Pick<ReturnType<T>['_'], 'data' | 'dataType'>
>;

/**
 * Implements sql random. Can be used to order:
 *
 * @deprecated Move to utils.
 *
 *   ```ts
 *   const randomItem = await db.select().from(items).orderBy(random()).limit(1);
 *   ```
 */
export function random() {
	return sql<number>`random()`;
}

/**
 * Generate a nanoid using postgres-nanoid.
 *
 * @deprecated Move to utils.
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
		opts.push(alphabet);
	}
	return sql.raw(`"extensions"."nanoid${optimized ? '_optimized' : ''}"(${opts.join(',')})`);
	// return sql`extensions.nanoid${optimized ? '_optimized' : ''}(${opts.join(',')})`;
}

/**
 * Get excluded column values in conflict cases. Useful for onConflictDoUpdate's set.
 *
 * Function is overloaded to handle both full table and single column references.
 *
 * @deprecated
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

// export function limit<T extends AnyTable, C extends number>(table: T, count: C) {
// 	return sql
// }

/**
 * @deprecated Moved to utils.
 */
export function emptyJsonObject() {
	return sql<object>`'{}'::json`;
}

/**
 * @deprecated Moved to utils.
 */
export function emptyJsonArray() {
	return sql<never[]>`'[]'::json`;
}

/**
 * @deprecated Moved to utils.
 */
export const emptyArray = sql<SQL<[]>>`{}`;

/**
 * @deprecated Moved to utils.
 */
export function BOOL<T extends boolean>(value: T) {
	return sql<T>`${value ? 'true' : 'false'}`;
}

/**
 * @deprecated Moved to utils.
 */
export function TRUE() {
	return BOOL(true);
}

/**
 * @deprecated Moved to utils.
 */
export function FALSE() {
	return BOOL(false);
}

/**
 * @deprecated Moved to utils.
 */
export function NULL() {
	return sql<null>`null`;
}

/**
 * @deprecated Moved to utils.
 */
export function jsonStripNulls<T>(json: SQL<T>) {
	return sql<SetNonNullable<T>>`json_strip_nulls(${json})`;
}

// export function UNDEF() {
// 	return sql<undefined>`undef`;
// }

// export function DEFAULT<C extends AnyColumn>(col: C) {
// 	return sql<InferColumnDataType<C>>`${}`
// }

/**
 * Aggregate values to json array `json_agg()`. Since it is a json method, it should return an
 * unwrapped (raw) type instead of an SQL wrapped type.
 *
 * @deprecated Moved to utils.
 */
export function jsonAgg<T extends AnyTable<TableConfig> | AnyColumn>(
	selection: T,
	{ notNull = true }: { notNull?: boolean } = {}
) {
	type R =
		T extends AnyTable<TableConfig>
			? InferSelectModel<T>
			: T extends AnyColumn
				? InferColumnDataType<T>
				: T;
	if (notNull) {
		return sql<R[] | null>`json_agg(${selection}) filter (where ${selection} is not null)`;
	}
	return sql<R[] | null>`json_agg(${selection})`;
}

/**
 * Aggregate sql values into an sql array.
 *
 * @deprecated Moved to utils.
 */
export function arrayAgg<T extends SQL | InferSelectModel<AnyTable<TableConfig>>>(raw: T) {
	return sql<(T extends SQL ? InferSQLDataType<T>[] : T[]) | null>`array_agg(${raw})`;
}

/**
 * Since it is a json method, it should return an unwrapped (raw) type instead of an SQL wrapped
 * type.
 *
 * @deprecated
 */
export function rowToJson<T extends AnyTable<TableConfig>>(row: T) {
	return sql<InferSelectModel<T> | null>`row_to_json(${row})`;
}

/**
 * Build objects using `json_build_object(k1, v1, ...kn, vn). Since it is a json method, it should
 * return an object with unwrapped value types instead of SQL wrapped types.
 *
 * ⚠️ Vulnerable to SQL injections if used with user-input ⚠️
 *
 * @deprecated Moved to utils.
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
	// return sql<InferColumnsDataTypes<T>>`json_build_object(${sql.join(chunks)})`;
	return sql<InferRecordDataTypes<T>>`json_build_object(${sql.join(chunks)})`;
}

/**
 * Aggregate sql values into a json object.
 *
 * @deprecated
 */
export function jsonAggBuildObject<T extends Record<string, AnyColumn>>(shape: T) {
	const chunks: SQL[] = [];
	Object.entries(shape).forEach(([key, value]) => {
		if (chunks.length > 0) {
			chunks.push(sql.raw(`,`));
		}
		chunks.push(sql.raw(`'${key}',`));
		chunks.push(sql`${value}`);
	});
	return sql<InferColumnsDataTypes<T>[]>`coalesce(json_agg(distinct jsonb_build_object(${sql.join(
		chunks
	)})), '[]')`;
}

/**
 * Build object using `json_object_agg`. Since it is a json method, it should return an unwrapped
 * type instead of an SQL wrapped type.
 *
 * @deprecated Move to utils.
 */
export function jsonObjectAgg<
	K extends AnyColumn,
	V extends SQL | AnyTable<TableConfig>,
	TK extends string | number = null extends InferColumnDataType<K>
		? never
		: InferColumnDataType<K> extends string | number
			? InferColumnDataType<K>
			: never,
	TV = V extends AnyTable<TableConfig>
		? InferSelectModel<V>
		: V extends SQL
			? InferSQLDataType<V>
			: never,
>(key: K, value: V) {
	return sql<Record<TK, TV>>`json_object_agg(${key}, ${value})`;
}

type RemoveNull<T> = T extends null ? never : T;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CoalesceSQL<T extends unknown[], N extends boolean = true, R = never> = T extends [
	infer H,
	...infer T,
]
	? CoalesceSQL<
			T,
			null extends InferSQLDataType<H> ? true : false,
			R | RemoveNull<InferSQLDataType<H>>
		>
	: N extends true
		? SQL<R | null>
		: SQL<R>;

/**
 * SQL coalesce.
 *
 * @deprecated Move to utils.
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
