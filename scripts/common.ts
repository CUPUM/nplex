import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { drizzle } from 'drizzle-orm/postgres-js';
import pg from 'postgres';

// Sourcing env vars for scripts that run outside of vite/sveltekit.
const vars = config({ path: '.env' });
// Interpolating inter-var references.
expand(vars);

export const DB_MIGRATIONS_FOLDER = './migrations';

export function createDrizzle() {
	const client = pg(process.env.NEON_DB_URL!, { max: 1, ssl: 'require' });
	const db = drizzle(client);
	return db;
}
