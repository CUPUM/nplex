import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: ['./src/lib/db/schema/*'],
	out: './migrations',
	dialect: 'postgresql',
	extensionsFilters: ['postgis'],
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
