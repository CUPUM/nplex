# ![nplex logo](frontend/static/nplex-logo.svg)

# Welcome to nplex's monorepo

This project contains the packages for:

- The Nginx [/webserver](/webserver) and reverse proxy
- The SvelteKit [/frontend](/frontend) app of nplex
- The Supabase backend services (...to come)

## Getting started

The mono-repo is scaffolded on `pnpm`'s workspace feature. Make sure to work using `pnpm` rather than npm as to allow dependency optimizations and local cache:

```sh
npm install -g pnpm
```

The packages are outlined in [pnpm-workspace.yaml](pnpm-workspace.yaml).

For the time being, the only global scripts defined are to install the app(s):

```sh
# install all...
# install frontend...
# install backend...

```

For more granular scripts, make sure to `cd` into a package's directory.

## To do

- [ ] Setup nginx
- [ ] Setup self-hosted supabase package(s)
