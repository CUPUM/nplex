import { LOAD_DEPENDENCIES } from '$lib/utils/constants';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import {
	Column,
	SQL,
	Subquery,
	SubqueryConfig,
	Table,
	View,
	ViewBaseConfig,
	and,
	eq,
	getTableColumns,
	is,
	sql,
	type AnyColumn,
	type AnyTable,
	type ColumnBuilderBase,
	type InferSelectModel,
	type SQLWrapper,
	type TableConfig,
} from 'drizzle-orm';
import type { AnyMySqlSelect, MySqlSelect } from 'drizzle-orm/mysql-core';
import {
	PgTable,
	getTableConfig,
	type AnyPgSelect,
	type PgSelect,
	type SelectedFields,
} from 'drizzle-orm/pg-core';
import type { AnySQLiteSelect, SQLiteSelect } from 'drizzle-orm/sqlite-core';
import type { Entries, Merge, SetNonNullable, ValueOf } from 'type-fest';
import { NANOID_DEFAULT_LENGTH } from './constants';
import { db } from './db.server';
import { langs, type TranslationLangColumn } from './schema/i18n';

/**
 * Dialect agnostic select.
 *
 * @see PgSelect.
 * @see MySqlSelect
 * @see SQLiteSelect
 */
type Select = Omit<PgSelect | MySqlSelect | SQLiteSelect, 'where'>;

/**
 * Dialect agnostic AnySelect.
 *
 * @see AnyPgSelect
 * @see AnyMySqlSelect
 * @see AnySQLiteSelect
 */
type AnySelect = Omit<AnyPgSelect | AnyMySqlSelect | AnySQLiteSelect, 'where'>;

/**
 * Infer type of table column.
 */
export type InferColumnType<T extends (...config: never[]) => ColumnBuilderBase> = AnyColumn<
	Pick<ReturnType<T>['_'], 'data' | 'dataType'>
>;

/**
 * Infer SQL template or column data type.
 */
type InferDataType<T extends Column | SQL | SQL.Aliased> = T extends Column
	? T['_']['notNull'] extends true
		? T['_']['dataType']
		: T['_']['dataType'] | null
	: T extends SQL<infer U>
		? U
		: T extends SQL.Aliased<infer U>
			? U
			: never;

export const emptyJsonObject = sql<object>`'{}'::json`;

export const emptyJsonArray = sql<[never]>`'[]'::json`;

export const emptyArray = sql<SQL<[]>>`{}`;

// export function emptyArray<T>(shape: T) {
// 	return sql<SQL<[]>>`{}::${shape}`;
// }

export function sqlBool<T extends boolean>(value: T) {
	return sql<T>`${value ? 'true' : 'false'}`;
}

export const sqlTrue = sqlBool(true);

export const sqlFalse = sqlBool(false);

export const sqlNull = sql<null>`null`;

export function jsonStripNulls<T>(json: SQL<T>) {
	return sql<SetNonNullable<T>>`json_strip_nulls(${json})`;
}

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
		opts.push(alphabet);
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

export function toTsvector(query: string) {}

export function toTsquery(query: string) {
	return sql`to_tsquery(${query})`;
}

export function plaintoTsquery(query: string) {
	return sql`plainto_tsquery(${query})`;
}

/**
 * Test a text search query against a ts_vector value.
 */
export function ts(
	vector: SQLWrapper,
	queryString: string,
	{ plain = true }: { plain?: boolean } = {}
) {
	const query = plain ? plaintoTsquery(queryString) : toTsquery(queryString);
	return sql`${vector} @@ ${query}`;
}

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
 * Paginate a query.
 */
export function withPagination<T extends Select>(qb: T, page: number, pageSize: number = 10) {
	return qb.limit(pageSize).offset(page * pageSize);
}

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

/**
 * Query helper to get rows with translations corresponding to request event's locale.
 */
export function withTranslation<
	T extends AnyTable<TableConfig>,
	TT extends AnyTable<TableConfig> & { [K in keyof TranslationLangColumn]: AnyColumn },
	F extends ValueOf<T['_']['columns']>,
	R extends ValueOf<TT['_']['columns']>,
	M = Merge<TT['_']['columns'], T['_']['columns']>,
	S extends SelectedFields = Merge<TT['_']['columns'], T['_']['columns']>,
>(
	event: ServerLoadEvent | RequestEvent,
	table: T,
	translationsTable: TT,
	{
		field: f,
		reference: r,
		selection: s = (f) => f as unknown as S,
	}: {
		field: F | ((selection: T) => F);
		reference: R | ((translationsSelection: TT) => R);
		selection?: S | ((columns: M) => S);
	}
) {
	// Attaching a load dependency to re-run when locale changes.
	if ('depends' in event) {
		event.depends(LOAD_DEPENDENCIES.Lang);
	}
	const field = f instanceof Function ? f(table) : f;
	const reference = r instanceof Function ? r(translationsTable) : r;
	const columns = getTableColumns(table);
	const translationColumns = getTableColumns(translationsTable);
	const selection = s instanceof Function ? s({ ...translationColumns, ...columns } as M) : s;
	return db
		.select(selection)
		.from(table)
		.$dynamic()
		.leftJoin(
			translationsTable,
			and(eq(translationsTable.lang, event.locals.lang), eq(field, reference))
		);
}

/**
 * Aggregate an entity's translations into a `translations` record field. Also automatically
 * coalesces missing translation rows to records with pre-populated locale and foreign key columns.
 */
export function withTranslations<
	T extends AnyTable<TableConfig>,
	TT extends AnyTable<TableConfig> & { [K in keyof TranslationLangColumn]: AnyColumn },
	F extends ValueOf<T['_']['columns']>,
	R extends ValueOf<TT['_']['columns']>,
	TS = T['_']['columns'],
	TTS extends Record<string, AnyColumn | SQL> = TT['_']['columns'],
>(
	table: T,
	translationsTable: TT,
	{
		field: f,
		reference: r,
		selection: ts = (t) => t as TS,
		translationsSelection: tts = (tt) => tt as TTS,
	}: {
		field: F | ((selection: T) => F);
		reference: R | ((translationsSelection: TT) => R);
		selection?: TS | ((columns: T['_']['columns']) => TS);
		translationsSelection?: TTS | ((columns: TT['_']['columns']) => TTS);
	}
) {
	const field = f instanceof Function ? f(table) : f;
	const reference = r instanceof Function ? r(translationsTable) : r;
	const selection = ts instanceof Function ? ts(getTableColumns(table)) : ts;
	const { name: translationsTableName } = getTableConfig(translationsTable);
	const translationsColumns = getTableColumns(translationsTable);
	const translationsSelection = tts instanceof Function ? tts(translationsColumns) : tts;
	const translationsEntries = Object.entries(translationsColumns) as Entries<
		typeof translationsColumns
	>;
	const translationsKey = translationsEntries.find(([_k, v]) => v === reference)![0];
	return db
		.select({
			...selection,
			translations: jsonObjectAgg(
				langs.lang,
				jsonBuildObject({
					...translationsSelection,
					lang: langs.lang,
					[translationsKey]: field,
				})
			).as(`${translationsTableName}_alias`),
		})
		.from(table)
		.leftJoin(langs, sqlTrue)
		.leftJoin(translationsTable, and(eq(field, reference), eq(langs.lang, translationsTable.lang)))
		.groupBy(field)
		.$dynamic();
}
