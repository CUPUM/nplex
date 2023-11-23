import { defineConfig } from 'drizzle-kit';
import { register } from 'tsconfig-paths';
import tsConfig from './.svelte-kit/tsconfig.json';
import { DB_MIGRATIONS_FOLDER } from './scripts/common';

/**
 * @see https://discord.com/channels/1043890932593987624/1125147482364584007/1154633287805976606
 */
register({
	baseUrl: './.svelte-kit',
	paths: { ...tsConfig.compilerOptions.paths, '$env/*': ['../drizzle.config.ts'] },
});

export default defineConfig({
	schema: ['./src/lib/db/schema/*'],
	out: DB_MIGRATIONS_FOLDER,
	driver: 'pg',
	breakpoints: true,
	dbCredentials: {
		connectionString: process.env.NEON_POOL_DB_URL!,
	},
	introspect: {
		casing: 'camel',
	},
	verbose: true,
	strict: true,
});
