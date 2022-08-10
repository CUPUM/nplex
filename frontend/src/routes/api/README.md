## API

### App endpoints & database (Supabase) queries

Database queries in Nplex are twofaced, whereas they can interface with supabase either from:

-   The SvelteKit server, e.g. when a client hits an app endpoint, during SSR (user-specific if request's auth cookies are set), etc.
-   Straight from the client (browser), when doing client-side fetches to get up-to-date, such as when actively searching or filtering projects.

By default, the first approach (endpoint handling) should be favored. When more data dynamism is required past page loads, we will opt for the second approach to avoid uselessly flooding the app's server with query forwarding through endpoints (i.e. repetitively fetching app endpoints that then themselves fetch the database).

Critically, this raises a challenge where we need to ensure data and behavior consistency across both approaches to avoid asymetric results.
To answer this concern, we define endpoints atomically, into reusable helpers:

-   The main and obligatory part of an endpoint is its verbed export function, used by SvelteKit to resolve fetches.
-   When client side access to the same query is required, we should extract a function form the endpoint's verbed export to provide a typed fetch wrapper that itself directly calls the database.
