import { LOCALES_ARR, type Locale } from '$lib/i18n/constants';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { and, eq, getTableColumns, type AnyColumn, type AnyTable } from 'drizzle-orm';
import { PgTable, getTableConfig } from 'drizzle-orm/pg-core';
import type { ValueOf } from 'type-fest';
import { dbpool, type DbHttp, type DbPool } from './db.server';
import { locales, type TranslationLocaleColumn } from './schema/i18n';
import { TRUE, coalesce, emptyJsonObject, jsonObjectAgg, rowToJson } from './sql.server';

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
	J extends { field: ValueOf<T['_']['columns']>; reference: ValueOf<TT['_']['columns']> },
>(
	event: RequestEvent | ServerLoadEvent,
	table: T,
	translationsTable: TT,
	join: J | ((table: T, translationsTable: TT) => J),
	db: DbHttp | DbPool = dbpool
) {
	const { field, reference } = join instanceof Function ? join(table, translationsTable) : join;
	return db
		.select({
			...getTableColumns(table),
			...getTableColumns(translationsTable),
		})
		.from(table)
		.leftJoin(
			translationsTable,
			and(eq(translationsTable.locale, event.locals.locale), eq(field, reference))
		);
}

/**
 * Aggregate an entity's translations into a `translations` record field.
 */
export function withTranslations<
	T extends AnyTable,
	TT extends AnyTable & { [K in keyof TranslationLocaleColumn]: AnyColumn },
	J extends { field: ValueOf<T['_']['columns']>; reference: ValueOf<TT['_']['columns']> },
>(
	table: T,
	translationsTable: TT,
	join: J | ((table: T, translationsTable: TT) => J),
	db: DbHttp | DbPool = dbpool
) {
	const { field, reference } = join instanceof Function ? join(table, translationsTable) : join;
	return db
		.select({
			...getTableColumns(table),
			translations: jsonObjectAgg(
				locales.locale,
				coalesce(rowToJson(translationsTable), emptyJsonObject())
			),
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
