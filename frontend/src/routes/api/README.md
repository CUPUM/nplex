## Sveltekit API endpoints

To avoid implementation complexifications that arise from server-side Supabase client authentication, all Supabase's `db` client instance request are handled in client-side code at the level of app-wide stores, components, and routes.

Sveltekit endpoints should only be used for custom behaviors, such as managing an in-house user cookie for session persistance on page refresh.
