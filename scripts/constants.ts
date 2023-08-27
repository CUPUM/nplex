import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

// Sourcing env vars for scripts that run outside of vite/sveltekit.
const vars = config({ path: '.env' });
// Interpolating inter-var references.
expand(vars);

export const ENV = z
	.object({
		NEON_DB_PASSWORD: z.string(),
		NEON_DB_URL: z.string(),
		NEON_DB_URL_NOPOOL: z.string(),
		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),
	})
	.parse(process.env);

export const DB_MIGRATIONS_FOLDER = './migrations';
