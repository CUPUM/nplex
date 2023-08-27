import { exit } from 'process';
import { USER_ROLES_ARR } from '../src/lib/auth/constants';
import { userRoles } from '../src/lib/db/schema/auth';
import { locales } from '../src/lib/db/schema/i18n';
import { LOCALES_ARR, LOCALES_DETAILS } from '../src/lib/i18n/constants';
import { createDrizzle } from './common';

const db = createDrizzle();
const seeded: unknown[] = [];

console.info('🥕 Seeding database with base data...');
try {
	// Seed locales
	const ls = await db
		.insert(locales)
		.values(LOCALES_ARR.map((locale) => ({ locale, name: LOCALES_DETAILS[locale].name })))
		.onConflictDoNothing()
		.returning();
	seeded.push(ls);

	// Seed user roles
	const rs = await db
		.insert(userRoles)
		.values(USER_ROLES_ARR.map((role) => ({ role })))
		.onConflictDoNothing()
		.returning();
	seeded.push(rs);

	// Seed project types

	// Seed ...
} catch (error) {
	console.error('❌ Database seed failed (see error below).');
	throw error;
}
console.info('🚀 Database seeded successfully!');
console.info(seeded);
exit();
