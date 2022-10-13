import { SUPABASE_SERVICE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$types/database';
import type { DatabaseRpc } from '$types/databaseRpc';
import { createClient } from '@supabase/supabase-js';

/**
 * Server side admin db client to use only where truly necessary. This db client can overrule RLS policies and has
 * extended permissions.
 */
export const adminDbClient = createClient<Database & DatabaseRpc>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, {
	db: {
		schema: 'public',
	},
});
