// File for quick testing of drizzle queries.

import { exit } from 'process';
import { projectTypes } from '../src/lib/db/schema/public';
import { createDrizzle } from './common';

const db = createDrizzle();

console.info('🖍️ Sketching to db...');
try {
	await db.insert(projectTypes).values({});
} catch (error) {
	console.error('❌ Database sketch failed (see error below).');
	console.error(error);
} finally {
	// Make sure to close pool.
	// await db.end()
	exit();
}
