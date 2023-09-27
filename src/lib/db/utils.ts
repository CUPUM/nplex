import { LOCALES } from '$lib/i18n/constants';
import { strictRecord } from '$lib/utils/zod';
import type { AnyColumn, AnyTable, SQL } from 'drizzle-orm';
import { PgTable, getTableConfig } from 'drizzle-orm/pg-core';
import { z, type ZodObject, type ZodRawShape } from 'zod';
import { locales } from './schema/i18n';
import { coalesce, emptyJsonObject, jsonObjectAgg, rowToJson } from './sql';

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

// /**
//  * Helper to seamlessly combine the functionalities of `row_to_json` and `json_build_object`in a
//  * manner similar to drizzle's SelectBuilder.
//  */
// export function jsonFromFields<T extends AnyTable>(fields: T): SQL<InferSelectModel<T>>;
// export function jsonFromFields<T extends FieldSelectRecord>(fields: T): InferRecordDataTypes<T>;
// export function jsonFromFields(fields: AnyTable | FieldSelectRecord) {
// 	return fields instanceof Table ? rowToJson(fields) : jsonBuildObject(fields);
// }

/**
 * Create a translations dictionnary.
 */
export function translationsAgg<T extends AnyTable>(translations: T) {
	const json = rowToJson(translations);
	// const defaultJson = jsonBuildObject();
	// return jsonObjectAgg(locales.locale, json);
	return jsonObjectAgg(locales.locale, coalesce(json, emptyJsonObject()));
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
	// UKP extends UnknownKeysParam,
	// CA extends ZodTypeAny,
	TT extends ZodRawShape,
>(schema: ZodObject<T>, translationSchema: ZodObject<TT>) {
	return schema.merge(z.object({ translations: translationsSchema(translationSchema) }));
}

// /**
//  * Extend a given ressource table's relations with its corresponding translations table. The
//  * established relations should be mapped isomorphically in {@link withTranslationsSchema}.
//  */
// export function withTranslationsRelations<R extends Parameters<typeof relations>[1]>(
// 	relationsConfig: R
// ) {
// 	const defineRelations: Parameters<typeof relations>[1] = relationHelpers;
// 	return;
// }
