import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { drizzle } from 'drizzle-orm/postgres-js';
import pg from 'postgres';
import { z } from 'zod';

// Sourcing env vars for scripts that run outside of vite/sveltekit.
const vars = config({ path: '.env' });
// Interpolating inter-var references.
expand(vars);

export const ENV = z
	.object({
		NEON_DB_PASSWORD: z.string(),
		NEON_DB_URL: z.string(),
		NEON_POOL_DB_URL: z.string(),
		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),
	})
	.parse(process.env);

export const DB_MIGRATIONS_FOLDER = './migrations';

export function createDrizzle() {
	const client = pg(ENV.NEON_DB_URL, { max: 1, ssl: 'require' });
	const db = drizzle(client);
	return db;
}
