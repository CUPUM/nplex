<h1 align="center">
  <img width="300" height="auto" src="frontend/static/logo/nplex-color.svg" alt="nplex">
</h1>
<p align="center">

</p>

## See it live

The app's frontend is deployed on Vercel and is available at [nplex.design](www.nplex.design). The
backend is currently being ported to Neondb for greater schema agnosticity.

## Stack

- SvelteKit
- Drizzle-orm & drizzle-kit
- Lucia auth
- Melt-UI
- SvelteKit Superforms

## Hosting

- Vercel (frontend)
- Neon (database)

## Getting started

### Using the prescribed package manager

The project's monorepo expects you to use `pnpm` as the package manager to enable proper use of its
workspace features. Using `npm` is not indicated. This allows dependency optimizations with shared
and cached packages on developement or production devices. If you do not have `pnpm` installed,
please refer to: <https://pnpm.io/installation> or simply proceed with either:

```sh
# brew (preferred method)
brew install pnpm

# npm
npm install -g pnpm
```

### Completing your local setup

Before building or starting any service, make sure to define the required environment variables in a
`.env` file at the root of the repo. A reference [`.env.template`](.env.template) is provided to
help identify required variables. Any populated `.env` files are not included in commits, and never
should be, as they contain sensitive information for service authentications.

### Install

Install everything at once:

```sh
pnpm install
```

### Scripts

#### Package-level scripts

Utility scripts are provided to facilitate running package-specific scripts. To run `frontend`
scripts:

```sh
pnpm frontend ...

# For example, to dun the frontend dev server:
pnpm frontend dev
```

The same applies for `backend` scripts.
