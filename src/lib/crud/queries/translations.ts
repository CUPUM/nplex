import type { LangColumn } from '$lib/db/columns';
import { LANG_COLUMN_NAME } from '$lib/db/constants';
import { languages } from '$lib/db/schema/i18n.server';
import {
	and,
	eq,
	type ColumnsSelection,
	type Subquery,
	type Table,
	type WithSubquery,
} from 'drizzle-orm';
import { $true, type InferColumns } from 'drizzle-orm-helpers';
import { jsonBuildObject, jsonObjectAgg } from 'drizzle-orm-helpers/pg';
import type { PgSelect } from 'drizzle-orm/pg-core';
import type { ValueOf } from 'type-fest';

export function aggTranslations<T extends ColumnsSelection>(fields: T) {
	return {
		translations: jsonObjectAgg(languages[LANG_COLUMN_NAME], jsonBuildObject(fields)),
	};
}

export function joinTranslations<
	T extends PgSelect,
	TT extends (Table | Subquery | WithSubquery) & LangColumn,
>(qb: T, translations: TT, ...equals: [ValueOf<InferColumns<T>>, ValueOf<InferColumns<TT>>]) {
	return qb
		.leftJoin(languages, $true)
		.leftJoin(
			translations,
			and(eq(...equals), eq(translations[LANG_COLUMN_NAME], languages[LANG_COLUMN_NAME]))
		);
}

// export function joinTranslation() {

// }
