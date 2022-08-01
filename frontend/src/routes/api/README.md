## Sveltekit API endpoints

The API endpoints provided here should govern all requests to Supabase to allow for user-specific (and sometimes user-agnostic) SSR and general database request handling.

Since certain endpoints' request handling depend on database user credentials for role-checking or access to RLS-governed data, we need to make sure our hooks set and uppdate the proper cookies on the client's side. These updates should be in part triggered through endpoints in [`./auth`](auth).

For the time being, Sveltekit doesn't automatically type endpoint responses. To simplify overcoming this caveat, we here work by defining a typed fetch helper for each endpoint. Fetch wrappers should be exported as default to enforce having a single one per endpoint.
