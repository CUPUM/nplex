import { defineConfig } from 'drizzle-kit';
import { DB_MIGRATIONS_FOLDER } from './scripts/common';

export default defineConfig({
	schema: ['./src/lib/db/schema/*'],
	out: DB_MIGRATIONS_FOLDER,
	driver: 'pg',
	breakpoints: true,
	dbCredentials: {
		host: process.env.DB_HOST!,
		database: process.env.DB_NAME!,
		user: process.env.DB_USER!,
		password: process.env.DB_PASSWORD!,
		port: +process.env.DB_PORT!,
		ssl: true,
	},
	introspect: {
		casing: 'camel',
	},
	verbose: true,
	strict: true,
});
