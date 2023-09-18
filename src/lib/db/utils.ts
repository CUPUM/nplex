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

// export function translationsTable<
// 	N extends string,
// 	P extends PgTableWithColumns<TableConfig & {columns: {id: PgColumnBuilderBase}}>,
// 	C extends Omit<
// 		Record<string, PgColumnBuilderBase<ColumnBuilderBaseConfig<ColumnDataType, string>, object>>,
// 		'locale' | 'id'
// 	>,
// >(name: N, parent: P, columns: C) {
// 	return pgTable(name, {
// 		...columns,
// 		id: ,
// 		locale: locale('locale').references(() => locales.locale, {
// 			onDelete: 'cascade',
// 			onUpdate: 'cascade',
// 		}),
// 	});
// }
