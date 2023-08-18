import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

// Sourcing env vars for scripts that run outside of vite/sveltekit.
const vars = config({ path: '../.env' });
const expanded = expand(vars);

export const ENV = z
	.object({
		SUPABASE_DB_URL: z.string(),
		SUPABASE_DB_URL_NOPOOL: z.string(),
	})
	.parse(expanded);

export const DB_MIGRATIONS_FOLDER = './src/lib/database/migrations';
