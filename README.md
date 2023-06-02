<h1 align="center">
  <img width="300" height="auto" src="frontend/static/logo/nplex-color.svg" alt="nplex">
</h1>
<p align="center">

</p>

## See it live

The app's frontend is deployed on Vercel and is available at [nplex.design](www.nplex.design).

## Stack

- `frontend`: [SvelteKit](https://kit.svelte.dev/)
- `backend`: [Supabase](https://supabase.com/)

## Getting started

### Using the prescribed package manager

The project's monorepo expects you to use `pnpm` as the package manager to enable proper use of its
workspace features. Using `npm` is not indicated. This allows dependency optimizations with shared
and cached packages on developement or production devices. If you do not have `pnpm` installed,
please refer to: https://pnpm.io/installation or simply proceed with:

```sh
npm install -g pnpm
```

### Completing your local setup

Before building or starting any service, make sure to define the required environment variables in a
`.env` file at the root of the repo. A reference [`.env.template`](.env.template) is provided to
help identify required variables. Any populated `.env` files are not included in commits, and never
should be, as they contain sensitive information for service authentications.

### Install

You can install everything at once:

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

#### Root scripts

##### Generating types
