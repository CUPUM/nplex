import { NEON_POOL_DB_URL } from '$env/static/private';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

// neonConfig.fetchConnectionCache = true;
// const pghttp = neon(NEON_DB_URL);
// /**
//  * Http database connection.
//  *
//  * @see https://orm.drizzle.team/docs/installation-and-db-connection/postgresql/neon
//  */
// export const db = httpdrizzle(pghttp, { schema });

// export type Db = typeof dbhttp;

neonConfig.webSocketConstructor = ws;
export const pool = new Pool({ connectionString: NEON_POOL_DB_URL });
/**
 * Web-socket pooled database connection.
 *
 * @see https://github.com/neondatabase/serverless#example-nodejs-with-poolconnect
 */
export const db = drizzle(pool);

export type Db = typeof db;
