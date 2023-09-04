// export type InferColumn<C extends PgColumn> = C extends PgColumn<infer T> ? T : never;

import { localeSchema } from '$lib/i18n/constants';
import type { ReferenceConfig } from 'drizzle-orm/pg-core';
import { z, type ZodType } from 'zod';
import { locale } from '../custom-types/locale';
import { locales } from '../schema/i18n';

// /**
//  * Streamline definition of translations tables' columns and constriants.
//  */
// export function translationsTable<
// 	F extends PgColumn,
// 	T extends Record<string, PgColumnBuilderBase>,
// 	FK = (column: PgColumnBuilderBase) => PgColumn,
// >(foreignColumn: F, columns: (fk: FK) => T) {
// 	let k: string;
// 	const fk = (column: PgColumnBuilderBase) => {
// 		return column.references(() => foreignColumn, {
// 			onDelete: 'cascade',
// 			onUpdate: 'cascade'
// 		})
// 	}
// 	const extraConfig = (table) => {
// 		return {
// 			pk: primaryKey(table.locale, table[k]),
// 		};
// 	};
// 	return [columns(fk), extraConfig] as const;
// }

/**
 * Schema for translations contents.
 */
export function tinsert<S extends ZodType>(schema: S) {
	return z.record(localeSchema, schema);
}

/**
 * Try to get the contextually accurate translation, i.e. the translation of the current locale.
 * Optionally automatically fallback to the first found translataion for the same text content id,
 * regardless of its locale.
 */
export function tselect(autoFallback?: boolean) {
	console.log(autoFallback);
}

export function localefk(
	config: ReferenceConfig['actions'] = { onDelete: 'cascade', onUpdate: 'cascade' }
) {
	return locale('locale').references(() => locales.locale, config);
}
