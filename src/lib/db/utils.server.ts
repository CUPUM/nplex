import { availableLanguageTags, type AvailableLanguageTag } from '$i18n/runtime';
import { LOAD_DEPENDENCIES } from '$lib/utils/constants';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
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
	type TableConfig,
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
import { langs, type TranslationLangColumn } from './schema/i18n';
import { TRUE, jsonBuildObject, jsonObjectAgg } from './sql.server';

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
export function getLangField<F extends SQL | Column>(field: F) {
	const shape = Object.fromEntries(availableLanguageTags.map((lang) => [lang, field])) as Record<
		AvailableLanguageTag,
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
	return dbpool
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const translationsKey = translationsEntries.find(([k, v]) => v === reference)![0];
	return dbpool
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
		.leftJoin(langs, TRUE())
		.leftJoin(translationsTable, and(eq(field, reference), eq(langs.lang, translationsTable.lang)))
		.groupBy(field)
		.$dynamic();
}
