import { getTableColumns, type InferSelectModel } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';

export function withDbColumnNames<T extends PgTable, D = InferSelectModel<T>>(
	table: T,
	data: D & object
) {
	const cfg = getTableColumns(table);
	// data.
}

// const u = await dbpool.select().from(projects);
// const dbu = withDbColumnNames(users, u);
