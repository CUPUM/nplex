import { NEON_DB_URL, NEON_POOL_DB_URL } from '$env/static/private';
import { Pool, neon, neonConfig } from '@neondatabase/serverless';
import { drizzle as httpdrizzle } from 'drizzle-orm/neon-http';
import { drizzle as wsdrizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as accountsSchema from './schema/accounts';
import * as i18nSchema from './schema/i18n';
import * as publicSchema from './schema/public';
import * as relations from './schema/relations';

const schema = { ...publicSchema, ...accountsSchema, ...i18nSchema, ...relations };

neonConfig.fetchConnectionCache = true;
const pghttp = neon(NEON_DB_URL);
/**
 * Http database connection.
 *
 * @see https://orm.drizzle.team/docs/installation-and-db-connection/postgresql/neon
 */
export const dbhttp = httpdrizzle(pghttp, { schema });

export type DbHttp = typeof dbhttp;

neonConfig.webSocketConstructor = ws;
export const pool = new Pool({ connectionString: NEON_POOL_DB_URL });
/**
 * Web-socket pooled database connection.
 *
 * @see https://github.com/neondatabase/serverless#example-nodejs-with-poolconnect
 */
export const dbpool = wsdrizzle(pool, { schema });

export type DbPool = typeof dbpool;

export type Db = DbHttp | DbPool;
