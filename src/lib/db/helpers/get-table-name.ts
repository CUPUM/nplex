import {
	PgTable,
	getTableName as getSchemalessTableName,
	getTableConfig,
} from 'drizzle-orm/pg-core';

/**
 * Updated version of drizzle-orm's getTableName with config to allow preprending table's schema
 * name for cross-schema relations.
 *
 * @see {@link getSchemalessTableName}
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
