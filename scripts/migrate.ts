// This should soon be a part of drizzle-kit
// i.e.: it will be deprecated when `drizzle-kit apply` becomes a thing.

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { exit } from 'process';
import { DB_MIGRATIONS_FOLDER, ENV } from './common';

const client = postgres(ENV.SUPABASE_DB_URL_NOPOOL, { max: 1 });
const db = drizzle(client);

async function main() {
	console.info('Attempting database migration...');
	await migrate(db, { migrationsFolder: DB_MIGRATIONS_FOLDER });
	console.log('Database migration completed!');
	exit();
}

main();
