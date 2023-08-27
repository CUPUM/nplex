// This should soon be a part of drizzle-kit
// i.e.: it will be deprecated when `drizzle-kit apply` becomes a thing.

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import pg from 'postgres';
import { DB_MIGRATIONS_FOLDER, ENV } from './constants';

const client = pg(ENV.NEON_DB_URL_NOPOOL, { max: 1, ssl: 'require' });
const db = drizzle(client);

// async function main() {
console.info('🚧 Applying database migration(s)...');
try {
	console.log(ENV.NEON_DB_URL_NOPOOL);
	await migrate(db, { migrationsFolder: DB_MIGRATIONS_FOLDER });
} catch (error) {
	console.error('❌ Database migration(s) failed (see error below).');
	throw error;
}
console.log('🚀 Database migration(s) applied successfully!');
// 	exit();
// }

// main();
