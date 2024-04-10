import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import pg from 'postgres';

export const DB_MIGRATIONS_FOLDER = './migrations';

// /**
//  * @see https://discord.com/channels/1043890932593987624/1125147482364584007/1154633287805976606
//  */
// export function registerTsConfig() {
// 	console.log('Registering sveltekit generated tsconfig');
// 	return register({
// 		baseUrl: './.svelte-kit',
// 		paths: {
// 			...tsConfig.compilerOptions.paths,
// 		},
// 	});
// }
// registerTsConfig();

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
