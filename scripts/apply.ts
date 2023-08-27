// This should soon be a part of drizzle-kit
// i.e.: it will be deprecated when `drizzle-kit apply` becomes a thing.

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import pg from 'postgres';
import { exit } from 'process';
import { DB_MIGRATIONS_FOLDER, ENV } from './constants';

const client = pg(ENV.NEON_DB_URL_NOPOOL, { max: 1, ssl: 'require' });
const db = drizzle(client);

console.info('🚧 Applying database migration(s)...');
try {
	await migrate(db, { migrationsFolder: DB_MIGRATIONS_FOLDER });
} catch (error) {
	console.error('❌ Database migration(s) failed (see error below).');
	throw error;
}
console.info('🚀 Database migration(s) applied successfully!');
exit();
