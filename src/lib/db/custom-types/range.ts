import { customType } from 'drizzle-orm/pg-core';

// Implements postgres range types
// https://www.postgresql.org/docs/current/rangetypes.html
// To do: add multiranges if needed.

/**
 * Implements postgres int4 / int8 range.
 */
export const intrange = customType<{ data: [number, number]; config: { size: 4 | 8 } }>({
	dataType(config) {
		return `int${config?.size ?? 4}`;
	},
	fromDriver(value) {
		return value as [number, number];
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Implements postgres numeric range.
 */
export const numrange = customType<{ data: [number, number] }>({
	dataType() {
		return 'numrange';
	},
	fromDriver(value) {
		return value as [number, number];
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Implements postgres date range.
 *
 * @see https://orm.drizzle.team/docs/custom-types Timestamp for reference.
 */
export const tsrange = customType<{ data: [Date, Date]; config: { withTimezone: boolean } }>({
	dataType(config) {
		return `ts${config?.withTimezone ? 'tz' : ''}range`;
	},
	fromDriver(value) {
		return value as [Date, Date];
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Implements postgres date range.
 *
 * @see https://orm.drizzle.team/docs/custom-types Timestamp for reference.
 */
export const daterange = customType<{ data: [Date, Date] }>({
	dataType() {
		return 'daterange';
	},
	fromDriver(value) {
		return value as [Date, Date];
	},
	toDriver(value) {
		return value;
	},
});
