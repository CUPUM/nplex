import { createClient } from '@supabase/supabase-js';

export const db = createClient(
	import.meta.env.PUBLIC_SUPABASE_URL as string,
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string
);
