import { LOCALES, LOCALES_ARR, type Locale } from '$lib/i18n/constants';
import { strictRecord } from '$lib/utils/zod';
import { getTableColumns, type AnyColumn, type AnyTable, type SQL } from 'drizzle-orm';
import { PgTable, getTableConfig } from 'drizzle-orm/pg-core';
import type { ZodObject, ZodRawShape } from 'zod';
import { locales } from './schema/i18n';
import { NULL, coalesce, jsonBuildObject, jsonObjectAgg, rowToJson } from './sql';

export type FieldSelectRecord = Record<string, AnyColumn | SQL>;

/**
 * Single column variant of drizzle's InferColumnsDataTypes.
 */
export type InferColumnDataType<T extends AnyColumn> = T['_']['notNull'] extends true
	? T['_']['data']
	: T['_']['data'] | null;

/**
 * Extract the generic type of an SQL type.
 */
export type InferSQLDataType<T extends SQL, Fallback = never> = T extends SQL<infer U>
	? U
	: Fallback;

export type InferRecordDataTypes<T extends FieldSelectRecord> = {
	[K in keyof T]: T[K] extends SQL
		? InferSQLDataType<T[K]>
		: T[K] extends AnyColumn
		? InferColumnDataType<T[K]>
		: never;
};

// export type InferFieldsDataType<T extends Table | Record<string,

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
 * Create a translations dictionnary.
 */
export function translationsAgg<T extends AnyTable>(translations: T) {
	const json = rowToJson(translations);
	// return jsonObjectAgg(locales.locale, coalesce(json, emptyJsonObject()));
	// return jsonObjectAgg(locales.locale, json);
	const cols = getTableColumns(translations);
	const empty = Object.fromEntries(Object.keys(cols).map((col) => [col, NULL()])) as Record<
		// keyof InferSelectModel<T>,
		keyof typeof cols,
		SQL<null>
	>;
	return jsonObjectAgg(locales.locale, coalesce(json, jsonBuildObject(empty)));
}

/**
 * Schema for translations record.
 */
export function translationsSchema<T extends ZodRawShape>(schema: ZodObject<T>) {
	return strictRecord(LOCALES, schema);
}

/**
 * Extend the insert schema of a given ressource table with its corresponding translations. The
 * resulting schema should be isomorphic with {@link withTranslationsRelations}.
 */
export function withTranslationsSchema<
	T extends ZodRawShape,
	// TK extends UnknownKeysParam,
	// TC extends ZodTypeAny,
	TT extends ZodRawShape,
	// TTK extends UnknownKeysParam,
	// TTC extends ZodTypeAny,
>(schema: ZodObject<T>, translationSchema: ZodObject<TT>) {
	return schema.extend({ translations: translationsSchema(translationSchema) });
}

/**
 * Function to reduce a given array of entries augmented with translations records into two arrays.
 */
export function extractTranslations<T, D extends Omit<Record<string, unknown>, 'translations'>>(
	data: (D & { translations: Record<Locale, T> })[]
) {
	return data.reduce(
		(acc, curr) => {
			const { translations, ...rest } = curr;
			LOCALES_ARR.forEach((t) => acc[1].push(translations[t]));
			acc[0].push(rest as unknown as D);
			return acc;
		},
		<[D[], T[]]>[[], []]
	);
}
