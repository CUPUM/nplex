# Supabase

## Using the local CLI

For reference see:

- the CLI's [About page](https://supabase.com/docs/reference/cli/about);
- the [Local Developpement guide](https://supabase.com/docs/guides/local-development).

Install the Supabase CLI locally:

```sh
brew install supabase/tap/supabase
```

Upgrade:

```sh
brew upgrade supabase
```

If you plan on using the CLI to migrate from a cloud project, [login using an access token](https://supabase.com/docs/reference/cli/supabase-login):

```sh
supabase login
```

### Install a Postgres client

It is advised to install a Postgres client to work with the local instance:

```sh
# To do
```

## Migrating

For now, the chosen way to develop and save the database's design is through the [migration process](https://supabase.com/docs/guides/local-development#database-migrations). While sql files can be updated by hand, using a migration allows for generating up-to-date instructions that mirror modifications applied through Supabase's GUI.

CD into the `/backend` directory and boot up Supabase's services:

```sh
supabase start
```