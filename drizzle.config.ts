import type { Config } from 'drizzle-kit';
import { DB_MIGRATIONS_FOLDER, ENV } from './scripts/common';

export default {
	schema: './src/lib/database/schema.ts',
	out: DB_MIGRATIONS_FOLDER,
	driver: 'pg',
	breakpoints: true,
	dbCredentials: {
		connectionString: ENV.SUPABASE_DB_URL,
	},
} satisfies Config;
