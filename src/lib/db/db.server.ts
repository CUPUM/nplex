import { DB_HOST_POOLED, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '$env/static/private';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
	host: DB_HOST_POOLED,
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASSWORD,
	port: +DB_PORT,
	ssl: true,
});

/**
 * Web-socket pooled database connection.
 *
 * @see https://github.com/neondatabase/serverless#example-nodejs-with-poolconnect
 */
export const db = drizzle(pool);
export type Db = typeof db;
