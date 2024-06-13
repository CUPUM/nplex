import { type AvailableLanguageTag } from '$i18n/runtime';
import { LOAD_DEPENDENCIES } from '$lib/common/constants';
import { LANG_COLUMN_NAME } from '$lib/db/constants';
import type { LangColumn } from '$lib/db/helpers.server';
import { languages } from '$lib/db/schema/i18n.server';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { SQL, and, eq, type AnyTable, type ColumnsSelection, type Subquery } from 'drizzle-orm';
import { $true } from 'drizzle-orm-helpers';
import { jsonBuildObject, jsonObjectAgg } from 'drizzle-orm-helpers/pg';
import type { PgSelect, TableConfig } from 'drizzle-orm/pg-core';

export function aggTranslations<T extends ColumnsSelection>(fields: T) {
	return {
		translations: jsonObjectAgg(
			languages[LANG_COLUMN_NAME],
			jsonBuildObject({ ...fields, [LANG_COLUMN_NAME]: languages[LANG_COLUMN_NAME] })
		),
	};
}

/**
 * Join all available language tag's translations as aggergated fields.
 */
export function joinTranslations<
	TSelect extends PgSelect,
	TTranslations extends
		| (AnyTable<TableConfig> & LangColumn)
		| (Subquery<string, Record<string, unknown>> & LangColumn),
>(select: TSelect, translations: TTranslations, on: SQL) {
	return select
		.leftJoin(languages, $true)
		.leftJoin(
			translations,
			and(on, eq(languages[LANG_COLUMN_NAME], translations[LANG_COLUMN_NAME]))
		);
}

/**
 * Join a single language's fields directly into the data.
 */
export function joinTranslation<
	TSelect extends PgSelect,
	TTranslations extends
		| (AnyTable<TableConfig> & LangColumn)
		| (Subquery<string, Record<string, unknown>> & LangColumn),
>(
	select: TSelect,
	translations: TTranslations,
	on: SQL,
	langOrEvent: AvailableLanguageTag | RequestEvent | ServerLoadEvent
) {
	const lang = typeof langOrEvent === 'string' ? langOrEvent : langOrEvent.locals.lang;
	if (typeof langOrEvent !== 'string' && 'depends' in langOrEvent) {
		langOrEvent.depends(LOAD_DEPENDENCIES.LANG);
	}
	return select.leftJoin(translations, and(on, eq(translations[LANG_COLUMN_NAME], lang)));
}
