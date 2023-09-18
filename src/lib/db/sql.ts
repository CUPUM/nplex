import { sql } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';
import { NANOID_DEFAULT_LENGTH } from './constants';

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

/**
 * Get excluded column values in conflict cases. Useful for onConflictDoUpdate's set.
 */
export function excluded<C extends PgColumn>(column: C) {
	return sql`excluded.${column.name}`;
}

/**
 * Generate a nanoid using postgres-nanoid.
 *
 * @see https://discord.com/channels/1043890932593987624/1093946807911989369/1100459226087825571
 * @todo Stay up to date when default values will accept 'sql' without having to pass param to
 *   sql.raw()
 */
export function generateNanoid({
	optimized = false,
	length = NANOID_DEFAULT_LENGTH,
	alphabet,
}: {
	optimized?: boolean;
	/**
	 * Defaults to @link NANOID_LENGTH_DEFAULT.
	 */
	length?: number;
	/**
	 * Defaults to '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	 */
	alphabet?: string;
} = {}) {
	const opts: (string | number)[] = [length];
	if (alphabet) {
		opts.push(alphabet);
	}
	return sql.raw(`"extensions"."nanoid${optimized ? '_optimized' : ''}"(${opts.join(',')})`);
	// return sql`extensions.nanoid${optimized ? '_optimized' : ''}(${opts.join(',')})`;
}
