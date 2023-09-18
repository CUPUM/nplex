import type { Config } from 'drizzle-kit';
import { DB_MIGRATIONS_FOLDER, ENV } from './scripts/common';

export default {
	schema: ['./src/lib/db/schema/*'],
	out: DB_MIGRATIONS_FOLDER,
	driver: 'pg',
	breakpoints: true,
	dbCredentials: {
		connectionString: ENV.NEON_POOL_DB_URL,
	},
} satisfies Config;
