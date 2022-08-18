/**
 * Init a client-side supabase client instance to listen to auth state changes and more. //
 */
// export const browserDbClient = createClient(
// 	import.meta.env.PUBLIC_SUPABASE_URL,
// 	import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
// 	{
// 		db: {
// 			schema: 'public',
// 		},
// 		auth: {
// 			persistSession: true,
// 			autoRefreshToken: true,
// 		},
// 	}
// );

// /**
//  * Server side admin db client to use only when truly necessary.
//  */
// export const adminDbClient = browser
// 	? null
// 	: createClient(PUBLIC_SUPABASE_URL, import.meta.env.SUPABASE_SERVICE_KEY, {
// 			db: {
// 				schema: 'public',
// 			},
// 			auth: {
// 				persistSession: false,
// 				autoRefreshToken: false,
// 			},
// 			// global: {
// 			// 	// fetch:,
// 			// 	// headers:,
// 			// },
// 	  });

// /**
//  * Db client instanciator to use on a per-request basis for server-side authed requests without unnecessary admin privileges.
//  */
// export function createServerDbClient(accessToken?: string) {
// 	return createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY, {
// 		db: {
// 			schema: 'public',
// 		},
// 		auth: {
// 			persistSession: false,
// 			autoRefreshToken: false,
// 		},
// 		global: {
// 			// fetch:,
// 			headers: {
// 				Authotization: `Bearer ${accessToken}`,
// 			},
// 		},
// 	});
// }
