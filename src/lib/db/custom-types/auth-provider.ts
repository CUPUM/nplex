import type { AuthProvider } from '$lib/auth/constants';
import { isAuthProvider } from '$lib/auth/validation';
import { customType } from 'drizzle-orm/pg-core';

/**
 * Auth provider custom type.
 */
export const authprovider = customType<{ data: AuthProvider }>({
	dataType() {
		return 'text';
	},
	fromDriver(value) {
		// return value as Locale;
		if (isAuthProvider(value)) {
			return value;
		}
		throw new Error(`Value returned by database driver (${value}) is not a valid auth provider`);
	},
	toDriver(value) {
		return value;
	},
});
