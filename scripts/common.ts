import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import pg from 'postgres';

export const DB_MIGRATIONS_FOLDER = './migrations';

// Sourcing env vars for scripts that run outside of vite/sveltekit.
config({ path: '.env' });

const client = pg({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: +process.env.DB_PORT!,
	ssl: true,
});

export const scriptDb = drizzle(client, { logger: true });
