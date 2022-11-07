# Local dev and migrations

For exhaustive information, refer to Supabase CLI documentation: https://supabase.com/docs/reference/cli

## Working locally

Make sure to use the latest version of the supabase CLI:

```sh
# Install if not already done
brew install supabase/tap/supabase

# Upgrade
brew upgrade supabase
```

Make sure you are in the `/backend` package, i.e. the directory of this readme, then supabase start to boot up the local containers.

```sh
supabase start
```

### Persist local modifications into diff migration files

```sh
supabse db diff -f [output file] --use-migra
```

### Generating typescript types

One advantage of working with the local/remote dev pipeline using [@supabase/cli](https://github.com/supabase/cli) is the ability to generate types from the database's schema.
Importing the generated types in the frontend and casting them to the javascript client allows for some basic intellisense and typing of the requests.

For simplicity and consistency, the generated type declaration should always be exported to the same location, into the `frontend` package: `frontend/src/lib/types/database.ts`
Since these changes ultimately percolate to frontend effects, the script are established in the frontend package's file:

```json
{
  ...,
  scripts: {
    ...,
    "gen-remote-db-types": ". ../.env && cd ../backend && supabase gen types typescript --db-url ${SUPABASE_DB_URL} > ../frontend/src/lib/types/database.ts",
    "gen-local-db-types": "cd ../backend && supabase gen types typescript --local > ../frontend/src/lib/types/database.ts",
  }
}
```

Note that, for the time being, this functionality doesn't account for `database function` bodies, and thus `rpc()` return types have to be defined manually where necessary.
For this purpose, refer to `frontend/src/lib/types/databaseRpc.ts`.


## Tables

### Common

For consistency's sake, many table share common columns used for miscellaneous tasks and queries such as relation indexing, creator tracking, update tracking, etc.
To ensure the behaviors related to these columns are reproduced equally across tables:

- when performing joins based on `user_id` from the javascript client (i.e. within the `public` schema);
- when foreign keys are updated or deleted;
- when using procedures (such as `public.track_update()`);
- etc.

make sure to abide by the following column specifications where applicable:

| Column name | Type | Foreign key relation | Default | Nullable? | `on update` | `on delete` |
| --- | --- | --- | --- | --- | --- | --- |
| user_id | uuid | `public.users_profiles` (except the `users_profiles` table itself, that should reference `auth.id`) | `default_uid()`| false | `cascade` | `set default` |
| created_by_id | uuid | `public.users_profiles: user_id` | `default_uid()` | `false` | `cascade` | `set default` |
| updated_by_id | uuid | `public.users_profiles: user_id` | `default_uid()` | `true` | `cascade` | `set null` |
| created_at | timestamptz | n/a | `now()` | `false` | n/a | n/a |
| updated_at | timestamptz | n/a | `now()` | `false` | n/a | n/a |