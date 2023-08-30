import { sql } from 'drizzle-orm';

/**
 * Implements sql random. Can be used to order:
 *
 * ```ts
 * const randomItem = await db.select().from(items).orderBy(random()).limit(1);
 * ```
 */
export function random() {
	return sql`random()`;
}
