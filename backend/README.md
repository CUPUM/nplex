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