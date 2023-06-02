# Nplex data-oriented backend

## Getting started

Nplex scaffolds its data management and backend functions on Supabase. We advise developping locally instead of directly against the live cloud instance to minimize risks of breaking the production database. This workflow is greatly simplified by [Supabase's CLI](https://supabase.com/docs/reference/cli).

### Running Supabase locally

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

### Connecting to a local instance

After you've booted up a local instance of Supabase, you can explore it through the (limited) web UI:

[`http://localhost:54323/projects`](http://localhost:54323/projects)

For a better experience, we can then connect to the running postgres database through a database manager such as [dBeaver](https://dbeaver.io/), [pgAdmin](https://www.postgresql.org/ftp/pgadmin/) or [BeeKeeper](https://www.beekeeperstudio.io/), using the following connection info where prompted:

| credential | value |
| --- | --- |
| Host | `localhost`|
| Port | `54322` |
| Database | `postgres` |
| Username | `postgres` |
| Password | default: `postgres` |

### Persist local modifications into diff migration files

Modifications applied to the running instance must be manually saved to `.sql` files using a migration. The CLI provides us with a command which performs a diff against the latest schema described collectively by all previous migration files:

```sh
supabse db diff -f [filename] --use-migra
```

This will output a new migration file to the `/migrations` directory, with its name automatically prefixed with the current date to ensure the proper chronology of migrations is kept.

### Generating typescript types

One advantage of working with the local/remote dev pipeline using [@supabase/cli](https://github.com/supabase/cli) is the ability to generate types from the database's schema.
Importing the generated types in the frontend and casting them to the javascript client allows for some basic intellisense and typing of the requests.

For simplicity and consistency, the generated type declaration should always be exported to the same location, into the `frontend` package: `frontend/src/lib/types/database/generated.ts`
Since these changes ultimately percolate to frontend effects, a script is provided in the frontend `package.json`:

```sh
# /frontend
pnpm gen-db-types
```

> Note that, for the time being, this functionality doesn't account for __database function__ bodies, and thus `rpc()` return types have to be defined manually where necessary.
> 
> For this purpose, refer to [`frontend/src/lib/types/database/buff.ts`](`../frontend/src/lib/types/database/buff.ts`).

## Schema

## Tables

## Authorization and policies

The schema accounts for two ways to manage authorization on tables through row-level-policies.

### Generic role-based access control (RBAC)

A more "crude" approach is implemented with `public.app_permission` enum type and a `public.role_permissions` table that allows us to streamline the association of certain user `role`s with various operations.

Verifying a query's user's rights can be done using the `public.authorize()` function which returns a boolean to confirm or deny a user's access-right to the queried ressource and the query operation. Simply use it inside a row-level-policy, passing it the desired value of `app_permission` as the key to check against.

For fine tuning, add new members to the `app_permission` enum, new entries to the `role_permissions` table, or see below.

### Case-per-case fine-tuning

Creating reusable functions such as `public.user_can_edit_project()`

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