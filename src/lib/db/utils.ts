import { LOCALES_ARR, type Locale } from '$lib/i18n/constants';
import type { RequestEvent } from '@sveltejs/kit';
import {
	Column,
	SQL,
	SubqueryConfig,
	and,
	eq,
	getTableColumns,
	type AnyColumn,
	type AnyTable,
	type ColumnsSelection,
} from 'drizzle-orm';
import {
	PgTable,
	getTableConfig,
	type SelectedFields,
	type SubqueryWithSelection,
	type WithSubqueryWithSelection,
} from 'drizzle-orm/pg-core';
import type { Entries, Merge, ValueOf } from 'type-fest';
import { dbpool } from './db.server';
import { locales, type TranslationLocaleColumn } from './schema/i18n';
import {
	TRUE,
	coalesce,
	jsonBuildObject,
	jsonObjectAgg,
	type FieldSelectRecord,
} from './sql.server';

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
		/**
		 * Should the table name be returned with quotes? 'inner' means outside quotes are omitted,
		 * useful for when passing values to libraries that naively quote the given table name,
		 */
		quotes?: boolean | 'inner';
	} = {}
) {
	const tableConfig = getTableConfig(table);
	const qo = quotes && quotes !== 'inner' ? '"' : '';
	const qi = quotes ? '"' : '';
	return `${qo}${withSchema ? `${tableConfig.schema}${qi}.` : ''}${qi}${tableConfig.name}${qo}`;
}

/**
 * Get any query's columns info.
 */
export function getSubqueryColumns<S extends ColumnsSelection, A extends string>(
	query: WithSubqueryWithSelection<S, A> | SubqueryWithSelection<S, A>
): (typeof query)['_']['selectedFields'] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (query[SubqueryConfig as unknown as string] as any).selection;
}

/**
 * Get individually localized columns.
 */
export function getLocalizedField<F extends SQL | Column>(field: F) {
	const shape = Object.fromEntries(LOCALES_ARR.map((locale) => [locale, field])) as Record<
		Locale,
		F
	>;
	return jsonBuildObject(shape);
}

// /**
//  * Obfuscating a point geometry's location within a circle of configurable radius.
//  *
//  * @example St_geometryn( st_generatepoints( st_buffer( st_setsrid(location, 4326)::geography,
//  * coalesce(location_radius, 1000::real)::double precision, 'quad_segs=8'::text)::geometry, 1, 1992
//  * ), 1 )
//  */
// export function obfuscatePoint<T extends AnyColumn | SQL>(
// 	point: T,
// 	{ radius = 500, srid = SRIDS.WGS84 }: { radius?: number; srid?: SRID } = {}
// ) {
// 	type D = T extends AnyColumn
// 		? InferColumnDataType<T>
// 		: T extends SQL
// 		? InferSQLDataType<T>
// 		: never;
// 	// See previous implementation in sql schema
// 	return sql<D>``;
// }

/**
 * Query helper to get rows with translations corresponding to request event's locale.
 */
export function withTranslation<
	T extends AnyTable,
	TT extends AnyTable & { [K in keyof TranslationLocaleColumn]: AnyColumn },
	F extends ValueOf<T['_']['columns']>,
	R extends ValueOf<TT['_']['columns']>,
	M = Merge<TT['_']['columns'], T['_']['columns']>,
	S extends SelectedFields = Merge<TT['_']['columns'], T['_']['columns']>,
>(
	event: RequestEvent,
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
	const field = f instanceof Function ? f(table) : f;
	const reference = r instanceof Function ? r(translationsTable) : r;
	const columns = getTableColumns(table);
	const translationColumns = getTableColumns(translationsTable);
	const selection = s instanceof Function ? s({ ...translationColumns, ...columns } as M) : s;
	return dbpool
		.select(selection)
		.from(table)
		.leftJoin(
			translationsTable,
			and(eq(translationsTable.locale, event.locals.locale), eq(field, reference))
		);
}

/**
 * Aggregate an entity's translations into a `translations` record field. Also automatically
 * coalesces missing translation rows to records with pre-populated locale and foreign key columns.
 */
export function withTranslations<
	T extends AnyTable,
	TT extends AnyTable & { [K in keyof TranslationLocaleColumn]: AnyColumn },
	F extends ValueOf<T['_']['columns']>,
	R extends ValueOf<TT['_']['columns']>,
	TS = T['_']['columns'],
	TTS extends FieldSelectRecord = TT['_']['columns'],
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
	const translationsKey =
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		translationsEntries.find(([k, v]) => v === reference)![0];
	return dbpool
		.select({
			...selection,
			translations: jsonObjectAgg(
				locales.locale,
				coalesce(
					jsonBuildObject(translationsSelection),
					// rowToJson(translationsTable),
					jsonBuildObject({
						...translationsSelection,
						locale: locales.locale,
						[translationsKey]: field,
					})
				)
			).as(`${translationsTableName}_alias`),
		})
		.from(table)
		.leftJoin(locales, TRUE())
		.leftJoin(
			translationsTable,
			and(eq(field, reference), eq(locales.locale, translationsTable.locale))
		)
		.groupBy(field);
}

/**
 * Function to reduce a given array of entries augmented with translations records into two arrays.
 */
export function extractTranslations<T, D extends Omit<Record<string, unknown>, 'translations'>>(
	data: (D & { translations: Partial<Record<Locale, T>> })[]
) {
	return data.reduce(
		(acc, curr) => {
			const { translations, ...rest } = curr;
			acc[1].push(...Object.values(translations));
			acc[0].push(rest as unknown as D);
			return acc;
		},
		<[D[], T[]]>[[], []]
	);
}

/**
 * Map translations array to a record of translations. Also automatically populate / update index
 * field if present.
 */
export function reduceTranslations<
	T extends { locale: Locale; id: string },
	D extends { id: string; index?: number | null },
>(row: D & { translations: T[] }, index?: number) {
	const { translations, ...cols } = row;
	if (index != null && 'index' in cols) {
		cols.index = index;
	}
	// Building a base empty translations dictionnary to handle cases where no rows are defined.
	const translationsBase = LOCALES_ARR.reduce(
		(acc, locale) => {
			acc[locale] = {
				id: cols.id,
				locale,
			};
			return acc;
		},
		<Record<Locale, T | { locale: Locale; id: string }>>{}
	);
	return {
		...cols,
		translations: translations.reduce((acc, curr) => {
			acc[curr.locale] = curr;
			return acc;
		}, translationsBase),
	};
}
