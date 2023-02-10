<h1 align="center">
  <img width="300" height="auto" src="frontend/static/logo/nplex-color.svg" alt="nplex">
</h1>

## General

### See it live

:pick:

Under construction at [nplex.design](www.nplex.design)

:pick:

### Stack

This project's stack is organized throughout packages respective of each service, such as:

- __[Frontend](/frontend)__
  - [SvelteKit](https://kit.svelte.dev/) as the SSR-capable frontend framework.
- __[Backend](/backend)__
  - [Supabase](https://supabase.io/) for the PostgreSQL database, PostgREST API, authentication services, and more.

## Getting started

### Using the prescribed package manager

The mono-repo is scaffolded on `pnpm`'s workspace feature. Make sure to work using `pnpm` rather than `npm`. This is to allow dependency optimizations and globally cached packages on your machine.

```sh
npm install -g pnpm
```

### Completing your local setup

Before building or starting any service, make sure to define the required environment variables in a `.env` file at the root of the repo by using [`.env.template`](.env.template) as a guideline.
The `.env` file is not included in commits, and never should be, as it can contain sensitive information for service authentications.

### Running scripts

For the time being, the only global (workspace level) scripts defined are to install the app(s).
You can install everything at once:

```sh
pnpm install
```

