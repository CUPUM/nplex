# Supabase

The following information is twofold:

1. We establish how to work with Supabase between local development and remote (for now cloud) development using the Studio gui. We must take into consideration a process that will be compatible with the future migration of the project from the cloud version to a self-hosted instance.
2. Doing a self-managed Supabase setup.

## Developping

### Using the Supabase CLI locally

For reference see:

- the CLI's [About page](https://supabase.com/docs/reference/cli/about);
- the [Local Developpement guide](https://supabase.com/docs/guides/local-development).

Install the Supabase CLI locally:

```sh
brew install supabase/tap/supabase
```

Update the currently installed version:

```sh
brew upgrade supabase
```

[Login to your cloud user account using an access token](https://supabase.com/docs/reference/cli/supabase-login):

```sh
supabase login
```

### Install a Postgres client

It is advised to use a Postgres client to work with the local instance as this can enable new key functionalities such as schema diffing:

```sh
sudo apt update

# One of the following:
# Install for both desktop and web modes:
sudo apt install pgadmin4
# Install for desktop mode only:
sudo apt install pgadmin4-desktop
# Install for web mode only: 
sudo apt install pgadmin4-web 
# Configure the webserver, if you installed pgadmin4-web:
sudo /usr/pgadmin4/bin/setup-web.sh
```

### Migrating

For now, the chosen way to develop and save the database's design, encompassing schema and extensions, is through the [migration process](https://supabase.com/docs/guides/local-development#database-migrations). While sql files can be updated by hand, using a migration allows for generating up-to-date instructions that reflect modifications applied through Supabase's GUI.

CD into the `/backend` directory and boot up Supabase's services:

```sh
supabase start
```

## Self-hosting

Hosting the Supabase backend implies more than just setuping the Postgres database. We have to also deploy the storage service to allow for hosting files (images, pdfs, etc.)

Read https://supabase.com/docs/guides/hosting/overview

### Booting the container

_To do_

### Verifying the setup

_To do_

### Accessing the services

_To do_