import { SQL, sql, type AnyColumn, type AnyTable, type InferSelectModel } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';
import { NANOID_DEFAULT_LENGTH } from './constants';
import type {
	FieldSelectRecord,
	InferColumnDataType,
	InferRecordDataTypes,
	InferSQLDataType,
} from './utils';

/**
 * Implements sql random. Can be used to order:
 *
 * ```ts
 * const randomItem = await db.select().from(items).orderBy(random()).limit(1);
 * ```
 */
export function random() {
	return sql`random()`;
}

/**
 * Get excluded column values in conflict cases. Useful for onConflictDoUpdate's set.
 */
export function excluded<C extends PgColumn>(column: C) {
	// return sql`excluded.${column}`;
	return sql.raw(`excluded.${column.name}`);
}

export function emptyJsonObject() {
	return sql<object>`'{}'::json`;
}

export function emptyJsonArray() {
	return sql<never[]>`'[]'::json`;
}

export function boolean<T extends boolean>(value: T) {
	return sql<T>`${value ? 'true' : 'false'}`;
}

export function TRUE() {
	return sql<true>`true`;
}

export function FALSE() {
	return sql<false>`false`;
}

export function NULL() {
	return sql<null>`null`;
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
		opts.push(alphabet);
	}
	return sql.raw(`"extensions"."nanoid${optimized ? '_optimized' : ''}"(${opts.join(',')})`);
	// return sql`extensions.nanoid${optimized ? '_optimized' : ''}(${opts.join(',')})`;
}

/**
 * Aggregate values to json array `json_agg()`. Since it is a json method, it should return an
 * unwrapped (raw) type instead of an SQL wrapped type.
 */
export function jsonAgg<T extends SQL>(raw: T) {
	return sql<InferSQLDataType<T>[]>`json_agg(${raw})`;
}

export function arrayAgg<T extends SQL | InferSelectModel<AnyTable>>(raw: T) {
	return sql<T extends SQL ? InferSQLDataType<T>[] : T[]>`array_agg(${raw})`;
}

/**
 * Since it is a json method, it should return an unwrapped (raw) type instead of an SQL wrapped
 * type.
 */
export function rowToJson<T extends AnyTable>(row: T) {
	return sql<InferSelectModel<T> | null>`row_to_json(${row})`;
}

/**
 * Build objects using `json_build_object(k1, v1, ...kn, vn). Since it is a json method, it should
 * return an object with unwrapped value types instead of SQL wrapped types.
 *
 * ⚠️ Vulnerable to SQL injections if used with user-input ⚠️
 */
export function jsonBuildObject<T extends FieldSelectRecord>(shape: T) {
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
 * Build object using `json_object_agg`. Since it is a json method, it should return an unwrapped
 * type instead of an SQL wrapped type.
 *
 * @example
 * 	select t.*, json_object_agg(ttl.locale, ttl) as translations
 * 	from project_types as t
 * 	left join (
 * 	select tt.*
 * 	from project_types_t as tt
 * 	right join i18n.locales as l
 * 	on tt.locale = l.locale
 * 	) as ttl
 * 	on t.id = ttl.id
 * 	group by t.id
 */
// export function jsonObjectAgg<
// 	K extends AnyColumn,
// 	V extends AnyTable | Record<string, AnyColumn>,
// 	TK extends string | number = null extends InferColumnDataType<K>
// 		? never
// 		: InferColumnDataType<K> extends string | number
// 		? InferColumnDataType<K>
// 		: never,
// 	TV = V extends AnyTable
// 		? InferSelectModel<V>
// 		: V extends Record<string, AnyColumn>
// 		? InferColumnsDataTypes<V>
// 		: never,
// >(key: K, value: V) {
// 	const v = value instanceof Table ? value : jsonBuildObject(value).getSQL();
// 	return sql<Record<TK, TV>>`json_object_agg(${key}, ${v})`;
// }
export function jsonObjectAgg<
	K extends AnyColumn,
	V extends SQL | AnyTable,
	TK extends string | number = null extends InferColumnDataType<K>
		? never
		: InferColumnDataType<K> extends string | number
		? InferColumnDataType<K>
		: never,
	TV = V extends AnyTable ? InferSelectModel<V> : V extends SQL ? InferSQLDataType<V> : never,
>(key: K, value: V) {
	return sql<Record<TK, TV>>`json_object_agg(${key}, ${value})`;
}

/**
 * SQL coalesce.
 */
export function coalesce<V extends SQL[]>(...values: V) {
	type T = V extends SQL<infer T>[] ? T : never;
	return sql.join([
		sql.raw('coalesce('),
		sql.join(
			values.map((v) => sql`${v}`),
			sql.raw(', ')
		),
		sql.raw(')'),
	]) as NonNullable<T> extends never ? SQL<null> : SQL<NonNullable<T>>;
}
