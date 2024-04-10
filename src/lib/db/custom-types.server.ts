import type { AvailableLanguageTag } from '$i18n/runtime';
import { isAvailableLanguageTag } from '$i18n/runtime';
import type { UserRole } from '$lib/auth/constants';
import { USER_ROLE_DEFAULT } from '$lib/auth/constants';
import { isUserRole } from '$lib/auth/validation';
import { customType } from 'drizzle-orm/pg-core';

/**
 * Implementing our own db-level role type in sync with UserRole in lieu of using a pgEnum to avoid
 * futur complications regarding updatability.
 */
export const userRole = customType<{ data: UserRole }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		if (!isUserRole(value)) {
			// Fallback to lowest role in case of mismatch.
			console.error(`Invalid role ("${value}") retrieved from database.`);
			return USER_ROLE_DEFAULT;
		}
		// return value as UserRole;
		return value;
	},
	toDriver(value) {
		return value;
	},
});

/**
 * AvailableLanguageTag code custom type.
 *
 * @see {@link AvailableLanguageTag}
 */
export const lang = customType<{ data: AvailableLanguageTag; driverData: string }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		if (isAvailableLanguageTag(value)) {
			return value;
		}
		throw new Error(`Value returned by database driver (${value}) is not a valid lang`);
	},
	toDriver(value) {
		if (isAvailableLanguageTag(value)) {
			return value;
		}
		throw new Error(`Tried to input wrong value for AvailableLanguageTag (${value}).`);
	},
});
