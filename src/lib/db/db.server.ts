import { NEON_DB_URL } from '$env/static/private';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

/**
 * Supabase db.
 *
 * @see https://orm.drizzle.team/docs/installation-and-db-connection/postgresql/supabase
 */

// export const client = postgres(SUPABASE_DB_URL);
// export const db = drizzle(client);

/**
 * Neon db.
 *
 * @see https://orm.drizzle.team/docs/installation-and-db-connection/postgresql/neon
 */

// neonConfig.fetchConnectionCache = true;
// export const client = neon(NEON_DB_URL);
export const pool = new Pool({ connectionString: NEON_DB_URL });
export const db = drizzle(pool);
