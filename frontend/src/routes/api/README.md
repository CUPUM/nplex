## API

### App endpoints & database (Supabase) queries

Database queries in Nplex are twofaced, whereas they can interface with supabase either from:

-   The SvelteKit server, e.g. when a client hits an app endpoint, during SSR (user-specific if request's auth cookies are set), etc.
-   Straight from the client (browser), when doing client-side fetches for non-sensitive queries such as enum selects.

By default, the first approach (endpoint handling) should be favored. But we will prioritise direct-to-supabase client-side queries for (mostly) selects where the data is not sensitive.

Critically, this raises a challenge where we need to ensure data and behavior consistency across both approaches to avoid asymetric results.
To answer this concern, we define endpoints atomically, into reusable helpers:

-   The main and obligatory part of an endpoint is its verbed export function, used by SvelteKit to resolve fetches.
-   When client side access to the same query is required, we should extract a function form the endpoint's verbed export to provide a typed fetch wrapper that itself directly calls the database.
