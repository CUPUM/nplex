// This should soon be a part of drizzle-kit
// i.e.: it will be deprecated when `drizzle-kit apply` becomes a thing.

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { exit } from 'process';
import { DB_MIGRATIONS_FOLDER, scriptDb } from './common';

try {
	console.info('🚧 Applying database migration(s)...');
	await migrate(scriptDb, { migrationsFolder: DB_MIGRATIONS_FOLDER });
	console.info('🚀 Database migration(s) applied successfully!');
} catch (error) {
	console.error('❌ Database migration(s) failed (see error below).');
	throw error;
} finally {
	exit();
}
