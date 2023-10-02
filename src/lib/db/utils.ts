import { LOCALES, LOCALES_ARR, localeSchema, type Locale } from '$lib/i18n/constants';
import { strictRecord } from '$lib/utils/zod';
import { getTableColumns, type AnyColumn, type AnyTable, type SQL } from 'drizzle-orm';
import { PgTable, getTableConfig } from 'drizzle-orm/pg-core';
import type { ZodObject, ZodString, ZodTypeAny } from 'zod';
import { excluded } from './sql';

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

export function getAllExcluded<T extends AnyTable>(table: T) {
	const cols = getTableColumns(table);
	type C = keyof typeof cols;
	return (Object.keys(cols) as C[]).reduce(
		(acc, curr) => {
			acc[curr] = excluded(cols[curr]);
			return acc;
		},
		<{ [K in C]: ReturnType<typeof excluded<(typeof cols)[K]>> }>{}
	);
}

/**
 * Schema for translations record.
 */
export function translationsSchema<T extends ZodTypeAny>(schema: T) {
	return strictRecord(LOCALES, schema);
}

/**
 * Extend the insert schema of a given ressource table with its corresponding translations. The
 * resulting schema should be isomorphic with {@link withTranslationsRelations}.
 */
export function withTranslationsSchema<
	T extends { id: ZodString },
	TT extends { locale: typeof localeSchema },
>(schema: ZodObject<T>, translationSchema: ZodObject<TT>) {
	return schema.extend({ translations: translationsSchema(translationSchema) });
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

export function reduceTranslations<T extends { locale: Locale }>(translations: T[]) {
	return translations.reduce(
		(acc, curr) => {
			acc[curr.locale] = curr;
			return acc;
		},
		<Partial<Record<Locale, T>>>{}
	);
}

/**
 * Map translations array to a record of translations. Also automatically populate / update index
 * field if present.
 */
export function mapReduceTranslations<
	T extends { locale: Locale; id: string },
	D extends { id: string; index?: number | null },
>(row: D & { translations: T[] }, index: number) {
	const { translations, ...cols } = row;
	if ('index' in cols) {
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
