import type { Locale } from '$lib/i18n/constants';
import { isLocale } from '$lib/i18n/validation';
import { customType } from 'drizzle-orm/pg-core';

/**
 * Locale code custom type.
 */
export const locale = customType<{ data: Locale }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		// return value as Locale;
		if (isLocale(value)) {
			return value;
		}
		throw new Error(`Value returned by database driver (${value}) is not a valid locale`);
	},
	toDriver(value) {
		return value;
	},
});
