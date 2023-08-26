import { USER_ROLE_DEFAULT, type UserRole } from '$lib/auth/constants';
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
