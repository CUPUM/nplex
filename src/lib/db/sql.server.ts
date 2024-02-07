import { isAvailableLanguageTag, type AvailableLanguageTag } from '$i18n/runtime';
import { USER_ROLE_DEFAULT, type UserRole } from '$lib/auth/constants';
import { isUserRole } from '$lib/auth/validation';
import { createGenerateNanoid, createRegconfig } from 'drizzle-orm-helpers';
import { customType } from 'drizzle-orm/pg-core';
import { NANOID_DEFAULT_LENGTH, REGCONFIGS } from './constants';

export const generateNanoid = createGenerateNanoid({ defaultLength: NANOID_DEFAULT_LENGTH });

export const regconfig = createRegconfig(REGCONFIGS);

/**
 * Implementing our own db-level role type in sync with UserRole in lieu of using a pgEnum to avoid
 * futur complications regarding updatability.
 */
export const userRole = customType<{ data: UserRole }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		// return value as UserRole;
		if (isUserRole(value)) {
			return value;
		}
		// Fallback to lowest role in case of mismatch.
		return USER_ROLE_DEFAULT;
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Ci-text postgres column type.
 *
 * @see https://www.postgresql.org/docs/current/citext.html
 */
export const citext = customType<{ data: string }>({
	dataType() {
		return 'citext';
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
