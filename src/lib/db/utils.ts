import { PgTable, getTableConfig } from 'drizzle-orm/pg-core';

/**
 * Updated version of drizzle-orm's getTableName with config to allow preprending table's schema
 * name for cross-schema relations.
 */
export function getTableName<T extends PgTable>(
	table: T,
	{
		schema = true,
		quotes = true,
	}: {
		schema?: boolean;
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
	return `${qo}${schema ? `${tableConfig.schema}${qi}.` : ''}${qi}${tableConfig.name}${qo}`;
}

// /**
//  * Transform a translations record insert schema into database rows.
//  */
// export function transformTranslationsInsertSchema<
// 	S extends ZodObject<Record<Locale, AnyZodObject>>,
// >(schema: S) {}
